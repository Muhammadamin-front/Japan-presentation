import { useEffect, useRef, useState } from "react"
import { Inscribed } from "@/components/Inscribed"
import { MarbleBand } from "@/components/MarbleBand"
import { Card } from "@/components/ui/card"
import { CountNumber } from "@/components/ui/count-number"
import { SonarGrid } from "@/components/ui/sonar-grid"
import { SplineScene } from "@/components/ui/splite"
import { Spotlight } from "@/components/ui/spotlight"
import { WordRise } from "@/components/ui/word-rise"
import { ROBOT_CHAIN, ROBOT_STATS, ROBOT_TIMELINE, ROBOT_WHY } from "@/lib/data"
import { delay } from "@/lib/utils"

/** Mount the Spline scene only when the card is close, so the 3D download never delays the hero. */
function useNear<T extends HTMLElement>(margin = "900px") {
  const ref = useRef<T>(null)
  const [near, setNear] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: margin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [margin])
  return { ref, near }
}

/** SplineSceneBasic from robot.md, carrying the robot section's copy. */
function RobotCard() {
  const { ref, near } = useNear<HTMLDivElement>()
  return (
    <Card ref={ref} className="relative h-[calc(100svh-6rem)] min-h-[480px] w-full overflow-hidden rounded-2xl border-white/10 bg-sumi text-paper shadow-none">
      <Spotlight className="-top-40 left-0 from-mist/40 via-feather/20 to-transparent md:-top-20 md:left-60" size={380} />

      <div className="flex h-full max-md:flex-col">
        <div className="relative z-10 flex flex-1 flex-col justify-center p-8 md:p-12">
          <h3 className="text-[clamp(2rem,3.4vw,3.2rem)] leading-[1.05] font-light text-paper">Inson bilan yonma-yon</h3>
          <p className="mt-5 max-w-[44ch] leading-relaxed text-mist">
            Yapon zavodida robot ishchini quvib chiqarmaydi: og‘ir, xavfli va bir xil ishni u oladi, inson esa nazorat qiladi va jarayonni takomillashtiradi.
          </p>
        </div>

        <div className="relative flex-1">
          {near ? (
            <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="h-full w-full" />
          ) : (
            <div className="grid h-full place-items-center">
              <span className="loader" />
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

export function Robots() {
  return (
    <section id="robotlar" aria-label="Robotlar mamlakati" className="bg-depth text-paper">
      <MarbleBand />
      <div data-stop className="slide wrap-page py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <Inscribed jp="ロボット大国" tone="text-feather">
            <WordRise as="h2" className="text-[clamp(3rem,7vw,6rem)] leading-[0.98] font-[250] tracking-[-0.03em] text-paper" text="Robotlar mamlakati" />
          </Inscribed>
          <p className="lede !text-mist" data-rev style={delay(120)}>
            Yaponiya robotni o‘yinchoq emas, iqtisodiy zarurat deb biladi: ishchi qo‘llar kamaymoqda, robotlar esa bu bo‘shliqni to‘ldirmoqda.
          </p>
        </div>
      </div>
      <div data-stop className="slide wrap-page py-12">
        <div data-rev>
          <RobotCard />
        </div>
      </div>

      <div data-stop>
        <SonarGrid color="#aeb6c2" baseOpacity={0.16} spacing={28} pingEvery={2.6} ringWidth={110} className="slide py-20">
          <div className="wrap-page">
            <WordRise as="h2" className="text-[clamp(2rem,3.6vw,3.4rem)] leading-tight font-light text-paper" text="Robotlar raqamlarda" />
            <dl className="mt-14 grid gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
              {ROBOT_STATS.map((s, i) => (
                <div key={s.label} className="border-l border-white/15 pr-6 pl-6" data-rev style={delay(90 * i)}>
                  <dd className="order-first text-[clamp(2.6rem,4vw,3.8rem)] leading-none font-light text-paper">
                    <CountNumber value={s.value} suffix={s.suffix} />
                  </dd>
                  <dt className="mt-4 leading-snug text-mist">{s.label}</dt>
                  <dd className="note mt-2 !text-feather">{s.note}</dd>
                </div>
              ))}
            </dl>
            <p className="note mt-12 !text-feather">Manba: IFR World Robotics 2025 (2024-yil ma’lumotlari)</p>
          </div>
        </SonarGrid>
      </div>

      <div data-stop className="slide wrap-page py-20">
        <WordRise as="h2" className="text-[clamp(2rem,3.6vw,3.4rem)] leading-tight font-light text-paper" text="Yarim asrlik yo‘l" />
        <ol className="relative mt-16 grid gap-10 md:grid-cols-6 md:gap-6" data-rev>
          <svg aria-hidden="true" className="absolute top-[3.1rem] left-0 hidden h-2 w-full overflow-visible md:block" viewBox="0 0 100 2" preserveAspectRatio="none">
            <path className="draw" pathLength={1} d="M0 1 H100" stroke="#606d80" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="none" />
          </svg>
          {ROBOT_TIMELINE.map((t, i) => (
            <li key={t.year} className="relative" style={delay(120 * i)}>
              <span className="tnum block text-2xl font-light text-paper">{t.year}</span>
              <span className={`relative mt-3 mb-5 block size-3.5 rounded-full border-2 border-depth ${i === ROBOT_TIMELINE.length - 1 ? "bg-seal" : "bg-feather"}`} />
              <h3 className="text-[1.05rem] font-normal text-paper">{t.name}</h3>
              <p className="mt-1.5 text-[0.92rem] leading-relaxed text-feather">{t.text}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="bg-sumi">
        <div data-stop className="slide wrap-page py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
            <WordRise as="h2" className="section-title text-paper" text="Nega robot — iqtisodiy zarurat?" />
            <p className="lede !text-mist" data-rev style={delay(120)}>
              Zanjirni chapdan o‘ngga o‘qing: demografiya muammosi robot orqali unumdorlik va eksportga aylanadi.
            </p>
          </div>

          <ol className="mt-16 grid gap-10 md:grid-cols-5 md:gap-0" data-rev>
            {ROBOT_CHAIN.map((c, i) => (
              <li key={c.title} className="relative md:pr-8" style={delay(160 * i)}>
                {i < ROBOT_CHAIN.length - 1 && (
                  <svg aria-hidden="true" viewBox="0 0 100 12" preserveAspectRatio="none" className="absolute top-[1.35rem] left-14 hidden h-3 w-[calc(100%-4.5rem)] overflow-visible md:block">
                    <path className="draw" pathLength={1} d="M0 6 H96" stroke="#606d80" strokeWidth="1.2" vectorEffect="non-scaling-stroke" fill="none" style={{ transitionDelay: `${i * 260 + 300}ms` }} />
                    <path className="draw" pathLength={1} d="M92 1 L100 6 L92 11" stroke="#aeb6c2" strokeWidth="1.2" vectorEffect="non-scaling-stroke" fill="none" style={{ transitionDelay: `${i * 260 + 900}ms` }} />
                  </svg>
                )}
                <span className="grid size-11 place-items-center rounded-full border border-feather/60">
                  <span className="size-3 rounded-full bg-paper" style={{ opacity: 0.35 + i * 0.16 }} />
                </span>
                <p className="mt-6 text-[clamp(2rem,2.8vw,2.7rem)] leading-none font-light text-paper">{c.figure}</p>
                <h3 className="mt-4 text-[1.1rem] font-normal text-paper">{c.title}</h3>
                <p className="mt-1.5 text-[0.92rem] leading-relaxed text-feather">{c.note}</p>
              </li>
            ))}
          </ol>
        </div>

        <div data-stop className="slide wrap-page py-20">
          <WordRise as="h2" className="text-[clamp(2rem,3.6vw,3.4rem)] leading-tight font-light text-paper" text="Robot Yaponiyaga nima beradi?" />
          <div className="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2">
            {ROBOT_WHY.map((w, i) => (
              <div key={w.title} className="flex gap-5" data-rev style={delay(80 * i)}>
                <span aria-hidden="true" className="mt-2 size-2.5 shrink-0 rounded-full border border-feather" />
                <div>
                  <h3 className="text-[1.3rem] font-light text-paper">{w.title}</h3>
                  <p className="mt-2 max-w-[48ch] leading-relaxed text-mist">{w.text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="note mt-12 !text-feather">Manbalar: IFR World Robotics 2025; JARA 2025; Recruit Works Institute (2023); Statistika byurosi (2026).</p>
        </div>
      </div>
    </section>
  )
}
