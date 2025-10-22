import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { QRCodeCanvas } from "qrcode.react";
import { useAuth } from "../Provider/AuthProvider";
import { useTheme } from "../Provider/ThemeContext";
import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaFilePdf,
  FaDownload,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Document, Page, Text, View, StyleSheet, pdf, Image } from "@react-pdf/renderer";

const EventPassCard = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generatingPDF, setGeneratingPDF] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState("");

  const volunteerActivities = [
    "Cleanup",
    "Plantation",
    "Donation",
    "Awareness",
    "Health Camp",
    "Skill Development",
    "Food Drive",
    "Youth Empowerment",
  ];

  // Fetch event data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`https://b11a11-server-side-shakibbash.vercel.app/events/${id}`);
        if (!res.ok) throw new Error("Failed to fetch event pass");
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.error(err);
        toast.error(err.message || "Error fetching event pass");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  // Capture QR code as DataURL
  useEffect(() => {
    if (event && user) {
      const canvas = document.querySelector("canvas");
      if (canvas) setQrDataUrl(canvas.toDataURL());
    }
  }, [event, user]);

  if (loading) return <Loading isDarkMode={isDarkMode} />;
  if (!event) return <NotFound navigate={navigate} isDarkMode={isDarkMode} />;

  const isVolunteering = volunteerActivities.includes(event.eventType);
  if (!isVolunteering)
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center px-4 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}`}>
        <h2 className="text-lg font-semibold">No digital pass required for this activity</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 bg-gradient-to-r from-[#FF6B35] to-[#F77F00] text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );

  const qrData = JSON.stringify({
    eventId: event._id,
    eventTitle: event.title,
    eventDate: event.eventDate,
    eventType: event.eventType,
    participantName: user.displayName,
    participantEmail: user.email,
    timestamp: new Date().toISOString(),
  });

  // PDF Styles
  const styles = StyleSheet.create({
    page: { flexDirection: "column", backgroundColor: "#fff", padding: 30, fontFamily: "Helvetica" },
    header: { backgroundColor: "#FF6B35", padding: 20, textAlign: "center", marginBottom: 20, borderRadius: 10 },
    headerText: { color: "#fff", fontSize: 24, fontWeight: "bold" },
    subHeader: { color: "#fff", fontSize: 12, opacity: 0.9 },
    card: { border: "2px solid #E5E7EB", borderRadius: 15, padding: 25 },
    eventTitle: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 15, color: "#1F2937" },
    infoItem: { flexDirection: "row", alignItems: "center", marginBottom: 8, fontSize: 12, color: "#6B7280" },
    userInfo: { backgroundColor: "#F9FAFB", padding: 15, borderRadius: 8, marginVertical: 15, border: "1px solid #E5E7EB" },
    userName: { fontSize: 14, fontWeight: "bold", color: "#1F2937", marginBottom: 4 },
    userEmail: { fontSize: 10, color: "#6B7280" },
    qrContainer: { alignItems: "center", marginVertical: 20 },
    qrTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 10, color: "#374151" },
    footer: { textAlign: "center", marginTop: 20, paddingTop: 15, borderTop: "1px solid #E5E7EB", fontSize: 10, color: "#9CA3AF" },
  });

  const EventPassPDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Event Pass</Text>
          <Text style={styles.subHeader}>Digital Access Credential</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.eventTitle}>{event.title}</Text>

          <View style={{ marginBottom: 15 }}>
            <View style={styles.infoItem}>
              <Text> {new Date(event.eventDate).toLocaleDateString()}</Text>
            </View>
            {event.location && (
              <View style={styles.infoItem}>
                <Text> {event.location}</Text>
              </View>
            )}
            {event.eventType && (
              <View style={styles.infoItem}>
                <Text>Type: {event.eventType}</Text>
              </View>
            )}
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.displayName || "Guest"}</Text>
            <Text style={styles.userEmail}> {user.email || "guest@example.com"}</Text>
          </View>

          {qrDataUrl && (
            <View style={styles.qrContainer}>
              <Text style={styles.qrTitle}>SCAN FOR ENTRY</Text>
              <Image src={qrDataUrl} style={{ width: 180, height: 180 }} />
            </View>
          )}

          <View style={styles.footer}>
            <Text>Present this QR code at the event entrance</Text>
            <Text>Valid for: {event.title}</Text>
            <Text>Generated on: {new Date().toLocaleDateString()}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  const downloadPDF = async () => {
    setGeneratingPDF(true);
    try {
      const blob = await pdf(<EventPassPDF />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${event.title.replace(/\s+/g, "_")}_EventPass.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("Event pass downloaded!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate PDF");
    } finally {
      setGeneratingPDF(false);
    }
  };

  const downloadQRCode = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return toast.error("QR code not available");
    const link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = `${event.title.replace(/\s+/g, "_")}_QRCode.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("QR code downloaded!");
  };

  return (
    <div className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"} min-h-screen py-8 px-4`}>
      <Toaster />

      <div className="max-w-md mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition-all duration-300 ${
            isDarkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-gray-700 hover:shadow-lg"
          }`}
        >
          <FaArrowLeft className="text-[#FF6B35]" /> Back to Event
        </button>
      </div>

      <div className={`max-w-md mx-auto rounded-3xl overflow-hidden border border-gray-200 shadow-2xl ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="bg-gradient-to-r from-[#FF6B35] to-[#F77F00] p-6 text-center">
          <h1 className="text-2xl font-bold">🎪 EventPass</h1>
          <p className="text-white/90 text-sm">Digital Access Credential</p>
        </div>

        <div className="p-6 text-center">
          <h2 className="text-xl font-bold mb-3">{event.title}</h2>

          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-center gap-2">
              <FaCalendarAlt className="text-[#FF6B35]" />
              {new Date(event.eventDate).toLocaleDateString()}
            </div>
            {event.location && (
              <div className="flex items-center justify-center gap-2">
                <FaMapMarkerAlt className="text-[#FF6B35]" /> {event.location}
              </div>
            )}
            {event.eventType && (
              <div className="inline-block px-3 py-1 bg-gradient-to-r from-[#FF6B35] to-[#F77F00] text-white text-xs rounded-full">
                {event.eventType}
              </div>
            )}
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 my-4 flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-[#FF6B35] to-[#F77F00] rounded-full flex items-center justify-center">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <FaUser className="text-white text-lg" />
              )}
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800 dark:text-white text-sm">{user.displayName || "Guest"}</p>
              <p className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1 mt-1">
                <FaEnvelope className="text-[#FF6B35]" /> {user.email || "guest@example.com"}
              </p>
            </div>
          </div>

          <div className="mb-6 flex justify-center items-center">
            <QRCodeCanvas value={qrData} size={180} bgColor={isDarkMode ? "#1f2937" : "#fff"} fgColor={isDarkMode ? "#fff" : "#1f2937"} level="H" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={downloadPDF}
              disabled={generatingPDF}
              className="py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {generatingPDF ? "Generating..." : <><FaFilePdf /> Download PDF</>}
            </button>
            <button
              onClick={downloadQRCode}
              className="py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center gap-2"
            >
              <FaDownload /> QR Code Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading Skeleton
const Loading = ({ isDarkMode }) => (
  <div className={`flex justify-center items-center min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
    <div className="animate-spin w-12 h-12 border-4 border-t-[#FF6B35] border-gray-200 rounded-full"></div>
    <p className={`mt-4 text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-700"}`}>Loading your event pass...</p>
  </div>
);

// Not Found Component
const NotFound = ({ navigate, isDarkMode }) => (
  <div className={`flex justify-center items-center min-h-screen text-center px-4 ${isDarkMode ? "text-white bg-gray-900" : "text-gray-800 bg-gray-50"}`}>
    <div>
      <p className="text-lg text-red-500 font-semibold mb-4">Event pass not found</p>
      <button
        onClick={() => navigate(-1)}
        className="px-6 py-2 bg-gradient-to-r from-[#FF6B35] to-[#F77F00] text-white rounded-lg"
      >
        Go Back
      </button>
    </div>
  </div>
);

export default EventPassCard;
