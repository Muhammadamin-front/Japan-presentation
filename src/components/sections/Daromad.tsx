import { RevenueAllee } from "@/components/charts"
import { Fleuron } from "@/components/Ornament"
import CardFlip from "@/components/ui/card-flip"
import { CountNumber } from "@/components/ui/count-number"
import { WordRise } from "@/components/ui/word-rise"
import { BUDGET_2024, NO_TAX, SOURCES_OF_MONEY } from "@/lib/data"
import { delay } from "@/lib/utils"

export function Daromad() {
  return (
    <section id="daromad" aria-label="Daromad" className="raked">
      <div data-stop className="slide wrap-page py-20">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_1fr]">
          <WordRise as="h2" className="section-title text-hedge-deep" text="Pul qayerdan keladi?" />
          <p className="lede lg:justify-self-end" data-rev style={delay(120)}>
            Muqaddas Taxtning 2024-yilgi konsolidatsiyalangan hisoboti: yillar davomidagi kamomaddan keyin birinchi marta kichik profitsit.
          </p>
        </div>

        <dl className="mt-14 grid gap-px border-y border-gilt bg-stone sm:grid-cols-3">
          {[
            { v: BUDGET_2024.income, d: 2, s: " mlrd €", l: "Operatsion daromad" },
            { v: BUDGET_2024.expense, d: 3, s: " mlrd €", l: "Operatsion xarajat" },
            { v: BUDGET_2024.result, d: 1, s: " mln €", p: "+", l: "Yakuniy natija (2023: −51,2 mln €)" },
          ].map((f, i) => (
            <div key={f.l} className="bg-gravel py-7 sm:px-7 sm:first:pl-0" data-rev style={delay(90 * i)}>
              <dd className="text-[clamp(2.2rem,3.6vw,3.4rem)] leading-none font-medium text-hedge">
                <CountNumber value={f.v} decimals={f.d} prefix={f.p} suffix={f.s} />
              </dd>
              <dt className="mt-3 text-text">{f.l}</dt>
            </div>
          ))}
        </dl>

        <figure className="mt-14">
          <RevenueAllee total={BUDGET_2024.core} data={BUDGET_2024.split} />
          <figcaption className="note mt-3">
            Shifoxonalarsiz daromad tarkibi, {BUDGET_2024.core.toLocaleString("ru-RU")} mln € · Iqtisodiyot kotibiyati, 2024-yil hisoboti (2025-noyabr)
          </figcaption>
        </figure>
      </div>

      <div data-stop className="slide bg-gravel-2 py-20">
        <div className="wrap-page">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
            <WordRise as="h2" className="section-title text-hedge-deep" text="To‘rt favvora" />
            <p className="lede" data-rev style={delay(120)}>
              Davlatni to‘rt manba boqadi: ikkitasi — tashrif va xayriya, ikkitasi — bank va mulk.
            </p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {SOURCES_OF_MONEY.map((c, i) => (
              <div key={c.name} data-rev style={delay(90 * i)}>
                <CardFlip {...c} />
              </div>
            ))}
          </div>
          <p className="note mt-8">Manbalar: Vatikan muzeylari (taxmin); Avliyo Pyotr ulushi 2025; IOR 2025; APSA 2024.</p>
        </div>
      </div>

      <div data-stop className="slide on-hedge py-20">
        <div className="wrap-page">
          <WordRise as="h2" className="section-title max-w-[18ch] text-spray" text="Soliqsiz va valyutasiz" />
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            {NO_TAX.map((t, i) => (
              <div key={t.title} data-rev style={delay(120 * i)}>
                <div className="flex items-center gap-3 text-gilt-light">
                  <Fleuron className="h-5 w-8" />
                  <span className="axis-rule h-px flex-1 bg-gilt-light/50" style={delay(200 + 120 * i)} />
                </div>
                <h3 className="engr mt-5 text-[1.5rem] tracking-[0.06em] text-gilt-light">{t.title}</h3>
                <p className="mt-3 leading-relaxed text-spray/90">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
