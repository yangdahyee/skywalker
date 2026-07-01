import OrbitPlanet from "../components/main/OrbitPlanet"
import GroguSvg from "../assets/svg/GroguSvg"

export default function MainPage() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      {/* 영롱한 타원 가이드선 */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50%" cy="50%" rx="240" ry="90" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
        <ellipse cx="50%" cy="50%" rx="320" ry="120" fill="none" stroke="#a855f7" strokeWidth="1.5" />
        <ellipse cx="50%" cy="50%" rx="400" ry="150" fill="none" stroke="#f472b6" strokeWidth="1.5" />
      </svg>

      {/* 중앙 그로구 코어 */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center space-y-8 pointer-events-auto">
        <div className="animate-bounce duration-1000 filter drop-shadow-[0_10px_15px_rgba(16,185,129,0.25)]">
          <div className="hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer">
            <GroguSvg size={128} />
          </div>
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Skywalker</h1>
          <p className="text-xl font-semibold text-emerald-400 tracking-wide animate-pulse">안녕하세요!</p>
        </div>
      </div>

      {/* 공전하는 행성들 */}
      <OrbitPlanet to="/timer" label="LUKE" orbitClass="animate-orbit-track-1" />
      <OrbitPlanet to="/bucket" label="C-3PO" orbitClass="animate-orbit-track-2" />
      <OrbitPlanet to="/log" label="R2-D2" orbitClass="animate-orbit-track-3" />

      {/* CSS offset-path 애니메이션 */}
      <style>{`
        .animate-orbit-track-1 {
          offset-path: ellipse(240px 90px at center);
          animation: orbitMove1 12s linear infinite;
        }
        @keyframes orbitMove1 { from { offset-distance: 0%; } to { offset-distance: 100%; } }

        .animate-orbit-track-2 {
          offset-path: ellipse(320px 120px at center);
          animation: orbitMove2 18s linear infinite;
        }
        @keyframes orbitMove2 { from { offset-distance: 33%; } to { offset-distance: 133%; } }

        .animate-orbit-track-3 {
          offset-path: ellipse(400px 150px at center);
          animation: orbitMove3 25s linear infinite;
        }
        @keyframes orbitMove3 { from { offset-distance: 66%; } to { offset-distance: 166%; } }

        .animate-orbit-track-1, .animate-orbit-track-2, .animate-orbit-track-3 {
          offset-rotate: auto 0deg; 
        }
      `}</style>
    </div>
  )
}
