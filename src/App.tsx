import { useEffectStore } from "./store/useEffectStore"
import GroguIcon from "./components/GroguIcon"

import StarfieldEffect from "./components/common/StarfieldEffect"
import LukeFullColorCursor from "./components/common/LuckFullColorCursor"

function App() {
  const { isStarfieldEnabled, isSpecialCursorEnabled } = useEffectStore() // 마우스 효과들

  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-center bg-slate-800 text-stone-100 font-sans antialiased px-4 relative overflow-hidden select-none ${isSpecialCursorEnabled ? "cursor-none" : ""}`}
    >
      {/* Zustand 상태에 따른 조건부 렌더링 트리거 */}
      {isStarfieldEnabled && <StarfieldEffect />}
      {isSpecialCursorEnabled && <LukeFullColorCursor />}

      {/* 하위 컴포넌트까지 완벽하게 기본 마우스를 지워주는 글로벌 스타일 인젝션 */}
      <style>{`
        .cursor-none, .cursor-none * {
          cursor: none !important;
        }
      `}</style>

      {/* 메인 랜딩 콘텐츠 영역 */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center space-y-8">
        {/* 통통 튀는 애니메이션 (네온 에메랄드 드롭 섀도우로 보정) */}
        <div className="animate-bounce duration-1000 iteration-count-infinite filter drop-shadow-[0_10px_15px_rgba(16,185,129,0.25)]">
          {/* 호버 및 액티브 마이크로 인터랙션 */}
          <div className="hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer">
            <GroguIcon size={128} />
          </div>
        </div>

        {/* 타이틀 및 인사말 (사이버 펑크 네온 그라데이션 적용) */}
        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Skywalker</h1>
          <p className="text-xl font-semibold text-emerald-400 tracking-wide animate-pulse">안녕하세요!</p>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xs mx-auto">
            뭘 만들어 보면 좋을까요? <br />
          </p>
        </div>
      </div>

      {/* 하단 푸터 */}
      <footer className="absolute bottom-6 text-xs text-slate-500 tracking-wider font-mono z-10">© {new Date().getFullYear()} SKYWALKER. PROJECT START.</footer>
    </div>
  )
}

export default App
