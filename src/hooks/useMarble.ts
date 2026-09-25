import { useEffect, useState } from "react"
import { marbleTexture, type MarblePreset } from "@/lib/marble"

/** Generates a marbled texture after first paint (it is computed, not downloaded). */
export function useMarble(preset: MarblePreset, w?: number, h?: number, seed?: number) {
  const [url, setUrl] = useState("")
  useEffect(() => {
    const run = () => setUrl(marbleTexture(preset, w, h, seed))
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback
    if (idle) idle(run)
    else setTimeout(run, 60)
  }, [preset, w, h, seed])
  return url
}
