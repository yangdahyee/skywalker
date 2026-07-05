import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { appMainRoutes } from "./routes"
import "./index.css" // 테일윈드 스타일

// 1. 비동기 서버 데이터 상태를 실시간 관제할 핵심 쿼리 클라이언트 인스턴스 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 탭 전환 시 자동 재요청 옵션 가드
      retry: 1, // 통신 유실 시 백그라운드 자동 재시도 1회 제한
    },
  },
})

const router = createBrowserRouter(appMainRoutes)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
