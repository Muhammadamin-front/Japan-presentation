import { useRef, useState } from "react"
import { Corners, Fleuron, FleuronRule } from "@/components/Ornament"
import { SCALE_STOPS_AT, ScaleZoom } from "@/components/ui/scale-zoom"
import { WordRise } from "@/components/ui/word-rise"
import { COMPARE, COMPARE_LESSONS, SCALE_STOPS } from "@/lib/data"
import { cn, delay } from "@/lib/utils"

function Country({ code, name, side }: { code: string; name: string; side: "va" | "uz" }) {
  return (
    <div className={cn("flex items-center gap-2 max-sm:flex-col sm:gap-4", side === "va" ? "sm:justify-end sm:text-right" : "max-sm:flex-col-reverse sm:justify-start")}>
      {side === "uz" && <img src={`/flags/${code}.svg`} alt="" width={48} height={48} className="size-12 rounded-full ring-1 ring-stone" />}
      <span className={cn("engr text-[clamp(0.95rem,2.2vw,2rem)] tracking-[0.06em]", side === "va" ? "text-hedge" : "text-porphyry")}>{name}</span>
      {side === "va" && <img src={`/flags/${code}.svg`} alt="" width={48} height={48} className="size-12 rounded-full ring-1 ring-stone" />}
    </div>
  )
}

export function Taqqoslash() {
  const stageRef = useRef<HTMLDivElement>(null)
  const [level, setLevel] = useState(0)

  return (
    <section id="taqqoslash" aria-label="O‘zbekiston va Vatikan" className="raked">
      {/* One scale, three levels: the descent from Uzbekistan to the Vatican */}
      <div ref={stageRef} data-stop data-stops={SCALE_STOPS_AT} className="stage h-[520svh]">
        <div className="stage__pin raked">
          <div className="wrap-page grid h-full gap-4 pt-16 pb-6 max-lg:grid-rows-[auto_minmax(0,1fr)] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-8 lg:pt-10 lg:pb-8">
            <div className="flex flex-col justify-center">
              <h2 className="section-title !text-[clamp(1.8rem,3.4vw,3.4rem)] text-hedge-deep">Bir masshtabda</h2>
              <p className="latin mt-2 text-[clamp(1.05rem,1.5vw,1.35rem)] text-muted">O‘zbekiston, Toshkent va Vatikan — bitta o‘lchovda</p>
              <ol className="mt-4 flex flex-col lg:mt-10">
                {SCALE_STOPS.map((s, i) => (
                  <li
                    key={s.title}
                    className={cn(
                      "relative border-t border-stone py-4 transition-[opacity,padding] duration-700 last:border-b",
                      i === level ? "pl-5 opacity-100" : "opacity-40 max-lg:hidden",
                    )}
                  >
                    {i === level && <span aria-hidden="true" className={cn("absolute top-[1.55rem] left-0 size-2 rotate-45", i === 2 ? "bg-gilt" : "bg-porphyry")} />}
                    <h3 className={cn("engr text-[1.35rem] tracking-[0.08em]", i === 2 ? "text-hedge" : "text-porphyry")}>{s.title}</h3>
                    <p className="mt-1 text-[1.05rem] leading-relaxed text-text">{s.text}</p>
                  </li>
                ))}
              </ol>
              <p className="note mt-6 max-lg:hidden">Natural Earth; OpenStreetMap (© OSM hissadorlari). Teng maydonli proyeksiya.</p>
            </div>
            <div className="frame relative min-h-0 bg-spray/60 p-[9px] lg:min-h-[46svh]">
              <Corners />
              <ScaleZoom stageRef={stageRef} onLevel={setLevel} />
            </div>
          </div>
        </div>
      </div>

      {/* Two walls of one allée: Vatican on the left, Uzbekistan on the right, the topic on the axis */}
      <div data-stop className="slide py-20">
        <div className="wrap-page">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-gilt pb-6 md:gap-10">
            <Country code="va" name="Vatikan" side="va" />
            <Fleuron className="h-6 w-10 text-gilt" />
            <Country code="uz" name="O‘zbekiston" side="uz" />
          </div>
          <table className="w-full border-collapse sm:table-fixed">
            <caption className="sr-only">Vatikan va O‘zbekiston taqqoslanishi</caption>
            <thead className="sr-only">
              <tr>
                <th>Vatikan</th>
                <th>Ko‘rsatkich</th>
                <th>O‘zbekiston</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((r, i) => (
                <tr key={r.topic} className="border-b border-stone/70 max-sm:grid max-sm:grid-cols-2 max-sm:gap-x-4 max-sm:py-2" data-rev style={delay(50 * i)}>
                  <td className="w-[38%] py-3 pr-2 text-right max-sm:w-auto max-sm:py-1 sm:pr-4 text-[clamp(1rem,1.3vw,1.2rem)] font-medium text-hedge">{r.va}</td>
                  <th scope="row" className="relative w-[24%] px-1 py-3 max-sm:order-first max-sm:col-span-2 max-sm:w-auto max-sm:py-1 text-center align-middle font-normal">
                    <span className="label block text-muted">{r.topic}</span>
                    {r.ratio && <span className="tnum mt-0.5 block text-[0.85rem] font-medium text-gilt">{r.ratio}</span>}
                  </th>
                  <td className="w-[38%] py-3 pl-2 max-sm:w-auto max-sm:py-1 sm:pl-4 text-[clamp(1rem,1.3vw,1.2rem)] font-medium text-porphyry">{r.uz}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="note mt-6">
            Manbalar: Iqtisodiyot kotibiyati (2024); O‘zbekiston Milliy statistika qo‘mitasi (YaIM 2025, aholi — 2026-yil ro‘yxatga olishning dastlabki natijasi); Iqtisodiyot va
            moliya vazirligi (konsolidatsiyalangan byudjet 2025); Turizm qo‘mitasi (2025); YuNESKO (2026). Byudjet nisbati valyuta kursiga bog‘liq — taxminiy.
          </p>
        </div>
      </div>

      <div data-stop className="slide on-hedge py-20">
        <div className="wrap-page">
          <WordRise as="h2" className="section-title max-w-[20ch] text-spray" text="Taqqoslashdan saboq" />
          <FleuronRule className="mt-8 max-w-md" tone="text-gilt-light" />
          {/* A ladder leading off the comparison: each lesson steps further along the axis */}
          <ol className="relative mt-12 border-l border-gilt-light/40">
            {COMPARE_LESSONS.map((l, i) => (
              <li
                key={l.title}
                className="relative grid gap-x-10 gap-y-2 border-b border-gilt-light/20 py-7 pl-8 last:border-0 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]"
                style={{ marginLeft: `${i * 3}rem`, ...delay(140 * i) }}
                data-rev
              >
                <span aria-hidden="true" className="absolute top-9 -left-[5px] size-2.5 rotate-45 bg-gilt-light" />
                <h3 className="engr text-[clamp(1.25rem,2vw,1.7rem)] tracking-[0.06em] text-gilt-light">
                  <span className="mr-3 text-spray/60">{["I", "II", "III"][i]}</span>
                  {l.title}
                </h3>
                <p className="max-w-[58ch] leading-relaxed text-spray/90">{l.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
