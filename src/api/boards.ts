import { supabase } from "../shared/supabaseClient"

export interface CreateBoardParams {
  title: string
  content: string
  userId: string
  nickname: string
}

// [GET] 최신 등록순으로 전체 글 목록 스캔
export const getBoardsApi = async () => {
  const { data, error } = await supabase.from("boards").select("*").order("created_at", { ascending: false })

  if (error) throw error
  return data
}

// [POST] 새 게시글 인젝션
export const createBoardApi = async ({ title, content, userId, nickname }: CreateBoardParams) => {
  const { data, error } = await supabase
    .from("boards")
    .insert([
      {
        title,
        content,
        user_id: userId,
        author_nickname: nickname,
      },
    ])
    .select()

  if (error) throw error
  return data
}

// [DELETE] 글 ID 기준 행 파괴
export const deleteBoardApi = async (boardId: number) => {
  const { error } = await supabase.from("boards").delete().eq("id", boardId)
  if (error) throw error
}
