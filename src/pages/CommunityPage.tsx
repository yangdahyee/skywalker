import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import { useFetchPosts } from "../hooks/queries/use-fetch-posts"
import { useCreatePost, useDeletePost } from "../hooks/mutations/use-posts-mutation"
import type { PostItem } from "../types/posts"

export default function CommunityPage() {
  const navigate = useNavigate()
  const { user, isLoggedIn } = useAuthStore()

  // React Query
  const { data: posts, isLoading, isError } = useFetchPosts()
  const { mutate: createPost, isPending: isCreating } = useCreatePost()
  const { mutate: deletePost } = useDeletePost()

  // 폼 입력값 상태 제어
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 커스텀 알림창(Alert/Confirm) 상태 관리
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

  // 글쓰기 창 열기 전 비로그인 체크
  const handleOpenModal = () => {
    if (!isLoggedIn) {
      setCustomAlert({
        isOpen: true,
        title: "🚨 SECURITY_BREACH: UNKNOWN_PILOT",
        message: "로그인이 필요합니다.",
        type: "ALERT",
        onConfirm: () => navigate("/login"),
      })
      return
    }
    setIsModalOpen(true)
  }

  // 글 제출 핸들러
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    const nickname = user?.user_metadata?.nickname || "UNKNOWN_PILOT"
    const userId = user?.id

    if (!userId) return

    createPost(
      { title, content, userId, nickname },
      {
        onSuccess: () => {
          setTitle("")
          setContent("")
          setIsModalOpen(false)
        },
      },
    )
  }

  return (
    <div className="relative h-screen w-full bg-[#B2D0E5] text-[#1A3A4B] font-mono flex flex-col overflow-hidden">
      {/* 배경 레이어 */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1A3A4B_1px,transparent_1px),linear-gradient(to_bottom,#1A3A4B_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-[0.07] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(26,58,75,0.08))] pointer-events-none z-0" />

      {/* 페이지 TITLE 라인 */}
      <header className="relative z-30 w-full border-b-2 border-[#1A3A4B] bg-[#97BDD7] shadow-sm shrink-0">
        <div className="max-w-7xl w-full mx-auto px-4 md:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative w-4 h-4 flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1A3A4B] opacity-40"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1A3A4B]"></span>
            </div>
            <span className="font-black text-[18px] md:text-[20px] tracking-widest uppercase"> 방명록 </span>
          </div>
          <button
            onClick={() => navigate("/")}
            className="w-8 h-8 rounded-full border-2 border-[#1A3A4B] flex items-center justify-center font-black text-base hover:bg-red-500 hover:text-white transition-all cursor-pointer active:scale-90 bg-[#FFFDF9]/40"
          >
            ×
          </button>
        </div>
      </header>

      {/* 메뉴줄 */}
      <div className="relative z-30 w-full border-b border-dashed border-[#1A3A4B]/40 bg-[#A2C3DC]/40 backdrop-blur-xs shrink-0">
        <div className="max-w-7xl w-full mx-auto px-4 md:px-10 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-[10px] font-bold tracking-widest text-[#1A3A4B] flex items-center gap-3">
            <span className="bg-[#1A3A4B] text-[#B2D0E5] px-2 py-0.5 rounded-xs font-black">SECTOR LOCK</span>
            <span className="text-emerald-800 font-black flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              LIVE_STREAM
            </span>
            <span className="opacity-30 hidden sm:inline">|</span>
            <span className="hidden sm:inline">게시글: {posts?.length || 0} 개</span>
          </div>
          <button
            onClick={handleOpenModal}
            className="relative border-2 border-[#1A3A4B] text-[#B0CDE2] bg-[#1A3A4B] font-black tracking-widest text-xs py-2 px-5 rounded-md hover:bg-[#254F66] hover:text-white transition-all shadow-[3px_3px_0px_rgba(26,58,75,0.2)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none cursor-pointer overflow-hidden text-center"
          >
            메모 남기기
          </button>
        </div>
      </div>

      {/* holonet-scrollbar 클래스를 주입하여 전용 하이테크 스크롤 적용 */}
      <main className="relative z-10 flex-1 px-4 md:px-10 py-8 max-w-7xl w-full mx-auto overflow-y-auto holonet-scrollbar bg-[radial-gradient(#1a3a4b_0.5px,transparent_0.5px)] bg-[size:12px_12px] bg-opacity-5">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-40 text-xs font-bold tracking-widest text-[#1A3A4B] animate-pulse">📟 DATAPAD_SYNCING: STREAMING HOLO-NOTEPADS...</div>
        )}

        {isError && (
          <div className="border-2 border-red-600 bg-red-500/10 p-6 rounded-lg text-center text-xs font-bold text-red-900 tracking-wide shadow-md">
            🚨 CRITICAL_ERROR: MEMORY NODE CONNECTED REFUSED.
          </div>
        )}

        {!isLoading && !isError && posts?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-40 text-xs font-bold text-[#1A3A4B]/60 border-2 border-dashed border-[#1A3A4B]/40 rounded-xl bg-[#fffdf9]/40 backdrop-blur-xs">
            아직 메모가 없어요!
          </div>
        )}

        {/* 메모 그리드 */}
        {!isLoading && !isError && posts && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: PostItem) => {
              return (
                <div
                  key={post.id}
                  className="border-2 border-[#1A3A4B] bg-[#FFFDF9] p-5 rounded-md shadow-[5px_5px_0px_rgba(26,58,75,0.8)] transition-all duration-200 flex flex-col justify-between gap-4 relative overflow-hidden transform hover:-translate-y-1 hover:shadow-[8px_8px_0px_rgba(26,58,75,0.9)]"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-2.5 border-b-2 border-x-2 border-[#1A3A4B] bg-[#B0CDE2]/80 rounded-b-xs pointer-events-none" />
                  <div className="absolute -bottom-2 -right-2 w-16 h-16 opacity-[0.06] bg-[radial-gradient(#1a3a4b_2px,transparent_2px)] bg-[size:6px_6px] pointer-events-none" />
                  <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#1A3A4B]/40" />
                  <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#1A3A4B]/40" />

                  <div>
                    <div className="flex items-start justify-between border-b border-dashed border-[#1A3A4B]/40 pb-2.5 mb-2">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[8px] font-black tracking-widest text-[#1A3A4B]/60 uppercase"> #{post.id}</span>
                        <h3 className="font-black text-sm text-[#1A3A4B] tracking-tight leading-tight">{post.title}</h3>
                      </div>

                      {isLoggedIn && user?.id === post.user_id && (
                        <button
                          onClick={() => {
                            setCustomAlert({
                              isOpen: true,
                              title: "⚠️ 메모 삭제",
                              message: "진짜 삭제 할까요?",
                              type: "CONFIRM",
                              onConfirm: () => deletePost(post.id),
                            })
                          }}
                          className="text-[9px] text-red-700 font-black px-1.5 py-0.5 border border-red-700 rounded-xs bg-red-50 hover:bg-red-700 hover:text-white transition-all cursor-pointer shrink-0 active:scale-95"
                        >
                          [삭제]
                        </button>
                      )}
                    </div>
                    {/* 쪽지 본문 내부 스크롤바도 동일하게 holonet-scrollbar 처리 */}
                    <p className="text-xs text-[#2D4D5C] leading-relaxed font-semibold whitespace-pre-wrap min-h-[60px] max-h-[180px] overflow-y-auto holonet-scrollbar">{post.content}</p>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-[#1A3A4B]/70 font-bold border-t border-[#1A3A4B]/20 pt-2.5 bg-[#1A3A4B]/5 -mx-5 -mb-5 px-5 py-2">
                    <span className="truncate max-w-[120px]">
                      PILOT: <span className="font-black text-[#1A3A4B]">{post.author_nickname}</span>
                    </span>
                    <span className="font-mono text-[9px] tracking-tighter shrink-0 bg-[#B0CDE2]/40 px-1 py-0.5 rounded-xs">STARDATE: {new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* 하단 푸터 */}
      <footer className="w-full shrink-0 relative z-10 mt-auto border-t border-[#1A3A4B]/10 bg-[#B2D0E5]">
        <div className="max-w-7xl w-full mx-auto px-4 md:px-10 text-center md:text-right text-[10px] font-bold tracking-[0.25em] text-[#1A3A4B]/30 uppercase py-4 pointer-events-none">
          STAR WARS DATAPAD SYSTEM
        </div>
      </footer>

      {/* 글쓰기 다이얼로그 폼 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#1A3A4B]/50 z-50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] border-2 border-[#1A3A4B] rounded-lg shadow-[8px_8px_0px_rgba(26,58,75,1)] w-full max-w-md flex flex-col overflow-hidden text-[#1A3A4B] animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#97BDD7] border-b-2 border-[#1A3A4B] px-5 py-3.5 flex items-center justify-between font-black text-xs tracking-wider">
              <span>ENCRYPT NEW MEMO DATAPAD</span>
              <button onClick={() => setIsModalOpen(false)} className="font-black cursor-pointer hover:text-red-700 text-lg leading-none">
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black tracking-wider opacity-90">MEMO_TITLE</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="제목을 입력하세요"
                  className="w-full bg-[#B0CDE2]/20 border-2 border-[#1A3A4B] rounded-md px-3 py-2 text-xs font-bold text-[#1A3A4B] focus:outline-none focus:bg-[#FFFDF9] transition-all"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black tracking-wider opacity-90">MEMO_STREAM_DATA</label>
                <textarea
                  required
                  rows={5}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="메모를 입력하세요"
                  className="w-full bg-[#B0CDE2]/20 border-2 border-[#1A3A4B] rounded-md p-3 text-xs font-bold text-[#1A3A4B] focus:outline-none focus:bg-[#FFFDF9] transition-all resize-none holonet-scrollbar"
                />
              </div>
              <button
                type="submit"
                disabled={isCreating}
                className="w-full border-2 border-[#1A3A4B] bg-[#1A3A4B] text-[#B0CDE2] font-black uppercase tracking-widest text-xs py-3 rounded-md shadow-[4px_4px_0px_rgba(26,58,75,0.3)] hover:bg-[#254F66] transition-all active:translate-y-[2px] active:translate-x-[2px] active:shadow-none disabled:opacity-50 cursor-pointer"
              >
                {isCreating ? "등록 중..." : "등록하기"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 커스텀 Alert/Confirm */}
      {customAlert.isOpen && (
        <div className="fixed inset-0 bg-[#1A3A4B]/60 z-9999 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] border-2 border-[#1A3A4B] rounded-md shadow-[8px_8px_0px_rgba(26,58,75,1)] w-full max-w-sm flex flex-col overflow-hidden text-[#1A3A4B] animate-in fade-in zoom-in-95 duration-100">
            <div className="bg-[#97BDD7] border-b-2 border-[#1A3A4B] px-4 py-3 font-black text-xs tracking-wider uppercase flex items-center gap-2">
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

      {/* 🎨 [스크롤바 인라인 커스텀 스타일 가동] */}
      <style>{`
        /* 크롬, 사파리, 엣지 전용 하이테크 스크롤바 정밀 세팅 */
        .holonet-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        /* 스크롤바 트랙 레일 배경 (반투명 어두운 블루) */
        .holonet-scrollbar::-webkit-scrollbar-track {
          background: rgba(26, 58, 75, 0.05);
          border-radius: 9999px;
        }
        /* 스크롤바 움직이는 바 팩터 (시그니처 테크니컬 딥블루) */
        .holonet-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(26, 58, 75, 0.4);
          border-radius: 9999px;
          border: 1px solid transparent;
        }
        /* 마우스 호버 시 조금 더 짙어지는 발광 효과 */
        .holonet-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(26, 58, 75, 0.7);
        }
        /* 파이어폭스 대응 규격 */
        .holonet-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(26, 58, 75, 0.4) rgba(26, 58, 75, 0.05);
        }
      `}</style>
    </div>
  )
}
