import { AgingLine, DebtBars, TableView } from "@/components/charts"
import { Inscribed } from "@/components/Inscribed"
import FlowField from "@/components/ui/flow-field"
import { WordRise } from "@/components/ui/word-rise"
import { AGING, DEBT, PROBLEMS } from "@/lib/data"
import { delay } from "@/lib/utils"

export function Problems() {
  return (
    <section id="muammolar" aria-label="Muammolar" className="bg-paper">
      <div data-stop>
        <FlowField theme="ink" density="medium" className="h-svh min-h-[560px]">
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <div aria-hidden="true" className="absolute top-1/2 left-1/2 h-[60%] w-[min(820px,92%)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,var(--color-paper)_40%,rgba(246,247,249,0.7)_70%,transparent)]" />
            <Inscribed jp="課題" className="relative">
              <WordRise as="h2" className="section-title text-depth" text="Mo‘jizaning narxi" />
            </Inscribed>
            <p className="lede relative mt-6 max-w-[46ch]" data-rev style={delay(160)}>
              Qariyotgan aholi, dunyodagi eng katta davlat qarzi va zaif yen — Yaponiya bugun yechayotgan uchta og‘ir masala.
            </p>
          </div>
        </FlowField>
      </div>

      <div data-stop className="slide wrap-page grid gap-14 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <h3 className="text-[clamp(2rem,3.2vw,3rem)] leading-tight font-light text-depth" data-rev>
            Har uch kishidan biri — 65 yoshdan katta
          </h3>
          <p className="lede mt-6" data-rev style={delay(120)}>
            2026-yilda 65+ yoshdagilar 29,6% ga yetdi — aholisi 40 mln dan ortiq davlatlar ichida eng yuqori ko‘rsatkich (Italiya — 25,6%). Ishlaydigan qo‘l
            kamayadi, pensiya va tibbiyot xarajati ortadi.
          </p>
        </div>
        <figure>
          <AgingLine data={AGING} />
          <figcaption className="note mt-3">
            Statistika byurosi; 2040 va 2070 — IPSS prognozi (2023). <span aria-hidden="true" className="mx-1 inline-block size-2 rounded-full bg-seal align-middle" /> 2026 — hozirgi holat
          </figcaption>
          <TableView
            caption="65 va undan katta yoshdagilar ulushi"
            head={["Yil", "Ulush"]}
            rows={AGING.map((a) => [a.year, `${a.value.toLocaleString("ru-RU")}%${a.projected ? " (prognoz)" : ""}`])}
          />
        </figure>
      </div>

      <div data-stop className="slide bg-wash py-20">
        <div className="wrap-page grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <h3 className="text-[clamp(2rem,3.2vw,3rem)] leading-tight font-light text-depth" data-rev>
              Qarz YaIMdan 2,3 barobar katta
            </h3>
            <p className="lede mt-6" data-rev style={delay(120)}>
              Ammo qarz asosan ichki: davlat obligatsiyalarining qariyb yarmi Yaponiya Bankida, qolgani yapon banklari va pensiya fondlarida. Shu
              sabab inqiroz bo‘lmayapti — lekin foiz ko‘tarilsa, qarzga xizmat qilish qimmatlashadi.
            </p>
          </div>
          <figure className="pt-6">
            <DebtBars data={DEBT} />
            <figcaption className="note mt-5">Davlat yalpi qarzi, YaIMga nisbatan % · XVF WEO, 2025-oktabr (2025 bahosi, yaxlitlangan)</figcaption>
          </figure>
        </div>
      </div>

      <div data-stop className="slide wrap-page py-20">
        <div className="grid gap-px bg-mist md:grid-cols-2">
          {PROBLEMS.map((p, i) => (
            <article key={p.title} className="bg-paper py-16 md:px-10 md:first:pl-0" data-rev style={delay(100 * i)}>
              <p className="text-[clamp(2.8rem,4.6vw,4.4rem)] leading-none font-light text-depth">{p.figure}</p>
              <h3 className="mt-5 text-[1.45rem] font-light text-depth">{p.title}</h3>
              <p className="mt-3 max-w-[46ch] leading-relaxed text-dilute">{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
