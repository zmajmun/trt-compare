// app/page.js
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

const MANGORX = { name: "MangoRx", monthly: 99, annual: 1188 };

const HERO_ROWS = [
  { name: "Hims",        monthly: 99,    annual: 990,   barPct: 49,  diff: null,           pct: null },
  { name: "Maximus",     monthly: 108,   annual: 1300,  barPct: 53,  diff: "+$9/mo",        pct: "9.1% more" },
  { name: "TRT Nation",  monthly: 120.5, annual: 1446,  barPct: 59,  diff: "+$21.50/mo",    pct: "21.7% more" },
  { name: "Henry Meds",  monthly: 129,   annual: 1548,  barPct: 63,  diff: "+$30/mo",       pct: "30.3% more" },
  { name: "Fountain TRT",monthly: 199,   annual: 2388,  barPct: 98,  diff: "+$100/mo",      pct: "101% more" },
  { name: "Hone Health", monthly: 199,   annual: 2400,  barPct: 100, diff: "+$95–110/mo",   pct: "~100% more" },
];

export default function Home() {
  const buildDate = getBuildDate();
  const sorted = [...PROVIDERS].sort((a, b) => a.trueMonthly - b.trueMonthly);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300&display=swap');
        :root {
          --bg:#0a0a0f;--surface:#13131c;--surface2:#1c1c28;--border:#2a2a3d;
          --accent:#e8c86e;--accent2:#5b8dee;--green:#3dd68c;--purple:#a78bfa;
          --red:#f06565;--yellow:#f5c842;--mango:#ff6b35;--mango2:#ffb347;
          --text:#e8e8f0;--muted:#7a7a9a;
        }
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background:var(--bg);color:var(--text);font-family:'Poppins',sans-serif;min-height:100vh;overflow-x:hidden;}

        /* HERO */
        .hero{background:linear-gradient(135deg,#1a0e00 0%,#0f0a00 40%,#0a0a0f 100%);border-bottom:1px solid rgba(255,107,53,.2);padding:56px 24px 52px;position:relative;overflow:hidden;}
        .hero::before{content:'';position:absolute;top:-80px;right:-80px;width:500px;height:500px;background:radial-gradient(circle,rgba(255,107,53,.1) 0%,transparent 70%);pointer-events:none;}
        .hero-inner{max-width:1160px;margin:0 auto;position:relative;z-index:1;}
        .hero-eyebrow{font-size:11px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--mango);margin-bottom:12px;display:flex;align-items:center;gap:12px;}
        .hero-eyebrow::after{content:'';display:block;width:40px;height:1px;background:var(--mango);opacity:.4;}
        .hero-h{font-size:clamp(30px,5vw,58px);font-weight:800;line-height:1.05;color:#fff;margin-bottom:8px;}
        .hero-h span{background:linear-gradient(90deg,var(--mango),var(--mango2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .hero-sub{font-size:14px;font-weight:300;color:var(--muted);margin-bottom:32px;max-width:560px;line-height:1.7;}
        .hero-sub a{color:var(--mango);text-decoration:none;font-weight:500;}
        .hero-sub a:hover{text-decoration:underline;}
        .hero-rows{display:flex;flex-direction:column;gap:9px;max-width:820px;}
        .hero-row{display:grid;grid-template-columns:148px 1fr 120px 148px;align-items:center;gap:14px;background:rgba(255,255,255,.03);border:1px solid rgba(255,107,53,.1);border-radius:10px;padding:11px 16px;transition:border-color .15s;}
        .hero-row:hover{border-color:rgba(255,107,53,.28);background:rgba(255,107,53,.04);}
        .hero-row-us{border-color:rgba(255,107,53,.35)!important;background:rgba(255,107,53,.06)!important;}
        .hr-name{font-size:14px;font-weight:700;color:var(--text);}
        .hr-name.us{color:var(--mango);}
        .bar-wrap{height:5px;background:rgba(255,255,255,.06);border-radius:3px;overflow:hidden;}
        .bar{height:100%;border-radius:3px;}
        .bar.us{background:linear-gradient(90deg,var(--mango),var(--mango2));}
        .bar.them{background:linear-gradient(90deg,#3a3a5a,#5a5a8a);}
        .hr-price{font-size:13px;font-weight:600;color:var(--text);text-align:right;white-space:nowrap;}
        .hr-price.us{color:var(--mango);}
        .hr-diff{font-size:11px;font-weight:500;padding:3px 9px;border-radius:5px;text-align:center;white-space:nowrap;}
        .hr-diff.savings{background:rgba(61,214,140,.12);color:var(--green);border:1px solid rgba(61,214,140,.25);}
        .hr-diff.same{background:rgba(122,122,154,.1);color:var(--muted);border:1px solid rgba(122,122,154,.2);}
        .hero-note{margin-top:16px;font-size:11px;font-weight:300;color:var(--muted);font-style:italic;}

        /* CONTAINER */
        .container{max-width:1160px;margin:0 auto;padding:0 24px 80px;position:relative;z-index:1;}
        .header{text-align:center;padding:52px 0 0;margin-bottom:44px;}
        .eyebrow{font-size:11px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--accent);margin-bottom:14px;display:flex;align-items:center;justify-content:center;gap:12px;}
        .eyebrow::before,.eyebrow::after{content:'';display:block;width:40px;height:1px;background:var(--accent);opacity:.4;}
        h1{font-size:clamp(46px,8vw,82px);font-weight:900;line-height:.95;letter-spacing:-.025em;color:#fff;}
        h1 span{color:var(--accent);}
        .subhead{font-size:14px;font-weight:300;color:var(--muted);margin-top:14px;max-width:500px;margin-left:auto;margin-right:auto;line-height:1.7;}
        .meta-row{display:flex;align-items:center;justify-content:center;gap:12px;margin-top:20px;flex-wrap:wrap;}
        .pill{display:inline-flex;align-items:center;gap:6px;background:var(--surface);border:1px solid var(--border);border-radius:100px;padding:6px 14px;font-size:11px;font-weight:500;color:var(--muted);}
        .dot{width:6px;height:6px;border-radius:50%;background:var(--green);box-shadow:0 0 6px var(--green);}
        .legend{display:flex;gap:22px;justify-content:center;flex-wrap:wrap;margin-bottom:38px;}
        .legend-item{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:400;color:var(--muted);}
        .legend-dot{width:10px;height:10px;border-radius:2px;}

        /* CARDS */
        .cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px;margin-bottom:56px;}
        .card{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:28px;position:relative;overflow:hidden;transition:transform .2s,border-color .2s,box-shadow .2s;animation:fadeUp .45s ease both;}
        .card:hover{transform:translateY(-4px);border-color:rgba(232,200,110,.25);box-shadow:0 18px 44px rgba(0,0,0,.45);}
        .card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--ca,#e8c86e),transparent);}
        .card.cv{--ca:var(--green);border-color:rgba(61,214,140,.2);}
        .card.ci{--ca:var(--accent2);border-color:rgba(91,141,238,.2);}
        .card.cp{--ca:var(--accent);border-color:rgba(232,200,110,.2);}
        .card.cm{--ca:var(--purple);border-color:rgba(167,139,250,.2);}
        .card:nth-child(1){animation-delay:.05s}.card:nth-child(2){animation-delay:.10s}.card:nth-child(3){animation-delay:.15s}
        .card:nth-child(4){animation-delay:.20s}.card:nth-child(5){animation-delay:.25s}.card:nth-child(6){animation-delay:.30s}
        .badge{position:absolute;top:16px;right:16px;font-size:9px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;padding:4px 8px;border-radius:4px;}
        .bg{background:rgba(61,214,140,.15);color:var(--green);border:1px solid rgba(61,214,140,.3);}
        .bb{background:rgba(91,141,238,.15);color:var(--accent2);border:1px solid rgba(91,141,238,.3);}
        .bo{background:rgba(232,200,110,.15);color:var(--accent);border:1px solid rgba(232,200,110,.3);}
        .bp{background:rgba(167,139,250,.15);color:var(--purple);border:1px solid rgba(167,139,250,.3);}
        .pnum{font-size:11px;font-weight:500;color:var(--muted);margin-bottom:4px;}
        .pname{font-size:26px;font-weight:800;color:#fff;line-height:1;margin-bottom:3px;letter-spacing:-.01em;}
        .ptag{font-size:11px;font-weight:300;color:var(--muted);margin-bottom:20px;}

        /* PRICE BLOCK — monthly + annual side by side */
        .price-block{background:var(--surface2);border-radius:12px;padding:18px;margin-bottom:20px;border:1px solid var(--border);}
        .pb-label{font-size:9px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);margin-bottom:10px;}
        .price-duo{display:flex;align-items:flex-end;gap:18px;margin-bottom:10px;}
        .p-mo-label,.p-yr-label{font-size:9px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-bottom:2px;}
        .p-mo-val{font-size:44px;font-weight:800;color:var(--accent);line-height:1;letter-spacing:-.02em;}
        .p-mo-val span{font-size:14px;font-weight:400;color:var(--muted);}
        .p-divider{width:1px;height:50px;background:var(--border);flex-shrink:0;align-self:center;}
        .p-yr-val{font-size:26px;font-weight:700;color:#c0a856;line-height:1;letter-spacing:-.01em;}
        .p-yr-val span{font-size:12px;font-weight:400;color:var(--muted);}
        .price-note{font-size:11px;font-weight:300;color:var(--muted);line-height:1.55;border-top:1px solid var(--border);padding-top:10px;}
        .price-note strong{color:var(--text);font-weight:500;}
        .ma{color:var(--accent);font-weight:600;}
        .vs-chip{display:inline-flex;align-items:center;gap:5px;margin-top:10px;padding:4px 10px;border-radius:5px;font-size:10px;font-weight:600;letter-spacing:.04em;}
        .vs-more{background:rgba(255,107,53,.1);border:1px solid rgba(255,107,53,.25);color:var(--mango);}
        .vs-same{background:rgba(122,122,154,.1);border:1px solid rgba(122,122,154,.2);color:var(--muted);}

        /* BREAKDOWN */
        .breakdown{margin-bottom:18px;}
        .bk-title{font-size:9px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-bottom:10px;}
        .bk-row{display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid rgba(42,42,61,.5);font-size:12px;}
        .bk-row:last-child{border-bottom:none;}
        .bk-key{color:var(--muted);font-weight:300;}
        .bk-val{font-size:11px;font-weight:500;}
        .vi{color:var(--green)}.ve{color:var(--yellow)}.vn{color:var(--text)}

        /* FEATURES */
        .features{display:flex;flex-direction:column;gap:5px;margin-bottom:16px;}
        .feat{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:400;}
        .feat-icon{font-size:13px;width:18px;flex-shrink:0;}
        .feat.yes{color:var(--text)}.feat.no{color:var(--muted);opacity:.4;text-decoration:line-through;}

        /* SOURCE */
        .src-block{padding:11px 13px;background:rgba(10,10,15,.6);border:1px solid rgba(42,42,61,.8);border-left:3px solid rgba(122,122,154,.4);border-radius:8px;}
        .src-title{font-size:9px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-bottom:5px;}
        .src-body{font-size:11px;font-weight:300;color:#5a5a7a;line-height:1.6;}
        .src-link{color:var(--muted);font-weight:500;text-decoration:underline;text-decoration-color:rgba(122,122,154,.4);text-underline-offset:2px;transition:color .15s;}
        .src-link:hover{color:var(--accent);}

        /* TABLE */
        .sec-title{font-size:24px;font-weight:800;color:#fff;margin-bottom:4px;letter-spacing:-.01em;}
        .sec-sub{font-size:13px;font-weight:300;color:var(--muted);margin-bottom:22px;}
        .table-wrap{overflow-x:auto;border-radius:16px;border:1px solid var(--border);}
        table{width:100%;border-collapse:collapse;background:var(--surface);font-size:12px;}
        thead th{padding:13px 14px;text-align:left;font-size:9px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);background:var(--surface2);border-bottom:1px solid var(--border);white-space:nowrap;}
        tbody tr{border-bottom:1px solid rgba(42,42,61,.6);transition:background .15s;}
        tbody tr:hover{background:rgba(232,200,110,.03);}
        tbody tr:last-child{border-bottom:none;}
        tbody td{padding:12px 14px;vertical-align:middle;}
        .td-p{font-size:14px;font-weight:700;white-space:nowrap;color:var(--text);}
        .td-a{font-size:14px;font-weight:600;color:var(--accent);}
        .td-mo{font-size:15px;font-weight:700;color:var(--accent);}
        .td-yr{font-size:13px;font-weight:600;color:#c0a856;}
        .td-sub{font-size:10px;font-weight:400;color:var(--muted);display:block;margin-top:1px;}
        .td-vs{font-size:11px;font-weight:600;}
        .td-vs.s{color:var(--green)}.td-vs.e{color:var(--muted)}
        .tag{display:inline-block;font-size:9px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;padding:3px 7px;border-radius:3px;margin:1px;}
        .ty{background:rgba(61,214,140,.12);color:var(--green);border:1px solid rgba(61,214,140,.25);}
        .te{background:rgba(245,200,66,.12);color:var(--yellow);border:1px solid rgba(245,200,66,.25);}
        .tn{background:rgba(240,101,101,.1);color:var(--red);border:1px solid rgba(240,101,101,.2);}
        .tp{background:rgba(91,141,238,.12);color:var(--accent2);border:1px solid rgba(91,141,238,.25);}
        .mx-tr td{background:rgba(255,107,53,.04)!important;}
        .mx-tr .td-p,.mx-tr .td-a,.mx-tr .td-mo,.mx-tr .td-yr{color:var(--mango);}

        /* DISCLAIMER */
        .disclaimer{margin-top:40px;padding:20px 24px;background:var(--surface);border:1px solid var(--border);border-radius:12px;font-size:12px;font-weight:300;color:var(--muted);line-height:1.75;}
        .disclaimer strong{color:var(--text);font-weight:500;}

        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:680px){.cards{grid-template-columns:1fr;}.hero-row{grid-template-columns:120px 1fr 100px;}.hr-diff{display:none;}}
      `}</style>

      {/* ── HERO ── */}
      <div className="hero">
        <div className="hero-inner">
          <div className="hero-eyebrow">MangoRx vs. The Competition</div>
          <div className="hero-h"><span>MangoRx TRT — $99/mo All-In</span><br />Here&apos;s How We Compare</div>
          <p className="hero-sub">
            <a href="https://mangorx.com" target="_blank" rel="noopener noreferrer">MangoRx.com</a> includes doctor&apos;s visit, labs, and medication for{" "}
            <strong style={{ color: "#fff" }}>$99/month flat</strong> — no hidden fees. Below is every major competitor&apos;s true amortized monthly cost.
          </p>
          <div className="hero-rows">
            <div className="hero-row hero-row-us">
              <div className="hr-name us">🥭 MangoRx</div>
              <div className="bar-wrap"><div className="bar us" style={{ width: "49%" }}></div></div>
              <div className="hr-price us">$99/mo · All-In</div>
            </div>
            {HERO_ROWS.map((r) => (
              <div key={r.name} className="hero-row">
                <div className="hr-name">{r.name}</div>
                <div className="bar-wrap"><div className="bar them" style={{ width: `${r.barPct}%` }}></div></div>
                <div className="hr-price">
                  ${r.monthly === 99 ? "99" : r.monthly >= 194 ? "194–209" : r.monthly}/mo
                </div>
                {r.diff ? (
                  <div className="hr-diff savings">{r.diff} · {r.pct}</div>
                ) : (
                  <div className="hr-diff same">Same price — enclomiphene only</div>
                )}
              </div>
            ))}
          </div>
          <p className="hero-note">* All competitor prices are true amortized monthly costs (base + labs ÷ 12). MangoRx $99/mo is fully all-in. Full methodology per provider below.</p>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div className="container">
        <div className="header">
          <div className="eyebrow">2026 Full Market Analysis</div>
          <h1>TRT <span>PRICE</span><br />BREAKDOWN</h1>
          <p className="subhead">All-in monthly and annual cost after doctor visit, labs, and medication — amortized and sourced.</p>
          <div className="meta-row">
            <div className="pill"><span className="dot"></span> Prices verified April 2026</div>
            <div className="pill">🕐 Last script ran: {buildDate}</div>
          </div>
        </div>

        <div className="legend">
          <div className="legend-item"><div className="legend-dot" style={{ background: "var(--green)" }}></div>Included</div>
          <div className="legend-item"><div className="legend-dot" style={{ background: "var(--yellow)" }}></div>Extra cost</div>
          <div className="legend-item"><div className="legend-dot" style={{ background: "var(--red)" }}></div>Not available</div>
          <div className="legend-item"><div className="legend-dot" style={{ background: "var(--accent2)" }}></div>Partial / varies</div>
        </div>

        <div className="cards">
          {sorted.map((p, i) => (
            <ProviderCard key={p.id} p={p} index={i} total={sorted.length} />
          ))}
        </div>

        {/* TABLE */}
        <div>
          <div className="sec-title">Side-by-Side Breakdown</div>
          <div className="sec-sub">Sorted cheapest to most expensive by true amortized monthly cost. MangoRx shown as baseline.</div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Provider</th><th>Advertised</th><th>Labs</th><th>Dr. Visit</th><th>Medication</th>
                  <th>Monthly (True)</th><th>Annual (True)</th><th>vs. MangoRx $99</th><th>Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="mx-tr">
                  <td className="td-p">🥭 MangoRx</td>
                  <td><span className="td-a">$99</span><span className="td-sub">all-in</span></td>
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
          <strong>📋 How this data is gathered:</strong> Each provider&apos;s advertised price was pulled directly from their official website or FAQ page, then cross-referenced with at least one independent review source. Lab costs and frequencies were sourced from provider documentation. All figures are amortized over 12 months: <em>(monthly base) + (total annual lab costs ÷ 12)</em>. One-time startup costs are spread across year one. Annual totals are monthly × 12. See each card&apos;s Data Source for the specific URL. Prices verified April 2026, re-checked daily via automated script. <strong>MangoRx pricing ($99/mo all-in) sourced from mangorx.com.</strong> For informational purposes only — not medical advice.
        </div>
      </div>
    </>
  );
}

function ProviderCard({ p, index, total }) {
  const isHims = p.id === "hims";
  const cardClass = { "trt-nation": "cv", "fountain-trt": "ci", "hone-health": "cp", "henry-meds": "cm" }[p.id] || "";
  const badge = p.badge;
  const badgeClass = { green: "bg", blue: "bb", gold: "bo", purple: "bp" }[p.badgeColor] || "";
  const diffAmt = p.trueMonthly - 99;
  const diffPct = ((diffAmt / 99) * 100).toFixed(1);

  return (
    <div className={`card ${cardClass}`}>
      {badge && <span className={`badge ${badgeClass}`}>{badge}</span>}
      <div className="pnum">0{index + 1} / 0{total}</div>
      <div className="pname">{p.name}</div>
      <div className="ptag">{p.tagline}</div>

      <div className="price-block">
        <div className="pb-label">True All-In Cost (Amortized)</div>
        <div className="price-duo">
          <div>
            <div className="p-mo-label">Per Month</div>
            <div className="p-mo-val">{p.trueMonthlyDisplay}<span>/mo</span></div>
          </div>
          <div className="p-divider"></div>
          <div>
            <div className="p-yr-label">Per Year</div>
            <div className="p-yr-val">${p.annualTotal.toLocaleString()}<span>/yr</span></div>
          </div>
        </div>
        <div className="price-note">
          <strong>Math:</strong> {p.mathNote}
        </div>
        {diffAmt <= 0 || isHims ? (
          <div className="vs-chip vs-same">= Same price as MangoRx — enclomiphene only, no injections</div>
        ) : (
          <div className="vs-chip vs-more">+${diffAmt.toFixed(2)}/mo vs MangoRx · {diffPct}% more expensive</div>
        )}
      </div>

      <div className="breakdown">
        <div className="bk-title">Cost Breakdown</div>
        {p.breakdown.map((row, i) => (
          <div key={i} className="bk-row">
            <span className="bk-key">{row.label}</span>
            <span className={`bk-val ${row.type === "included" ? "vi" : row.type === "extra" ? "ve" : "vn"}`}>{row.value}</span>
          </div>
        ))}
      </div>

      <div className="features">
        {p.features.map((f, i) => (
          <div key={i} className={`feat ${f.available ? "yes" : "no"}`}>
            <span className="feat-icon">{f.icon}</span> {f.text}
          </div>
        ))}
      </div>

      <div className="src-block">
        <div className="src-title">📄 Data Source</div>
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
      <td className="td-p">{p.name}</td>
      <td><span className="td-a">${p.advertisedMonthly}</span><span className="td-sub">advertised</span></td>
      <td>
        {labRow?.type === "included" ? <span className="tag ty">Included</span> : null}
        {labRow?.type === "extra"    ? <span className="tag te">{labRow.value}</span> : null}
      </td>
      <td>
        {p.id === "hims" ? <span className="tag tp">Async only</span>
          : p.id === "trt-nation" ? <span className="tag ty">Unlimited</span>
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
        {p.id === "hims" && "Enclomiphene only"}
        {p.id === "maximus" && "Oral & injectable options"}
        {p.id === "trt-nation" && "Injections only"}
        {p.id === "henry-meds" && "Ages 35–65 only"}
        {p.id === "fountain-trt" && "Zero add-ons, urologist MD"}
        {p.id === "hone-health" && "Insurance billing, 40+ labs"}
      </td>
    </tr>
  );
}
