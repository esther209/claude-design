/* global React, ReactDOM, TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakToggle, TweakSlider, TrendLine, GroupedBars, Funnel, CohortCurve, BudgetShift */
const { useState, useEffect, useMemo, useRef } = React;

/* ============ TYPE / SPACING ============ */
const TYPE = {
  hero: 180,        // mega number
  ultra: 260,       // cover stencil
  title: 72,        // slide titles
  titleSm: 56,
  subtitle: 38,
  body: 28,
  bodyLg: 32,
  small: 22,
  micro: 18,
};
const SP = {
  padX: 90,
  padTop: 90,
  padBot: 90,
  titleGap: 44,
  itemGap: 26,
};

/* Tweak defaults */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "metricMode": "absolute"
}/*EDITMODE-END*/;

/* ============ Helpers ============ */
const nf = (n, d = 0) => n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
const dollars = (n) => "$" + nf(n);

/* ============ Slide chrome ============ */
function CornerMark({ light, num, total }) {
  return (
    <>
      <div className="slide-corner-mark">
        <img src={light ? window.__resources.logoMarkWhite : window.__resources.logoMarkWhite}
             style={light ? { filter: "invert(1)" } : null} alt="" />
        <div className="div"></div>
        <span className="label">Northway × AdVenture</span>
      </div>
      <div className="slide-foot">
        <span className="left">Q1 2026 · Quarterly Business Review</span>
        <span className="right">{String(num).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
      </div>
    </>
  );
}

/* ============ Slides ============ */

// 01 — Cover
function SlideCover() {
  return (
    <section data-label="01 Cover" style={{
      background: "#000", color: "#fff", position: "relative", width: "100%", height: "100%",
    }}>
      {/* Pattern as massive decorative element, low opacity */}
      <img src={window.__resources.pattern04Red} alt=""
        style={{
          position: "absolute", right: -200, top: -100, width: 1500,
          opacity: 0.18, mixBlendMode: "screen", pointerEvents: "none"
        }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: `${SP.padTop}px ${SP.padX}px ${SP.padBot}px` }}>
        {/* top row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img src={window.__resources.logoPrimaryWhite} style={{ height: 38 }} alt="MMI" />
          <div style={{ width: 1, height: 28, background: "var(--border-on-dark)" }}></div>
          <span className="meta" style={{ fontSize: 24 }}>AdVenture Media · Performance</span>
        </div>

        {/* big stack */}
        <div>
          <div className="eyebrow" style={{ fontSize: 22, marginBottom: 32 }}>Q1 2026 · Quarterly Business Review</div>
          <h1 className="tg-tight" style={{ fontSize: 220, color: "var(--mmi-sand)", margin: 0 }}>
            Northway<br/>
            <span style={{ color: "var(--mmi-red)" }}>Goods.</span>
          </h1>
          <div style={{ display: "flex", gap: 60, marginTop: 48, alignItems: "flex-end" }}>
            <div>
              <div className="meta" style={{ fontSize: 20, marginBottom: 12 }}>Prepared for</div>
              <div className="dm" style={{ fontSize: 24, fontWeight: 500, color: "var(--mmi-sand)" }}>Maya Patel — VP Growth</div>
            </div>
            <div style={{ width: 1, height: 56, background: "var(--border-on-dark)" }}></div>
            <div>
              <div className="meta" style={{ fontSize: 20, marginBottom: 12 }}>Prepared by</div>
              <div className="dm" style={{ fontSize: 24, fontWeight: 500, color: "var(--mmi-sand)" }}>Isaac R., Sloane K., Devon T.</div>
            </div>
            <div style={{ width: 1, height: 56, background: "var(--border-on-dark)" }}></div>
            <div>
              <div className="meta" style={{ fontSize: 20, marginBottom: 12 }}>Date</div>
              <div className="dm" style={{ fontSize: 24, fontWeight: 500, color: "var(--mmi-sand)" }}>April 30, 2026</div>
            </div>
          </div>
        </div>

        {/* bottom anchor */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-on-dark)", paddingTop: 28 }}>
          <span className="meta" style={{ fontSize: 24 }}>Confidential — Northway Goods Inc.</span>
          <span className="meta" style={{ fontSize: 24 }}>01</span>
        </div>
      </div>
    </section>
  );
}

