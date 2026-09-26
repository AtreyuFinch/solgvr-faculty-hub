import type { ReactNode } from "react";
import { SCHOOL, type ActionLink } from "../config/school";

export function Crest({ size = 72 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      role="img"
      aria-label="St. Joseph crest"
      className="crest"
    >
      <circle cx="48" cy="48" r="46" fill="#123f20" stroke="#d4af37" strokeWidth="3" />
      <circle cx="48" cy="48" r="38" fill="none" stroke="#d4af37" strokeWidth="1.5" opacity="0.7" />
      <text x="48" y="60" fontSize="30" textAnchor="middle" fill="#d4af37" fontFamily="Georgia, serif" fontWeight="bold">
        SJ
      </text>
      <text x="48" y="76" fontSize="8.5" textAnchor="middle" fill="#ffffff" fontFamily="Georgia, serif" letterSpacing="1.5">
        POMONA
      </text>
      <path
        d="M48 14 l3 6 6 1 -4.5 4.5 1 6.5 -5.5 -3 -5.5 3 1 -6.5 -4.5 -4.5 6 -1 z"
        fill="#d4af37"
        opacity="0.9"
      />
    </svg>
  );
}

export function PageHeader({
  title,
  sub,
  icon,
}: {
  title: string;
  sub?: string;
  icon?: string;
}) {
  return (
    <div className="page-head">
      {icon && (
        <span className="page-head-icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <div>
        <h1>{title}</h1>
        {sub && <p className="sub">{sub}</p>}
      </div>
    </div>
  );
}

export function DemoBadge() {
  return (
    <span className="demo-badge" title="Demo data — connect your sheet to go live">
      demo
    </span>
  );
}

export function SkeletonList({ rows = 3 }: { rows?: number }) {
  return (
    <div aria-label="Loading" role="status">
      {Array.from({ length: rows }, (_, i) => (
        <div className="skeleton" key={i} />
      ))}
    </div>
  );
}

export function ErrorBox({ message, retry }: { message: string; retry: () => void }) {
  return (
    <div className="error-box" role="alert">
      <p>
        <strong>Couldn't load this section.</strong>
        <br />
        <span className="small">{message}</span>
      </p>
      <button className="btn btn-primary" onClick={retry}>
        Try again
      </button>
    </div>
  );
}

/** External link card — every write in v1 is a deep link to a Google Form. */
export function ActionCard({ link, demo }: { link: ActionLink; demo?: boolean }) {
  return (
    <a
      className="action-card"
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${link.label} — opens in a new tab`}
    >
      <span className="action-icon" aria-hidden="true">
        {link.icon}
      </span>
      <span className="action-body">
        <span className="action-label">
          {link.label} {demo && <DemoBadge />}
        </span>
        <span className="action-blurb">{link.blurb}</span>
      </span>
      <span className="action-arrow" aria-hidden="true">
        →
      </span>
    </a>
  );
}

export function Section({
  title,
  children,
  action,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="dash-section" aria-label={title}>
      <div className="dash-section-head">
        <h2>{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <p className="serif">
        {SCHOOL.name} · {SCHOOL.city}
      </p>
      <div className="gold-rule" aria-hidden="true" />
      <p>Faculty Intranet · built with care by SolGVR Labs</p>
      <p>Demo data only · nothing real, nothing published</p>
    </footer>
  );
}
