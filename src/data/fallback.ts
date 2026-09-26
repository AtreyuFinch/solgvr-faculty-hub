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

function mk(tab: string, headers: string[], rows: Record<string, string>[]): SheetPayload {
  return { tab, headers, rows, demo: true };
}

function students(n: number, grade: string): Record<string, string>[] {
  return Array.from({ length: n }, (_, i) => ({
    name: `Demo Student ${i + 1}`,
    grade,
    notes: i === 0 ? "Demo — allergy list with teacher" : "",
  }));
}

const BIRTHDAYS = mk(
  "Birthdays",
  ["name", "role", "month", "day"],
  [
    // NOTE: api/sheet.ts swaps the "*MONTH*" / "*DAY*" tokens below for
    // today's real month/day at request time, so the dashboard's "today's
    // birthdays" section always has a demo entry to show. Tokens are only
    // ever replaced inside this demo payload — never in live sheet data.
    { name: "Demo Teacher (today)", role: "Grade 3", month: "*MONTH*", day: "*DAY*" },
    { name: "Demo Staff A", role: "Office", month: "10", day: "4" },
    { name: "Demo Staff B", role: "Grade 5", month: "10", day: "11" },
    { name: "Demo Staff C", role: "Day Care", month: "11", day: "2" },
  ]
);

const TEAM_FEED = mk(
  "TeamFeed",
  ["date", "author", "message", "tag"],
  [
    {
      date: "2026-09-25",
      author: "Mike Schabert",
      message:
        "Demo prayer intention: for our school family — for restful hearts this weekend and a joyful week ahead. 🙏",
      tag: "prayer",
    },
    {
      date: "2026-09-24",
      author: "Wendy Lopez",
      message: "Demo: reminder — Friday folders go home today. Thank you, team!",
      tag: "announcement",
    },
    {
      date: "2026-09-23",
      author: "Mrs. Guevara",
      message:
        "Demo shout-out: huge thank you to Ms. Dominguez for the extra crayons — the little ones were so happy! 💛",
      tag: "shoutout",
    },
  ]
);

const POLLS = mk(
  "Polls",
  ["question", "option_a", "option_b", "option_c", "status", "closes"],
  [
    {
      question: "Demo: where should the October staff lunch be?",
      option_a: "Taco truck",
      option_b: "Pizza party",
      option_c: "Potluck",
      status: "active",
      closes: "2026-10-02",
    },
    {
      question: "Demo: favorite spirit-week theme?",
      option_a: "Decades day",
      option_b: "Pajama day",
      option_c: "Twin day",
      status: "closed",
      closes: "2026-09-12",
    },
  ]
);

const ABSENCES = mk(
  "Absences",
  ["date", "name", "role", "note"],
  [
    { date: "2026-09-25", name: "Demo Staff D", role: "Grade 1–2", note: "Sub: Demo Sub 1" },
    { date: "2026-09-25", name: "Demo Staff E", role: "PE", note: "Half day — back after lunch" },
  ]
);

const ATTENDANCE_LOG = mk(
  "AttendanceLog",
  ["date", "class", "present", "absent", "notes"],
  [
    { date: "2026-09-25", class: "Grade 3", present: "24", absent: "1", notes: "Demo" },
    { date: "2026-09-25", class: "TK–K", present: "18", absent: "0", notes: "Demo" },
  ]
);

const ALERT_LOG = mk(
  "AlertLog",
  ["time", "message", "level"],
  [{ time: "2026-09-25 08:05", message: "Demo: morning drop-off ran smoothly.", level: "info" }]
);

const MAINTENANCE = mk(
  "Maintenance",
  ["date", "room", "request", "status"],
  [
    { date: "2026-09-24", room: "Room 4", request: "Demo: flickering light", status: "open" },
    { date: "2026-09-22", room: "Playground", request: "Demo: loose bolt on swing", status: "done" },
  ]
);

const SUPPLIES = mk(
  "Supplies",
  ["date", "requester", "item", "status"],
  [
    { date: "2026-09-24", requester: "Demo Teacher", item: "Demo: construction paper", status: "ordered" },
    { date: "2026-09-23", requester: "Demo Staff", item: "Demo: hand soap", status: "delivered" },
  ]
);

const QUIZ_RESULTS = mk(
  "QuizResults",
  ["name", "style", "date"],
  [
    { name: "Demo Teacher 1", style: "Planner", date: "2026-09-20" },
    { name: "Demo Teacher 2", style: "Collaborator", date: "2026-09-21" },
    { name: "Demo Staff 1", style: "Planner", date: "2026-09-22" },
    { name: "Demo Teacher 3", style: "Encourager", date: "2026-09-23" },
  ]
);

export const FALLBACK_SHEETS: Record<string, SheetPayload> = {
  "Roster-TK-K": mk("Roster-TK-K", ["name", "grade", "notes"], students(6, "TK/K")),
  "Roster-1-2": mk("Roster-1-2", ["name", "grade", "notes"], students(8, "1–2")),
  "Roster-3": mk("Roster-3", ["name", "grade", "notes"], students(8, "3")),
  "Roster-4": mk("Roster-4", ["name", "grade", "notes"], students(7, "4")),
  "Roster-5": mk("Roster-5", ["name", "grade", "notes"], students(7, "5")),
  "Roster-Specials": mk("Roster-Specials", ["name", "grade", "notes"], students(5, "Music & PE")),
  "Roster-DayCare": mk(
    "Roster-DayCare",
    ["name", "age_group", "notes"],
    Array.from({ length: 5 }, (_, i) => ({
      name: `Demo Student ${i + 1}`,
      age_group: "Day Care",
      notes: "",
    }))
  ),
  AttendanceLog: ATTENDANCE_LOG,
  AlertLog: ALERT_LOG,
  TeamFeed: TEAM_FEED,
  Birthdays: BIRTHDAYS,
  Absences: ABSENCES,
  Polls: POLLS,
  Maintenance: MAINTENANCE,
  Supplies: SUPPLIES,
  QuizResults: QUIZ_RESULTS,
};
