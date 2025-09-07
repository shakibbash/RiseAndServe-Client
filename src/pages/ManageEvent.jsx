import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaPenAlt, FaTrash, FaPlus } from "react-icons/fa";
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

  // Initialize AOS
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
      text: "Do you want to delete this event?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF6B35",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await eventAPI.delete(id);
          if (res.data.deletedCount > 0 || res.data.success) {
            Swal.fire("Deleted!", "Event deleted successfully.", "success");
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
        Swal.fire("Updated!", "Event updated successfully", "success");
        setEvents((prev) => prev.map((e) => (e._id === selectedEvent._id ? updatedEvent : e)));
        closeModal();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to update event", "error");
    }
  };

  return (
    <div className={`px-4 md:px-8 py-6 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
      {loading ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#FF6B35] mb-4"></div>
          <h1 className="text-[#FF6B35] text-lg font-semibold">Loading...</h1>
        </div>
      ) : events.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh]">
          <h1 className="text-center text-2xl font-bold mb-2">No Events Found</h1>
          <p className="text-gray-400 text-center mb-4">You haven't created any events yet.</p>
          <div className="flex justify-center mt-4">
            <Link
              to="/create-event"
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600"
            >
              <FaPlus /> Add Your First Event
            </Link>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-6 text-center text-[#FF6B35]">Manage Your Created Events</h2>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                data-aos="zoom-in"
                className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} shadow-xl rounded-3xl overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300`}
              >
                <img
                  src={event.thumbnail || "https://via.placeholder.com/400x200.png?text=Event"}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-bold text-[#457B9D]">{event.title}</h3>
                  <p className="mt-1 font-medium">{event.eventType}</p>
                  <p className="text-sm mt-2">{new Date(event.eventDate).toLocaleString()}</p>
                  <p className="text-sm">{event.location}</p>
                </div>
                <div className="flex justify-center gap-4 p-4 border-t border-gray-600">
                  <button
                    onClick={() => openModal(event)}
                    className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-[#FF6B35] to-[#F77F00] px-5 py-2 rounded-full text-white font-semibold shadow-lg hover:scale-105 transform transition duration-300"
                  >
                    <FaPenAlt /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="cursor-pointer flex items-center gap-2 bg-red-500 px-5 py-2 rounded-full text-white font-semibold shadow-lg hover:scale-105 transform transition duration-300"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm">
          <div className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} rounded-2xl shadow-2xl max-w-4xl w-full p-6 overflow-y-auto max-h-[90vh] relative`}>
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center text-[#FF6B35]">Update Event</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/** Title **/}
              <div>
                <label className="block font-medium">Event Title</label>
                <input
                  {...register("title", { required: true })}
                  className={`${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-800 border-gray-300"} w-full border px-3 py-2 rounded-lg`}
                />
              </div>

              {/** Description **/}
              <div>
                <label className="block font-medium">Description</label>
                <textarea
                  {...register("description")}
                  rows="3"
                  className={`${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-800 border-gray-300"} w-full border px-3 py-2 rounded-lg`}
                />
              </div>

              {/** Event Type **/}
              <div>
                <label className="block font-medium">Event Type</label>
                <select
                  {...register("eventType", { required: true })}
                  className={`${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-800 border-gray-300"} w-full border px-3 py-2 rounded-lg`}
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

              {/** Location **/}
              <div>
                <label className="block font-medium">Location</label>
                <input
                  {...register("location", { required: true })}
                  className={`${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-800 border-gray-300"} w-full border px-3 py-2 rounded-lg`}
                />
              </div>

              {/** Event Date **/}
              <div>
                <label className="block font-medium">Event Date</label>
                <input
                  {...register("eventDate", { required: true })}
                  type="date"
                  className={`${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-800 border-gray-300"} w-full border px-3 py-2 rounded-lg`}
                />
              </div>

              {/** Thumbnail **/}
              <div>
                <label className="block font-medium">Thumbnail URL</label>
                <input
                  {...register("thumbnail")}
                  type="url"
                  className={`${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-800 border-gray-300"} w-full border px-3 py-2 rounded-lg`}
                />
              </div>

              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-full bg-gray-600 hover:bg-gray-500 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#F77F00] text-white font-semibold"
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
