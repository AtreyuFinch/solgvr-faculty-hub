import { useState } from "react";
import { CLASS_HUBS, QUICK_ACTIONS } from "../config/school";
import { useSheet } from "../lib/sheet";
import {
  ActionCard,
  DemoBadge,
  ErrorBox,
  PageHeader,
  Section,
  SkeletonList,
} from "../components/ui";

function pretty(header: string): string {
  return header
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function ClassHub({ slug }: { slug: string }) {
  const hub = CLASS_HUBS.find((h) => h.slug === slug);
  const { data, loading, error } = useSheet(hub?.tab ?? "");
  const [retry, setRetry] = useState(0);

  if (!hub) {
    return (
      <div className="page">
        <main className="main">
          <PageHeader title="Class not found" icon="🔍" />
          <p>
            <a href="#/classes">Back to class hubs</a>
          </p>
        </main>
      </div>
    );
  }

  const hubActions = QUICK_ACTIONS.filter((a) =>
    ["attendance", "absence", "mike"].includes(a.id)
  );

  return (
    <div className="page">
      <main className="main">
        <p className="crumbs">
          <a href="#/">Home</a> · <a href="#/classes">Classes</a>
        </p>
        <PageHeader
          title={`${hub.name} — ${hub.teacher}`}
          sub={`${data?.rows.length ?? "…"} on the roster · demo data`}
          icon={hub.icon}
        />

        <Section title="📋 Roster">
          {loading && <SkeletonList rows={5} />}
          {(error || !data) && !loading && (
            <ErrorBox message={error} retry={() => setRetry((n) => n + 1)} />
          )}
          {data && (
            <div key={retry} className="table-wrap">
              <table className="roster-table">
                <caption className="small">
                  Roster {data.demo && <DemoBadge />}
                </caption>
                <thead>
                  <tr>
                    {data.headers.map((h) => (
                      <th key={h} scope="col">
                        {pretty(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.rows.map((row, i) => (
                    <tr key={i}>
                      {data.headers.map((h) => (
                        <td key={h}>{row[h] ?? ""}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {data.rows.length === 0 && (
                <p className="small">No roster rows yet.</p>
              )}
            </div>
          )}
        </Section>

        <Section title="⚡ Quick actions">
          <div className="action-grid">
            {hubActions.map((a) => (
              <ActionCard key={a.id} link={a} />
            ))}
          </div>
        </Section>
      </main>
    </div>
  );
}
