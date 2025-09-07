import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";
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

  return (
    <div
      className={`max-w-5xl  m-6  md:mx-auto my-20 p-10 md:p-10  rounded-2xl shadow-xl ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-[#457B9D] text-white"
      }`}
    >
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Form */}
        <div className="flex-1">
          {/* User Info */}
          <div
            className={`flex items-center gap-4 mb-6 p-4 rounded-xl ${
              isDarkMode
                ? "bg-gray-800 border border-gray-700"
                : "bg-[#F1FAEE]"
            }`}
          >
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#FF6B35]"
            />
            <div>
              <h3 className={`font-bold text-lg flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                <FaUser /> {user.displayName}
              </h3>
              <p className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                <FaEnvelope /> {user.email}
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-center">Create Event</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Event Title */}
            <div className="relative">
              <FaHeading className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Event Title"
                className={`w-full pl-10 p-3 border rounded-lg ${
                  isDarkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-black border-gray-300"
                }`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Event Description */}
            <div className="relative">
              <FaAlignLeft className="absolute left-3 top-3 text-gray-400" />
              <textarea
                placeholder="Event Description"
                className={`w-full pl-10 p-3 border rounded-lg ${
                  isDarkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-black border-gray-300"
                }`}
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Event Type */}
            <div className="relative">
              <select
                className={`w-full pl-3 p-3 border rounded-lg ${
                  isDarkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-black border-gray-300"
                }`}
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
              >
                <option value="">Select Event Type</option>
                <option value="Cleanup">Cleanup</option>
                <option value="Plantation">Plantation</option>
                <option value="Donation">Donation</option>
                <option value="Awareness">Awareness</option>
                <option value="Health Camp">Health Camp</option>
                <option value="Education">Education</option>
                <option value="Community Meeting">Community Meeting</option>
                <option value="Skill Development">Skill Development</option>
                <option value="Food Drive">Food Drive</option>
                <option value="Youth Empowerment">Youth Empowerment</option>
              </select>
            </div>

            {/* Thumbnail */}
            <div className="relative">
              <FaImage className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Thumbnail Image URL"
                className={`w-full pl-10 p-3 border rounded-lg ${
                  isDarkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-black border-gray-300"
                }`}
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
              />
            </div>

            {/* Location */}
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                className={`w-full pl-10 p-3 border rounded-lg ${
                  isDarkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-black border-gray-300"
                }`}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Event Date */}
            <div className="relative">
              <FaRegCalendarAlt className="absolute left-3 top-3 text-gray-400" />
              <DatePicker
                selected={eventDate}
                onChange={(date) => setEventDate(date)}
                showTimeSelect
                dateFormat="Pp"
                minDate={new Date()}
                placeholderText="Select Event Date"
                className={`w-full pl-10 p-3 border rounded-lg ${
                  isDarkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-black border-gray-300"
                }`}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                type="submit"
                className={`flex items-center justify-center gap-2 flex-1 p-3 rounded-lg shadow font-semibold ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#FF6B35] to-[#F77F00] text-white"
                }`}
                disabled={loading}
              >
                <FaPlus /> {loading ? "Creating..." : "Create Event"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className={`flex items-center justify-center gap-2 flex-1 p-3 rounded-lg shadow font-semibold hover:opacity-90 transition ${
                  isDarkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-gray-800"
                }`}
                disabled={loading}
              >
                <FaUndo /> Reset Form
              </button>
            </div>
          </form>
        </div>

        {/* Right Info Card */}
        <div
          className={`w-full lg:w-1/3 p-6 rounded-xl shadow-lg flex flex-col ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-[#F1FAEE] text-gray-800"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <FaCalendarPlus className={`text-3xl ${isDarkMode ? "text-orange-400" : "text-black"}`} />
            <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
              Create New Event
            </h1>
          </div>
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-4`}>
            Organize events to make a positive impact in your community
          </p>
          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <FaHeading className="text-[#FF6B35]" /> Use a clear title
            </p>
            <p className="flex items-center gap-2">
              <FaAlignLeft className="text-[#FF6B35]" /> Provide details
            </p>
            <p className="flex items-center gap-2">
              <FaRegCalendarAlt className="text-[#FF6B35]" /> Pick a future date
            </p>
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#FF6B35]" /> Add location
            </p>
            <p className="flex items-center gap-2">
              <FaImage className="text-[#FF6B35]" /> Add thumbnail
            </p>
            <p className="flex items-center gap-2">
              <FaPlus className="text-[#FF6B35]" /> Select type
            </p>
            <p className="flex items-center gap-2">
              <FaUser className="text-[#FF6B35]" /> Stay appropriate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
