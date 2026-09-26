import { STAFF } from "../config/school";
import { PageHeader, Section } from "../components/ui";

export default function Directory() {
  return (
    <div className="page">
      <main className="main">
        <PageHeader
          title="Staff Directory"
          sub="All 12 of us, one tap away. ¡Bienvenidos a la familia!"
          icon="👥"
        />
        <Section title="Faculty & staff">
          <ul className="staff-list">
            {STAFF.map((s) => (
              <li key={s.name} className="staff-card">
                <span className="staff-avatar" aria-hidden="true">
                  {s.name.replace(/^(Father|Mrs\.|Ms\.|Mr\.)\s+/, "").charAt(0)}
                </span>
                <span className="staff-body">
                  <strong>{s.name}</strong>
                  {s.role && <span className="small"> · {s.role}</span>}
                  {s.email && (
                    <span className="staff-email">
                      <a href={`mailto:${s.email}`}>{s.email}</a>
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      </main>
    </div>
  );
}
