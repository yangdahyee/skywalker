import { useQuery } from "@tanstack/react-query"
import { getPostsApi } from "../../api/posts"

export function useFetchPosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getPostsApi,
  })
}
