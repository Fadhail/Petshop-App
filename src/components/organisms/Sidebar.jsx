import { useState } from "react"
import { Link } from "react-router-dom"

const HomeIcon = () => <div className="w-5 h-5 flex items-center justify-center">🏠</div>
const UsersIcon = () => <div className="w-5 h-5 flex items-center justify-center">👥</div>
const CalendarIcon = () => <div className="w-5 h-5 flex items-center justify-center">📅</div>
const ServiceIcon = () => <div className="w-5 h-5 flex items-center justify-center">💉</div>
const PetIcon = () => <div className="w-5 h-5 flex items-center justify-center">🐾</div>
const MenuIcon = () => <div className="w-5 h-5 flex items-center justify-center">≡</div>
const CloseIcon = () => <div className="w-5 h-5 flex items-center justify-center">✕</div>

const Sidebar = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const menuItems = [
    { name: "Home", icon: <HomeIcon />, path: "/" },
    { name: "Pets", icon: <PetIcon />, path: "/pets" },
    { name: "Owners", icon: <UsersIcon />, path: "/owners" },
    { name: "Services", icon: <ServiceIcon />, path: "/services" },
    { name: "Appointments", icon: <CalendarIcon />, path: "/appointments" },
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
        className={`fixed top-0 left-0 h-full bg-blue-700 text-white transition-all duration-300 ease-in-out z-40 
                   ${isOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full"} 
                   md:translate-x-0 md:w-64 ${className}`}
      >
        <div className="p-5 border-b border-blue-600">
          <h2 className="text-xl font-bold">Pet Shop</h2>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
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
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
