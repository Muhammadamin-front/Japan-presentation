import { useEffect, useRef, useState } from "react"
import { EraBars, TableView } from "@/components/charts"
import { WordRise } from "@/components/ui/word-rise"
import { ERAS, LADDER } from "@/lib/data"
import { registerStage } from "@/lib/scroll"
import { cn, delay } from "@/lib/utils"

const N = LADDER.length
const STOPS = LADDER.map((_, i) => ((i + 0.5) / N).toFixed(3)).join(",")

/**
 * The numeric ladder (scroll-web.md): a pinned stage whose year steps
 * 1945 → 2024 as the stage scrubs. Behind the year, every era is a drop:
 * each new one pushes the earlier rings outward (area-preserving), and the
 * newest is always the darkest.
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
  // Equal-area drops: ring k (0 = newest) has outer radius √(k+1)·r0.
  const rings = LADDER.map((_, k) => k).filter((k) => k <= index)

  return (
    <section id="tarix" aria-label="Tarix">
      <div ref={stageRef} data-stop data-stops={STOPS} className="stage h-[560svh]">
        <div className="stage__pin bg-paper">
          <div className="wrap-page flex h-full flex-col pt-16 pb-10 lg:pt-10">
            <div className="flex items-baseline justify-between gap-6">
              <h2 className="text-[clamp(1.6rem,2.4vw,2.3rem)] font-light text-depth">Vayronadan mo‘jizagacha</h2>
              <span className="tnum text-sm text-dilute">
                1945 → <span className="text-depth">{year}</span>
              </span>
            </div>

            <div className="grid flex-1 items-center gap-10 py-6 lg:grid-cols-[1.05fr_1fr]">
              <div className="relative grid place-items-center">
                <svg viewBox="-260 -260 520 520" aria-hidden="true" className="absolute size-[min(66vh,42vw)] overflow-visible max-lg:size-[30vh]">
                  <defs>
                    {/* Ink on water never draws a perfect circle: a low-frequency wobble and a feathered edge */}
                    <filter id="ink-edge" x="-20%" y="-20%" width="140%" height="140%">
                      <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="4" />
                      <feDisplacementMap in="SourceGraphic" scale="9" xChannelSelector="R" yChannelSelector="G" />
                      <feGaussianBlur stdDeviation="0.6" />
                    </filter>
                    {/* The newest drop: dye that is densest at the centre and feathers out, no drawn edge */}
                    <radialGradient id="now-drop">
                      <stop offset="0" stopColor="var(--color-ink)" stopOpacity="0.26" />
                      <stop offset="0.55" stopColor="var(--color-ink)" stopOpacity="0.16" />
                      <stop offset="0.85" stopColor="var(--color-ink)" stopOpacity="0.07" />
                      <stop offset="1" stopColor="var(--color-ink)" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <g filter="url(#ink-edge)">
                    {rings
                      .slice()
                      .reverse()
                      .map((k) => {
                        const age = k / Math.max(1, N - 1)
                        const s = Math.sqrt(k + 1)
                        return (
                          <g
                            key={LADDER[index - k].year}
                            style={{ transform: `scale(${s})`, transformBox: "view-box", transformOrigin: "0 0" }}
                            className="transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                          >
                            {/* Each era: a band of hairlines, thinning to gray as it ages */}
                            {[0, 0.94, 0.86].map((f, j) => (
                              <circle
                                key={j}
                                r={k === 0 && j === 0 ? 104 : 96 * (f || 1)}
                                fill={k === 0 && j === 0 ? "url(#now-drop)" : "none"}
                                stroke={k === 0 && j === 0 ? "none" : k === 0 ? "var(--color-ink)" : "var(--color-dilute)"}
                                strokeOpacity={(k === 0 ? 0.7 : 0.55 - age * 0.35) * (j === 0 ? 1 : 0.5)}
                                strokeWidth={j === 0 ? 1.4 : 0.8}
                                vectorEffect="non-scaling-stroke"
                              />
                            ))}
                          </g>
                        )
                      })}
                  </g>
                </svg>
                <p className="num relative text-[clamp(6rem,14vw,12.5rem)] leading-none font-[200] tracking-[-0.045em]" aria-live="polite">
                  <span className="text-dilute">{year.slice(0, 2)}</span>
                  <span className="text-depth">{year.slice(2)}</span>
                </p>
              </div>

              <ol className="flex flex-col">
                {LADDER.map((s, i) => (
                  <li
                    key={s.year}
                    className={cn(
                      "relative border-t border-mist py-3.5 transition-[opacity,padding] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] last:border-b",
                      i <= index ? "pl-4 opacity-100" : "opacity-30",
                    )}
                  >
                    {i === index && <span aria-hidden="true" className="absolute top-[1.35rem] left-0 size-1.5 rounded-full bg-seal" />}
                    <div className="flex items-baseline gap-4">
                      <span className="tnum w-12 shrink-0 text-sm text-dilute">{s.year}</span>
                      <div>
                        <h3 className="text-[1.15rem] font-normal text-depth">{s.title}</h3>
                        <p
                          className={cn(
                            "overflow-hidden text-[0.95rem] leading-relaxed text-dilute transition-[max-height,opacity,margin] duration-700",
                            i === index ? "mt-1.5 max-h-40 opacity-100" : "max-h-0 opacity-0",
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

            <div className="h-[2px] w-full bg-mist" aria-hidden="true">
              <div className="h-full bg-ink" style={{ width: "calc(var(--p) * 100%)" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Three eras of growth, with Uzbekistan as the audience's own yardstick */}
      <div data-stop className="slide bg-paper py-20">
        <div className="wrap-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <WordRise as="h2" className="section-title text-depth" text="Uch davr, uch sur’at" />
            <p className="lede mt-8" data-rev style={delay(120)}>
              Real YaIMning o‘rtacha yillik o‘sishi. «Mo‘jiza» yillarida iqtisodiyot har 8 yilda ikki barobar kattalashgan; 1991-yildan keyin esa deyarli joyida
              turdi.
            </p>
            <p className="mt-6 max-w-[40ch] text-[0.95rem] leading-relaxed text-depth" data-rev style={delay(220)}>
              <span className="mr-2 inline-block size-2 rounded-full bg-seal align-middle" aria-hidden="true" />
              Taqqoslash uchun: O‘zbekiston iqtisodiyoti 2024-yilda 6,5% o‘sdi.
            </p>
          </div>
          <figure>
            <EraBars data={ERAS} reference={{ value: 6.5, label: "O‘zbekiston, 2024: 6,5%" }} />
            <figcaption className="note mt-2">Manba: Yaponiya Kabinet idorasi, milliy hisoblar · ~ taxminiy</figcaption>
            <TableView
              caption="Real YaIM o‘sishi, davrlar bo‘yicha"
              head={["Davr", "Nomi", "O‘rtacha o‘sish"]}
              rows={ERAS.map((e) => [e.period, e.name, `${e.approx ? "~" : ""}${e.value.toLocaleString("ru-RU")}%`])}
            />
          </figure>
        </div>
      </div>
    </section>
  )
}
