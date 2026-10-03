import { ArrowDown } from "lucide-react"
import { Corners, FleuronRule, Keys } from "@/components/Ornament"
import { FountainSquare } from "@/components/ui/fountain-square"
import { HERO_READOUTS, PRESENTER } from "@/lib/data"
import { scrollToId } from "@/lib/scroll"
import { delay, wordIndex } from "@/lib/utils"

export function Hero() {
  return (
    <section id="kirish" data-stop aria-label="Kirish" className="raked relative grid min-h-[640px] lg:h-svh lg:grid-cols-2">
      <div className="relative flex flex-col px-[clamp(1.25rem,4.5vw,4.5rem)] pt-20 pb-8 lg:pt-10">
        <FleuronRule className="max-w-[30rem]" />

        <div className="my-auto py-10">
          <h1 className="text-hedge-deep" data-words="">
            <span className="engr block text-[clamp(3.4rem,7.4vw,6rem)] tracking-[0.04em]">
              <span className="w" style={wordIndex(0)}>
                Vatikan
              </span>
            </span>
            <span className="engr mt-2 block text-[clamp(1.5rem,2.9vw,2.6rem)] tracking-[0.24em] text-hedge-mid">
              <span className="w" style={wordIndex(2)}>
                iqtisodiyoti
              </span>
            </span>
          </h1>
          <p className="mt-8 max-w-[34ch] text-[clamp(1.15rem,1.55vw,1.45rem)] leading-normal text-text" data-rev style={delay(260)}>
            Soliqsiz, o‘z valyutasisiz va atigi 882 aholi bilan dunyodagi eng kichik davlat qanday yashaydi — va O‘zbekiston bilan qanday taqqoslanadi.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5" data-rev style={delay(420)}>
            <button
              type="button"
              onClick={() => scrollToId("davlat")}
              className="group inline-flex h-14 items-center gap-4 bg-hedge pr-3 pl-7 text-spray outline-1 outline-offset-4 outline-hedge transition-[outline-offset,background-color] duration-500 hover:bg-hedge-mid hover:outline-offset-[7px] active:scale-[0.98]"
            >
              <span className="label tracking-[0.18em]">Taqdimotni boshlash</span>
              <span className="grid size-9 place-items-center border border-gilt-light/50 text-gilt-light transition-transform duration-500 group-hover:translate-y-0.5">
                <ArrowDown className="size-4" strokeWidth={1.6} />
              </span>
            </button>
            <a
              href="#manbalar"
              onClick={(e) => (e.preventDefault(), scrollToId("manbalar"))}
              className="inline-flex h-14 items-center border border-hedge/40 px-7 text-hedge-deep transition-colors duration-300 hover:border-hedge hover:bg-gravel-2"
            >
              <span className="label tracking-[0.18em]">Manbalar</span>
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3 text-muted" data-rev style={delay(600)}>
          <Keys className="size-8" />
          <p className="text-sm">
            {PRESENTER.course} · 2026
            {PRESENTER.name && <span className="text-hedge-deep"> · {PRESENTER.name}</span>}
          </p>
        </div>
      </div>

      {/* The grand axis seen from the dome, with both fountains of the square awake */}
      <div className="relative p-3 max-lg:h-[78svh] lg:py-6 lg:pr-6 lg:pl-0" data-words="">
        <div className="frame relative h-full p-[9px]">
          <FountainSquare
            src="/images/aerial.jpg"
            alt="Avliyo Pyotr maydoni gumbazdan: obelisk, ikki favvora va Konchiliatsiya ko‘chasining o‘qi"
            className="h-full w-full"
          />
          <Corners />
          <dl className="frame absolute top-6 right-6 hidden w-[16rem] bg-spray/95 p-5 sm:block" data-rev style={delay(700)}>
            <dt className="engr text-[1.05rem] tracking-[0.12em] text-hedge-deep">Davlat pasporti</dt>
            <FleuronRule className="mt-2 mb-1" />
            {HERO_READOUTS.map((r) => (
              <div key={r.label} className="flex items-baseline justify-between gap-3 border-b border-stone/60 py-2 last:border-0">
                <dt className="text-sm text-muted">{r.label}</dt>
                <dd className="text-right">
                  <span className="text-lg font-medium text-hedge-deep">{r.value}</span>
                  <span className="block text-[0.72rem] leading-tight text-muted">{r.note}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
