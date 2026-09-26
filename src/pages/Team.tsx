import { useMemo, useState } from "react";
import { QUIZ_FORM } from "../config/school";
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

function QuizResults() {
  const { data, loading, error } = useSheet("QuizResults");
  const [retry, setRetry] = useState(0);

  const tally = useMemo(() => {
    if (!data) return [];
    const counts = new Map<string, number>();
    for (const r of data.rows) {
      const style = cell(r, "style") || "—";
      counts.set(style, (counts.get(style) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [data]);

  if (loading) return <SkeletonList rows={3} />;
  if (error || !data)
    return <ErrorBox message={error} retry={() => setRetry((n) => n + 1)} />;

  const max = tally.length ? tally[0][1] : 1;

  return (
    <div key={retry}>
      {data.demo && <DemoBadge />}
      <p className="small">
        {data.rows.length} {data.rows.length === 1 ? "teammate has" : "teammates have"} taken
        the quiz — know how your team works best!
      </p>
      <ul className="tally-list">
        {tally.map(([style, count]) => (
          <li key={style} className="tally-row">
            <span className="tally-label">{style}</span>
            <span className="tally-bar" aria-hidden="true">
              <span
                className="tally-fill"
                style={{ width: `${Math.max(8, (count / max) * 100)}%` }}
              />
            </span>
            <span className="tally-count">{count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Team() {
  return (
    <div className="page">
      <main className="main">
        <PageHeader
          title="Team Building"
          sub="Working-style quiz and results — the better we know each other, the stronger we teach."
          icon="🤝"
        />
        <Section title="🧭 Take the quiz">
          <ActionCard link={QUIZ_FORM} />
          <p className="small" style={{ marginTop: 12 }}>
            Two minutes, honest answers — your style shows up in the team results
            below.
          </p>
        </Section>
        <Section title="📊 Team results">
          <QuizResults />
        </Section>
      </main>
    </div>
  );
}
