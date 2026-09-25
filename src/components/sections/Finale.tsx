import { useEffect, useRef, useState } from "react"
import { MeshGradient, PulsingBorder } from "@paper-design/shaders-react"
import { Seal } from "@/components/Seal"
import { SplashButton } from "@/components/ui/splash-button"
import { TextRoll } from "@/components/ui/text-roll"
import { WordRise } from "@/components/ui/word-rise"
import { CONCLUSIONS, PRESENTER, SOURCES } from "@/lib/data"
import { scrollToY } from "@/lib/scroll"
import { delay } from "@/lib/utils"

/** Replays the letter roll every time the thank-you comes into view. */
function useEntryCount<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [count, setCount] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && setCount((c) => c + 1), { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return { ref, count }
}

/** shader.md's PulsingBorder + rotating text ring, re-cut as a seal in ink tones. */
function SealRing() {
  return (
    <div className="relative grid size-40 place-items-center">
      <PulsingBorder
        colors={["#aeb6c2", "#dde2e8", "#606d80", "#f6f7f9"]}
        colorBack="#00000000"
        speed={1.2}
        roundness={1}
        thickness={0.08}
        softness={0.3}
        intensity={0.5}
        spots={4}
        spotSize={0.12}
        pulse={0.12}
        smoke={0.4}
        smokeSize={3}
        style={{ width: 96, height: 96, borderRadius: "50%" }}
        className="absolute"
      />
      <Seal className="relative size-12" />
      <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-0 size-full animate-[spin_28s_linear_infinite] motion-reduce:animate-none">
        <defs>
          <path id="seal-ring" d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
        </defs>
        <text className="fill-feather text-[7.4px] tracking-[0.28em] uppercase">
          <textPath href="#seal-ring">Yaponiya iqtisodiyoti · 日本経済 · 2026 · Rahmat ·</textPath>
        </text>
      </svg>
    </div>
  )
}

export function Finale() {
  const thanks = useEntryCount<HTMLDivElement>()

  return (
    <>
      <section id="xulosa" aria-label="Xulosa" className="relative isolate overflow-hidden bg-depth text-paper">
        <MeshGradient
          className="absolute inset-0 -z-10 h-full w-full"
          colors={["#0a1a33", "#1e2d4a", "#060a12", "#3a4a66"]}
          distortion={0.85}
          swirl={0.25}
          speed={0.22}
        />

        <div data-stop className="slide wrap-page py-20">
          <WordRise as="h2" className="section-title text-paper" text="Xulosa" />
          <ul className="mt-14 grid gap-10 md:grid-cols-3">
            {CONCLUSIONS.map((c, i) => (
              <li key={i} className="border-t border-white/20 pt-6 text-[clamp(1.1rem,1.5vw,1.35rem)] leading-relaxed font-light text-mist" data-rev style={delay(120 * i)}>
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div ref={thanks.ref} data-stop className="flex min-h-svh flex-col items-center justify-center px-6 pb-24 text-center">
          <SealRing />
          <h2 className="mt-10 text-[clamp(4.5rem,12vw,10.5rem)] leading-none font-extralight tracking-[-0.04em] text-paper">
            {thanks.count > 0 ? <TextRoll key={thanks.count}>Rahmat!</TextRoll> : "Rahmat!"}
          </h2>
          <p className="jp mt-5 text-[clamp(1.1rem,1.6vw,1.5rem)] tracking-[0.15em] text-feather">ご清聴ありがとうございました</p>
          <p className="lede mt-4 !text-mist">E’tiboringiz uchun rahmat. Savollaringiz bo‘lsa — marhamat.</p>
          {PRESENTER.name && (
            <p className="mt-2 text-mist">
              {PRESENTER.name}
              {PRESENTER.group && <span className="text-feather"> · {PRESENTER.group}</span>}
            </p>
          )}
          <SplashButton className="splash-btn--light mt-12" label="Boshiga qaytish" hoverLabel="Yana bir bor" onClick={() => scrollToY(0)} />
        </div>
      </section>

      <section id="manbalar" data-stop aria-label="Manbalar" className="slide bg-paper py-20">
        <div className="wrap-page grid gap-10 lg:grid-cols-[0.6fr_1.4fr]">
          <div>
            <h2 className="text-[1.8rem] font-light text-depth">Manbalar</h2>
            <p className="note mt-3 max-w-[32ch]">Barcha raqamlar ochiq manbalardan olingan. «~» — yaxlitlangan yoki taxminiy qiymat.</p>
          </div>
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {SOURCES.map((s) => (
              <li key={s} className="border-b border-mist py-3 text-[0.95rem] text-depth">
                {s}
              </li>
            ))}
          </ul>
        </div>
        <p className="wrap-page note mt-14">Sayt React, Spline 3D, GSAP, Lenis va WebGL siyoh simulyatsiyasi bilan qurilgan · 2026</p>
      </section>
    </>
  )
}
