/**
 * Tenant #1 — St. Joseph School, Pomona.
 *
 * ALL school-specific data lives here: staff, forms, documents, class hubs,
 * sheet tab names. To onboard a second school, add a second config module
 * with this same shape — nothing else in the app hardcodes school data.
 */
export const SCHOOL = {
  tenantId: "st-joseph-pomona",
  name: "St. Joseph School",
  shortName: "St. Joseph",
  city: "Pomona",
  welcome: "¡Bienvenidos!",
  prayerLabel: "Intenciones de oración",
  colors: { green: "#1a5c2e", gold: "#d4af37" },
} as const;

export interface StaffMember {
  name: string;
  role: string;
  email?: string;
}

export const STAFF: StaffMember[] = [
  { name: "Mike Schabert", role: "Principal", email: "mschabert@stjosephschoolpomona.org" },
  { name: "Wendy Lopez", role: "Office Manager", email: "officemanager@stjosephschoolpomona.org" },
  { name: "Father Stephen", role: "" },
  { name: "Juan", role: "" },
  { name: "Mrs. Turner", role: "Teacher Aide" },
  { name: "Ms. Dominguez", role: "TK / Kindergarten" },
  { name: "Mrs. Ruiz", role: "Grades 1–2" },
  { name: "Mrs. Guevara", role: "Grade 3" },
  { name: "Ms. Armendariz", role: "Grade 4" },
  { name: "Ms. De La Torre", role: "Grade 5" },
  { name: "Mr. Gopar", role: "Music & PE" },
  { name: "Ms. Parada", role: "Day Care Director" },
];

export interface ActionLink {
  id: string;
  label: string;
  icon: string;
  url: string;
  blurb: string;
}

/** The six everyday quick-action forms shown on the dashboard. */
export const QUICK_ACTIONS: ActionLink[] = [
  {
    id: "attendance",
    label: "Daily Attendance",
    icon: "📝",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSdBdCu85bufnmSzB-ZNSpIAhqD17En43g2TPnWKMZ0ieCeDrw/viewform",
    blurb: "Take today's attendance",
  },
  {
    id: "mike",
    label: "Need Mike Now",
    icon: "🚨",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSdPFdsHCCEtUs_aTupAY5EiiuTqAGCsJ-DItc9OCm03qLG1BQ/viewform",
    blurb: "Urgent — reach Mike directly",
  },
  {
    id: "share",
    label: "Share with the Team",
    icon: "💬",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSf0wRReGawKUjqDMCfEJbP5aoPCTUNcsXfjxCb3Rht3zhwtjA/viewform",
    blurb: "Good news, shout-outs, updates",
  },
  {
    id: "absence",
    label: "Staff Absence Report",
    icon: "🩺",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSe1ES0HkbfEqups7jKpL95Tid1AaKXMdETEKAN52uPVoxuyKA/viewform",
    blurb: "Report an absence",
  },
  {
    id: "maintenance",
    label: "Maintenance Request",
    icon: "🔧",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSfNTU-ydt7-yoM1zt4CqJaLgX9xTd7ZQwFamHofwIWikvgKWw/viewform",
    blurb: "Something needs fixing",
  },
  {
    id: "supplies",
    label: "Supply Request",
    icon: "📦",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSdmPluMdZWeQt4YiPZTWpbh9pJJEjocJabeam0JJs8tU0lzhA/viewform",
    blurb: "Order classroom supplies",
  },
];

export const POLL_FORM: ActionLink = {
  id: "poll",
  label: "Quick Poll",
  icon: "🗳️",
  url: "https://docs.google.com/forms/d/e/1FAIpQLSdYQeY073XubXSYgCoLWmAffdTDdzWJLvQedCXp6in1tFQmKw/viewform",
  blurb: "Add your voice to the active poll",
};

export const QUIZ_FORM: ActionLink = {
  id: "quiz",
  label: "Working Style Quiz",
  icon: "🧭",
  url: "https://docs.google.com/forms/d/e/1FAIpQLSc8u0-bEoNs9Q0_dT7vl-MLNFyitELw6vkEmFBpcr_DfBjsLA/viewform",
  blurb: "Discover how you work best",
};

export const ALL_FORMS: ActionLink[] = [...QUICK_ACTIONS, POLL_FORM, QUIZ_FORM];

export interface DocLink {
  id: string;
  label: string;
  icon: string;
  url: string;
  blurb: string;
}

export const DOCS: DocLink[] = [
  {
    id: "handbook",
    label: "Family Handbook",
    icon: "📘",
    url: "https://docs.google.com/document/d/1jRCN31P1yqmgf6qADxi5Xx0Z3kAP0vYxA-7IS1x_QjE/edit",
    blurb: "Policies every family follows",
  },
  {
    id: "emergency",
    label: "Emergency Procedures",
    icon: "🚑",
    url: "https://docs.google.com/document/d/1OcCmeOwKi8WU1RS8jtPMNaFzuvKTfILWlYe7SShwhwM/edit",
    blurb: "What to do when it matters most",
  },
  {
    id: "bells",
    label: "Bell Schedule",
    icon: "🔔",
    url: "https://docs.google.com/document/d/1vjgmHAvwoqnpLyw4jcY_ySmP9sdy8J4ceCgrdKPFjV4/edit",
    blurb: "Start times, lunch, dismissal",
  },
];

export interface ClassHub {
  slug: string;
  name: string;
  teacher: string;
  tab: string;
  icon: string;
}

export const CLASS_HUBS: ClassHub[] = [
  { slug: "tk-k", name: "TK–Kindergarten", teacher: "Ms. Dominguez", tab: "Roster-TK-K", icon: "🌱" },
  { slug: "1-2", name: "Grades 1–2", teacher: "Mrs. Ruiz", tab: "Roster-1-2", icon: "📖" },
  { slug: "3", name: "Grade 3", teacher: "Mrs. Guevara", tab: "Roster-3", icon: "✏️" },
  { slug: "4", name: "Grade 4", teacher: "Ms. Armendariz", tab: "Roster-4", icon: "🗺️" },
  { slug: "5", name: "Grade 5", teacher: "Ms. De La Torre", tab: "Roster-5", icon: "🔬" },
  { slug: "specials", name: "Music & PE", teacher: "Mr. Gopar", tab: "Roster-Specials", icon: "🎵" },
  { slug: "daycare", name: "Day Care", teacher: "Ms. Parada", tab: "Roster-DayCare", icon: "🧸" },
];

export const TABS = [
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
