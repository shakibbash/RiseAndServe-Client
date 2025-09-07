import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Typewriter } from "react-simple-typewriter";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    title: "Join the Movement",
    subtitle: "Be part of our community of volunteers",
    primaryButton: "Get Started",
    secondaryButton: "Learn More",
    bg: "https://i.postimg.cc/C1FHJZfD/bd-clean-6.jpg",
  },
  {
    title: "Clean Bangladesh Initiative",
    subtitle: "Help us create a cleaner environment",
    primaryButton: "Participate Now",
    secondaryButton: "Learn More",
    bg: "https://i.postimg.cc/TPjJrjhf/clean-bangladesh.jpg",
  },
  {
    title: "Community Events",
    subtitle: "Connect with like-minded people",
    primaryButton: "Explore Events",
    secondaryButton: "Learn More",
    bg: "https://i.postimg.cc/N0vx9Csd/images.jpg",
  },
  {
    title: "Make a Difference",
    subtitle: "Your small action creates a big impact",
    primaryButton: "Join Today",
    secondaryButton: "Donate Now",
    bg: "https://i.postimg.cc/pLFZdMH9/images-1.jpg",
  },
];

const HomeSlider = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop={true}
      pagination={{ clickable: true }}
      navigation={true}
      className="h-[600px]"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative h-screen w-full flex items-center justify-center px-6 md:px-16"
            style={{
              backgroundImage: `url(${slide.bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

            {/* Slide content - centered */}
            <div className="relative z-20 text-center max-w-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                <Typewriter
                  words={[slide.title]}
                  loop={1}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white mb-6 drop-shadow-md">
                {slide.subtitle}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded shadow-lg hover:bg-yellow-500 transition">
                  {slide.primaryButton}
                </button>
                <button className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded shadow-lg hover:bg-white hover:text-gray-900 transition">
                  {slide.secondaryButton}
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomeSlider;
