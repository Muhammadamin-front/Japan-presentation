import { useMarble } from "@/hooks/useMarble"
import { cn } from "@/lib/utils"

/** A strip of marbled endpaper marking the passage from paper into the indigo pool. */
export function MarbleBand({ className, seed = 11 }: { className?: string; seed?: number }) {
  const url = useMarble("endpaper", 900, 160, seed)
  return (
    <div
      aria-hidden="true"
      className={cn("h-28 w-full bg-paper bg-cover bg-center transition-opacity duration-1000", url ? "opacity-100" : "opacity-0", className)}
      style={url ? { backgroundImage: `url(${url})` } : undefined}
    />
  )
}
