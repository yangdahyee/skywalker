// src/components/DesktopMenu.tsx
import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { gsap } from "gsap"

interface DesktopMenuProps {
  setIsModalOpen: (isOpen: boolean) => void
}

export default function DesktopMenu({ setIsModalOpen }: DesktopMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    setIsModalOpen(isOpen)
  }, [isOpen, setIsModalOpen])

  const handleSingleClick = () => {
    if (isOpen) return
    setIsOpen(true)

    setTimeout(() => {
      if (modalRef.current) {
        gsap.fromTo(modalRef.current, { scale: 0.3, opacity: 0, y: 50 }, { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" })
      }
    }, 10)
  }

  // ❌ 윈도우 폴더 창 닫기 애니메이션
  const handleClose = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        scale: 0.5,
        opacity: 0,
        y: 30,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => setIsOpen(false),
      })
    }
  }

  const handleNavigate = (path: string) => {
    navigate(path)
    setIsOpen(false) // 이동 완료 후 폴더 레이어 닫기
  }

  return (
    <>
      {/* 📺 1. 화면 좌측 상단 미니 CRT 컴퓨터 아이콘 (원 클릭 이벤트 바인딩) */}
      <div className="fixed top-6 left-6 z-9999 pointer-events-none">
        <div
          onClick={handleSingleClick}
          className="pointer-events-auto w-20 flex flex-col items-center p-2 rounded-xl border-2 border-dashed border-slate-900/10 bg-[#FFFDF9]/80 backdrop-blur-sm shadow-[4px_4px_0px_rgba(15,23,42,0.1)] hover:bg-[#FFFDF9] hover:border-[#4ECDC4] cursor-pointer group transition-all"
          title="클릭 시 전체 메뉴 파일 시스템 오픈!"
        >
          {/* CRT 모니터 미니 일러스트 */}
          <div className="w-10 h-10 text-[#DCE1E9] group-hover:scale-110 transition-transform filter drop-shadow-[1px_2px_0px_rgba(0,0,0,1)]">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect x="15" y="15" width="70" height="52" fill="#DCE1E9" stroke="#1A1A1A" strokeWidth="5" rx="6" />
              <rect x="22" y="21" width="56" height="38" fill="#1E293B" stroke="#1A1A1A" strokeWidth="4" rx="2" />
              <circle cx="74" cy="60" r="3" fill="#4ECDC4" />
              <polygon points="40,67 60,67 65,78 35,78" fill="#94a3b8" stroke="#1A1A1A" strokeWidth="4" />
              <rect x="25" y="78" width="50" height="8" fill="#DCE1E9" stroke="#1A1A1A" strokeWidth="4" rx="2" />
            </svg>
          </div>
          <span className="text-[8px] font-black font-mono text-[#1E293B] bg-[#4ECDC4] px-1 rounded-sm mt-1 border border-slate-900 shadow-[1px_1px_0px_rgba(0,0,0,1)] tracking-wider">MENU.EXE</span>
        </div>
      </div>

      {/* 📂 2. 글로벌 오버레이 대시보드 모달 */}
      {isOpen && (
        // cursor-default와 style 지정을 통해 모달 내부에서는 무조건 "일반 커서"가 강제 출력
        <div className="fixed inset-0 bg-slate-950/40 z-99999 backdrop-blur-sm flex items-center justify-center font-mono cursor-default" style={{ cursor: "default" }}>
          <div
            ref={modalRef}
            className="bg-[#FFFDF9] border-[4px] border-slate-900 rounded-2xl p-1 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] w-[460px] flex flex-col overflow-hidden opacity-0 select-none text-slate-900"
          >
            {/* 상단 윈도우 컨트롤 헤더 */}
            <div className="bg-slate-900 text-[#FDF2E9] text-[11px] font-black px-4 py-2 flex items-center justify-between tracking-widest">
              <span>📂 SPACE_OS_HUD:\PROJECTS_MENU</span>
              <button
                onClick={handleClose}
                className="bg-[#FF6B6B] border-2 border-slate-900 text-slate-950 font-black text-[12px] w-6 h-6 flex items-center justify-center rounded shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] hover:bg-rose-500 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
              >
                ×
              </button>
            </div>

            {/* 윈도우 폴더 내부 링크 보드 (💡 아이콘 4개 정렬을 위해 grid-cols-4 로 안전 리모델링!) */}
            <div className="p-4 bg-[#FDF2E9] bg-[linear-gradient(to_right,#EDD9C4_1px,transparent_1px),linear-gradient(to_bottom,#EDD9C4_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] min-h-[220px] grid grid-cols-4 gap-2 items-start">
              {/* 링크 4: 메인 기지 홈 화면 이동 (/) */}
              <div
                onClick={() => handleNavigate("/")}
                className="flex flex-col items-center p-3 border-2 border-dashed border-transparent hover:border-slate-900 hover:bg-[#FFFDF9] rounded-xl cursor-pointer transition-all group"
              >
                <div className="w-11 h-11 text-[#FFD166] group-hover:scale-110 transition-transform filter drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* 레트로 네오-브루탈리즘 스타일 도트 집(Home) 아이콘 */}
                    <polygon points="50,12 12,46 22,46 22,88 40,88 40,60 60,60 60,88 78,88 78,46 88,46" fill="#FFD166" stroke="#1A1A1A" strokeWidth="4" strokeLinejoin="round" />
                    {/* 굴뚝 포인트 */}
                    <rect x="66" y="22" width="8" height="14" fill="#FFD166" stroke="#1A1A1A" strokeWidth="3" />
                  </svg>
                </div>
                <span className="text-[9px] font-black mt-2 text-slate-800 bg-white border border-slate-900 px-1 py-0.5 rounded shadow-[1px_1px_0px_rgba(0,0,0,1)] text-center w-full truncate">
                  메인 기지
                </span>
              </div>

              {/* 링크 1: */}
              <div
                onClick={() => handleNavigate("/timer")} //
                className="flex flex-col items-center p-3 border-2 border-dashed border-transparent hover:border-slate-900 hover:bg-[#FFFDF9] rounded-xl cursor-pointer transition-all group"
              >
                <div className="w-11 h-11 text-[#FFC5D3] group-hover:scale-110 transition-transform filter drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path d="M 20,10 L 65,10 L 80,25 L 80,90 L 20,90 Z" fill="#FFC5D3" stroke="#1A1A1A" strokeWidth="4" />
                    <polygon points="65,10 65,25 80,25" fill="#FFFDF9" stroke="#1A1A1A" strokeWidth="3" />
                    <line x1="32" y1="45" x2="68" y2="45" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
                    <line x1="32" y1="60" x2="55" y2="60" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-[9px] font-black mt-2 text-slate-800 bg-white border border-slate-900 px-1 py-0.5 rounded shadow-[1px_1px_0px_rgba(0,0,0,1)] text-center w-full truncate">
                  디자인 참고
                </span>
              </div>

              {/* 링크 2: */}
              <div
                onClick={() => handleNavigate("/log")}
                className="flex flex-col items-center p-3 border-2 border-dashed border-transparent hover:border-slate-900 hover:bg-[#FFFDF9] rounded-xl cursor-pointer transition-all group"
              >
                <div className="w-11 h-11 text-[#C5B4E3] group-hover:scale-110 transition-transform filter drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path d="M 20,10 L 65,10 L 80,25 L 80,90 L 20,90 Z" fill="#C5B4E3" stroke="#1A1A1A" strokeWidth="4" />
                    <polygon points="65,10 65,25 80,25" fill="#FFFDF9" stroke="#1A1A1A" strokeWidth="3" />
                    <line x1="32" y1="45" x2="68" y2="45" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
                    <line x1="32" y1="60" x2="55" y2="60" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-[9px] font-black mt-2 text-slate-800 bg-white border border-slate-900 px-1 py-0.5 rounded shadow-[1px_1px_0px_rgba(0,0,0,1)] text-center w-full truncate">
                  간식 타임
                </span>
              </div>

              {/* 링크 3: */}
              <div
                onClick={() => handleNavigate("/bucket")}
                className="flex flex-col items-center p-3 border-2 border-dashed border-transparent hover:border-slate-900 hover:bg-[#FFFDF9] rounded-xl cursor-pointer transition-all group"
              >
                <div className="w-11 h-11 text-[#FF6B6B] group-hover:scale-110 transition-transform filter drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <rect x="15" y="20" width="70" height="60" fill="#FF6B6B" stroke="#1A1A1A" strokeWidth="4" rx="4" />
                    <path d="M 25,35 Q 50,65 75,35" fill="none" stroke="#FFF" strokeWidth="4" />
                    <circle cx="50" cy="55" r="5" fill="#FFD166" stroke="#1A1A1A" strokeWidth="2" />
                  </svg>
                </div>
                <span className="text-[9px] font-black mt-2 text-slate-800 bg-white border border-slate-900 px-1 py-0.5 rounded shadow-[1px_1px_0px_rgba(0,0,0,1)] text-center w-full truncate">
                  그로구 픽
                </span>
              </div>

              {/* 링크 4: */}
              <div
                onClick={() => handleNavigate("/chewbacca")}
                className="flex flex-col items-center p-3 border-2 border-dashed border-transparent hover:border-slate-900 hover:bg-[#FFFDF9] rounded-xl cursor-pointer transition-all group"
              >
                <div className="w-11 h-11 text-[#c9ff6b] group-hover:scale-110 transition-transform filter drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path d="M 20,10 L 65,10 L 80,25 L 80,90 L 20,90 Z" fill="#C5B4E3" stroke="#1A1A1A" strokeWidth="4" />
                    <polygon points="65,10 65,25 80,25" fill="#FFFDF9" stroke="#1A1A1A" strokeWidth="3" />
                    <line x1="32" y1="45" x2="68" y2="45" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
                    <line x1="32" y1="60" x2="55" y2="60" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-[9px] font-black mt-2 text-slate-800 bg-white border border-slate-900 px-1 py-0.5 rounded shadow-[1px_1px_0px_rgba(0,0,0,1)] text-center w-full truncate">
                  스탑워치
                </span>
              </div>
            </div>

            <div className="bg-slate-100 border-t-2 border-slate-900 p-2 text-[8px] font-bold text-slate-500 flex justify-between px-4">
              <span>SYSTEM: GLOBAL_NAV_ACTIVE</span>
              <span>ITEMS: 5</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
