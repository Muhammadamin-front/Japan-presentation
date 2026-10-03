import { CountNumber } from "@/components/ui/count-number"
import { CoverFlow } from "@/components/ui/coverflow"
import { WordRise } from "@/components/ui/word-rise"
import { MUSEUM_ITEMS } from "@/lib/data"
import { delay } from "@/lib/utils"

export function Muzeylar() {
  return (
    <section id="muzeylar" aria-label="Vatikan muzeylari" className="bg-hedge-deep text-spray">
      <div data-stop className="slide wrap-page py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <WordRise as="h2" className="section-title text-spray !text-[clamp(2.1rem,3.8vw,3.6rem)]" text="San’at — eng katta «sanoat»" />
          <p className="lede !text-spray/85" data-rev style={delay(120)}>
            Vatikanda zavod yo‘q. Uning eksporti — tashrif: dunyo Mikelanjelo va Rafaelni ko‘rish uchun chipta sotib oladi.
          </p>
        </div>
        <div className="mt-7" data-rev style={delay(200)}>
          <CoverFlow items={MUSEUM_ITEMS} className="frame frame--light" />
        </div>
      </div>

      <div data-stop className="slide wrap-page py-20">
        {/* The museums' economics set as the sum it is */}
        <div className="grid items-end gap-x-6 gap-y-8 md:grid-cols-[auto_auto_auto_auto_auto]" role="group" aria-label="Muzeylar daromadi hisobi">
          {[
            { v: <CountNumber value={6.8} decimals={1} suffix=" mln" />, l: "tashrif, 2024" },
            { op: "×" },
            { v: <CountNumber value={20} prefix="~" suffix=" €" />, l: "asosiy chipta, 2025" },
            { op: "≈" },
            { v: <CountNumber value={100} prefix="~" suffix=" mln €" />, l: "yillik tushum, taxmin", focus: true },
          ].map((t, i) =>
            "op" in t ? (
              <span key={i} aria-hidden="true" className="engr pb-9 text-[clamp(2rem,3vw,3rem)] text-spray/50 max-md:hidden">
                {t.op}
              </span>
            ) : (
              <div key={i} data-rev style={delay(140 * i)} className={t.focus ? "border-b-2 border-gilt-light pb-3" : "pb-3"}>
                <p className={`engr leading-none whitespace-nowrap ${t.focus ? "text-[clamp(2.8rem,4.6vw,4.4rem)] text-gilt-light" : "text-[clamp(2.2rem,3.4vw,3.3rem)] text-spray"}`}>{t.v}</p>
                <p className="mt-3 text-leaf">{t.l}</p>
              </div>
            ),
          )}
        </div>
        <p className="mt-14 max-w-[62ch] border-t border-gilt-light/30 pt-8 text-[clamp(1.1rem,1.5vw,1.35rem)] leading-relaxed text-spray" data-rev>
          Bu pul Gubernatorlikka tushadi va butun shahar-davlat xarajatining qariyb yarmini qoplaydi. Yubiley yilida esa Rimga{" "}
          <span className="font-medium text-gilt-light">33,5 mln</span> ziyoratchi keldi (2025, 185 mamlakatdan).
        </p>
        <p className="mt-6 text-[0.85rem] text-leaf">Manbalar: The Art Newspaper (2025); Vatikan muzeylari; Yubiley 2025 yakunlari (2026-yanvar).</p>
      </div>
    </section>
  )
}
