import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/** A heading with its Japanese word hung beside it as a vertical inscription (never a kicker above it). */
export function Inscribed({ jp, children, className, tone = "text-dilute" }: { jp: string; children: ReactNode; className?: string; tone?: string }) {
  return (
    <div className={cn("flex items-start gap-[clamp(1rem,2vw,1.75rem)]", className)}>
      <span className={cn("jp shrink-0 pt-2 text-[clamp(1.1rem,1.6vw,1.5rem)] leading-none tracking-[0.3em] [writing-mode:vertical-rl]", tone)} aria-hidden="true">
        {jp}
      </span>
      <div className="min-w-0">{children}</div>
    </div>
  )
}
