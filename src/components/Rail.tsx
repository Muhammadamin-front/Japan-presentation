import { useEffect, useState } from "react"
import { Bot, Droplet, Factory, Flag, History, House, Mountain, Sunrise, TrendingDown, Waves, type LucideIcon } from "lucide-react"
import { PRESENTER, SECTIONS, type SectionId } from "@/lib/data"
import { onScrollY, scrollToId } from "@/lib/scroll"
import { cn } from "@/lib/utils"
import { Seal } from "./Seal"

const ICONS: Record<SectionId, LucideIcon> = {
  kirish: House,
  nippon: Mountain,
  raqamlar: Droplet,
  tarix: History,
  turgunlik: Waves,
  monozukuri: Factory,
  robotlar: Bot,
  muammolar: TrendingDown,
  kelajak: Sunrise,
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
  return { active, progress }
}

const pad = (n: number) => String(n).padStart(2, "0")

export function Rail() {
  const { active, progress } = useActiveSection()
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[var(--rail)] flex-col border-r border-mist bg-paper lg:flex">
        <a href="#kirish" onClick={(e) => (e.preventDefault(), scrollToId("kirish"))} className="flex flex-col items-center gap-3 px-6 pt-8 pb-7">
          <Seal className="size-16" />
          <span className="label text-depth">Nippon keizai</span>
          <span className="jp -mt-2 text-sm text-dilute">日本経済</span>
        </a>

        <nav aria-label="Bo‘limlar" className="mx-5 flex-1 overflow-y-auto border-t border-mist pt-5">
          <ul className="flex flex-col gap-0.5">
            {SECTIONS.map((s, i) => {
              const Icon = ICONS[s.id]
              const on = i === active
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
                      "group flex items-center gap-3.5 rounded-full py-1.5 pr-3 pl-1.5 transition-colors duration-300",
                      on ? "text-depth" : "text-dilute hover:text-depth",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-8 place-items-center rounded-full transition-colors duration-500",
                        on ? "bg-depth text-paper" : "text-dilute group-hover:text-depth",
                      )}
                    >
                      <Icon className="size-[15px]" strokeWidth={1.6} />
                    </span>
                    <span className="label !tracking-[0.14em]">{s.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="mx-5 border-t border-mist py-5">
          <div className="flex items-baseline justify-between">
            <span className="label text-dilute">Bo‘lim</span>
            <span className="tnum text-sm text-depth">
              {pad(active + 1)} <span className="text-feather">/ {pad(SECTIONS.length)}</span>
            </span>
          </div>
          <div className="mt-3 h-px w-full bg-mist">
            <div className="h-px bg-ink transition-[width] duration-300" style={{ width: `${progress * 100}%` }} />
          </div>
          {PRESENTER.name && <p className="mt-4 text-sm text-depth">{PRESENTER.name}</p>}
          {PRESENTER.group && <p className="text-xs text-dilute">{PRESENTER.group}</p>}
          <p className="note mt-3">
            <kbd className="font-sans">←</kbd> <kbd className="font-sans">→</kbd> keyingi qadam · <kbd className="font-sans">F</kbd> to‘liq ekran ·{" "}
            <kbd className="font-sans">?</kbd> yordam
          </p>
        </div>
      </aside>

      {/* Narrow screens: a slim top bar instead of the rail */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-12 items-center gap-3 border-b border-mist bg-paper px-4 lg:hidden">
        <Seal className="size-7" seal={false} />
        <span className="label text-depth">{SECTIONS[active].label}</span>
        <span className="tnum ml-auto text-xs text-dilute">
          {pad(active + 1)} / {pad(SECTIONS.length)}
        </span>
        <div className="absolute inset-x-0 bottom-0 h-px bg-ink" style={{ width: `${progress * 100}%` }} />
      </header>
    </>
  )
}
