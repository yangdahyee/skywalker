import { supabase } from "../shared/supabaseClient";

export interface CreatePostParams {
  title: string;
  content: string;
  userId: string;
  nickname: string;
}

// [GET] 최신 등록순으로 전체 글 목록 스캔
export const getPostsApi = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

// [POST] 새 게시글 인젝션
export const createPostApi = async ({ title, content, userId, nickname }: CreatePostParams) => {
  const { data, error } = await supabase
    .from("posts")
    .insert([
      {
        title,
        content,
        user_id: userId,
        author_nickname: nickname,
      },
    ])
    .select();

  if (error) throw error;
  return data;
};

// [DELETE] 글 ID 기준 행 파괴
export const deletePostApi = async (postId: number) => {
  const { error } = await supabase.from("posts").delete().eq("id", postId);
  if (error) throw error;
};