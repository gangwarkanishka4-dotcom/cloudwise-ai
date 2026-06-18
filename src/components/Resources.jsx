import { useState } from "react";
import { RESOURCES } from "../data/mockData";
import { PBadge, SBadge, UBar } from "./Shared";

export default function Resources() {
  const [f, setF] = useState("all");
  const list = RESOURCES.filter((r) =>
    f === "all" ? true : f === "waste" ? r.waste === "high" : r.provider.toLowerCase() === f
  );
  return (
    <div className="card">
      <div className="card-hdr">
        <span className="card-title" style={{ marginBottom: 0 }}>Resource Inventory</span>
        <span style={{ fontSize: 12, color: "#64748b" }}>{list.length} shown · {list.filter(r => r.waste === "high").length} high waste</span>
      </div>
      <div className="filters">
        {[["all","All"],["aws","AWS"],["gcp","GCP"],["azure","Azure"],["waste","High Waste"]].map(([k,l]) => (
          <button key={k} className={"filter-btn" + (f === k ? " on" : "")} onClick={() => setF(k)}>{l}</button>
        ))}
      </div>
      <div style={{ overflowX: "auto" }}>
        <table className="tbl">
          <thead>
            <tr><th>Resource</th><th>Provider</th><th>Type</th><th style={{ minWidth: 130 }}>CPU Util.</th><th>Cost/mo</th><th>Waste</th></tr>
          </thead>
          <tbody>
            {list.map((r) => (
              <tr key={r.name}>
                <td style={{ fontWeight: 600 }}>{r.name}</td>
                <td><PBadge p={r.provider}/></td>
                <td style={{ color: "#64748b" }}>{r.type}</td>
                <td><UBar pct={r.cpu}/></td>
                <td style={{ fontWeight: 500 }}>${r.cost}</td>
                <td><SBadge s={r.waste}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
