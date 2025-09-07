import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTheme } from "../Provider/ThemeContext"; 

const Gallery = () => {
  const { isDarkMode } = useTheme(); 

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: false });
  }, []);

  const images = [
    { src: "https://i.postimg.cc/TPjJrjhf/clean-bangladesh.jpg", title: "Clean Bangladesh " },
    { src: "https://i.postimg.cc/N0vx9Csd/images.jpg", title: "Tree plantation" },
    { src: "https://i.postimg.cc/pLFZdMH9/images-1.jpg", title: "Tree plantation" },
    { src: "https://i.postimg.cc/bNMg8NKc/images-2.jpg", title: "Feeding the poor" },
    { src: "https://i.postimg.cc/TYh0ZWNJ/images-3.jpg", title: "Community build up" },
    { src: "https://i.postimg.cc/59sp7mgt/images-4.jpg", title: "Save water" },
  ];

  return (
    <section
      id="gallery"
      className={`py-16 px-6 ${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-slate-50 text-gray-800"
      }`}
    >
      {/* Heading */}
      <h2
        className="text-3xl md:text-4xl font-bold text-center mb-4"
        data-aos="fade-up"
        data-aos-once="false"
      >
        Our Community in Action 📸
      </h2>

      {/* Description */}
      <p
        className={`text-center max-w-2xl mx-auto mb-12 ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}
        data-aos="fade-up"
        data-aos-delay="150"
        data-aos-once="false"
      >
        A glimpse of our events — from cleanups to community gatherings, every step brings positive change.
      </p>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {images.map((img, index) => (
          <div
            key={index}
            className={`relative group overflow-hidden rounded-xl shadow-md ${
              isDarkMode ? "shadow-gray-700" : "shadow-gray-300"
            }`}
            data-aos="zoom-in"
            data-aos-once="false"
            data-aos-delay={index * 100}
          >
            <img
              src={img.src}
              alt={img.title}
              className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
            />

            {/* Overlay with Title */}
            <div
              className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-500`}
            >
              <span className="text-white text-lg font-semibold">{img.title}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
