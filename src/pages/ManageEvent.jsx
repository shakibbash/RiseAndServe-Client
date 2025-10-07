import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaPenAlt, FaTrash, FaPlus, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaEye, FaEdit, FaTimes, FaToiletPaperSlash, FaTrashAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import AOS from "aos";
import { useAuth } from "../Provider/AuthProvider";
import { useTheme } from "../Provider/ThemeContext";
import { Link } from "react-router";
import { eventAPI } from "../Api/apiClient";

const ManageEvent = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: { title: "", description: "", eventType: "", location: "", eventDate: "", thumbnail: "" },
  });

  const fetchEvents = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await eventAPI.creatorEvents(user.email);
      setEvents(res.data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      Swal.fire("Error!", "Failed to fetch events", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [user]);

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    setValue("title", event.title);
    setValue("description", event.description || "");
    setValue("eventType", event.eventType);
    setValue("eventDate", event.eventDate ? event.eventDate.split("T")[0] : "");
    setValue("location", event.location);
    setValue("thumbnail", event.thumbnail || "");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    reset();
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF6B35",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      background: isDarkMode ? "#1f2937" : "#ffffff",
      color: isDarkMode ? "#ffffff" : "#000000",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await eventAPI.delete(id);
          if (res.data.deletedCount > 0 || res.data.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Event deleted successfully.",
              icon: "success",
              confirmButtonColor: "#FF6B35",
              background: isDarkMode ? "#1f2937" : "#ffffff",
              color: isDarkMode ? "#ffffff" : "#000000",
            });
            setEvents((prev) => prev.filter((e) => e._id !== id));
          }
        } catch (error) {
          console.error(error);
          Swal.fire("Error!", "Failed to delete event", "error");
        }
      }
    });
  };

  const onSubmit = async (data) => {
    if (!selectedEvent) return;
    try {
      const updatedEvent = { ...selectedEvent, ...data, eventDate: new Date(data.eventDate).toISOString() };
      const res = await eventAPI.update(selectedEvent._id, updatedEvent);
      if (res.data.modifiedCount > 0 || res.data.success) {
        Swal.fire({
          title: "Updated!",
          text: "Event updated successfully",
          icon: "success",
          confirmButtonColor: "#FF6B35",
          background: isDarkMode ? "#1f2937" : "#ffffff",
          color: isDarkMode ? "#ffffff" : "#000000",
        });
        setEvents((prev) => prev.map((e) => (e._id === selectedEvent._id ? updatedEvent : e)));
        closeModal();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to update event", "error");
    }
  };

  const eventTypes = [
    { value: "Cleanup", label: "🚯 Cleanup", color: "from-green-500 to-emerald-600" },
    { value: "Plantation", label: "🌿 Plantation", color: "from-green-400 to-teal-600" },
    { value: "Donation", label: "❤️ Donation", color: "from-red-400 to-pink-600" },
    { value: "Awareness", label: "📢 Awareness", color: "from-blue-400 to-cyan-600" },
    { value: "Health Camp", label: "🏥 Health Camp", color: "from-purple-400 to-indigo-600" },
    { value: "Education", label: "📚 Education", color: "from-yellow-400 to-orange-600" },
    { value: "Community Meeting", label: "👥 Community Meeting", color: "from-indigo-400 to-purple-600" },
    { value: "Skill Development", label: "⚡ Skill Development", color: "from-orange-400 to-red-600" },
    { value: "Food Drive", label: "🍲 Food Drive", color: "from-amber-400 to-yellow-600" },
    { value: "Youth Empowerment", label: "🌟 Youth Empowerment", color: "from-pink-400 to-rose-600" }
  ];

  const getEventTypeColor = (type) => {
    const eventType = eventTypes.find(t => t.value === type);
    return eventType ? eventType.color : "from-gray-500 to-gray-600";
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FF6B35] mx-auto mb-4"></div>
          <h2 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Loading your events...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-8 px-4 transition-colors duration-300 ${
      isDarkMode ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-blue-50 to-indigo-100"
    }`}>
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white  backdrop-blur-sm border border-white/20 mb-4">
            <FaCalendarAlt className="text-[#FF6B35] mr-2" />
            <span className="text-sm font-semibold text-black">MANAGE EVENTS</span>
          </div>
          <h1 className="text-4xl md:text-4xl font-bold bg-gradient-to-r from-[#FF6B35] to-[#F77F00] bg-clip-text text-transparent mb-4">
            Manage Your Events
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Organize and update your community events in one place
          </p>
        </div>

        {/* Stats and Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className={`px-6 py-3 rounded-2xl backdrop-blur-sm border ${
            isDarkMode ? "bg-gray-800/50 border-gray-700 text-white" : "bg-white/80 border-white text-gray-800"
          }`}>
            <span className="font-semibold">{events.length} Events Created</span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* View Toggle */}
            <div className={`flex rounded-xl p-1 backdrop-blur-sm border ${
              isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-white"
            }`}>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid" 
                    ? "bg-[#FF6B35] text-white" 
                    : isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <FaEye />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list" 
                    ? "bg-[#FF6B35] text-white" 
                    : isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <FaEdit />
              </button>
            </div>

            <Link
              to="/create-event"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#F77F00] text-white rounded-xl font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <FaPlus /> Create New Event
            </Link>
          </div>
        </div>
      </div>

      {/* Events Grid/List */}
      {events.length === 0 ? (
        <div className={`max-w-2xl mx-auto text-center py-16 rounded-2xl backdrop-blur-sm border ${
          isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-white"
        }`}>
          <div className="w-24 h-24 bg-gradient-to-r from-[#FF6B35] to-[#F77F00] rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCalendarAlt className="text-white text-3xl" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white">No Events Yet</h2>
          <p className={`mb-8 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Start creating amazing events for your community
          </p>
          <Link
            to="/create-event"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF6B35] to-[#F77F00] text-white rounded-xl font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <FaPlus /> Create Your First Event
          </Link>
        </div>
      ) : (
        <div className={`max-w-7xl mx-auto grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
            : "grid-cols-1"
        }`}>
          {events.map((event) => (
            <div
              key={event._id}
              data-aos="zoom-in"
              className={`group relative rounded-2xl overflow-hidden backdrop-blur-sm border transition-all duration-500 ${
                isDarkMode
                  ? "bg-gray-800/50 border-gray-700 hover:border-[#FF6B35]/50"
                  : "bg-white/80 border-white hover:border-[#FF6B35]/50"
              } hover:shadow-2xl hover:-translate-y-2 ${
                viewMode === "list" ? "flex" : ""
              }`}
            >
              {/* Event Image */}
              <div className={`relative overflow-hidden ${
                viewMode === "list" ? "w-1/3" : "w-full h-48"
              }`}>
                <img
                  src={event.thumbnail || "https://via.placeholder.com/400x200.png?text=Event+Image"}
                  alt={event.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                />
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getEventTypeColor(event.eventType)}`}>
                  {event.eventType}
                </div>
              </div>

              {/* Event Content */}
              <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                <h3 className="text-lg font-semibold  mb-3 text-black ">
                  {event.title}
                </h3>
                
                <p className={`mb-4 line-clamp-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  {event.description || "No description provided"}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <FaCalendarAlt className="text-[#FF6B35]" />
                    <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                      {new Date(event.eventDate).toLocaleDateString()} • {new Date(event.eventDate).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FaMapMarkerAlt className="text-[#FF6B35]" />
                    <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                      {event.location}
                    </span>
                  </div>
                  {event.participants && (
                    <div className="flex items-center gap-2 text-sm">
                      <FaUsers className="text-[#FF6B35]" />
                      <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                        {event.participants.length} participants
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
               <div className="flex gap-3 mt-4">
                  <button onClick={()=>openModal(event)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-xl font-semibold"><FaEdit /> Edit</button>
                  <button onClick={()=>handleDelete(event._id)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl font-semibold"><FaTrashAlt /> Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className={`relative rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${
            isDarkMode 
              ? "bg-gray-800 border-gray-700 text-white" 
              : "bg-white border-gray-200 text-gray-800"
          } border shadow-2xl`}>
            {/* Modal Header */}
            <div className="sticky top-0 z-10 p-6 border-b backdrop-blur-sm bg-opacity-90 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#FF6B35] to-[#F77F00] bg-clip-text text-transparent">
                  Update Event
                </h2>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Make changes to your event details
                </p>
              </div>
              <button
                onClick={closeModal}
                className={`p-2 rounded-lg hover:bg-opacity-20 transition-colors ${
                  isDarkMode ? "hover:bg-white" : "hover:bg-gray-200"
                }`}
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold mb-2">Event Title</label>
                  <input
                    {...register("title", { required: true })}
                    className={`w-full p-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition-all ${
                      isDarkMode 
                        ? "bg-gray-700 border-gray-600 text-white" 
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">Event Type</label>
                  <select
                    {...register("eventType", { required: true })}
                    className={`w-full p-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition-all ${
                      isDarkMode 
                        ? "bg-gray-700 border-gray-600 text-white" 
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value="">Select Event Type</option>
                    {eventTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-2">Description</label>
                <textarea
                  {...register("description")}
                  rows="4"
                  className={`w-full p-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition-all ${
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold mb-2">Location</label>
                  <input
                    {...register("location", { required: true })}
                    className={`w-full p-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition-all ${
                      isDarkMode 
                        ? "bg-gray-700 border-gray-600 text-white" 
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">Event Date</label>
                  <input
                    {...register("eventDate", { required: true })}
                    type="date"
                    className={`w-full p-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition-all ${
                      isDarkMode 
                        ? "bg-gray-700 border-gray-600 text-white" 
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-2">Thumbnail URL</label>
                <input
                  {...register("thumbnail")}
                  type="url"
                  className={`w-full p-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition-all ${
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>

              <div className="flex gap-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={closeModal}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold border-2 transition-all ${
                    isDarkMode
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-[#FF6B35] to-[#F77F00] text-white rounded-xl font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  Update Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEvent;