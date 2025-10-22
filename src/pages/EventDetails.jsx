import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaComments,
  FaMapMarkerAlt,
  FaTag,
  FaUserCircle,
  FaUsers,
  FaClock,
  FaUser,
  FaMap,
  FaRegCalendarAlt,
  FaTicketAlt,
} from "react-icons/fa";
import { BsChatSquareText } from "react-icons/bs";
import { useAuth } from "../Provider/AuthProvider";
import { useTheme } from "../Provider/ThemeContext"; 
import { eventAPI } from "../Api/apiClient";
import EventChats from "./EventChats";


const EventDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
const [calendarAdded, setCalendarAdded] = useState(false);

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

  useEffect(() => {
    if (!event?.eventDate) return;

    const targetDate = new Date(event.eventDate).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [event]);

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
      className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-6 sm:my-8 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <Toaster />

      {/* Back Button */}
      <div className="mb-4 sm:mb-6">
        <button
          onClick={() => window.history.back()}
          className="cursor-pointer flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-[#FF6B35] to-[#F77F00] text-white font-medium rounded-lg text-sm sm:text-base shadow hover:from-[#F77F00] hover:to-[#FF6B35] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <FaArrowLeft className="text-xs sm:text-sm" />
          <span className="hidden sm:inline">Back</span>
        </button>
      </div>

      {/* Banner */}
      <div className="relative rounded-xl overflow-hidden shadow-lg">
        <img
          src={event.thumbnail}
          alt={event.title}
          className="w-full h-48 sm:h-60 md:h-72 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white drop-shadow-lg">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{event.title}</h1>
        </div>
      </div>

      {/* Countdown Section */}
      <div className="mt-6 sm:mt-8 text-center">
        {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? (
          <p className="text-lg sm:text-xl font-semibold text-green-600 animate-pulse">🎉 Event is Live Now!</p>
        ) : (
          <>
            <h3 className="text-base sm:text-lg font-semibold mb-3 flex items-center justify-center gap-2">
              <FaClock className="text-[#FF6B35]" />
              Event starts in:
            </h3>
            <div className="grid grid-flow-col gap-2 sm:gap-3 md:gap-5 text-center auto-cols-max justify-center">
              <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content min-w-[60px] sm:min-w-[70px]">
                <span className="countdown font-mono text-2xl sm:text-3xl md:text-4xl">
                  <span style={{ "--value": timeLeft.days }}></span>
                </span>
                <span className="text-xs sm:text-sm">days</span>
              </div>
              <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content min-w-[60px] sm:min-w-[70px]">
                <span className="countdown font-mono text-2xl sm:text-3xl md:text-4xl">
                  <span style={{ "--value": timeLeft.hours }}></span>
                </span>
                <span className="text-xs sm:text-sm">hrs</span>
              </div>
              <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content min-w-[60px] sm:min-w-[70px]">
                <span className="countdown font-mono text-2xl sm:text-3xl md:text-4xl">
                  <span style={{ "--value": timeLeft.minutes }}></span>
                </span>
                <span className="text-xs sm:text-sm">min</span>
              </div>
              <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content min-w-[60px] sm:min-w-[70px]">
                <span className="countdown font-mono text-2xl sm:text-3xl md:text-4xl">
                  <span style={{ "--value": timeLeft.seconds }}></span>
                </span>
                <span className="text-xs sm:text-sm">sec</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
        {/* Left: Event Info */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-5">
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed text-sm sm:text-base`}>
            {event.description}
          </p>

          {/* Event Details */}
          <div className="space-y-3 sm:space-y-4">
            <div className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              <FaTag className="text-[#FF6B35] flex-shrink-0" />
              <span className="font-medium">Type:</span> 
              <span className="text-sm sm:text-base">{event.eventType}</span>
            </div>
            <div className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              <FaCalendarAlt className="text-[#457B9D] flex-shrink-0" />
              <span className="font-medium">Date:</span>
              <span className="text-sm sm:text-base">{new Date(event.eventDate).toLocaleString()}</span>
            </div>
            <div className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              <FaMapMarkerAlt className="text-[#E63946] flex-shrink-0" />
              <span className="font-medium">Location:</span>
              <span className="text-sm sm:text-base">{event.location}</span>
            </div>
          </div>

          {/* Map */}
          <div className="mt-4 sm:mt-6">
            <h2 className={`${isDarkMode ? "text-gray-200" : "text-[#1D3557]"} text-lg font-semibold mb-3 flex items-center gap-2`}>
              <FaMap className="text-[#FF6B35]" />
              Event Location Map
            </h2>
            <iframe
              title="event-location-map"
              src={`https://www.google.com/maps?q=${encodeURIComponent(event.location)}&output=embed`}
              width="100%"
              height="300"
              className="sm:h-[350px] md:h-[400px]"
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
        <div className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-800"} p-4 sm:p-5 rounded-xl shadow-md`}>
          {/* Creator */}
          <h2 className={`${isDarkMode ? "text-gray-200" : "text-[#1D3557]"} text-lg font-semibold mb-4 flex items-center gap-2`}>
            <FaUser className="text-[#FF6B35]" />
            Event Creator
          </h2>
          <div className="flex items-center gap-3 sm:gap-4 mb-6">
            {event.creatorPhoto ? (
              <img
                src={event.creatorPhoto}
                alt={event.creatorName}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border"
              />
            ) : (
              <FaUserCircle className="w-12 h-12 sm:w-14 sm:h-14 text-gray-400" />
            )}
            <div>
              <p className="font-medium text-sm sm:text-base">{event.creatorName}</p>
              <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"} text-xs sm:text-sm`}>{event.creatorEmail}</p>
            </div>
          </div>

          {/* Join Button */}
          <button
            onClick={handleJoin}
            disabled={isJoined || joining || event?.creatorEmail === user?.email}
            className={`w-full py-3 rounded-lg shadow transition cursor-pointer text-white text-sm sm:text-base ${
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
          <div className="mt-6 sm:mt-8">
            <h2 className={`${isDarkMode ? "text-gray-200" : "text-[#1D3557]"} text-lg font-semibold mb-3 flex items-center gap-2`}>
              <FaUsers className="text-[#FF6B35]" />
              Participants ({event.participants?.length || 0})
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
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border"
                      />
                    ) : (
                      <FaUserCircle className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm sm:text-base truncate">{p.displayName}</p>
                      <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"} text-xs sm:text-sm truncate`}>{p.email}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"} text-sm text-center py-4`}>
                No one has joined yet. Be the first!
              </p>
            )}
          </div>
      
{/* Right Panel Buttons */}
<div className="mt-4 space-y-3">
  {/* View Event Pass */}
  {isJoined && (
    <button
      onClick={() => navigate(`/event-pass/${event._id}`)}
      className="w-full py-3 rounded-lg shadow bg-gradient-to-r from-[#FF6B35] via-[#F77F00] to-[#FF9E58] text-white font-medium flex items-center justify-center gap-2"
    >
      <FaTicketAlt />  View Event Pass
    </button>
  )}

  {/* Add to Google Calendar */}
  {isJoined && !calendarAdded && (
    <a
      href={`https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(event.title)}&dates=${new Date(event.eventDate).toISOString().replace(/-|:|\.\d+/g, '')}/${new Date(new Date(event.eventDate).getTime() + 60*60*1000).toISOString().replace(/-|:|\.\d+/g, '')}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}&sf=true&output=xml`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => setCalendarAdded(true)}
      className="w-full  text-center py-3 rounded-lg shadow bg-gradient-to-r from-[#FF6B35] via-[#F77F00] to-[#FF9E58] text-white font-medium flex items-center justify-center gap-2"
    >
      <FaRegCalendarAlt /> Add to Google Calendar
    </a>
  )}
</div>


        </div>
      </div>

      {/* Chat Section */}
      <div className="space-y-4 mt-6 sm:mt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <BsChatSquareText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-semibold text-gray-800">Event Chat</h1>
              <p className="text-xs sm:text-sm text-gray-500">Connect with other attendees</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-green-600">
            <FaComments className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Active</span>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-200">
          <EventChats eventId={id} />
        </div>
      </div>
    </div>
  );
};

export default EventDetails;