import { ParallaxComponent } from "@/components/ui/parallax-scrolling"
import { WordRise } from "@/components/ui/word-rise"
import { NIPPON_FACTS } from "@/lib/data"
import { delay } from "@/lib/utils"

export function Nippon() {
  return (
    <section id="nippon" aria-label="Nippon" className="relative bg-paper">
      <div data-stop>
        <ParallaxComponent
          image="/images/fuji-chureito.jpg"
          alt="Fuji tog‘i va Chureito pagodasi, pastda Fujiyoshida shahri"
          title={
            <>
              <span className="jp text-[clamp(4.5rem,11vw,10rem)] leading-none text-depth">日本</span>
              <span className="mt-3 text-[clamp(1.05rem,1.5vw,1.4rem)] font-normal text-depth">Nippon — «quyosh chiqadigan yurt»</span>
            </>
          }
        />
      </div>

      <div data-stop className="slide wrap-page grid gap-x-20 gap-y-14 py-24 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <WordRise as="h2" className="section-title text-depth" text="Resurssiz orol, boy iqtisodiyot" />
          <p className="lede mt-8" data-rev style={delay(120)}>
            Yaponiyada neft, gaz va temir rudasi deyarli yo‘q — energiyaning qariyb 87% i chetdan keltiriladi. Shunga qaramay u 55 yil davomida (1968–2023)
            dunyoning eng yirik uchta iqtisodiyotidan biri bo‘lib keldi.
          </p>
          <p className="mt-10 max-w-[26ch] text-[clamp(1.5rem,2.4vw,2.2rem)] leading-snug font-light text-depth" data-rev style={delay(240)}>
            Xomashyoni sotib olib, unga bilim va mehnat qo‘shib, qimmatroq qilib sotish — yapon modelining mohiyati.
          </p>
        </div>

        <dl className="self-end border-t border-mist">
          {NIPPON_FACTS.map((f, i) => (
            <div key={f.label} className="grid items-baseline gap-2 border-b border-mist py-5 sm:grid-cols-[minmax(9rem,auto)_1fr] sm:gap-6" data-rev style={delay(80 * i)}>
              <dt className="text-[clamp(1.5rem,2.2vw,2rem)] font-light text-depth">{f.value}</dt>
              <dd className="text-dilute">{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
