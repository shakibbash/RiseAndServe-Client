import { useEffect } from "react";
import AOS from "aos";
import { useTheme } from "../Provider/ThemeContext"; 

const partners = [
  "https://i.postimg.cc/Gt9VzJg8/images-5.jpg",
  "https://i.postimg.cc/XJstwDL6/images-6.jpg",
  "https://i.postimg.cc/sXjtGRpJ/images-7.jpg",
  "https://i.postimg.cc/BbyyzLRh/people-in-need-foundation-200671.jpg",
];

const PartnerSection = () => {
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
    <section
      data-aos="fade-up"
      data-aos-once="false"
      className={`py-16  max-w-8xl md:mx-auto  ${
        isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-black"
      }`}
    >
      {/* Heading */}
      <h2 className="text-4xl font-bold text-center mb-10">Our <span className="text-[#FF6B35]">Partners</span></h2>

      {/* Partner Logos */}
      <div className="flex flex-wrap justify-center items-center gap-10">
        {partners.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Partner ${index + 1}`}
            data-aos="fade-up"
            data-aos-once="false"
            className={`w-[250px] h-[250px] rounded-xl border-2 shadow-lg ${
              isDarkMode ? "border-yellow-400 shadow-gray-700" : "border-[#FF6B35] shadow-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default PartnerSection;
