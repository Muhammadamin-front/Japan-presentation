import { Inscribed } from "@/components/Inscribed"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { WordRise } from "@/components/ui/word-rise"
import { FUTURE } from "@/lib/data"
import { cn, delay } from "@/lib/utils"

export function Future() {
  return (
    <section id="kelajak" aria-label="Kelajak">
      <AuroraBackground>
        <div data-stop className="slide wrap-page py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
            <Inscribed jp="未来">
              <WordRise as="h2" className="section-title text-depth" text="Yangi o‘sish manbalari" />
            </Inscribed>
            <p className="lede" data-rev style={delay(120)}>
              Deflyatsiya ortda qoldi, narxlar va ish haqi o‘smoqda. Yaponiya chip, turizm, yashil energiya va aqlli jamiyatga tikmoqda.
            </p>
          </div>

          <ul className="mt-16 grid gap-x-10 md:grid-cols-6">
            {FUTURE.map((f, i) => (
              <li
                key={f.tag}
                className={cn("border-t border-feather/60 py-8", i < 3 ? "md:col-span-2" : "md:col-span-3")}
                data-rev
                style={delay(90 * i)}
              >
                <h3 className={cn("leading-tight font-light text-depth", i < 3 ? "text-[1.6rem]" : "text-[2rem]")}>{f.title}</h3>
                <p className="mt-3 max-w-[48ch] leading-relaxed text-depth/80">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </AuroraBackground>
    </section>
  )
}
