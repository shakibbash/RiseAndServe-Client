import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FaUsers, FaCalendarAlt, FaClipboardList, FaGlobeAmericas } from "react-icons/fa";
import { useTheme } from "../Provider/ThemeContext";

const RiseCounter = () => {
  const { isDarkMode } = useTheme(); 
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
      mirror: true,
      offset: 120,
    });
  }, []);

  return (
    <section
      ref={ref}
      id="counter"
      className={`py-16 transition-colors duration-300 ${
        isDarkMode 
          ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-r from-[#1D3557] to-[#457B9D] text-white"
      }`}
      data-aos="fade-up"
      data-aos-once="false"
    >
      {/* Heading */}
      <p className="text-[#FF6B35] font-semibold tracking-widest uppercase mb-2 text-center">
        Our Impact
      </p>
      <h2 className="text-4xl font-bold mb-4 text-center">
        Together We Rise & Serve 🌍
      </h2>
      <p className="text-gray-200 max-w-xl mx-auto mb-12 text-center">
        Celebrating the collective effort of our volunteers and communities across the globe.
      </p>

      {/* Counters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-11/12 mx-auto">
        {/* Volunteers */}
        <div
          data-aos="zoom-in"
          data-aos-delay="100"
          className="bg-white/10 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1"
        >
          <FaUsers className="text-[#FF6B35] text-4xl mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-[#FF6B35]">
            {inView && (
              <CountUp start={0} end={5000} duration={2} suffix="+" separator="," />
            )}
          </h2>
          <p className="mt-2 font-medium text-sm">Volunteers Joined</p>
        </div>

        {/* Events Organized */}
        <div
          data-aos="zoom-in"
          data-aos-delay="200"
          className="bg-white/10 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1"
        >
          <FaCalendarAlt className="text-[#2A9D8F] text-4xl mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-[#2A9D8F]">
            {inView && <CountUp start={0} end={250} duration={2} suffix="+" />}
          </h2>
          <p className="mt-2 font-medium text-sm">Events Organized</p>
        </div>

        {/* Communities Impacted */}
        <div
          data-aos="zoom-in"
          data-aos-delay="300"
          className="bg-white/10 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1"
        >
          <FaClipboardList className="text-[#F77F00] text-4xl mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-[#F77F00]">
            {inView && <CountUp start={0} end={120} duration={2} suffix="+" />}
          </h2>
          <p className="mt-2 font-medium text-sm">Communities Impacted</p>
        </div>

        {/* Countries Reached */}
        <div
          data-aos="zoom-in"
          data-aos-delay="400"
          className="bg-white/10 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1"
        >
          <FaGlobeAmericas className="text-[#E63946] text-4xl mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-[#E63946]">
            {inView && <CountUp start={0} end={50} duration={2} suffix="+" />}
          </h2>
          <p className="mt-2 font-medium text-sm">Countries Reached</p>
        </div>
      </div>
    </section>
  );
};

export default RiseCounter;
