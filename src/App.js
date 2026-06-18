import { useState } from "react";
import { NAV } from "./data/mockData";
import Dashboard       from "./components/Dashboard";
import Recommendations from "./components/Recommendations";
import Forecast        from "./components/Forecast";
import Resources       from "./components/Resources";
import Anomalies       from "./components/Anomalies";
import Savings         from "./components/Savings";
import AIAssistant     from "./components/AIAssistant";

const PAGES = {
  dashboard: <Dashboard />,
  recs:      <Recommendations />,
  forecast:  <Forecast />,
  resources: <Resources />,
  anomalies: <Anomalies />,
  savings:   <Savings />,
  ai:        <AIAssistant />,
};

const GROUPS = [...new Set(NAV.map((n) => n.group))];

export default function App() {
  const [active, setActive] = useState("dashboard");
  const [sidebar, setSidebar] = useState(true);
  const [dark, setDark]     = useState(false);

  const cur = NAV.find((n) => n.id === active);

  return (
    <div className={"app" + (dark ? " dark" : "")}>

      {/* ── TOPBAR ── */}
      <header className="topbar">
        <button className="menu-btn" onClick={() => setSidebar((s) => !s)}>☰</button>

        <div className="logo">
          <div className="logo-icon">☁</div>
          <span className="logo-name">CloudWise AI</span>
          <span className="logo-tag">Multi-Cloud</span>
        </div>

        <div className="topbar-right">
          <div className="pills">
            <span className="pill-aws">AWS</span>
            <span className="pill-gcp">GCP</span>
            <span className="pill-azure">Azure</span>
          </div>
          <span className="live"><span className="live-dot"/>Live</span>
          <button className="theme-btn" onClick={() => setDark((d) => !d)} title="Toggle dark mode">
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      <div className="body">

        {/* ── SIDEBAR ── */}
        {sidebar && (
          <aside className="sidebar">
            {GROUPS.map((group) => (
              <div className="nav-section" key={group}>
                <p className="nav-section-title">{group}</p>
                {NAV.filter((n) => n.group === group).map((n) => (
                  <button
                    key={n.id}
                    className={"nav-btn" + (active === n.id ? " active" : "")}
                    onClick={() => setActive(n.id)}
                  >
                    <span className="nav-label">{n.label}</span>
                    {n.badge && (
                      <span className={n.bt === "green" ? "badge-green" : "badge-red"}>
                        {n.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ))}
            <div className="ai-tip">
              <p className="ai-tip-title">💡 AI Insight</p>
              <p className="ai-tip-body">Save <strong>$4,218/mo</strong> by rightsizing 6 EC2 instances</p>
            </div>
          </aside>
        )}

        {/* ── MAIN ── */}
        <main className="main">
          <div className="inner">
            <div className="page-hdr">
              <div>
                <h1 className="page-title">{cur?.label}</h1>
                <p className="page-sub">Last updated: Jun 15, 2026 · 3 clouds connected</p>
              </div>
              {active === "recs" && (
                <span className="b b-grn" style={{ fontSize: 13, padding: "5px 13px", marginTop: 4 }}>
                  Total savings: $4,218/mo
                </span>
              )}
              {active === "anomalies" && (
                <span className="b b-red" style={{ fontSize: 13, padding: "5px 13px", marginTop: 4 }}>
                  1 active · 3 pending
                </span>
              )}
            </div>

            {PAGES[active]}
          </div>
        </main>

      </div>
    </div>
  );
}
