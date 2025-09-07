import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaCalendarAlt, FaMapMarkerAlt, FaPlus, FaTag } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import { eventAPI } from "../Api/apiClient"; // import your API

const JoinedEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: false });
  }, []);

useEffect(() => {
  const fetchJoinedEvents = async () => {
    try {
      const email = localStorage.getItem('riseAndServeEmail'); // user email
      const res = await eventAPI.joined(email);
      setEvents(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load joined events.");
    } finally {
      setLoading(false);
    }
  };

  fetchJoinedEvents();
}, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="relative">
          <div className="w-10 h-10 border-primary border-2 rounded-full"></div>
          <div className="w-10 h-10 border-accent border-t-2 animate-spin rounded-full absolute top-0 left-0"></div>
        </div>
        <div className="ml-2 text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Loading joined events...
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <h1 className="text-center text-2xl font-bold mb-2">No Events Found</h1>
        <p className="text-gray-600 text-center mb-4">
          You haven't joined any events yet.
        </p>
        <div className="flex justify-center mt-4">
          <Link
            to="/upcoming-events"
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600"
          >
            <FaPlus /> Join Your First Event
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-12 px-4">
      <Toaster />
      <h1 className="text-center text-3xl font-bold text-[#1D3557] mb-8">
        Your Joined Events
      </h1>
      <div className="grid md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            data-aos="fade-up"
            data-aos-once="false"
            className="flex bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={event.thumbnail}
              alt={event.title}
              className="w-36 md:w-40 h-36 md:h-40 object-cover"
            />
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-[#457B9D] mb-2">
                  {event.title}
                </h2>
                <p className="text-gray-700 text-sm md:text-base mb-2">
                  {event.description.length > 120
                    ? event.description.slice(0, 120) + "..."
                    : event.description}
                </p>
                <div className="flex flex-wrap gap-3 text-gray-600 text-sm md:text-base">
                  <span className="flex items-center gap-1">
                    <FaTag /> {event.eventType}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt /> {new Date(event.eventDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt /> {event.location}
                  </span>
                </div>
              </div>
              <Link
                to={`/events/${event._id}`}
                className="mt-3 inline-block py-2 bg-gradient-to-r from-[#FF6B35] to-[#F77F00] text-white text-center rounded-lg hover:from-[#F77F00] hover:to-[#FF6B35] transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JoinedEvents;
