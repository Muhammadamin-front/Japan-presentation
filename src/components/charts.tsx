/**
 * Charts drawn in the garden plan's own grammar (dataviz method: one hue per
 * series, the focus in the darkest hedge, the rest in leaf and stone; direct
 * labels; hover/focus tooltips; a table view for every chart).
 */

import { Plus } from "lucide-react"
import { useState, type ReactNode } from "react"
import { cn, fmt } from "@/lib/utils"

function Tip({ x, y, children }: { x: string; y: string; children: ReactNode }) {
  return (
    <div
      role="status"
      className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+14px)] bg-hedge px-3.5 py-2 text-sm whitespace-nowrap text-spray shadow-[0_10px_24px_-12px_rgba(19,38,26,0.6)]"
      style={{ left: x, top: y }}
    >
      {children}
    </div>
  )
}

export function TableView({ caption, head, rows, dark = false }: { caption: string; head: string[]; rows: (string | number)[][]; dark?: boolean }) {
  return (
    <details className={cn("group mt-6 text-sm", dark ? "text-leaf" : "text-muted")}>
      <summary
        className={cn(
          "inline-flex cursor-pointer list-none items-center gap-2 border px-3.5 py-1.5 transition-colors",
          dark ? "border-gilt-light/40 hover:border-gilt-light hover:text-spray" : "border-stone hover:border-hedge hover:text-hedge-deep",
        )}
      >
        <Plus aria-hidden="true" className="size-3.5 transition-transform group-open:rotate-45" strokeWidth={1.8} /> Jadval ko‘rinishi
      </summary>
      <table className="mt-4 w-full max-w-xl border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className={cn("border-b", dark ? "border-gilt-light/30" : "border-stone")}>
            {head.map((h) => (
              <th key={h} className={cn("py-2 pr-4 font-medium", dark ? "text-spray" : "text-hedge-deep")}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={cn("border-b", dark ? "border-gilt-light/15" : "border-stone/60")}>
              {r.map((c, j) => (
                <td key={j} className={cn("tnum py-2 pr-4", j === 0 && (dark ? "text-spray" : "text-hedge-deep"))}>
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

/* ── Revenue as one allée split into beds ─────────────────────────── */

const BEDS = ["var(--color-hedge)", "var(--color-hedge-mid)", "var(--color-water)"]

export function RevenueAllee({ total, data }: { total: number; data: { label: string; value: number; note: string }[] }) {
  const [hover, setHover] = useState<number | null>(null)
  let acc = 0
  return (
    <div className="relative" data-rev>
      <div className="flex h-20 w-full gap-[3px] border-y-4 border-double border-gilt py-1" role="img" aria-label="Muqaddas Taxt daromadi tarkibi, foiz">
        {data.map((d, i) => (
          <div
            key={d.label}
            tabIndex={0}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            className="hbar relative h-full outline-none"
            style={{ width: `${d.value}%`, background: BEDS[i], transitionDelay: `${i * 220}ms`, opacity: hover === null || hover === i ? 1 : 0.7 }}
          >
            <span className="absolute inset-0 grid place-items-center text-[clamp(1.4rem,2.4vw,2.2rem)] font-medium text-spray">{d.value}%</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex w-full gap-[3px]">
        {data.map((d, i) => {
          acc += d.value
          return (
            <div key={d.label} style={{ width: `${d.value}%` }} className="min-w-0 pr-3">
              <p className="font-medium text-hedge-deep">{d.label}</p>
              <p className="note">{d.note}</p>
              <p className="sr-only">
                {fmt((total * d.value) / 100)} mln €, jami {acc}%
              </p>
            </div>
          )
        })}
      </div>
      {hover !== null && (
        <Tip x={`${data.slice(0, hover).reduce((s, d) => s + d.value, 0) + data[hover].value / 2}%`} y="0%">
          {data[hover].label}: ~{fmt((total * data[hover].value) / 100)} mln €
        </Tip>
      )}
      <TableView
        caption="Daromad tarkibi, 2024"
        head={["Manba", "Ulush", "~mln €"]}
        rows={data.map((d) => [d.label, `${d.value}%`, fmt((total * d.value) / 100)])}
      />
    </div>
  )
}

/* ── Deficit: two years, operating vs final, around a zero axis ─── */

export function DeficitChart({ data }: { data: { year: string; operating: number; result: number }[] }) {
  const [hover, setHover] = useState<string | null>(null)
  const W = 900
  const zero = 70
  const k = 2.6
  const bw = 120
  const groups = data.map((d, i) => ({ ...d, cx: 220 + i * 420 }))
  const bar = (v: number, x: number, fill: string, key: string, label: string) => {
    const h = Math.max(3, Math.abs(v) * k)
    const y = v < 0 ? zero : zero - h
    return (
      <g
        key={key}
        tabIndex={0}
        role="img"
        aria-label={label}
        onMouseEnter={() => setHover(label)}
        onMouseLeave={() => setHover(null)}
        onFocus={() => setHover(label)}
        onBlur={() => setHover(null)}
        className="outline-none"
      >
        <rect className={cn("bar", v < 0 && "bar--down")} x={x - bw / 2} y={y} width={bw} height={h} fill={fill} />
        <text x={x} y={v < 0 ? zero + h + 34 : zero - h - 12} textAnchor="middle" className="fill-hedge-deep text-[28px] font-medium">
          {v > 0 ? "+" : "−"}
          {fmt(Math.abs(v), Math.abs(v) % 1 ? 1 : 0)}
        </text>
      </g>
    )
  }
  return (
    <div className="relative" data-rev>
      <svg viewBox={`0 0 ${W} 400`} className="w-full overflow-visible" role="img" aria-label="Muqaddas Taxt kamomadi, mln yevro">
        <line x1="0" x2={W} y1={zero} y2={zero} stroke="var(--color-gilt)" strokeWidth="1.5" />
        <text x="0" y={zero - 10} className="fill-muted text-[20px]">
          0
        </text>
        {groups.map((g) => (
          <g key={g.year}>
            {bar(g.operating, g.cx - 70, "var(--color-water)", "op", `${g.year}, operatsion natija: ${fmt(g.operating)} mln €`)}
            {bar(g.result, g.cx + 70, "var(--color-hedge)", "res", `${g.year}, yakuniy natija: ${fmt(g.result, 1)} mln €`)}
            <text x={g.cx} y={392} textAnchor="middle" className="engr fill-hedge-deep text-[30px]">
              {g.year}
            </text>
          </g>
        ))}
      </svg>
      <div className="mt-2 flex flex-wrap gap-6 text-sm text-text">
        <span className="flex items-center gap-2">
          <span className="size-3 bg-water" /> Operatsion natija
        </span>
        <span className="flex items-center gap-2">
          <span className="size-3 bg-hedge" /> Yakuniy natija (investitsiyalardan keyin)
        </span>
      </div>
      {hover && (
        <Tip x="50%" y="0%">
          {hover}
        </Tip>
      )}
      <TableView
        caption="Muqaddas Taxt natijasi, mln €"
        head={["Yil", "Operatsion", "Yakuniy"]}
        rows={data.map((d) => [d.year, fmt(d.operating), fmt(d.result, 1)])}
      />
    </div>
  )
}
