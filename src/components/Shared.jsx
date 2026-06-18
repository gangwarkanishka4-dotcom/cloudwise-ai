export function PBadge({ p }) {
  const c = { AWS: "b-aws", GCP: "b-gcp", Azure: "b-azure" };
  return <span className={c[p] || "b"}>{p}</span>;
}

export function SBadge({ s }) {
  const c = { high: "b b-red", crit: "b b-red", critical: "b b-red", med: "b b-amb", medium: "b b-amb", low: "b b-grn" };
  const l = { high: "High", crit: "Critical", critical: "Critical", med: "Medium", medium: "Medium", low: "Low" };
  return <span className={c[s] || "b"}>{l[s] || s}</span>;
}

export function UBar({ pct }) {
  const bg = pct > 50 ? "#16a34a" : pct > 20 ? "#d97706" : "#ef4444";
  return (
    <div className="util-row">
      <div className="util-track">
        <div className="util-fill" style={{ width: `${Math.max(pct, 2)}%`, background: bg }} />
      </div>
      <span className="util-pct">{pct}%</span>
    </div>
  );
}

export function Tip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "9px 13px", fontSize: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
      <p style={{ fontWeight: 600, color: "#0f172a", marginBottom: 5 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, display: "flex", gap: 8, marginTop: 2 }}>
          <span>{p.name}:</span><span style={{ fontWeight: 600 }}>${Number(p.value).toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
}
