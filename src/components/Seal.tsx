import { cn } from "@/lib/utils"

/** The mark: a drop that has pushed two earlier rings outward, with a vermilion rakkan seal. */
export function Seal({ className, seal = true }: { className?: string; seal?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("shrink-0", className)}>
      <circle cx="30" cy="30" r="24" fill="none" stroke="var(--color-feather)" strokeWidth="2.5" />
      <circle cx="30" cy="30" r="16.5" fill="none" stroke="var(--color-dilute)" strokeWidth="2.5" />
      <circle cx="30" cy="30" r="9" fill="var(--color-depth)" />
      {seal && (
        <g>
          <rect x="46" y="46" width="15" height="15" rx="2" fill="var(--color-seal)" />
          <text x="53.5" y="57.2" textAnchor="middle" fontSize="10" fill="var(--color-paper)" fontFamily="var(--font-jp)">
            日
          </text>
        </g>
      )}
    </svg>
  )
}
