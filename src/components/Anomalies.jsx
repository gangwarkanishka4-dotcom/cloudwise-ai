import { ANOMALIES, SPEND_TREND } from "../data/mockData";
import { SBadge } from "./Shared";
import { detectAnomalies } from "../utils/anomaly";

export default function Anomalies() {
  const results  = detectAnomalies(SPEND_TREND.map((d) => d.aws));
  const flagged  = results.filter((r) => r.isAnomaly);

  return (
    <div>
      <div className="card mb">
        <p className="card-title">Statistical Anomaly Detection (Z-score Algorithm)</p>
        <p style={{ fontSize: 12, color: "#64748b", marginBottom: 12 }}>
          Analysed {SPEND_TREND.length} days of AWS spend. Days exceeding mean + 2 standard deviations are flagged.
        </p>
        {flagged.length > 0
          ? flagged.map((f) => (
            <div key={f.index} className="anom crit">
              <span className="anom-dot d-red"/>
              <div style={{ flex: 1 }}>
                <div className="anom-title">{SPEND_TREND[f.index]?.day} — AWS spike <SBadge s="crit"/></div>
                <div className="anom-sub">Spend: ${f.cost.toLocaleString()} · Z-score: {f.zScore}σ above mean</div>
              </div>
              <span className="anom-cost">${f.cost.toLocaleString()}</span>
            </div>
          ))
          : <div className="success-box">No statistical anomalies detected in this dataset.</div>
        }
      </div>

      <div className="card">
        <div className="card-hdr">
          <span className="card-title" style={{ marginBottom: 0 }}>All Anomalies</span>
          <span style={{ fontSize: 11, color: "#94a3b8" }}>Updates every 15 min</span>
        </div>
        {ANOMALIES.map((a) => (
          <div key={a.title} className={"anom " + (a.sev === "crit" ? "crit" : a.sev === "med" ? "med" : "low")}>
            <span className={"anom-dot " + (a.sev === "crit" ? "d-red" : a.sev === "med" ? "d-amb" : "d-blue")}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="anom-title">{a.title} <SBadge s={a.sev}/></div>
              <div className="anom-sub">{a.provider} · {a.sub}</div>
              <div className="anom-age">{a.age}</div>
            </div>
            <span className="anom-cost">{a.cost}</span>
          </div>
        ))}
        <div className="warn-box">The EC2 data transfer spike is <strong>active right now</strong> — check your NAT Gateway in us-east-1.</div>
      </div>
    </div>
  );
}
