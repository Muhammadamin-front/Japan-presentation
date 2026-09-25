import { useState } from "react"
import { ArrowDown } from "lucide-react"
import { InkBasin } from "@/components/ui/ink-basin"
import { useMarble } from "@/hooks/useMarble"
import { Seal } from "@/components/Seal"
import { HERO_READOUTS, PRESENTER } from "@/lib/data"
import { scrollToId } from "@/lib/scroll"
import { delay, wordIndex } from "@/lib/utils"

export function Hero() {
  const [drops, setDrops] = useState(0)
  const marble = useMarble("ink", 360, 90, 5)

  return (
    <section id="kirish" data-stop aria-label="Kirish" className="relative h-svh min-h-[640px]">
      <InkBasin onInkDrop={setDrops} className="h-full w-full">
        {/* Still margin: paper wash keeps the title legible whatever the ink does */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,var(--color-paper)_0%,var(--color-paper)_30%,rgba(246,247,249,0.85)_44%,rgba(246,247,249,0)_60%)] max-md:bg-[linear-gradient(180deg,var(--color-paper)_0%,rgba(246,247,249,0.9)_60%,rgba(246,247,249,0.2)_100%)]"
        />

        <div className="pointer-events-none relative flex h-full flex-col px-[clamp(1.25rem,5vw,5rem)] pt-20 pb-8 lg:pt-12">
          <div className="my-auto flex items-stretch gap-[clamp(1.25rem,3vw,3rem)]">
            {/* Bilingual lockup: the kanji hang like an inscription beside the title */}
            <div className="hidden flex-col items-center gap-4 sm:flex">
              <span className="jp text-[clamp(1.4rem,2vw,2rem)] leading-none tracking-[0.35em] text-ink [writing-mode:vertical-rl]">日本経済</span>
              <span className="w-px flex-1 bg-feather" />
              <Seal className="size-9" />
            </div>

            <div className="max-w-[40rem]">
              <h1 className="text-[clamp(3.2rem,6.6vw,6rem)] leading-[0.98] font-[250] tracking-[-0.03em] text-depth" data-words="">
                <span className="w" style={wordIndex(0)}>
                  Yaponiya
                </span>{" "}
                <span className="w" style={wordIndex(1)}>
                  iqtisodiyoti
                </span>
              </h1>
              <p className="mt-7 max-w-[34ch] text-[clamp(1.1rem,1.5vw,1.4rem)] leading-relaxed text-dilute" data-rev style={delay(260)}>
                Urushdan keyingi vayronadan robotlar davrigacha: resurssiz orol mamlakat qanday qilib dunyoning yetakchi iqtisodiyotlaridan biriga
                aylandi.
              </p>
              <div className="pointer-events-auto mt-10 flex flex-wrap items-center gap-4" data-rev style={delay(420)}>
                <button
                  type="button"
                  onClick={() => scrollToId("nippon")}
                  className="group inline-flex h-14 items-center gap-4 rounded-full bg-depth bg-[length:180%_auto] bg-[position:0%_50%] pr-3 pl-7 text-paper transition-[background-position] duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[position:100%_50%] active:scale-[0.98]"
                  style={marble ? { backgroundImage: `url(${marble})` } : undefined}
                >
                  <span className="label !tracking-[0.16em]">Taqdimotni boshlash</span>
                  <span className="grid size-9 place-items-center rounded-full border border-paper/25 transition-transform duration-500 group-hover:translate-y-0.5">
                    <ArrowDown className="size-4" strokeWidth={1.6} />
                  </span>
                </button>
                <a
                  href="#manbalar"
                  onClick={(e) => (e.preventDefault(), scrollToId("manbalar"))}
                  className="inline-flex h-14 items-center rounded-full border border-feather px-7 text-depth transition-colors duration-300 hover:border-depth hover:bg-paper"
                >
                  <span className="label !tracking-[0.16em]">Manbalar</span>
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-4 text-dilute" data-rev style={delay(600)}>
            <p className="text-sm">
              {PRESENTER.course} · 2026
              {PRESENTER.name && <span className="text-depth"> · {PRESENTER.name}</span>}
            </p>
          </div>
        </div>

        {/* Live readouts on a still right margin, like the basin's instrument rail */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-[19%] bg-[linear-gradient(270deg,var(--color-paper)_0%,var(--color-paper)_45%,rgba(246,247,249,0)_100%)] xl:block" />
        <dl className="pointer-events-none absolute top-1/2 right-[clamp(1rem,2.5vw,2.5rem)] hidden -translate-y-1/2 flex-col gap-5 border-l border-mist pl-5 xl:flex">
          {HERO_READOUTS.map((r) => (
            <div key={r.label}>
              <dt className="label text-dilute">{r.label}</dt>
              <dd className="mt-1 text-lg text-depth">{r.value}</dd>
              <dd className="note">{r.note}</dd>
            </div>
          ))}
          <div>
            <dt className="label text-dilute">Tomchilar</dt>
            <dd className="tnum mt-1 text-lg text-depth">{drops}</dd>
          </div>
        </dl>
      </InkBasin>
    </section>
  )
}
