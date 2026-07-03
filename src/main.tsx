import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { appMainRoutes } from "./routes"
import "./index.css" // 테일윈드 스타일

const router = createBrowserRouter(appMainRoutes)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
