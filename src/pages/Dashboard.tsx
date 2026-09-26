import { useMemo, useState } from "react";
import {
  CLASS_HUBS,
  DOCS,
  POLL_FORM,
  QUIZ_FORM,
  QUICK_ACTIONS,
  SCHOOL,
} from "../config/school";
import { useSheet } from "../lib/sheet";
import { friendlyDate, liturgicalSeason } from "../lib/faith";
import {
  ActionCard,
  Crest,
  DemoBadge,
  ErrorBox,
  Section,
  SkeletonList,
} from "../components/ui";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function monthName(m: string): string {
  const n = parseInt(m, 10);
  return n >= 1 && n <= 12 ? MONTHS[n - 1] : m;
}

/** Case-insensitive cell read — honors the dynamic-headers rule. */
function cell(row: Record<string, string>, key: string): string {
  const hit = Object.keys(row).find((k) => k.toLowerCase() === key.toLowerCase());
  return hit ? row[hit] ?? "" : "";
}

function Birthdays() {
  const { data, loading, error } = useSheet("Birthdays");
  const [retry, setRetry] = useState(0);

  const todays = useMemo(() => {
    if (!data) return [];
    const now = new Date();
    return data.rows.filter(
      (r) =>
        parseInt(cell(r, "month"), 10) === now.getMonth() + 1 &&
        parseInt(cell(r, "day"), 10) === now.getDate()
    );
  }, [data]);

  const upcoming = useMemo(() => {
    if (!data) return [];
    const now = new Date();
    const scored = data.rows.map((r) => {
      const m = parseInt(cell(r, "month"), 10);
      const d = parseInt(cell(r, "day"), 10);
      let diff =
        new Date(now.getFullYear(), m - 1, d).getTime() - now.getTime();
      if (diff < 0) diff += 365 * 24 * 3600 * 1000;
      return { r, diff };
    });
    return scored
      .sort((a, b) => a.diff - b.diff)
      .slice(0, 3)
      .map((s) => s.r);
  }, [data]);

  if (loading) return <SkeletonList rows={2} />;
  if (error || !data)
    return <ErrorBox message={error} retry={() => setRetry((n) => n + 1)} />;

  return (
    <div key={retry}>
      {data.demo && <DemoBadge />}
      {todays.length > 0 ? (
        <ul className="birthday-list">
          {todays.map((r, i) => (
            <li key={i} className="birthday-today">
              <span aria-hidden="true">🎂</span>
              <span>
                <strong>{cell(r, "name")}</strong>
                {cell(r, "role") && <span className="small"> · {cell(r, "role")}</span>}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="small">No birthdays today — but good things are coming:</p>
      )}
      {upcoming.length > 0 && (
        <ul className="upcoming-list">
          {upcoming.map((r, i) => (
            <li key={i}>
              <strong>{cell(r, "name")}</strong>
              <span className="small">
                {" "}
                · {monthName(cell(r, "month"))} {cell(r, "day")}
                {cell(r, "role") ? ` · ${cell(r, "role")}` : ""}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Absences() {
  const { data, loading, error } = useSheet("Absences");
  const [retry, setRetry] = useState(0);

  if (loading) return <SkeletonList rows={2} />;
  if (error || !data)
    return <ErrorBox message={error} retry={() => setRetry((n) => n + 1)} />;

  return (
    <div key={retry}>
      {data.demo && <DemoBadge />}
      {data.rows.length === 0 ? (
        <p className="small">Full house today — everyone's in! 🙌</p>
      ) : (
        <ul className="absence-list">
          {data.rows.slice(0, 5).map((r, i) => (
            <li key={i}>
              <strong>{cell(r, "name")}</strong>
              <span className="small">
                {cell(r, "role") ? ` · ${cell(r, "role")}` : ""}
                {cell(r, "note") ? ` — ${cell(r, "note")}` : ""}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PrayerIntention() {
  const { data, loading, error } = useSheet("TeamFeed");

  const prayer = useMemo(() => {
    if (!data) return null;
    return (
      data.rows.find((r) => cell(r, "tag").toLowerCase() === "prayer") ?? null
    );
  }, [data]);

  if (loading) return <SkeletonList rows={1} />;
  if (error || !data || !prayer) return null;

  return (
    <blockquote className="prayer-card">
      <p className="prayer-label">
        🕊️ {SCHOOL.prayerLabel} {data.demo && <DemoBadge />}
      </p>
      <p className="prayer-text">"{cell(prayer, "message")}"</p>
      {cell(prayer, "author") && (
        <cite className="small">— {cell(prayer, "author")}</cite>
      )}
    </blockquote>
  );
}

function PingStatus() {
  const { data, loading, error } = useSheet("_ping");
  if (loading) return <p className="small">Checking connection…</p>;
  if (error || !data) return <p className="small">Offline demo mode</p>;
  return (
    <p className="small">
      {data.demo ? "📴 Demo mode" : "✅ Connected"} ·{" "}
      {(data as unknown as { tabs?: string[] }).tabs?.length ?? 0} tabs reachable
    </p>
  );
}

export default function Dashboard() {
  const now = new Date();
  const season = liturgicalSeason(now);
  const explore = [
    { href: "#/bulletin", icon: "📌", label: "Bulletin Board", blurb: "Active poll + team feed" },
    { href: "#/directory", icon: "👥", label: "Staff Directory", blurb: "All 12 of us, one tap away" },
    { href: "#/library", icon: "📄", label: "Document Library", blurb: "Handbook, procedures, bells" },
    { href: "#/team", icon: "🤝", label: "Team Building", blurb: "Working-style quiz & results" },
  ];

  return (
    <div className="page">
      <header className="hero hero-compact">
        <Crest size={64} />
        <span className="eyebrow">
          {SCHOOL.name} · {SCHOOL.city}
        </span>
        <h1>Today at {SCHOOL.shortName}</h1>
        <p className="date-line">{friendlyDate(now)}</p>
        <p className="season-line">{season.line}</p>
        <p className="welcome">{SCHOOL.welcome} Good morning, team. ☀️</p>
      </header>

      <main className="main">
        <Section title="🕊️ Prayer">
          <PrayerIntention />
        </Section>

        <Section title="🎂 Birthdays">
          <Birthdays />
        </Section>

        <Section title="📋 Who's out today">
          <Absences />
        </Section>

        <Section title="⚡ Quick actions">
          <div className="action-grid">
            {QUICK_ACTIONS.map((a) => (
              <ActionCard key={a.id} link={a} />
            ))}
          </div>
        </Section>

        <Section title="🏫 Class hubs">
          <div className="hub-grid">
            {CLASS_HUBS.map((h) => (
              <a key={h.slug} className="hub-card" href={`#/class/${h.slug}`}>
                <span className="hub-icon" aria-hidden="true">
                  {h.icon}
                </span>
                <span className="hub-body">
                  <strong>{h.name}</strong>
                  <span className="small">{h.teacher}</span>
                </span>
                <span className="action-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </div>
        </Section>

        <Section title="🧭 Explore">
          <div className="action-grid">
            {explore.map((e) => (
              <a key={e.href} className="action-card" href={e.href}>
                <span className="action-icon" aria-hidden="true">
                  {e.icon}
                </span>
                <span className="action-body">
                  <span className="action-label">{e.label}</span>
                  <span className="action-blurb">{e.blurb}</span>
                </span>
                <span className="action-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </div>
        </Section>

        <Section title="📚 Documents">
          <div className="action-grid">
            {DOCS.map((d) => (
              <ActionCard
                key={d.id}
                link={{ ...d, blurb: d.blurb }}
              />
            ))}
          </div>
        </Section>

        <Section title="🔌 Connection">
          <PingStatus />
          <p className="small">
            <a href={POLL_FORM.url} target="_blank" rel="noopener noreferrer">
              Quick Poll
            </a>{" "}
            ·{" "}
            <a href={QUIZ_FORM.url} target="_blank" rel="noopener noreferrer">
              Working Style Quiz
            </a>
          </p>
        </Section>
      </main>
    </div>
  );
}
