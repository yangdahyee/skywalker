// src/pages/MainPage.tsx
import { useNavigate } from "react-router-dom"
import GroguSvg from "../assets/svg/GroguSvg"
import DashboardCard from "../components/main/DashboardCard"
import { appMainRoutes } from "../routes"
import type { RouteHandleMeta } from "../routes"
import { useAuthStore } from "../store/useAuthStore"
import { useSignOut } from "../hooks/mutations/use-sign-out"

export default function MainPage() {
  const navigate = useNavigate()
  const { user, isLoggedIn } = useAuthStore()
  const { mutate: handleSignOut, isPending } = useSignOut()

  // appMainRoutes 구조에서 실제 하위 페이지 배열을 가져옴
  const layoutRoutes = appMainRoutes[0]?.children?.[0]?.children || []

  // 그 중 handle.isMenu가 true인 라우트만 필터링
  const menuRoutes = layoutRoutes.filter((route) => (route.handle as RouteHandleMeta)?.isMenu)

  return (
    // 배경판: 모바일 환경에서 대시보드가 길어질 때를 대비해 md 미만에서는 스크롤이 가능하도록 구조 보완
    <div className="relative flex min-h-screen md:h-screen w-full bg-slate-800 flex-col items-center justify-between overflow-y-auto md:overflow-hidden font-mono text-slate-900">
      {/* UPPER ZONE: 전방 콕핏 유리창 (그로구 코어) */}
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 pointer-events-auto select-none relative w-full py-12 md:py-0">
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
      <div className="relative z-10 w-full bg-purple-100 border-t-4 border-slate-900 py-8 px-4 md:py-16 md:px-6 shadow-[0_-8px_0px_0px_rgba(15,23,42,0.15)] pointer-events-auto flex flex-col items-center mt-auto">
        {/* 패널 중앙 제어용 장식 바 */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-4 whitespace-nowrap z-30 select-none">
          {isLoggedIn ? (
            /* [A] 로그인 상태일 때: 웰컴 / 로그아웃 */
            <>
              <div className="bg-slate-900 text-white text-[9px] font-black px-4 py-1 border-2 border-slate-900 tracking-widest uppercase rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,0.15)] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" /> {user?.user_metadata?.nickname || "ONLINE"}
              </div>
              <button
                onClick={() => handleSignOut()}
                disabled={isPending}
                className="bg-[#FF6B6B] hover:bg-rose-500 text-slate-950 text-[9px] font-black px-3 py-1 border-2 border-slate-950 rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer disabled:opacity-50"
              >
                {isPending ? "TERMINATING..." : "❌ 로그아웃하기"}
              </button>
            </>
          ) : (
            /* [B] 비로그인 상태일 때: 로그인 / 회원가입 */
            <>
              <button
                onClick={() => navigate("/login")}
                className="bg-[#00e1f5] hover:bg-cyan-400 text-slate-950 text-[9px] font-black px-3 py-1 border-2 border-slate-950 rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
              >
                🔑 로그인하기
              </button>

              <div className="bg-slate-900 text-white text-[9px] font-black px-4 py-1 border-2 border-slate-900 tracking-widest uppercase rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,0.15)]">
                WELCOME TO MY SITE
              </div>

              <button
                onClick={() => navigate("/signup")}
                className="bg-[#ffb7d5] hover:bg-pink-400 text-slate-950 text-[9px] font-black px-3 py-1 border-2 border-slate-950 rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
              >
                🚀 회원가입하기
              </button>
            </>
          )}
        </div>

        {/* 모바일에서는 가로폭에 맞게 1줄 정렬, 태블릿 이상부터 정렬되도록 max-w 및 gap 최적화 */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 md:gap-8 max-w-7xl w-full">
          {" "}
          {/* max-w-4xl 에서 max-w-7xl로 수정 */}
          {menuRoutes.map((route) => (
            <DashboardCard key={route.path} routePath={route.path || "/"} meta={route.handle as RouteHandleMeta} />
          ))}
        </div>
      </div>
    </div>
  )
}
