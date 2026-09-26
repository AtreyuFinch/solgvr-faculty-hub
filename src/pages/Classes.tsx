import { CLASS_HUBS } from "../config/school";
import { PageHeader } from "../components/ui";

export default function Classes() {
  return (
    <div className="page">
      <main className="main">
        <PageHeader
          title="Class Hubs"
          sub="Seven classrooms, one tap each — rosters and quick actions."
          icon="🏫"
        />
        <div className="hub-grid">
          {CLASS_HUBS.map((h) => (
            <a key={h.slug} className="hub-card hub-card-lg" href={`#/class/${h.slug}`}>
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
      </main>
    </div>
  );
}
