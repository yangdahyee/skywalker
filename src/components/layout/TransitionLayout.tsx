// src/components/layout/TransitionLayout.tsx
import { useLocation, useOutlet } from "react-router-dom"
import { useEffect, useState, useRef } from "react"

interface SavedPage {
  key: string
  content: React.ReactNode
  animationClass: string
}

const STARWARS_EFFECTS = ["wipe", "iris", "clock", "reverseWipe", "verticalBar"]

export default function TransitionLayout() {
  const location = useLocation()
  const currentOutlet = useOutlet()

  const [displayedPages, setDisplayedPages] = useState<SavedPage[]>(() => {
    if (currentOutlet) {
      return [{ key: location.pathname, content: currentOutlet, animationClass: "" }]
    }
    return []
  })

  const prevLocationRef = useRef(location.pathname)
  const effectIndexRef = useRef(0)

  useEffect(() => {
    if (location.pathname !== prevLocationRef.current && currentOutlet) {
      const currentIndex = effectIndexRef.current
      const chosenEffect = STARWARS_EFFECTS[currentIndex]

      // 다음 페이지 이동을 위한 루프 인덱스 계산
      effectIndexRef.current = (currentIndex + 1) % STARWARS_EFFECTS.length

      // 이름과 클래스가 매칭되는 클린 매핑 테이블
      const transitionClasses: Record<string, string> = {
        wipe: "sw-wipe",
        iris: "sw-iris",
        clock: "sw-clock",
        reverseWipe: "sw-reverse-wipe",
        verticalBar: "sw-vertical-bar",
      }

      const animationClass = transitionClasses[chosenEffect] || "sw-wipe"

      console.log(`🔄 [STARWARS LOOP] 순서: [${currentIndex}/5] ➡️ 효과명: ${chosenEffect}`)

      setDisplayedPages((prev) => {
        const updatedPrev = prev.map((page) => ({
          ...page,
          animationClass: page.animationClass || animationClass,
        }))

        return [{ key: location.pathname, content: currentOutlet, animationClass: "" }, ...updatedPrev]
      })
      prevLocationRef.current = location.pathname
    }
  }, [location.pathname, currentOutlet])

  const handleAnimationEnd = (keyToRemove: string) => {
    setDisplayedPages((prev) => prev.filter((page) => page.key !== keyToRemove))
  }

  return (
    <div className="relative w-full h-full bg-slate-800 overflow-hidden">
      {displayedPages.map((page, index) => {
        const isOldPage = index > 0

        return (
          <div
            key={page.key}
            onAnimationEnd={() => isOldPage && handleAnimationEnd(page.key)}
            className={`absolute inset-0 w-full h-full ${isOldPage ? `z-50 pointer-events-none ${page.animationClass}` : "z-10"}`}
          >
            {page.content}
          </div>
        )
      })}
    </div>
  )
}
