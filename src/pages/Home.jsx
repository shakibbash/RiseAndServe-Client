import { Link } from "react-router";
import Newsletter from "../Components/Newsletter";
import RiseCounter from "../Components/RiseCounter";
import Gallery from "../Components/Gallery";
import HomeSlider from "../Components/HomeSlider";
import PartnerSection from "../Components/PartnerSection";
import AOS from "aos";
import { useEffect } from "react";


const Home = () => {
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
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2    data-aos="fade-up"  data-aos-once="false" className="text-3xl font-bold text-center mb-10">
          Why Choose RiseAndServe?
        </h2>
        <div    data-aos="fade-up"  data-aos-once="false" className="grid md:grid-cols-3 gap-8">
          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
            <span className="text-4xl">🤝</span>
            <h3 className="font-semibold text-xl mt-3">Join Events</h3>
            <p className="text-gray-600 mt-2">
              Discover and participate in community-driven events that matter.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
            <span className="text-4xl">📅</span>
            <h3 className="font-semibold text-xl mt-3">Create & Manage</h3>
            <p className="text-gray-600 mt-2">
              Host your own events, manage participants, and track engagement.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
            <span className="text-4xl">🌟</span>
            <h3 className="font-semibold text-xl mt-3">Make Impact</h3>
            <p className="text-gray-600 mt-2">
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
