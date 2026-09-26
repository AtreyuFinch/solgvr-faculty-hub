/**
 * Checked-in demo payloads for /api/sheet — served when the Apps Script
 * backend isn't configured yet (APPS_SCRIPT_URL / APPS_SCRIPT_TOKEN unset).
 *
 * DEMO DATA ONLY — no real student names, ever (Gate E).
 *
 * Shape mirrors the live contract exactly:
 *   { tab, headers: [...], rows: [{ header: value, ... }] }
 *
 * Header names are intentionally GENERIC and plausible. Per the backend
 * contract note (docs/api-contract.md), the real sheet's row-1 headers are
 * undocumented, so the frontend MUST parse headers dynamically and never
 * hardcode these demo keys.
 */
export interface SheetPayload {
  tab: string;
  headers: string[];
  rows: Record<string, string>[];
  demo: true;
}

const BIRTHDAYS: SheetPayload = {
  tab: "Birthdays",
  headers: ["name", "role", "month", "day"],
  rows: [
    { name: "Demo Teacher A", role: "Grade 3", month: "9", day: "28" },
    { name: "Demo Staff B", role: "Office", month: "10", day: "4" },
  ],
  demo: true,
};

const ROSTER_3: SheetPayload = {
  tab: "Roster-3",
  headers: ["name", "grade", "notes"],
  rows: [
    { name: "Demo Student 1", grade: "3", notes: "" },
    { name: "Demo Student 2", grade: "3", notes: "" },
  ],
  demo: true,
};

export const FALLBACK_SHEETS: Record<string, SheetPayload> = {
  Birthdays: BIRTHDAYS,
  "Roster-3": ROSTER_3,
};
