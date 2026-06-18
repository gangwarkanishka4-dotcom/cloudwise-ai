import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { SPEND_TREND, PROVIDERS, ANOMALIES } from "../data/mockData";
import { Tip, SBadge } from "./Shared";

export default function Dashboard() {
  const metrics = [
    { label: "Total Spend (MTD)", val: "$28,491", delta: "↑ 8.3% vs last month",      dir: "up"   },
    { label: "Projected Monthly",  val: "$41,200", delta: "↓ -12% with optimisations", dir: "down" },
    { label: "Potential Savings",  val: "$4,218",  delta: "14 actions identified",      dir: "flat", green: true },
    { label: "Waste Score",        val: "23%",     delta: "↓ Down from 31%",           dir: "down", amber: true },
  ];

  return (
    <div>
      <div className="metrics">
        {metrics.map((m) => (
          <div className="metric" key={m.label}>
            <p className="metric-label">{m.label}</p>
            <p className={"metric-val" + (m.green ? " green" : m.amber ? " amber" : "")}>{m.val}</p>
            <p className={"delta " + m.dir}>{m.delta}</p>
          </div>
        ))}
      </div>

      <div className="g2">
        <div className="card">
          <p className="card-title">Spend trend — last 7 days</p>
          <ResponsiveContainer width="100%" height={195}>
            <AreaChart data={SPEND_TREND}>
              <defs>
                <linearGradient id="ga" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#d97706" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="gg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#16a34a" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="gz" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#2563eb" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
              <XAxis dataKey="day" tick={{ fontSize: 10 }}/>
              <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => "$" + (v/1000).toFixed(1) + "k"}/>
              <Tooltip content={<Tip />}/>
              <Legend wrapperStyle={{ fontSize: 11 }}/>
              <Area type="monotone" dataKey="aws"   name="AWS"   stroke="#d97706" fill="url(#ga)" strokeWidth={2} dot={{ r: 3 }} animationDuration={800}/>
              <Area type="monotone" dataKey="gcp"   name="GCP"   stroke="#16a34a" fill="url(#gg)" strokeWidth={2} dot={{ r: 3 }} animationDuration={1000}/>
              <Area type="monotone" dataKey="azure" name="Azure" stroke="#2563eb" fill="url(#gz)" strokeWidth={2} dot={{ r: 3 }} animationDuration={1200}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <p className="card-title">Spend by provider</p>
          {PROVIDERS.map((p) => (
            <div className="bar-item" key={p.name}>
              <div className="bar-hdr">
                <span className="bar-name">{p.name}</span>
                <span className="bar-amt">${p.amount.toLocaleString()}</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: p.pct + "%", background: p.color }}/>
              </div>
            </div>
          ))}
          <ResponsiveContainer width="100%" height={85}>
            <PieChart>
              <Pie data={PROVIDERS} dataKey="amount" nameKey="name" cx="50%" cy="50%" outerRadius={38} innerRadius={20} animationDuration={800}>
                {PROVIDERS.map((p) => <Cell key={p.name} fill={p.color}/>)}
              </Pie>
              <Tooltip formatter={(v) => "$" + v.toLocaleString()}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <p className="card-title">Top anomalies</p>
        {ANOMALIES.slice(0, 3).map((a) => (
          <div key={a.title} className={"anom " + (a.sev === "crit" ? "crit" : a.sev === "med" ? "med" : "low")}>
            <span className={"anom-dot " + (a.sev === "crit" ? "d-red" : a.sev === "med" ? "d-amb" : "d-blue")}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="anom-title">{a.title} <SBadge s={a.sev}/></div>
              <div className="anom-sub">{a.provider} · {a.sub}</div>
            </div>
            <span className="anom-cost">{a.cost}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
