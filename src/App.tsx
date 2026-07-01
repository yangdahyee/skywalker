import GroguIcon from "./components/GroguIcon"

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-emerald-100/10 text-slate-800 antialiased px-4">
      {/* 메인 랜딩 콘텐츠 영역 */}
      <div className="flex flex-col items-center max-w-md w-full text-center space-y-8">
        {/* 통통 튀는 애니메이션(animate-bounce) */}
        <div className="animate-bounce duration-1000 iteration-count-infinite filter drop-shadow-[0_10px_15px_rgba(101,163,13,0.15)]">
          {/* 호버 및 액티브 마이크로 인터랙션 유지 */}
          <div className="hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer">
            <GroguIcon size={128} />
          </div>
        </div>

        {/* 타이틀 및 인사말 */}
        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Skywalker</h1>
          <p className="text-xl font-semibold text-emerald-600 tracking-wide animate-pulse">안녕하세요!</p>
          <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
            뭘 만들어 보면 좋을까요? <br />
          </p>
        </div>
      </div>

      {/* 하단 푸터 */}
      <footer className="absolute bottom-6 text-xs text-slate-400 tracking-wider font-mono">© {new Date().getFullYear()} SKYWALKER. PROJECT START.</footer>
    </div>
  )
}

export default App
