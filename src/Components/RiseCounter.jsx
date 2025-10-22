import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { 
  FaUsers, 
  FaCalendarAlt, 
  FaClipboardList, 
  FaGlobeAmericas
} from "react-icons/fa";
import { useTheme } from "../Provider/ThemeContext";

const RiseCounter = () => {
  const { isDarkMode } = useTheme(); 
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [hasCounted, setHasCounted] = useState(false);

  useEffect(() => { AOS.init({ duration: 800, easing: "ease-out-cubic", once: true }); }, []);
  useEffect(() => { if (inView && !hasCounted) setHasCounted(true); }, [inView, hasCounted]);

  return (
    <section
      ref={ref}
      id="counter"
      className={`relative py-16 transition-all duration-500 overflow-hidden ${
        isDarkMode 
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-[#1D3557] via-[#457B9D] to-[#1D3557]"
      }`}
    >
      {/* Background Floating Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#FF6B35] rounded-full blur-xl animate-bounce-slow"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-[#2A9D8F] rounded-full blur-xl animate-bounce-slower"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-[#F77F00] rounded-full blur-xl animate-bounce-slow"></div>
        <div className="absolute bottom-10 right-32 w-12 h-12 bg-[#E63946] rounded-full blur-xl animate-bounce-slower"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl sm:text-3xl font-bold text-white mb-2">
            Together We <span className="">Rise</span> & <span className="text-[#FF6B35]">Serve</span>
          </h2>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            Celebrating the collective effort of our volunteers and communities making a real difference.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Volunteers */}
          <div 
            data-aos="zoom-in" data-aos-delay="100"
            className={`group text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#FF6B35]/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl`}
          >
            <div className="relative inline-flex mb-4">
              <div className="relative bg-gradient-to-br from-[#FF6B35] to-[#F77F00] p-3 rounded-xl text-white shadow-md">
                <FaUsers className="text-xl" />
              </div>
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-1">
              {hasCounted && <CountUp start={0} end={5000} duration={2} suffix="+" separator="," />}
            </h3>
            <p className="text-white/80 text-sm sm:text-base font-medium">Volunteers Joined</p>
          </div>

          {/* Events */}
          <div 
            data-aos="zoom-in" data-aos-delay="200"
            className={`group text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#2A9D8F]/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl`}
          >
            <div className="relative inline-flex mb-4">
              <div className="relative bg-gradient-to-br from-[#2A9D8F] to-[#1DB954] p-3 rounded-xl text-white shadow-md">
                <FaCalendarAlt className="text-xl" />
              </div>
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-1">
              {hasCounted && <CountUp start={0} end={250} duration={2} suffix="+" />}
            </h3>
            <p className="text-white/80 text-sm sm:text-base font-medium">Events Organized</p>
          </div>

          {/* Communities */}
          <div 
            data-aos="zoom-in" data-aos-delay="300"
            className={`group text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#F77F00]/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl`}
          >
            <div className="relative inline-flex mb-4">
              <div className="relative bg-gradient-to-br from-[#F77F00] to-[#FF9E58] p-3 rounded-xl text-white shadow-md">
                <FaClipboardList className="text-xl" />
              </div>
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-1">
              {hasCounted && <CountUp start={0} end={120} duration={2} suffix="+" />}
            </h3>
            <p className="text-white/80 text-sm sm:text-base font-medium">Communities Impacted</p>
          </div>

          {/* Countries */}
          <div 
            data-aos="zoom-in" data-aos-delay="400"
            className={`group text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#E63946]/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl`}
          >
            <div className="relative inline-flex mb-4">
              <div className="relative bg-gradient-to-br from-[#E63946] to-[#FF6B6B] p-3 rounded-xl text-white shadow-md">
                <FaGlobeAmericas className="text-xl" />
              </div>
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-1">
              {hasCounted && <CountUp start={0} end={50} duration={2} suffix="+" />}
            </h3>
            <p className="text-white/80 text-sm sm:text-base font-medium">Countries Reached</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiseCounter;
