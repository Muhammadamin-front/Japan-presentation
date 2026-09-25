import { useEffect, useRef } from "react"
import { WordRise } from "@/components/ui/word-rise"
import { ARROWS, LOST } from "@/lib/data"
import { registerStage } from "@/lib/scroll"
import { delay } from "@/lib/utils"

/**
 * The masked whiteout (scroll-web.md): the headline is erased from the bottom
 * up as the stage scrubs — and, in the ink world, it also blurs, like ink
 * dissolving back into water.
 */
export function Stall() {
  const stageRef = useRef<HTMLDivElement>(null)
  useEffect(() => (stageRef.current ? registerStage(stageRef.current) : undefined), [])

  return (
    <section id="turgunlik" aria-label="Yo‘qotilgan o‘n yilliklar">
      <div ref={stageRef} data-stop data-stops="0.04" className="stage h-[260svh]">
        <div className="stage__pin grid place-items-center bg-paper">
          <div className="wrap-page text-center">
            <h2
              className="whiteout mx-auto text-[clamp(2.1rem,9.2vw,8.4rem)] leading-[0.92] font-light tracking-[-0.035em] text-depth uppercase"
              aria-label="Yo‘qotilgan o‘n yilliklar"
            >
              <span className="block">Yo‘qotilgan</span>
              <span className="block text-dilute">o‘n</span>
              <span className="block">yilliklar</span>
            </h2>
            <p className="whiteout-caption mx-auto mt-10 max-w-[46ch] text-[clamp(1.05rem,1.4vw,1.3rem)] text-dilute">
              1991 → 2012. Pufak yorildi, narxlar tushdi, o‘sish to‘xtadi — butun avlod uchun iqtisodiyot joyida qotib qoldi.
            </p>
          </div>
        </div>
      </div>

      <div data-stop className="slide bg-paper py-20">
        <div className="wrap-page">
          <div className="grid gap-px border-y border-mist bg-mist md:grid-cols-3">
            {LOST.map((c, i) => (
              <article key={c.title} className="bg-paper py-9 md:px-8 md:first:pl-0 md:last:pr-0" data-rev style={delay(90 * i)}>
                <p className="tnum text-sm text-dilute">{c.period}</p>
                <h3 className="mt-2 text-[1.6rem] font-light text-depth">{c.title}</h3>
                <p className="mt-4 leading-relaxed text-dilute">{c.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div data-stop className="slide bg-wash py-20">
        <div className="wrap-page">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
            <WordRise as="h2" className="section-title text-depth" text="Abenomika: uch o‘q" />
            <p className="lede" data-rev style={delay(120)}>
              2013-yil. Bosh vazir Abe samuray Mori Motonari rivoyatini esladi: bitta o‘qni sindirish oson, uchtasini birga — imkonsiz. Siyosat ham uch yo‘nalishda
              bir vaqtda urildi.
            </p>
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-3" data-rev>
            {ARROWS.map((a, i) => (
              <div key={a.title}>
                <svg viewBox="0 0 320 40" className="w-full overflow-visible" aria-hidden="true">
                  <path className="draw" pathLength={1} d="M4 20 H300" stroke="var(--color-depth)" strokeWidth="1.6" fill="none" style={{ transitionDelay: `${i * 220}ms` }} />
                  <path className="draw" pathLength={1} d="M286 8 L306 20 L286 32" stroke="var(--color-depth)" strokeWidth="1.6" fill="none" style={{ transitionDelay: `${i * 220 + 500}ms` }} />
                  <path className="draw" pathLength={1} d="M4 20 l-10 -10 M4 20 l-10 10 M14 20 l-10 -10 M14 20 l-10 10" stroke="var(--color-feather)" strokeWidth="1.4" fill="none" style={{ transitionDelay: `${i * 220}ms` }} />
                </svg>
                <div className="mt-6 flex items-baseline gap-4">
                  <span className="jp text-[2.6rem] leading-none text-depth">{a.n}</span>
                  <h3 className="text-[1.45rem] font-light text-depth">{a.title}</h3>
                </div>
                <p className="mt-3 leading-relaxed text-dilute">{a.text}</p>
              </div>
            ))}
          </div>

          <p className="mt-16 max-w-[60ch] border-t border-feather/50 pt-8 text-[clamp(1.1rem,1.5vw,1.35rem)] leading-relaxed font-light text-depth" data-rev>
            Natija: aksiyalar va bandlik o‘sdi, ayollar ishtiroki rekordga chiqdi — lekin 2% inflyatsiya maqsadiga faqat 2022-yildan keyin, jahon narxlari
            ko‘tarilgach yetildi.
          </p>
        </div>
      </div>
    </section>
  )
}
