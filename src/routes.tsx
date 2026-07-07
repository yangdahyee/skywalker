// src/routes.tsx
import App from "./App"
import MainPage from "./pages/MainPage"
import LukePage from "./pages/LukePage"
import CartoonPage from "./pages/CartoonPage"
import GroguGame from "./pages/GroguGame"
import TransitionLayout from "./components/layout/TransitionLayout"
import MandoPage from "./pages/MandoPage"
import SignupPage from "./pages/SignupPage"
import FishPage from "./pages/FishPage"
import LoginPage from "./pages/LoginPage"
import CommunityPage from "./pages/CommunityPage"
import HoloChatPage from "./pages/HoloChatPage"
//import LuckyTicketPage from "./pages/LuckyTicketPage"

export interface RouteHandleMeta {
  transition: string
  isMenu?: boolean // 메인 대시보드 카드에 노출할지 여부
  label?: string // "SYS_01"
  moduleName?: string // "LUKE_MODULE"
  status?: string // "READY"
  statusColorClass?: string // "bg-cyan-100 text-cyan-700"
}

export const appMainRoutes = [
  {
    element: <App />,
    children: [
      {
        element: <TransitionLayout />,
        children: [
          {
            path: "/",
            element: <MainPage />,
            handle: { transition: "random" },
          },
          {
            path: "/fish",
            element: <FishPage />,
            handle: {
              transition: "random",
              isMenu: true,
              label: "SYS_01",
              moduleName: "Fish",
              status: "READY",
              statusColorClass: "bg-cyan-100 text-cyan-700",
            },
          },
          {
            path: "/cartoon",
            element: <CartoonPage />,
            handle: {
              transition: "random",
              isMenu: true,
              label: "SYS_02",
              moduleName: "Map",
              status: "ONLINE",
              statusColorClass: "bg-amber-100 text-amber-700",
            },
          },
          {
            path: "/game",
            element: <GroguGame />,
            handle: {
              transition: "random",
              isMenu: true,
              label: "SYS_03",
              moduleName: "Game",
              status: "STANDBY",
              statusColorClass: "bg-pink-100 text-pink-700",
            },
          },
          {
            path: "/stopwatch",
            element: <MandoPage />,
            handle: {
              transition: "random",
              isMenu: true,
              label: "SYS_04",
              moduleName: "Stopwatch",
              status: "ACTIVE",
              statusColorClass: "bg-yellow-100 text-yellow-700",
            },
          },
          {
            path: "/signup",
            element: <SignupPage />,
            handle: { transition: "random" }, // 메인 카드에는 안 나오지만 라우팅은 됨
          },
          {
            path: "/design",
            element: <LukePage />,
            handle: { transition: "random" },
          },
          {
            path: "/login",
            element: <LoginPage />,
            handle: { transition: "random" },
          },
          {
            path: "/holo",
            element: <HoloChatPage />,
            handle: {
              transition: "random",
              isMenu: true,
              label: "SYS_04",
              moduleName: "Intro Memo",
              status: "ACTIVE",
              statusColorClass: "bg-yellow-100 text-yellow-700",
            },
          },
          // {
          //   path: "/ticket",
          //   element: <LuckyTicketPage />,
          //   handle: { transition: "random" },
          // },
          {
            path: "/community",
            element: <CommunityPage />,
            handle: {
              transition: "random",
              isMenu: true,
              label: "SYS_07",
              moduleName: "Community",
              status: "MONITORING",
              statusColorClass: "bg-emerald-100 text-emerald-700",
            },
          },
        ],
      },
    ],
  },
]
