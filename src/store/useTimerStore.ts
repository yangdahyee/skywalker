// src/stores/useTimerStore.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface TimerState {
  swTime: number         // 현재 누적된 시간 (ms)
  swRunning: boolean      // 타이머 구동 여부
  startTime: number       // 타이머가 시작된 실제 절대 시간 (Date.now())
  startTimer: () => void  // 타이머 시작 액션
  stopTimer: () => void   // 타이머 정지 액션
  resetTimer: () => void  // 타이머 초기화 액션
}

// 타이머 인터벌을 참조할 내부 변수 (React 외부에서 관리하므로 리렌더링과 무관)
let timerInterval: number | null = null

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      swTime: 0,
      swRunning: false,
      startTime: 0,

      // [시작] 액션
      startTimer: () => {
        if (get().swRunning) return // 이미 돌고 있다면 중복 실행 방지

        // 타이머가 작동하기 시작한 절대 시점 계산 (기존 흐른 시간 차감)
        const startTime = Date.now() - get().swTime
        set({ swRunning: true, startTime })

        // 10ms마다 React 바깥 기계실(Zustand)에서 혼자 시간 계산 누적
        timerInterval = window.setInterval(() => {
          set({ swTime: Date.now() - startTime })
        }, 10)
      },

      // [정지] 액션
      stopTimer: () => {
        if (timerInterval) {
          window.clearInterval(timerInterval)
          timerInterval = null
        }
        set({ swRunning: false })
      },

      // [초기화] 액션
      resetTimer: () => {
        if (timerInterval) {
          window.clearInterval(timerInterval)
          timerInterval = null
        }
        set({ swTime: 0, swRunning: false, startTime: 0 })
      },
    }),
    {
      name: "r2d2-timer-storage", // localStorage에 저장될 키 이름
      // 새로고침 시 기존에 켜져있던 타이머를 안전하게 복구하기 위한 설정
      onRehydrateStorage: () => (state) => {
        if (state && state.swRunning) {
          // 새로고침 전에 실행 중이었다면, 인터벌 루프를 즉시 재연결
          const startTime = Date.now() - state.swTime
          state.startTime = startTime
          timerInterval = window.setInterval(() => {
            useTimerStore.setState({ swTime: Date.now() - startTime })
          }, 10)
        }
      },
    }
  )
)