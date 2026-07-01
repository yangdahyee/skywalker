import { Routes, Route } from "react-router-dom"
import { useEffectStore } from "./store/useEffectStore"
import StarfieldEffect from "./components/common/StarfieldEffect"
import LukeFullColorCursor from "./components/common/LuckFullColorCursor"
import MainPage from "./pages/MainPage"
import LukePage from "./pages/LukePage"

function App() {
  const { isStarfieldEnabled, isSpecialCursorEnabled } = useEffectStore()

  return (
    <div className={`relative w-screen h-screen  text-stone-100 overflow-hidden select-none ${isSpecialCursorEnabled ? "cursor-none" : ""}`}>
      <div className="relative z-10 w-full h-full">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/timer" element={<LukePage />} />
        </Routes>
      </div>

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
