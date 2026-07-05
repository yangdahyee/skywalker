// src/components/main/DashboardCard.tsx
import OrbitPlanet from "./OrbitPlanet"
import type { RouteHandleMeta } from "../../routes"

// react-router-dom의 라우트 객체 타입을 느슨하게 정의하거나 필요한 속성만 지정
interface DashboardCardProps {
  routePath: string
  meta: RouteHandleMeta
}

export default function DashboardCard({ routePath, meta }: DashboardCardProps) {
  return (
    <div className="bg-white border-3 border-slate-900 rounded-xl p-4 w-full max-w-[280px] sm:w-auto sm:min-w-68 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] hover:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150 flex items-center justify-between group/panel">
      {/* OrbitPlanet에 경로와 시스템 라벨 전달 */}
      <OrbitPlanet to={routePath || "/"} label={meta.label || ""} />

      <div className="text-right">
        <span className="text-s font-black block text-slate-900">{meta.moduleName}</span>
        <span className={`text-[11px] font-bold px-1 rounded inline-block mt-1 ${meta.statusColorClass || "bg-slate-100 text-slate-700"}`}>{meta.status}</span>
      </div>
    </div>
  )
}
