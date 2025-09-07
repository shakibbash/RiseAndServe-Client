import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Gallery = () => {
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
    <section className="bg-gray-50 py-16 px-6" id="gallery">
      <h2
        className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4"
        data-aos="fade-up" data-aos-once="false"
      >
        Our Community in Action 📸
      </h2>
      <p
        className="text-center text-gray-600 max-w-2xl mx-auto mb-12"
        data-aos="fade-up"
        data-aos-delay="150" data-aos-once="false"
      >
        A glimpse of our events — from cleanups to community gatherings, every step brings positive change.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-xl shadow-md"
            data-aos="zoom-in" data-aos-once="false"
            data-aos-delay={index * 100}
          >
            <img
              src={img.src}
              alt={img.title}
              className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
            />
         
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
