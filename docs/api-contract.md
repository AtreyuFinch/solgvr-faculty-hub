# Faculty Hub — API Contract Notes (Phase 1, 2026-09-25)

Backend bridge: DONE (deployed by coordinator's other track; Steve runs the
Apps Script deploy Saturday).

## Proxy contract — /api/sheet

- `GET /api/sheet?tab=<TabName>` → `{"tab","headers":[...],"rows":[{header: value, ...}]}`
- `GET /api/sheet?tab=_ping` → `{"ok","time","tabs"}` (health check + tab list)
- Server-side: proxies `APPS_SCRIPT_URL` + `APPS_SCRIPT_TOKEN` env vars,
  60s in-memory cache.
- If env vars are unset → serve checked-in demo payloads
  (`src/data/fallback.ts`, clearly marked demo, mirroring the live JSON
  shape) so the app is fully demoable without the backend.

## HARD RULE — dynamic headers (coordinator note, 2026-09-25 night)

- Do NOT hardcode column-header names for the **Birthdays** tab or the
  **7 Roster tabs** (Roster-TK-K, Roster-1-2, Roster-3, Roster-4, Roster-5,
  Roster-Specials, Roster-DayCare).
- Their real row-1 headers are undocumented (seeded directly in the private
  sheet) — render roster/birthday tables dynamically from whatever
  `headers` come back in the API response.
- Fallback demo JSON must mirror that response shape with **generic plausible
  keys** (e.g. `name`, `grade`, `month`, `day`), never invented "real"
  header names.

## Sheet tabs (16)

Roster-TK-K, Roster-1-2, Roster-3, Roster-4, Roster-5, Roster-Specials,
Roster-DayCare, AttendanceLog, AlertLog, TeamFeed, Birthdays, Absences,
Polls, Maintenance, Supplies, QuizResults

## Demo-data law (Gate E)

Demo data only — no real student names anywhere, ever. Written school
approval required before any real student data touches this app.
