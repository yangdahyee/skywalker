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

export interface RouteHandleMeta {
  transition: string;
  isMenu?: boolean;          // 메인 대시보드 카드에 노출할지 여부
  label?: string;            // "SYS_01"
  moduleName?: string;       // "LUKE_MODULE"
  status?: string;           // "READY"
  statusColorClass?: string; // "bg-cyan-100 text-cyan-700"
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
            handle: { transition: "random" } 
          },
          { 
            path: "/design", 
            element: <LukePage />, 
            handle: { 
              transition: "random",
              isMenu: true,
              label: "SYS_01",
              moduleName: "LUKE_MODULE",
              status: "READY",
              statusColorClass: "bg-cyan-100 text-cyan-700"
            } 
          },
          { 
            path: "/cartoon", 
            element: <CartoonPage />, 
            handle: { 
              transition: "random",
              isMenu: true,
              label: "SYS_02",
              moduleName: "C-3PO_CORES",
              status: "ONLINE",
              statusColorClass: "bg-amber-100 text-amber-700"
            } 
          },
          { 
            path: "/game", 
            element: <GroguGame />, 
            handle: { 
              transition: "random",
              isMenu: true,
              label: "SYS_03",
              moduleName: "R2-D2_DRIVE",
              status: "STANDBY",
              statusColorClass: "bg-pink-100 text-pink-700"
            } 
          },
          { 
            path: "/stopwatch", 
            element: <MandoPage />, 
            handle: { 
              transition: "random",
              isMenu: true,
              label: "SYS_04",
              moduleName: "CHEWBACCA_COIL",
              status: "ACTIVE",
              statusColorClass: "bg-yellow-100 text-yellow-700"
            } 
          },
          { 
            path: "/signup", 
            element: <SignupPage />, 
            handle: { transition: "random" } // 메인 카드에는 안 나오지만 라우팅은 됨
          },
          { 
            path: "/fish", 
            element: <FishPage />, 
            handle: { transition: "random" } 
          },
        ],
      },
    ],
  },
]