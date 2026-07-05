import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSignInWithPassword } from "../hooks/mutations/use-sign-in-with-password"

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { mutate, isPending, error } = useSignInWithPassword()

  // React 19 권장 사양 준수
  const handleLogin = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()

    // 오직 백그라운드 훅 레이어로 안전하게 데이터만 매핑하여 검증 요청
    mutate({ email, password })
  }

  return (
    // 레트로 윈도우 스타일의 베이지 톤 격자무늬(Grid) 배경
    <div
      className="relative min-h-screen bg-[#fdf6f0] flex items-center justify-center p-4 font-mono select-none"
      style={{ backgroundImage: "linear-gradient(#e5dec9 1px, transparent 1px), linear-gradient(90deg, #e5dec9 1px, transparent 1px)", backgroundSize: "20px 20px" }}
    >
      {/* 콕핏 윈도우 스타일 프레임 컨테이너 */}
      <div className="w-full max-w-md bg-[#e1d5f5] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-none overflow-hidden">
        {/* 상단 타이틀 바 */}
        <div className="bg-[#00e1f5] border-b-4 border-black px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-sm text-black uppercase tracking-wider">
            <span>■ 로그인</span>
          </div>
          <div className="flex gap-2 text-xs font-black text-black">
            <span>_</span>
            <span>□</span>
            <span className="cursor-pointer hover:text-red-500" onClick={() => navigate("/")}>
              X
            </span>
          </div>
        </div>

        {/* 내측 폼 패널 */}
        <div className="p-6 bg-[#fcfcfc] border-b-4 border-black">
          <div className="mb-6 p-3 bg-[#e1d5f5]/30 border-2 border-black text-center text-xs font-bold text-black uppercase tracking-tight">MAY THE FORCE BE WITH YOU</div>

          {/* 에러 발생 시 시스템 콕핏 오류창 활성화 */}
          {error && <div className="mb-4 p-3 bg-red-100 border-2 border-black text-red-700 text-xs font-black uppercase">🚨 {error.message}</div>}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* EMAIL INPUT */}
            <div>
              <label className="block text-xs font-black text-black uppercase tracking-wider mb-2">아이디</label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="SKYWALKER@HOLONET.COM"
                className="w-full bg-white border-4 border-black px-4 py-2 text-sm text-black font-bold uppercase placeholder-gray-400 focus:outline-none focus:bg-yellow-50/50 rounded-none transition-colors"
              />
            </div>

            {/* PASSWORD INPUT */}
            <div>
              <label className="block text-xs font-black text-black uppercase tracking-wider mb-2">비밀번호</label>
              {/* autoComplete 속성을 더해 브라우저 DOM 경고를 원천 차단 */}
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full bg-white border-4 border-black px-4 py-2 text-sm text-black font-bold focus:outline-none focus:bg-yellow-50/50 rounded-none transition-colors"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#ffb7d5] hover:bg-[#ffa3c8] text-black font-black uppercase tracking-widest text-sm py-3 px-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-none transition-all disabled:opacity-50"
              >
                {isPending ? "LOADING STAGE..." : "YES, ACCESS COCKPIT"}
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 px-1 text-[11px] font-bold text-slate-600 select-none">
              <span onClick={() => navigate("/signup")} className="underline hover:text-pink-600 cursor-pointer transition-colors">
                회원가입하기
              </span>
              <span onClick={() => navigate("/")} className="underline hover:text-cyan-600 cursor-pointer transition-colors">
                메인 기지로 복귀
              </span>
            </div>
          </form>
        </div>

        {/* 상태 하단 바 */}
        <div className="bg-[#e1d5f5] px-4 py-2 flex items-center justify-between text-[11px] font-bold text-black/60 tracking-tight">
          <span>SYS_DRIVE: READY</span>
          <span>CRITICAL: NONE</span>
        </div>
      </div>
    </div>
  )
}
