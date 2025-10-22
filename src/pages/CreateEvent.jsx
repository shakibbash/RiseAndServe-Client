import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Toaster } from "react-hot-toast";
import {
  FaHeading,
  FaAlignLeft,
  FaMapMarkerAlt,
  FaImage,
  FaRegCalendarAlt,
  FaEnvelope,
  FaUser,
  FaPlus,
  FaUndo,
  FaCalendarPlus,
  FaLightbulb,
  FaCheckCircle,
  FaClock,
  FaTimes
} from "react-icons/fa";
import { useAuth } from "../Provider/AuthProvider";
import { useTheme } from "../Provider/ThemeContext";
import Swal from "sweetalert2";
import { eventAPI } from "../Api/apiClient";

const CreateEvent = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEventType("");
    setThumbnail("");
    setLocation("");
    setEventDate(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !eventType || !thumbnail || !location || !eventDate) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all fields!",
        confirmButtonColor: "#FF6B35",
      });
      return;
    }

    if (eventDate < new Date()) {
      Swal.fire({
        icon: "error",
        title: "Invalid Date",
        text: "Event date must be in the future!",
        confirmButtonColor: "#FF6B35",
      });
      return;
    }

    const eventData = {
      title,
      description,
      eventType,
      thumbnail,
      location,
      eventDate,
      creatorName: user.displayName,
      creatorEmail: user.email,
      creatorPhoto: user.photoURL,
    };

    setLoading(true);

    try {
      const res = await eventAPI.create(eventData);
      console.log("Event Created:", res.data);
      Swal.fire({
        icon: "success",
        title: "Event created successfully!",
        showConfirmButton: false,
        timer: 1500,
        background: isDarkMode ? "#1D3557" : "#457B9D",
        color: "#F1FAEE",
      });
      resetForm();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: error.response?.data?.message || "Something went wrong!",
        confirmButtonColor: "#FF6B35",
      });
      console.error("Create Event Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // CLOUDINARY UPLOAD
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      setThumbnail(data.secure_url);
      Swal.fire("Success", "Image uploaded!", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to upload image", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setThumbnail("");
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
  };

  const eventTypes = [
    { value: "Cleanup", label: "🚯 Cleanup" },
    { value: "Plantation", label: "🌿 Plantation" },
    { value: "Donation", label: "❤️ Donation" },
    { value: "Awareness", label: "📢 Awareness" },
    { value: "Health Camp", label: "🏥 Health Camp" },
    { value: "Education", label: "📚 Education" },
    { value: "Community Meeting", label: "👥 Community Meeting" },
    { value: "Skill Development", label: "⚡ Skill Development" },
    { value: "Food Drive", label: "🍲 Food Drive" },
    { value: "Youth Empowerment", label: "🌟 Youth Empowerment" }
  ];

  return (
    <div className={`min-h-screen py-8 px-4 transition-colors duration-300 ${
      isDarkMode ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-blue-50"
    }`}>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white backdrop-blur-sm border border-white/20 mb-4">
            <FaCalendarPlus className="text-[#FF6B35] mr-2" />
            <span className="text-sm font-semibold text-black">CREATE EVENT</span>
          </div>
          <h1 className="text-4xl md:text-4xl font-bold bg-gradient-to-r from-[#FF6B35] to-[#F77F00] bg-clip-text text-transparent mb-4">
            Create Amazing Events
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            Bring people together and make a positive impact in your community
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className={`rounded-2xl p-8 backdrop-blur-sm border ${
              isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-white"
            } shadow-2xl`}>
              {/* User Info */}
              <div className={`flex items-center gap-4 p-6 rounded-xl mb-8 ${
                isDarkMode ? "bg-gray-700/50 border border-gray-600" : "bg-white border border-gray-200"
              }`}>
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-16 h-16 rounded-full object-cover border-4 border-[#FF6B35] shadow-lg"
                />
                <div className="flex-1">
                  <h3 className={`font-bold text-xl flex items-center gap-2 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}>
                    <FaUser className="text-[#FF6B35]" />
                    {user.displayName}
                  </h3>
                  <p className={`flex items-center gap-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}>
                    <FaEnvelope className="text-[#FF6B35]" />
                    {user.email}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  isDarkMode ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-800"
                }`}>
                  Organizer
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Event Title */}
                <div>
                  <label className={`text-sm font-semibold mb-3 flex items-center gap-2 ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}>
                    <FaHeading className="text-[#FF6B35]" /> Event Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Community Beach Cleanup"
                    className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all ${
                      isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Event Description */}
                <div>
                  <label className={`text-sm font-semibold mb-3 flex items-center gap-2 ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}>
                    <FaAlignLeft className="text-[#FF6B35]" /> Event Description
                  </label>
                  <textarea
                    placeholder="Describe your event, its purpose, and what participants can expect..."
                    className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all ${
                      isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Event Type */}
                  <div>
                    <label className={`text-sm font-semibold mb-3 flex items-center gap-2 ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}>
                      <FaLightbulb className="text-[#FF6B35]" /> Event Type
                    </label>
                    <select
                      className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all ${
                        isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                      }`}
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                    >
                      <option value="">Select Event Type</option>
                      {eventTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Event Date */}
                  <div>
                    <label className={`text-sm font-semibold mb-3 flex items-center gap-2 ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}>
                      <FaClock className="text-[#FF6B35]" /> Event Date & Time
                    </label>
                    <DatePicker
                      selected={eventDate}
                      onChange={(date) => setEventDate(date)}
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                      minDate={new Date()}
                      placeholderText="Select date and time"
                      className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all ${
                        isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                      }`}
                    />
                  </div>
                </div>

                {/* Location + Thumbnail Upload */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Location */}
                  <div>
                    <label className={` text-sm font-semibold mb-3 flex items-center gap-2 ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}>
                      <FaMapMarkerAlt className="text-[#FF6B35]" /> Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Central Park, New York"
                      className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all ${
                        isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                      }`}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>

                  {/* Thumbnail Upload */}
                  <div className="relative">
                    <label className={`text-sm font-semibold mb-2 flex items-center gap-2 ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}>
                      <FaImage className="text-[#FF6B35]" /> Thumbnail Image
                    </label>
                    <input
                      type="file"
                      onChange={handleUpload}
                      disabled={uploading}
                      className="file-input file-input-bordered w-full"
                    />
                    {thumbnail && (
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl"
                      >
                        <FaTimes />
                      </button>
                    )}
                    {thumbnail && (
                      <img
                        src={thumbnail}
                        alt="Preview"
                        className="w-full h-36 object-cover rounded-lg mt-2 shadow"
                      />
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex items-center justify-center gap-3 flex-1 py-4 px-6 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 ${
                      loading
                        ? "opacity-50 cursor-not-allowed bg-gray-400"
                        : "bg-gradient-to-r from-[#FF6B35] to-[#F77F00] hover:from-[#F77F00] hover:to-[#FF6B35] text-white hover:shadow-xl hover:-translate-y-1"
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Creating Event...
                      </>
                    ) : (
                      <>
                        <FaPlus /> Create Event
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={loading}
                    className={`flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold border-2 transition-all duration-300 ${
                      isDarkMode
                        ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
                    }`}
                  >
                    <FaUndo /> Reset
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar Tips */}
          <div>
            <div className={`p-6 rounded-2xl backdrop-blur-sm border ${
              isDarkMode ? "bg-gray-800/50 border-gray-700 text-gray-300" : "bg-white/80 border-white text-gray-700"
            } shadow-lg`}>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <FaCheckCircle className="text-[#FF6B35]" /> Tips for a Great Event
              </h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Provide clear and concise event details.</li>
                <li>Choose a relevant and attractive thumbnail.</li>
                <li>Set a future date and time for your event.</li>
                <li>Pick an appropriate category for better visibility.</li>
                <li>Double-check location and contact info.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
