import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { FaSun, FaMoon, FaChevronDown, FaBell, FaUserCircle, FaPlus, FaTasks, FaRegCheckCircle, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../Provider/AuthProvider";
import { useTheme } from "../Provider/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
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

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/contact", label: "Contact" },
    { to: "/upcoming-events", label: "Upcoming Events" },
  ];

  const userLinks = [
    { to: "/create-event", label: "Create Event", icon: <FaPlus /> },
    { to: "/manage-events", label: "Manage Events", icon: <FaTasks /> },
    { to: "/joined-events", label: "Joined Events", icon: <FaRegCheckCircle /> },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 ${
        isDarkMode
          ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-r from-[#457B9D] to-[#3d6fb5] text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <img
                src="/assets/logo.png"
                alt="RiseAndServe Logo"
                className="w-10 h-10 transition-transform duration-300 group-hover:rotate-12"
              />
            </motion.div>
            <span className="text-xl md:text-2xl font-bold text-white">
              RiseAndServe
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2 md:space-x-4">
            {navLinks.map(({ to, label }, index) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-[#FF6B35] via-[#F77F00] to-[#FF9E58] text-white shadow-lg shadow-orange-500/20"
                      : `hover:scale-105 ${
                          isDarkMode
                            ? "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-800 hover:via-gray-700 hover:to-gray-800"
                            : "text-gray-100 hover:text-white hover:bg-gradient-to-r hover:from-[#4CA1AF] hover:via-[#1D3557] hover:to-[#457B9D]"
                        }`
                  }`
                }
              >
                <motion.span
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {label}
                </motion.span>
              </NavLink>
            ))}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-2.5 rounded-2xl transition-all duration-300 ${
                isDarkMode
                  ? "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-yellow-300 hover:from-gray-700 hover:via-gray-600 hover:to-gray-700"
                  : "bg-gradient-to-r from-[#FF6B35] via-[#F77F00] to-[#FF9E58] text-white hover:from-[#F77F00] hover:via-[#FF9E58] hover:to-[#FF6B35]"
              }`}
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
            </motion.button>

            {!user ? (
              <Link
                to="/login"
                className="bg-gradient-to-r from-[#FF6B35] via-[#F77F00] to-[#FF9E58] px-4 py-2 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Login
              </Link>
            ) : (
              <div className="flex items-center space-x-2 relative">
                {/* Notification */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2.5 rounded-xl ${
                    isDarkMode ? "bg-gray-800 hover:bg-gray-700 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                  } transition-colors duration-200`}
                >
                  <FaBell className="w-4 h-4" />
                </motion.button>

                {/* User Menu */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className={`flex items-center space-x-2 p-2 rounded-2xl transition-all duration-300 ${
                      isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                    } ${userMenuOpen ? "ring-2 ring-orange-500 ring-opacity-50" : ""}`}
                  >
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-8 h-8 rounded-full border-2 border-orange-500"
                    />
                    <motion.div
                      animate={{ rotate: userMenuOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaChevronDown className={isDarkMode ? "text-gray-400 w-3 h-3" : "text-gray-500 w-3 h-3"} />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute right-0 mt-2 w-56 rounded-2xl shadow-xl border z-50 ${
                          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                        }`}
                      >
                        {/* User Info */}
                        <div className={`p-3 border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                          <div className="flex items-center space-x-3">
                            <img
                              src={user.photoURL}
                              alt={user.displayName}
                              className="w-10 h-10 rounded-full border-2 border-orange-500"
                            />
                            <div>
                              <p className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                {user.displayName}
                              </p>
                              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* User Links */}
                        <div className="p-2">
                          {userLinks.map(({ to, label, icon }) => (
                            <Link
                              key={to}
                              to={to}
                              className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-200 ${
                                isDarkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-700"
                              }`}
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <span className="text-base">{icon}</span>
                              <span className="font-medium">{label}</span>
                            </Link>
                          ))}
                        </div>

                        {/* Logout */}
                        <div className={`p-2 border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                          <button
                            onClick={() => {
                              handleLogout();
                              setUserMenuOpen(false);
                            }}
                            className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors duration-200"
                          >
                            <FaSignOutAlt className="text-base" />
                            <span className="font-medium">Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex lg:hidden items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-yellow-300 hover:from-gray-700 hover:via-gray-600 hover:to-gray-700"
                  : "bg-gradient-to-r from-[#FF6B35] via-[#F77F00] to-[#FF9E58] text-white hover:from-[#F77F00] hover:via-[#FF9E58] hover:to-[#FF6B35]"
              }`}
            >
              {isDarkMode ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
            </motion.button>

            {/* Hamburger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-2.5 rounded-xl transition-colors duration-300 ${
                isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <div className="w-6 h-6 relative">
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  className={`block w-full h-0.5 rounded-full absolute transition-colors ${
                    isDarkMode ? "bg-white" : "bg-gray-800"
                  }`}
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className={`block w-full h-0.5 rounded-full absolute top-2 transition-colors ${
                    isDarkMode ? "bg-white" : "bg-gray-800"
                  }`}
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  className={`block w-full h-0.5 rounded-full absolute top-4 transition-colors ${
                    isDarkMode ? "bg-white" : "bg-gray-800"
                  }`}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`lg:hidden border-t ${
              isDarkMode ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-gray-700" : "bg-gradient-to-r from-[#457B9D] via-[#1D3557] to-[#3d6fb5] border-gray-200"
            }`}
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-[#FF6B35] via-[#F77F00] to-[#FF9E58] text-white shadow-lg"
                        : `hover:scale-105 ${
                            isDarkMode ? "text-gray-300 hover:bg-gray-800 hover:text-white" : "text-gray-100 hover:bg-gray-100 hover:text-white"
                          }`
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </NavLink>
              ))}

              {user ? (
                <div className="pt-4 border-t border-gray-700 space-y-2">
                  {userLinks.map(({ to, label, icon }) => (
                    <Link
                      key={to}
                      to={to}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                        isDarkMode ? "hover:bg-gray-800 text-gray-300" : "hover:bg-gray-100 text-gray-700"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="text-base">{icon}</span>
                      <span>{label}</span>
                    </Link>
                  ))}

                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <FaSignOutAlt className="text-base" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="block w-full text-center bg-gradient-to-r from-[#FF6B35] via-[#F77F00] to-[#FF9E58] px-4 py-2 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
