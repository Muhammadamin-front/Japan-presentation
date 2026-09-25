import { useEffect, useState } from "react"
import { marbleTexture, } from "@/lib/marble"

/** Generates a marbled texture after first paint (it is computed, not downloaded). */
export function useMarble(preset, w, h, seed) {
  const [url, setUrl] = useState("")
  useEffect(() => {
    const run = () => setUrl(marbleTexture(preset, w, h, seed))
    const idle = (window ).requestIdleCallback
    if (idle) idle(run)
    else setTimeout(run, 60)
  }, [preset, w, h, seed])
  return url
}
