import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";
import AOS from "aos";
import {
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaTag,
  FaHeading,
  FaThLarge,
  FaTable
} from "react-icons/fa";
import { useTheme } from "../Provider/ThemeContext"; // Dark mode context

const UpcomingEvents = () => {
  const { isDarkMode } = useTheme();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [viewMode, setViewMode] = useState("card"); // 'card' or 'table'

  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (!events.length) setLoading(true);
        const res = await axios.get("http://localhost:3000/event-search", {
          params: { search: searchTerm, type: selectedType },
        });
        setEvents(res.data);
      } catch (err) {
        setError("Failed to fetch events.");
        console.error(err);
      } finally {
        if (!events.length) setLoading(false);
      }
    };
    fetchEvents();
  }, [searchTerm, selectedType]);

  const eventTypes = ["All", ...new Set(events.map((event) => event.eventType))];

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedType("All");
  };

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

  if (error) return <p className="text-center mt-10">{error}</p>;

  return (
    <div className={`max-w-7xl mx-auto my-12 px-6 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1
          data-aos="zoom-in"
          data-aos-once="false"
          className="text-4xl font-extrabold bg-gradient-to-r from-[#FF6B35] to-[#F77F00] bg-clip-text text-transparent"
        >
          Upcoming Social Events
        </h1>
        <p
          data-aos="zoom-in"
          data-aos-once="false"
          className={`mt-2 max-w-5xl mx-auto text-base font-semibold ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Discover exciting local events happening near you. Join, participate, and make a meaningful impact in your community. Stay updated with the latest social gatherings, workshops, and community-driven initiatives.
        </p>
      </div>

      {/* Filters */}
      <div
        data-aos="fade-left"
        data-aos-once="false"
        className={`flex flex-col lg:flex-row justify-between items-center gap-4 mb-6 p-6 rounded-xl shadow-lg border ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-blue-50 border-blue-200"
        }`}
      >
        {/* Search */}
        <div className={`flex items-center rounded-full px-4 py-2 w-full lg:w-72 transition ${
          isDarkMode ? "bg-gray-700" : "bg-white"
        }`}>
          <FaHeading className="text-blue-400 mr-2" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full focus:outline-none ${isDarkMode ? "text-white placeholder-gray-400" : "text-gray-700 placeholder-gray-400"}`}
          />
        </div>

        {/* Event Type */}
        <div className={`flex items-center rounded-full px-4 py-2 w-full lg:w-48 transition ${
          isDarkMode ? "bg-gray-700" : "bg-white"
        }`}>
          <FaTag className="text-purple-400 mr-2" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className={`w-full focus:outline-none ${isDarkMode ? "text-white bg-gray-700" : "text-gray-700 bg-white"}`}
          >
            {eventTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Reset */}
        {(searchTerm || selectedType !== "All") && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-red-400 to-pink-400 text-white rounded-full shadow hover:from-red-500 hover:to-pink-500 transition font-semibold"
          >
            <FaRegCalendarAlt /> Clear Filters
          </button>
        )}

        {/* View Mode */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("card")}
            className={`p-3 rounded-full transition hover:scale-105 ${
              viewMode === "card"
                ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                : isDarkMode ? "bg-gray-700 text-white shadow-sm" : "bg-white text-gray-700 shadow-sm"
            }`}
          >
            <FaThLarge />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`p-3 rounded-full transition hover:scale-105 ${
              viewMode === "table"
                ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                : isDarkMode ? "bg-gray-700 text-white shadow-sm" : "bg-white text-gray-700 shadow-sm"
            }`}
          >
            <FaTable />
          </button>
        </div>
      </div>

      {/* No events */}
      {events.length === 0 ? (
        <div className={`mt-4 p-4 rounded-lg text-center ${isDarkMode ? "bg-gray-700 text-gray-200" : "bg-yellow-50 text-yellow-800"} border`}>
          <p className="mb-2">No events found matching your search or filter criteria.</p>
          <button
            onClick={resetFilters}
            className={`inline-flex items-center px-3 py-1 rounded-md text-sm transition-colors duration-200 ${isDarkMode ? "bg-gray-600 hover:bg-gray-500 text-white" : "bg-yellow-100 hover:bg-yellow-200 text-yellow-800"}`}
          >
            Clear All Filters
          </button>
        </div>
      ) : viewMode === "card" ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event._id}
              data-aos="zoom-in"
              data-aos-once="false"
              className={`rounded-xl overflow-hidden shadow-lg hover:scale-105 transform transition duration-300 ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white"
              }`}
            >
              <div className="relative">
                <img src={event.thumbnail} alt={event.title} className="w-full h-48 object-cover" />
                <span className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  <FaTag className="text-sm" /> {event.eventType}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <FaHeading className="text-blue-500" /> {event.title}
                </h3>
                <p className="text-sm flex items-center gap-2 text-gray-400">
                  <FaMapMarkerAlt /> {event.location}
                </p>
                <p className="text-sm flex items-center gap-2 text-gray-400">
                  <FaRegCalendarAlt /> {new Date(event.eventDate).toLocaleString()}
                </p>
                <Link
                  to={`/events/${event._id}`}
                  className="mt-3 inline-block w-full text-center px-4 py-2 bg-gradient-to-r from-[#FF6B35] to-[#F77F00] text-white font-semibold rounded-lg shadow hover:to-[#FF6B35] transition"
                >
                  View Event
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Responsive Table
        <div className="overflow-x-auto rounded-xl shadow-md">
          <table className={`min-w-full border ${isDarkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white border-gray-200"}`}>
            <thead className={isDarkMode ? "bg-gray-700 text-white" : "bg-blue-500 text-white"}>
              <tr>
                <th className="px-4 py-2 border">Thumbnail</th>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Action</th>
             
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id} className={`hover:${isDarkMode ? "bg-gray-700" : "bg-gray-100"} transition cursor-pointer`}>
                  <td className="px-4 py-2 border">
                    <img src={event.thumbnail} alt={event.title} className="w-[200px] h-[100px] object-cover rounded-md mx-auto" />
                  </td>
                  <td className="px-4 py-2 border flex items-center gap-2">
                    <FaHeading className="text-blue-500" /> {event.title}
                  </td>
                  <td className="px-4 py-2 border flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-500" /> {event.location}
                  </td>
                  <td className="px-4 py-2 border flex items-center gap-2">
                    <FaRegCalendarAlt className="text-green-500" /> {new Date(event.eventDate).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border flex items-center gap-2">
                    <FaTag className="text-purple-500" /> {event.eventType}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <Link
                      to={`/events/${event._id}`}
                      className="inline-flex items-center justify-center gap-2 px-3 py-1 bg-gradient-to-r from-[#FF6B35] to-[#F77F00] text-white rounded-full hover:to-[#FF6B35] transition"
                    >
                      <FaRegCalendarAlt /> View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;
