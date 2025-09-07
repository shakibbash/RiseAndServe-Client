import { Link } from "react-router";
import Newsletter from "../Components/Newsletter";
import RiseCounter from "../Components/RiseCounter";
import Gallery from "../Components/Gallery";
import HomeSlider from "../Components/HomeSlider";
import PartnerSection from "../Components/PartnerSection";
import AOS from "aos";
import { useEffect } from "react";
import { useTheme } from "../Provider/ThemeContext";


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
      className={`py-16 px-16  transition-colors duration-300 ${
        isDarkMode  ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Heading */}
      <h2
        data-aos="fade-up"
        data-aos-once="false"
        className="text-3xl font-bold text-center mb-10"
      >
        Why Choose RiseAndServe?
      </h2>

      {/* Grid */}
      <div
        data-aos="fade-up"
        data-aos-once="false"
        className="grid md:grid-cols-3 gap-8"
      >
        {/* Card 1 */}
        <div
          className={`rounded-lg p-6 text-center hover:shadow-lg transition shadow-md ${
            isDarkMode  ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
          }`}
        >
          <span className="text-4xl">🤝</span>
          <h3 className="font-semibold text-xl mt-3">Join Events</h3>
          <p
            className={`mt-2 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Discover and participate in community-driven events that matter.
          </p>
        </div>

        {/* Card 2 */}
        <div
          className={`rounded-lg p-6 text-center hover:shadow-lg transition shadow-md ${
            isDarkMode  ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
          }`}
        >
          <span className="text-4xl">📅</span>
          <h3 className="font-semibold text-xl mt-3">Create & Manage</h3>
          <p
            className={`mt-2 ${
              isDarkMode  ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Host your own events, manage participants, and track engagement.
          </p>
        </div>

        {/* Card 3 */}
        <div
          className={`rounded-lg p-6 text-center hover:shadow-lg transition shadow-md ${
            isDarkMode  ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
          }`}
        >
          <span className="text-4xl">🌟</span>
          <h3 className="font-semibold text-xl mt-3">Make Impact</h3>
          <p
            className={`mt-2 ${
              isDarkMode  ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Collaborate with like-minded people and create a lasting impact.
          </p>
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
