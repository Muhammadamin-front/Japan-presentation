/**
 * Figures count up with NumberFlow (@number-flow/react) the first time they
 * enter the viewport. Uzbek convention (space for thousands, comma for decimals) via ru-RU,
 * which every browser ships — some builds lack uz locale data.
 */

import NumberFlow from "@number-flow/react"
import { useEffect, useRef, useState } from "react"

interface CountNumberProps {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
}

export function CountNumber({ value, decimals = 0, prefix, suffix, className }: CountNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(value)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setShown(value)
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value])

  return (
    <span ref={ref} className={className}>
      <NumberFlow
        value={shown}
        locales="ru-RU"
        prefix={prefix}
        suffix={suffix}
        format={{ minimumFractionDigits: decimals, maximumFractionDigits: decimals }}
        transformTiming={{ duration: 1400, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        spinTiming={{ duration: 1400, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      />
    </span>
  )
}
