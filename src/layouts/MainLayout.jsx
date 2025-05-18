import Sidebar from "../components/organisms/Sidebar"
import { Outlet } from "react-router-dom";

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 md:ml-64 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout