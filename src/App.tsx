import { Outlet, useLocation } from "react-router-dom"
import { useEffectStore } from "./store/useEffectStore"
import StarfieldEffect from "./components/common/StarfieldEffect"
import LukeFullColorCursor from "./components/common/LuckFullColorCursor"
import DesktopMenu from "./components/DesktopMenu"
import { useState } from "react"

function App() {
  const { isStarfieldEnabled, isSpecialCursorEnabled } = useEffectStore()
  const location = useLocation()
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 모달이 열리면 강력한 cursor-none !important 스타일을 React 레벨에서 무력화
  const shouldApplyCursorNone = isSpecialCursorEnabled && !isModalOpen

  return (
    // h-screen 대신 min-h-screen로 함. 모바일에서 컨텐츠가 길어지면 아래로 시원하게 스크롤이 열리도록 함
    // 데스크탑 환경(md:)에서만 원래 의도대로 h-screen(화면 꽉 채움)과 overflow-hidden이 작동하도록 제어.
    <div className={`relative w-full min-h-screen md:h-screen text-stone-100 overflow-x-hidden overflow-y-auto md:overflow-hidden select-none ${shouldApplyCursorNone ? "cursor-none" : ""}`}>
      {/* 자식 컴포넌트들이 부모의 높이를 유연하게 따라가도록 h-full 대신 min-h-screen md:h-full로 유연성 줌. */}
      <div className="relative z-10 w-full min-h-screen md:h-full">
        <Outlet />
      </div>

      {/* 메인페이지에서는 안 뜨게 하려는 목적 + useLocation */}
      {location.pathname !== "/" && <DesktopMenu setIsModalOpen={setIsModalOpen} />}

      {/* 마우스 이펙트 레이어: pointer: fine (마우스 사용 기기) 일 때만 보이도록 하거나 컴포넌체 내부에서 처리하는 것을 권장하며, 모바일 터치 오작동을 최소화하기 위해 전반적 레이어는 유지 */}
      <div className="absolute inset-0 z-9999 pointer-events-none hidden md:block">
        {isStarfieldEnabled && <StarfieldEffect />}
        {isSpecialCursorEnabled && <LukeFullColorCursor />}
      </div>

      {/* CSS 미디어 쿼리를 추가하여 모바일(터치 기기)에서는 커서 숨김 처리가 강제 적용되지 않도록 가드 추가 */}
      <style>{`
        @media (pointer: fine) {
          .cursor-none, .cursor-none * { cursor: none !important; }
        }
      `}</style>
    </div>
  )
}

export default App
