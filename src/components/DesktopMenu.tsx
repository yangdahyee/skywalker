// src/components/DesktopMenu.tsx
import { useState, useEffect } from "react"
import MenuModal from "./common/MenuModal"

interface DesktopMenuProps {
  setIsModalOpen: (isOpen: boolean) => void
}

export default function DesktopMenu({ setIsModalOpen }: DesktopMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  // 외부 레이어(예: 메인 대시보드 락)와 모달 오픈 상태를 계속 싱크
  useEffect(() => {
    setIsModalOpen(isOpen)
  }, [isOpen, setIsModalOpen])

  const handleSingleClick = () => {
    if (isOpen) return
    setIsOpen(true)
  }

  return (
    <>
      {/* 📺 md:block 가드를 통해 데스크톱(화면 크기 768px 이상)에서만 노출*/}
      <div className="hidden md:block fixed top-6 left-6 z-9999 pointer-events-none">
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

      {/* 📂 분리해 둔 공용 메뉴 모달 */}
      {isOpen && <MenuModal onClose={() => setIsOpen(false)} />}
    </>
  )
}
