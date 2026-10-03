import { FleuronRule } from "@/components/Ornament"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { WordRise } from "@/components/ui/word-rise"
import { FUTURE } from "@/lib/data"
import { cn, delay } from "@/lib/utils"

export function Kelajak() {
  return (
    <section id="kelajak" aria-label="Kelajak">
      <AuroraBackground>
        <div data-stop className="slide wrap-page py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
            <WordRise as="h2" className="section-title text-hedge-deep" text="Qayerga qarab?" />
            <p className="lede" data-rev style={delay(120)}>
              Profitsit mo‘rt: u aktivlar sotuvi va xayriyalar hisobiga keldi. Kelajak — energiya mustaqilligi, pensiya islohoti va barqaror turizm.
            </p>
          </div>
          <FleuronRule className="mt-8 max-w-lg" />

          <ul className="mt-10 grid gap-x-10 md:grid-cols-3">
            {FUTURE.map((f, i) => (
              <li key={f.title} className={cn("border-t border-gilt/70 py-8", i === 0 && "md:col-span-3")} data-rev style={delay(90 * i)}>
                <h3 className={cn("engr leading-tight tracking-[0.05em] text-hedge-deep", i === 0 ? "text-[clamp(1.6rem,2.6vw,2.4rem)]" : "text-[1.45rem]")}>{f.title}</h3>
                <p className={cn("mt-3 leading-relaxed text-text", i === 0 ? "max-w-[70ch] text-[1.15rem]" : "max-w-[44ch]")}>{f.text}</p>
              </li>
            ))}
          </ul>
          <p className="note mt-4">Manbalar: Vatican News (2024-iyun, 2026-may, 2026-iyun); IOR 2025-yil hisoboti.</p>
        </div>
      </AuroraBackground>
    </section>
  )
}
