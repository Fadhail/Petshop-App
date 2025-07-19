import { Link } from "react-router-dom";
import Button from "../atoms/Button";

const Navbar = ({ transparent = false }) => {
  const navbarClasses = transparent 
    ? "absolute top-0 left-0 right-0 z-50"
    : "absolute top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-lg";
    
  const logoTextClasses = transparent
    ? "text-2xl font-bold text-white drop-shadow-lg"
    : "text-2xl font-bold text-gray-900";

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🐾</span>
            <span className={logoTextClasses}>PetAdopt</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-md text-white hover:text-gray-200">
                Login
            </Link>
            <Link to="/" className="text-md text-white border border-white rounded-full px-4 py-1 hover:bg-white hover:text-black transition">
                Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
