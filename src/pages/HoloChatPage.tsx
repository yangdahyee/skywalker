import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import { useFetchPosts } from "../hooks/queries/use-fetch-posts"
import { useCreatePost } from "../hooks/mutations/use-posts-mutation"
import { useQueryClient } from "@tanstack/react-query" // 캐시 강제 갱신용
import { supabase } from "../shared/supabaseClient"

export default function HoloChatPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { user, isLoggedIn } = useAuthStore()

  // 📡 기존 방명록의 React Query 그대로 연동
  const { data: posts, isLoading } = useFetchPosts()
  const { mutate: createPost, isPending: isSubmitting } = useCreatePost()

  // 폼 입력 및 게임 인터랙션 로컬 상태 제어
  const [content, setContent] = useState("")
  const [chargeLevel, setChargeLevel] = useState(0) // 주파수 동력 게이지 (0 ~ 100)
  const [isGlitching, setIsGlitching] = useState(false) // 글리치 빔 연출 트리거
  const chatEndRef = useRef<HTMLDivElement>(null)

  // 방명록에서 추출한 커뮤니티 전용 커스텀 알림창(Alert)
  const [customAlert, setCustomAlert] = useState<{
    isOpen: boolean
    title: string
    message: string
    type: "ALERT" | "CONFIRM"
    onConfirm?: () => void
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "ALERT",
  })

  /* REALTIME WEBSOCKET 
     데이터베이스(Supabase)의 posts 테이블에 새로운 글 작성이 포착되는 소수점 밀리초 순간,
     React Query의 사물함 캐시를 즉각 폭파시켜 새로고침 없이 실시간 싱크
  */
  useEffect(() => {
    const postsSubscription = supabase
      .channel("holochat-realtime-channel") // 채널 이름
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" }, // posts 테이블의 모든 변동사항 감시
        (payload) => {
          console.log("🌌 INCOMING TRANSMISSION DETECTED:", payload)
          // 변동이 감지되는 순간 ["posts"] 저장소를 강제로 만료시켜 화면을 소켓식으로 동기화
          queryClient.invalidateQueries({ queryKey: ["posts"] })
        },
      )
      .subscribe() // 실시간 체크

    return () => {
      // 페이지를 떠날 때 채널을 반납하여 기기 메모리 누수 방지
      supabase.removeChannel(postsSubscription)
    }
  }, [queryClient])

  // 한 번 클릭당 25%씩 차오르게
  const handleRecharge = () => {
    // 비로그인 유저가 동력을 충전하려고 접근 시 경보 검문 레이어 우회 작동
    if (!isLoggedIn) {
      setCustomAlert({
        isOpen: true,
        title: "🚨 SECURITY_BREACH: UNKNOWN_PILOT",
        message: "로그인이 필요해요!",
        type: "ALERT",
        onConfirm: () => navigate("/login"),
      })
      return
    }

    setChargeLevel((prev) => {
      const next = prev + 25
      return next >= 100 ? 100 : next
    })
  }

  // 최신 무전이 오면 스크롤을 아래로 슥 밀어주기
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [posts])

  // ❌ 무전 송신 버튼 클릭
  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 커스텀 alert
    if (!isLoggedIn) {
      setCustomAlert({
        isOpen: true,
        title: "🚨 SECURITY_BREACH: UNKNOWN_PILOT",
        message: "로그인이 필요해요!",
        type: "ALERT",
        onConfirm: () => navigate("/login"),
      })
      return
    }

    if (chargeLevel < 100) {
      setCustomAlert({
        isOpen: true,
        title: "⚡ SIGNAL_ERROR: POWER_LOW",
        message: "주파수 증폭기 동력이 부족합니다! 좌측 증폭 코어를 연타하여 100%까지 리차징하십시오.",
        type: "ALERT",
      })
      return
    }

    if (!content.trim()) return

    // 송신 시 0.6초 동안 전체 스크린 치지직- 글리치
    setIsGlitching(true)
    setTimeout(() => setIsGlitching(false), 600)

    createPost(
      {
        title: `🩵 HOLO_CHAT_LOG`,
        content: content.trim(),
        userId: user?.id || "",
        nickname: user?.user_metadata?.nickname || "UNKNOWN_PILOT",
      },
      {
        onSuccess: () => {
          setContent("")
          setChargeLevel(0) // 무전 성공 시 동력은 다시 0%로 초기화
        },
      },
    )
  }

  return (
    <div
      className={`relative flex h-screen w-full bg-[#B2D0E5] text-[#1A3A4B] font-mono flex-col items-center justify-between overflow-hidden select-none transition-all duration-150 ${isGlitching ? "glitch-screen" : ""}`}
    >
      {/* 배경 레이어 */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1A3A4B_1px,transparent_1px),linear-gradient(to_bottom,#1A3A4B_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-[0.07] pointer-events-none z-0" />

      {/* CENTER ZONE : 상단 바와 기울어진 창 레이아웃 분리 쉘 */}
      <div className="flex-1 w-full max-w-5xl mx-auto flex flex-col items-center justify-center relative overflow-hidden pt-2 pb-6">
        {/* PANEL 01 : 헤더 바와 기울어진 채팅 창 "사이" 공간에 배치 */}
        <div className="relative z-30 flex flex-col items-center mb-2 shrink-0 scale-95 sm:scale-100">
          <div className="relative flex items-center">
            {/* 좌측 가이드 윙 데코 */}
            <div className="absolute right-24 top-6 hidden md:flex items-center space-x-2 opacity-40">
              <span className="text-[8px] font-black text-[#1A3A4B] uppercase whitespace-nowrap tracking-wider">MY NAME IS R2-D2</span>
              <div className="w-12 h-[1px] bg-[#1A3A4B]" />
            </div>

            {/* R2-D2 SVG 모듈 */}
            <svg viewBox="0 0 64 48" className="w-16 h-12 drop-shadow-[0_3px_5px_rgba(0,0,0,0.15)]">
              <path d="M8,40 A24,24 0 0,1 56,40 Z" fill="#D2E4F2" stroke="#1A3A4B" strokeWidth="1.5" />
              <rect x="8" y="38" width="48" height="4" fill="#A8C5DB" stroke="#1A3A4B" strokeWidth="1.5" />
              <path d="M24,16 H40 V24 H24 Z" fill="#2D4D5C" />
              <rect x="14" y="28" width="6" height="6" fill="#2D4D5C" />
              <rect x="44" y="28" width="6" height="6" fill="#2D4D5C" />
              <circle cx="32" cy="24" r="5" fill="#0f172a" stroke="#1A3A4B" strokeWidth="1" />
              <circle cx="33" cy="23" r="1.5" fill="#B2D0E5" />
              <circle cx="20" cy="34" r="2" className={`${isSubmitting ? "fill-blue-500 animate-pulse" : "fill-blue-900/40"}`} />
            </svg>

            {/* 우측 가이드 윙 데코 */}
            <div className="absolute left-24 top-6 hidden md:flex items-center space-x-2 opacity-40">
              <div className="w-12 h-[1px] bg-[#1A3A4B]" />
              <span className="text-[8px] font-black text-[#1A3A4B] uppercase whitespace-nowrap tracking-wider">NICE TO MEET YOU</span>
            </div>
          </div>
          <h2 className="text-[10px] font-black tracking-[0.6em] text-[#2D4D5C] uppercase mt-1 pl-[0.6em]">DEEP SPACE</h2>
        </div>

        {/* 3D 대화창 : 방명록 */}
        <div
          className="w-[92%] flex-1 max-h-[80%] border-2 border-[#1A3A4B] bg-[#FFFDF9]/10 backdrop-blur-xs rounded-xl flex flex-col justify-between overflow-hidden shadow-inner transition-transform duration-500 mx-auto relative"
          style={{ transform: "perspective(1200px) rotateX(20deg) translateY(0px)" }}
        >
          {/* 방명록 : 상단 중앙을 지탱하는 고정 클립 장식 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3 border-b-2 border-x-2 border-[#1A3A4B] bg-[#97BDD7]/90 rounded-b-sm pointer-events-none z-20" />

          {/* 방명록 : 우측 하단의 하프톤 격자 도트 백그라운드 레이어 */}
          <div className="absolute -bottom-4 -right-4 w-32 h-32 opacity-[0.04] bg-[radial-gradient(#1a3a4b_2px,transparent_2px)] bg-[size:8px_6px] pointer-events-none z-0" />

          {/* 방명록 : 네 모서리의 정밀 조준선 크로스헤어 (Reticle) 눈금 장식 */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#1A3A4B]/40 pointer-events-none" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#1A3A4B]/40 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#1A3A4B]/40 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#1A3A4B]/40 pointer-events-none" />

          {/* 리스트 스캔 스크린 */}
          <div className="flex-1 overflow-y-auto custom-blueprint-scroll space-y-4 p-4 md:p-6 pr-2 flex flex-col z-10 bg-[radial-gradient(#1a3a4b_0.5px,transparent_0.5px)] bg-[size:12px_12px] bg-opacity-[0.02]">
            {isLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center text-xs font-black tracking-widest text-[#1A3A4B] animate-pulse gap-2">
                <span>📟 DATAPAD_SYNCING: STREAMING HOLO-LOGS...</span>
                <div className="w-24 h-1 bg-[#1A3A4B]/20 rounded-full overflow-hidden">
                  <div className="h-full bg-[#1A3A4B] animate-[loading_1.5s_infinite]" />
                </div>
              </div>
            ) : posts && posts.length > 0 ? (
              posts
                .slice()
                .reverse()
                .map((post) => {
                  const isMe = user?.id === post.user_id
                  return (
                    <div key={post.id} className={`flex flex-col max-w-[75%] space-y-1 ${isMe ? "self-end items-end" : "self-start items-start"}`}>
                      <span className="text-[9px] font-black tracking-wider text-[#1A3A4B]/60 px-1">{isMe ? "🩵 YOU" : `🩵 ${post.nickname || post.author_nickname}`}</span>
                      <div
                        className={`border-2 border-[#1A3A4B] p-3 rounded-lg text-xs font-bold leading-relaxed tracking-wide shadow-[3px_3px_0px_rgba(26,58,75,0.15)] animate-hologram-in ${
                          isMe ? "bg-[#1A3A4B] text-[#FFFDF9] rounded-tr-none" : "bg-[#FFFDF9] text-[#1A3A4B] rounded-tl-none"
                        }`}
                      >
                        {post.content}
                      </div>
                    </div>
                  )
                })
            ) : (
              <div className="flex-1 flex items-center justify-center text-[11px] font-bold text-[#1A3A4B]/50 tracking-wider">📭 NO INCOMING TRANSMISSIONS IN THIS SECTOR.</div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>
      </div>

      {/* LOWER ZONE: 제어판 대시보드 */}
      <div className="relative z-20 w-full bg-[#97BDD7] border-t-2 border-[#1A3A4B] py-6 px-4 md:px-8 flex flex-col sm:flex-row items-center justify-center gap-6 shrink-0">
        {/* [좌측 계기판] */}
        <div className="flex flex-col items-center sm:items-start gap-2 border border-[#1A3A4B]/30 bg-[#B2D0E5]/50 p-3 rounded-md w-full sm:w-64 shrink-0">
          <div className="text-[10px] text-[#1A3A4B] font-black px-4 tracking-widest uppercase rounded-sm flex items-center gap-1.5">
            <span className={`w-1 h-1 rounded-full ${isLoggedIn ? "bg-[#098059] animate-ping" : "bg-red-400"}`} />
            {isLoggedIn ? user?.user_metadata?.nickname : "OFFLINE_GUEST"}
          </div>

          <div className="w-full h-4 border border-[#1A3A4B] bg-[#FFFDF9]/40 rounded-sm relative overflow-hidden">
            <div className={`h-full transition-all duration-300 ${chargeLevel >= 100 ? "bg-emerald-500 animate-pulse" : "bg-cyan-600"}`} style={{ width: `${chargeLevel}%` }} />
            <span className="absolute inset-0 flex items-center justify-center text-[8px] font-black text-slate-900 mix-blend-overlay">
              {chargeLevel}% {chargeLevel >= 100 ? "READY" : "CHARGING"}
            </span>
          </div>

          <button
            type="button"
            onClick={handleRecharge}
            disabled={chargeLevel >= 100}
            className="w-full text-center bg-[#FFFDF9] hover:bg-[#1A3A4B] hover:text-[#B2D0E5] disabled:bg-[#1A3A4B]/10 disabled:text-[#1A3A4B]/40 text-[#1A3A4B] text-[9px] font-black py-1.5 border border-[#1A3A4B] rounded-sm shadow-[2px_2px_0px_rgba(26,58,75,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
          >
            ⚡ RECHARGE POWER CORES
          </button>
        </div>

        {/* [우측 계기판] */}
        <form onSubmit={handleTransmit} className="flex-1 max-w-2xl w-full flex items-center gap-3">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isSubmitting}
            // 비로그인 상태일 때도 입력창 안내에 보안 위반 상태 표시 유도
            placeholder={!isLoggedIn ? "🚨 SECURITY_BREACH: 승인된 요원만 주파수 개방이 가능합니다." : chargeLevel < 100 ? "좌측 게이지 100이 되어야 입력 가능합니다..." : "성공! 내용을 입력하세요."}
            className="flex-1 h-12 border-2 border-[#1A3A4B] bg-[#FFFDF9] rounded-md px-4 text-xs font-bold text-[#1A3A4B] placeholder-[#1A3A4B]/40 focus:outline-hidden focus:border-cyan-600 focus:shadow-[0_0_8px_rgba(37,79,102,0.2)] transition-all disabled:opacity-75"
          />
          <button
            type="submit"
            disabled={isSubmitting || chargeLevel < 100 || !content.trim()}
            className="h-12 bg-[#FFFDF9] hover:bg-cyan-600 hover:text-white disabled:bg-[#1A3A4B]/10 disabled:text-[#1A3A4B]/40 text-[#1A3A4B] text-xs font-black px-6 border-2 border-[#1A3A4B] rounded-md shadow-[3px_3px_0px_rgba(26,58,75,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer font-mono tracking-widest disabled:cursor-not-allowed uppercase shrink-0"
          >
            {isSubmitting ? "BEAMING..." : "🛰️ TRANSMIT"}
          </button>
        </form>
      </div>

      {/* 커스텀 Alert 오버레이 */}
      {customAlert.isOpen && (
        <div className="fixed inset-0 bg-[#1A3A4B]/60 z-9999 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] border-2 border-[#1A3A4B] rounded-md shadow-[6px_6px_0px_rgba(26,58,75,1)] w-full max-w-sm flex flex-col overflow-hidden text-[#1A3A4B] animate-in fade-in zoom-in-95 duration-100">
            <div className="bg-[#97BDD7] border-b-2 border-[#1A3A4B] px-4 py-3 font-black text-xs tracking-wider uppercase">
              <span>{customAlert.title}</span>
            </div>
            <div className="p-5 flex flex-col gap-5">
              <p className="text-xs font-semibold leading-relaxed text-[#2D4D5C] whitespace-pre-line">{customAlert.message}</p>
              <div className="flex items-center justify-end gap-3 text-xs">
                {customAlert.type === "CONFIRM" && (
                  <button
                    onClick={() => setCustomAlert((prev) => ({ ...prev, isOpen: false }))}
                    className="px-4 py-2 border border-[#1A3A4B] rounded-sm font-bold text-[#1A3A4B] hover:bg-[#1A3A4B]/10 active:scale-95 transition-all cursor-pointer"
                  >
                    아니오
                  </button>
                )}
                <button
                  onClick={() => {
                    if (customAlert.onConfirm) customAlert.onConfirm()
                    setCustomAlert((prev) => ({ ...prev, isOpen: false }))
                  }}
                  className="px-4 py-2 border-2 border-[#1A3A4B] bg-[#1A3A4B] text-[#B0CDE2] font-black rounded-sm shadow-[3px_3px_0px_rgba(26,58,75,0.2)] hover:bg-[#254F66] hover:text-white active:translate-y-[1px] active:translate-x-[1px] active:shadow-none transition-all cursor-pointer"
                >
                  {customAlert.type === "CONFIRM" ? "네" : ":: CONFIRM"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 스타일 시트 */}
      <style>{`
        .glitch-screen {
          animation: glitch-anim 0.3s linear infinite;
          filter: hue-rotate(15deg) contrast(1.1);
        }
        @keyframes glitch-anim {
          0% { transform: translate(0) skew(0deg); }
          20% { transform: translate(-2px, 2px) skew(-1deg); }
          40% { transform: translate(2px, -1px) skew(1deg); }
          60% { transform: translate(-1px, -2px) skew(0deg); }
          80% { transform: translate(2px, 2px) skew(2deg); }
          100% { transform: translate(0) skew(0deg); }
        }
        .animate-hologram-in {
          animation: hologram-pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.15) forwards;
        }
        @keyframes hologram-pop {
          0% { opacity: 0; transform: scale(0.9) translateY(10px); filter: brightness(2) blur(2px); }
          50% { filter: brightness(1.5) blur(0px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: brightness(1); }
        }
        
        /* 대화 리스트 컨테이너 내부 전용 매트 아쿠아 블루 커스텀 스크롤바 */
        .custom-blueprint-scroll::-webkit-scrollbar { width: 5px; }
        .custom-blueprint-scroll::-webkit-scrollbar-track { background: rgba(45, 77, 92, 0.08); border-radius: 99px; }
        .custom-blueprint-scroll::-webkit-scrollbar-thumb { background: #2D4D5C; border-radius: 99px; }
        .custom-blueprint-scroll::-webkit-scrollbar-thumb:hover { background: #1A3A4B; }
      `}</style>
    </div>
  )
}
