import OrbitPlanet from "../components/main/OrbitPlanet"
import GroguSvg from "../assets/svg/GroguSvg"

export default function LukePage() {
  return (
    // 레트로 모눈종이 격자 베이스
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden font-mono text-slate-900 select-none">
      {/* 📊 주황빛/회색빛 도트 그리드 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#475569_1px,transparent_1px),linear-gradient(to_bottom,#475569_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20 pointer-events-none z-0" />

      {/* 🕹️ 콕핏 전체를 채우는 픽셀 컴포넌트 그리드 배치 */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full px-6 pointer-events-auto">
        {/* ===================================================
           1. 키보드 컨트롤러 팩 (라벨링 가이드)
           =================================================== */}
        <div className="bg-purple-300 border-4 border-slate-950 p-4 shadow-[6px_6px_0px_0px_#0f172a] flex flex-col justify-between h-64">
          <div className="grid grid-cols-4 gap-2">
            {["TAB", "UP", "↑", "ALT", "←", "FN", "→", "UP"].map((key, i) => (
              <div key={i} className="bg-amber-50 border-2 border-slate-950 text-[10px] font-black py-1 text-center shadow-[2px_2px_0px_0px_#0f172a]">
                {key}
              </div>
            ))}
          </div>
          <div className="bg-amber-50 border-2 border-slate-950 text-center py-1.5 text-xs font-black shadow-[2px_2px_0px_0px_#0f172a] uppercase tracking-widest">COCKPIT INITIALIZED</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-amber-50 border-2 border-slate-950 text-[9px] font-black py-1 text-center shadow-[2px_2px_0px_0px_#0f172a]">CAPS</div>
            <div className="bg-amber-50 border-2 border-slate-950 text-[9px] font-black py-1 text-center shadow-[2px_2px_0px_0px_#0f172a]">ENTER</div>
          </div>
        </div>

        {/* ===================================================
           2. 비디오 플레이어 스타일 메인 스크린 (그로구 코어)
           =================================================== */}
        <div className="bg-amber-50 border-4 border-slate-950 shadow-[6px_6px_0px_0px_#0f172a] flex flex-col h-64 overflow-hidden">
          {/* 상단 윈도우 바 */}
          <div className="bg-cyan-400 border-b-4 border-slate-950 px-3 py-1 flex items-center justify-between">
            <span className="text-[10px] font-black tracking-wider">■ GROGU_HOLOGRAM.EXE</span>
            <div className="flex space-x-1">
              <div className="w-3 h-1 bg-slate-950" />
              <div className="w-3 h-3 border-2 border-slate-950 bg-white" />
            </div>
          </div>

          {/* 격자 무늬 스크린 내부 */}
          <div className="flex-1 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:1rem_1rem] flex flex-col items-center justify-center relative p-4">
            <div className="relative hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer drop-shadow-[0_4px_0px_rgba(0,0,0,0.1)]">
              <GroguSvg size={84} />
            </div>
            <h1 className="text-xl font-black tracking-widest mt-2 bg-slate-950 text-emerald-400 px-2 py-0.5 text-center text-sm">SKYWALKER</h1>
          </div>

          {/* 비디오 타임라인 바 묘사 */}
          <div className="bg-pink-200 border-t-4 border-slate-950 p-1.5 flex items-center space-x-2">
            <div className="w-3 h-3 bg-cyan-400 border-2 border-slate-950" />
            <div className="flex-1 h-2 bg-slate-300 border-2 border-slate-950 relative">
              <div className="absolute top-0 left-0 bottom-0 w-1/3 bg-purple-500" />
              <div className="absolute top-[-4px] left-1/3 w-1.5 h-4 bg-slate-950" />
            </div>
          </div>
        </div>

        {/* ===================================================
           3. 노티피케이션 & 미니 PC 인터페이스 패널
           =================================================== */}
        <div className="bg-purple-200 border-4 border-slate-950 p-4 shadow-[6px_6px_0px_0px_#0f172a] flex flex-col justify-between h-64">
          <div className="flex justify-between items-start">
            <div className="bg-amber-100 border-2 border-slate-950 p-2 text-[10px] font-black shadow-[2px_2px_0px_0px_#0f172a] relative">
              ✉️ MESSAGES
              <span className="absolute -top-2.5 -right-2.5 bg-red-500 text-white text-[9px] font-black px-1 border-2 border-slate-950 rounded-full animate-bounce">10</span>
            </div>
            <div className="bg-white border-2 border-slate-950 px-2 py-1 text-[10px] font-black shadow-[2px_2px_0px_0px_#0f172a]">HELLO :)</div>
          </div>

          {/* 미니 구형 PC 목업 데코 */}
          <div className="flex items-center space-x-3 bg-amber-50 border-2 border-slate-950 p-2 shadow-[2px_2px_0px_0px_#0f172a]">
            <div className="w-10 h-8 bg-cyan-400 border-2 border-slate-950 flex items-center justify-center text-xs">☺</div>
            <div className="flex-1 text-[10px] font-black text-slate-700">
              SYS_DRIVE: READY
              <br />
              CRITICAL: NONE
            </div>
          </div>

          <div className="text-[9px] font-black tracking-widest text-slate-500 bg-slate-950/5 p-1 text-center border border-dashed border-slate-400">// WARP DRIVE COCKPIT</div>
        </div>

        {/* ===================================================
           4. BELIEVE 팝업 스타일 수동 기믹 창
           =================================================== */}
        <div className="bg-amber-50 border-4 border-slate-950 shadow-[6px_6px_0px_0px_#0f172a] flex flex-col h-48 overflow-hidden">
          <div className="bg-cyan-400 border-b-4 border-slate-950 px-3 py-1 flex items-center justify-between">
            <span className="text-[10px] font-black tracking-wider">■ WARP_ALERT</span>
            <span className="text-xs font-black">_ □ X</span>
          </div>
          <div className="flex-1 p-4 flex flex-col justify-between items-center bg-amber-50/50">
            <span className="text-xs font-black tracking-tighter text-slate-800 text-center">MAY THE FORCE BE WITH YOU</span>
            <div className="grid grid-cols-2 gap-3 w-full">
              <button className="bg-purple-300 border-2 border-slate-950 py-1 text-xs font-black shadow-[2px_2px_0px_0px_#0f172a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#0f172a] cursor-pointer">
                OK
              </button>
              <button className="bg-red-500 text-white border-2 border-slate-950 py-1 text-xs font-black shadow-[2px_2px_0px_0px_#0f172a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#0f172a] cursor-pointer">
                YES
              </button>
            </div>
          </div>
        </div>

        {/* ===================================================
           5. 로딩 인디케이터 윈도우 (진짜 워프 프로그레스 바)
           =================================================== */}
        <div className="bg-amber-50 border-4 border-slate-950 shadow-[6px_6px_0px_0px_#0f172a] flex flex-col h-48 overflow-hidden">
          <div className="bg-pink-300 border-b-4 border-slate-950 px-3 py-1 flex items-center justify-end">
            <span className="text-xs font-black">X</span>
          </div>
          <div className="flex-1 p-4 flex flex-col justify-center space-y-4">
            <div className="text-center font-black text-sm tracking-widest animate-pulse">LOADING STAGE...</div>
            <div className="w-full bg-slate-100 border-4 border-slate-950 p-0.5">
              <div className="h-5 bg-red-500 border-r-4 border-slate-950 w-3/4 bg-[linear-gradient(45deg,#b91c1c_25%,transparent_25%,transparent_50%,#b91c1c_50%,#b91c1c_75%,transparent_75%,transparent)] bg-[size:1rem_1rem] animate-[pulse_1s_infinite]" />
            </div>
          </div>
        </div>

        {/* ===================================================
           6. 기계식 버튼으로 리턴즈한 행성 선택기!
           =================================================== */}
        <div className="bg-purple-100 border-4 border-slate-950 p-4 shadow-[6px_6px_0px_0px_#0f172a] flex flex-col justify-between h-48">
          <div className="text-[10px] font-black text-purple-800 bg-purple-300/50 border border-purple-400 px-2 py-0.5 text-center">SELECT HYPER DESITINATION</div>

          {/* 가로로 완벽하게 배치된 실전 행성 스위치 기믹 */}
          <div className="grid grid-cols-3 gap-2">
            {/* LUKE 기계식 스위치 버튼 */}
            <div className="bg-white border-3 border-slate-950 p-2 shadow-[3px_3px_0px_0px_#0f172a] hover:shadow-[0px_0px_0px_0px_#0f172a] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-75 cursor-pointer flex flex-col items-center justify-center">
              <OrbitPlanet to="/timer" label="ST_01" />
              <span className="text-[9px] font-black text-cyan-600 mt-1">LUKE</span>
            </div>

            {/* C-3PO 기계식 스위치 버튼 */}
            <div className="bg-white border-3 border-slate-950 p-2 shadow-[3px_3px_0px_0px_#0f172a] hover:shadow-[0px_0px_0px_0px_#0f172a] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-75 cursor-pointer flex flex-col items-center justify-center">
              <OrbitPlanet to="/bucket" label="ST_02" />
              <span className="text-[9px] font-black text-amber-600 mt-1">C-3PO</span>
            </div>

            {/* R2-D2 기계식 스위치 버튼 */}
            <div className="bg-white border-3 border-slate-950 p-2 shadow-[3px_3px_0px_0px_#0f172a] hover:shadow-[0px_0px_0px_0px_#0f172a] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-75 cursor-pointer flex flex-col items-center justify-center">
              <OrbitPlanet to="/log" label="ST_03" />
              <span className="text-[9px] font-black text-pink-600 mt-1">R2-D2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
