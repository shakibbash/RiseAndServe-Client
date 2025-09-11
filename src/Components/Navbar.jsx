import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { FaSun, FaMoon } from "react-icons/fa";
import { useAuth } from "../Provider/AuthProvider";
import { useTheme } from "../Provider/ThemeContext";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Logged Out",
              text: "You have been successfully logged out",
              timer: 1500,
              showConfirmButton: false,
            });
            navigate("/");
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Failed to log out. Please try again.",
            });
          });
      }
    });
  };

  return (
    <nav
      className={`shadow-lg transition-colors duration-300 ${
        isDarkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-r from-[#457B9D] to-[#3d6fb5] text-white"
      }`}
    >
      <div className="px-4 md:px-8 flex justify-between items-center h-16 relative">
        {/* Logo */}
        <Link to="/" className="flex items-center py-3 text-2xl font-bold">
          <img
            src="/assets/logo.png"
            alt="RiseAndServe Logo"
            className="w-[70px] p-1"
          />
          RiseAndServe
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex space-x-10 absolute left-1/2 transform -translate-x-1/2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-[#FF6B35] font-semibold"
                : "hover:text-[#A8DADC] transition-colors"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-[#FF6B35] font-semibold"
                : "hover:text-[#A8DADC] transition-colors"
            }
          >
            Contact
          </NavLink>
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
        </div>

        {/* Right side: Theme & Auth */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors duration-300 cursor-pointer ${
              isDarkMode
                ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
                : "bg-orange-100 text-orange-500 hover:bg-orange-200"
            }`}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>

          {!user ? (
            <Link
              to="/login"
              className="bg-gradient-to-r from-[#FF6B35] to-[#F77F00] px-4 py-2 rounded-full hover:from-[#F77F00] hover:to-[#FF6B35] transition-all"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
                title={user.displayName}
              />
              {menuOpen && (
                <div
                  className={`absolute right-0 mt-2 w-48 rounded shadow-lg z-50 ${
                    isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
                  }`}
                >
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
                    onClick={handleLogout}
                    className="btn-danger cursor-pointer w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors duration-300 ${
              isDarkMode
                ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
                : "bg-orange-100 text-orange-500 hover:bg-orange-200"
            }`}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* Animated Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="relative w-8 h-6 focus:outline-none">
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-full h-1 bg-white rounded"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-full h-1 bg-white rounded my-1"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-full h-1 bg-white rounded"
            />
          </button>
        </div>
      </div>
{/* Mobile Menu */}
{menuOpen && (
  <div
    className={`md:hidden px-4 pb-4 space-y-2 ${
      isDarkMode
        ? "bg-gray-900 text-white"
        : "bg-gradient-to-r from-[#1D3557] to-[#457B9D] text-white"
    }`}
  >
    {/* Main Links */}
    <NavLink
      to="/"
      className="block py-2"
      onClick={() => setMenuOpen(false)}
    >
      Home
    </NavLink>
    <NavLink
      to="/contact"
      className="block py-2"
      onClick={() => setMenuOpen(false)}
    >
      Contact
    </NavLink>
    <NavLink
      to="/upcoming-events"
      className="block py-2"
      onClick={() => setMenuOpen(false)}
    >
      Upcoming Events
    </NavLink>

    {/* User-specific Links */}
    {!user ? (
      <Link
        to="/login"
        className="block py-2 bg-gradient-to-r from-[#FF6B35] to-[#F77F00] text-white rounded-lg text-center"
        onClick={() => setMenuOpen(false)}
      >
        Login
      </Link>
    ) : (
      <>
        <Link
          to="/create-event"
          className="block py-2 hover:bg-gradient-to-r hover:from-[#FF6B35] hover:to-[#F77F00] rounded-lg transition"
          onClick={() => setMenuOpen(false)}
        >
          Create Event
        </Link>
        <Link
          to="/manage-events"
          className="block py-2 hover:bg-gradient-to-r hover:from-[#FF6B35] hover:to-[#F77F00] rounded-lg transition"
          onClick={() => setMenuOpen(false)}
        >
          Manage Events
        </Link>
        <Link
          to="/joined-events"
          className="block py-2 hover:bg-gradient-to-r hover:from-[#FF6B35] hover:to-[#F77F00] rounded-lg transition"
          onClick={() => setMenuOpen(false)}
        >
          Joined Events
        </Link>
        <button
          onClick={() => {
            handleLogout();
            setMenuOpen(false);
          }}
          className="cursor-pointer block w-full text-left py-2 hover:bg-red-500 hover:text-white rounded-lg transition"
        >
          Logout
        </button>
      </>
    )}
  </div>
)}

    </nav>
  );
};

export default Navbar;
