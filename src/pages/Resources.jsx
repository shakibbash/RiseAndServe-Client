import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  FaBookOpen,
  FaVideo,
  FaUsers,
  FaHandsHelping,
  FaGlobeAmericas,
  FaLightbulb,
} from "react-icons/fa";
import { useTheme } from "../Provider/ThemeContext";

const Resources = () => {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const resources = [
    {
      title: "Becoming an Effective Volunteer",
      type: "Article",
      icon: <FaHandsHelping className="text-orange-500 text-2xl" />,
      description:
        "Learn how to make a real difference by developing empathy, teamwork, and communication skills while volunteering.",
      link: "https://www.unv.org/become-volunteer",
    },
    {
      title: "Leadership for Community Impact",
      type: "Guide",
      icon: <FaUsers className="text-blue-500 text-2xl" />,
      description:
        "A step-by-step leadership guide for managing local teams, organizing events, and inspiring social change.",
      link: "https://www.un.org/en/academic-impact",
    },
    {
      title: "Sustainable Development Goals (SDGs)",
      type: "Article",
      icon: <FaBookOpen className="text-green-500 text-2xl" />,
      description:
        "Understand the 17 United Nations SDGs and how community action can contribute to achieving them by 2030.",
      link: "https://sdgs.un.org/goals",
    },
    {
      title: "The Power of Youth in Social Change",
      type: "Video",
      icon: <FaVideo className="text-red-500 text-2xl" />,
      description:
        "Watch how young leaders around the world are driving change in their communities through social innovation.",
      link: "https://www.youtube.com/watch?v=8KkKuTCFvzI",
    },
    {
      title: "Global Citizenship Education",
      type: "Guide",
      icon: <FaGlobeAmericas className="text-purple-500 text-2xl" />,
      description:
        "Learn about global citizenship and how education empowers people to engage actively in creating a fairer world.",
      link: "https://unesdoc.unesco.org/ark:/48223/pf0000370215",
    },
    {
      title: "Innovation for Social Good",
      type: "Article",
      icon: <FaLightbulb className="text-yellow-500 text-2xl" />,
      description:
        "Discover how innovative ideas and technologies can be used to solve real-world social challenges effectively.",
      link: "https://www.un.org/en/impact",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 800, once: true });
    const timer = setTimeout(() => {
      try {
        setLoading(false);
      } catch {
        setHasError(true);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Loader Spinner
  if (loading) {
    return (
      <div
        className={`flex justify-center items-center min-h-screen ${
          isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
        }`}
      >
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Error Fallback
  if (hasError) {
    return (
      <div
        className={`flex flex-col justify-center items-center min-h-screen text-center ${
          isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
        }`}
      >
        <h1 className="text-3xl font-bold mb-3 text-orange-500">
          ⚠️ Error Loading Resources
        </h1>
        <p className="mb-6">Something went wrong. Please try again later.</p>
        <a
          href="/"
          className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all font-medium"
        >
          Go Home
        </a>
      </div>
    );
  }

  // Main Resource Page
  return (
    <div
      className={`min-h-screen py-16 px-4 md:px-10 lg:px-20 transition-colors duration-300 ${
        isDarkMode
          ? "bg-gray-900 text-gray-200"
          : "bg-blue-50 text-gray-800"
      }`}
    >
      {/* Header */}
      <div
        data-aos="fade-down"
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
          🌍 Learning & Resources
        </h1>
        <p
          className={`max-w-2xl mx-auto ${
            isDarkMode ? "text-gray-400" : "text-gray-700"
          }`}
        >
          Explore curated articles, guides, and videos to grow your knowledge in
          social development, leadership, and volunteering.
        </p>
      </div>

      {/* Resource Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((res, index) => (
          <div
            key={index}
            data-aos="zoom-in-up"
            className={`p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-700 border border-gray-700"
                : "bg-white hover:bg-[#F1FAEE] border border-gray-200"
            }`}
          >
            <div>
              <div className="flex items-center space-x-3 mb-3">
                {res.icon}
                <h2 className="text-lg font-semibold">{res.title}</h2>
              </div>
              <p className="text-sm mb-4">{res.description}</p>
            </div>
            <a
              href={res.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition-all text-center"
            >
              Read More →
            </a>
          </div>
        ))}
      </div>

      {/* Contribution Section */}
      <div
        data-aos="fade-up"
        className="mt-20 text-center"
      >
        <h2 className="text-2xl font-bold mb-4 text-orange-500">
          Want to share your knowledge?
        </h2>
        <p
          className={`max-w-xl mx-auto mb-6 ${
            isDarkMode ? "text-gray-400" : "text-gray-700"
          }`}
        >
          Contribute your own guides, blogs, or event experiences to help others
          learn and make an impact.
        </p>
        <button
          onClick={() => alert("Coming soon: Resource submission feature!")}
          className="bg-orange-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-orange-600 transition-all font-semibold"
        >
          Submit a Resource
        </button>
      </div>
    </div>
  );
};

export default Resources;
