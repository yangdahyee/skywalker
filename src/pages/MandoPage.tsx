import { useTimerViewModel } from "../hooks/useTimerViewModel"

export default function TimerPage() {
  // -----------------------------------------------------------------------
  // 커스텀 훅에서 정제된 데이터와 액션 리모컨만
  // -----------------------------------------------------------------------
  const { timeDisplay, swRunning, actionLabel, handleAction, handleReset } = useTimerViewModel()

  return (
    /**
     * =====================================================================
     * 베이스 톤 : 연한 매트 아쿠아 스킨 (#B2D0E5)
     * =====================================================================
     */
    <div className="relative flex flex-col h-screen w-full items-center justify-between overflow-hidden bg-[#B2D0E5] select-none p-4 md:p-8 text-[#1A3A4B]">
      {/* 아날로그 도면 종이 질감 오버레이 */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none z-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2D4D5C_1px,transparent_1px),linear-gradient(to_bottom,#2D4D5C_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-[0.07] pointer-events-none z-0" />

      {/* 프레임 치수 외곽선 가이드 */}
      <div className="absolute inset-4 border border-[#2D4D5C]/30 pointer-events-none z-20 rounded-sm" />
      <div className="absolute inset-6 border-2 border-[#1A3A4B]/60 pointer-events-none z-20 rounded-sm" />

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <svg className="w-full h-full opacity-40">
          {/* 도면 십자 좌표망 입자 */}
          {[
            { cx: "15%", cy: "20%" },
            { cx: "85%", cy: "18%" },
            { cx: "22%", cy: "45%" },
            { cx: "75%", cy: "40%" },
            { cx: "90%", cy: "55%" },
            { cx: "10%", cy: "62%" },
          ].map((pt, i) => (
            <g
              key={i}
              // transition과 함께 pulse 애니메이션을 부드러운 ease-in-out 주기로 적용
              // 각 별빛마다 인덱스(i)를 활용해 시작 시간에 약간의 딜레이를 주어 번갈아가며 은은하게 숨쉬도록 연출.
              className="opacity-20 origin-center animate-[pulse_4s_infinite_ease-in-out]"
              style={{
                transformOrigin: `${pt.cx} ${pt.cy}`, // 각 십자선의 중심을 기준으로 크기가 변하도록 고정
                animationDelay: `${i * 0.4}s`, // 입자들이 동시에 움직이지 않고 순차적으로 깜빡이도록 딜레이 분산
              }}
            >
              <circle cx={pt.cx} cy={pt.cy} r="2" fill="#1A3A4B" />
              <line x1={pt.cx} y1={`${parseFloat(pt.cy) - 5}%`} x2={pt.cx} y2={`${parseFloat(pt.cy) + 5}%`} stroke="#1A3A4B" strokeWidth="0.7" />
              <line x1={`${parseFloat(pt.cx) - 3}%`} y1={pt.cy} x2={`${parseFloat(pt.cx) + 3}%`} y2={pt.cy} stroke="#1A3A4B" strokeWidth="0.7" />
            </g>
          ))}
        </svg>
      </div>

      {/* ===================================================================
          [PANEL 01] TOP : R2-D2 
          =================================================================== */}
      <div className="relative z-30 flex flex-col items-center mt-7">
        <div className="relative flex items-center">
          <div className="absolute right-24 top-8 hidden md:flex items-center space-x-2 opacity-50">
            <span className="text-[9px] font-bold text-[#1A3A4B] uppercase whitespace-nowrap">MY NAME IS R2-D2</span>
            <div className="w-12 h-[1px] bg-[#1A3A4B]" />
          </div>

          <svg viewBox="0 0 64 48" className="w-20 h-16 drop-shadow-[0_4px_6px_rgba(0,0,0,0.2)]">
            <path d="M8,40 A24,24 0 0,1 56,40 Z" fill="#D2E4F2" stroke="#1A3A4B" strokeWidth="1.5" />
            <rect x="8" y="38" width="48" height="4" fill="#A8C5DB" stroke="#1A3A4B" strokeWidth="1.5" />
            <path d="M24,16 H40 V24 H24 Z" fill="#2D4D5C" />
            <rect x="14" y="28" width="6" height="6" fill="#2D4D5C" />
            <rect x="44" y="28" width="6" height="6" fill="#2D4D5C" />
            <circle cx="32" cy="24" r="5" fill="#0f172a" stroke="#1A3A4B" strokeWidth="1" />
            <circle cx="33" cy="23" r="1.5" fill="#B2D0E5" />
            <circle cx="20" cy="34" r="2" className={`${swRunning ? "fill-blue-500 animate-pulse" : "fill-blue-900/40"}`} />
          </svg>

          <div className="absolute left-24 top-8 hidden md:flex items-center space-x-2 opacity-50">
            <div className="w-12 h-[1px] bg-[#1A3A4B]" />
            <span className="text-[9px] font-bold text-[#1A3A4B] uppercase whitespace-nowrap">NICE TO MEET YOU</span>
          </div>
        </div>
        <h2 className="text-xs font-black tracking-[0.6em] text-[#2D4D5C] uppercase mt-2">DEEP SPACE</h2>
      </div>

      {/* ===================================================================
          [PANEL 02] CENTER : 플랫 스톱워치 뷰어
          =================================================================== */}
      <div className="relative z-30 flex flex-col items-center justify-center text-center w-full my-auto">
        <div className="text-[22px] font-black tracking-[0.4em] text-[#2D4D5C] uppercase">BEYOND THE</div>
        <div className="relative font-mono font-black select-all">
          <div className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-tighter font-black text-[#A1BCCF] absolute top-1 left-1 opacity-70">{timeDisplay}</div>
          <div className={`text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-tighter font-black transition-colors duration-500 ${swRunning ? "text-[#1E3E52]" : "text-[#2D4D5C]/90"}`}>
            {timeDisplay}
          </div>
        </div>

        <div className="text-[10px] sm:text-[11px] font-bold tracking-[0.3em] text-[#3B5B6E] uppercase mt-4 space-y-1">
          <p>R2-D2 SMART CHECK SYSTEM</p>
          <p className="opacity-50 text-[8px] tracking-[0.45em]">WHERE ARE YOU, C-3PO?</p>
        </div>
      </div>

      {/* ===================================================================
          [PANEL 03] BOTTOM : 라인 액추에이터 패널
          =================================================================== */}
      <div className="relative z-50 pb-16 pointer-events-auto w-full flex justify-center">
        {/* 기계 도해 외곽 가이드 박스 라인 */}
        <div className="border-2 border-[#1A3A4B] p-6 rounded-xl bg-[#A2C3DC]/40 backdrop-blur-xs max-w-md w-full shadow-inner relative overflow-hidden">
          <div className="grid grid-cols-2 gap-12 items-center justify-center px-4">
            {/* ⚡ 멀티펑셔널 액추에이터 (LAUNCH / STOP / RESTART) */}
            <div className="flex flex-col items-center space-y-2">
              <button
                onClick={handleAction}
                className="group relative w-16 h-16 rounded-full border-2 border-[#1A3A4B] flex items-center justify-center cursor-pointer transition-all active:scale-95 bg-[#B8D4E8]/50 hover:bg-[#A6C9E2]"
              >
                {/* 미세 내부 격자 동심원 라인 기믹 */}
                <div className="absolute inset-1 border border-dashed border-[#1A3A4B]/40 rounded-full" />
                <div className="absolute inset-2 border border-[#1A3A4B]/70 rounded-full flex items-center justify-center overflow-hidden">
                  {/* 가동 여부에 따라 빗금 패턴의 배경색 채도 변환 연출 */}
                  <div
                    className={`w-full h-full opacity-20 bg-[linear-gradient(45deg,#1A3A4B_25%,transparent_25%,transparent_50%,#1A3A4B_50%,#1A3A4B_75%,transparent_75%,transparent)] bg-[size:0.4rem_0.4rem] transition-colors ${
                      swRunning ? "bg-amber-500" : "bg-emerald-500"
                    }`}
                  />
                </div>

                {/* 기계 기호 디스플레이 (동작 중일 땐 일시정지[||], 대기/정지 중일 땐 재생[▶] 가이드) */}
                <div className="absolute z-10 text-[#1A3A4B] font-black text-xs">{swRunning ? "‖" : "▶"}</div>
              </button>
              {/* 실시간 유동 상태에 대응해 START ➡️ STOP ➡️ RESTART 라벨 자동 교체 */}
              <span className="text-[10px] font-black pt-1 text-[#1A3A4B] tracking-wide uppercase transition-all">{actionLabel}</span>
            </div>

            {/* 시스템 초기화 유닛 (RESET) */}
            <div className="flex flex-col items-center space-y-2">
              <button
                onClick={handleReset}
                className="group relative w-16 h-16 rounded-full border-2 border-[#1A3A4B] flex items-center justify-center cursor-pointer transition-all active:scale-95 bg-[#B8D4E8]/50 hover:bg-[#A6C9E2]"
              >
                <div className="absolute inset-1 border border-dashed border-[#1A3A4B]/40 rounded-full" />
                <div className="absolute inset-2 border border-[#1A3A4B]/70 rounded-full flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full opacity-20 bg-[linear-gradient(45deg,#1A3A4B_25%,transparent_25%,transparent_50%,#1A3A4B_50%,#1A3A4B_75%,transparent_75%,transparent)] bg-[size:0.4rem_0.4rem] bg-orange-500" />
                </div>
                {/* 리셋 순정 기호 (■) 마크 매립 */}
                <div className="absolute z-10 text-[#1A3A4B] font-black text-xs">■</div>
              </button>
              <span className="text-[10px] font-black pt-1 text-[#1A3A4B] tracking-wide uppercase">RESET</span>
            </div>
          </div>

          {/* 중앙 하단 가이드 마크 */}
          <div className="text-[8px] font-bold text-center text-[#1A3A4B]/50 tracking-tighter mt-4 border-t border-dashed border-[#1A3A4B]/20 pt-2">Press for Start, Pause, or Restart System</div>
        </div>
      </div>

      {/* 우측 하단 아카이빙 로고 */}
      <div className="absolute bottom-10 right-10 text-xl font-bold tracking-[0.25em] text-[#2D4D5C]/50 uppercase hidden md:block select-none pointer-events-none">STAR WARS</div>
    </div>
  )
}
