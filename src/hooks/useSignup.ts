import { useState } from "react"
import type { FormEvent } from "react"
import { supabase } from "../shared/supabaseClient"

const ADJECTIVES = [
  "행복한",
  "빛나는",
  "용감한",
  "영리한",
  "든든한",
  "따뜻한",
  "비상한",
  "친절한",
  "활기찬",
  "강인한",
  "신중한",
  "자유로운",
  "지혜로운",
  "신비로운",
  "유쾌한",
  "다정한",
  "정의로운",
  "침착한",
  "긍정적인",
  "순수한",
  "위대한",
  "조화로운",
  "열정적인",
  "감사하는",
  "낭만적인",
]
const CHARACTERS = [
  "R2-D2",
  "그로구",
  "루크",
  "츄바카",
  "요다",
  "C-3PO",
  "한솔로",
  "만달로리안",
  "아소카",
  "오비완",
  "윈두",
  "파드메",
  "아나킨",
  "랜도",
  "보카탄",
  "콰이곤",
  "BB-8",
  "팰컨호",
  "보바펫",
  "재작스",
  "딘자린",
  "반란군",
  "제다이",
  "카시안",
  "티바",
]

export function useSignup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const generateRandomNickname = () => {
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]
    const char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
    return `${adj}_${char}`
  }

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "접근 거부: 비밀번호가 일치하지 않습니다." })
      return
    }

    setLoading(true)
    const randomNickname = generateRandomNickname()

    // 1단계: 계정 생성 (auth.users 명부에 등록)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nickname: randomNickname } },
    })

    if (authError) {
      setLoading(false)
      let korMessage = authError.message
      if (authError.message.includes("User already registered")) korMessage = "이미 등록된 이메일 주소입니다."
      else if (authError.message.includes("Password should be at least")) korMessage = "비밀번호는 최소 6자리 이상이어야 합니다."
      setMessage({ type: "error", text: `계정 생성 실패: ${korMessage}` })
      return
    }

    // 2단계: 발급된 고유 UUID를 들고 public.profiles 테이블에 데이터 넣기
    if (authData?.user) {
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: authData.user.id, // auth.users에서 발급된 바로 패스포트 ID
          nickname: randomNickname,
          // created_at은 DB 기본값인 now()가 알아서 채워주므로 생략 가능
        },
      ])

      if (profileError) {
        console.error("프로필 생성 실패 오차 로그:", profileError)
        // ⚠️ 혹시 RLS 권한 때문에 막힐 수도 있으니 체크하기 위함입니다.
      }
    }

    setLoading(false)
    setMessage({
      type: "success",
      text: `승인 완료! 메일함을 확인해 주세요!`,
    })
  }

  return { email, password, confirmPassword, loading, message, setEmail, setPassword, setConfirmPassword, handleSignup }
}
