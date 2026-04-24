import { PROVIDERS } from "../lib/providers";

export const metadata = {
  title: "TRT Price Comparison 2026 — MangoRx vs. Competition",
  description: "All-in monthly and annual cost after doctor visit, labs, and medication for the top TRT providers.",
};

function getBuildDate() {
  return new Date().toLocaleDateString("en-US", {
    month: "2-digit", day: "2-digit", year: "numeric", timeZone: "America/New_York",
  });
}

const HERO_ROWS = [
  { name: "Maximus",      monthly: 108,    annual: 1300,  barPct: 54,  diff: "+$9/mo",      pct: "9% more" },
  { name: "PeterMD",      monthly: 117.42, annual: 1409,  barPct: 59,  diff: "+$18/mo",     pct: "19% more" },
  { name: "TRT Nation",   monthly: 120.5,  annual: 1446,  barPct: 60,  diff: "+$21.50/mo",  pct: "22% more" },
  { name: "Henry Meds",   monthly: 129,    annual: 1548,  barPct: 65,  diff: "+$30/mo",     pct: "30% more" },
  { name: "Fountain TRT", monthly: 199,    annual: 2388,  barPct: 99,  diff: "+$100/mo",    pct: "101% more" },
  { name: "Hone Health",  monthly: 199,    annual: 2400,  barPct: 100, diff: "+$100/mo",    pct: "~101% more" },
];

