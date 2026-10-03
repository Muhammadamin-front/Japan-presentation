"use client"

/**
 * AuroraBackground (prompt-background-light.md), re-cut for the garden world.
 * The aurora's mechanism is kept — a wide texture drifting slowly behind the
 * content on the `aurora` keyframes, faded out by a radial mask — but the
 * texture is a computed parterre de broderie (lib/parterre.ts) in hedge green
 * on raked gravel instead of blurred colour bands.
 */

import { useMemo, type ReactNode } from "react"
import { parterreTile } from "@/lib/parterre"
import { cn } from "@/lib/utils"

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  showRadialGradient?: boolean
  seed?: number
}

export const AuroraBackground = ({ className, children, showRadialGradient = true, seed = 11, ...props }: AuroraBackgroundProps) => {
  const tile = useMemo(() => parterreTile(seed), [seed])
  return (
    <div className={cn("raked relative isolate text-hedge-deep", className)} {...props}>
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 bg-[length:520px_320px] bg-repeat motion-safe:animate-aurora",
            showRadialGradient && "[mask-image:radial-gradient(ellipse_at_80%_15%,black_15%,transparent_75%)]",
          )}
          style={{ backgroundImage: tile }}
        />
      </div>
      {children}
    </div>
  )
}
