import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaPaperPlane } from "react-icons/fa";

const Newsletter = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 120,
    });
  }, []);

  return (
    <section
      id="newsletter"
      className="relative bg-gradient-to-r from-[#1D3557] to-[#457B9D] text-white py-16 px-6"
      data-aos="fade-up"
    >
      {/* Decorative Shapes */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-[#FF6B35] rounded-full opacity-20 blur-2xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-[#F77F00] rounded-full opacity-20 blur-3xl -z-10 animate-bounce"></div>

      {/* Content */}
      <div className="max-w-3xl mx-auto text-center">
        <h2
          className="text-4xl font-bold mb-4"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          Stay Updated ✨
        </h2>
        <p
          className="text-gray-200 mb-8"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          Subscribe to our newsletter and never miss an update on upcoming
          events, volunteering opportunities, and community stories.
        </p>

        {/* Input + Button */}
        <form
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full bg-amber-50 sm:w-2/3 px-5 py-3 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition-all"
          />
          <button
            type="button"
            className="flex items-center gap-2 bg-gradient-to-r from-[#FF6B35] to-[#F77F00] px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all"
          >
            Subscribe <FaPaperPlane />
          </button>
        </form>

        {/* Extra line for engagement */}
        <p
          className="mt-6 text-sm text-gray-300"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          🔒 We respect your privacy. No spam ever.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
