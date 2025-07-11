import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import PendingPage from "./pages/PendingPage";
import CompletedPage from "./pages/CompletedPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./redux/authSlice";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Dashboard />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoutes>
        <Settings />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/pendingPage",
    element: (
      <ProtectedRoutes>
        <PendingPage />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/completedPage",
    element: (
      <ProtectedRoutes>
        <CompletedPage />
      </ProtectedRoutes>
    ),
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(loadUser())
  },[])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
