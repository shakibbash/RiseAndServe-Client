import { useState } from "react";
import { Link, NavLink } from "react-router"; // Correct import
import { FaBars, FaTimes } from "react-icons/fa";
// import { useAuth } from "../hooks/useAuth"; // Uncomment when ready
// import ThemeToggle from "./ThemeToggle"; // Uncomment when ready

const Navbar = () => {
  // const { user, logout } = useAuth(); // Uncomment when using auth
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-[#457B9D] to-[#3d6fb5]  text-white shadow-lg">
      <div className="px-2 md:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center py-3 text-2xl font-bold text-[#F1FAEE]"
        >
          <img
            src="/assets/logo.png"
            alt="RiseAndServe Logo"
            className="w-[80px]  p-2"
          />
          RiseAndServe
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/upcoming-events"
            className={({ isActive }) =>
              isActive
                ? "text-[#FF6B35] font-semibold"
                : "hover:text-[#A8DADC] transition-colors"
            }
          >
            Upcoming Events
          </NavLink>

          {/* ThemeToggle placeholder */}
          {/* <ThemeToggle /> */}

          {!false /* replace with !user when using auth */ ? (
            <Link
              to="/login"
              className="bg-gradient-to-r from-[#FF6B35] to-[#F77F00] w-[90px] h-10 flex items-center justify-center rounded-full hover:from-[#F77F00] hover:to-[#FF6B35] transition-all"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              {/* Profile Picture */}
              <img
                src="/assets/placeholder.png" // replace with user.photoURL
                alt="User" // replace with user.displayName
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                title="User" // replace with user.displayName
              />

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg z-50">
                  <Link
                    to="/create-event"
                    className="block px-4 py-2 hover:bg-gradient-to-r hover:from-[#FF6B35] hover:to-[#F77F00] hover:text-white transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Create Event
                  </Link>
                  <Link
                    to="/manage-events"
                    className="block px-4 py-2 hover:bg-gradient-to-r hover:from-[#FF6B35] hover:to-[#F77F00] hover:text-white transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Manage Events
                  </Link>
                  <Link
                    to="/joined-events"
                    className="block px-4 py-2 hover:bg-gradient-to-r hover:from-[#FF6B35] hover:to-[#F77F00] hover:text-white transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Joined Events
                  </Link>
                  <button
                    // onClick={logout} // uncomment when using auth
                    className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="ml-2 focus:outline-none"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-r from-[#1D3557] to-[#457B9D] text-white px-4 pb-4 space-y-2">
          <NavLink
            to="/upcoming-events"
            className={({ isActive }) =>
              isActive
                ? "block text-[#FF6B35] font-semibold"
                : "block hover:text-[#A8DADC] transition-colors"
            }
            onClick={() => setMenuOpen(false)}
          >
            Upcoming Events
          </NavLink>

          {!false /* replace with !user when using auth */ ? (
            <Link
              to="/login"
              className="block bg-gradient-to-r from-[#FF6B35] to-[#F77F00] px-4 py-2 rounded hover:from-[#F77F00] hover:to-[#FF6B35] transition-all"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          ) : (
            <div className="space-y-1">
              <Link
                to="/create-event"
                className="block px-4 py-2 hover:bg-gradient-to-r hover:from-[#FF6B35] hover:to-[#F77F00] hover:text-white transition"
                onClick={() => setMenuOpen(false)}
              >
                Create Event
              </Link>
              <Link
                to="/manage-events"
                className="block px-4 py-2 hover:bg-gradient-to-r hover:from-[#FF6B35] hover:to-[#F77F00] hover:text-white transition"
                onClick={() => setMenuOpen(false)}
              >
                Manage Events
              </Link>
              <Link
                to="/joined-events"
                className="block px-4 py-2 hover:bg-gradient-to-r hover:from-[#FF6B35] hover:to-[#F77F00] hover:text-white transition"
                onClick={() => setMenuOpen(false)}
              >
                Joined Events
              </Link>
              <button
                // onClick={logout} // uncomment when using auth
                className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
