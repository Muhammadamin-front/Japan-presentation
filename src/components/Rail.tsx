import { useEffect, useState } from "react"
import { Coins, Flag, Images, History, Landmark, Scale, Sprout, TrendingDown, TreePine, type LucideIcon } from "lucide-react"
import { PRESENTER, SECTIONS, type SectionId } from "@/lib/data"
import { onScrollY, scrollToId, syncHash } from "@/lib/scroll"
import { cn, roman } from "@/lib/utils"
import { Keys } from "./Ornament"

const ICONS: Record<SectionId, LucideIcon> = {
  kirish: TreePine,
  davlat: Landmark,
  tarix: History,
  daromad: Coins,
  muzeylar: Images,
  muammolar: TrendingDown,
  taqqoslash: Scale,
  kelajak: Sprout,
  xulosa: Flag,
}

function useActiveSection() {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  useEffect(
    () =>
      onScrollY((y) => {
        const probe = y + window.innerHeight * 0.45
        let idx = 0
        SECTIONS.forEach((s, i) => {
          const el = document.getElementById(s.id)
          if (el && el.getBoundingClientRect().top + y <= probe) idx = i
        })
        setActive(idx)
        const max = document.documentElement.scrollHeight - window.innerHeight
        setProgress(max > 0 ? y / max : 0)
      }),
    [],
  )
  useEffect(() => {
    if (window.scrollY > 4) syncHash(SECTIONS[active].id)
  }, [active])
  return { active, progress }
}

export function Rail() {
  const { active, progress } = useActiveSection()
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[var(--rail)] flex-col bg-hedge text-spray lg:flex">
        <a
          href="#kirish"
          onClick={(e) => (e.preventDefault(), scrollToId("kirish"))}
          className="mx-4 mt-4 flex flex-col items-center gap-1.5 border-b border-gilt-light/30 px-2 pt-1 pb-4"
        >
          <Keys className="size-12" light />
          <span className="engr text-[0.95rem] tracking-[0.16em] text-spray">Vatikan</span>
          <span className="latin -mt-1 text-sm text-leaf">Civitas Vaticana</span>
        </a>

        {/* The grand axis: one gilt line runs through every basin; basins already passed have their jet awake. */}
        <nav aria-label="Bo‘limlar" className="relative mx-4 flex-1 overflow-y-auto py-4">
          <span aria-hidden="true" className="absolute top-6 bottom-6 left-[1.6rem] w-px bg-gilt-light/30" />
          <ul className="relative flex flex-col gap-0.5">
            {SECTIONS.map((s, i) => {
              const Icon = ICONS[s.id]
              const on = i === active
              const awake = i < active
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={on ? "true" : undefined}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToId(s.id)
                    }}
                    className={cn(
                      "group flex items-center gap-3 py-[3px] pr-2 pl-1.5 transition-colors duration-300",
                      on ? "text-gilt-light" : "text-spray/75 hover:text-spray",
                    )}
                  >
                    <span
                      className={cn(
                        "relative mt-1.5 grid size-8 shrink-0 place-items-center rounded-full border outline-1 -outline-offset-[5px] transition-[background-color,border-color,color,outline-color] duration-500",
                        on
                          ? "border-gilt-light bg-gilt-light text-hedge-deep outline-hedge-deep/40"
                          : awake
                            ? "border-gilt-light/70 bg-hedge-mid text-gilt-light outline-gilt-light/40"
                            : "border-gilt-light/35 bg-hedge text-leaf outline-gilt-light/15 group-hover:border-gilt-light/70",
                      )}
                    >
                      <Icon className="size-[15px]" strokeWidth={1.6} />
                      {/* The basin's jet: asleep before the presenter reaches it, awake once passed, playing at the current stop */}
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 12"
                        className={cn(
                          "absolute -top-3 left-1/2 h-3 w-4 origin-bottom -translate-x-1/2 text-gilt-light transition-[transform,opacity] duration-700",
                          on ? "rail-jet scale-100 opacity-100" : awake ? "scale-75 opacity-70" : "scale-0 opacity-0",
                        )}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                      >
                        <path d="M8 12 V1" />
                        <path d="M8 3 C5 3 3.5 6 3 11" />
                        <path d="M8 3 C11 3 12.5 6 13 11" />
                      </svg>
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="label !tracking-[0.16em]">{s.label}</span>
                      <span className={cn("latin text-[0.78rem]", on ? "text-gilt-light/80" : "text-leaf/80")}>{s.latin}</span>
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="mx-4 border-t border-gilt-light/30 py-4">
          <div className="flex items-baseline justify-between">
            <span className="label text-leaf">Bo‘lim</span>
            <span className="engr text-[0.95rem] text-gilt-light">
              {roman(active + 1)} <span className="text-leaf">/ {roman(SECTIONS.length)}</span>
            </span>
          </div>
          <div className="mt-3 h-px w-full bg-gilt-light/25">
            <div className="h-px bg-gilt-light transition-[width] duration-300" style={{ width: `${progress * 100}%` }} />
          </div>
          {PRESENTER.name && <p className="mt-4 text-sm text-spray">{PRESENTER.name}</p>}
          {PRESENTER.group && <p className="text-xs text-leaf">{PRESENTER.group}</p>}
          <p className="mt-3 text-[0.78rem] leading-snug text-leaf">
            <kbd className="font-sans">←</kbd> <kbd className="font-sans">→</kbd> qadam · <kbd className="font-sans">F</kbd> to‘liq ekran · <kbd className="font-sans">?</kbd> yordam
          </p>
        </div>
      </aside>

      {/* Narrow screens: a slim hedge bar instead of the rail */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-12 items-center gap-3 bg-hedge px-4 text-spray lg:hidden">
        <Keys className="size-7" light />
        <span className="label">{SECTIONS[active].label}</span>
        <span className="engr ml-auto text-sm text-gilt-light">
          {roman(active + 1)} / {roman(SECTIONS.length)}
        </span>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gilt-light" style={{ width: `${progress * 100}%` }} />
      </header>
    </>
  )
}
