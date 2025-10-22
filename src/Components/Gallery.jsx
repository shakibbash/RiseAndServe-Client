import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTheme } from "../Provider/ThemeContext"; 
import { FaExpand, FaHeart, FaShare, FaRegHeart, FaUsers } from "react-icons/fa";

const Gallery = () => {
  const { isDarkMode } = useTheme(); 
  const [selectedImage, setSelectedImage] = useState(null);
  const [likedImages, setLikedImages] = useState({});

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  const images = [
    { 
      src: "https://i.postimg.cc/TPjJrjhf/clean-bangladesh.jpg", 
      title: "Clean Bangladesh Initiative",
      category: "Environment",
      volunteers: 120,
      date: "2024-01-15"
    },
    { 
      src: "https://i.postimg.cc/N0vx9Csd/images.jpg", 
      title: "Tree Plantation Drive",
      category: "Environment",
      volunteers: 85,
      date: "2024-01-10"
    },
    { 
      src: "https://i.postimg.cc/pLFZdMH9/images-1.jpg", 
      title: "Community Garden Project",
      category: "Environment",
      volunteers: 65,
      date: "2024-01-08"
    },
    { 
      src: "https://i.postimg.cc/bNMg8NKc/images-2.jpg", 
      title: "Food Distribution Program",
      category: "Social Welfare",
      volunteers: 200,
      date: "2024-01-05"
    },
    { 
      src: "https://i.postimg.cc/TYh0ZWNJ/images-3.jpg", 
      title: "Community Building Workshop",
      category: "Education",
      volunteers: 45,
      date: "2024-01-03"
    },
    { 
      src: "https://i.postimg.cc/59sp7mgt/images-4.jpg", 
      title: "Water Conservation Campaign",
      category: "Environment",
      volunteers: 90,
      date: "2024-01-01"
    },
  ];

  const toggleLike = (index) => {
    setLikedImages(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const categories = ["All", "Environment", "Social Welfare", "Education"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages = activeCategory === "All" 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <section
      id="gallery"
      className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDarkMode 
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white" 
          : "bg-gradient-to-br from-slate-50 to-blue-50 text-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto md:px-10 ">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div 
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
            data-aos="fade-up"
          >
            <span className="w-2 h-2 bg-[#FF6B35] rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm font-semibold">GALLERY</span>
          </div>
          
          <h2
            className="text-4xl md:text-4xl font-bold mb-6"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Our Community in <span className="text-[#FF6B35]">Action</span> 
          </h2>

          <p
            className={`text-lg max-w-2xl mx-auto leading-relaxed ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Witness the impact of our volunteers through these memorable moments from events, cleanups, and community gatherings.
          </p>
        </div>

        {/* Category Filters */}
        <div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? "bg-[#FF6B35] text-white shadow-lg shadow-orange-500/25"
                  : isDarkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((img, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl backdrop-blur-sm border transition-all duration-500 ${
                isDarkMode
                  ? "bg-gray-800/50 border-gray-700 hover:border-[#FF6B35]/50"
                  : "bg-white border-gray-200 hover:border-[#FF6B35]/50"
              } hover:shadow-2xl hover:-translate-y-2`}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-80 object-cover transform group-hover:scale-110 transition duration-700"
                />

                {/* Overlay with Actions */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-xl font-bold mb-2">{img.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">{img.category}</span>
                      <span className="text-sm text-gray-300">{img.volunteers} volunteers</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => toggleLike(index)}
                      className="p-2 bg-black/50 rounded-full text-white hover:bg-red-500 transition-colors"
                    >
                      {likedImages[index] ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                    </button>
                    <button
                      onClick={() => setSelectedImage(img)}
                      className="p-2 bg-black/50 rounded-full text-white hover:bg-[#FF6B35] transition-colors"
                    >
                      <FaExpand />
                    </button>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    img.category === "Environment" 
                      ? "bg-green-500/90 text-white" 
                      : img.category === "Social Welfare"
                      ? "bg-blue-500/90 text-white"
                      : "bg-purple-500/90 text-white"
                  }`}>
                    {img.category}
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 group-hover:text-[#FF6B35] transition-colors">
                  {img.title}
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                    {new Date(img.date).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-1">
                    <FaUsers className="text-[#FF6B35] text-xs" />
                    <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                      {img.volunteers} volunteers
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12" data-aos="fade-up">
          <button className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
            isDarkMode
              ? "bg-gray-800 hover:bg-gray-700 text-white border border-gray-600"
              : "bg-white hover:bg-gray-100 text-gray-800 border border-gray-300"
          } hover:shadow-lg`}>
            View More Photos
          </button>
        </div>
      </div>

      {/* Modal for Expanded View */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
              <p className="text-gray-300">{selectedImage.category} • {selectedImage.volunteers} volunteers</p>
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-2xl hover:text-[#FF6B35] transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;