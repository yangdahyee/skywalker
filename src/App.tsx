import { Outlet, useLocation } from "react-router-dom"
import { useEffectStore } from "./store/useEffectStore"
import StarfieldEffect from "./components/common/StarfieldEffect"
import LukeFullColorCursor from "./components/common/LuckFullColorCursor"
import DesktopMenu from "./components/DesktopMenu"
import { useState, useEffect } from "react"
import { useAuthStore } from "./store/useAuthStore"
import { supabase } from "./shared/supabaseClient"

function App() {
  const { isStarfieldEnabled, isSpecialCursorEnabled } = useEffectStore()
  const location = useLocation()
  const { setSession, clearSession, isLoading } = useAuthStore()
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 자동 세션 복구
  // 모바일이나 웹 앱이 처음 구동될 때, 기기 저장소(LocalStorage)의 토큰 스캔
  useEffect(() => {
    // 1. 앱이 켜지자마자 저장된 이전 로그인 세션이 있는지 즉시 체크
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setSession(session.user)
      } else {
        clearSession()
      }
    })

    // 2. 스마트폰 백그라운드/앱 강제 종료 후 복귀, 토큰 자동 만료 등 모든 인증 주기 실시간 리스닝
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setSession(session.user)
      } else {
        clearSession()
      }
    })

    return () => {
      subscription.unsubscribe() // 컴포넌트 이탈 시 리스너 해제
    }
  }, [setSession, clearSession])

  // 모달이 열리면 강력한 cursor-none !important 스타일을 React 레벨에서 무력화
  const shouldApplyCursorNone = isSpecialCursorEnabled && !isModalOpen

  // 앱 초기 구동 시 Supabase 토큰 스캔 돌 동안 잠깐의 공백(깜빡임) 방지
  if (isLoading) {
    return (
      <div className="w-full h-screen bg-[#1A3A4B] flex items-center justify-center font-mono text-xs text-[#B2D0E5] tracking-widest animate-pulse">
        📟 SYSTEM_BOOT: SYNCING HOLONET PILOT CREDENTIALS...
      </div>
    )
  }

  return (
    // w-screen -> w-full로 변경하여 모바일 가로 스크롤바 버그 방지, h-screen 유지하되 본문 스크롤은 내부 컴포넌트(MainPage)가 제어하도록 유도
    <div className={`relative w-full h-screen text-stone-100 overflow-x-hidden overflow-y-auto md:overflow-hidden select-none ${shouldApplyCursorNone ? "cursor-none" : ""}`}>
      <div className="relative z-10 w-full h-full">
        <Outlet />
      </div>

      {/* 메인페이지+회원가입+로그인 페이지에서는 안 뜨게 하려는 목적 + useLocation */}
      {location.pathname !== "/" && location.pathname !== "/signup" && location.pathname !== "/login" && <DesktopMenu setIsModalOpen={setIsModalOpen} />}

      {/* 마우스 이펙트 레이어: pointer: fine (마우스 사용 기기) 일 때만 보이도록 하거나 컴포넌트 내부에서 처리하는 것을 권장하며, 모바일 터치 오작동을 최소화하기 위해 전반적 레이어는 유지 */}
      <div className="absolute inset-0 z-9999 pointer-events-none hidden md:block">
        {isStarfieldEnabled && <StarfieldEffect />}
        {isSpecialCursorEnabled && <LukeFullColorCursor />}
      </div>

      {/* CSS 미디어 쿼리를 추가하여 모바일(터치 기기)에서는 커서 숨김 처리가 강제 적용되지 않도록 가드 추가 */}
      <style>{`
        @media (pointer: fine) {
          .cursor-none, .cursor-none * { cursor: none !important; }
        }
      `}</style>
    </div>
  )
}

export default App