// 02 — Agenda / what we'll cover
function SlideAgenda() {
  const items = [
    ["01", "The quarter in one number", "Where we landed vs. plan."],
    ["02", "Performance vs. goals", "Channel-by-channel scorecard."],
    ["03", "What the funnel revealed", "Top → middle → bottom diagnostics."],
    ["04", "Audience signal we found", "The cohort that's quietly winning."],
    ["05", "Q2 budget recommendation", "Where the next dollar should go."],
  ];
  return (
    <section data-label="02 Agenda" style={{ background: "#000", width: "100%", height: "100%", position: "relative" }}>
      <CornerMark num={2} total={10} />
      <div style={{ position: "absolute", inset: 0, padding: `${SP.padTop}px ${SP.padX}px ${SP.padBot}px`, display: "flex", flexDirection: "column" }}>
        <div className="eyebrow" style={{ marginBottom: 32 }}>Today</div>
        <h2 className="tg-tight" style={{ fontSize: TYPE.title, color: "var(--mmi-sand)", margin: 0, maxWidth: 1100 }}>
          Five things, <span style={{ color: "var(--mmi-red)" }}>fifteen minutes.</span>
        </h2>
        <div style={{ marginTop: 60, borderTop: "1px solid var(--border-on-dark)" }}>
          {items.map(([n, t, sub]) => (
            <div key={n} style={{ display: "grid", gridTemplateColumns: "100px 1fr 1fr 50px", alignItems: "center",
              padding: "24px 0", borderBottom: "1px solid var(--border-on-dark)" }}>
              <div className="tg" style={{ fontSize: 28, color: "var(--mmi-red)" }}>{n}</div>
              <div className="tg" style={{ fontSize: 30, color: "var(--mmi-sand)" }}>{t}</div>
              <div className="dm" style={{ fontSize: 22, color: "var(--fg-muted)", fontWeight: 300 }}>{sub}</div>
              <div style={{ textAlign: "right" }}>
                <span className="dm" style={{ fontSize: 22, color: "var(--fg-faint)", fontWeight: 700, letterSpacing: "0.12em" }}>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 03 — Section divider: results
function SlideSectionResults() {
  return (
    <section data-label="03 Section · Results" style={{ background: "var(--mmi-sand)", color: "#000", width: "100%", height: "100%", position: "relative" }}>
      <img src={window.__resources.pattern02Red} alt=""
        style={{ position: "absolute", right: 0, top: 0, height: "100%", opacity: 0.55, pointerEvents: "none" }} />
      <div className="is-light">
        <div className="slide-corner-mark">
          <img src={window.__resources.logoMarkWhite} style={{ filter: "invert(1)", height: 32 }} alt="" />
          <div className="div"></div>
          <span className="label">Northway × AdVenture</span>
        </div>
        <div className="slide-foot">
          <span className="left">Section · Results</span>
          <span className="right">03 / 10</span>
        </div>
      </div>
      <div style={{ position: "absolute", inset: 0, padding: `${SP.padTop}px ${SP.padX}px ${SP.padBot}px`, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="eyebrow" style={{ color: "var(--mmi-red)", marginBottom: 28, marginTop: 80 }}>Section 01</div>
        <h2 className="tg-tight" style={{ fontSize: 180, margin: 0, color: "#000", maxWidth: 1500 }}>
          The quarter,<br/>
          <span style={{ color: "var(--mmi-red)" }}>in one number.</span>
        </h2>
        <p className="dm" style={{ fontSize: 26, fontWeight: 300, color: "rgba(0,0,0,0.7)", marginTop: 32, maxWidth: 1000, lineHeight: 1.35 }}>
          We set Q1 up around three numbers: revenue, blended ROAS, and new-customer share. Here's where we landed.
        </p>
      </div>
    </section>
  );
}

// 04 — Mega number: revenue + ROAS + NCAC + interactive trend
function SlideHeadlineNumber({ tweaks }) {
  const useAbs = tweaks.metricMode === "absolute";
  const trend = [
    { label: "Q2 '25", value: 4.92, tooltip: "$4.92M", note: "Pre-engagement" },
    { label: "Q3 '25", value: 5.34, tooltip: "$5.34M", note: "Onboarding quarter" },
    { label: "Q4 '25", value: 5.71, tooltip: "$5.71M", note: "Holiday baseline" },
    { label: "Q1 '26", value: 8.42, tooltip: "$8.42M", note: "+47% QoQ" },
  ];
  return (
    <section data-label="04 Headline Number" style={{ background: "#000", width: "100%", height: "100%", position: "relative" }}>
      <CornerMark num={4} total={10} />
      <img src={window.__resources.pattern01Red} alt=""
        style={{ position: "absolute", left: -160, bottom: -120, width: 800, opacity: 0.14, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, padding: `${SP.padTop}px ${SP.padX}px ${SP.padBot}px`, display: "flex", flexDirection: "column" }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>Q1 Headline</div>
        <h2 className="tg-tight" style={{ fontSize: TYPE.titleSm, color: "var(--mmi-sand)", margin: 0, maxWidth: 1500, lineHeight: 1.05 }}>
          Paid media drove <span style={{ color: "var(--mmi-red)" }}>$8.42M</span> in Q1 revenue at a <span style={{ color: "var(--mmi-red)" }}>4.6×</span> blended return.
        </h2>

        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr", marginTop: 50, borderTop: "1px solid var(--border-on-dark)" }}>
          {/* primary — number + trend chart */}
          <div style={{ padding: "32px 50px 24px 0", borderRight: "1px solid var(--border-on-dark)", display: "flex", flexDirection: "column" }}>
            <div className="meta" style={{ fontSize: 20, marginBottom: 14 }}>Paid revenue</div>
            <div className="tg-tight" style={{ fontSize: 140, color: "var(--mmi-sand)", lineHeight: 1 }}>
              {useAbs ? "$8.42M" : "+47%"}
            </div>
            <div className="dm" style={{ fontSize: 20, color: "var(--fg-muted)", fontWeight: 300, marginTop: 10, marginBottom: 18 }}>
              {useAbs ? "vs. $5.71M in Q4 2025" : "quarter over quarter"}
            </div>
            <div style={{ flex: 1, minHeight: 0 }}>
              <TrendLine data={trend} height={240} ariaLabel="Quarterly paid revenue trend" />
            </div>
          </div>
          {/* roas */}
          <div style={{ padding: "32px 30px 24px 40px", borderRight: "1px solid var(--border-on-dark)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div className="meta" style={{ fontSize: 20, marginBottom: 14 }}>Blended ROAS</div>
              <div className="tg-tight" style={{ fontSize: 110, color: "var(--mmi-sand)", lineHeight: 1 }}>4.6<span style={{ color: "var(--mmi-red)" }}>×</span></div>
            </div>
            <div style={{ marginTop: 24 }}>
              {/* simple progress vs plan */}
              <div style={{ height: 8, background: "rgba(255,255,255,0.1)", position: "relative", marginBottom: 14 }}>
                <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${(3.8/5)*100}%`, background: "var(--fg-muted)" }}></div>
                <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${(4.6/5)*100}%`, background: "var(--mmi-red)" }}></div>
                <div style={{ position: "absolute", left: `${(3.8/5)*100}%`, top: -6, height: 20, width: 2, background: "var(--mmi-sand)" }}></div>
              </div>
              <div className="dm" style={{ fontSize: 20, color: "var(--fg-muted)", fontWeight: 400 }}>Plan <span style={{ color: "var(--mmi-sand)" }}>3.8×</span> · <span style={{ color: "var(--mmi-red)", fontWeight: 600 }}>+0.8 above target</span></div>
            </div>
          </div>
          {/* nCAC */}
          <div style={{ padding: "32px 0 24px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div className="meta" style={{ fontSize: 20, marginBottom: 14 }}>New-customer CAC</div>
              <div className="tg-tight" style={{ fontSize: 110, color: "var(--mmi-sand)", lineHeight: 1 }}>
                {useAbs ? "$38" : "−22%"}
              </div>
            </div>
            <div style={{ marginTop: 24 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 8 }}>
                <span className="dm" style={{ fontSize: 20, color: "var(--fg-muted)" }}>Q4</span>
                <span className="tg" style={{ fontSize: 26, color: "var(--fg-muted)", textDecoration: "line-through" }}>$49</span>
                <span style={{ color: "var(--mmi-red)", fontSize: 22 }}>→</span>
                <span className="tg" style={{ fontSize: 28, color: "var(--mmi-sand)" }}>$38</span>
              </div>
              <div className="dm" style={{ fontSize: 20, color: "var(--mmi-red)", fontWeight: 600 }}>Below $42 target</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 05 — Performance vs goals (interactive bar chart)
function SlidePerformanceTable({ tweaks }) {
  const useAbs = tweaks.metricMode === "absolute";
  const rows = [
    { label: "Google — Search", plan: 1.80, actual: 2.14, planDisplay: "$1.80M", actualDisplay: "$2.14M", actualPct: "+19%", roas: "6.2×", roasPlan: "5.4×" },
    { label: "Google — Shopping / PMax", plan: 1.40, actual: 1.92, planDisplay: "$1.40M", actualDisplay: "$1.92M", actualPct: "+37%", roas: "5.1×", roasPlan: "4.2×" },
    { label: "Meta — Prospecting", plan: 1.10, actual: 1.48, planDisplay: "$1.10M", actualDisplay: "$1.48M", actualPct: "+35%", roas: "3.4×", roasPlan: "2.9×" },
    { label: "Meta — Retargeting", plan: 0.95, actual: 1.02, planDisplay: "$0.95M", actualDisplay: "$1.02M", actualPct: "+7%", roas: "5.8×", roasPlan: "5.5×" },
    { label: "TikTok — Prospecting", plan: 0.55, actual: 0.71, planDisplay: "$0.55M", actualDisplay: "$0.71M", actualPct: "+29%", roas: "2.4×", roasPlan: "2.1×" },
    { label: "Programmatic / YouTube", plan: 0.90, actual: 1.15, planDisplay: "$0.90M", actualDisplay: "$1.15M", actualPct: "+15%", roas: "2.9×", roasPlan: "2.6×" },
  ];
  return (
    <section data-label="05 Performance vs Goals" style={{ background: "#000", width: "100%", height: "100%", position: "relative" }}>
      <CornerMark num={5} total={10} />
      <div style={{ position: "absolute", inset: 0, padding: `${SP.padTop}px ${SP.padX}px ${SP.padBot}px`, display: "flex", flexDirection: "column" }}>
        <div className="eyebrow" style={{ marginBottom: 18 }}>Section 02 · Scorecard</div>
        <h2 className="tg-tight" style={{ fontSize: TYPE.titleSm, color: "var(--mmi-sand)", margin: 0, maxWidth: 1500 }}>
          Every channel beat plan. <span style={{ color: "var(--mmi-red)" }}>Six for six.</span>
        </h2>

        {/* legend */}
        <div style={{ display: "flex", gap: 32, alignItems: "center", marginTop: 28, marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 22, height: 8, border: "1.5px dashed var(--fg-muted)", display: "inline-block" }}></span>
            <span className="meta" style={{ fontSize: 18 }}>Plan</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 22, height: 12, background: "var(--mmi-red)", display: "inline-block" }}></span>
            <span className="meta" style={{ fontSize: 18 }}>Actual</span>
          </div>
          <div className="meta" style={{ fontSize: 18, color: "var(--mmi-red)" }}>· hover any row</div>
        </div>

        <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center" }}>
          <GroupedBars rows={rows} useAbs={useAbs} />
        </div>

        {/* summary footer */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 0, borderTop: "2px solid var(--mmi-red)", paddingTop: 18, marginTop: 12 }}>
          <div>
            <div className="meta" style={{ fontSize: 18 }}>Total revenue</div>
            <div className="tg" style={{ fontSize: 32, color: "var(--mmi-sand)", marginTop: 4 }}>{useAbs ? "$8.42M" : "+47%"}</div>
          </div>
          <div>
            <div className="meta" style={{ fontSize: 18 }}>Plan</div>
            <div className="tg" style={{ fontSize: 32, color: "var(--fg-muted)", marginTop: 4 }}>{useAbs ? "$6.70M" : "+13%"}</div>
          </div>
          <div>
            <div className="meta" style={{ fontSize: 18 }}>Beat by</div>
            <div className="tg" style={{ fontSize: 32, color: "var(--mmi-red)", marginTop: 4 }}>{useAbs ? "$1.72M" : "+34pts"}</div>
          </div>
          <div>
            <div className="meta" style={{ fontSize: 18 }}>Blended ROAS</div>
            <div className="tg" style={{ fontSize: 32, color: "var(--mmi-sand)", marginTop: 4 }}>4.6× <span style={{ color: "var(--fg-muted)", fontSize: 22 }}>vs. 3.8×</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 06 — Funnel insight (interactive)
function SlideFunnel() {
  const stages = [
    { name: "Impressions", value: 184000000, display: "184M", deltaPct: "+62%", isMid: false },
    { name: "Site sessions", value: 3910000, display: "3.91M", deltaPct: "+58%", isMid: false },
    { name: "Add to cart", value: 412000, display: "412K", deltaPct: "+71%", isMid: true },
    { name: "Checkout started", value: 186000, display: "186K", deltaPct: "+74%", isMid: true },
    { name: "Purchases", value: 94200, display: "94.2K", deltaPct: "+49%", isMid: false },
  ];
  return (
    <section data-label="06 Funnel" style={{ background: "#000", width: "100%", height: "100%", position: "relative" }}>
      <CornerMark num={6} total={10} />
      <div style={{ position: "absolute", inset: 0, padding: `${SP.padTop}px ${SP.padX}px ${SP.padBot}px`, display: "flex", flexDirection: "column" }}>
        <div className="eyebrow" style={{ marginBottom: 18 }}>What the funnel revealed</div>
        <h2 className="tg-tight" style={{ fontSize: TYPE.titleSm, color: "var(--mmi-sand)", margin: 0, maxWidth: 1500 }}>
          Mid-funnel is <span style={{ color: "var(--mmi-red)" }}>working harder</span> than the top.
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 60, marginTop: 50, flex: 1, minHeight: 0 }}>
          {/* Funnel viz — interactive */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Funnel stages={stages} />
            <div className="meta" style={{ fontSize: 16, color: "var(--mmi-red)", marginTop: 14, textAlign: "center" }}>
              hover any stage to see step-through rate
            </div>
          </div>

          {/* Insight panel */}
          <div style={{ borderLeft: "1px solid var(--border-on-dark)", paddingLeft: 44, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="meta" style={{ fontSize: 20, marginBottom: 18 }}>Read</div>
            <p className="dm" style={{ fontSize: 26, fontWeight: 300, color: "var(--mmi-sand)", lineHeight: 1.35, margin: 0 }}>
              Cart and checkout grew <span style={{ color: "var(--mmi-red)", fontWeight: 600 }}>faster than traffic</span> — a sign the new PDP and free-shipping threshold are doing real work.
            </p>
            <div style={{ height: 1, background: "var(--border-on-dark)", margin: "30px 0" }}></div>
            <div style={{ display: "flex", gap: 44 }}>
              <div>
                <div className="tg-tight" style={{ fontSize: 64, color: "var(--mmi-red)", lineHeight: 1 }}>+1.4pt</div>
                <div className="dm" style={{ fontSize: 18, color: "var(--fg-muted)", marginTop: 8 }}>Cart → checkout rate</div>
              </div>
              <div>
                <div className="tg-tight" style={{ fontSize: 64, color: "var(--mmi-red)", lineHeight: 1 }}>$112</div>
                <div className="dm" style={{ fontSize: 18, color: "var(--fg-muted)", marginTop: 8 }}>AOV, up from $94</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 07 — Audience pull-quote / cohort insight (with retention curve)
function SlideAudience() {
  const cohort = [
    { day: 0, value: 100 }, { day: 7, value: 78 }, { day: 14, value: 70 },
    { day: 21, value: 65 }, { day: 30, value: 63 }, { day: 38, value: 61 },
    { day: 45, value: 58 }, { day: 60, value: 54 },
  ];
  const account = [
    { day: 0, value: 100 }, { day: 7, value: 52 }, { day: 14, value: 41 },
    { day: 21, value: 35 }, { day: 30, value: 31 }, { day: 38, value: 29 },
    { day: 45, value: 28 }, { day: 60, value: 26 },
  ];
  return (
    <section data-label="07 Audience Insight" style={{ background: "var(--mmi-sand)", color: "#000", width: "100%", height: "100%", position: "relative" }}>
      <img src={window.__resources.pattern03Red} alt=""
        style={{ position: "absolute", left: 0, bottom: 0, width: 580, opacity: 0.6, pointerEvents: "none" }} />
      <div className="is-light">
        <div className="slide-corner-mark">
          <img src={window.__resources.logoMarkWhite} style={{ filter: "invert(1)", height: 32 }} alt="" />
          <div className="div"></div>
          <span className="label">Northway × AdVenture</span>
        </div>
        <div className="slide-foot">
          <span className="left">Audience signal</span>
          <span className="right">07 / 10</span>
        </div>
      </div>
      <div style={{ position: "absolute", inset: 0, padding: `${SP.padTop}px ${SP.padX}px ${SP.padBot}px`, display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 60 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className="eyebrow" style={{ color: "var(--mmi-red)", marginBottom: 22 }}>The cohort that's quietly winning</div>
          <h2 className="tg-tight" style={{ fontSize: 76, color: "#000", margin: 0, lineHeight: 1.04 }}>
            Women 35–54 in <span style={{ color: "var(--mmi-red)" }}>cold-weather</span> states are buying <span style={{ background: "var(--mmi-red)", color: "var(--mmi-sand)", padding: "0 14px" }}>twice</span>.
          </h2>
          <p className="dm" style={{ fontSize: 24, fontWeight: 300, color: "rgba(0,0,0,0.75)", marginTop: 32, maxWidth: 720, lineHeight: 1.4 }}>
            61% of this cohort came back within 38 days, mostly through email + retargeting. They're not our biggest audience — they're our most efficient one.
          </p>
        </div>

        {/* Cohort curve panel */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className="eyebrow" style={{ color: "var(--mmi-red)", marginBottom: 14, fontSize: 18 }}>60-day retention</div>
          <div style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)", padding: "28px 24px 14px" }}>
            <CohortCurve cohort={cohort} account={account} height={300} ariaLabel="60-day cohort retention curve" />
          </div>
          <div className="meta" style={{ fontSize: 14, color: "rgba(0,0,0,0.55)", marginTop: 12, textAlign: "center" }}>
            hover the line for daily retention
          </div>
        </div>
      </div>
    </section>
  );
}

// 08 — Section divider: where we go from here
function SlideSectionForward() {
  return (
    <section data-label="08 Section · Forward" style={{ background: "#000", color: "#fff", width: "100%", height: "100%", position: "relative" }}>
      <CornerMark num={8} total={10} />
      <img src={window.__resources.pattern04Red} alt=""
        style={{ position: "absolute", left: -100, bottom: -250, width: 1300, opacity: 0.16, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, padding: `${SP.padTop}px ${SP.padX}px ${SP.padBot}px`, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="eyebrow" style={{ marginBottom: 28 }}>Section 02 · Forward</div>
        <h2 className="tg-tight" style={{ fontSize: 150, color: "var(--mmi-sand)", margin: 0, lineHeight: 0.95 }}>
          Where the next<br/>
          <span style={{ color: "var(--mmi-red)" }}>dollar should go.</span>
        </h2>
      </div>
    </section>
  );
}

// 09 — Q2 budget recommendation (with interactive shift chart)
function SlideBudget({ tweaks }) {
  const useAbs = tweaks.metricMode === "absolute";
  const moves = [
    {
      tag: "Scale",
      title: "Meta prospecting",
      detail: "Best LTV-to-CAC of any prospecting channel. Lift to fund the 35–54 cohort + creative testing.",
      delta: useAbs ? "+$470K" : "+32%",
      to: useAbs ? "$1.95M" : "of paid spend",
      action: "scale",
    },
    {
      tag: "Scale",
      title: "Google PMax — apparel",
      detail: "Asset-group performance is consistent. Carve out a winter-apparel-only PMax with a separate budget.",
      delta: useAbs ? "+$280K" : "+15%",
      to: useAbs ? "$1.40M" : "of paid spend",
      action: "scale",
    },
    {
      tag: "Hold",
      title: "Search + retargeting",
      detail: "Already at saturation. Same dollars, refreshed creative cadence (every 21 days).",
      delta: "Flat",
      to: useAbs ? "$2.10M combined" : "no change",
      action: "hold",
    },
    {
      tag: "Cut",
      title: "Programmatic display",
      detail: "ROAS held but incrementality test was inconclusive. Pull 40% and re-deploy to Meta/PMax above.",
      delta: useAbs ? "−$340K" : "−40%",
      to: useAbs ? "$510K" : "of channel spend",
      action: "cut",
    },
  ];
  // Budget shift items (same channels, more granular)
  const shiftItems = [
    { label: "Meta prospecting", q1: 1.48, q2: 1.95, action: "scale" },
    { label: "Google PMax", q1: 1.20, q2: 1.40, action: "scale" },
    { label: "Search + retargeting", q1: 2.10, q2: 2.10, action: "hold" },
    { label: "Programmatic", q1: 0.85, q2: 0.51, action: "cut" },
  ];
  const tagColor = (t) => t === "Scale" ? "var(--mmi-red)" : t === "Cut" ? "rgba(255,255,255,0.55)" : "var(--mmi-sand)";
  return (
    <section data-label="09 Q2 Budget" style={{ background: "#000", width: "100%", height: "100%", position: "relative" }}>
      <CornerMark num={9} total={10} />
      <div style={{ position: "absolute", inset: 0, padding: `${SP.padTop}px ${SP.padX}px 100px`, display: "flex", flexDirection: "column" }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>Q2 budget recommendation</div>
        <h2 className="tg-tight" style={{ fontSize: 48, color: "var(--mmi-sand)", margin: 0, maxWidth: 1700 }}>
          Move <span style={{ color: "var(--mmi-red)" }}>$410K</span> into what's already pulling weight.
        </h2>

        {/* Budget shift chart */}
        <div style={{ marginTop: 22, paddingBottom: 8, borderBottom: "1px solid var(--border-on-dark)" }}>
          <BudgetShift items={shiftItems} useAbs={useAbs} />
        </div>

        {/* Move cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginTop: 22, flex: 1, minHeight: 0 }}>
          {moves.map((m) => (
            <div key={m.title} style={{ border: "1px solid var(--border-on-dark)", padding: "20px 22px", display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 16, letterSpacing: "0.16em", textTransform: "uppercase", color: tagColor(m.tag), border: `1px solid ${tagColor(m.tag)}`, padding: "4px 10px" }}>
                  {m.tag}
                </span>
              </div>
              <div className="tg-tight" style={{ fontSize: 38, color: m.tag === "Cut" ? "var(--fg-faint)" : "var(--mmi-red)", lineHeight: 1 }}>{m.delta}</div>
              <div className="meta" style={{ fontSize: 16, marginTop: -2 }}>{m.to}</div>
              <h3 className="tg" style={{ fontSize: 22, color: "var(--mmi-sand)", margin: "8px 0 0" }}>{m.title}</h3>
              <p className="dm" style={{ fontSize: 17, fontWeight: 300, color: "var(--fg-muted)", lineHeight: 1.4, margin: 0 }}>{m.detail}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 18, display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-on-dark)", paddingTop: 14 }}>
          <span className="meta" style={{ fontSize: 18 }}>Net Q2 paid budget</span>
          <span className="tg" style={{ fontSize: 28, color: "var(--mmi-sand)" }}>{useAbs ? "$5.95M" : "+11% vs. Q1"}</span>
          <span className="meta" style={{ fontSize: 18 }}>Implied Q2 revenue</span>
          <span className="tg" style={{ fontSize: 28, color: "var(--mmi-red)" }}>{useAbs ? "≈ $26.8M" : "+24% YoY"}</span>
        </div>
      </div>
    </section>
  );
}

// 10 — The ask / close
function SlideAsk() {
  return (
    <section data-label="10 Close" style={{ background: "var(--mmi-black)", color: "var(--mmi-sand)", width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      <img src={window.__resources.pattern04Black} alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 56, left: 100, display: "flex", alignItems: "center", gap: 16, zIndex: 5 }}>
        <img src={window.__resources.logoPrimaryWhite} style={{ height: 32 }} alt="" />
        <div style={{ width: 1, height: 24, background: "rgba(247,245,238,0.4)" }}></div>
        <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 24, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(247,245,238,0.85)" }}>Northway × AdVenture</span>
      </div>
      <div style={{ position: "absolute", bottom: 56, left: 100, right: 100, display: "flex", justifyContent: "space-between", color: "rgba(247,245,238,0.55)", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 24, letterSpacing: "0.16em", textTransform: "uppercase", zIndex: 5 }}>
        <span>The ask</span>
        <span>10 / 10</span>
      </div>
      <div style={{ position: "absolute", inset: 0, padding: `${SP.padTop}px ${SP.padX}px ${SP.padBot}px`, display: "flex", flexDirection: "column", justifyContent: "center", zIndex: 2 }}>
        <div className="eyebrow" style={{ marginBottom: 28 }}>The ask</div>
        <h2 className="tg-tight" style={{ fontSize: 140, margin: 0, color: "var(--mmi-sand)", lineHeight: 0.95, maxWidth: 1700 }}>
          Approve the Q2 plan.<br/>We start <span style={{ color: "var(--mmi-red)" }}>Monday</span>.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", marginTop: 64, borderTop: "1px solid rgba(247,245,238,0.2)" }}>
          {[
            ["01", "Greenlight $5.95M Q2 paid budget", "Meta + PMax scale, programmatic cut."],
            ["02", "Approve cold-weather cohort campaign", "Creative + LP go live May 6."],
            ["03", "Lock May 21 mid-quarter check-in", "Same room, 30 minutes, numbers only."],
          ].map(([n, t, sub]) => (
            <div key={n} style={{ padding: "30px 32px 0 0", borderRight: n !== "03" ? "1px solid rgba(247,245,238,0.2)" : "none", paddingLeft: n !== "01" ? 32 : 0 }}>
              <div className="tg" style={{ fontSize: 24, color: "var(--mmi-red)" }}>{n}</div>
              <div className="dm" style={{ fontSize: 22, fontWeight: 600, color: "var(--mmi-sand)", marginTop: 12, lineHeight: 1.2 }}>{t}</div>
              <div className="dm" style={{ fontSize: 20, fontWeight: 400, color: "rgba(247,245,238,0.65)", marginTop: 10, lineHeight: 1.4 }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ App ============ */
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  return (
    <>
      <deck-stage width="1920" height="1080">
        <SlideCover />
        <SlideAgenda />
        <SlideSectionResults />
        <SlideHeadlineNumber tweaks={tweaks} />
        <SlidePerformanceTable tweaks={tweaks} />
        <SlideFunnel />
        <SlideAudience />
        <SlideSectionForward />
        <SlideBudget tweaks={tweaks} />
        <SlideAsk />
      </deck-stage>
      <TweaksPanel title="Tweaks">
        <TweakSection title="Metrics">
          <TweakRadio
            label="Display values as"
            value={tweaks.metricMode}
            onChange={(v) => setTweak("metricMode", v)}
            options={[
              { value: "absolute", label: "Absolute ($)" },
              { value: "percent", label: "Percent (%)" },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
