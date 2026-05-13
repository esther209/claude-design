/* global React */
const { useState, useEffect, useRef } = React;

/* ============ Reusable interactive charts (SVG, MMI-styled) ============ */

const COLORS = {
  red: "#FF2243",
  sand: "#F7F5EE",
  black: "#000",
  muted: "rgba(247,245,238,0.55)",
  faint: "rgba(247,245,238,0.18)",
  faintBorder: "rgba(255,255,255,0.2)",
};

/* ------- Tooltip helper ------- */
function Tooltip({ x, y, children, anchor = "top" }) {
  if (x == null) return null;
  return (
    <g style={{ pointerEvents: "none" }}>
      <foreignObject x={x - 110} y={anchor === "top" ? y - 78 : y + 14} width={220} height={62}>
        <div xmlns="http://www.w3.org/1999/xhtml" style={{
          background: "#000",
          border: `1px solid ${COLORS.red}`,
          padding: "8px 12px",
          fontFamily: "var(--font-body)",
          color: COLORS.sand,
          textAlign: "center",
          fontSize: 16,
          lineHeight: 1.3,
        }}>
          {children}
        </div>
      </foreignObject>
    </g>
  );
}

/* ============ 1. Quarterly trend line — hover points ============ */
function TrendLine({ data, height = 220, accent = COLORS.red, ariaLabel }) {
  // data: [{ label, value, note }]
  const [hover, setHover] = useState(null);
  const W = 600, H = height, padL = 40, padR = 20, padT = 36, padB = 44;
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  // tight range so growth is visible
  const yMax = max * 1.08;
  const yMin = Math.max(0, min - (max - min) * 0.4);
  const innerW = W - padL - padR;
  const barW = (innerW / data.length) * 0.62;
  const cellW = innerW / data.length;
  const yScale = (v) => padT + (1 - (v - yMin) / (yMax - yMin)) * (H - padT - padB);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label={ariaLabel}>
      {/* baseline */}
      <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke={COLORS.faintBorder} strokeWidth="1" />
      {data.map((d, i) => {
        const cx = padL + cellW * i + cellW / 2;
        const bx = cx - barW / 2;
        const by = yScale(d.value);
        const bh = (H - padB) - by;
        const isLast = i === data.length - 1;
        const isHover = hover === i;
        return (
          <g key={d.label}
             onMouseEnter={() => setHover(i)}
             onMouseLeave={() => setHover(null)}
             style={{ cursor: "pointer" }}>
            <rect x={bx} y={by} width={barW} height={bh}
              fill={isLast ? accent : (isHover ? accent : COLORS.sand)}
              opacity={isLast ? 1 : (isHover ? 1 : 0.85)} />
            {/* value label on top of bar */}
            <text x={cx} y={by - 8} textAnchor="middle"
              fill={isLast ? accent : COLORS.sand}
              style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16, letterSpacing: "-0.01em" }}>
              ${d.value.toFixed(2)}M
            </text>
            {/* axis label */}
            <text x={cx} y={H - padB + 22} textAnchor="middle"
              fill={isLast ? COLORS.red : COLORS.muted}
              style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 14, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              {d.label}
            </text>
            {isHover && d.note && (
              <Tooltip x={cx} y={by}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{d.tooltip || d.value}</div>
                <div style={{ opacity: 0.7, fontSize: 12, marginTop: 2 }}>{d.note}</div>
              </Tooltip>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ============ 2. Grouped horizontal bars — Plan vs Actual ============ */
function GroupedBars({ rows, height, useAbs = true }) {
  // rows: [{ label, plan, actual, planDisplay, actualDisplay, roas, roasPlan }]
  const [hover, setHover] = useState(null);
  const W = 1240, rowH = 56, gap = 10, padL = 280, padR = 200;
  const H = height || (rows.length * (rowH + gap) + 50);
  const max = Math.max(...rows.map(r => Math.max(r.plan, r.actual))) * 1.05;
  const xScale = (v) => (v / max) * (W - padL - padR);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label="Plan vs actual revenue by channel">
      {/* axis */}
      <line x1={padL} y1={H - 30} x2={W - padR} y2={H - 30} stroke={COLORS.faintBorder} strokeWidth="1" />
      {[0, 0.25, 0.5, 0.75, 1].map(t => (
        <g key={t}>
          <line x1={padL + xScale(max * t)} y1={H - 30} x2={padL + xScale(max * t)} y2={H - 26} stroke={COLORS.faintBorder} />
          <text x={padL + xScale(max * t)} y={H - 10} textAnchor="middle" fill={COLORS.muted}
            style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500 }}>
            ${(max * t).toFixed(2)}M
          </text>
        </g>
      ))}
      {rows.map((r, i) => {
        const yT = i * (rowH + gap) + 4;
        const planW = xScale(r.plan);
        const actW = xScale(r.actual);
        const beat = r.actual >= r.plan;
        const isHover = hover === i;
        return (
          <g key={r.label}
             onMouseEnter={() => setHover(i)}
             onMouseLeave={() => setHover(null)}
             style={{ cursor: "pointer" }}>
            {/* row bg on hover */}
            <rect x={0} y={yT - 4} width={W} height={rowH + 4}
              fill={isHover ? "rgba(255,34,67,0.06)" : "transparent"} />
            {/* label */}
            <text x={padL - 20} y={yT + rowH / 2 + 6} textAnchor="end" fill={COLORS.sand}
              style={{ fontFamily: "var(--font-body)", fontSize: 18, fontWeight: 500 }}>
              {r.label}
            </text>
            {/* plan bar (outline) */}
            <rect x={padL} y={yT + 6} width={planW} height={rowH / 2 - 4}
              fill="none" stroke={COLORS.muted} strokeWidth="1.5" strokeDasharray="3 3" />
            <text x={padL + planW + 8} y={yT + rowH / 2 - 2} fill={COLORS.muted}
              style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500 }}>
              plan
            </text>
            {/* actual bar */}
            <rect x={padL} y={yT + rowH / 2 + 4} width={actW} height={rowH / 2 - 4}
              fill={beat ? COLORS.red : COLORS.muted} opacity={isHover ? 1 : 0.92} />
            <text x={padL + actW + 10} y={yT + rowH - 4} fill={COLORS.sand}
              style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 700 }}>
              {useAbs ? r.actualDisplay : r.actualPct}
            </text>
            {/* ROAS chip on right */}
            <text x={W - padR + 30} y={yT + rowH / 2 + 6} fill={isHover ? COLORS.red : COLORS.sand}
              style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26, letterSpacing: "-0.01em" }}>
              {r.roas}
            </text>
            <text x={W - padR + 30} y={yT + rowH - 4} fill={COLORS.muted}
              style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              roas
            </text>
            {/* tooltip */}
            {isHover && (
              <foreignObject x={padL + actW - 100} y={yT - 60} width={240} height={56}>
                <div xmlns="http://www.w3.org/1999/xhtml" style={{
                  background: "#000", border: `1px solid ${COLORS.red}`, padding: "6px 10px",
                  fontFamily: "var(--font-body)", color: COLORS.sand, fontSize: 14, lineHeight: 1.3
                }}>
                  <div style={{ fontWeight: 700 }}>{r.actualDisplay} actual · {r.planDisplay} plan</div>
                  <div style={{ color: COLORS.red, fontWeight: 600 }}>+{(((r.actual - r.plan) / r.plan) * 100).toFixed(0)}% vs. plan · {r.roas} ROAS</div>
                </div>
              </foreignObject>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ============ 3. Interactive funnel ============ */
function Funnel({ stages }) {
  // stages: [{ name, value, display, deltaPct, isMid }]
  const [active, setActive] = useState(2);
  const W = 940, H = 380, padT = 20, padB = 30, padL = 230, padR = 220;
  // cosmetic widths: linear from 100% to 22% so all stages are visible
  const widthsPct = [1.00, 0.82, 0.62, 0.46, 0.32];
  const stepH = (H - padT - padB) / stages.length;
  const innerW = W - padL - padR;

  return (
    <div style={{ width: "100%" }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label="Conversion funnel">
        {stages.map((s, i) => {
          const w = widthsPct[i] * innerW;
          const x = padL + (innerW - w) / 2;
          const y = padT + i * stepH;
          const isActive = active === i;
          const fill = s.isMid ? COLORS.red : COLORS.sand;
          return (
            <g key={s.name}
               onMouseEnter={() => setActive(i)}
               style={{ cursor: "pointer" }}>
              <rect x={x} y={y} width={w} height={stepH - 8} fill={fill}
                opacity={isActive ? 1 : (s.isMid ? 0.9 : 0.85)} />
              {/* value inside */}
              <text x={x + 16} y={y + (stepH - 8) / 2 + 7} fill={COLORS.black}
                style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, letterSpacing: "-0.01em" }}>
                {s.display}
              </text>
              {/* stage name on left */}
              <text x={padL - 20} y={y + (stepH - 8) / 2 + 6} textAnchor="end" fill={COLORS.muted}
                style={{ fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                {s.name}
              </text>
              {/* delta on right */}
              <text x={W - padR + 20} y={y + (stepH - 8) / 2 + 6} fill={s.isMid ? COLORS.red : COLORS.muted}
                style={{ fontFamily: "var(--font-body)", fontSize: 17, fontWeight: 700 }}>
                {s.deltaPct} QoQ
              </text>
              {/* step conversion when active */}
              {i > 0 && isActive && (() => {
                const prev = stages[i - 1].value;
                const conv = ((s.value / prev) * 100).toFixed(1);
                return (
                  <g>
                    <line x1={padL + innerW + 10} y1={y - stepH / 2 + 6} x2={padL + innerW + 10} y2={y + 6}
                      stroke={COLORS.red} strokeWidth="1.5" strokeDasharray="3 3" />
                    <text x={padL + innerW + 18} y={y - 6} fill={COLORS.red}
                      style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                      {conv}% step
                    </text>
                  </g>
                );
              })()}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ============ 4. Cohort retention curve ============ */
function CohortCurve({ cohort, account, height = 200, ariaLabel }) {
  // cohort & account: arrays of { day, value }
  const [hoverDay, setHoverDay] = useState(null);
  const W = 600, H = height, padL = 40, padR = 30, padT = 20, padB = 40;
  const maxX = Math.max(...cohort.map(d => d.day));
  const maxY = 100;
  const x = (d) => padL + (d / maxX) * (W - padL - padR);
  const y = (v) => padT + (1 - v / maxY) * (H - padT - padB);
  const pathFor = (arr) => arr.map((d, i) => `${i === 0 ? "M" : "L"} ${x(d.day)} ${y(d.value)}`).join(" ");

  const hoverPair = hoverDay != null
    ? { c: cohort.find(d => d.day === hoverDay), a: account.find(d => d.day === hoverDay) }
    : null;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label={ariaLabel}
      onMouseLeave={() => setHoverDay(null)}>
      {/* y grid */}
      {[0, 25, 50, 75, 100].map(v => (
        <g key={v}>
          <line x1={padL} y1={y(v)} x2={W - padR} y2={y(v)} stroke="rgba(0,0,0,0.07)" />
          <text x={padL - 8} y={y(v) + 4} textAnchor="end"
            style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, fill: "rgba(0,0,0,0.45)" }}>
            {v}%
          </text>
        </g>
      ))}
      {/* account line */}
      <path d={pathFor(account)} fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="2" strokeDasharray="4 4" />
      {/* cohort line */}
      <path d={pathFor(cohort)} fill="none" stroke={COLORS.red} strokeWidth="3" />
      {/* x-axis */}
      <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="rgba(0,0,0,0.25)" />
      {[0, 15, 30, 45, 60].map(d => (
        <text key={d} x={x(d)} y={H - padB + 22} textAnchor="middle"
          style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, fill: "rgba(0,0,0,0.55)" }}>
          Day {d}
        </text>
      ))}
      {/* hover hit area */}
      {cohort.map(d => (
        <rect key={d.day} x={x(d.day) - 8} y={padT} width={16} height={H - padT - padB}
          fill="transparent" onMouseEnter={() => setHoverDay(d.day)} style={{ cursor: "crosshair" }} />
      ))}
      {hoverPair && hoverPair.c && (
        <g style={{ pointerEvents: "none" }}>
          <line x1={x(hoverPair.c.day)} y1={padT} x2={x(hoverPair.c.day)} y2={H - padB}
            stroke={COLORS.red} strokeWidth="1" strokeDasharray="3 3" />
          <circle cx={x(hoverPair.c.day)} cy={y(hoverPair.c.value)} r="6" fill={COLORS.red} stroke="#000" strokeWidth="2" />
          <circle cx={x(hoverPair.a.day)} cy={y(hoverPair.a.value)} r="5" fill="rgba(0,0,0,0.6)" stroke="#fff" strokeWidth="2" />
          <foreignObject x={Math.min(x(hoverPair.c.day) - 90, W - 200)} y={Math.max(y(hoverPair.c.value) - 70, 0)} width={180} height={56}>
            <div xmlns="http://www.w3.org/1999/xhtml" style={{
              background: "#000", color: COLORS.sand, border: `1px solid ${COLORS.red}`,
              padding: "6px 10px", fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.3
            }}>
              <div style={{ fontWeight: 700 }}>Day {hoverPair.c.day}</div>
              <div><span style={{ color: COLORS.red, fontWeight: 700 }}>{hoverPair.c.value}%</span> cohort · <span style={{ opacity: 0.6 }}>{hoverPair.a.value}% acct.</span></div>
            </div>
          </foreignObject>
        </g>
      )}
      {/* legend */}
      <g transform={`translate(${W - padR - 200}, ${padT + 4})`}>
        <line x1={0} y1={6} x2={20} y2={6} stroke={COLORS.red} strokeWidth="3" />
        <text x={26} y={10} style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, fill: "#000" }}>35–54 cold-weather</text>
        <line x1={0} y1={24} x2={20} y2={24} stroke="rgba(0,0,0,0.4)" strokeWidth="2" strokeDasharray="4 4" />
        <text x={26} y={28} style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, fill: "rgba(0,0,0,0.6)" }}>Account avg.</text>
      </g>
    </svg>
  );
}

/* ============ 5. Budget shift bar — Q1 → Q2 stacked ============ */
function BudgetShift({ items, useAbs = true }) {
  // items: [{ label, q1, q2, action }]
  const [hover, setHover] = useState(null);
  const W = 1140, H = 200, padL = 40, padR = 40, padT = 80, padB = 40;
  const totalQ1 = items.reduce((s, i) => s + i.q1, 0);
  const totalQ2 = items.reduce((s, i) => s + i.q2, 0);
  const max = Math.max(totalQ1, totalQ2);
  const wScale = (W - padL - padR) / max;

  const colorFor = (a) => a === "scale" ? COLORS.red : a === "cut" ? "rgba(247,245,238,0.35)" : COLORS.sand;

  const renderBar = (yT, label, total, getVal) => {
    let cursorX = padL;
    return (
      <g>
        <text x={padL} y={yT - 14} fill={COLORS.muted}
          style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          {label}
        </text>
        <text x={padL + total * wScale + 12} y={yT + 30} fill={COLORS.sand}
          style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, letterSpacing: "-0.01em" }}>
          ${total.toFixed(2)}M
        </text>
        {items.map((it, i) => {
          const v = getVal(it);
          const w = v * wScale;
          const c = colorFor(it.action);
          const cx = cursorX;
          cursorX += w;
          const isH = hover === i;
          return (
            <g key={it.label + label}
               onMouseEnter={() => setHover(i)}
               onMouseLeave={() => setHover(null)}
               style={{ cursor: "pointer" }}>
              <rect x={cx} y={yT} width={w} height={48} fill={c}
                opacity={hover == null || isH ? 1 : 0.4}
                stroke="#000" strokeWidth="1" />
              {w > 60 && (
                <text x={cx + 10} y={yT + 30} fill={c === COLORS.sand || c === COLORS.red ? "#000" : COLORS.sand}
                  style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 700 }}>
                  {it.label}
                </text>
              )}
            </g>
          );
        })}
      </g>
    );
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label="Q1 to Q2 budget shift">
      {renderBar(padT, "Q1 actual", totalQ1, (i) => i.q1)}
      {renderBar(padT + 70, "Q2 plan", totalQ2, (i) => i.q2)}
      {/* tooltip */}
      {hover != null && (() => {
        const it = items[hover];
        const delta = it.q2 - it.q1;
        const sign = delta > 0 ? "+" : "";
        return (
          <foreignObject x={W / 2 - 130} y={4} width={260} height={56}>
            <div xmlns="http://www.w3.org/1999/xhtml" style={{
              background: "#000", border: `1px solid ${COLORS.red}`, padding: "6px 12px",
              fontFamily: "var(--font-body)", color: COLORS.sand, fontSize: 14, lineHeight: 1.3, textAlign: "center"
            }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{it.label}</div>
              <div>${it.q1.toFixed(2)}M → <span style={{ color: COLORS.red, fontWeight: 700 }}>${it.q2.toFixed(2)}M</span> ({sign}${delta.toFixed(2)}M)</div>
            </div>
          </foreignObject>
        );
      })()}
    </svg>
  );
}

Object.assign(window, { TrendLine, GroupedBars, Funnel, CohortCurve, BudgetShift });
