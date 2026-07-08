import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createBoardApi, deleteBoardApi } from "../../api/boards"
import type { PostgrestError } from "@supabase/supabase-js"

export function useCreateBoard() {
  const queryClient = useQueryClient()

  return useMutation<unknown, PostgrestError, { title: string; content: string; userId: string; nickname: string }>({
    mutationFn: createBoardApi,
    onSuccess: () => {
      // 글쓰기 성공 시 캐시를 강제 무효화하여 화면을 즉시 새로고침
      queryClient.invalidateQueries({ queryKey: ["boards"] })
    },
  })
}

export function useDeleteBoard() {
  const queryClient = useQueryClient()

  return useMutation<unknown, PostgrestError, number>({
    mutationFn: deleteBoardApi,
    onSuccess: () => {
      // 삭제 성공 시 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["boards"] })
    },
  })
}
