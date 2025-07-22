import { Link, useLocation } from "react-router-dom";

const DashboardIcon = () => <span className="text-lg">📊</span>;
const HeartIcon = () => <span className="text-lg">❤️</span>;
const TipsIcon = () => <span className="text-lg">💡</span>;
const ServiceIcon = () => <span className="text-lg">🛎️</span>;

const DashboardSubNavbar = ({ className = "" }) => {
  const location = useLocation();

  const menuItems = [
    { 
      name: "Adoption", 
      icon: <DashboardIcon />, 
      path: "/dashboard"
    },
    { 
      name: "Layanan", 
      icon: <ServiceIcon />, 
      path: "/dashboard/services"
    },
    { 
      name: "Adopsi Saya", 
      icon: <HeartIcon />, 
      path: "/dashboard/my-adoptions"
    },
    { 
      name: "Tips Adopsi", 
      icon: <TipsIcon />, 
      path: "/dashboard/adoption-tips"
    },
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={`bg-white border-b border-gray-200 shadow-sm ${className}`}>
      <div className="max-w-7xl mx-auto">
        <nav className="flex space-x-0 overflow-x-auto">
          {menuItems.map((item) => {
            const isActive = isActivePath(item.path);
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center justify-center px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-all duration-200 min-w-0 flex-1 sm:flex-initial ${
                  isActive
                    ? "border-blue-500 text-blue-600 bg-blue-50"
                    : "border-transparent text-gray-600 hover:text-blue-600 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <span className="mr-2 flex-shrink-0">
                  {item.icon}
                </span>
                <span className="truncate">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default DashboardSubNavbar;
