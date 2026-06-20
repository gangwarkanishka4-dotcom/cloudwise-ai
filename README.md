# ☁ CloudWise AI — Multi-Cloud Cost Optimization Platform

A complete, ready-to-run React dashboard. No backend needed. No external API keys needed.
Works 100% offline with realistic mock data and a smart AI assistant.

---

## live demo link
https://cloudwise-ai-xi.vercel.app/

## ▶ HOW TO RUN (3 steps)

### Step 1 — Extract the zip
Right-click the zip file → Extract All (Windows) or double-click (Mac).
You'll get a folder called `cw3`.

### Step 2 — Open in VS Code
File → Open Folder → select the `cw3` folder.

### Step 3 — Install & Run
Open the VS Code terminal (Ctrl + `) and run these two commands:

```bash
npm install
npm start
```

Your browser will open automatically at **http://localhost:3000** 🎉

---

## ✅ What's included

- Dark mode toggle (🌙 button top-right)
- Dashboard with animated area charts
- 14 AI-powered cost recommendations (with Apply button)
- 90-day cost forecasting
- Resource inventory with CPU utilisation bars
- Statistical anomaly detection (real Z-score math)
- Savings tracker with category breakdown
- AI chat assistant (works offline — no API key needed)
- Fully responsive (works on mobile)

---

## 🛠 If you still get an error

**"npm not recognized"** → Install Node.js from https://nodejs.org (LTS version), restart VS Code.

**Port 3000 in use** → Type `Y` when asked to use another port.

**Blank white screen** → Press F12 in browser, check Console tab for the red error, paste it back to me.

**Still stuck?** → Delete the `node_modules` folder and `package-lock.json` if present, then run `npm install` again.

---

## 📁 Project structure

```
cw3/
├── public/index.html
├── src/
│   ├── App.js                  ← main app, navigation, dark mode
│   ├── index.js                ← entry point
│   ├── index.css               ← all styles
│   ├── data/mockData.js        ← all cloud cost data
│   ├── utils/anomaly.js        ← Z-score detection + forecasting math
│   └── components/
│       ├── Shared.jsx
│       ├── Dashboard.jsx
│       ├── Recommendations.jsx
│       ├── Forecast.jsx
│       ├── Resources.jsx
│       ├── Anomalies.jsx
│       ├── Savings.jsx
│       └── AIAssistant.jsx
└── package.json
```

---

*Built by Kanishka Gangwar · B.Tech CSE · SRMS CET&R, Bareilly*
