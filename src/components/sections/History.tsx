import { useEffect, useRef, useState } from "react"
import { LADDER } from "@/lib/data"
import { registerStage } from "@/lib/scroll"
import { cn } from "@/lib/utils"

const N = LADDER.length
const STOPS = LADDER.map((_, i) => ((i + 0.5) / N).toFixed(3)).join(",")

/** One basin outline of a rond-point: a circle crossed by four allées, like a garden plan's crossing. */
function Basin({ r, on, age }: { r: number; on: boolean; age: number }) {
  const stroke = on ? "var(--color-gilt)" : "var(--color-hedge-mid)"
  const op = on ? 0.95 : 0.5 - age * 0.32
  return (
    <g stroke={stroke} strokeOpacity={op} fill="none">
      <circle r={r} strokeWidth={on ? 1.6 : 1} vectorEffect="non-scaling-stroke" />
      <circle r={r - 7} strokeWidth={0.7} vectorEffect="non-scaling-stroke" strokeDasharray={on ? undefined : "2 5"} />
      {[0, 90, 180, 270].map((a) => (
        <path key={a} d={`M0 ${-r - 10} v14`} transform={`rotate(${a + 45})`} strokeWidth={0.9} vectorEffect="non-scaling-stroke" />
      ))}
    </g>
  )
}

/**
 * The numeric ladder (scroll-web.md): a pinned stage whose year steps
 * 756 → 2025 as the stage scrubs. Behind the year the garden grows outward:
 * every era lays one more basin ring around the crossing, the newest in gilt.
 */
export function History() {
  const stageRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    let current = -1
    return registerStage(el, (p) => {
      const i = Math.min(N - 1, Math.floor(p * N))
      if (i !== current) {
        current = i
        setIndex(i)
      }
    })
  }, [])

  const year = LADDER[index].year
  const head = year.length > 2 ? year.slice(0, year.length - 2) : ""
  const tail = year.slice(-2)

  return (
    <section id="tarix" aria-label="Tarix">
      <div ref={stageRef} data-stop data-stops={STOPS} className="stage h-[640svh]">
        <div className="stage__pin raked">
          <div className="wrap-page flex h-full flex-col pt-16 pb-10 lg:pt-10">
            <div className="flex items-baseline justify-between gap-6">
              <h2 className="engr text-[clamp(1.4rem,2.2vw,2.1rem)] tracking-[0.08em] text-hedge-deep">Papa davlatlaridan Yubileygacha</h2>
              <span className="tnum text-sm text-muted">
                756 → <span className="text-hedge-deep">{year}</span>
              </span>
            </div>

            <div className="grid flex-1 items-center gap-10 py-6 lg:grid-cols-[1fr_1.05fr]">
              <div className="relative grid place-items-center">
                <svg viewBox="-260 -260 520 520" aria-hidden="true" className="absolute size-[min(64vh,40vw)] overflow-visible max-lg:size-[30vh]">
                  <path d="M0 -255 V255 M-255 0 H255" stroke="var(--color-stone)" strokeWidth="1" />
                  {LADDER.map((_, k) => k)
                    .filter((k) => k <= index)
                    .map((k) => (
                      <g
                        key={LADDER[index - k].year}
                        style={{ transform: `scale(${1 + k * 0.27})`, transformBox: "view-box", transformOrigin: "0 0" }}
                        className="transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                      >
                        <Basin r={62} on={k === 0} age={k / Math.max(1, N - 1)} />
                      </g>
                    ))}
                </svg>
                <p className="engr relative text-[clamp(5rem,12vw,10.5rem)] leading-none tracking-[0.02em]" aria-live="polite">
                  <span className="text-hedge-mid/60">{head}</span>
                  <span className="text-hedge-deep">{tail}</span>
                </p>
              </div>

              <ol className="flex flex-col">
                {LADDER.map((s, i) => (
                  <li
                    key={s.year}
                    className={cn(
                      "relative border-t border-stone py-3 transition-[opacity,padding] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] last:border-b",
                      i <= index ? "pl-5 opacity-100" : "opacity-35",
                    )}
                  >
                    {i === index && <span aria-hidden="true" className="absolute top-[1.2rem] left-0 size-2 rotate-45 bg-gilt" />}
                    <div className="flex items-baseline gap-4">
                      <span className="tnum w-12 shrink-0 text-sm text-muted">{s.year}</span>
                      <div>
                        <h3 className="text-[1.15rem] font-medium text-hedge-deep">{s.title}</h3>
                        <p
                          className={cn(
                            "overflow-hidden text-[0.98rem] leading-relaxed text-text transition-[max-height,opacity,margin] duration-700",
                            i === index ? "mt-1.5 max-h-44 opacity-100" : "max-h-0 opacity-0",
                          )}
                        >
                          {s.text}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="h-px w-full bg-stone" aria-hidden="true">
              <div className="h-px bg-gilt" style={{ width: "calc(var(--p) * 100%)" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
