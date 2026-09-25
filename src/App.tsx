import { useEffect } from "react"
import { Presenter } from "@/components/Presenter"
import { Rail } from "@/components/Rail"
import { Finale } from "@/components/sections/Finale"
import { Future } from "@/components/sections/Future"
import { Hero } from "@/components/sections/Hero"
import { History } from "@/components/sections/History"
import { Monozukuri } from "@/components/sections/Monozukuri"
import { Nippon } from "@/components/sections/Nippon"
import { Numbers } from "@/components/sections/Numbers"
import { Problems } from "@/components/sections/Problems"
import { Robots } from "@/components/sections/Robots"
import { Stall } from "@/components/sections/Stall"
import { startScroll } from "@/lib/scroll"

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
  useEffect(() => startScroll(), [])
  useReveals()

  return (
    <>
      <a href="#nippon" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-depth focus:px-4 focus:py-2 focus:text-paper">
        Taqdimotga o‘tish
      </a>
      <Rail />
      <main className="pt-12 lg:pt-0 lg:pl-[var(--rail)]">
        <Hero />
        <Nippon />
        <Numbers />
        <History />
        <Stall />
        <Monozukuri />
        <Robots />
        <Problems />
        <Future />
        <Finale />
      </main>
      <Presenter />
    </>
  )
}
