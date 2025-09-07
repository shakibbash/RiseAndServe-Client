import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTag,
  FaUserCircle,
} from "react-icons/fa";
import { useAuth } from "../Provider/AuthProvider";
import { useTheme } from "../Provider/ThemeContext"; // to get isDarkMode
import { eventAPI } from "../Api/apiClient";

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { isDarkMode } = useTheme();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  // Fetch event by ID
  useEffect(() => {
    eventAPI
      .getById(id)
      .then((res) => {
        setEvent(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Join Event
  const handleJoin = async () => {
    if (!user) return toast.error("You need to log in first!");
    if (event?.creatorEmail === user.email) return toast.error("You cannot join your own event.");

    setJoining(true);
    try {
      await eventAPI.join(id);
      const updatedEvent = await eventAPI.getById(id);
      setEvent(updatedEvent.data);
      toast.success("You have successfully joined the event!");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to join event.");
    } finally {
      setJoining(false);
    }
  };

  const isJoined = event?.participants?.some((p) => p.email === user?.email);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="relative">
          <div className="w-10 h-10 border-primary border-2 rounded-full"></div>
          <div className="w-10 h-10 border-accent border-t-2 animate-spin rounded-full absolute top-0 left-0"></div>
        </div>
        <div className="ml-2 text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Loading event details...
        </div>
      </div>
    );

  if (!event)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-500">Event not found</p>
      </div>
    );

  return (
    <div
      className={`max-w-5xl mx-5 md:mx-auto my-12 p-6 rounded-2xl shadow-lg ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <Toaster />

      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => window.history.back()}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF6B35] to-[#F77F00] text-white font-medium rounded-lg shadow hover:from-[#F77F00] hover:to-[#FF6B35] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <FaArrowLeft className="animate-pulse" />
          Back
        </button>
      </div>

      {/* Banner */}
      <div className="relative rounded-xl overflow-hidden shadow-lg">
        <img
          src={event.thumbnail}
          alt={event.title}
          className="w-full h-72 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <h1 className="absolute bottom-6 left-6 text-3xl font-bold text-white drop-shadow-lg">
          {event.title}
        </h1>
      </div>

      {/* Details */}
      <div className="grid md:grid-cols-3 gap-8 mt-8">
        {/* Left: Event Info */}
        <div className="md:col-span-2 space-y-5">
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed`}>
            {event.description}
          </p>

          <div className="space-y-3">
            <p className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              <FaTag className="text-[#FF6B35]" />
              <span className="font-medium">Type:</span> {event.eventType}
            </p>
            <p className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              <FaCalendarAlt className="text-[#457B9D]" />
              <span className="font-medium">Date:</span>{" "}
              {new Date(event.eventDate).toLocaleString()}
            </p>
            <p className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              <FaMapMarkerAlt className="text-[#E63946]" />
              <span className="font-medium">Location:</span> {event.location}
            </p>
          </div>

          {/* Map */}
          <div className="mt-6">
            <h2 className={`${isDarkMode ? "text-gray-200" : "text-[#1D3557]"} text-lg font-semibold mb-3`}>
              📍 Event Location Map
            </h2>
            <iframe
              title="event-location-map"
              src={`https://www.google.com/maps?q=${encodeURIComponent(event.location)}&output=embed`}
              width="100%"
              height="400"
              style={{
                border: 0,
                borderRadius: "12px",
                background: isDarkMode ? "#1f2937" : "#fff",
              }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Right: Creator + Join + Participants */}
        <div className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-800"} p-5 rounded-xl shadow-md`}>
          {/* Creator */}
          <h2 className={`${isDarkMode ? "text-gray-200" : "text-[#1D3557]"} text-lg font-semibold mb-4`}>
            👤 Event Creator
          </h2>
          <div className="flex items-center gap-4 mb-6">
            {event.creatorPhoto ? (
              <img
                src={event.creatorPhoto}
                alt={event.creatorName}
                className="w-14 h-14 rounded-full object-cover border"
              />
            ) : (
              <FaUserCircle className="w-14 h-14 text-gray-400" />
            )}
            <div>
              <p className="font-medium">{event.creatorName}</p>
              <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"} text-sm`}>{event.creatorEmail}</p>
            </div>
          </div>

          {/* Join Button */}
          <button
            onClick={handleJoin}
            disabled={isJoined || joining || event?.creatorEmail === user?.email}
            className={`w-full py-3 rounded-lg shadow transition cursor-pointer text-white ${
              isJoined || joining || event?.creatorEmail === user?.email
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#FF6B35] to-[#F77F00] hover:from-[#F77F00] hover:to-[#FF6B35]"
            }`}
          >
            {event?.creatorEmail === user?.email
              ? "You are the Creator"
              : joining
              ? "Joining..."
              : isJoined
              ? "Joined"
              : "Join Event"}
          </button>

          {/* Participants */}
          <div className="mt-8">
            <h2 className={`${isDarkMode ? "text-gray-200" : "text-[#1D3557]"} text-lg font-semibold mb-3`}>
              👥 Participants ({event.participants?.length || 0})
            </h2>
            {event.participants?.length > 0 ? (
              <ul className="space-y-3 max-h-56 overflow-y-auto">
                {event.participants.map((p, i) => (
                  <li
                    key={i}
                    className={`${isDarkMode ? "bg-gray-700" : "bg-white"} flex items-center gap-3 p-2 rounded-lg shadow-sm`}
                  >
                    {p.photo ? (
                      <img
                        src={p.photo}
                        alt={p.name}
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                    ) : (
                      <FaUserCircle className="w-10 h-10 text-gray-400" />
                    )}
                    <div>
                      <p className="font-medium">{p.displayName}</p>
                      <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"} text-sm`}>{p.email}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"} text-sm`}>
                No one has joined yet. Be the first!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
