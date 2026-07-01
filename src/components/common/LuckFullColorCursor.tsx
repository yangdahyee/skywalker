import { useEffect, useRef, useState } from "react"

export default function LukeFullColorCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "BUTTON" || target.tagName === "A" || target.closest("button") || target.style.cursor === "pointer") {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mouseover", handleMouseOver)

    const render = () => {
      currentX += (mouseX - currentX) * 0.16
      currentY += (mouseY - currentY) * 0.16

      if (cursor) {
        cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      }

      requestAnimationFrame(render)
    }
    const animationId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseover", handleMouseOver)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-9999 will-change-transform"
      style={{
        // 48x64 마이크로 규격 핫스팟 매핑 (검과 손이 만나는 타깃 포인트 정렬)
        marginLeft: "-16px",
        marginTop: "-14px",
      }}
    >
      {/* 루크 스카이워커 멀티 컬러 SVG ㅋㅋ */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 40"
        className={`w-16 h-20 transition-all duration-150 ease-out origin-center ${isClicking ? "scale-90 rotate-12 translate-y-0.5" : "hover:scale-105"}`}
        style={{
          // 라이트세이버의 광선 효과만 산뜻하게 뿜어내도록 필터 처리
          filter: isHovered ? "drop-shadow(0 0 8px #10b981) drop-shadow(0 0 14px #22d3ee)" : "drop-shadow(0 0 4px rgba(52, 211, 153, 0.5))",
        }}
      >
        {/* 1. 초록색 라이트세이버 (광선검 코어 & 에너지 오라) */}
        <path d="M24 2l-7 11h1.5L25.5 2z" fill="#4ade80" />
        <path d="M23.8 2.5l-6.5 10.2h0.8L24.6 2.5z" fill="#ffffff" />
        {/* 2. 살색 파트 (얼굴 및 손) */}
        <circle cx="16" cy="12.5" r="2" fill="#fbcfe8" /> {/* 얼굴 베이스 */}
        <path d="M11.5 17.5l-.5.8.8.4.5-.8zm9 0l-.5.8.8.4.5-.8z" fill="#fbcfe8" /> {/* 손매듭 */}
        {/* 3. 제다이 시그니처 금발 머리 (Hair) */}
        <path d="M14 10.5c.5-.5 1.5-.7 2-.7s1.5.2 2 .7c.4.4.4 1 0 1.4-.3.3-1 .4-2 .4s-1.7-.1-2-.4c-.4-.4-.4-1 0-1.4z" fill="#fde047" />
        {/* 4. 몸통 */}
        <path d="M12 15.2h8v8h-8z" fill="#f5e0c3" />
        {/* 5. 복장 (Robe - 상/하의) */}
        {/* 베이지 가운 상의 */}
        <path d="M13 14.5c-1.2.4-2 1.2-2.5 2.5l-1 4.5h3.5v-4l1.5-1.5z" fill="#f5e0c3" />
        <path d="M19 14.5c1.2.4 2 1.2 2.5 2.5l1 4.5H19v-4l-1.5-1.5z" fill="#f5e0c3" />
        {/* 내부 튜닉 타이 조각 */}
        <path d="M15 14.5h2v3h-2z" fill="#e7d4b4" />
        {/* 6. 가죽 벨트 파트 (Belt) */}
        <path d="M12.5 21.5h7v1.8h-7z" fill="#78350f" />
        {/* 벨트 버클 포인트 */}
        <rect x="15.2" y="21.8" width="1.6" height="1.2" fill="#a1a1aa" />
        {/* 7. 하의 바지 및 부츠 (Pants & Boots) */}
        {/* 바지 춤 */}
        <path d="M13 23.3h6v4.2h-6z" fill="#e7d4b4" />
        {/* 다크 브라운 가죽 부츠 */}
        <path d="M13 27.5h2.2V32H13zm3.8 0H19V32h-2.2z" fill="#451a03" />
        {/* 8. 디테일 페이스 라인 묘사 (눈빛) */}
        <circle cx="15.2" cy="12.3" r="0.4" fill="#1e293b" />
        <circle cx="16.8" cy="12.3" r="0.4" fill="#1e293b" />
      </svg>
    </div>
  )
}
