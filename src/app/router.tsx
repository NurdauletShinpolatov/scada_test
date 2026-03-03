import { Navigate, Route, Routes } from "react-router-dom"

import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import Stations from "../pages/Stations"
import StationDetails from "../pages/StationDetails"
import MainLayout from "../components/layouts/MainLayout"
import { useAuthStore } from "../store/auth.store"
import LogsPage from "../pages/LogsPage"

const Router = () => {
  const isAuth = useAuthStore((state) => state.isAuthorized)

  if (!isAuth) {
    return (
      <Routes>
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/stations" element={<Stations />} />
        <Route path="/stations/:id" element={<StationDetails />} />
        <Route path="/logs" element={<LogsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default Router