// src/routes.tsx
import App from "./App"
import MainPage from "./pages/MainPage"
import LukePage from "./pages/LukePage"
import CartoonPage from "./pages/CartoonPage"
import GroguGame from "./pages/GroguGame"
import TransitionLayout from "./components/layout/TransitionLayout"

export const appMainRoutes = [
  {
    element: <App />, // 이제 App은 외부에서 default로 가져온 컴포넌트가 됨
    children: [
      {
        element: <TransitionLayout />,
        children: [
          { path: "/", element: <MainPage />, handle: { transition: "random" } },
          { path: "/timer", element: <LukePage />, handle: { transition: "random" } },
          { path: "/bucket", element: <CartoonPage />, handle: { transition: "random" } },
          { path: "/log", element: <GroguGame />, handle: { transition: "random" } },
        ],
      },
    ],
  },
]

/*
          // 특정 페이지는  고정하고 싶다면? 효과명을 적어두면 랜덤에서 제외
          { path: "/log", element: <GroguGame />, handle: { transition: "doors" } }, 
          const STARWARS_EFFECTS = ["wipe", "iris", "clock", "doors", "matrix", "bar"]
*/
