import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { signOutApi } from "../../api/auth"
import { useAuthStore } from "../../store/useAuthStore"
import type { AuthError } from "@supabase/supabase-js"

export const useSignOut = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const clearSession = useAuthStore((state) => state.clearSession)

  return useMutation({
    // 1단계에서 분리한 순수 로그아웃 통신 함수 바인딩
    mutationFn: signOutApi,

    // 로그아웃 트랜잭션이 성공적으로 완결되었을 때 실행할 생명주기 콜백
    onSuccess: () => {
      // 1. Zustand UI 보관소 전원 전면 차단 (isLoggedIn -> false)
      clearSession()

      // 2. React Query가 들고 있던 기존 유저의 잔여 캐시 데이터 완전히 초기화
      queryClient.clear()

      console.log("Cockpit System Terminated. Safe Escape Success.")

      // 3. 다시 로그인 관문 페이지로 전송
      navigate("/login")
    },

    // TS/ESLint 에러 대응: 묵인용 any를 제거하고 공식 AuthError 스펙 지정
    onError: (error: AuthError) => {
      console.error("ESCAPE_ALERT: 로그아웃 실패 오차 로그 ->", error.message)
    },
  })
}
