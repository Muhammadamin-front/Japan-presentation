import { InkDrops, TableView } from "@/components/charts"
import { CountNumber } from "@/components/ui/count-number"
import { WordRise } from "@/components/ui/word-rise"
import { GDP_DROPS, KEY_FIGURES } from "@/lib/data"
import { delay } from "@/lib/utils"

export function Numbers() {
  return (
    <section id="raqamlar" aria-label="Raqamlarda Yaponiya" className="bg-wash">
      <div data-stop className="slide wrap-page py-20">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_1fr]">
          <WordRise as="h2" className="section-title text-depth" text="Raqamlarda Yaponiya" />
          <p className="lede lg:justify-self-end" data-rev style={delay(120)}>
            YaIM bo‘yicha dunyoda beshinchi: 2025-yilda Hindiston Yaponiyani ozgina ortda qoldirdi. Bayroq doirasining maydoni — iqtisodiyot hajmi.
          </p>
        </div>

        <figure className="mt-16">
          <InkDrops data={GDP_DROPS} />
          <figcaption className="note mt-2 text-center">Nominal YaIM, trillion AQSh dollari · XVF World Economic Outlook, 2025-aprel (2025 bahosi)</figcaption>
          <TableView
            caption="Nominal YaIM, trillion dollar"
            head={["Davlat", "YaIM, trln $"]}
            rows={GDP_DROPS.map((d) => [d.country, d.value.toLocaleString("ru-RU")])}
          />
        </figure>
      </div>

      <div data-stop className="slide wrap-page py-20">
        <dl className="grid border-t border-feather/60 md:grid-cols-2 md:gap-x-16">
          {KEY_FIGURES.map((f, i) => (
            <div key={f.label} className="grid items-baseline gap-3 border-b border-feather/40 py-7 sm:grid-cols-[minmax(10.5rem,auto)_1fr] sm:gap-6" data-rev style={delay(70 * i)}>
              <dd className="order-first text-[clamp(2rem,3.2vw,3.1rem)] leading-none font-light text-depth">
                <CountNumber value={f.value} decimals={f.decimals} prefix={f.prefix} suffix={f.suffix} />
              </dd>
              <dt>
                <span className="block text-[1.02rem] leading-snug text-depth">{f.label}</span>
                <span className="note mt-1.5 block">{f.note}</span>
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
