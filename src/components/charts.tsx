/**
 * Charts drawn in the ink world's own grammar (dataviz method: one hue for one
 * series, the focus entity in the darkest ink, the rest in dilute ink; direct
 * labels; hover/focus tooltips; a table view for every chart).
 */

import { useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

const fmt = (v: number, d = 1) => v.toLocaleString("ru-RU", { minimumFractionDigits: d, maximumFractionDigits: d })

function Tip({ x, y, children }: { x: string; y: string; children: ReactNode }) {
  return (
    <div
      role="status"
      className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+14px)] rounded-lg bg-depth px-3.5 py-2 text-sm whitespace-nowrap text-paper shadow-[0_10px_24px_-12px_rgba(10,26,51,0.6)]"
      style={{ left: x, top: y }}
    >
      {children}
    </div>
  )
}

export function TableView({ caption, head, rows }: { caption: string; head: string[]; rows: (string | number)[][] }) {
  return (
    <details className="group mt-6 text-sm text-dilute">
      <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-full border border-mist px-3.5 py-1.5 transition-colors hover:border-feather hover:text-depth">
        <span className="transition-transform group-open:rotate-45">+</span> Jadval ko‘rinishi
      </summary>
      <table className="mt-4 w-full max-w-lg border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-mist">
            {head.map((h) => (
              <th key={h} className="py-2 pr-4 font-medium text-depth">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-mist/70">
              {r.map((c, j) => (
                <td key={j} className={cn("tnum py-2 pr-4", j === 0 && "text-depth")}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  )
}

/* ── GDP as flag drops: area ∝ value ────────────────────────────── */

export function InkDrops({ data }: { data: { country: string; code: string; value: number; focus?: boolean }[] }) {
  const [hover, setHover] = useState<number | null>(null)
  const W = 1200
  const R = 150
  const gap = 34
  const max = Math.max(...data.map((d) => d.value))
  const radii = data.map((d) => R * Math.sqrt(d.value / max))
  const total = radii.reduce((s, r) => s + 2 * r, 0) + gap * (data.length - 1)
  let x = (W - total) / 2
  const cy = R + 16
  const pos = radii.map((r) => {
    const c = x + r
    x += 2 * r + gap
    return c
  })
  const labelY = cy + R + 44
  const H = labelY + 40

  return (
    <div className="relative" data-rev>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full overflow-visible" role="img" aria-label="Davlatlar YaIMi, trillion dollar; bayroq doirasining maydoni YaIMga mutanosib">
        {data.map((d, i) => {
          const r = radii[i]
          return (
            <g
              key={d.country}
              tabIndex={0}
              role="img"
              aria-label={`${d.country}: ${fmt(d.value, 2)} trillion dollar`}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              className="cursor-default outline-none"
            >
              <circle cx={pos[i]} cy={cy} r={Math.max(r, 24) + 10} fill="transparent" />
              <circle className="ripple" cx={pos[i]} cy={cy} r={r} fill="none" stroke={d.focus ? "var(--color-depth)" : "var(--color-dilute)"} strokeWidth="1" style={{ animationDelay: `${i * 140 + 200}ms` }} />
              <g className="drop" style={{ transitionDelay: `${i * 140}ms` }}>
                <image href={`/flags/${d.code}.svg`} x={pos[i] - r} y={cy - r} width={2 * r} height={2 * r} preserveAspectRatio="xMidYMid slice" />
                <circle cx={pos[i]} cy={cy} r={r - 0.5} fill="none" stroke="var(--color-feather)" strokeOpacity="0.8" strokeWidth="1" />
              </g>
              {d.focus && <circle cx={pos[i]} cy={cy} r={r + 9} fill="none" stroke="var(--color-depth)" strokeWidth="2.5" />}
              {hover === i && !d.focus && <circle cx={pos[i]} cy={cy} r={r + 7} fill="none" stroke="var(--color-dilute)" strokeWidth="1.5" />}
              <text x={pos[i]} y={labelY} textAnchor="middle" className={cn("text-[19px]", d.focus ? "fill-depth font-medium" : "fill-dilute")}>
                {d.country}
              </text>
              <text x={pos[i]} y={labelY + 26} textAnchor="middle" className={cn("tnum text-[17px]", d.focus ? "fill-depth" : "fill-dilute")}>
                {fmt(d.value, d.value < 10 ? 2 : 1)}
              </text>
            </g>
          )
        })}
      </svg>
      {hover !== null && (
        <Tip x={`${(pos[hover] / W) * 100}%`} y="0%">
          <span className="font-medium">{data[hover].country}</span> — {fmt(data[hover].value, 2)} trln $ · 2025
        </Tip>
      )}
    </div>
  )
}

/* ── Growth by era: ink columns ─────────────────────────────────── */

export function EraBars({
  data,
  reference,
}: {
  data: { period: string; name: string; value: number; approx?: boolean }[]
  reference?: { value: number; label: string }
}) {
  const [hover, setHover] = useState<number | null>(null)
  const W = 900
  const top = 70
  const plotH = 360
  const base = top + plotH
  const max = 10
  const bw = 150
  const slot = W / data.length
  const y = (v: number) => base - (v / max) * plotH

  return (
    <div className="relative" data-rev>
      <svg viewBox={`0 0 ${W} ${base + 104}`} className="w-full overflow-visible" role="img" aria-label="Real YaIM o‘rtacha yillik o‘sishi, davrlar bo‘yicha">
        {[0, 5, 10].map((t) => (
          <g key={t}>
            <line x1="0" x2={W} y1={y(t)} y2={y(t)} stroke="var(--color-mist)" strokeWidth="1" />
            <text x="0" y={y(t) - 8} className="tnum fill-dilute text-[22px]">
              {t}%
            </text>
          </g>
        ))}
        {reference && (
          <g>
            <line x1="0" x2={W} y1={y(reference.value)} y2={y(reference.value)} stroke="var(--color-seal)" strokeWidth="1.5" />
            <text x={W} y={y(reference.value) - 10} textAnchor="end" className="fill-seal text-[22px]">
              {reference.label}
            </text>
          </g>
        )}
        {data.map((d, i) => {
          const cx = slot * i + slot / 2
          const h = (d.value / max) * plotH
          return (
            <g
              key={d.period}
              tabIndex={0}
              role="img"
              aria-label={`${d.period}, ${d.name}: ${fmt(d.value)}%`}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              className="outline-none"
            >
              <rect x={cx - bw / 2 - 20} y={top - 40} width={bw + 40} height={plotH + 40} fill="transparent" />
              <path
                className="bar"
                style={{ transitionDelay: `${i * 160}ms` }}
                d={`M${cx - bw / 2} ${base} V${base - h + 4} Q${cx - bw / 2} ${base - h} ${cx - bw / 2 + 4} ${base - h} H${cx + bw / 2 - 4} Q${cx + bw / 2} ${base - h} ${cx + bw / 2} ${base - h + 4} V${base} Z`}
                fill={hover === i ? "var(--color-depth)" : "var(--color-ink)"}
              />
              <text x={cx} y={base - h - 16} textAnchor="middle" className="fill-depth text-[44px] font-light">
                {d.approx ? "~" : ""}
                {fmt(d.value)}%
              </text>
              <text x={cx} y={base + 44} textAnchor="middle" className="tnum fill-depth text-[26px]">
                {d.period}
              </text>
              <text x={cx} y={base + 80} textAnchor="middle" className="fill-dilute text-[22px]">
                {d.name}
              </text>
            </g>
          )
        })}
        <line x1="0" x2={W} y1={base} y2={base} stroke="var(--color-feather)" strokeWidth="1" />
      </svg>
      {hover !== null && (
        <Tip x={`${((slot * hover + slot / 2) / W) * 100}%`} y="0%">
          {data[hover].period}: yiliga o‘rtacha {data[hover].approx ? "~" : ""}
          {fmt(data[hover].value)}% real o‘sish
        </Tip>
      )}
    </div>
  )
}

/* ── Aging: share of 65+ over time, actual vs projected ─────────── */

export function AgingLine({ data }: { data: { year: number; value: number; projected?: boolean }[] }) {
  const [hover, setHover] = useState<number | null>(null)
  const W = 900
  const H = 450
  const L = 58
  const Rr = 30
  const T = 30
  const B = 360
  const x0 = data[0].year
  const x1 = data[data.length - 1].year
  const x = (yr: number) => L + ((yr - x0) / (x1 - x0)) * (W - L - Rr)
  const y = (v: number) => B - (v / 40) * (B - T)
  const actual = data.filter((d) => !d.projected)
  const lastActual = actual[actual.length - 1]
  const proj = [lastActual, ...data.filter((d) => d.projected)]
  const line = (pts: typeof data) => pts.map((d, i) => `${i ? "L" : "M"}${x(d.year).toFixed(1)} ${y(d.value).toFixed(1)}`).join(" ")
  const area = `${line(actual)} L${x(lastActual.year)} ${B} L${x(x0)} ${B} Z`

  return (
    <div className="relative" data-rev>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full overflow-visible" role="img" aria-label="Yaponiyada 65 va undan katta yoshdagilar ulushi, foiz">
        {[0, 10, 20, 30, 40].map((t) => (
          <g key={t}>
            <line x1={L} x2={W - Rr} y1={y(t)} y2={y(t)} stroke="var(--color-mist)" />
            <text x={L - 12} y={y(t) + 5} textAnchor="end" className="tnum fill-dilute text-[20px]">
              {t}%
            </text>
          </g>
        ))}
        <path d={area} fill="var(--color-ink)" opacity="0.08" />
        <path className="draw" d={line(actual)} fill="none" stroke="var(--color-ink)" strokeWidth="2.5" pathLength={1} />
        <path d={line(proj)} fill="none" stroke="var(--color-feather)" strokeWidth="2.5" strokeDasharray="2 7" strokeLinecap="round" />
        {data.map((d, i) => (
          <g
            key={d.year}
            tabIndex={0}
            role="img"
            aria-label={`${d.year}: ${fmt(d.value)}%${d.projected ? " (prognoz)" : ""}`}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            className="outline-none"
          >
            <rect x={x(d.year) - 24} y={T} width="48" height={B - T + 46} fill="transparent" />
            {hover === i && <line x1={x(d.year)} x2={x(d.year)} y1={T} y2={B} stroke="var(--color-feather)" />}
            <circle
              cx={x(d.year)}
              cy={y(d.value)}
              r={d.year === lastActual.year ? 7 : 5}
              fill={d.projected ? "var(--color-paper)" : d.year === lastActual.year ? "var(--color-seal)" : "var(--color-ink)"}
              stroke={d.projected ? "var(--color-feather)" : "var(--color-paper)"}
              strokeWidth="2"
            />
            <text x={x(d.year)} y={B + 40} textAnchor="middle" className={cn("tnum text-[21px]", d.projected ? "fill-dilute" : "fill-depth")}>
              {d.year}
            </text>
          </g>
        ))}
        {[data[0], lastActual, data[data.length - 1]].map((d) => (
          <text key={d.year} x={x(d.year)} y={y(d.value) - 18} textAnchor={d === data[0] ? "start" : d === data[data.length - 1] ? "end" : "middle"} className={cn("text-[26px]", d === lastActual ? "fill-depth font-medium" : "fill-dilute")}>
            {fmt(d.value)}%{d.projected ? " (prognoz)" : ""}
          </text>
        ))}
      </svg>
      {hover !== null && (
        <Tip x={`${(x(data[hover].year) / W) * 100}%`} y={`${(y(data[hover].value) / H) * 100}%`}>
          {data[hover].year}: {fmt(data[hover].value)}% aholi 65+ {data[hover].projected ? "· prognoz" : ""}
        </Tip>
      )}
    </div>
  )
}

/* ── Debt / GDP: horizontal ink bars, Japan in the darkest ink ──── */

export function DebtBars({ data }: { data: { country: string; code: string; value: number; focus?: boolean }[] }) {
  const max = 250
  return (
    <div data-rev>
      <ul className="relative flex flex-col gap-2.5" aria-label="Davlat qarzi, YaIMga nisbatan foiz">
        <span aria-hidden="true" className="absolute inset-y-0 border-l border-seal" style={{ left: `calc(10.5rem + (100% - 10.5rem - 4.5rem) * ${100 / max})` }}>
          <span className="absolute -top-6 left-1.5 text-xs whitespace-nowrap text-seal">100% = YaIMga teng</span>
        </span>
        {data.map((d, i) => (
          <li key={d.country} className="grid grid-cols-[10.5rem_1fr_4.5rem] items-center gap-0">
            <span className={cn("flex items-center justify-end gap-2.5 pr-4 text-right text-[0.95rem]", d.focus ? "font-medium text-depth" : "text-dilute")}>
              {d.country}
              <img src={`/flags/${d.code}.svg`} alt="" width={20} height={20} className="size-5 shrink-0 rounded-full ring-1 ring-mist" />
            </span>
            <span className="h-7">
              <span
                className="hbar block h-full rounded-r-[4px]"
                style={{ width: `${(d.value / max) * 100}%`, background: d.focus ? "var(--color-depth)" : "var(--color-feather)", transitionDelay: `${i * 90}ms` }}
              />
            </span>
            <span className={cn("tnum pl-3 text-[0.95rem]", d.focus ? "font-medium text-depth" : "text-dilute")}>~{d.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
