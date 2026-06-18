import { useState } from "react";
import { RECS } from "../data/mockData";
import { PBadge, SBadge } from "./Shared";

export default function Recommendations() {
  const [applied, setApplied] = useState(new Set());
  const [f, setF] = useState("all");

  const list = RECS.filter((r) =>
    f === "all" ? true : f === "high" ? r.sev === "high" : r.provider.toLowerCase() === f
  );
  const saved = [...applied].reduce((a, i) => a + RECS[i].savings, 0);

  function toggle(i) {
    setApplied((prev) => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });
  }

  return (
    <div className="card">
      <div className="card-hdr">
        <span className="card-title" style={{ marginBottom: 0 }}>AI-Powered Recommendations</span>
        {applied.size > 0 && (
          <span className="b b-grn" style={{ fontSize: 12, padding: "4px 11px" }}>
            {applied.size} applied · ${saved.toLocaleString()}/mo saved
          </span>
        )}
      </div>
      <div className="filters">
        {[["all","All"],["high","High priority"],["aws","AWS"],["gcp","GCP"],["azure","Azure"]].map(([k,l]) => (
          <button key={k} className={"filter-btn" + (f === k ? " on" : "")} onClick={() => setF(k)}>{l}</button>
        ))}
      </div>
      <div style={{ overflowX: "auto" }}>
        <table className="tbl">
          <thead>
            <tr><th>Resource</th><th>Provider</th><th>Action</th><th>Saves/mo</th><th>Priority</th><th></th></tr>
          </thead>
          <tbody>
            {list.map((r) => {
              const idx = RECS.indexOf(r);
              return (
                <tr key={idx}>
                  <td style={{ fontWeight: 500 }}>{r.resource}</td>
                  <td><PBadge p={r.provider}/></td>
                  <td style={{ color: "#64748b" }}>{r.action}</td>
                  <td className="sv">${r.savings}</td>
                  <td><SBadge s={r.sev}/></td>
                  <td style={{ textAlign: "right" }}>
                    {applied.has(idx)
                      ? <span className="applied">Applied</span>
                      : <button className="apply-btn" onClick={() => toggle(idx)}>Apply</button>
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="success-box"><strong>Total potential savings: $4,218/month</strong> — high-priority actions alone save $2,020/mo.</div>
    </div>
  );
}
