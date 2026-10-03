import { useEffect } from "react"
import { Presenter } from "@/components/Presenter"
import { Rail } from "@/components/Rail"
import { Daromad } from "@/components/sections/Daromad"
import { Davlat } from "@/components/sections/Davlat"
import { Finale } from "@/components/sections/Finale"
import { Hero } from "@/components/sections/Hero"
import { History } from "@/components/sections/History"
import { Kelajak } from "@/components/sections/Kelajak"
import { Muammolar } from "@/components/sections/Muammolar"
import { Muzeylar } from "@/components/sections/Muzeylar"
import { Taqqoslash } from "@/components/sections/Taqqoslash"
import { restoreHash, startScroll } from "@/lib/scroll"

/** One IntersectionObserver reveals every word group and atom once (scroll-web.md). */
function useReveals() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const root = document.documentElement
    if (!reduce) root.classList.add("motion")
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in")
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
    )
    document.querySelectorAll("[data-rev], [data-words]").forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function App() {
  useEffect(() => {
    const stop = startScroll()
    restoreHash()
    return stop
  }, [])
  useReveals()

  return (
    <>
      <a href="#davlat" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-hedge focus:px-4 focus:py-2 focus:text-spray">
        Taqdimotga o‘tish
      </a>
      <Rail />
      <main className="pt-12 lg:pt-0 lg:pl-[var(--rail)]">
        <Hero />
        <Davlat />
        <History />
        <Daromad />
        <Muzeylar />
        <Muammolar />
        <Taqqoslash />
        <Kelajak />
        <Finale />
      </main>
      <Presenter />
    </>
  )
}
