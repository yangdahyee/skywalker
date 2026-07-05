// src/pages/SignupPage.tsx
import { useNavigate } from "react-router-dom"
import { useSignup } from "../hooks/useSignup"

export default function SignupPage() {
  const navigate = useNavigate()
  const { email, password, confirmPassword, loading, message, setEmail, setPassword, setConfirmPassword, handleSignup } = useSignup()

  return (
    <div className="relative flex flex-col h-screen w-full items-center justify-center overflow-hidden bg-[#B2D0E5] select-none p-4 md:p-8 text-[#1A3A4B]">
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
            { cx: "10%", cy: "15%" },
            { cx: "90%", cy: "25%" },
            { cx: "80%", cy: "75%" },
            { cx: "20%", cy: "80%" },
          ].map((pt, i) => (
            <g
              key={i}
              className="opacity-20 origin-center animate-[pulse_4s_infinite_ease-in-out]"
              style={{
                transformOrigin: `${pt.cx} ${pt.cy}`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              <circle cx={pt.cx} cy={pt.cy} r="2" fill="#1A3A4B" />
              <line x1={pt.cx} y1={`${parseFloat(pt.cy) - 5}%`} x2={pt.cx} y2={`${parseFloat(pt.cy) + 5}%`} stroke="#1A3A4B" strokeWidth="0.7" />
              <line x1={`${parseFloat(pt.cx) - 3}%`} y1={pt.cy} x2={`${parseFloat(pt.cx) + 3}%`} y2={pt.cy} stroke="#1A3A4B" strokeWidth="0.7" />
            </g>
          ))}
        </svg>
      </div>

      {/* [PANEL] CENTER : SF 도면 큐브 스타일 회원가입 폼 */}
      <div className="relative z-30 max-w-md w-full border-2 border-[#1A3A4B] p-6 rounded-xl bg-[#A2C3DC]/40 backdrop-blur-xs shadow-inner overflow-hidden">
        <div className="text-center mb-6 border-b border-dashed border-[#1A3A4B]/30 pb-4">
          <div className="text-[10px] font-black tracking-[0.5em] text-[#2D4D5C] uppercase">SKYWALKER</div>
          <h2 className="text-xl font-black tracking-widest text-[#1A3A4B] mt-1">회원가입</h2>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* 입력 필드 01: 이메일 */}
          <div className="flex flex-col space-y-1">
            <label className="text-[9px] font-black tracking-wider text-[#2D4D5C]">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="id@skywalker.com"
              className="w-full bg-[#B8D4E8]/40 border border-[#1A3A4B]/60 rounded p-2 text-sm font-mono text-[#1A3A4B] placeholder-[#1A3A4B]/40 focus:outline-none focus:border-[#1A3A4B] transition-all"
            />
          </div>

          {/* 입력 필드 02: 비밀번호 */}
          <div className="flex flex-col space-y-1">
            <label className="text-[9px] font-black tracking-wider text-[#2D4D5C]">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-[#B8D4E8]/40 border border-[#1A3A4B]/60 rounded p-2 text-sm font-mono text-[#1A3A4B] placeholder-[#1A3A4B]/40 focus:outline-none focus:border-[#1A3A4B] transition-all"
            />
          </div>

          {/* 입력 필드 03: 비밀번호 확인 */}
          <div className="flex flex-col space-y-1">
            <label className="text-[9px] font-black tracking-wider text-[#2D4D5C]">비밀번호 확인</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-[#B8D4E8]/40 border border-[#1A3A4B]/60 rounded p-2 text-sm font-mono text-[#1A3A4B] placeholder-[#1A3A4B]/40 focus:outline-none focus:border-[#1A3A4B] transition-all"
            />
          </div>

          {/* 로그 디스플레이 */}
          {message && (
            <div
              className={`text-[10px] font-mono font-bold border p-2 rounded text-center transition-all ${
                message.type === "success" ? "bg-emerald-500/20 border-emerald-600 text-emerald-800" : "bg-orange-500/20 border-orange-600 text-orange-800"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* 버튼 액추에이터 */}
          <div className="pt-2 flex flex-col items-center">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full h-12 rounded-lg border-2 border-[#1A3A4B] flex items-center justify-center cursor-pointer transition-all active:scale-[0.98] bg-[#B8D4E8]/60 hover:bg-[#A6C9E2] disabled:opacity-50"
            >
              <div className="absolute inset-1 border border-dashed border-[#1A3A4B]/30 rounded-md" />
              <div className="absolute inset-1 flex items-center justify-center overflow-hidden pointer-events-none rounded-md">
                <div
                  className={`w-full h-full opacity-[0.12] bg-[linear-gradient(45deg,#1A3A4B_25%,transparent_25%,transparent_50%,#1A3A4B_50%,#1A3A4B_75%,transparent_75%,transparent)] bg-[size:0.4rem_0.4rem] ${
                    loading ? "animate-[pulse_1s_infinite]" : ""
                  }`}
                />
              </div>
              <div className="absolute z-10 font-black text-xs tracking-[0.25em]">{loading ? "CONFIGURING..." : "LAUNCH REGISTER"}</div>
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 px-1 text-[11px] font-bold text-[#2D4D5C] select-none">
            <span onClick={() => navigate("/login")} className="underline hover:text-[#1A3A4B] cursor-pointer transition-colors">
              로그인하기
            </span>
            <span onClick={() => navigate("/")} className="underline hover:text-[#1A3A4B] cursor-pointer transition-colors">
              메인 기지로 복귀
            </span>
          </div>
        </form>

        <div className="text-[8px] font-bold text-center text-[#1A3A4B]/50 tracking-tighter mt-4 border-t border-dashed border-[#1A3A4B]/20 pt-2">
          Authorized personnel only. Data encrypted via Supabase Node.
        </div>
      </div>

      <div className="absolute bottom-10 right-10 text-xl font-bold tracking-[0.25em] text-[#2D4D5C]/50 uppercase hidden md:block select-none pointer-events-none"></div>
    </div>
  )
}
