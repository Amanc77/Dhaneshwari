import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Calendar,
  Users,
  Briefcase,
  Heart,
  Star,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ChevronRight,
  ChevronDown,
  Check,
  Navigation,
  Wifi,
  Coffee,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email is invalid";
    if (!formData.subject) errors.subject = "Please select a subject";
    if (!formData.message.trim()) errors.message = "Message is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Submit form
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } else {
      setFormErrors(errors);
    }
  };

  const subjects = [
    "Room Reservations",
    "Event Planning",
    "Temple Tour Packages",
    "Group Bookings",
    "Feedback & Complaints",
    "Career Opportunities",
  ];

  const quickActions = [
    {
      icon: Calendar,
      title: "Room Reservations",
      description: "Book your stay with us",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Users,
      title: "Event Planning",
      description: "Weddings & special occasions",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: MapPin,
      title: "Temple Tour Packages",
      description: "Spiritual journey assistance",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Briefcase,
      title: "Group Bookings",
      description: "Corporate & pilgrim groups",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: Heart,
      title: "Feedback & Complaints",
      description: "We value your opinion",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: Star,
      title: "Career Opportunities",
      description: "Join our team",
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  const faqs = [
    {
      question: "What is the check-in and check-out time?",
      answer:
        "Check-in time is 12:00 PM and check-out time is 10:00 AM. Early check-in and late check-out can be arranged subject to availability.",
    },
    {
      question: "Do you arrange Ganga Aarti and temple tours?",
      answer:
        "Yes, we offer guided tours for Ganga Aarti and major temples. Our concierge desk can help you book these experiences.",
    },
    {
      question: "Is vegetarian/Sattvic food available?",
      answer:
        "Yes, our restaurant serves pure vegetarian and Sattvic food prepared in a traditional style.",
    },
    {
      question: "Do you provide airport pickup?",
      answer:
        "Yes, we offer airport pickup and drop services. Please inform us of your flight details in advance.",
    },
    {
      question: "Are there rooms with Ganges view?",
      answer:
        "Yes, we have several rooms offering beautiful views of the Ganges. Please mention your preference while booking.",
    },
  ];

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-800 to-amber-900 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 border-2 border-white rounded-full"></div>
        </div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contact Dhaneswari Hotel
          </h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
            Get In Touch
          </p>
          <div className="w-20 h-1 bg-amber-400 mx-auto mt-6"></div>
        </div>
      </div>

      {/* Contact Info Cards */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Form */}
          <div className="w-full lg:w-3/5 bg-white rounded-xl py-6 px-9">
            <h2 className="text-2xl font-bold text-center text-gray-800 item-center mb-2">
              Send Us a Message
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              Fill out the form below and our team will get back to you within
              24 hours
            </p>

            {isSubmitted && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                Thank you for contacting us! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formErrors.fullName ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                />
                {formErrors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formErrors.email ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject <span className="text-red-500">*</span>
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formErrors.subject ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white`}
                >
                  <option value="">Select a subject</option>
                  {subjects.map((subject, index) => (
                    <option key={index} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
                {formErrors.subject && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Tell us how we can help you..."
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formErrors.message ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none`}
                ></textarea>
                {formErrors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-around">
                <button
                  type="submit"
                  className="bg-amber-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-amber-700 transition flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <Send size={18} />
                  Message via Email
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-amber-700 transition flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <Send size={18} />
                  Message via Whatsapp
                </button>{" "}
              </div>
            </form>
          </div>

          {/* Right Column - Contact Info Cards */}
          <div className="w-full lg:w-2/5 flex flex-col gap-8">
            {/** Render all 4 cards */}
            <div className="bg-white rounded-xl shadow-lg flex justify-between p-6">
              <div>
                {" "}
                <div className="w-15 h-15 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-3">
                  Phone Numbers
                </h3>
              </div>{" "}
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">+91 542 2501234</p>
                <p className="text-gray-600">
                  +91 98765 43210{" "}
                  <span className="text-green-600 text-xs ml-1">
                    (WhatsApp)
                  </span>
                </p>
                <p className="text-gray-600 font-medium">
                  Toll Free: 1800 123 4567
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 flex justify-between">
              <div>
                <div className="w-15 h-15 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-3">
                  Email Address
                </h3>
              </div>{" "}
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">
                  reservations@dhaneswarihotel.com
                </p>
                <p className="text-gray-600">info@dhaneswarihotel.com</p>
                <p className="text-gray-600">support@dhaneswarihotel.com</p>
              </div>
            </div>

            <div className="bg-white rounded-xl flex justify-between shadow-lg p-6">
              <div>
                <div className="w-15 h-15 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-3">
                  Hotel Address
                </h3>
              </div>{" "}
              <div className="space-y-1 text-sm">
                <p className="text-gray-600">Dashashwamedh Ghat Road</p>
                <p className="text-gray-600">Near Kashi Vishwanath Temple</p>
                <p className="text-gray-600 font-medium">
                  Varanasi, Uttar Pradesh 221001, India
                </p>
              </div>
            </div>

            <div className="bg-white flex justify-between rounded-xl shadow-lg p-6">
              <div>
                <div className="w-15 h-15 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-3">
                  Reception Hours
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">Front Desk: 24/7</p>
                <p className="text-gray-600">
                  Reservations: 8:00 AM - 10:00 PM
                </p>
                <p className="text-gray-600 font-medium">
                  Concierge: 6:00 AM - 11:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-2 gap-8">
        {/* Left: Hotel Concierge */}
        <div className="bg-white rounded-xl shadow-lg p-6 w-full">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Hotel Concierge
          </h3>
          <p className="text-gray-600 mb-4">What Can We Help You With?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
              >
                <div
                  className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                >
                  <action.icon size={16} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">
                    {action.title}
                  </h4>
                  <p className="text-xs text-gray-500">{action.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Connect With Us */}
        <div className="bg-white rounded-xl shadow-lg p-6 w-full">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Connect With Us
          </h3>
          <p className="text-gray-600 mb-4">
            Follow us on social media for updates and special offers
          </p>
          <div className="flex gap-3">
            <a
              href="#"
              className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-pink-600 text-white rounded-lg flex items-center justify-center hover:bg-pink-700 transition"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-blue-400 text-white rounded-lg flex items-center justify-center hover:bg-blue-500 transition"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-red-600 text-white rounded-lg flex items-center justify-center hover:bg-red-700 transition"
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>
      {/* Map & Location Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Find Us Here
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Map */}
            <div className="h-[400px] rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.0!2d83.0159527!3d25.3163986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2f002b22ac9f:0x78d4ad8c13ec3058!2sDhaneshwari+luxury+stay!5e0!3m2!1sen!2sin!4v1742500000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="w-full h-full"
                title="Hotel Location"
              ></iframe>
            </div>

            {/* Location Info */}
            <div className="space-y-6 bg-gray-50 py-5 px-8 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Our Location
                  </h3>
                  <p className="text-gray-600">
                    Located in the heart of spiritual Varanasi, minutes away
                    from major temples and ghats
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Navigation className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    From Airport
                  </h3>
                  <p className="text-gray-600">
                    30 minutes drive from Lal Bahadur Shastri Airport
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Nearby Landmarks
                  </h3>
                  <p className="text-gray-600">
                    Kashi Vishwanath Temple (5 min walk)
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 p-5 rounded-lg mt-4">
                <p className="text-gray-700 font-medium">Address:</p>
                <p className="text-gray-600">
                  Dashashwamedh Ghat Road, Near Kashi Vishwanath Temple
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 text-center mb-10">
          Quick answers to common questions
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                  <span className="font-medium text-gray-800">
                    {faq.question}
                  </span>
                  <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-gray-600 border-t border-gray-100 pt-3">
                  {faq.answer}
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
