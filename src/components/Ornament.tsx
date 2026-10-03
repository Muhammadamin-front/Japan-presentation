import { cn } from "@/lib/utils"

/** One gilt fleuron: a central bud with two scrolled leaves, drawn like a parterre motif. */
export function Fleuron({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 24" aria-hidden="true" className={cn("shrink-0", className)} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
      <path d="M20 3 C17 7 17 12 20 17 C23 12 23 7 20 3 Z" fill="currentColor" stroke="none" />
      <path d="M20 17 C15 14 10 15 8 18 C6 21 9 23 11 21 C12.5 19.5 11 18 9.8 18.6" />
      <path d="M20 17 C25 14 30 15 32 18 C34 21 31 23 29 21 C27.5 19.5 29 18 30.2 18.6" />
      <path d="M20 17 V22" />
    </svg>
  )
}

/** A gilt rule that grows from its centre fleuron outward (axial reveal). */
export function FleuronRule({ className, tone = "text-gilt" }: { className?: string; tone?: string }) {
  return (
    <div className={cn("flex items-center gap-3", tone, className)} aria-hidden="true" data-rev>
      <span className="axis-rule h-px flex-1 bg-current opacity-70" />
      <Fleuron className="h-4 w-7" />
      <span className="axis-rule h-px flex-1 bg-current opacity-70" />
    </div>
  )
}

/** Four corner scrolls that finish a .frame, as on an engraved garden plan. */
export function Corners({ className }: { className?: string }) {
  const corner = (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <path d="M2 14 V2 H14" />
      <path d="M6 10 C6 7 7 6 10 6" />
      <circle cx="6" cy="6" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  )
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-[3px] text-gilt", className)}>
      <span className="absolute top-0 left-0">{corner}</span>
      <span className="absolute top-0 right-0 rotate-90">{corner}</span>
      <span className="absolute right-0 bottom-0 rotate-180">{corner}</span>
      <span className="absolute bottom-0 left-0 -rotate-90">{corner}</span>
    </div>
  )
}

/**
 * The mark: the crossed keys of the Vatican arms (gold over silver),
 * with a fountain basin beneath — the state seen as its garden.
 */
export function Keys({ className, light = false }: { className?: string; light?: boolean }) {
  const gold = light ? "var(--color-gilt-light)" : "var(--color-gilt)"
  const silver = light ? "var(--color-spray)" : "var(--color-statuary)"
  const key = (stroke: string, rot: number) => (
    <g transform={`rotate(${rot} 32 30)`} stroke={stroke} strokeWidth="2.4" fill="none" strokeLinecap="round">
      <circle cx="32" cy="50" r="6" />
      <circle cx="32" cy="50" r="2" fill={stroke} stroke="none" />
      <path d="M32 44 V8" />
      <path d="M32 12 H39 V16 H35 M32 19 H38" />
    </g>
  )
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("shrink-0", className)}>
      {key(silver, 38)}
      {key(gold, -38)}
      <path d="M22 60 H42" stroke={gold} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
