"use client"

/**
 * AuroraBackground (prompt-background-light.md), re-cut for the ink world.
 * The aurora's mechanism is kept — a wide texture drifting slowly behind the
 * content on the `aurora` keyframes, faded out by a radial mask — but the
 * texture is a real marbled (suminagashi) sheet in mist tones instead of
 * blurred colour bands, so it reads as paper, not as a smudged screen.
 */

import { useMarble } from "@/hooks/useMarble"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  showRadialGradient?: boolean
}

export const AuroraBackground = ({ className, children, showRadialGradient = true, ...props }: AuroraBackgroundProps) => {
  const marble = useMarble("mist", 900, 520, 23)
  return (
    <div className={cn("relative isolate bg-paper text-depth", className)} {...props}>
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 bg-[length:160%_auto] bg-repeat-x transition-opacity duration-1000 motion-safe:animate-aurora",
            marble ? "opacity-100" : "opacity-0",
            showRadialGradient && "[mask-image:radial-gradient(ellipse_at_85%_10%,black_20%,transparent_78%)]",
          )}
          style={marble ? { backgroundImage: `url(${marble})` } : undefined}
        />
      </div>
      {children}
    </div>
  )
}
