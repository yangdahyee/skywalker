import { create } from "zustand"
import type { User } from "@supabase/supabase-js"

interface AuthState {
  user: User | null       // 로그인한 파일럿의 Supabase 유저 객체 정보 (없으면 null)
  isLoggedIn: boolean     // 로그인 여부를 판단할 가드라인 플래그
  isLoading: boolean      // 최초 앱 구동 시 세션을 체크 중인지 판별하는 로딩 상태
  setSession: (user: User | null) => void // 로그인 성공 시 세션을 스토어에 충전하는 함수
  clearSession: () => void                // 로그아웃 시 세션을 깨끗이 비워내는 함수
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  isLoading: true, // 초기 상태는 세션을 확인 중이므로 true로 세팅
  
  // 유저 정보가 들어오면 isLoggedIn을 자동으로 true로 전환하는 단일 진실 공급원(SSOT) 기믹
  setSession: (user) => set({ user, isLoggedIn: !!user, isLoading: false }),
  
  // 세션을 초기화하고 콕핏 가드라인을 준비 상태로 되돌림
  clearSession: () => set({ user: null, isLoggedIn: false, isLoading: false }),
}))