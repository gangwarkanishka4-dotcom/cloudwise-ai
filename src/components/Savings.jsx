import { PieChart, Pie, Cell, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { SAVINGS_PIE, REALIZED } from "../data/mockData";

export default function Savings() {
  return (
    <div>
      <div className="g2e">
        <div className="card">
          <p className="card-title">Savings by category</p>
          {SAVINGS_PIE.map((s) => (
            <div className="prog-item" key={s.name}>
              <div className="prog-hdr">
                <span className="prog-lbl">{s.name}</span>
                <span className="prog-val">${s.value.toLocaleString()}/mo</span>
              </div>
              <div className="prog-track">
                <div className="prog-fill" style={{ width: (s.value / 4218 * 100).toFixed(1) + "%", background: s.color }}/>
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <p className="card-title" style={{ alignSelf: "flex-start" }}>Breakdown</p>
          <ResponsiveContainer width="100%" height={165}>
            <PieChart>
              <Pie data={SAVINGS_PIE} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={62} innerRadius={35} animationDuration={800}>
                {SAVINGS_PIE.map((s) => <Cell key={s.name} fill={s.color}/>)}
              </Pie>
              <Tooltip formatter={(v) => "$" + v.toLocaleString() + "/mo"}/>
              <Legend wrapperStyle={{ fontSize: 10 }}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ textAlign: "center", marginTop: 4 }}>
            <p style={{ fontSize: 21, fontWeight: 700, color: "#15803d" }}>$4,218/mo</p>
            <p style={{ fontSize: 11, color: "#64748b" }}>total potential savings</p>
          </div>
        </div>
      </div>

      <div className="card">
        <p className="card-title">Realised savings — last 6 months</p>
        <ResponsiveContainer width="100%" height={165}>
          <BarChart data={REALIZED}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
            <XAxis dataKey="month" tick={{ fontSize: 11 }}/>
            <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => "$" + v}/>
            <Tooltip formatter={(v) => ["$" + v.toLocaleString(), "Saved"]}/>
            <Bar dataKey="saved" name="Saved" fill="#16a34a" radius={[4,4,0,0]} animationDuration={800}/>
          </BarChart>
        </ResponsiveContainer>
        <div className="success-box">Cumulative savings this year: <strong>$10,540</strong>. Projecting <strong>$50,616 annual savings</strong> if all recommendations applied.</div>
      </div>
    </div>
  );
}
