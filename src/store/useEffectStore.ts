import { create } from "zustand"

interface EffectState {
  isStarfieldEnabled: boolean
  isSpecialCursorEnabled: boolean
  setStarfield: (enabled: boolean) => void
  setSpecialCursor: (enabled: boolean) => void
  enableAllEffects: () => void
  disableAllEffects: () => void
}

export const useEffectStore = create<EffectState>((set) => ({
  isStarfieldEnabled: true, // 우주 별빛 배경 기본값 ON
  isSpecialCursorEnabled: true, // 특수 마우스 커서 기본값 ON

  setStarfield: (enabled) => set({ isStarfieldEnabled: enabled }),
  setSpecialCursor: (enabled) => set({ isSpecialCursorEnabled: enabled }),

  enableAllEffects: () => set({ isStarfieldEnabled: true, isSpecialCursorEnabled: true }),
  disableAllEffects: () => set({ isStarfieldEnabled: false, isSpecialCursorEnabled: false }),
}))
