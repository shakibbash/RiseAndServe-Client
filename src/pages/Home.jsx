import { Link } from "react-router";
import Newsletter from "../Components/Newsletter";
import RiseCounter from "../Components/RiseCounter";
import Gallery from "../Components/Gallery";
import HomeSlider from "../Components/HomeSlider";
import PartnerSection from "../Components/PartnerSection";
import AOS from "aos";
import { useEffect } from "react";
import { useTheme } from "../Provider/ThemeContext";
import { FaHandsHelping, FaCalendarAlt, FaStar, FaBullseye } from "react-icons/fa";
import { motion } from "framer-motion";

const Home = () => {
  const { isDarkMode } = useTheme();
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
    <div className="w-full">

<section>
  <HomeSlider></HomeSlider>
</section>
      {/* ================= Feature Section ================= */}
<section 
  className={`py-16 px-4 sm:px-6 lg:px-8 transition-all duration-500 relative overflow-hidden ${
    isDarkMode
      ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
      : "bg-blue-50 text-gray-800"
  }`}
>
  {/* Animated Background Floating Elements */}
  <div  className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      animate={{ y: [0, -20, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute -top-32 -left-24 w-72 h-72 rounded-full blur-3xl opacity-20 ${
        isDarkMode ? "bg-purple-600" : "bg-blue-300"
      }`}
    ></motion.div>
    <motion.div
      animate={{ y: [0, 15, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute -bottom-32 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20 ${
        isDarkMode ? "bg-orange-600" : "bg-green-300"
      }`}
    ></motion.div>
  </div>

  <div data-aos="fade-up" className="relative z-10 max-w-6xl mx-auto">
    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <h2 className="text-3xl sm:text-4xl font-semibold mb-2">
        Why Choose RiseAndServe?
      </h2>
      <p className={`text-base sm:text-lg max-w-2xl mx-auto ${
        isDarkMode ? "text-gray-300" : "text-gray-600"
      }`}>
        Join thousands of volunteers making a real difference in their communities.
      </p>
    </motion.div>

    {/* Cards */}
    <div data-aos="fade-up" className="grid md:grid-cols-3 gap-6">
      {/* Card 1 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        whileHover={{ y: -4, scale: 1.02 }}
        className={`group relative rounded-2xl p-6 text-center backdrop-blur-sm border transition-all duration-500 ${
          isDarkMode
            ? "bg-gray-800/60 border-gray-700 hover:border-orange-500/50 hover:bg-gray-800/80"
            : "bg-white/70 border-white hover:border-orange-400/50 hover:bg-white/90"
        } hover:shadow-xl`}
      >
        <div className="relative mb-4">
          <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white text-2xl shadow-md group-hover:shadow-lg transition-all duration-500`}>
            <FaHandsHelping />
          </div>
        </div>
        <h3 className="font-semibold text-xl mb-2 group-hover:text-orange-600 transition-colors duration-300">
          Join Events
        </h3>
        <p className={`text-sm sm:text-base ${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        }`}>
          Discover and participate in community-driven events that matter.
        </p>
      </motion.div>

      {/* Card 2 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        whileHover={{ y: -4, scale: 1.02 }}
        className={`group relative rounded-2xl p-6 text-center backdrop-blur-sm border transition-all duration-500 ${
          isDarkMode
            ? "bg-gray-800/60 border-gray-700 hover:border-blue-500/50 hover:bg-gray-800/80"
            : "bg-white/70 border-white hover:border-blue-400/50 hover:bg-white/90"
        } hover:shadow-xl`}
      >
        <div className="relative mb-4">
          <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-2xl shadow-md group-hover:shadow-lg transition-all duration-500`}>
            <FaCalendarAlt />
          </div>
        </div>
        <h3 className="font-semibold text-xl mb-2 group-hover:text-blue-600 transition-colors duration-300">
          Create & Manage
        </h3>
        <p className={`text-sm sm:text-base ${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        }`}>
          Host and track your events easily with powerful tools.
        </p>
      </motion.div>

      {/* Card 3 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        whileHover={{ y: -4, scale: 1.02 }}
        className={`group relative rounded-2xl p-6 text-center backdrop-blur-sm border transition-all duration-500 ${
          isDarkMode
            ? "bg-gray-800/60 border-gray-700 hover:border-green-500/50 hover:bg-gray-800/80"
            : "bg-white/70 border-white hover:border-green-400/50 hover:bg-white/90"
        } hover:shadow-xl`}
      >
        <div className="relative mb-4">
          <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white text-2xl shadow-md group-hover:shadow-lg transition-all duration-500`}>
            <FaStar />
          </div>
        </div>
        <h3 className="font-semibold text-xl mb-2 group-hover:text-green-600 transition-colors duration-300">
          Make Impact
        </h3>
        <p className={`text-sm sm:text-base ${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        }`}>
          Collaborate with like-minded people to create lasting impact.
        </p>
      </motion.div>
    </div>
  </div>
</section>
<section>
<RiseCounter></RiseCounter>
</section>
      {/* ================= Gallery Section ================= */}
    <section>
      <Gallery></Gallery>
    </section>
<section className=" bg-white">
<PartnerSection></PartnerSection>
</section>



      {/* ================= Newsletter Section ================= */}
      <section >
   <Newsletter></Newsletter>
      </section>
    </div>
  );
};

export default Home;
