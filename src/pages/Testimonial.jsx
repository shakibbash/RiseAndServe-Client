// Testimonial.jsx
import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Testimonial() {
  const testimonials = [
    {
      id: 1,
      name: "Ayesha Rahman",
      title: "Community Volunteer",
      message:
        "This platform made volunteering so easy and fun! I’ve met amazing people while making a real difference.",
      rating: 5,
    },
    {
      id: 2,
      name: "Karim Hossain",
      title: "Event Organizer",
      message:
        "Managing volunteers became effortless. The events were smooth, and everyone felt connected.",
      rating: 4,
    },
    {
      id: 3,
      name: "Sara Ahmed",
      title: "Youth Leader",
      message:
        "I’ve been inspired to do more for my community. This is where passion meets purpose!",
      rating: 5,
    },
    {
      id: 4,
      name: "Mohammad Khan",
      title: "Corporate Volunteer",
      message:
        "The platform streamlined our employee volunteering program beautifully and made the impact measurable.",
      rating: 4,
    },
    {
      id: 5,
      name: "Fatima Begum",
      title: "Environmental Activist",
      message:
        "From beach cleanups to tree plantations, every event organized here has been impactful and smooth.",
      rating: 5,
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const variants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <section className="px-4 py-10 md:py-20 bg-gradient-to-r from-[#457B9D] to-[#3d6fb5] text-white">
      <div className="max-w-5xl mx-auto text-center">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-12"
        >
          What Our Volunteers <span className="text-[#FF6B35]">Say</span>
        </motion.h2>

        {/* Main Testimonial Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-lg p-6 md:p-10 rounded-2xl shadow-lg mx-4 md:mx-0"
            >
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                  <FaQuoteLeft className="text-2xl text-white" />
                </div>
              </div>

              <p className="text-base md:text-lg italic leading-relaxed mb-6">
                “{testimonials[index].message}”
              </p>

              <div className="flex justify-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={`${
                      i < testimonials[index].rating
                        ? "text-yellow-300"
                        : "text-white/40"
                    }`}
                  />
                ))}
              </div>

              <h3 className="text-lg font-semibold">{testimonials[index].name}</h3>
              <p className="text-sm opacity-80">{testimonials[index].title}</p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center gap-6 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNext}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Mini Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16">
          {testimonials
            .filter((_, i) => i !== index)
            .slice(0, 3)
            .map((t) => (
              <div
                key={t.id}
                className="p-4 md:p-6 bg-white/10 backdrop-blur-sm rounded-xl shadow-md transition hover:scale-105"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF6B35] via-[#F77F00] to-[#FF9E58] flex items-center justify-center text-white font-bold">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">{t.name}</h4>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                          key={i}
                          className={`${
                            i < t.rating ? "text-yellow-300" : "text-white/40"
                          } text-xs`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm italic line-clamp-3">{t.message}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
