"use client"

/**
 * Card Flip (flip-card.md, kokonutui — MIT) turned into a fountain card:
 * the front carries the institution and its headline figure on gravel,
 * the back its explanation on clipped hedge. Flips on hover, on click (for a
 * presenter without hover) and on keyboard focus + Enter.
 */

import { Repeat2 } from "lucide-react"
import { useState } from "react"
import { Corners, FleuronRule } from "@/components/Ornament"
import { cn } from "@/lib/utils"

export interface CardFlipProps {
  name: string
  latin: string
  figure: string
  meaning: string
  text: string
  className?: string
}

export default function CardFlip({ name, latin, figure, meaning, text, className }: CardFlipProps) {
  const [hover, setHover] = useState(false)
  const [pinned, setPinned] = useState(false)
  const flipped = hover || pinned

  return (
    <button
      type="button"
      aria-pressed={pinned}
      aria-label={`${name}: ${figure}, ${meaning}. ${text}`}
      className={cn("group relative h-[340px] w-full cursor-pointer text-left [perspective:2000px]", className)}
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
        {/* Front — the institution, engraved like a plan cartouche */}
        <div className="frame absolute inset-0 flex flex-col bg-gravel p-6 [backface-visibility:hidden]">
          <Corners />
          <div className="flex items-start justify-between gap-3">
            <h3 className="engr text-[1.35rem] tracking-[0.06em] text-hedge-deep">{name}</h3>
            <Repeat2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-gilt transition-transform duration-500 group-hover:-rotate-12" />
          </div>
          <span className="latin mt-1 text-[0.92rem] leading-snug text-muted">{latin}</span>
          <div className="mt-auto">
            <FleuronRule className="mb-4" />
            <p className="text-[clamp(2rem,2.6vw,2.6rem)] leading-none font-medium text-hedge">{figure}</p>
            <p className="mt-2 text-text">{meaning}</p>
          </div>
        </div>

        {/* Back — the explanation, on hedge */}
        <div className="frame frame--light absolute inset-0 flex flex-col bg-hedge p-6 text-spray [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="engr text-[1.1rem] tracking-[0.06em] text-gilt-light">{name}</span>
          <span className="mt-2 text-xl font-medium">{figure}</span>
          <p className="mt-4 text-[1rem] leading-relaxed text-spray/90">{text}</p>
          <span className="latin mt-auto text-leaf">{latin}</span>
        </div>
      </div>
    </button>
  )
}
