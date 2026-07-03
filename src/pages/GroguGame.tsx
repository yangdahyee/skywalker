// src/components/GroguGame.tsx
import { useState, useRef, useEffect } from "react"
import { gsap } from "gsap"

export default function GroguGame() {
  const [feedCount, setFeedCount] = useState(0)
  const [isChewing, setIsChewing] = useState(false)
  const [currentSnack, setCurrentSnack] = useState<"none" | "frog" | "macaron">("none")

  const groguRef = useRef<HTMLDivElement>(null)
  const flyingSnackRef = useRef<HTMLDivElement>(null)
  const heartContainerRef = useRef<HTMLDivElement>(null)

  const maxFeed = 5
  const isGameComplete = feedCount >= maxFeed
  const progressPercent = Math.min((feedCount / maxFeed) * 100, 100)

  // 게임 완료 시 하트 둥둥 애니메이션
  useEffect(() => {
    if (isGameComplete && heartContainerRef.current) {
      const hearts = heartContainerRef.current.querySelectorAll(".heart-sticker")

      hearts.forEach((heart, index) => {
        gsap.killTweensOf(heart)
        gsap.set(heart, {
          x: (index - 2) * 35 + Math.random() * 15,
          y: 40,
          scale: 0,
          opacity: 0,
        })

        gsap.to(heart, {
          y: -80,
          scale: index % 2 === 0 ? 1.2 : 0.9,
          opacity: 1,
          duration: 1.5 + Math.random() * 0.5,
          delay: index * 0.3,
          repeat: -1,
          ease: "power1.out",
          keyframes: [
            { opacity: 1, offset: 0.2 },
            { opacity: 0, offset: 0.9 },
          ],
        })
      })
    }
  }, [isGameComplete])

  const handleFeed = (type: "frog" | "macaron", e: React.MouseEvent<HTMLButtonElement>) => {
    if (isChewing || isGameComplete) return

    setIsChewing(true)
    setCurrentSnack(type)

    const buttonRect = e.currentTarget.getBoundingClientRect()
    const groguRect = groguRef.current?.getBoundingClientRect()

    if (!flyingSnackRef.current || !groguRect) return

    gsap.set(flyingSnackRef.current, {
      x: buttonRect.left - groguRect.left + 20,
      y: buttonRect.top - groguRect.top + 20,
      scale: 1,
      opacity: 1,
    })

    gsap.to(flyingSnackRef.current, {
      x: groguRect.width / 2 - 20,
      y: groguRect.height / 2 + 10,
      scale: 0.3,
      duration: 0.6,
      ease: "back.in(1.5)",
      onComplete: () => {
        gsap.set(flyingSnackRef.current, { opacity: 0 })
        setFeedCount((prev) => prev + 1)

        gsap.to(groguRef.current, {
          y: -15,
          duration: 0.15,
          yoyo: true,
          repeat: 3,
          ease: "power1.inOut",
          onComplete: () => {
            setIsChewing(false)
            setCurrentSnack("none")
          },
        })
      },
    })
  }

  const handleReset = () => {
    if (heartContainerRef.current) {
      const hearts = heartContainerRef.current.querySelectorAll(".heart-sticker")
      hearts.forEach((heart) => gsap.killTweensOf(heart))
    }
    setFeedCount(0)
    setIsChewing(false)
    setCurrentSnack("none")
  }

  return (
    <div className="fixed inset-0 z-[999] w-screen h-screen animate-starwars-wipe bg-[#0F172A] bg-[radial-gradient(#1E293B_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] font-mono overflow-hidden select-none flex flex-col items-center justify-center">
      {/* 📺 8비트 아케이드 기계 바디 */}
      <div className="bg-[#090D16] border-[4px] border-[#4ECDC4] rounded-2xl p-1 shadow-[0_0_30px_rgba(78,205,196,0.3),8px_8px_0px_0px_rgba(0,0,0,1)] w-[400px] flex flex-col relative overflow-hidden">
        {/* 상단 전광판 */}
        <div className="bg-[#1E293B] border-b-[4px] border-[#4ECDC4] text-[#4ECDC4] text-[11px] font-black px-4 py-2 flex items-center justify-between tracking-widest">
          <span className="animate-pulse">{isGameComplete ? "★ GAME OVER ★" : "👾 INSERT COIN [P1]"}</span>
          <button
            onClick={handleReset}
            className="bg-[#FF6B6B] border-2 border-slate-900 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            {isGameComplete ? "PLAY_AGAIN" : "1P_RESET"}
          </button>
        </div>

        {/* 🎮 내부 스크린 패널 영역 */}
        <div className="p-6 flex flex-col items-center justify-center min-h-[300px] bg-[#0D1527] relative border-b-[4px] border-[#4ECDC4] overflow-hidden">
          {/* 뒤쪽 배경 그리드 및 스캔라인 레이어 */}
          <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#16223F_1px,transparent_1px),linear-gradient(to_bottom,#16223F_1px,transparent_1px)] bg-[size:1.25rem_1.25rem]" />
          <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.22)_50%)] bg-[size:100%_4px] opacity-80" />

          {/* 💘 하트 레이더 팝업 컨테이너 */}
          <div ref={heartContainerRef} className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
            {isGameComplete &&
              [1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="heart-sticker absolute text-2xl filter drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                  {num % 2 === 0 ? "💖" : "💝"}
                </div>
              ))}
          </div>

          {/* 포스로 날아가는 간식 레이어 */}
          <div ref={flyingSnackRef} className="absolute pointer-events-none z-40 w-10 h-10 opacity-0 filter drop-shadow-[0_0_8px_currentColor]">
            {currentSnack === "frog" ? (
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#A5D6A7]">
                <ellipse cx="50" cy="50" rx="30" ry="25" fill="currentColor" stroke="#000" strokeWidth="5" />
                <circle cx="38" cy="35" r="5" fill="#000" />
                <circle cx="62" cy="35" r="5" fill="#000" />
              </svg>
            ) : (
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#4ECDC4]">
                <path d="M 15,45 C 15,15 85,15 85,45 Z" fill="currentColor" stroke="#000" strokeWidth="5" />
                <rect x="18" y="45" width="64" height="10" fill="#FFFDF9" stroke="#000" strokeWidth="3" />
              </svg>
            )}
          </div>

          {/* 👶 그로구 에셋 */}
          <div ref={groguRef} className="w-36 h-36 relative z-20">
            <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_12px_rgba(168,230,207,0.35)]">
              <path d="M 6,36 C 14,35 24,42 28,45 C 20,49 10,46 6,36 Z" fill="#FFAEC9" stroke="#1A1A1A" strokeWidth="2" />
              <path d="M 94,36 C 86,35 76,42 72,45 C 80,49 90,46 94,36 Z" fill="#FFAEC9" stroke="#1A1A1A" strokeWidth="2" />
              <path d="M 32,42 C 15,30 2,33 4,37 C 6,42 16,52 30,49 Z" fill="#A8E6CF" stroke="#1A1A1A" strokeWidth="3.5" />
              <path d="M 68,42 C 85,30 98,33 96,37 C 94,42 84,52 70,49 Z" fill="#A8E6CF" stroke="#1A1A1A" strokeWidth="3.5" />
              <ellipse cx="50" cy="45" rx="20" ry="15" fill="#A8E6CF" stroke="#1A1A1A" strokeWidth="3.5" />

              {/* 👁️👁️ 눈동자 가변 상태 */}
              {isGameComplete ? (
                <>
                  <path d="M 34,46 Q 41,38 46,46" fill="none" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
                  <path d="M 66,46 Q 59,38 54,46" fill="none" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
                </>
              ) : isChewing ? (
                <>
                  <path d="M 36,44 Q 41,40 45,46" fill="none" stroke="#1A1A1A" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M 64,44 Q 59,40 55,46" fill="none" stroke="#1A1A1A" strokeWidth="3.5" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <circle cx="42" cy="45" r="4.5" fill="#1A1A1A" />
                  <circle cx="40.5" cy="43.5" r="1.5" fill="#FFFFFF" />
                  <circle cx="58" cy="45" r="4.5" fill="#1A1A1A" />
                  <circle cx="56.5" cy="43.5" r="1.5" fill="#FFFFFF" />
                </>
              )}

              <path d="M 48,49 Q 50,47 52,49" fill="none" stroke="#1A1A1A" strokeWidth="2" />

              {/* 👄 입모양 가변 */}
              {isGameComplete ? (
                <path d="M 42,52 Q 50,62 58,52 Z" fill="#FF6B6B" stroke="#1A1A1A" strokeWidth="2.5" />
              ) : isChewing ? (
                <ellipse cx="50" cy="54" rx="4" ry="3" fill="#1A1A1A" />
              ) : (
                <path d="M 46,54 Q 50,56 54,54" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
              )}

              <path d="M 26,58 C 32,54 68,54 74,58 C 76,66 24,66 26,58 Z" fill="#F9E2AF" stroke="#1A1A1A" strokeWidth="3.5" />
              <path d="M 28,64 L 22,88 L 78,88 L 72,64 Z" fill="#EAD2AC" stroke="#1A1A1A" strokeWidth="3.5" />
              <path d="M 50,65 L 50,88" stroke="#1A1A1A" strokeWidth="2.5" />
            </svg>
          </div>

          {/* 전광판 대사 */}
          <div className="mt-5 bg-[#121B2E] border border-[#4ECDC4] text-[#FFD166] font-mono text-[10px] px-4 py-1.5 rounded-md tracking-widest text-center shadow-[0_0_10px_rgba(255,209,102,0.2)] z-20">
            {isGameComplete ? "💖 I LOVE YOU, LUKE! (행복) 💖" : isChewing ? ">> O NOM NOM NOM! <<" : "READY: FEED THE JEDI BABY"}
          </div>
        </div>

        {/* 하단 제어창 조이스틱 데스크 */}
        <div className="bg-[#121B2E] p-4 flex flex-col space-y-3">
          <div className="flex items-center justify-center space-x-6">
            <button
              onClick={(e) => handleFeed("frog", e)}
              disabled={isChewing || isGameComplete}
              className="w-24 bg-[#1E293B] border-2 border-[#A5D6A7] rounded-xl p-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] flex flex-col items-center active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-20 disabled:pointer-events-none hover:bg-slate-800 transition-all group"
            >
              <div className="w-8 h-8 text-[#A5D6A7] group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <ellipse cx="50" cy="50" rx="30" ry="25" fill="currentColor" stroke="#000" strokeWidth="4" />
                  <circle cx="38" cy="35" r="5" fill="#000" />
                  <circle cx="62" cy="35" r="5" fill="#000" />
                </svg>
              </div>
              <span className="text-[9px] font-black text-[#A5D6A7] mt-1.5 tracking-wider">개구리</span>
            </button>

            <button
              onClick={(e) => handleFeed("macaron", e)}
              disabled={isChewing || isGameComplete}
              className="w-24 bg-[#1E293B] border-2 border-[#4ECDC4] rounded-xl p-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] flex flex-col items-center active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-20 disabled:pointer-events-none hover:bg-slate-800 transition-all group"
            >
              <div className="w-8 h-8 text-[#4ECDC4] group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M 15,45 C 15,15 85,15 85,45 Z" fill="currentColor" stroke="#000" strokeWidth="4" />
                  <rect x="18" y="45" width="64" height="10" fill="#FFFDF9" stroke="#000" strokeWidth="3" />
                </svg>
              </div>
              <span className="text-[9px] font-black text-[#4ECDC4] mt-1.5 tracking-wider">마카롱</span>
            </button>
          </div>

          {/* 파워 게이지 바 */}
          <div className="flex items-center justify-between px-1 pt-1">
            <span className="text-[9px] font-black text-[#4ECDC4] tracking-wider">ENERGY_GAUGE:</span>
            <div className="w-44 h-4 bg-[#090D16] border-2 border-[#4ECDC4] rounded-sm overflow-hidden relative shadow-[inset_0_0_6px_rgba(0,0,0,0.8)]">
              <div className="h-full bg-gradient-to-r from-[#FF6B6B] to-[#FFD166] border-r-2 border-[#4ECDC4] transition-all duration-300" style={{ width: `${progressPercent}%` }} />
            </div>
            <span className="text-[9px] font-black text-[#000] bg-[#4ECDC4] px-1.5 py-0.5 rounded-sm">
              {feedCount}/{maxFeed}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
