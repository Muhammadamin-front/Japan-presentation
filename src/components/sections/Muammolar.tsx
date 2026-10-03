import { useEffect, useRef } from "react"
import { DeficitChart } from "@/components/charts"
import { FleuronRule } from "@/components/Ornament"
import FlowField from "@/components/ui/flow-field"
import { WordRise } from "@/components/ui/word-rise"
import { DEFICITS, PROBLEMS } from "@/lib/data"
import { registerStage } from "@/lib/scroll"
import { delay } from "@/lib/utils"

export function Muammolar() {
  const stageRef = useRef<HTMLDivElement>(null)
  useEffect(() => (stageRef.current ? registerStage(stageRef.current) : undefined), [])

  return (
    <section id="muammolar" aria-label="Muammolar">
      <div data-stop>
        <FlowField theme="fountain" density="medium" className="h-svh min-h-[560px]">
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <div aria-hidden="true" className="absolute top-1/2 left-1/2 -z-10 h-[62%] w-[min(940px,94%)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(19,38,26,0.92)_40%,rgba(19,38,26,0.6)_70%,transparent)]" />
            <WordRise as="h2" className="section-title text-spray" text="Moliyaviy muammolar" />
            <FleuronRule className="mt-8 w-[min(420px,80%)]" tone="text-gilt-light" />
            <p className="lede mt-6 max-w-[46ch] !text-spray/85" data-rev style={delay(160)}>
              Doimiy kamomad, qimmatga tushgan investitsiya janjali va to‘ldirilmagan pensiya jamg‘armasi.
            </p>
          </div>
        </FlowField>
      </div>

      {/* Whiteout (scroll-web.md): the word is raked away into gravel from the bottom up */}
      <div ref={stageRef} data-stop data-stops="0.04" className="stage h-[240svh]">
        <div className="stage__pin raked grid place-items-center">
          <div className="wrap-page text-center">
            <h2 className="whiteout engr mx-auto text-[clamp(2.6rem,10vw,8.6rem)] leading-[0.95] tracking-[0.04em] text-hedge-deep" aria-label="Kamomad 83 million yevro">
              <span className="block">Kamomad</span>
              <span className="block text-hedge-mid">−83 mln €</span>
            </h2>
            <p className="whiteout-caption mx-auto mt-10 max-w-[46ch] text-[clamp(1.1rem,1.4vw,1.3rem)] text-text">
              2023-yil: Muqaddas Taxt operatsion faoliyati 83 mln € zarar ko‘rdi. Xarajat — xodimlar, nunsiaturalar, ommaviy axborot — daromaddan tez o‘sdi.
            </p>
          </div>
        </div>
      </div>

      <div data-stop className="slide bg-gravel-2 py-20">
        <div className="wrap-page grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <h3 className="section-title text-hedge-deep" data-rev>
              Zarardan profitsitga
            </h3>
            <p className="lede mt-6" data-rev style={delay(120)}>
              2024-yilda operatsion kamomad qariyb yarmiga qisqardi: xayriyalar va shifoxonalar daromadi 79 mln € ga o‘sdi, investitsiyalar 46 mln € keltirdi,
              APSA esa 46,1 mln € qo‘shdi.
            </p>
          </div>
          <figure>
            <DeficitChart data={DEFICITS} />
            <figcaption className="note mt-3">Mln € · Iqtisodiyot kotibiyati, 2024-yil konsolidatsiyalangan hisoboti</figcaption>
          </figure>
        </div>
      </div>

      <div data-stop className="slide raked py-20">
        <div className="wrap-page">
          <h3 className="section-title text-hedge-deep" data-rev>
            Uch ochiq hisob
          </h3>
          {/* A ledger of dated entries: date, entry, then the sum carried in the right margin */}
          <ol className="mt-10 border-t border-gilt">
            {PROBLEMS.map((p, i) => (
              <li
                key={p.title}
                className="grid gap-x-8 gap-y-2 border-b border-stone py-6 md:grid-cols-[7.5rem_minmax(0,1fr)_auto] md:items-baseline"
                data-rev
                style={delay(110 * i)}
              >
                <span className="tnum text-sm text-muted">{p.date}</span>
                <div>
                  <h4 className="engr text-[1.3rem] tracking-[0.06em] text-hedge-deep">{p.title}</h4>
                  <p className="mt-2 max-w-[62ch] leading-relaxed text-text">{p.text}</p>
                </div>
                <span className="text-[clamp(1.7rem,2.6vw,2.4rem)] leading-none font-medium whitespace-nowrap text-hedge md:text-right">{p.figure}</span>
              </li>
            ))}
          </ol>
          <p className="note mt-8">Manbalar: Vatican News (2025-sentabr, 2026-yanvar); NCR (2024-noyabr); Avliyo Pyotr ulushi 2025-yil hisoboti.</p>
        </div>
      </div>
    </section>
  )
}
