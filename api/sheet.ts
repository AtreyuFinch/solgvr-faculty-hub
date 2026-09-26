/**
 * GET /api/sheet?tab=<TabName>
 *
 * Proxies the school Google Apps Script web app (env APPS_SCRIPT_URL +
 * APPS_SCRIPT_TOKEN) with a 60s server-side in-memory cache.
 *
 * Graceful fallback: if the env vars are unset (backend not deployed yet),
 * serves checked-in demo payloads (src/data/fallback.ts — bundle-safe static
 * exports mirroring the live JSON shape) so the app is fully demoable
 * without the backend.
 *
 * Response contract:
 *   ?tab=_ping -> { ok, time, tabs, demo? }
 *   ?tab=<Tab>  -> { tab, headers: [...], rows: [{ header: value, ... }] }
 */
import type { VercelRequest, VercelResponse } from "./vercel-types.js";
import { FALLBACK_SHEETS } from "../src/data/fallback.js";

const CACHE_TTL_MS = 60_000;

const TABS = [
  "Roster-TK-K",
  "Roster-1-2",
  "Roster-3",
  "Roster-4",
  "Roster-5",
  "Roster-Specials",
  "Roster-DayCare",
  "AttendanceLog",
  "AlertLog",
  "TeamFeed",
  "Birthdays",
  "Absences",
  "Polls",
  "Maintenance",
  "Supplies",
  "QuizResults",
] as const;

function demoResponse(tab: string): unknown | undefined {
  const payload = FALLBACK_SHEETS[tab];
  if (!payload) return undefined;
  // Demo-only nicety: the Birthdays fallback carries one row with
  // "*MONTH*" / "*DAY*" tokens so the dashboard's "today's birthdays"
  // section always has a demo entry to show. Swap them for today's real
  // month/day here at request time. Never touches live sheet data.
  if (tab === "Birthdays") {
    const now = new Date();
    return {
      ...payload,
      rows: payload.rows.map((row) => ({
        ...row,
        month: row.month === "*MONTH*" ? String(now.getMonth() + 1) : row.month,
        day: row.day === "*DAY*" ? String(now.getDate()) : row.day,
      })),
    };
  }
  return payload;
}

const cache = new Map<string, { expires: number; body: unknown }>();

function getCached(key: string): unknown | undefined {
  const hit = cache.get(key);
  if (hit && hit.expires > Date.now()) return hit.body;
  cache.delete(key);
  return undefined;
}

function setCached(key: string, body: unknown) {
  cache.set(key, { expires: Date.now() + CACHE_TTL_MS, body });
}

async function fetchFromAppsScript(tab: string): Promise<unknown> {
  const base = process.env.APPS_SCRIPT_URL;
  const token = process.env.APPS_SCRIPT_TOKEN;
  const url = `${base}?tab=${encodeURIComponent(tab)}&token=${encodeURIComponent(token ?? "")}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Apps Script HTTP ${res.status}`);
  return res.json();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const tab = typeof req.query.tab === "string" ? req.query.tab : "";

  // Health check — always available, never needs the backend.
  if (tab === "_ping") {
    const demo = !(process.env.APPS_SCRIPT_URL && process.env.APPS_SCRIPT_TOKEN);
    return res.status(200).json({
      ok: true,
      time: new Date().toISOString(),
      tabs: [...TABS],
      ...(demo ? { demo: true } : {}),
    });
  }

  if (!tab || !TABS.includes(tab as (typeof TABS)[number])) {
    return res.status(400).json({
      ok: false,
      error: `Unknown tab "${tab}". Expected one of: ${TABS.join(", ")}`,
    });
  }

  const cacheKey = `sheet:${tab}`;
  const cached = getCached(cacheKey);
  if (cached !== undefined) return res.status(200).json(cached);

  const backendReady = Boolean(process.env.APPS_SCRIPT_URL && process.env.APPS_SCRIPT_TOKEN);

  try {
    const body = backendReady ? await fetchFromAppsScript(tab) : demoResponse(tab);
    if (body === undefined) {
      return res.status(404).json({
        ok: false,
        error: `No demo data checked in for tab "${tab}" yet — backend not configured.`,
      });
    }
    setCached(cacheKey, body);
    return res.status(200).json(body);
  } catch (err) {
    return res.status(502).json({
      ok: false,
      error: "Apps Script backend unreachable",
      detail: err instanceof Error ? err.message : String(err),
    });
  }
}
