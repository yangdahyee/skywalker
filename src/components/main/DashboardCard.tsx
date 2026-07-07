// src/components/main/DashboardCard.tsx
import { useNavigate } from "react-router-dom"
import OrbitPlanet from "./OrbitPlanet"
import type { RouteHandleMeta } from "../../routes"

interface DashboardCardProps {
  routePath: string
  meta: RouteHandleMeta
}

export default function DashboardCard({ routePath, meta }: DashboardCardProps) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(routePath || "/")}
      className="group/panel flex flex-col items-center justify-center p-3 sm:p-4 relative select-none transition-all duration-300 w-full sm:w-auto min-w-0 sm:min-w-[140px] cursor-pointer"
    >
      {/* 1. 배경 장식: 상시 은은한 가이드라인 (Hover 시 네온 인디고 및 인쇄 광원 증폭) */}
      <div className="absolute inset-0 border border-indigo-500/15 bg-indigo-500/[0.01] rounded-xl pointer-events-none transition-all duration-300 group-hover/panel:border-indigo-500/40 group-hover/panel:bg-indigo-500/[0.04] group-hover/panel:shadow-[inset_0_0_12px_rgba(99,102,241,0.12)]" />

      {/* 2. 행성 아이콘 존: 모바일(sm 미만)에서는 hidden 처리하여 숨김. 태블릿/PC(sm 이상)에서만 노출 */}
      <div className="hidden sm:block relative z-10 p-2 transition-transform duration-300 ease-out group-hover/panel:-translate-y-1">
        {/* 상시 작동 백그라운드 홀로그램 아우라 -> Hover 시 2xl 및 인디고 컬러 증폭 */}
        <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-xl animate-pulse duration-[4000ms] transition-all group-hover/panel:bg-indigo-400/25 group-hover/panel:blur-2xl" />
        <OrbitPlanet to={routePath || "/"} label="" />
      </div>
      {/* 3. 테크니컬 모듈 텍스트 레이아웃 */}
      <div className="mt-1 sm:mt-3 text-center z-10 w-full">
        {/* 센터 미세 데코 라인: 모바일에서는 숨기거나 작게 유지, PC에서만 호버 시 확장 */}
        <div className="hidden sm:block w-6 h-[1px] bg-indigo-500/40 mx-auto mb-2 transition-all duration-300 group-hover/panel:w-12 group-hover/panel:bg-indigo-400" />
        <span className="text-xs sm:text-sm font-black tracking-wider text-slate-800 transition-colors duration-200 group-hover/panel:text-indigo-600 block">{meta.moduleName}</span>

        {/* 시스템 정보 코드 라벨: Hover 시 선명도 업그레이드 */}
        <span className="text-[9px] font-mono font-bold tracking-widest text-indigo-400/50 uppercase mt-0.5 block transition-all group-hover/panel:text-indigo-400/90 group-hover/panel:scale-105">
          {routePath.replace("/", "SYS_")}
        </span>
      </div>
    </div>
  )
}
