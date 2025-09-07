import React, { useState } from 'react';
import { Link } from 'react-router';
import { FaArrowLeft, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useTheme } from '../Provider/ThemeContext';

const Contact = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'Thank you for contacting me. I will get back to you soon.',
        confirmButtonColor: '#f97316'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const cardClass = isDarkMode 
    ? 'bg-gray-800/80 backdrop-blur-md border border-gray-700 shadow-lg' 
    : 'bg-white/70 backdrop-blur-md border border-orange-200 shadow-xl';

  return (
    <div className={`min-h-screen px-4 py-10 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-slate-50 text-gray-900'}`}>
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/" 
          className={`flex items-center mb-8 font-semibold transition-colors duration-200 ${
            isDarkMode ? 'text-orange-400 hover:text-orange-300' : 'text-orange-600 hover:text-orange-500'
          }`}
        >
          <FaArrowLeft className="mr-2" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500">
            Contact Me
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
            I’d love to hear from you! Fill out the form below and I’ll respond as soon as possible.
          </p>
        </div>

        {/* Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className={`${cardClass} p-8 rounded-3xl`}>
            <h2 className="text-3xl font-semibold mb-6 bg-gradient-to-r from-orange-400 to-amber-500 text-transparent bg-clip-text">
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {['name', 'email', 'subject'].map((field, idx) => (
                <div className="relative" key={idx}>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className={`peer w-full px-4 pt-6 pb-2 rounded-xl border focus:outline-none transition-all duration-200 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-orange-400 focus:ring-orange-300' 
                        : 'border-gray-300 focus:border-orange-500 focus:ring-orange-200'
                    }`}
                    placeholder=" "
                  />
                  <label className={`absolute left-4 top-2 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base`}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                </div>
              ))}

              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                  className={`peer w-full px-4 pt-6 pb-2 rounded-xl border focus:outline-none transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-orange-400 focus:ring-orange-300' 
                      : 'border-gray-300 focus:border-orange-500 focus:ring-orange-200'
                  }`}
                  placeholder=" "
                />
                <label className={`absolute left-4 top-2 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base`}>
                  Message
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center transition-transform duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}`}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <FaPaperPlane className="mr-2" />
                    Send Message
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className={`${cardClass} p-8 rounded-3xl`}>
              <h2 className="text-3xl font-semibold mb-6 bg-gradient-to-r from-orange-400 to-amber-500 text-transparent bg-clip-text">
                Contact Information
              </h2>

              <div className="space-y-5">
                {[
                  { icon: <FaEnvelope />, title: 'Email', value: 'shaking235@gmail.com' },
                  { icon: <FaPhone />, title: 'Phone', value: '+88018136064**' },
                  { icon: <FaMapMarkerAlt />, title: 'Address', value: 'Nimtala High School, Bandar, Chattogram' },
                  { icon: <FaUser />, title: 'Name', value: 'Shakib Hossain' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className="bg-orange-500 p-3 rounded-lg text-white flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{item.title}</h3>
                      <p className="text-orange-600 font-semibold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${cardClass} p-8 rounded-3xl`}>
              <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-orange-400 to-amber-500 text-transparent bg-clip-text">
                FAQ & Support
              </h2>
              <p className="mb-4 text-gray-500">
                Check our FAQ section for quick answers to common questions.
              </p>
              <Link 
                to="/faq" 
                className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl transition-transform duration-200 hover:scale-105"
              >
                View FAQ
              </Link>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12">
          <div className={`${cardClass} p-8 rounded-3xl`}>
            <h2 className="text-3xl font-semibold mb-6 bg-gradient-to-r from-orange-400 to-amber-500 text-transparent bg-clip-text">
              Find Me Here
            </h2>
            <div className="w-full h-80 rounded-xl overflow-hidden shadow-lg">
              <iframe
                title="Shakib Location"
                className="w-full h-full border-0"
                src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d118113.40525504334!2d91.71578177300717!3d22.314178886797457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x30acdf2f2fd38ad1%3A0xa1600e3ae3480e5d!2s8Q7X%2BM7F%2C%20Chattogram!3m2!1d22.3141978!2d91.7982586!5e0!3m2!1sen!2sbd!4v1757270512644!5m2!1sen!2sbd"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
