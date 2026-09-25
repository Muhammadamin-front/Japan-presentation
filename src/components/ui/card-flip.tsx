"use client"

/**
 * Card Flip (flip-card.md, kokonutui — MIT) turned into a kanji flashcard:
 * the front carries the Japanese term, the back its meaning in Uzbek.
 * Flips on hover, on click (for a presenter without a mouse hover) and on
 * keyboard focus + Enter.
 */

import { Repeat2 } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export interface CardFlipProps {
  kanji: string
  romaji: string
  meaning: string
  text: string
  className?: string
}

export default function CardFlip({ kanji, romaji, meaning, text, className }: CardFlipProps) {
  const [hover, setHover] = useState(false)
  const [pinned, setPinned] = useState(false)
  const flipped = hover || pinned

  return (
    <button
      type="button"
      aria-pressed={pinned}
      aria-label={`${romaji}: ${meaning}. ${text}`}
      className={cn("group relative h-[300px] w-full cursor-pointer text-left [perspective:2000px]", className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => setPinned((v) => !v)}
    >
      <div
        className={cn(
          "relative h-full w-full [transform-style:preserve-3d]",
          "transition-[transform] duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] motion-reduce:transition-none",
          flipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]",
        )}
      >
        {/* Front — the term, set like a hanging scroll */}
        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-mist bg-paper p-6 [backface-visibility:hidden]">
          <div className="flex items-start justify-between">
            <span className="label text-dilute">{romaji}</span>
            <Repeat2 aria-hidden="true" className="size-4 text-feather transition-transform duration-500 group-hover:-rotate-12" />
          </div>
          <span className="jp self-center text-[4.2rem] leading-none text-depth [writing-mode:vertical-rl]">
            {kanji}
          </span>
          <span className="text-lg font-normal text-ink">{meaning}</span>
        </div>

        {/* Back — the meaning, on ink */}
        <div className="absolute inset-0 flex flex-col rounded-2xl bg-depth p-6 text-paper [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="jp text-3xl text-feather">{kanji}</span>
          <span className="mt-3 text-xl font-normal">{meaning}</span>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-mist">{text}</p>
          <span className="label mt-auto text-feather">{romaji}</span>
        </div>
      </div>
    </button>
  )
}
