export const SPEND_TREND = [
  { day: "Jun 6",  aws: 2100, gcp: 1020, azure: 580 },
  { day: "Jun 7",  aws: 2340, gcp:  980, azure: 560 },
  { day: "Jun 8",  aws: 2180, gcp: 1100, azure: 600 },
  { day: "Jun 9",  aws: 2890, gcp: 1240, azure: 640 },
  { day: "Jun 10", aws: 2640, gcp: 1050, azure: 590 },
  { day: "Jun 11", aws: 2510, gcp:  980, azure: 570 },
  { day: "Jun 12", aws: 1574, gcp:  522, azure: 225 },
];

export const FORECAST_DATA = [
  { month: "Jun", actual: 28491, optimized: 28491 },
  { month: "Jul", actual: 32100, optimized: 27800 },
  { month: "Aug", actual: 36400, optimized: 26900 },
  { month: "Sep", actual: 41200, optimized: 25800 },
];

export const BUDGET_DATA = [
  { service: "EC2",        budget: 8000,  actual: 10200 },
  { service: "RDS",        budget: 5000,  actual: 5400  },
  { service: "S3",         budget: 1500,  actual: 1320  },
  { service: "Lambda",     budget: 800,   actual: 750   },
  { service: "CloudFront", budget: 600,   actual: 564   },
];

export const SAVINGS_PIE = [
  { name: "Rightsizing",  value: 1820, color: "#16a34a" },
  { name: "Reserved",     value: 980,  color: "#2563eb" },
  { name: "Idle cleanup", value: 720,  color: "#d97706" },
  { name: "Storage",      value: 460,  color: "#7c3aed" },
  { name: "Network",      value: 238,  color: "#db2777" },
];

export const REALIZED = [
  { month: "Jan", saved: 810  },
  { month: "Feb", saved: 960  },
  { month: "Mar", saved: 1200 },
  { month: "Apr", saved: 1580 },
  { month: "May", saved: 2100 },
  { month: "Jun", saved: 2890 },
];

export const PROVIDERS = [
  { name: "AWS",   amount: 16234, pct: 57, color: "#d97706" },
  { name: "GCP",   amount: 7892,  pct: 28, color: "#16a34a" },
  { name: "Azure", amount: 4365,  pct: 15, color: "#2563eb" },
];

export const RECS = [
  { resource: "m5.4xlarge → m5.xlarge",        provider: "AWS",   action: "Rightsize EC2",    savings: 680, sev: "high" },
  { resource: "db.r5.2xlarge → db.r5.large",   provider: "AWS",   action: "Rightsize RDS",    savings: 540, sev: "high" },
  { resource: "1yr Reserved — 6 instances",    provider: "AWS",   action: "Purchase RI",      savings: 480, sev: "high" },
  { resource: "n1-standard-8 → n2-standard-2", provider: "GCP",   action: "Rightsize GCE",    savings: 320, sev: "high" },
  { resource: "Idle Cloud SQL db",             provider: "GCP",   action: "Delete idle DB",   savings: 218, sev: "med"  },
  { resource: "1.2TB S3 → Infrequent Access",  provider: "AWS",   action: "S3 Lifecycle",     savings: 198, sev: "med"  },
  { resource: "B4ms → B2s VM",                 provider: "Azure", action: "Rightsize VM",     savings: 140, sev: "med"  },
  { resource: "NAT Gateway consolidation",     provider: "AWS",   action: "Network opt.",     savings: 180, sev: "med"  },
  { resource: "Azure Hybrid Benefit",          provider: "Azure", action: "Licensing",        savings: 260, sev: "med"  },
  { resource: "GCS Nearline → Archive",        provider: "GCP",   action: "Storage tier",     savings: 92,  sev: "low"  },
  { resource: "7x Elastic IPs unused",         provider: "AWS",   action: "Release EIPs",     savings: 25,  sev: "low"  },
  { resource: "Lambda idle x12",               provider: "AWS",   action: "Delete functions", savings: 18,  sev: "low"  },
  { resource: "CloudFront — enable Gzip",      provider: "AWS",   action: "Performance",      savings: 45,  sev: "low"  },
  { resource: "Detached disks x5",             provider: "GCP",   action: "Delete disks",     savings: 22,  sev: "low"  },
];

export const RESOURCES = [
  { name: "prod-api-1",       provider: "AWS",   type: "EC2",         cpu: 14, cost: 380, waste: "high" },
  { name: "analytics-db",     provider: "AWS",   type: "RDS",         cpu: 22, cost: 540, waste: "high" },
  { name: "dev-server",       provider: "AWS",   type: "EC2",         cpu:  8, cost:  95, waste: "high" },
  { name: "ml-training",      provider: "GCP",   type: "GCE",         cpu: 61, cost: 480, waste: "med"  },
  { name: "dev-analytics-db", provider: "GCP",   type: "Cloud SQL",   cpu:  0, cost: 218, waste: "high" },
  { name: "prod-api-02",      provider: "Azure", type: "VM",          cpu:  4, cost: 140, waste: "high" },
  { name: "data-warehouse",   provider: "GCP",   type: "BigQuery",    cpu: 78, cost: 620, waste: "low"  },
  { name: "web-tier",         provider: "AWS",   type: "EC2",         cpu: 45, cost:  62, waste: "low"  },
  { name: "cache-cluster",    provider: "AWS",   type: "ElastiCache", cpu: 38, cost: 125, waste: "med"  },
];

export const ANOMALIES = [
  { title: "EC2 data transfer spike — us-east-1", provider: "AWS",   sub: "340% above baseline, NAT Gateway misconfigured",   cost: "+$892",    sev: "crit", age: "2h ago"    },
  { title: "Cloud SQL idle for 14 days",          provider: "GCP",   sub: "db-n1-standard-4, dev-analytics-db, no queries",   cost: "+$218/mo", sev: "med",  age: "14d ago"   },
  { title: "Azure VM underutilised",              provider: "Azure", sub: "B4ms, prod-api-02, avg 4% CPU over 30 days",       cost: "+$140/mo", sev: "low",  age: "30d trend" },
  { title: "7x Elastic IPs unassociated",         provider: "AWS",   sub: "us-west-2, allocated 22 days ago, never attached", cost: "+$25/mo",  sev: "med",  age: "22d ago"   },
];

export const NAV = [
  { id: "dashboard",    label: "Dashboard",       group: "Overview", badge: null,    bt: null    },
  { id: "recs",         label: "Recommendations", group: "Overview", badge: "14",    bt: "red"   },
  { id: "forecast",     label: "Cost Forecast",   group: "Overview", badge: null,    bt: null    },
  { id: "resources",    label: "Resources",       group: "Analysis", badge: null,    bt: null    },
  { id: "anomalies",    label: "Anomalies",       group: "Analysis", badge: "4",     bt: "red"   },
  { id: "savings",      label: "Savings",         group: "Analysis", badge: "$4.2k", bt: "green" },
  { id: "ai",           label: "Ask CloudWise",   group: "AI",       badge: null,    bt: null    },
];
