// src/hooks/useOrbit.ts
import { useEffect, useState } from "react"

interface PlanetConfig {
  id: string
  radiusX: number // 타원 궤도 가로 반지름
  radiusY: number // 타원 궤도 세로 반지름
  speed: number // 공전 속도
  angleOffset: number // 초기 시작 각도 (행성들이 안 겹치게 분산)
}

export interface PlanetPosition {
  id: string
  x: number
  y: number
}

export function useOrbit(configs: PlanetConfig[]) {
  const [positions, setPositions] = useState<PlanetPosition[]>([])

  useEffect(() => {
    let animationFrameId: number
    // 고해상도 타이머를 기준점(t)으로 사용
    const startTime = performance.now()

    const updatePositions = () => {
      const now = performance.now()
      const elapsed = (now - startTime) * 0.001 // 초 단위 변환

      const nextPositions = configs.map((config) => {
        // 시간 흐름에 따른 현재 각도 계산
        const angle = elapsed * config.speed + config.angleOffset

        // 삼각함수로 중앙 기준 (x, y) 상대 좌표 도출
        const x = Math.cos(angle) * config.radiusX
        const y = Math.sin(angle) * config.radiusY

        return {
          id: config.id,
          x,
          y,
        }
      })

      setPositions(nextPositions)
      animationFrameId = requestAnimationFrame(updatePositions)
    }

    animationFrameId = requestAnimationFrame(updatePositions)

    return () => cancelAnimationFrame(animationFrameId)
  }, [configs])

  return positions
}
