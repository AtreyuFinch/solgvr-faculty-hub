# St. Joseph Faculty Intranet

SolGVR Labs · Steve's first solo project. A multi-tenant faculty hub —
St. Joseph School Pomona is tenant #1.

**Status (2026-09-26):** Phase 2 — full v1 app. Dashboard ("Today at
St. Joseph"), 7 class hubs with dynamic-header rosters, Bulletin Board
(active poll + team feed), Staff Directory, Document Library, Team Building,
all wired to `/api/sheet` with demo fallback. Launch: Sun 2026-09-27 5pm PDT.

## Pages (hash routes)

- `#/` — Dashboard: date, liturgical season, prayer intention, birthdays, absences, 6 quick-action forms, 7 class hubs, explore links
- `#/classes` — Class hub index
- `#/class/<slug>` — One hub: roster table (dynamic headers) + action links
- `#/bulletin` — Active poll (Polls tab) + team feed (TeamFeed tab)
- `#/directory` — 12 staff, config-driven
- `#/library` — 3 key documents
- `#/team` — Working-style quiz link + QuizResults tally

All school-specific data (staff, form URLs, doc URLs, tab names, class hubs)
lives in `src/config/school.ts` — St. Joseph is tenant #1. Writes are
Google-Form deep links only (no custom write API in v1).

## Demo data

`/api/sheet` serves checked-in demo payloads (`src/data/fallback.ts`) until
`APPS_SCRIPT_URL` + `APPS_SCRIPT_TOKEN` are set. Demo data only — no real
student names anywhere, ever (Gate E).

## Stack

Vite + React 18 + TypeScript, hand-rolled CSS (brand system in
`src/index.css`). Vercel serverless functions in `api/`.

## Dev

```bash
npm install
npm run dev
```

## API contract

`GET /api/sheet?tab=<TabName>` → `{ tab, headers: [...], rows: [{ header: value, ... }] }`
`GET /api/sheet?tab=_ping` → `{ ok, time, tabs }`

Proxies `APPS_SCRIPT_URL` + `APPS_SCRIPT_TOKEN` with a 60s in-memory cache.
Without the env vars, serves checked-in demo payloads (`src/data/fallback.ts`).
Full notes: `docs/api-contract.md`.

**Hard rule:** never hardcode Birthdays/Roster column headers — parse `headers`
dynamically from the response. **Gate E:** demo data only, no real student
names anywhere, ever.

## Deploy

GitHub `AtreyuFinch/solgvr-faculty-hub` (main) → Vercel project
`solgvr-faculty-hub` on team `atreyufinchs-projects`.
