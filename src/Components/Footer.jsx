import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { Link } from "react-router";
import { useTheme } from "../Provider/ThemeContext";

const Footer = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer
      className={`${
        isDarkMode
          ? "bg-gradient-to-r from-gray-900 to-gray-800 text-gray-200"
          : "bg-gradient-to-r from-[#457B9D] to-[#3d6fb5] text-white"
      } py-8 px-4 sm:px-6 lg:px-8`}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {/* About */}
        <div className="hover:translate-y-1 transition-transform duration-300">
          <Link
            to="/"
            className="flex items-center py-3 text-2xl font-bold mb-4"
          >
            <img
              src="/assets/logo.png"
              alt="RiseAndServe Logo"
              className="w-[60px] sm:w-[80px] p-2"
            />
            RiseAndServe
          </Link>
          <p className="text-sm opacity-90">
            Connecting volunteers with events that make a real impact. Together,
            we can build a cleaner, safer, and happier community.
          </p>
        </div>

        {/* Quick Links */}
        <div className="hover:translate-y-1 transition-transform duration-300">
          <h3 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">
            Quick Links
          </h3>
          <ul className="space-y-2 sm:space-y-3">
            <li>
              <a href="#banner" className="hover:text-yellow-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#gallery" className="hover:text-yellow-400 transition">
                Gallery
              </a>
            </li>
            <li>
              <a href="#counter" className="hover:text-yellow-400 transition">
                Statistics
              </a>
            </li>
            <li>
              <a
                href="/upcoming-events"
                className="hover:text-yellow-400 transition"
              >
                Events
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="hover:translate-y-1 transition-transform duration-300">
          <h3 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">
            Contact Us
          </h3>
          <ul className="space-y-2 sm:space-y-3 text-sm mb-4">
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-yellow-400" /> info@riseandserve.org
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-yellow-400" /> +880 1234 567890
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-2 sm:gap-3 mt-2 flex-wrap">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#1877F2] text-white hover:scale-110 transition-transform"
            >
              <FaFacebookF className="text-lg sm:text-xl" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#333] text-white hover:scale-110 transition-transform"
            >
              <FaGithub className="text-lg sm:text-xl" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] text-white hover:scale-110 transition-transform"
            >
              <FaInstagram className="text-lg sm:text-xl" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#0A66C2] text-white hover:scale-110 transition-transform"
            >
              <FaLinkedinIn className="text-lg sm:text-xl" />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="hover:translate-y-1 transition-transform duration-300">
          <h3 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">
            Subscribe
          </h3>
          <p className="text-sm mb-4 opacity-90">
            Get updates about upcoming events and community initiatives.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className={`px-3 py-2 rounded-md border w-full sm:flex-1 focus:outline-none ${
                isDarkMode
                  ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                  : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
              }`}
            />
            <button
              className="px-4 py-2 rounded-md bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-500 transition"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div
        className={`mt-12 border-t ${
          isDarkMode ? "border-gray-600" : "border-gray-300"
        } pt-6 text-center text-sm opacity-80`}
      >
        &copy; {new Date().getFullYear()} RiseAndServe. All rights reserved.
      </div>
       <div className="text-center mt-6 text-base text-white">
              Developed <span className="text-orange-500">♥</span> by <a className='underline text-orange-400 hover:text-orange-300' href="https://www.facebook.com/shakib.hossian.58">Shakib Hossain</a>
            </div>
    </footer>
  );
};

export default Footer;
