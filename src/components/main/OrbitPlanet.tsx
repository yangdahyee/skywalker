// src/components/main/OrbitPlanet.tsx
import { useNavigate } from "react-router-dom"
import SaturnSvg from "../../assets/svg/SaturnSvg"

interface OrbitPlanetProps {
  to: string
  label: string
  orbitClass: string 
}

export default function OrbitPlanet({ to, label, orbitClass }: OrbitPlanetProps) {
  const navigate = useNavigate()

  return (
    <div
      className={`absolute z-20 ${orbitClass}`}
      style={{
        marginLeft: "-36px",
        marginTop: "-36px",
      }}
    >
      <button onClick={() => navigate(to)} className="group relative flex flex-col items-center focus:outline-hidden cursor-pointer">
        {/* 네온 오라 효과 */}
        <div className="absolute inset-0 bg-cyan-500/30 rounded-full blur-xl scale-75 group-hover:scale-125 group-hover:bg-fuchsia-500/40 transition-all duration-700" />

        {/* 토성 디자인 에셋 */}
        <SaturnSvg size={72} />

        {/* 미션 라벨 */}
        <span className="mt-2 text-[10px] font-mono font-bold tracking-[0.2em] text-cyan-400 group-hover:text-fuchsia-400 transition-colors duration-300">{label}</span>
      </button>
    </div>
  )
}
