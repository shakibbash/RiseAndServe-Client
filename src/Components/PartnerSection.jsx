import { motion } from "framer-motion";
import { useEffect } from "react";
import AOS from "aos";
const partners = [
  "https://i.postimg.cc/Gt9VzJg8/images-5.jpg",
  "https://i.postimg.cc/XJstwDL6/images-6.jpg",
  "https://i.postimg.cc/sXjtGRpJ/images-7.jpg",
  "https://i.postimg.cc/BbyyzLRh/people-in-need-foundation-200671.jpg",
];

const PartnerSection = () => {
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
    <section     data-aos="fade-up"  data-aos-once="false" className="py-16 px-6 bg-white ">
      <h2 className="text-3xl font-bold text-center mb-10 text-black">
        Our Partners
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-10">
        {partners.map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt={`Partner ${index + 1}`}
              data-aos="fade-up"  data-aos-once="false"  className="w-[180px] h-[180px] rounded-xl border-2 border-[#FF6B35] shadow-lg"
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5, type: "spring" }}
          />
        ))}
      </div>
    </section>
  );
};

export default PartnerSection;