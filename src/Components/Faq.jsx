import React from "react";
import { useTheme } from "../Provider/ThemeContext";


export default function Faq() {
  const { isDarkMode } = useTheme();

  const faqs = [
    {
      question: "How can I create a new event?",
      answer:
        "Go to the 'Create Event' page from the navbar, fill in the event details, and click 'Submit'.",
    },
    {
      question: "How do I join an event?",
      answer:
        "Visit 'Upcoming Events', select an event, and click the 'Join' button to participate.",
    },
    {
      question: "How can I reset my password?",
      answer:
        "Click 'Login', then 'Forgot Password?' and follow the instructions to reset it.",
    },
    {
      question: "Can I volunteer for multiple events?",
      answer:
        "Yes, you can join multiple events as long as the schedules do not conflict.",
    },
  ];

  return (
    <section
      className={`min-h-screen px-4 py-20 transition-colors duration-500 ${
        isDarkMode
          ? "bg-gray-900 text-gray-200"
          : "bg-gradient-to-br from-blue-50 to-orange-50 text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Support & <span className="text-[#FF6B35]">FAQ</span>
          </h1>
          <p className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-700"}`}>
            Find answers to common questions and get help with your account or events.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className={`p-6 rounded-2xl border transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                  : "bg-white/80 border-white hover:border-gray-200"
              }`}
            >
              <summary className="cursor-pointer text-lg font-semibold flex justify-between items-center">
                {faq.question}
                <span className="ml-2 text-[#FF6B35] font-bold">+</span>
              </summary>
              <p className={`mt-3 text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Need More Help?
          </h2>
          <p className={`mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-700"}`}>
            Contact our support team and we’ll get back to you as soon as possible.
          </p>
          <a
            href="mailto:support@riseandserve.com"
            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#FF6B35] via-[#F77F00] to-[#FF9E58] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Email Support
          </a>
        </div>
      </div>
    </section>
  );
}
