// src/pages/CartoonPage.tsx
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"

gsap.registerPlugin(MotionPathPlugin)

export default function CartoonPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const spaceshipRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const planet1Ref = useRef<HTMLDivElement>(null)
  const planet2Ref = useRef<HTMLDivElement>(null)

  // 가상 스크롤 진행도 상태 (0 ~ 1)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // 🌌 전역 마우스 이펙트 레이어 fixed 격상
    const effectLayer = document.querySelector(".pointer-events-none.absolute.inset-0.z-\\[9999\\]") as HTMLDivElement
    if (effectLayer) {
      effectLayer.style.position = "fixed"
      effectLayer.style.zIndex = "99999"
    }

    // 브라우저 스크롤 잠금 (공백 현상 원천 차단)
    document.documentElement.style.overflow = "hidden"
    document.body.style.overflow = "hidden"

    if (!spaceshipRef.current || !pathRef.current) return

    // 1. 1920x1080 표준 해상도 기준 절대 좌표계 기반 타임라인 설정
    const tl = gsap.timeline({ paused: true })

    tl.to(
      spaceshipRef.current,
      {
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: 90,
        },
        duration: 2,
        ease: "none",
      },
      0,
    )

    // 행성 등장 시점 칼싱크 세팅 (20% 지점 / 65% 지점)
    tl.to(planet1Ref.current, { scale: 1, opacity: 1, duration: 0.2 }, 0.4).to(planet2Ref.current, { scale: 1, opacity: 1, duration: 0.2 }, 1.3)

    // 2. 가상 스크롤 휠 이벤트 핸들러
    let currentProgress = 0
    const handleWheel = (e: WheelEvent) => {
      const delta = e.deltaY * 0.0008 // 이 숫자를 낮추면 더 부드럽고 천천히 내려감
      currentProgress = Math.min(Math.max(currentProgress + delta, 0), 1)
      setProgress(currentProgress)

      gsap.to(tl, {
        progress: currentProgress,
        duration: 0.3,
        ease: "power1.out",
      })
    }

    window.addEventListener("wheel", handleWheel)

    return () => {
      window.removeEventListener("wheel", handleWheel)
    }
  }, [])

  return (
    // [안전 가드] z-[999]와 fixed inset-0으로 상위 레이어 간섭을 무조건 무력화하고 강제 출력
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999] w-screen h-screen bg-[#FDF2E9] bg-[linear-gradient(to_right,#EDD9C4_1px,transparent_1px),linear-gradient(to_bottom,#EDD9C4_1px,transparent_1px)] bg-[size:2rem_2rem] font-sans overflow-hidden select-none text-slate-900"
    >
      {/* 표준 1920x1080 viewBox 및 비율 강제 고정(none)으로 좌표계 NaN 깨짐 에러 방지 */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1920 1080" preserveAspectRatio="none">
        <path ref={pathRef} d="M 960,-50 C 600,300 1320,500 960,600 C 600,700 1320,900 960,1130" fill="none" stroke="#475569" strokeWidth="4" strokeDasharray="8,8" />
      </svg>

      {/* 레트로 스팟 1: 타투인 행성 */}
      <div
        ref={planet1Ref}
        className="absolute left-[20%] top-[34%] -translate-x-1/2 -translate-y-1/2 opacity-0 scale-50 transition-all duration-300 z-10 bg-[#C5B4E3] border-[3px] border-slate-900 rounded-xl p-1 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] w-44"
      >
        <div className="bg-slate-900 text-[#FDF2E9] text-[9px] font-mono px-2 py-0.5 rounded-t-lg flex items-center justify-between tracking-wider">
          <span>🪐 SYSTEM_01.EXE</span>
          <span className="text-[11px]">×</span>
        </div>
        <div className="bg-[#FFFDF9] border-t-[3px] border-slate-900 p-3 rounded-b-lg flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-200 to-orange-500 border-2 border-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)]" />
          <span className="text-[11px] font-black mt-2 tracking-widest text-slate-900">TATOOINE</span>
        </div>
      </div>

      {/* 레트로 스팟 2: 호스 기지 */}
      <div
        ref={planet2Ref}
        className="absolute left-[68%] top-[70%] -translate-x-1/2 -translate-y-1/2 opacity-0 scale-50 transition-all duration-300 z-10 bg-[#FFC5D3] border-[3px] border-slate-900 rounded-xl p-1 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] w-44"
      >
        <div className="bg-slate-900 text-[#FDF2E9] text-[9px] font-mono px-2 py-0.5 rounded-t-lg flex items-center justify-between tracking-wider">
          <span>❄️ SYSTEM_02.EXE</span>
          <span className="text-[11px]">×</span>
        </div>
        <div className="bg-[#FFFDF9] border-t-[3px] border-slate-900 p-3 rounded-b-lg flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-200 to-blue-500 border-2 border-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)]" />
          <span className="text-[11px] font-black mt-2 tracking-widest text-slate-900">HOTH_BASE</span>
        </div>
      </div>

      {/* X-WING SVG */}
      {/* 초기 마운트 시 렌더링 위치 튕김 현상을 막기 위해 initial absolute top 좌표 가드 채움 */}
      <div
        ref={spaceshipRef}
        className="absolute w-20 h-20 md:w-24 md:h-24 flex items-center justify-center filter drop-shadow-[4px_6px_0px_rgba(0,0,0,0.15)] z-50 pointer-events-none"
        style={{ position: "absolute", left: "50%", top: "-100px" }}
      >
        ;
        <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[4px_6px_0px_rgba(0,0,0,0.15)]">
          {/* 4가닥의 후방 엔진 추진 불꽃 (레트로 핑크/민트 레이저 감성 연출) */}
          <path d="M 22,75 L 22,88" stroke="#FF6B6B" strokeWidth="4" strokeLinecap="round" className="animate-pulse" />
          <path d="M 32,75 L 32,85" stroke="#4ECDC4" strokeWidth="3" strokeLinecap="round" />
          <path d="M 68,75 L 68,85" stroke="#4ECDC4" strokeWidth="3" strokeLinecap="round" />
          <path d="M 78,75 L 78,88" stroke="#FF6B6B" strokeWidth="4" strokeLinecap="round" className="animate-pulse" />
          {/* 🚀 상단/하단 X형 날개 (S-Foils) 및 레이저 포탑 주축 */}
          {/* 좌측 날개 세트 */}
          <path d="M 35,45 L 12,30 L 12,70 L 35,55 Z" fill="#DCE1E9" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
          <rect x="8" y="22" width="5" height="56" fill="#F4F4F9" stroke="#1A1A1A" strokeWidth="2.5" rx="1" />
          <line x1="10.5" y1="22" x2="10.5" y2="10" stroke="#1A1A1A" strokeWidth="2" /> {/* 레이저 포신 */}
          <path d="M 12,40 L 22,45 L 22,55 L 12,60" fill="none" stroke="#FFD166" strokeWidth="2.5" /> {/* 날개 포인트 데칼 */}
          {/* 우측 날개 세트 */}
          <path d="M 65,45 L 88,30 L 88,70 L 65,55 Z" fill="#DCE1E9" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
          <rect x="87" y="22" width="5" height="56" fill="#F4F4F9" stroke="#1A1A1A" strokeWidth="2.5" rx="1" />
          <line x1="89.5" y1="22" x2="89.5" y2="10" stroke="#1A1A1A" strokeWidth="2" /> {/* 레이저 포신 */}
          <path d="M 88,40 L 78,45 L 78,55 L 88,60" fill="none" stroke="#FFD166" strokeWidth="2.5" />
          {/* 🛩️ 메인 중앙 동체 (Fuselage Chassis) */}
          {/* 후방 엔진 벌크헤드 및 부스터 노즐 */}
          <rect x="38" y="62" width="24" height="14" fill="#94a3b8" stroke="#1A1A1A" strokeWidth="3" rx="2" />
          <circle cx="43" cy="76" r="4" fill="#1A1A1A" />
          <circle cx="57" cy="76" r="4" fill="#1A1A1A" />
          {/* 동체 메인 스트림라인 */}
          <path d="M 42,12 L 58,12 L 62,65 L 38,65 Z" fill="#F4F4F9" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
          {/* 전방 기수 콘 (Nose Cone) */}
          <path d="M 42,12 L 50,2 L 58,12 Z" fill="#FF6B6B" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
          {/* 🤖 조종석 후방 탑재형 R2-D2 아스트로멕 드로이드 슬롯 */}
          <circle cx="50" cy="40" r="3.5" fill="#4ECDC4" stroke="#1A1A1A" strokeWidth="2" />
          <rect x="48" y="42" width="4" height="2" fill="#1E293B" />
          {/* 🪟 기계식 콕핏 캐노피 (유리창 분할 라인 포함) */}
          <path d="M 45,22 L 55,22 L 57,34 L 43,34 Z" fill="#334155" stroke="#1A1A1A" strokeWidth="2.5" strokeLinejoin="round" />
          <line x1="50" y1="22" x2="50" y2="34" stroke="#64748b" strokeWidth="1.5" />
          {/* 동체 표면 디테일 라인 및 패널 기믹 장식 */}
          <line x1="42" y1="52" x2="58" y2="52" stroke="#1A1A1A" strokeWidth="2" />
          <rect x="46" y="56" width="8" height="5" fill="#FFD166" stroke="#1A1A1A" strokeWidth="2" rx="0.5" />
        </svg>
      </div>

      {/* 하단 상태 바 제어창 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#FFEAEA] border-[3px] border-slate-900 rounded-xl p-1 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex items-center space-x-3 px-4 py-2 z-50">
        <div className="text-[10px] font-mono font-black tracking-wider text-slate-800">DESCENT_PROGRESS: {Math.round(progress * 100)}%</div>
        <div className="w-32 h-4 bg-white border-2 border-slate-900 rounded-md overflow-hidden relative">
          <div className="h-full bg-[#FF6B6B] border-r-2 border-slate-900 transition-all duration-100" style={{ width: `${progress * 100}%` }} />
        </div>
        <div className="text-[9px] font-bold bg-slate-900 text-white px-1.5 py-0.5 rounded animate-pulse">{progress >= 1 ? "LANDED" : "DOWNWARD"}</div>
      </div>
    </div>
  )
}
