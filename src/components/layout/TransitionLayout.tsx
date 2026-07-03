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
    /* 모바일(md 미만) 환경에서 하위 컨텐츠 높이에 따라 유연하게 스크롤바가 열릴 수 있도록 h-full을 min-h-screen으로 변경하고, overflow-hidden을 데스크탑 전용(md:overflow-hidden)으로 제한*/
    <div className="relative w-full min-h-screen md:h-full bg-slate-800 overflow-y-auto md:overflow-hidden">
      {displayedPages.map((page, index) => {
        const isOldPage = index > 0

        return (
          /**
           * 현재 유저가 보고 있는 메인 활성화 페이지(isOldPage가 아닌 z-10 영역) 박스를 모바일에서는 relative로 풀어주어 내부 MainPage의 높이가 정직하게 부모에게 전달되도록 처리.
           * 데스크탑 환경(md:)에서는 원래대로 absolute inset-0 구조 안에 딱 가두어 스타워즈 트랜지션 애니메이션 프레임을 정밀하게 유지.
           */
          <div
            key={page.key}
            onAnimationEnd={() => isOldPage && handleAnimationEnd(page.key)}
            className={`${isOldPage ? `absolute inset-0 w-full h-full z-50 pointer-events-none ${page.animationClass}` : "relative md:absolute md:inset-0 w-full min-h-screen md:h-full z-10"}`}
          >
            {page.content}
          </div>
        )
      })}
    </div>
  )
}