export default function Home() {
  const buildDate = getBuildDate();
  const sorted = [...PROVIDERS].sort((a, b) => a.trueMonthly - b.trueMonthly);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        :root {
          --bg: #f7f6f3;
          --surface: #ffffff;
          --surface2: #f3f2ef;
          --border: #e5e4e0;
          --border-strong: #d0cfc9;
          --text: #1a1916;
          --text2: #3d3c38;
          --muted: #7a7870;
          --mango: #e85d20;
          --mango-light: #fff3ee;
          --mango-border: #fbd5c2;
          --green: #16803c;
          --green-light: #f0faf4;
          --green-border: #bbf0d0;
          --red: #c0392b;
          --yellow: #92650a;
          --yellow-light: #fffbeb;
          --blue: #1d4ed8;
          --blue-light: #eff6ff;
          --purple: #6d28d9;
          --purple-light: #f5f3ff;
          --shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
          --shadow-md: 0 4px 12px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04);
          --shadow-lg: 0 8px 24px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.04);
          --radius: 12px;
          --radius-sm: 8px;
          --radius-xs: 6px;
        }

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 15px;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }

        /* ── HERO ───────────────────────────────────────── */
        .hero {
          background: var(--surface);
          border-bottom: 1px solid var(--border);
          padding: 64px 24px 56px;
        }
        .hero-inner {
          max-width: 720px;
          margin: 0 auto;
          text-align: center;
        }
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--mango-light);
          border: 1px solid var(--mango-border);
          border-radius: 100px;
          padding: 5px 14px;
          font-size: 12px;
          font-weight: 600;
          color: var(--mango);
          letter-spacing: 0.04em;
          margin-bottom: 20px;
        }
        .hero-h {
          font-size: clamp(28px, 5vw, 46px);
          font-weight: 800;
          line-height: 1.1;
          color: var(--text);
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }
        .hero-h span { color: var(--mango); }
        .hero-sub {
          font-size: 15px;
          font-weight: 400;
          color: var(--muted);
          margin-bottom: 40px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.7;
        }
        .hero-sub a { color: var(--mango); text-decoration: none; font-weight: 500; }
        .hero-sub a:hover { text-decoration: underline; }

        /* MangoRx baseline row */
        .hero-mango-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          background: var(--mango-light);
          border: 1.5px solid var(--mango-border);
          border-radius: var(--radius);
          padding: 14px 18px;
          margin-bottom: 8px;
        }
        .hero-mango-name {
          font-size: 14px;
          font-weight: 700;
          color: var(--mango);
          white-space: nowrap;
          min-width: 110px;
          text-align: left;
        }
        .hero-bar-wrap {
          flex: 1;
          height: 5px;
          background: var(--border);
          border-radius: 3px;
          overflow: hidden;
          min-width: 0;
        }
        .hero-bar {
          height: 100%;
          border-radius: 3px;
          background: var(--mango);
        }
        .hero-bar.them { background: var(--border-strong); }
        .hero-price {
          font-size: 13px;
          font-weight: 600;
          color: var(--text);
          white-space: nowrap;
          min-width: 90px;
          text-align: right;
        }
        .hero-price.mango { color: var(--mango); }
        .hero-diff {
          font-size: 11px;
          font-weight: 500;
          padding: 3px 9px;
          border-radius: 100px;
          white-space: nowrap;
          min-width: 88px;
          text-align: center;
          background: #fef2f2;
          color: #c0392b;
          border: 1px solid #fecaca;
        }
        .hero-diff.baseline {
          background: var(--green-light);
          color: var(--green);
          border-color: var(--green-border);
        }

        /* competitor rows */
        .hero-rows { display: flex; flex-direction: column; gap: 6px; }
        .hero-row {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 12px 18px;
          transition: border-color 0.15s;
        }
        .hero-row:hover { border-color: var(--border-strong); }
        .hero-row-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--text2);
          white-space: nowrap;
          min-width: 110px;
          text-align: left;
        }
        .hero-note {
          margin-top: 16px;
          font-size: 11px;
          color: var(--muted);
          text-align: center;
        }

        /* ── PAGE CONTAINER ─────────────────────────────── */
        .container {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 24px 80px;
        }

        /* ── SECTION HEADER ─────────────────────────────── */
        .section-header {
          text-align: center;
          padding: 60px 0 40px;
        }
        .eyebrow-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 5px 14px;
          font-size: 11px;
          font-weight: 600;
          color: var(--muted);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .dot-live {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--green); flex-shrink: 0;
        }
        .section-title {
          font-size: clamp(26px, 4vw, 40px);
          font-weight: 800;
          color: var(--text);
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin-bottom: 10px;
        }
        .section-title span { color: var(--mango); }
        .section-sub {
          font-size: 14px;
          color: var(--muted);
          max-width: 480px;
          margin: 0 auto 20px;
          line-height: 1.7;
        }
        .meta-pills {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .meta-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 5px 13px;
          font-size: 11px;
          font-weight: 500;
          color: var(--muted);
          box-shadow: var(--shadow-sm);
        }

        /* ── LEGEND ─────────────────────────────────────── */
        .legend {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 36px;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 12px;
          color: var(--muted);
        }
        .legend-dot {
          width: 9px; height: 9px;
          border-radius: 3px; flex-shrink: 0;
        }

        /* ── CARDS GRID ─────────────────────────────────── */
        .cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 20px;
          margin-bottom: 60px;
        }

        .card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 28px;
          position: relative;
          box-shadow: var(--shadow-sm);
          transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
          animation: fadeUp 0.4s ease both;
          overflow: hidden;
        }
        .card:hover {
          box-shadow: var(--shadow-lg);
          transform: translateY(-2px);
          border-color: var(--border-strong);
        }
        .card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--card-accent, var(--border-strong));
          border-radius: var(--radius) var(--radius) 0 0;
        }
        .card.cv { --card-accent: #16803c; border-top-color: transparent; }
        .card.ci { --card-accent: #1d4ed8; border-top-color: transparent; }
        .card.cp { --card-accent: #92650a; border-top-color: transparent; }
        .card.cm { --card-accent: #6d28d9; border-top-color: transparent; }

        .card:nth-child(1){animation-delay:.04s}
        .card:nth-child(2){animation-delay:.08s}
        .card:nth-child(3){animation-delay:.12s}
        .card:nth-child(4){animation-delay:.16s}
        .card:nth-child(5){animation-delay:.20s}
        .card:nth-child(6){animation-delay:.24s}

        /* badge */
        .badge {
          position: absolute;
          top: 16px; right: 16px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 4px 9px;
          border-radius: 100px;
        }
        .bg { background: var(--green-light); color: var(--green); border: 1px solid var(--green-border); }
        .bb { background: var(--blue-light); color: var(--blue); border: 1px solid #bfdbfe; }
        .bo { background: var(--yellow-light); color: var(--yellow); border: 1px solid #fde68a; }
        .bp { background: var(--purple-light); color: var(--purple); border: 1px solid #ddd6fe; }

        .card-num { font-size: 11px; font-weight: 500; color: var(--muted); margin-bottom: 4px; }
        .card-name { font-size: 24px; font-weight: 800; color: var(--text); line-height: 1; margin-bottom: 3px; letter-spacing: -0.01em; }
        .card-tag { font-size: 11px; color: var(--muted); margin-bottom: 20px; }

        /* price block */
        .price-block {
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 18px;
          margin-bottom: 20px;
        }
        .pb-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 14px;
        }
        .price-duo {
          display: flex;
          align-items: stretch;
          gap: 0;
          margin-bottom: 14px;
          overflow: hidden;
        }
        .price-col {
          flex: 1 1 0;
          min-width: 0;
          padding: 0 14px 0 0;
        }
        .price-col:last-child { padding: 0 0 0 14px; }
        .price-divider {
          flex-shrink: 0;
          width: 1px;
          background: var(--border);
          align-self: stretch;
        }
        .p-label {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 4px;
        }
        .p-monthly {
          font-size: clamp(24px, 4vw, 34px);
          font-weight: 800;
          color: var(--mango);
          line-height: 1;
          letter-spacing: -0.02em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .p-monthly span { font-size: 13px; font-weight: 400; color: var(--muted); }
        .p-annual {
          font-size: clamp(18px, 3vw, 22px);
          font-weight: 700;
          color: var(--text2);
          line-height: 1;
          letter-spacing: -0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .p-annual span { font-size: 12px; font-weight: 400; color: var(--muted); }
        .price-math {
          font-size: 11px;
          color: var(--muted);
          line-height: 1.5;
          padding-top: 12px;
          border-top: 1px solid var(--border);
        }
        .price-math strong { color: var(--text2); font-weight: 500; }
        .vs-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-top: 10px;
          padding: 5px 11px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
        }
        .vs-more {
          background: #fef2f2;
          color: var(--red);
          border: 1px solid #fecaca;
        }

        /* breakdown */
        .breakdown { margin-bottom: 18px; }
        .section-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 10px;
        }
        .bk-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 0;
          border-bottom: 1px solid var(--border);
          font-size: 12px;
          gap: 8px;
        }
        .bk-row:last-child { border-bottom: none; }
        .bk-key { color: var(--muted); font-weight: 400; flex: 1; min-width: 0; }
        .bk-val { font-size: 12px; font-weight: 600; white-space: nowrap; flex-shrink: 0; }
        .vi { color: var(--green); }
        .ve { color: var(--yellow); }
        .vn { color: var(--text2); }

        /* features */
        .features { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; }
        .feat {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          font-size: 12px;
          line-height: 1.4;
        }
        .feat-icon { font-size: 13px; flex-shrink: 0; margin-top: 1px; }
        .feat.yes { color: var(--text2); }
        .feat.no { color: var(--muted); opacity: 0.55; text-decoration: line-through; }

        /* source */
        .src-block {
          padding: 12px 14px;
          background: var(--surface2);
          border: 1px solid var(--border);
          border-left: 3px solid var(--border-strong);
          border-radius: var(--radius-xs);
        }
        .src-title { font-size: 9px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin-bottom: 5px; }
        .src-body { font-size: 11px; color: var(--muted); line-height: 1.6; }
        .src-link { color: var(--muted); font-weight: 600; text-decoration: underline; text-decoration-color: var(--border-strong); text-underline-offset: 2px; }
        .src-link:hover { color: var(--mango); }

        /* ── COMPARISON TABLE ───────────────────────────── */
        .table-section { margin-bottom: 40px; }
        .table-section-title {
          font-size: 24px;
          font-weight: 800;
          color: var(--text);
          letter-spacing: -0.01em;
          margin-bottom: 4px;
        }
        .table-section-sub { font-size: 13px; color: var(--muted); margin-bottom: 20px; }
        .table-wrap {
          overflow-x: auto;
          border-radius: var(--radius);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
          -webkit-overflow-scrolling: touch;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          background: var(--surface);
          font-size: 12px;
          min-width: 680px;
        }
        thead th {
          padding: 12px 14px;
          text-align: left;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          background: var(--surface2);
          border-bottom: 1px solid var(--border);
          white-space: nowrap;
        }
        tbody tr { border-bottom: 1px solid var(--border); transition: background 0.1s; }
        tbody tr:hover { background: var(--surface2); }
        tbody tr:last-child { border-bottom: none; }
        tbody td { padding: 12px 14px; vertical-align: middle; }
        .td-name { font-size: 13px; font-weight: 700; color: var(--text); white-space: nowrap; }
        .td-adv { font-size: 13px; font-weight: 600; color: var(--mango); }
        .td-sub { font-size: 10px; color: var(--muted); display: block; margin-top: 1px; }
        .td-mo { font-size: 14px; font-weight: 700; color: var(--mango); }
        .td-yr { font-size: 12px; font-weight: 600; color: var(--text2); }
        .td-vs { font-size: 11px; font-weight: 600; }
        .td-vs.s { color: var(--green); }
        .td-vs.e { color: var(--muted); }
        .tag {
          display: inline-block;
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 3px 7px;
          border-radius: 100px;
          margin: 1px;
        }
        .ty { background: var(--green-light); color: var(--green); border: 1px solid var(--green-border); }
        .te { background: var(--yellow-light); color: var(--yellow); border: 1px solid #fde68a; }
        .tn { background: #fef2f2; color: var(--red); border: 1px solid #fecaca; }
        .tp { background: var(--blue-light); color: var(--blue); border: 1px solid #bfdbfe; }
        .mx-tr td { background: var(--mango-light) !important; }
        .mx-tr .td-name { color: var(--mango); }

        /* ── DISCLAIMER ─────────────────────────────────── */
        .disclaimer {
          margin-top: 40px;
          padding: 20px 24px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          font-size: 12px;
          color: var(--muted);
          line-height: 1.75;
          box-shadow: var(--shadow-sm);
        }
        .disclaimer strong { color: var(--text2); font-weight: 600; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── RESPONSIVE ─────────────────────────────────── */
        @media (max-width: 600px) {
          .hero { padding: 44px 16px 40px; }
          .hero-mango-row, .hero-row { padding: 11px 14px; gap: 8px; }
          .hero-mango-name, .hero-row-name { min-width: 88px; font-size: 12px; }
          .hero-diff { display: none; }
          .hero-price { min-width: 72px; font-size: 12px; }
          .container { padding: 0 16px 60px; }
          .cards { grid-template-columns: 1fr; }
          .card { padding: 22px; }
          .p-monthly { font-size: 26px; }
          .p-annual { font-size: 18px; }
          .section-header { padding: 44px 0 32px; }
        }

        @media (max-width: 420px) {
          .hero-bar-wrap { display: none; }
        }
      `}</style>

      {/* ── HERO ── */}
      <div className="hero">
        <div className="hero-inner">
          <div className="hero-eyebrow">🥭 MangoRx vs. The Competition</div>
          <h1 className="hero-h">
            MangoRx TRT — <span>$99/mo All-In</span><br />Here&apos;s How We Compare
          </h1>
          <p className="hero-sub">
            <a href="https://mangorx.com" target="_blank" rel="noopener noreferrer">MangoRx.com</a> includes
            doctor&apos;s visit, labs, and medication for <strong>$99/month flat</strong> — no hidden fees.
            Every competitor&apos;s true amortized monthly cost is below.
          </p>

          {/* MangoRx baseline */}
          <div className="hero-mango-row">
            <div className="hero-mango-name">🥭 MangoRx</div>
            <div className="hero-bar-wrap"><div className="hero-bar" style={{ width: "50%" }}></div></div>
            <div className="hero-price mango">$99/mo · All-In</div>
            <div className="hero-diff baseline">Baseline</div>
          </div>

          {/* Competitors */}
          <div className="hero-rows">
            {HERO_ROWS.map((r) => (
              <div key={r.name} className="hero-row">
                <div className="hero-row-name">{r.name}</div>
                <div className="hero-bar-wrap">
                  <div className="hero-bar them" style={{ width: `${r.barPct}%` }}></div>
                </div>
                <div className="hero-price">${r.monthly}/mo</div>
                <div className="hero-diff">{r.diff} · {r.pct}</div>
              </div>
            ))}
          </div>

          <p className="hero-note">
            * True amortized monthly costs (base + labs ÷ 12). MangoRx $99/mo is fully all-in.
          </p>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div className="container">
        <div className="section-header">
          <div className="eyebrow-pill">
            <span className="dot-live"></span>
            2026 Full Market Analysis
          </div>
          <h2 className="section-title">TRT price breakdown — <span>all providers compared</span></h2>
          <p className="section-sub">
            All-in monthly and annual cost after doctor visit, labs, and medication — amortized and sourced.
          </p>
          <div className="meta-pills">
            <div className="meta-pill"><span className="dot-live"></span> Prices verified April 2026</div>
            <div className="meta-pill">🕐 Last script ran: {buildDate}</div>
          </div>
        </div>

        <div className="legend">
          <div className="legend-item"><div className="legend-dot" style={{ background: "var(--green)" }}></div>Included</div>
          <div className="legend-item"><div className="legend-dot" style={{ background: "var(--yellow)" }}></div>Extra cost</div>
          <div className="legend-item"><div className="legend-dot" style={{ background: "var(--red)" }}></div>Not available</div>
          <div className="legend-item"><div className="legend-dot" style={{ background: "var(--blue)" }}></div>Partial / varies</div>
        </div>

        <div className="cards">
          {sorted.map((p, i) => (
            <ProviderCard key={p.id} p={p} index={i} total={sorted.length} />
          ))}
        </div>

        {/* TABLE */}
        <div className="table-section">
          <div className="table-section-title">Side-by-side breakdown</div>
          <div className="table-section-sub">Sorted cheapest to most expensive by true amortized monthly cost. MangoRx shown as baseline.</div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Provider</th>
                  <th>Advertised</th>
                  <th>Labs</th>
                  <th>Dr. Visit</th>
                  <th>Medication</th>
                  <th>Monthly (true)</th>
                  <th>Annual (true)</th>
                  <th>vs. MangoRx</th>
                  <th>Best for</th>
                </tr>
              </thead>
              <tbody>
                <tr className="mx-tr">
                  <td><span className="td-name">🥭 MangoRx</span></td>
                  <td><span className="td-adv">$99</span><span className="td-sub">all-in</span></td>
                  <td><span className="tag ty">Included</span></td>
                  <td><span className="tag ty">Included</span></td>
                  <td><span className="tag ty">Included</span></td>
                  <td><span className="td-mo">$99/mo</span></td>
                  <td><span className="td-yr">$1,188/yr</span></td>
                  <td><span className="td-vs e">— Baseline</span></td>
                  <td style={{ color: "var(--muted)", fontSize: "11px" }}>Best value, fully all-in</td>
                </tr>
                {sorted.map((p) => <TableRow key={p.id} p={p} />)}
              </tbody>
            </table>
          </div>
        </div>

        <div className="disclaimer">
          <strong>How this data is gathered:</strong> Each provider&apos;s advertised price was pulled directly
          from their official website or FAQ page, then cross-referenced with at least one independent review
          source. Lab costs and frequencies were sourced from provider documentation. All figures are amortized
          over 12 months: <em>(monthly base) + (total annual lab costs ÷ 12)</em>. Annual totals are monthly × 12.
          See each card&apos;s Data Source for the specific URL. Prices verified April 2026, re-checked daily
          via automated script. <strong>MangoRx pricing ($99/mo all-in) sourced from mangorx.com.</strong> For
          informational purposes only — not medical advice.
        </div>
      </div>
    </>
  );
}

function ProviderCard({ p, index, total }) {
  const cardClass = {
    "trt-nation": "cv",
    "fountain-trt": "ci",
    "hone-health": "cp",
    "henry-meds": "cm",
  }[p.id] || "";
  const badge = p.badge;
  const badgeClass = { green: "bg", blue: "bb", gold: "bo", purple: "bp" }[p.badgeColor] || "";
  const diffAmt = (p.trueMonthly - 99).toFixed(2);
  const diffPct = ((p.trueMonthly - 99) / 99 * 100).toFixed(1);

  return (
    <div className={`card ${cardClass}`}>
      {badge && <span className={`badge ${badgeClass}`}>{badge}</span>}
      <div className="card-num">0{index + 1} / 0{total}</div>
      <div className="card-name">{p.name}</div>
      <div className="card-tag">{p.tagline}</div>

      <div className="price-block">
        <div className="pb-label">True all-in cost (amortized)</div>
        <div className="price-duo">
          <div className="price-col">
            <div className="p-label">Per month</div>
            <div className="p-monthly">{p.trueMonthlyDisplay}<span>/mo</span></div>
          </div>
          <div className="price-divider"></div>
          <div className="price-col">
            <div className="p-label">Per year</div>
            <div className="p-annual">${p.annualTotal.toLocaleString()}<span>/yr</span></div>
          </div>
        </div>
        <div className="price-math">
          <strong>Math:</strong> {p.mathNote}
        </div>
        {p.trueMonthly > 99 && (
          <div className="vs-chip vs-more">
            +${diffAmt}/mo vs MangoRx · {diffPct}% more expensive
          </div>
        )}
      </div>

      <div className="breakdown">
        <div className="section-label">Cost breakdown</div>
        {p.breakdown.map((row, i) => (
          <div key={i} className="bk-row">
            <span className="bk-key">{row.label}</span>
            <span className={`bk-val ${row.type === "included" ? "vi" : row.type === "extra" ? "ve" : "vn"}`}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <div className="features">
        {p.features.map((f, i) => (
          <div key={i} className={`feat ${f.available ? "yes" : "no"}`}>
            <span className="feat-icon">{f.icon}</span>
            <span>{f.text}</span>
          </div>
        ))}
      </div>

      <div className="src-block">
        <div className="src-title">Data source</div>
        <div className="src-body">
          <a href={p.source.url} target="_blank" rel="noopener noreferrer" className="src-link">
            {p.source.headline} ↗
          </a>{" "}— {p.source.detail}
        </div>
      </div>
    </div>
  );
}

function TableRow({ p }) {
  const labRow = p.breakdown.find(b => b.label.toLowerCase().includes("lab"));
  const diffAmt = (p.trueMonthly - 99).toFixed(2);
  const diffPct = ((p.trueMonthly - 99) / 99 * 100).toFixed(1);
  const isSame = p.trueMonthly <= 99;

  return (
    <tr>
      <td><span className="td-name">{p.name}</span></td>
      <td><span className="td-adv">${p.advertisedMonthly}</span><span className="td-sub">advertised</span></td>
      <td>
        {labRow?.type === "included" && <span className="tag ty">Included</span>}
        {labRow?.type === "extra"    && <span className="tag te">{labRow.value}</span>}
      </td>
      <td>
        {p.id === "trt-nation"
          ? <span className="tag ty">Unlimited</span>
          : <span className="tag ty">Included</span>}
      </td>
      <td><span className="tag ty">Included</span></td>
      <td><span className="td-mo">{p.trueMonthlyDisplay}/mo</span></td>
      <td><span className="td-yr">${p.annualTotal.toLocaleString()}/yr</span></td>
      <td>
        {isSame
          ? <span className="td-vs e">= $0 · 0%</span>
          : <span className="td-vs s">+${diffAmt} · {diffPct}% more</span>}
      </td>
      <td style={{ color: "var(--muted)", fontSize: "11px" }}>
        {p.id === "maximus"      && "Oral & injectable options"}
        {p.id === "petermd"      && "Price-match guarantee"}
        {p.id === "trt-nation"   && "Injections only"}
        {p.id === "henry-meds"   && "Ages 35–65 only"}
        {p.id === "fountain-trt" && "Zero add-ons, urologist MD"}
        {p.id === "hone-health"  && "Insurance billing, 40+ labs"}
      </td>
    </tr>
  );
}
