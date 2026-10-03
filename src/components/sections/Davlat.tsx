import { Corners, FleuronRule } from "@/components/Ornament"
import { ParallaxComponent } from "@/components/ui/parallax-scrolling"
import { WordRise } from "@/components/ui/word-rise"
import { PAPACY, STATE_FACTS, TWO_VATICANS } from "@/lib/data"
import { delay } from "@/lib/utils"

export function Davlat() {
  return (
    <section id="davlat" aria-label="Davlat" className="raked">
      <div data-stop>
        <ParallaxComponent
          image="/images/dome-gardens.jpg"
          width={1278}
          height={1920}
          position="50% 0%"
          alt="Avliyo Pyotr sobori gumbazi Vatikan bog‘lari daraxtlari ustida"
          title={
            <>
              <span className="flex flex-col items-center max-md:bg-spray/85 max-md:px-4 max-md:py-3">
                <span className="engr text-[clamp(2.2rem,6vw,5.4rem)] tracking-[0.05em] text-hedge-deep">Civitas Vaticana</span>
                <span className="mt-3 text-[clamp(1.05rem,1.6vw,1.45rem)] font-medium text-hedge-deep">Dunyodagi eng kichik davlat — maydonining qariyb yarmi bog‘</span>
              </span>
            </>
          }
        />
      </div>

      <div data-stop className="slide wrap-page grid gap-x-20 gap-y-14 py-24 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <WordRise as="h2" className="section-title text-hedge-deep" text="Davlat ichidagi davlat" />
          <p className="lede mt-8" data-rev style={delay(120)}>
            Vatikan Rim shahri ichida joylashgan. Uning chegarasini piyoda 40 daqiqada aylanib chiqish mumkin, lekin u o‘z pochtasi, banki, radiosi va
            diplomatlariga ega to‘laqonli davlat.
          </p>
          <p className="mt-10 max-w-[30ch] text-[clamp(1.45rem,2.3vw,2.1rem)] leading-snug text-hedge-deep" data-rev style={delay(240)}>
            Iqtisodiyoti zavod va soliqqa emas — xayriya, mulk va madaniy merosga tayanadi.
          </p>
        </div>

        <dl className="self-end border-t border-gilt">
          {STATE_FACTS.map((f, i) => (
            <div key={f.label} className="grid items-baseline gap-2 border-b border-stone py-5 sm:grid-cols-[minmax(8.5rem,auto)_1fr] sm:gap-6" data-rev style={delay(80 * i)}>
              <dt className="engr text-[clamp(1.6rem,2.4vw,2.2rem)] text-hedge">{f.value}</dt>
              <dd className="text-text">{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Two Vaticans: the institution and the territory — a pair of parterres on one axis */}
      <div data-stop className="slide bg-gravel-2 py-20">
        <div className="wrap-page">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
            <WordRise as="h2" className="section-title text-hedge-deep" text="Ikki xil «Vatikan»" />
            <p className="lede" data-rev style={delay(120)}>
              Iqtisodni tushunish uchun ikkisini ajratish kerak: biri — butun dunyoga xizmat qiluvchi institut, ikkinchisi — 0,49 km² hudud.
            </p>
          </div>

          <div className="relative mt-14 grid gap-6 md:grid-cols-2 md:gap-14">
            <span aria-hidden="true" className="axis-rule absolute inset-y-6 left-1/2 hidden w-px bg-gilt md:block" />
            {TWO_VATICANS.map((v, i) => (
              <article key={v.name} className="frame relative bg-gravel p-8 md:p-10" data-rev style={delay(140 * i)}>
                <Corners />
                <h3 className="engr text-[clamp(1.4rem,2vw,1.9rem)] tracking-[0.08em] text-hedge-deep">{v.name}</h3>
                <p className="latin mt-1 text-muted">{v.latin}</p>
                <p className="mt-4 max-w-[46ch] leading-relaxed text-text">{v.text}</p>
                <FleuronRule className="mt-7 mb-4" />
                <p className="text-[clamp(2rem,3vw,2.8rem)] leading-none font-medium text-hedge">{v.figure}</p>
                <p className="note mt-2">{v.note}</p>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-14 max-w-[62ch] text-center text-[clamp(1.05rem,1.35vw,1.25rem)] leading-relaxed text-hedge-deep" data-rev>
            <span className="engr tracking-[0.1em]">Papa {PAPACY.name}</span> — {PAPACY.text}
          </p>
        </div>
      </div>
    </section>
  )
}
