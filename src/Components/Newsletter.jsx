import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaPaperPlane, FaCheck, FaUsers, FaBell, FaShieldAlt } from "react-icons/fa";
import { useTheme } from "../Provider/ThemeContext"; 

const Newsletter = () => {
  const { isDarkMode } = useTheme(); 
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 120,
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      // Simulate API call
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const features = [
    {
      icon: FaBell,
      text: "Weekly event updates"
    },
    {
      icon: FaUsers,
      text: "Volunteer spotlights"
    },
    {
      icon: FaShieldAlt,
      text: "Zero spam policy"
    }
  ];

  return (
    <section
      id="newsletter"
      className={`py-20 px-6 transition-colors duration-300 ${
        isDarkMode 
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-br from-[#1D3557] to-[#457B9D] text-white"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left">
            <div 
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
              data-aos="fade-up"
            >
              <FaPaperPlane className="text-[#FF6B35] mr-2" />
              <span className="text-sm font-semibold">NEWSLETTER</span>
            </div>

            <h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Never Miss an <span className="text-[#FF6B35]">Event</span>
            </h2>
            
            <p 
              className="text-xl text-gray-200 mb-8 leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Join thousands of volunteers who receive exclusive updates, early access to events, and inspiring community stories.
            </p>

            {/* Features List */}
            <div 
              className="space-y-4 mb-8"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center">
                    <feature.icon className="text-white text-sm" />
                  </div>
                  <span className="text-gray-200 font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div 
              className="flex gap-8"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FF6B35]">5K+</div>
                <div className="text-gray-300 text-sm">Subscribers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#2A9D8F]">98%</div>
                <div className="text-gray-300 text-sm">Open Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#F77F00]">24h</div>
                <div className="text-gray-300 text-sm">Early Access</div>
              </div>
            </div>
          </div>

          {/* Right Content - Subscription Card */}
          <div 
            className="relative"
            data-aos="zoom-in"
            data-aos-delay="500"
          >
            <div className={`relative rounded-2xl p-8 backdrop-blur-sm border ${
              isDarkMode 
                ? "bg-white/5 border-white/10"
                : "bg-white/10 border-white/20"
            }`}>
              {/* Success Message */}
              {isSubscribed && (
                <div className="absolute inset-0 bg-green-500/90 rounded-2xl flex items-center justify-center z-10 backdrop-blur-sm">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaCheck className="text-green-500 text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Welcome Aboard!</h3>
                    <p className="text-green-100">Check your inbox for a confirmation email.</p>
                  </div>
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">Join Our Community</h3>
              <p className="text-gray-300 mb-6">Get started with your email address</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className={`w-full px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition-all ${
                      isDarkMode 
                        ? "bg-gray-800 text-white placeholder-gray-400"
                        : "bg-white text-gray-900 placeholder-gray-500"
                    }`}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF6B35] to-[#F77F00] text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                >
                  <span>Subscribe Now</span>
                  <FaPaperPlane />
                </button>
              </form>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-center gap-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <FaShieldAlt className="text-green-400" />
                    <span>SSL Secure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheck className="text-blue-400" />
                    <span>1-Click Unsubscribe</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#FF6B35] rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#2A9D8F] rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;