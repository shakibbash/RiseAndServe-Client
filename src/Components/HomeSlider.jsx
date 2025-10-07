import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { FaArrowRight, FaInfoCircle } from "react-icons/fa";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    title: "Join the Movement",
    subtitle: "Be part of our community of volunteers",
    primaryButton: "Get Started",
    secondaryButton: "Learn More",
    bg: "https://i.postimg.cc/C1FHJZfD/bd-clean-6.jpg",
    overlay: "rgba(0,0,0,0.5)",
  },
  {
    title: "Clean Bangladesh Initiative",
    subtitle: "Help us create a cleaner environment",
    primaryButton: "Participate Now",
    secondaryButton: "Learn More",
    bg: "https://i.postimg.cc/TPjJrjhf/clean-bangladesh.jpg",
    overlay: "rgba(0,0,0,0.5)",
  },
  {
    title: "Community Events",
    subtitle: "Connect with like-minded people",
    primaryButton: "Explore Events",
    secondaryButton: "Learn More",
    bg: "https://i.postimg.cc/N0vx9Csd/images.jpg",
    overlay: "rgba(0,0,0,0.5)",
  },
  {
    title: "Make a Difference",
    subtitle: "Your small action creates a big impact",
    primaryButton: "Join Today",
    secondaryButton: "Donate Now",
    bg: "https://i.postimg.cc/pLFZdMH9/images-1.jpg",
    overlay: "rgba(0,0,0,0.5)",
  },
];

const HomeSlider = () => {
  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        speed={1500}
        autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        loop={true}
        pagination={{ 
          clickable: true,
          el: '.custom-pagination',
          bulletClass: 'custom-bullet',
          bulletActiveClass: 'custom-bullet-active'
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        className="h-[75vh]"  // Reduced height
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-full w-full flex items-center justify-center px-4 sm:px-6 lg:px-8"
              style={{
                backgroundImage: `url(${slide.bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
              }}
            >
              {/* Transparent Black Overlay */}
              <div 
                className="absolute inset-0 z-10"
                style={{ background: slide.overlay }}
              />

              {/* Content */}
              <div className="relative z-20 text-center max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-4"
                >
                  {/* Badge */}
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-3">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
                    <span className="text-white text-sm font-medium">Welcome to RiseAndServe</span>
                  </div>

                  {/* Main Title */}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-3 leading-snug">
                    <Typewriter
                      words={[slide.title]}
                      loop={1}
                      cursor
                      cursorStyle="|"
                      typeSpeed={80}
                      deleteSpeed={50}
                      delaySpeed={3000}
                    />
                  </h1>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-sm sm:text-base md:text-lg text-white mb-5 font-light leading-relaxed"
                  >
                    {slide.subtitle}
                  </motion.p>

                  {/* Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="flex flex-col sm:flex-row gap-3 justify-center items-center"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0,0,0,0.3)" }}
                      whileTap={{ scale: 0.95 }}
                      className="group px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#F77F00] text-white font-medium rounded-xl shadow-md flex items-center gap-2 transition-all duration-300"
                    >
                      <span>{slide.primaryButton}</span>
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                      whileTap={{ scale: 0.95 }}
                      className="group px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-medium rounded-xl shadow-md flex items-center gap-2 transition-all duration-300"
                    >
                      <FaInfoCircle />
                      <span>{slide.secondaryButton}</span>
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation */}
        <div className="swiper-button-prev !text-white !w-12 !h-12 !rounded-full !bg-black/30 !backdrop-blur-sm !border !border-white/20 hover:!bg-black/50 transition-all duration-300 after:!text-lg"></div>
        <div className="swiper-button-next !text-white !w-12 !h-12 !rounded-full !bg-black/30 !backdrop-blur-sm !border !border-white/20 hover:!bg-black/50 transition-all duration-300 after:!text-lg"></div>
      </Swiper>

      <div className="custom-pagination absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2"></div>
    </div>
  );
};

export default HomeSlider;
