import { supabase } from "../shared/supabaseClient"
import type { AuthResponse, SignInWithPasswordCredentials } from "@supabase/supabase-js"

/**
 * Supabase Auth 서버에 이메일과 패스워드를 쏘아 보내
 * 출입증(JWT 토큰 세션)을 발급받는 공식 규격 데이터 통신 함수
 */
export const signInWithPasswordApi = async (credentials: SignInWithPasswordCredentials): Promise<AuthResponse> => {
  const response = await supabase.auth.signInWithPassword(credentials)

  // 서버로부터 네트워크 차단 등 원격 오류가 내려오면 상위 Mutation 레이어로 전파
  if (response.error) {
    throw response.error
  }

  return response
}
