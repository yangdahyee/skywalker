interface GroguIconProps {
  size?: number // 외부에서 크기를 조절할 수 있는 옵션 (기본값 96)
}

export default function GroguIcon({ size = 96 }: GroguIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      {/* 1. 양쪽 귀 */}
      {/* 왼쪽 귀 안감 & 피부 */}
      <path d="M1 10h4v1H1v-1zm2 1h3v1H3v-1zm2 1h2v1H5v-1zm2 1h1v1H7v-1z" fill="#fca5a5" />
      <path d="M1 9h5v1H1V9zm4 2h3v1H5v-1zm2 1h2v1H7v-1z" fill="#86efac" />
      {/* 오른쪽 귀 안감 & 피부 */}
      <path d="M19 10h4v1h-4v-1zm-2 1h3v1h-3v-1zm-2 1h2v1h-2v-1zm-1 1h1v1h-1v-1z" fill="#fca5a5" />
      <path d="M18 9h5v1h-5V9zm-2 2h3v1h-3v-1zm-2 1h2v1h-2v-1z" fill="#86efac" />
      {/* 2. 머리 뼈대 (귀 접합부 정밀화) */}
      <path d="M6 8h12v1H6V8zm-1 1h14v1H5V9zm-1 1h16v2H4v-2z" fill="#86efac" />
      <path d="M5 12h14v1H5v-1z" fill="#65a30d" /> {/* 턱밑 그림자 디테일 */}
      {/* 3. 이목구비 얼굴 레이어 */}
      {/* 영롱하게 키운 흑진주 눈망울 */}
      <path d="M7 10h2v2H7v-2zm8 0h2v2h-8v-2z" fill="#1c1917" />
      <path d="M7 10h1v1H7v-1zm8 0h1v1h-1v-1z" fill="#ffffff" /> {/* 눈동자 하이라이트 추가 */}
      {/* 수줍은 인디핑크 볼터치 */}
      <path d="M5 11h2v1H5v-1zm12 0h2v1h-12v-1z" fill="#f87171" />
      {/* 조그만 입 */}
      <path d="M11 11h2v1h-2v-1z" fill="#1c1917" />
      {/* 4. 사막 로브 코트 (깃과 볼륨감 픽셀 정밀 분할) */}
      <path d="M5 13h14v2H5v-2z" fill="#fef08a" /> {/* 코트 목도리 깃 */}
      <path d="M6 14h12v1H6v-1z" fill="#fde047" />
      <path d="M4 15h16v6H4v-6z" fill="#eab308" /> {/* 메인 코트 몸통 */}
      <path d="M5 15h14v1H5v-1zm2 1h10v5H7v-5z" fill="#ca8a04" /> {/* 코트 음영 깊이 조절 */}
      {/* 5. 앙증맞은 손과 발 */}
      <path d="M3 15h2v1H3v-1zm16 0h2v1h-2v-1z" fill="#86efac" /> {/* 삐죽 튀어나온 소매 귀여운 손 */}
      <path d="M8 21h2v1H8v-1zm6 0h2v1h-2v-1z" fill="#65a30d" /> {/* 빼꼼 발가락 */}
    </svg>
  )
}
