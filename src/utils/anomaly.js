export function detectAnomalies(costs) {
  const n = costs.length;
  if (n < 3) return costs.map((cost, i) => ({ index: i, cost, isAnomaly: false }));
  const avg = costs.reduce((a, b) => a + b, 0) / n;
  const std = Math.sqrt(costs.reduce((a, v) => a + (v - avg) ** 2, 0) / n);
  return costs.map((cost, i) => ({
    index: i, cost,
    isAnomaly: std > 0 && cost > avg + 2 * std,
    severity:  cost > avg + 3 * std ? "critical" : "medium",
    zScore:    std > 0 ? ((cost - avg) / std).toFixed(1) : "0",
  }));
}

export function forecast(costs, days = 30) {
  const n = costs.length;
  const xm = (n - 1) / 2;
  const ym = costs.reduce((a, b) => a + b, 0) / n;
  const d  = costs.reduce((a, _, x) => a + (x - xm) ** 2, 0);
  const slope = d === 0 ? 0 : costs.reduce((a, y, x) => a + (x - xm) * (y - ym), 0) / d;
  return Array.from({ length: days }, (_, i) => Math.max(0, Math.round(ym + slope * (n + i - xm))));
}
