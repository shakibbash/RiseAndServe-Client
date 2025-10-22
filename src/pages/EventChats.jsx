// EventChats.jsx
import React, { useEffect, useState, useRef } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "../Provider/AuthProvider";
import { db } from "../../Firebase/Firebase.config";
import {
  FaComments,
  FaPaperPlane,
  FaTrash,
  FaUser,
  FaTimes,
} from "react-icons/fa";

const EventChats = ({ eventId }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);
  const wasOpenRef = useRef(false);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
      wasOpenRef.current = true;
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const q = query(
      collection(db, "events", eventId, "chats"),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(newMessages);
      if (!isOpen && wasOpenRef.current) setUnreadCount((prev) => prev + 1);
    });
    return () => unsubscribe();
  }, [eventId, isOpen]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    try {
      await addDoc(collection(db, "events", eventId, "chats"), {
        userId: user.uid,
        userName: user.displayName || user.email,
        userAvatar: user.photoURL || null,
        message: newMessage.trim(),
        timestamp: serverTimestamp(),
      });
      setNewMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id, uid) => {
    if (user.uid === uid || user.role === "admin") {
      if (window.confirm("Delete this message?")) {
        await deleteDoc(doc(db, "events", eventId, "chats", id));
      }
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setUnreadCount(0);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    return timestamp.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const isCurrentUser = (uid) => user.uid === uid;


  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="mt-5 md:bottom-1 right-10 left-[40%] md:left-[95%] w-14 h-14 bg-gradient-to-r from-[#457B9D] to-[#3d6fb5] rounded-full shadow-xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 z-50 relative"
        >
          <FaComments size={20} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 md:right-8 w-80 h-[500px] rounded-2xl shadow-2xl bg-white border border-gray-200 z-50 flex flex-col overflow-hidden">
        {/* Header */}
<div className="bg-gradient-to-r from-[#457B9D] to-[#3d6fb5] p-4 text-white flex flex-col justify-between">
  <div className="flex items-center justify-between">
    <h3 className="font-semibold text-lg">Event Chat</h3>
    <button onClick={toggleChat}>
      <FaTimes />
    </button>
  </div>
  <p className="text-sm text-blue-100 mt-1">Chat with other attendees</p>
</div>

       {/* Messages */}
<div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
  {messages.length === 0 ? (
    <p className="text-center text-gray-500">No messages yet.</p>
  ) : (
    messages.map((msg) => (
      <div
        key={msg.id}
        className={`flex gap-2 items-end ${isCurrentUser(msg.userId) ? "flex-row-reverse" : ""}`}
      >
        {/* Avatar */}
        <div className="flex-shrink-0">
          {msg.userAvatar ? (
            <img
              src={msg.userAvatar}
              alt={msg.userName}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 bg-gradient-to-r from-[#457B9D] to-[#3d6fb5] rounded-full flex items-center justify-center text-white text-xs">
              <FaUser />
            </div>
          )}
        </div>

        {/* Message + Delete + Timestamp */}
        <div className="flex flex-col items-start max-w-[80%]">
          <div className="flex items-center gap-2">
            {/* Message Bubble */}
            <div
              className={`p-2 rounded-xl shadow-sm break-words ${
                isCurrentUser(msg.userId)
                  ? "bg-gradient-to-r from-[#457B9D] to-[#3d6fb5] text-white"
                  : "bg-white text-gray-800 border border-gray-200"
              }`}
            >
              {msg.message}
            </div>

            {/* Delete Button */}
            {(user.uid === msg.userId || user.role === "admin") && (
              <button
                onClick={() => handleDelete(msg.id, msg.userId)}
                className="p-1 text-red-500 hover:text-red-700 flex-shrink-0"
                title="Delete message"
              >
                <FaTrash />
              </button>
            )}
          </div>

          {/* Timestamp */}
          <span
            className={`text-xs text-gray-400 mt-0.5 ${
              isCurrentUser(msg.userId) ? "text-right" : "text-left"
            }`}
          >
            {formatTime(msg.timestamp)}
          </span>
        </div>
      </div>
    ))
  )}
  <div ref={messagesEndRef} />
</div>




          {/* Input */}
          <div className="p-3 border-t border-gray-200 flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none"
            />
            <button
              onClick={handleSend}
              disabled={!newMessage.trim()}
              className="px-3 py-2 bg-gradient-to-r from-[#457B9D] to-[#3d6fb5] text-white rounded-xl disabled:opacity-50"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EventChats;
