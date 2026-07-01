// src/components/main/OrbitPlanet.tsx
import { useNavigate } from "react-router-dom"
import SaturnSvg from "../../assets/svg/SaturnSvg"

interface OrbitPlanetProps {
  to: string
  label: string
  // 🟢 컴파일 에러의 원인이었던 필수 'orbitClass'를 과감히 제거하여 안정성 확보!
}

export default function OrbitPlanet({ to, label }: OrbitPlanetProps) {
  const navigate = useNavigate()

  return (
    <div className="relative">
      <button onClick={() => navigate(to)} className="group relative flex flex-col items-center focus:outline-hidden cursor-pointer">
        {/* 제다이 텍스처 홀로그램 링 */}
        <div className="absolute inset-0 bg-white/5 rounded-full blur-md scale-90 group-hover:scale-125 transition-all duration-300" />

        {/* 영롱한 행성 에셋 */}
        <SaturnSvg size={76} />

        {/* 스타워즈 테마 타깃 시스템 라벨 스타일링 */}
        <span className="mt-4 text-[11px] font-mono font-black tracking-[0.25em] text-stone-300 group-hover:text-emerald-400 transition-colors duration-300">{label}</span>
      </button>
    </div>
  )
}
