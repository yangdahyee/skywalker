import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { signInWithPasswordApi } from "../../api/auth"
import { useAuthStore } from "../../store/useAuthStore"
import type { AuthError } from "@supabase/supabase-js"

export const useSignInWithPassword = () => {
  const navigate = useNavigate()
  const setSession = useAuthStore((state) => state.setSession)

  return useMutation({
    mutationFn: signInWithPasswordApi,

    onSuccess: (response) => {
      if (response.data.user) {
        setSession(response.data.user)
        console.log("Supabase Auth Session Synced // UID:", response.data.user.id)
        navigate("/")
      }
    },

    onError: (error: AuthError) => {
      if (error.message.includes("Invalid login credentials")) {
        error.message = "접근 거부: 아이디 또는 비밀번호가 일치하지 않습니다."
      }
    },
  })
}
