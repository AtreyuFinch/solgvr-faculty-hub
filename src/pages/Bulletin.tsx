import { useMemo, useState } from "react";
import { POLL_FORM } from "../config/school";
import { useSheet } from "../lib/sheet";
import {
  ActionCard,
  DemoBadge,
  ErrorBox,
  PageHeader,
  Section,
  SkeletonList,
} from "../components/ui";

function cell(row: Record<string, string>, key: string): string {
  const hit = Object.keys(row).find((k) => k.toLowerCase() === key.toLowerCase());
  return hit ? row[hit] ?? "" : "";
}

function ActivePoll() {
  const { data, loading, error } = useSheet("Polls");
  const [retry, setRetry] = useState(0);

  const active = useMemo(() => {
    if (!data) return null;
    return (
      data.rows.find((r) => cell(r, "status").toLowerCase() === "active") ?? null
    );
  }, [data]);

  if (loading) return <SkeletonList rows={2} />;
  if (error || !data)
    return <ErrorBox message={error} retry={() => setRetry((n) => n + 1)} />;

  return (
    <div key={retry}>
      {data.demo && <DemoBadge />}
      {active ? (
        <div className="poll-card">
          <p className="poll-status">🟢 Active now</p>
          <h3>{cell(active, "question")}</h3>
          <ul className="poll-options">
            {["option_a", "option_b", "option_c", "option_d"]
              .map((k) => cell(active, k))
              .filter(Boolean)
              .map((opt, i) => (
                <li key={i}>{opt}</li>
              ))}
          </ul>
          {cell(active, "closes") && (
            <p className="small">Closes {cell(active, "closes")}</p>
          )}
          <ActionCard link={POLL_FORM} />
        </div>
      ) : (
        <div>
          <p>No active poll right now — check back soon!</p>
          <ActionCard link={POLL_FORM} />
        </div>
      )}
    </div>
  );
}

const TAG_ICON: Record<string, string> = {
  prayer: "🕊️",
  announcement: "📣",
  shoutout: "💛",
};

function TeamFeed() {
  const { data, loading, error } = useSheet("TeamFeed");
  const [retry, setRetry] = useState(0);

  const posts = useMemo(() => {
    if (!data) return [];
    return [...data.rows].sort((a, b) =>
      cell(b, "date").localeCompare(cell(a, "date"))
    );
  }, [data]);

  if (loading) return <SkeletonList rows={3} />;
  if (error || !data)
    return <ErrorBox message={error} retry={() => setRetry((n) => n + 1)} />;

  return (
    <div key={retry}>
      {data.demo && <DemoBadge />}
      {posts.length === 0 ? (
        <p className="small">The feed is quiet — share something with the team!</p>
      ) : (
        <ul className="feed-list">
          {posts.map((p, i) => {
            const tag = cell(p, "tag").toLowerCase();
            return (
              <li key={i} className="feed-post">
                <p className="feed-meta">
                  <span aria-hidden="true">{TAG_ICON[tag] ?? "💬"}</span>{" "}
                  <strong>{cell(p, "author")}</strong>
                  <span className="small">
                    {" "}
                    · {cell(p, "date")}
                    {tag ? ` · ${tag}` : ""}
                  </span>
                </p>
                <p className="feed-message">{cell(p, "message")}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function Bulletin() {
  return (
    <div className="page">
      <main className="main">
        <PageHeader
          title="Bulletin Board"
          sub="The active poll plus the team feed — see what's happening, add your voice."
          icon="📌"
        />
        <Section title="🗳️ Active poll">
          <ActivePoll />
        </Section>
        <Section title="💬 Team feed">
          <TeamFeed />
        </Section>
      </main>
    </div>
  );
}
