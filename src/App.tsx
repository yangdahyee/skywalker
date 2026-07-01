// src/App.tsx
import { Routes, Route } from "react-router-dom"
import { useEffectStore } from "./store/useEffectStore"
import StarfieldEffect from "./components/common/StarfieldEffect"
import LukeFullColorCursor from "./components/common/LuckFullColorCursor"
import MainPage from "./pages/MainPage"

function App() {
  const { isStarfieldEnabled, isSpecialCursorEnabled } = useEffectStore()

  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-center bg-slate-950 text-stone-100 font-sans antialiased px-4 relative overflow-hidden select-none ${isSpecialCursorEnabled ? "cursor-none" : ""}`}
    >
      {/* 🌌 전역 이펙트 완전체 배치 */}
      {isStarfieldEnabled && <StarfieldEffect />}
      {isSpecialCursorEnabled && <LukeFullColorCursor />}
      <style>{`
        .cursor-none, .cursor-none * { cursor: none !important; }
      `}</style>

      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </div>
  )
}

export default App
