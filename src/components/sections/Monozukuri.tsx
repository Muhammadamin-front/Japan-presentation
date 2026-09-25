import CardFlip from "@/components/ui/card-flip"
import { NeonMesh } from "@/components/ui/neon-mesh"
import { WordRise } from "@/components/ui/word-rise"
import { FLASHCARDS, MAKERS, SECTORS } from "@/lib/data"
import { delay } from "@/lib/utils"

function MakerLine() {
  const items = [...MAKERS, ...MAKERS]
  return (
    <div className="marquee overflow-hidden border-y border-mist py-6 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]" aria-label="Yapon kompaniyalari">
      <div className="marquee__track gap-14 pr-14">
        {items.map(([jp, en], i) => (
          <span key={i} className="flex items-baseline gap-3 whitespace-nowrap" aria-hidden={i >= MAKERS.length}>
            <span className="jp text-2xl text-depth">{jp}</span>
            <span className="text-sm text-dilute">{en}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export function Monozukuri() {
  return (
    <section id="monozukuri" aria-label="Sanoat: monozukuri" className="bg-paper">
      <div data-stop>
        <NeonMesh className="h-svh min-h-[560px]">
          <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <div aria-hidden="true" className="absolute top-1/2 left-1/2 h-[70%] w-[min(900px,90%)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,var(--color-paper)_35%,rgba(246,247,249,0.75)_65%,transparent)]" />
            <span className="jp relative text-[clamp(2.4rem,8.5vw,8rem)] whitespace-nowrap leading-none text-depth">ものづくり</span>
            <h2 className="relative mt-6 text-[clamp(1.5rem,2.4vw,2.3rem)] font-light text-depth">Monozukuri — narsa yasash san’ati</h2>
            <p className="lede relative mt-4 max-w-[48ch]">
              Sifat, aniqlik va har kuni ozgina yaxshiroq qilish. Yaponiya sanoati YaIMning ~29% ini beradi, lekin eksportning yuragi aynan shu yerda.
            </p>
          </div>
        </NeonMesh>
      </div>

      <div data-stop className="slide wrap-page py-20">
        <WordRise as="h2" className="section-title max-w-[16ch] text-depth" text="Dunyoga nima sotadi?" />
        <ul className="mt-14 border-t border-mist">
          {SECTORS.map((s, i) => (
            <li
              key={s.name}
              className="group grid gap-x-10 gap-y-3 border-b border-mist py-8 md:grid-cols-[7rem_minmax(14rem,1fr)_1.6fr]"
              data-rev
              style={delay(80 * i)}
            >
              <span className="jp text-[1.9rem] leading-none text-feather transition-colors duration-500 group-hover:text-depth">{s.jp}</span>
              <div>
                <h3 className="text-[1.55rem] leading-tight font-light text-depth">{s.name}</h3>
                <p className="mt-2 text-sm text-dilute">{s.makers}</p>
              </div>
              <p className="max-w-[58ch] leading-relaxed text-depth/85">{s.text}</p>
            </li>
          ))}
        </ul>
      </div>

      <MakerLine />

      <div data-stop className="slide wrap-page py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <WordRise as="h2" className="section-title text-depth" text="Yapon boshqaruv modeli" />
          <p className="lede" data-rev style={delay(120)}>
            To‘rtta so‘z — yapon kompaniyalari qanday ishlashining kaliti.
          </p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {FLASHCARDS.map((c, i) => (
            <div key={c.romaji} data-rev style={delay(90 * i)}>
              <CardFlip {...c} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
