# St. Joseph Faculty Intranet

SolGVR Labs · Steve's first solo project. A multi-tenant faculty hub —
St. Joseph School Pomona is tenant #1.

**Status (2026-09-25):** Phase 1 — branded "coming online" landing + `/api/sheet`
serverless proxy with demo fallback. Phase 2 (Sat 2026-09-26): all pages +
full API wiring. Launch: Sun 2026-09-27 5pm PDT.

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
