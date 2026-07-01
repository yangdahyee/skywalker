import OrbitPlanet from "../components/main/OrbitPlanet"
import GroguSvg from "../assets/svg/GroguSvg"

export default function MainPage() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden  font-sans">
      {/* 좌측~중앙 메인 섹션 - 그로구와 메인 타이틀 디스플레이 */}
      {/* 행성이 오른쪽으로 빠지기 때문에, 살짝 왼쪽으로 마진(pr-32 등)을 주어 시각적 균형 */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center space-y-4 pointer-events-auto select-none md:pr-40 transition-all duration-500">
        <div className="relative animate-bounce duration-2000ms filter drop-shadow-[0_0_20px_rgba(52,211,153,0.35)]">
          <div className="absolute -inset-4 bg-emerald-400/10 rounded-full blur-2xl animate-pulse" />
          <div className="relative hover:scale-110 active:scale-95 transition-transform duration-300 cursor-pointer">
            <GroguSvg size={96} />
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-widest bg-linear-to-r from-stone-100 via-stone-200 to-stone-400 bg-clip-text text-transparent">SKYWALKER</h1>
          <p className="text-xs font-mono tracking-[0.3em] text-emerald-400 animate-pulse ">Grogu is cute.</p>
        </div>
      </div>
      {/* 오른쪽 사이드 내비게이션 바 */}
      {/* w-32(또는 w-36)로 가로 폭을 고정, pl-0 items-center로 정렬하여 텍스트가 튀어나와도 대칭이 깨지지 않게*/}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center w-36 space-y-12 pointer-events-auto border-l border-slate-700/30 py-12 bg-slate-900/5 rounded-2xl backdrop-blur-[2px]">
        {/* 터미널 인디케이터 라인  */}
        <div className="absolute top-0 left-0 w-0.75 h-8 bg-cyan-400/60 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-0.75 h-8 bg-pink-400/60 animate-pulse" />

        {/* 1. LUKE 포드 */}
        <div className="relative transition-all duration-300 hover:-translate-x-2 group/luke flex flex-col items-center justify-center w-full">
          <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-xl opacity-0 group-hover/luke:opacity-100 group-hover/luke:bg-cyan-500/20 transition-all duration-300 scale-75" />
          {/* 글자 위치를 패널 가로 폭 밖으로(right-36) 밀어내서 행성과 겹치지 않고 보기 좋게 정렬 */}
          <div className="absolute right-36 top-1/2 -translate-y-1/2 text-[10px] font-mono tracking-[0.2em] text-cyan-400 font-bold opacity-0 group-hover/luke:opacity-100 transition-all duration-300 translate-x-2 group-hover/luke:translate-x-0 whitespace-nowrap bg-slate-800/80 px-2 py-0.5 rounded-sm backdrop-blur-xs">
            [ SEC_01 // Luke Skywalker ]
          </div>
          <OrbitPlanet to="/timer" label="LUKE" />
        </div>

        {/* 2. C-3PO 포드 */}
        <div className="relative transition-all duration-300 hover:-translate-x-2 group/c3po flex flex-col items-center justify-center w-full">
          <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-xl opacity-0 group-hover/c3po:opacity-100 group-hover/c3po:bg-amber-500/20 transition-all duration-300 scale-75" />
          <div className="absolute right-36 top-1/2 -translate-y-1/2 text-[10px] font-mono tracking-[0.2em] text-amber-400 font-bold opacity-0 group-hover/c3po:opacity-100 transition-all duration-300 translate-x-2 group-hover/c3po:translate-x-0 whitespace-nowrap bg-slate-800/80 px-2 py-0.5 rounded-sm backdrop-blur-xs">
            [ SEC_02 // C-3PO ]
          </div>
          <OrbitPlanet to="/bucket" label="C-3PO" />
        </div>

        {/* 3. R2-D2 포드 */}
        <div className="relative transition-all duration-300 hover:-translate-x-2 group/r2d2 flex flex-col items-center justify-center w-full">
          <div className="absolute inset-0 bg-pink-500/10 rounded-full blur-xl opacity-0 group-hover/r2d2:opacity-100 group-hover/r2d2:bg-pink-500/20 transition-all duration-300 scale-75" />
          <div className="absolute right-36 top-1/2 -translate-y-1/2 text-[10px] font-mono tracking-[0.2em] text-pink-400 font-bold opacity-0 group-hover/r2d2:opacity-100 transition-all duration-300 translate-x-2 group-hover/r2d2:translate-x-0 whitespace-nowrap bg-slate-800/80 px-2 py-0.5 rounded-sm backdrop-blur-xs">
            [ SEC_03 // R2-D2 ]
          </div>
          <OrbitPlanet to="/log" label="R2-D2" />
        </div>
      </div>
    </div>
  )
}
