import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

const HomeIcon = () => <div className="w-5 h-5 flex items-center justify-center">🏠</div>
const UsersIcon = () => <div className="w-5 h-5 flex items-center justify-center">👥</div>
const CalendarIcon = () => <div className="w-5 h-5 flex items-center justify-center">📅</div>
const ServiceIcon = () => <div className="w-5 h-5 flex items-center justify-center">💉</div>
const PetIcon = () => <div className="w-5 h-5 flex items-center justify-center">🐾</div>
const MenuIcon = () => <div className="w-5 h-5 flex items-center justify-center">≡</div>
const CloseIcon = () => <div className="w-5 h-5 flex items-center justify-center">✕</div>
const LogoutIcon = () => <div className="w-5 h-5 flex items-center justify-center">🚪</div>

const Sidebar = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const menuItems = [
    { name: "Home", icon: <HomeIcon />, path: "/admin" },
    { name: "Pets", icon: <PetIcon />, path: "/admin/pets" },
    { name: "Owners", icon: <UsersIcon />, path: "/admin/owners" },
    { name: "Services", icon: <ServiceIcon />, path: "/admin/services" },
    { name: "Appointments", icon: <CalendarIcon />, path: "/admin/appointments" },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md"
        aria-label="Toggle menu"
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar} />}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-blue-700 text-white transition-all duration-300 ease-in-out z-40 
                   ${isOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full"} 
                   md:translate-x-0 md:w-64 ${className} flex flex-col`}
      >
        <div className="p-5 border-b border-blue-600">
          <h2 className="text-xl font-bold">Pet Shop Admin</h2>
          {user && (
            <div className="mt-2">
              <p className="text-sm text-blue-200">Welcome, {user.username}</p>
              <span className="inline-block bg-blue-500 text-xs px-2 py-1 rounded-full mt-1">
                {user.role}
              </span>
            </div>
          )}
        </div>

        <nav className="p-4 flex flex-col h-full">
          <ul className="space-y-2 flex-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Logout button */}
          <div className="border-t border-blue-600 pt-4 mt-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 w-full rounded-md hover:bg-red-600 transition-colors text-left"
            >
              <LogoutIcon />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
