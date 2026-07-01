import { Routes, Route, useLocation } from "react-router-dom"
import { useEffectStore } from "./store/useEffectStore"
import StarfieldEffect from "./components/common/StarfieldEffect"
import LukeFullColorCursor from "./components/common/LuckFullColorCursor"
import MainPage from "./pages/MainPage"
import LukePage from "./pages/LukePage"
import CartoonPage from "./pages/CartoonPage"
import GroguGame from "./pages/GroguGame"
import DesktopMenu from "./components/DesktopMenu"
import { useState } from "react"

function App() {
  const { isStarfieldEnabled, isSpecialCursorEnabled } = useEffectStore()
  const location = useLocation()
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 모달이 열리면 강력한 cursor-none !important 스타일을 React 레벨에서 무력화
  const shouldApplyCursorNone = isSpecialCursorEnabled && !isModalOpen

  return (
    <div className={`relative w-screen h-screen text-stone-100 overflow-hidden select-none ${shouldApplyCursorNone ? "cursor-none" : ""}`}>
      <div className="relative z-10 w-full h-full">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/timer" element={<LukePage />} />
          <Route path="/bucket" element={<CartoonPage />} />
          <Route path="/log" element={<GroguGame />} />
        </Routes>
      </div>

      {/* 메인페이지에서는 안 뜨게 하려는 목적 + useLocation */}
      {location.pathname !== "/" && <DesktopMenu setIsModalOpen={setIsModalOpen} />}

      {/* 마우스 이펙트 레이어를 z-9999로 묶어서 화면 가장 맨 앞으로 */}
      {/* pointer-events-none 덕분에 맨 위에 떠 있어도 밑에 있는 흰색 버튼 클릭을 방해 X. */}
      <div className="absolute inset-0 z-9999 pointer-events-none">
        {isStarfieldEnabled && <StarfieldEffect />}
        {isSpecialCursorEnabled && <LukeFullColorCursor />}
      </div>

      <style>{`
        .cursor-none, .cursor-none * { cursor: none !important; }
      `}</style>
    </div>
  )
}

export default App
