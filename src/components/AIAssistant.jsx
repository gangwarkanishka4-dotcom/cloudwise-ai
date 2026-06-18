import { useState, useRef, useEffect } from "react";
import { SPEND_TREND } from "../data/mockData";

const ANSWERS = {
  "Which EC2 instances should I rightsize?":
    "Based on 30-day CPU data:\n\n• prod-api-1 (m5.4xlarge) — only 14% avg CPU → downsize to m5.xlarge → saves $680/mo\n• analytics-db (r5.2xlarge) — 22% CPU → r5.large → saves $540/mo\n• dev-server (m5.xlarge) — 8% CPU, over-provisioned for dev\n\nTotal: $1,220/mo saved with minimal risk. Start with dev-server (zero prod impact).",
  "What is my biggest cost driver?":
    "EC2 compute on AWS at 38% of total spend ($10,826 MTD). Root causes:\n\n• 6 instances on on-demand pricing but running 24/7\n• Active data transfer spike (+$892 today in us-east-1)\n• RDS instance over-provisioned by 2x\n\nImmediate action: fix the NAT Gateway causing the data transfer spike.",
  "Reserved Instances or Savings Plans?":
    "For your workload, use both:\n\n• Reserved Instances (1-yr, partial upfront) for 6 always-on EC2 + RDS → $780/mo savings\n• Compute Savings Plans for Lambda and burst GCE jobs → flexible coverage\n\nRIs give 5-8% better discount when instance type is stable. Your EC2 fleet qualifies.",
  "How to fix the data transfer spike?":
    "The us-east-1 spike is likely a misconfigured NAT Gateway:\n\n1. Go to VPC → NAT Gateways → check us-east-1\n2. Create VPC Endpoints for S3 and DynamoDB (free)\n3. Update route tables to use the endpoints\n4. Monitor data transfer in Cost Explorer daily\n\nThis fix typically saves $400-800/mo.",
};

function getAnswer(q) {
  const exact = ANSWERS[q];
  if (exact) return exact;
  const ql = q.toLowerCase();
  if (ql.includes("rightsize") || ql.includes("ec2")) return ANSWERS["Which EC2 instances should I rightsize?"];
  if (ql.includes("cost driver") || ql.includes("biggest")) return ANSWERS["What is my biggest cost driver?"];
  if (ql.includes("reserved") || ql.includes("savings plan")) return ANSWERS["Reserved Instances or Savings Plans?"];
  if (ql.includes("spike") || ql.includes("nat") || ql.includes("transfer")) return ANSWERS["How to fix the data transfer spike?"];
  const total = SPEND_TREND.reduce((a, d) => a + d.aws + d.gcp + d.azure, 0);
  return `Based on your cloud data (total week spend: $${total.toLocaleString()}):\n\nYour top 3 priorities are:\n1. Fix EC2 data transfer spike — active bleed +$892 today\n2. Rightsize prod-api-1 and analytics-db → $1,220/mo saved\n3. Purchase Reserved Instances for always-on EC2 → $780/mo saved\n\nTotal addressable: $4,218/mo. Which area would you like to explore?`;
}

const SUGS = [
  "Which EC2 instances should I rightsize?",
  "What is my biggest cost driver?",
  "Reserved Instances or Savings Plans?",
  "How to fix the data transfer spike?",
];

export default function AIAssistant() {
  const [msgs, setMsgs]     = useState([{ role: "ai", text: "Hi! I'm CloudWise AI.\n\nI've analysed your AWS, GCP, and Azure infrastructure and found 14 cost optimisation opportunities worth $4,218/month.\n\nAsk me anything about your cloud costs!" }]);
  const [input, setInput]   = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  useEffect(() => { ref.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  async function send(q) {
    const question = (q || input).trim();
    if (!question || loading) return;
    setInput("");
    setMsgs((m) => [...m, { role: "user", text: question }]);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setMsgs((m) => [...m, { role: "ai", text: getAnswer(question) }]);
    setLoading(false);
  }

  return (
    <div className="chat-box">
      <div className="chat-hdr">
        <div className="ai-av">AI</div>
        <span className="chat-title">CloudWise AI Assistant</span>
        <span className="chat-badge">Powered by Claude</span>
      </div>

      <div className="msgs">
        {msgs.map((m, i) => (
          <div key={i} className={"msg" + (m.role === "user" ? " user" : "")}>
            <div className={m.role === "ai" ? "ai-av" : "usr-av"}>{m.role === "ai" ? "AI" : "U"}</div>
            <div className={"bubble " + m.role}>{m.text}</div>
          </div>
        ))}
        {loading && (
          <div className="msg">
            <div className="ai-av">AI</div>
            <div className="bubble ai"><div className="dots"><div className="dot"/><div className="dot"/><div className="dot"/></div></div>
          </div>
        )}
        <div ref={ref}/>
      </div>

      <div className="sugs">
        {SUGS.map((s) => (
          <button key={s} className="sug-btn" onClick={() => send(s)} disabled={loading}>{s}</button>
        ))}
      </div>

      <div className="chat-input-row">
        <input className="chat-input" value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask about your cloud costs..." disabled={loading}/>
        <button className="send-btn" onClick={() => send()} disabled={loading || !input.trim()}>Send</button>
      </div>
    </div>
  );
}
