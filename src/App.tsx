import { useEffect, useState } from "react";
import "./index.css";

/** What Phase 2 (Sat build) will bring online. Keep honest: nothing here is live yet. */
const COMING = [
  { icon: "🏠", title: "Today at St. Joseph", body: "Date, Ordinary Time, birthdays, prayer intention, and your quick-action cards." },
  { icon: "📚", title: "7 Class Hubs", body: "TK–Kindergarten through Grade 5, Music & PE, and Day Care — rosters and links in one tap." },
  { icon: "📌", title: "Bulletin Board", body: "Active poll plus the team feed — see what's happening, add your voice." },
  { icon: "👥", title: "Staff Directory", body: "All 12 faculty & staff, one tap away. ¡Bienvenidos a la familia!" },
  { icon: "📄", title: "Document Library", body: "Family Handbook, Emergency Procedures, Bell Schedule — no hunting through Drive." },
  { icon: "🤝", title: "Team Building", body: "Working-style quiz and results — know how your team works best." },
] as const;

function Crest() {
  return (
    <svg className="crest" viewBox="0 0 96 96" role="img" aria-label="St. Joseph crest">
      <circle cx="48" cy="48" r="46" fill="#123f20" stroke="#d4af37" strokeWidth="3" />
      <circle cx="48" cy="48" r="38" fill="none" stroke="#d4af37" strokeWidth="1.5" opacity="0.7" />
      <text x="48" y="60" fontSize="30" textAnchor="middle" fill="#d4af37" fontFamily="Georgia, serif" fontWeight="bold">SJ</text>
      <text x="48" y="76" fontSize="8.5" textAnchor="middle" fill="#ffffff" fontFamily="Georgia, serif" letterSpacing="1.5">POMONA</text>
      <path d="M48 14 l3 6 6 1 -4.5 4.5 1 6.5 -5.5 -3 -5.5 3 1 -6.5 -4.5 -4.5 6 -1 z" fill="#d4af37" opacity="0.9" />
    </svg>
  );
}

type PingState = "loading" | "ok" | "warn";

export default function App() {
  const [ping, setPing] = useState<PingState>("loading");
  const [pingDetail, setPingDetail] = useState("");

  useEffect(() => {
    fetch("/api/sheet?tab=_ping")
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const j = await r.json();
        setPing("ok");
        setPingDetail(`API live — ${j.tabs?.length ?? 0} tabs reachable · ${j.demo ? "demo mode" : "connected"}`);
      })
      .catch(() => {
        setPing("warn");
        setPingDetail("API warming up — static page is live");
      });
  }, []);

  return (
    <div className="page">
      <header className="hero">
        <Crest />
        <span className="eyebrow">St. Joseph School · Pomona</span>
        <h1>Faculty Intranet</h1>
        <p className="welcome">¡Bienvenidos! Your new home is almost ready.</p>
        <p className="lede">
          One home for your day: attendance, requests, news, prayer, and each
          other — fast on your phone, with no clunky pages to wait on.
        </p>
        <div className="status-pill" role="status">
          <span className="dot" aria-hidden="true" />
          Coming online · Sunday, September 27
        </div>
        <div className="hero-cta">
          <a className="btn btn-gold" href="#whats-coming">See what's coming</a>
          <a className="btn btn-ghost" href="#pipeline">Check the pipeline</a>
        </div>
      </header>

      <main>
        <section className="section" id="whats-coming" aria-label="What's coming">
          <h2>What's coming Sunday</h2>
          <p className="sub">Built for you, with love — <em>Intenciones de oración</em> included.</p>
          <ul className="coming-grid">
            {COMING.map((c) => (
              <li className="coming-card" key={c.title}>
                <span className="icon" aria-hidden="true">{c.icon}</span>
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="pipeline" id="pipeline">
            <h3>Deploy pipeline · live check</h3>
            <p>
              Static page served from Vercel. Serverless API at{" "}
              <code>/api/sheet?tab=_ping</code>
            </p>
            <p className="api-state" role="status">
              {ping === "loading" && "Checking API…"}
              {ping === "ok" && <span className="api-ok">✓ {pingDetail}</span>}
              {ping === "warn" && <span className="api-warn">… {pingDetail}</span>}
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p className="serif">St. Joseph School · Pomona</p>
        <div className="gold-rule" aria-hidden="true" />
        <p>Faculty Intranet · built with care by SolGVR Labs</p>
        <p>Demo data only · nothing real, nothing published</p>
      </footer>
    </div>
  );
}
