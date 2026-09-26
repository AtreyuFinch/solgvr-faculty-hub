import { DOCS } from "../config/school";
import { ActionCard, PageHeader, Section } from "../components/ui";

export default function Library() {
  return (
    <div className="page">
      <main className="main">
        <PageHeader
          title="Document Library"
          sub="Family Handbook, Emergency Procedures, Bell Schedule — no hunting through Drive."
          icon="📄"
        />
        <Section title="📚 Key documents">
          <div className="action-grid">
            {DOCS.map((d) => (
              <ActionCard key={d.id} link={d} />
            ))}
          </div>
        </Section>
      </main>
    </div>
  );
}
