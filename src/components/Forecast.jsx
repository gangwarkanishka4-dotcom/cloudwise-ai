import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { FORECAST_DATA, BUDGET_DATA } from "../data/mockData";
import { Tip } from "./Shared";

export default function Forecast() {
  return (
    <div>
      <div className="g3">
        {[
          { p: "AWS",   val: "$18,420", delta: "↑ +13.5%", up: true  },
          { p: "GCP",   val: "$8,150",  delta: "↑ +3.3%",  up: true  },
          { p: "Azure", val: "$4,100",  delta: "↓ -6.1%",  up: false },
        ].map((fc) => (
          <div className="fc-card" key={fc.p}>
            <p className="fc-lbl">{fc.p} — next 30 days</p>
            <p className="fc-val">{fc.val}</p>
            <p className={"fc-d delta " + (fc.up ? "up" : "down")}>{fc.delta} vs current</p>
          </div>
        ))}
      </div>

      <div className="card mb">
        <p className="card-title">90-day forecast — with vs without optimisations</p>
        <ResponsiveContainer width="100%" height={205}>
          <LineChart data={FORECAST_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
            <XAxis dataKey="month" tick={{ fontSize: 11 }}/>
            <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => "$" + (v/1000).toFixed(0) + "k"}/>
            <Tooltip content={<Tip />}/>
            <Legend wrapperStyle={{ fontSize: 11 }}/>
            <Line type="monotone" dataKey="actual"    name="Without opt." stroke="#dc2626" strokeWidth={2} strokeDasharray="5 3" dot={{ r: 4 }} animationDuration={800}/>
            <Line type="monotone" dataKey="optimized" name="With opt."    stroke="#16a34a" strokeWidth={2} dot={{ r: 4 }} animationDuration={1000}/>
          </LineChart>
        </ResponsiveContainer>
        <div className="success-box">
          Applying all 14 recommendations → <strong>$25,800/mo by September</strong> vs a no-action projection of <strong>$41,200/mo</strong>.
        </div>
      </div>

      <div className="card">
        <p className="card-title">Budget vs actual — top AWS services</p>
        <ResponsiveContainer width="100%" height={190}>
          <BarChart data={BUDGET_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
            <XAxis dataKey="service" tick={{ fontSize: 11 }}/>
            <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => "$" + (v/1000).toFixed(0) + "k"}/>
            <Tooltip content={<Tip />}/>
            <Legend wrapperStyle={{ fontSize: 11 }}/>
            <Bar dataKey="budget" name="Budget" fill="#bfdbfe" radius={[4,4,0,0]} animationDuration={800}/>
            <Bar dataKey="actual" name="Actual" fill="#d97706" radius={[4,4,0,0]} animationDuration={1000}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
