// src/pages/MainPage.tsx
import OrbitPlanet from "../components/main/OrbitPlanet"
import GroguSvg from "../assets/svg/GroguSvg"

export default function MainPage() {
  return (
    // 배경판
    <div className="relative flex h-screen w-full bg-slate-800 flex-col items-center justify-between overflow-hidden font-mono text-slate-900">
      {/* UPPER ZONE: 전방 콕핏 유리창 (그로구 코어) */}
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 pointer-events-auto select-none relative w-full">
        {/* 미세한 콕핏 타깃 조준선 가이드 */}
        <div className="absolute w-48 h-48 border-2 border-dashed border-slate-600/30 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none" />
        <div className="animate-bounce duration-1000 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]">
          <div className="hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer">
            <GroguSvg size={114} />
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-widest text-stone-100 drop-shadow-[0_3px_0px_rgba(15,23,42,1)]">SKYWALKER</h1>
          <p className="text-[11px] text-emerald-400 font-bold tracking-widest">Grogu is cute.</p>
        </div>
      </div>

      {/* LOWER ZONE: 하단 물리 제어 데스크 대시보드 */}
      <div className="relative z-10 w-full bg-purple-100 border-t-4 border-slate-900 py-16 px-6 shadow-[0_-8px_0px_0px_rgba(15,23,42,0.15)] pointer-events-auto flex flex-col items-center">
        {/* 패널 중앙 제어용 장식 바 */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-black px-4 py-0.5 rounded-full border-2 border-slate-900 tracking-widest uppercase">
          Warp Drive Console
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 max-w-4xl w-full">
          {/* LUKE 기계식 스위치 */}
          <div className="bg-white border-3 border-slate-900 rounded-xl p-4 min-w-68 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] hover:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150 flex items-center justify-between group/panel">
            <OrbitPlanet to="/timer" label="SYS_01" />
            <div className="text-right">
              <span className="text-xs font-black block text-slate-900">LUKE_MODULE</span>
              <span className="text-[9px] bg-cyan-100 text-cyan-700 font-bold px-1 rounded inline-block mt-1">READY</span>
            </div>
          </div>

          {/* C-3PO 기계식 스위치 */}
          <div className="bg-white border-3 border-slate-900 rounded-xl p-4 min-w-68 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] hover:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150 flex items-center justify-between group/panel">
            <OrbitPlanet to="/bucket" label="SYS_02" />
            <div className="text-right">
              <span className="text-xs font-black block text-slate-900">C-3PO_CORES</span>
              <span className="text-[9px] bg-amber-100 text-amber-700 font-bold px-1 rounded inline-block mt-1">ONLINE</span>
            </div>
          </div>

          {/* R2-D2 기계식 스위치 */}
          <div className="bg-white border-3 border-slate-900 rounded-xl p-4 min-w-68 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] hover:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150 flex items-center justify-between group/panel">
            <OrbitPlanet to="/log" label="SYS_03" />
            <div className="text-right">
              <span className="text-xs font-black block text-slate-900">R2-D2_DRIVE</span>
              <span className="text-[9px] bg-pink-100 text-pink-700 font-bold px-1 rounded inline-block mt-1">STANDBY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
