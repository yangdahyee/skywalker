import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  size: number
  color: string
}

export default function StarfieldEffect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mouseRef = useRef<{ x: number; y: number; lastX: number; lastY: number }>({
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true }) // 명시적 알파 설정
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []

    const colors = ["#10b981", "#22d3ee", "#a855f7", "#f472b6", "#ffffff"]

    // 최적화 1 - 디바이스 픽셀 비율(DPR)을 고려한 고해상도 대응 및 크기 셋팅
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const width = window.innerWidth
      const height = window.innerHeight

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      // 해상도 비율만큼 드로잉 스케일 확장 (고해상도 모니터에서도 파티클이 안 깨지고 선명함)
      ctx.scale(dpr, dpr)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    const handleMouseMove = (e: MouseEvent) => {
      const mouse = mouseRef.current
      mouse.x = e.clientX
      mouse.y = e.clientY

      const dx = mouse.x - mouse.lastX
      const dy = mouse.y - mouse.lastY
      const speed = Math.sqrt(dx * dx + dy * dy)

      if (speed > 2) {
        const particleCount = Math.min(Math.floor(speed / 3), 5)
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: mouse.x,
            y: mouse.y,
            vx: -dx * 0.15 + (Math.random() - 0.5) * 1.5,
            vy: -dy * 0.15 + (Math.random() - 0.5) * 1.5 + 0.5,
            alpha: 1,
            size: Math.random() * 2.5 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
          })
        }
      }

      mouse.lastX = mouse.x
      mouse.lastY = mouse.y
    }

    window.addEventListener("mousemove", handleMouseMove)

    // 최적화 2 - 애니메이션 루프 성능 극대화
    const animate = () => {
      // clearRect는 스케일 영향을 받으므로 실제 윈도우 크기 기준으로 초기화
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      const activeParticles: Particle[] = []
      const len = particles.length

      // 고정 버퍼 변수 선언으로 GC(Garbage Collection) 가중치 감소
      let p: Particle
      let lastColor = ""

      for (let i = 0; i < len; i++) {
        p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.alpha -= 0.015

        if (p.alpha <= 0) continue // 소멸한 파티클은 드로잉 스킵

        // 최적화 3 - fillStyle 변경 최소화
        // 가급적 같은 색상의 파티클이 연속될 때만 fillStyle을 교체하여 GPU 오버헤드 감소
        if (lastColor !== p.color) {
          ctx.fillStyle = p.color
          lastColor = p.color
        }

        // 투명도는 canvas 자체 스타일이나 색상 결합 대신 가볍게 제어
        ctx.globalAlpha = p.alpha

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        activeParticles.push(p)
      }

      // 루프 완료 후 최종 알파 값 복구
      ctx.globalAlpha = 1.0
      particles = activeParticles

      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // 최적화 4 - 레이어 가중치를 z-10 등으로 조절하여 UI 요소를 가리지 않게 수정
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 w-full h-full" style={{ mixBlendMode: "screen" }} />
}
