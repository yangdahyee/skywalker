// src/pages/MainPage.tsx
import OrbitPlanet from "../components/main/OrbitPlanet"
import GroguSvg from "../assets/svg/GroguSvg"

export default function MainPage() {
  return (
    // 배경판: 모바일 환경에서 대시보드가 길어질 때를 대비해 md 미만에서는 스크롤이 가능하도록 구조 보완
    // justify-between을 지워 모바일에서 요소들이 화면 밖으로 넘치더라도 온전하게 스크롤 높이를 계산.
    <div className="relative flex min-h-screen md:h-screen w-full bg-slate-800 flex-col items-center overflow-y-auto md:overflow-hidden font-mono text-slate-900">
      {/* UPPER ZONE: 전방 콕핏 유리창 (그로구 코어) */}
      {/* flex-1이 모바일에서 화면을 억지로 늘리지 않도록 md:flex-1로 제한하고, 모바일 스크롤 시 찌그러짐 방지를 위해 flex-none을 추가 */}
      <div className="flex-none md:flex-1 flex flex-col items-center justify-center text-center space-y-3 pointer-events-auto select-none relative w-full py-12 md:py-0">
        {/* 미세한 콕핏 타깃 조준선 가이드 - 모바일에서는 조금 더 작게 조절 */}
        <div className="absolute w-36 h-36 md:w-48 md:h-48 border-2 border-dashed border-slate-600/30 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none" />
        <div className="animate-bounce duration-1000 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]">
          <div className="hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer">
            <GroguSvg size={114} />
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-black tracking-widest text-stone-100 drop-shadow-[0_3px_0px_rgba(15,23,42,1)]">SKYWALKER</h1>
          <p className="text-[11px] text-emerald-400 font-bold tracking-widest">Grogu is cute.</p>
        </div>
      </div>

      {/* LOWER ZONE: 하단 물리 제어 데스크 대시보드 */}
      {/* mt-auto를 md:mt-auto로 변경하여 모바일에서 강제 부착 현상을 해제하고, 모바일 바닥면 여백(pb-16) 확보 및 shrink-0을 추가해 잘림 해결 */}
      <div className="relative z-10 w-full bg-purple-100 border-t-4 border-slate-900 py-8 pb-16 px-4 md:py-16 md:px-6 shadow-[0_-8px_0px_0px_rgba(15,23,42,0.15)] pointer-events-auto flex flex-col items-center md:mt-auto shrink-0">
        {/* 패널 중앙 제어용 장식 바 */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-black px-4 py-0.5 rounded-full border-2 border-slate-900 tracking-widest uppercase whitelist">
          WELCOME TO MY SITE
        </div>

        {/* 모바일에서는 가로폭에 맞게 1줄 정렬, 태블릿 이상부터 정렬되도록 max-w 및 gap 최적화 */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 md:gap-8 max-w-7xl w-full">
          {" "}
          {/* max-w-4xl 에서 max-w-7xl로 수정 */}
          {/* LUKE 기계식 스위치 */}
          <div className="bg-white border-3 border-slate-900 rounded-xl p-4 w-full max-w-[280px] sm:w-auto sm:min-w-68 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] hover:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150 flex items-center justify-between group/panel">
            <OrbitPlanet to="/timer" label="SYS_01" />
            <div className="text-right">
              <span className="text-s font-black block text-slate-900">LUKE_MODULE</span>
              <span className="text-[11px] bg-cyan-100 text-cyan-700 font-bold px-1 rounded inline-block mt-1">READY</span>
            </div>
          </div>
          
          {/* C-3PO 기계식 스위치 */}
          <div className="bg-white border-3 border-slate-900 rounded-xl p-4 w-full max-w-[280px] sm:w-auto sm:min-w-68 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] hover:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150 flex items-center justify-between group/panel">
            <OrbitPlanet to="/bucket" label="SYS_02" />
            <div className="text-right">
              <span className="text-s font-black block text-slate-900">C-3PO_CORES</span>
              <span className="text-[11px] bg-amber-100 text-amber-700 font-bold px-1 rounded inline-block mt-1">ONLINE</span>
            </div>
          </div>

          {/* R2-D2 기계식 스위치 */}
          <div className="bg-white border-3 border-slate-900 rounded-xl p-4 w-full max-w-[280px] sm:w-auto sm:min-w-68 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] hover:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150 flex items-center justify-between group/panel">
            <OrbitPlanet to="/log" label="SYS_03" />
            <div className="text-right">
              <span className="text-s font-black block text-slate-900">R2-D2_DRIVE</span>
              <span className="text-[11px] bg-pink-100 text-pink-700 font-bold px-1 rounded inline-block mt-1">STANDBY</span>
            </div>
          </div>

          {/* CHEWBACCA 기계식 스위치 */}
          <div className="bg-white border-3 border-slate-900 rounded-xl p-4 w-full max-w-[280px] sm:w-auto sm:min-w-68 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] hover:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150 flex items-center justify-between group/panel">
            <OrbitPlanet to="/chewbacca" label="SYS_04" />
            <div className="text-right">
              <span className="text-s font-black block text-slate-900">CHEWBACCA_COIL</span>
              <span className="text-[11px] bg-yellow-100 text-yellow-700 font-bold px-1 rounded inline-block mt-1">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
