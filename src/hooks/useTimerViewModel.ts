import { useTimerStore } from "../store/useTimerStore"

export function useTimerViewModel() {
  const swTime = useTimerStore((state) => state.swTime)
  const swRunning = useTimerStore((state) => state.swRunning)
  const startTimer = useTimerStore((state) => state.startTimer)
  const stopTimer = useTimerStore((state) => state.stopTimer)
  const resetTimer = useTimerStore((state) => state.resetTimer)

  // -----------------------------------------------------------------------
  // 시간 출력 포매터 (시:분:초.ms)
  // -----------------------------------------------------------------------
  const formatSw = (time: number) => {
    const hours = Math.floor(time / 3600000)
      .toString()
      .padStart(2, "0")
    const min = Math.floor((time % 3600000) / 60000)
      .toString()
      .padStart(2, "0")
    const sec = Math.floor((time % 60000) / 1000)
      .toString()
      .padStart(2, "0")
    const ms = Math.floor((time % 1000) / 10)
      .toString()
      .padStart(2, "0")

    return `${hours}:${min}:${sec}.${ms}`
  }

  // -----------------------------------------------------------------------
  // 다이나믹 버튼 텍스트 핸들러
  // -----------------------------------------------------------------------
  const getActionLabel = () => {
    if (swRunning) return "STOP"
    if (swTime > 0) return "RESTART"
    return "START"
  }

  return {
    timeDisplay: formatSw(swTime),
    swRunning,
    actionLabel: getActionLabel(),
    handleAction: swRunning ? stopTimer : startTimer,
    handleReset: resetTimer,
  }
}
