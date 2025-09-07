import { Link, useNavigate } from "react-router";
import { FaHome, FaArrowLeft } from "react-icons/fa";
import Lottie from "lottie-react";
import animationData from "../../public/assets/Error 404.json"; 

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-10">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-md text-center space-y-6">
        {/* Animation */}
        <div className="flex justify-center items-center">
          <Lottie animationData={animationData} loop={false} className="w-64 h-64" />
        </div>

        {/* Message */}
        <h2 className="text-xl font-semibold text-gray-800">
          Oops! The page you're looking for seems to have vanished.
        </h2>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <Link
            to="/"
            className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md"
          >
            <FaHome /> Home
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          >
            <FaArrowLeft /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
