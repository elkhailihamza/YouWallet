import { Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar"

export const MainLayout = () => {
  return (
    <div className="main-layout">
        <Navbar />
        <Outlet />
    </div>
  )
}
