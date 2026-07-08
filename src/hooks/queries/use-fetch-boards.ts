import { useQuery } from "@tanstack/react-query"
import { getBoardsApi } from "../../api/boards"

export function useFetchBoards() {
  return useQuery({
    queryKey: ["boards"],
    queryFn: getBoardsApi,
  })
}
