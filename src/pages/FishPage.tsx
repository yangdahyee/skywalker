import React, { useRef, useState } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, useAnimations } from "@react-three/drei"
import type { GLTF } from "three-stdlib"

// 1. gltfjsx로 추출된 모델의 노드 및 머테리얼 타입 정의
type GLTFResult = GLTF & {
  nodes: {
    body: THREE.Bone
    Sphere: THREE.SkinnedMesh
    Sphere_1: THREE.SkinnedMesh
    Sphere_2: THREE.SkinnedMesh
    Sphere_3: THREE.SkinnedMesh
    Sphere_4: THREE.SkinnedMesh
    Sphere_5: THREE.SkinnedMesh
    Sphere_6: THREE.SkinnedMesh
  }
  materials: {
    BODY: THREE.MeshStandardMaterial
    TOP: THREE.MeshStandardMaterial
    DOWN: THREE.MeshStandardMaterial
    TAIL: THREE.MeshStandardMaterial
    EYE_BLACK: THREE.MeshStandardMaterial
    EYE_WHITE: THREE.MeshStandardMaterial
    WING: THREE.MeshStandardMaterial
  }
}

interface FishModelProps extends React.ComponentProps<"group"> {
  onPointerMoveUpdate: (x: number, y: number) => void
}

// 2. 물고기 3D 모델 컴포넌트
function FishModel({ onPointerMoveUpdate, ...props }: FishModelProps) {
  const group = useRef<THREE.Group>(null)

  const { nodes, materials, animations } = useGLTF("/models/crown_darkchoco.glb") as unknown as GLTFResult
  useAnimations(animations, group)

  const fishBodyRef = useRef<THREE.Bone>(nodes.body)

  useFrame((state) => {
    const px = state.pointer.x
    const py = state.pointer.y

    // 부모 컴포넌트의 실시간 UI에 좌표 값 전달
    onPointerMoveUpdate(px, py)

    // 좌우 반전 오프셋
    let targetAngleY = -px * 1.2
    let targetAngleX = -py * 0.8
    let targetAngleZ = px * 0.2

    targetAngleY = THREE.MathUtils.clamp(targetAngleY, -0.3, 0.9)
    targetAngleX = THREE.MathUtils.clamp(targetAngleX, -0.4, 0.4)
    targetAngleZ = THREE.MathUtils.clamp(targetAngleZ, -0.1, 0.1)

    if (fishBodyRef.current) {
      fishBodyRef.current.rotation.y = THREE.MathUtils.lerp(fishBodyRef.current.rotation.y, targetAngleY, 0.1)
      fishBodyRef.current.rotation.x = THREE.MathUtils.lerp(fishBodyRef.current.rotation.x, targetAngleX, 0.1)
      fishBodyRef.current.rotation.z = THREE.MathUtils.lerp(fishBodyRef.current.rotation.z, targetAngleZ, 0.1)
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="mainwinnng" position={[0.026, 0.019, -0.047]} scale={0.521} />
        <group name="mainwinnng001" position={[0.026, 0.019, -0.047]} scale={0.521} />
        <group name="Armature" position={[0.026, 0.124, 0.495]} rotation={[-1.538, 0, 0]}>
          <group name="ahaxhd">
            <skinnedMesh name="Sphere" geometry={nodes.Sphere.geometry} material={materials.BODY} skeleton={nodes.Sphere.skeleton} castShadow />
            <skinnedMesh name="Sphere_1" geometry={nodes.Sphere_1.geometry} material={materials.TOP} skeleton={nodes.Sphere_1.skeleton} castShadow />
            <skinnedMesh name="Sphere_2" geometry={nodes.Sphere_2.geometry} material={materials.DOWN} skeleton={nodes.Sphere_2.skeleton} castShadow />
            <skinnedMesh name="Sphere_3" geometry={nodes.Sphere_3.geometry} material={materials.TAIL} skeleton={nodes.Sphere_3.skeleton} castShadow />
            <skinnedMesh name="Sphere_4" geometry={nodes.Sphere_4.geometry} material={materials.EYE_BLACK} skeleton={nodes.Sphere_4.skeleton} castShadow />
            <skinnedMesh name="Sphere_5" geometry={nodes.Sphere_5.geometry} material={materials.EYE_WHITE} skeleton={nodes.Sphere_5.skeleton} castShadow />
            <skinnedMesh name="Sphere_6" geometry={nodes.Sphere_6.geometry} material={materials.WING} skeleton={nodes.Sphere_6.skeleton} castShadow />
          </group>
          <primitive object={nodes.body} />
        </group>
      </group>
    </group>
  )
}

// 3. 메인 익스포트 페이지 컴포넌트
export default function FishPage() {
  // 실시간 마우스 좌표 디스플레이를 위한 상태 관리
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  const handlePointerUpdate = (x: number, y: number) => {
    setCoords({ x: parseFloat(x.toFixed(2)), y: parseFloat(y.toFixed(2)) })
  }

  return (
    // 배경: 화면 전체를 채우는 딥블루 바다 무드
    <div className="relative flex bg-[#003e6d] h-screen w-full items-center justify-center overflow-hidden font-mono text-slate-900 select-none">
      {/* 배경 도트: 심해 레이더 느낌의 에메랄드빛 픽셀 격자무늬 그리드 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#14b8a6_1px,transparent_1px),linear-gradient(to_bottom,#14b8a6_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20 pointer-events-none z-0" />

      {/* SVG 파도 레이어 */}
      <div className="absolute inset-x-0 bottom-0 w-full leading-[0] z-0 opacity-15 pointer-events-none select-none">
        <svg className="w-full h-[35vh] min-h-[240px]" viewBox="0 0 1200 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          {/* 상하 출렁임 폭은 부드러운 호흡 수준을 유지하면서 높이 자체를 대폭 고정 증폭 */}
          <style>{`
            @keyframes waveBounceDouble {
              0%, 100% { transform: scaleY(1) translateY(0); }
              50% { transform: scaleY(1.15) translateY(-8px); }
            }
            @keyframes waveBounceReverseDouble {
              0%, 100% { transform: scaleY(1.08) translateY(-4px); }
              50% { transform: scaleY(0.92) translateY(3px); }
            }
            .animate-wave-bounce-1 {
              animation: waveBounceDouble 5s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
              transform-origin: bottom;
            }
            .animate-wave-bounce-2 {
              animation: waveBounceReverseDouble 4s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
              transform-origin: bottom;
            }
          `}</style>

          {/* 뒤쪽 물결 */}
          <path className="animate-wave-bounce-1" d="M0,40 C150,110 350,20 500,60 C650,100 850,130 1000,90 C1150,50 1200,60 1200,60 L1200,200 L0,200 Z" fill="#14b8a6" />
          {/* 앞쪽 물결 */}
          <path className="animate-wave-bounce-2" d="M0,70 C120,40 280,100 420,80 C560,60 720,120 880,90 C1020,60 1120,40 1200,75 L1200,200 L0,200 Z" fill="#0ea5e9" opacity="0.6" />
        </svg>
      </div>

      {/* ===================================================
          정중앙에 배치된 메인 심해 캠 스크린 윈도우
          =================================================== */}
      <div className="relative z-10 bg-emerald-50 border-4 border-slate-950 shadow-[8px_8px_0px_0px_#000000] flex flex-col max-w-2xl w-full h-[28rem] mx-6 pointer-events-auto">
        {/* 우측 상단에 겹쳐서 배치된 마우스 작동 유도 카드 */}
        <div className="absolute -top-5 -right-3 z-30 bg-yellow-300 border-2 border-slate-950 px-3 py-1.5 text-[10px] font-black tracking-tighter shadow-[3px_3px_0px_0px_#000000] animate-[bounce_1.5s_infinite]">
          마우스를 움직여 보세용!
        </div>

        {/* 상단 윈도우 바 (에메랄드 민트) */}
        <div className="bg-emerald-400 border-b-4 border-slate-950 px-3 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-black tracking-wider">■ 호기심 많은 다크 초코 물고기</span>
            <span className="bg-red-500 border border-black text-white text-[8px] px-1 font-bold rounded animate-pulse">LIVE</span>
          </div>
          <div className="flex space-x-1">
            <div className="w-3 h-1 bg-slate-950" />
            <div className="w-3 h-3 border-2 border-slate-950 bg-white" />
          </div>
        </div>

        {/* 창 내부: 물고기가 둥둥 떠있는 청록빛 물빛 그리드 3D 스크린 */}
        <div className="flex-1 bg-[linear-gradient(to_right,#a5f3fc_1px,transparent_1px),linear-gradient(to_bottom,#a5f3fc_1px,transparent_1px)] bg-[size:1rem_1rem] bg-cyan-900/40 relative">
          <Canvas shadows camera={{ position: [0, 0, 2.3], fov: 45 }}>
            <ambientLight intensity={0.8} color="#e0f2fe" />
            <directionalLight castShadow position={[5, 8, 5]} intensity={1.8} color="#fef08a" shadow-mapSize={[2048, 2048]} />
            <hemisphereLight intensity={0.5} color="#06b6d4" groundColor="#0f172a" />

            {/* 실시간 마우스 좌표 트래킹 핸들러 전달 */}
            <FishModel position={[0, -0.1, 0]} scale={0.5} onPointerMoveUpdate={handlePointerUpdate} />
          </Canvas>
        </div>

        {/* 대시보드 툴바 */}
        <div className="bg-cyan-200 border-t-4 border-slate-950 p-2 flex items-center justify-between space-x-4">
          <div className="w-[140px] shrink-0 bg-white border-2 border-slate-950 py-0.5 text-[9px] font-black shadow-[1.5px_1.5px_0px_0px_#000000] text-left px-3 text-slate-700">
            X:{coords.x} / Y:{coords.y}
          </div>

          {/* 산소 게이지 내부 */}
          <div className="flex-1 flex items-center space-x-2">
            <div className="w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-950 rounded-full animate-ping" />
            <div className="flex-1 h-4 bg-slate-100 border-2 border-slate-950 relative p-0.5">
              <div className="h-full w-2/3 border-r-2 border-slate-950 bg-[linear-gradient(45deg,#06b6d4_25%,transparent_25%,transparent_50%,#06b6d4_50%,#06b6d4_75%,transparent_75%,transparent)] bg-[size:0.6rem_0.6rem]" />
              <div className="absolute top-[-2px] bottom-[-2px] left-2/3 w-1.5 bg-slate-950" />
            </div>
            <span className="text-[10px] font-black tracking-tight text-slate-800 shrink-0">O2: 66%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

useGLTF.preload("/models/crown_darkchoco.glb")
