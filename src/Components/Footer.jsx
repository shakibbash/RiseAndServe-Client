import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaHeart,
} from "react-icons/fa";
import { Link } from "react-router";
import { useTheme } from "../Provider/ThemeContext";

const Footer = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer
      className={`${
        isDarkMode
          ? "bg-gradient-to-br from-white-900 via-white-800 to-white-900 text-white-200"
          : "bg-gradient-to-r from-[#457B9D] to-[#3d6fb5] text-white"
      } relative`}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6  py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="relative">
                <img
                  src="/assets/logo.png"
                  alt="RiseAndServe Logo"
                  className="w-16 h-16 transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className=" text-2xl font-bold text-white bg-clip-text ">
                RiseAndServe
              </span>
            </div>
            <p className="text-white-300 leading-relaxed mb-6 text-sm">
              Connecting volunteers with events that make a real impact. Together,
              we build cleaner, safer, and happier communities through meaningful action.
            </p>
            <div className="flex items-center space-x-2 text-sm text-white">
              <FaMapMarkerAlt className="text-blue-400" />
              <span>Chittagong, Bangladesh</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4 relative inline-block">
              Quick Links
              <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-teal-400"></div>
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "#banner" },
                { name: "Gallery", href: "#gallery" },
                { name: "Statistics", href: "#counter" },
                { name: "Events", href: "/upcoming-events" },
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group flex items-center text-white-300 hover:text-white transition-colors duration-300"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></div>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4 relative inline-block">
              Get In Touch
              <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-teal-400"></div>
            </h3>
            
            <div className="space-y-4">
              <a
                href="mailto:info@riseandserve.org"
                className="flex items-center group text-white-300 hover:text-white transition-colors duration-300"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                  <FaEnvelope className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-sm text-white">Email</p>
                  <p>info@riseandserve.org</p>
                </div>
              </a>

              <a
                href="tel:+8801234567890"
                className="flex items-center group text-white-300 hover:text-white transition-colors duration-300"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                  <FaPhoneAlt className="text-white text-sm" />
                </div>
                <div>
                  <div className="text-sm text-white">Phone</div>
                  <div>+880 1234 567890</div>
                </div>
              </a>
            </div>

            {/* Social Icons */}
            <div className="pt-4">
              <div className="flex space-x-3">
                {[
                  { icon: FaFacebookF, color: "bg-[#1877F2]", href: "https://facebook.com" },
                  { icon: FaGithub, color: "bg-[#333]", href: "https://github.com" },
                  { icon: FaInstagram, color: "bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888]", href: "https://instagram.com" },
                  { icon: FaLinkedinIn, color: "bg-[#0A66C2]", href: "https://linkedin.com" },
                  { icon: FaTwitter, color: "bg-[#1DA1F2]", href: "https://twitter.com" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} w-10 h-10 rounded-xl flex items-center justify-center text-white transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg`}
                  >
                    <social.icon className="text-sm" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4 relative inline-block">
              Stay Updated
              <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-teal-400"></div>
            </h3>
            
            <p className="text-white-300 text-sm leading-relaxed">
              Get the latest updates on upcoming events, community initiatives, and volunteer opportunities.
            </p>
            
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none focus:scale-105 ${
                  isDarkMode
                    ? "border-white-600 bg-white-800 text-white placeholder-white-400 focus:border-blue-500"
                    : "border-white-300 bg-white text-gray-900 placeholder-white-500 focus:border-blue-500"
                }`}
              />
              <button className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold py-3 px-6 rounded-xl transform hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2">
                <span>Subscribe</span>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white-700 mt-12 pt-6 pb-4">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="text-white text-sm">
              &copy; {new Date().getFullYear()} RiseAndServe. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-white">
              <a href="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors duration-300">Terms of Service</a>
              <a href="/cookies" className="hover:text-white transition-colors duration-300">Cookies</a>
            </div>

            <div className="flex items-center text-sm text-white">
              Developed with <FaHeart className="text-red-500 mx-1 animate-pulse" /> by{" "}
              <a 
                href="https://www.facebook.com/shakib.hossian.58" 
                className="ml-1 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent font-semibold hover:scale-105 transition-transform duration-300"
              >
                Shakib Hossain
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
