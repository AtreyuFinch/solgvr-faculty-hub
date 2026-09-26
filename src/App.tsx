import { useEffect, useState } from "react";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import Classes from "./pages/Classes";
import ClassHub from "./pages/ClassHub";
import Bulletin from "./pages/Bulletin";
import Directory from "./pages/Directory";
import Library from "./pages/Library";
import Team from "./pages/Team";
import { Footer } from "./components/ui";

const NAV = [
  { href: "#/", label: "Home", icon: "🏠" },
  { href: "#/classes", label: "Classes", icon: "🏫" },
  { href: "#/bulletin", label: "Bulletin", icon: "📌" },
  { href: "#/directory", label: "Staff", icon: "👥" },
  { href: "#/library", label: "Docs", icon: "📄" },
  { href: "#/team", label: "Team", icon: "🤝" },
] as const;

function useHashRoute(): string {
  const [hash, setHash] = useState(() => window.location.hash || "#/");
  useEffect(() => {
    const onChange = () => {
      setHash(window.location.hash || "#/");
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return hash;
}

function Route({ hash }: { hash: string }) {
  if (hash === "#/" || hash === "" || hash === "#") return <Dashboard />;
  if (hash === "#/classes") return <Classes />;
  if (hash.startsWith("#/class/")) return <ClassHub slug={hash.slice("#/class/".length)} />;
  if (hash === "#/bulletin") return <Bulletin />;
  if (hash === "#/directory") return <Directory />;
  if (hash === "#/library") return <Library />;
  if (hash === "#/team") return <Team />;
  return <Dashboard />;
}

function isActive(hash: string, href: string): boolean {
  if (href === "#/") return hash === "#/" || hash === "" || hash === "#";
  if (href === "#/classes") return hash === "#/classes" || hash.startsWith("#/class/");
  return hash === href;
}

export default function App() {
  const hash = useHashRoute();

  return (
    <>
      <Route hash={hash} />
      <Footer />
      <nav className="bottom-nav" aria-label="Main navigation">
        {NAV.map((n) => (
          <a
            key={n.href}
            href={n.href}
            className={`nav-item${isActive(hash, n.href) ? " nav-active" : ""}`}
            aria-current={isActive(hash, n.href) ? "page" : undefined}
          >
            <span className="nav-icon" aria-hidden="true">
              {n.icon}
            </span>
            <span className="nav-label">{n.label}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
