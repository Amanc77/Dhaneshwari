import React from "react";
import Navbar from "../components/Navbar";
import hero from "../assets/Dhaneshwari Photoshoot/About_us_hero.jpg";
const About = () => {
  const commitments = [
    "Immaculate Clean Accommodations",
    "24/7 Personalized Concierge Service",
    "Authentic Local Culinary Experiences",
    "Private Ganges Aarti Arrangements",
    "Airport & Station Transfers",
  ];

  const locationData = [
    {
      title: "Lal Bahadur Shastri Airport",
      description: "25 km (approx. 45 mins drive)",
      icon: "✈️",
    },
    {
      title: "Varanasi Cantt Station",
      description: "5 km (approx. 15 mins drive)",
      icon: "🚂",
    },
    {
      title: "Assi Ghat",
      description: "Walking distance (approx. 500 meters)",
      icon: "🛕",
    },
  ];

  const coreValues = [
    {
      title: "Authentic Hospitality",
      description:
        "Treating every guest with the warmth and respect of ancient Indian traditions.",
    },
    {
      title: "Integrity",
      description:
        "Operating with transparency and honesty in every interaction.",
    },
    {
      title: "Excellence",
      description:
        "Striving for perfection in our service and attention to detail.",
    },
    {
      title: "Sustainability",
      description:
        "Protecting the environment and local ecology for future generations.",
    },
    {
      title: "Cultural Respect",
      description:
        "Honoring the diverse traditions and beliefs of our guests and community.",
    },
    {
      title: "Continuous Improvement",
      description:
        "Always evolving to better serve the needs of our global travelers.",
    },
  ];

  const missionVision = [
    {
      title: "Our Mission",
      description:
        "To preserve and promote the spiritual heritage of Varanasi through authentic and soulful hospitality.To preserve and promote the spiritual heritage of Varanasi through authentic and soulful hospitality.To preserve and promote the spiritual heritage of Varanasi through authentic and soulful hospitality.",
    },
    {
      title: "Our Vision",
      description:
        "To preserve and promote the spiritual heritage of Varanasi through authentic and soulful hospitality.To preserve and promote the spiritual heritage of Varanasi through authentic and soulful hospitality.To preserve and promote the spiritual heritage of Varanasi through authentic and soulful hospitality.To be the global benchmark for luxury experiences that honor ancient traditions.",
    },
  ];

  const storyContent = [
    "Founded in 1995, Dhaneswari Hotel was born from a profound vision of the divine Goddess Dhaneswari. Nestled in the heart of the world's oldest living city, we sought to create a bridge between the timeless spiritual energy of Varanasi and the sophisticated needs of the modern traveler.",
    "For over 25 years, our journey has been defined by a commitment to authentic hospitality. What began as a modest heritage home has evolved into a premier luxury destination, yet our soul remains rooted in the traditional values of 'Atithi Devo Bhava'—treating every guest as God.",
     "Founded in 1995, Dhaneswari Hotel was born from a profound vision of the divine Goddess Dhaneswari. Nestled in the heart of the world's oldest living city, we sought to create a bridge between the timeless spiritual energy of Varanasi and the sophisticated needs of the modern traveler.",
    "For over 25 years, our journey has been defined by a commitment to authentic hospitality. What began as a modest heritage home has evolved into a premier luxury destination, yet our soul remains rooted in the traditional values of 'Atithi Devo Bhava'—treating every guest as God.",
  ];

  const stats = [
    { value: "25+", label: "Years of Heritage" },
    { value: "42", label: "Luxury Rooms" },
    { value: "50K+", label: "Happy Guests" },
    { value: "4.8", label: "Guest Rating" },
  ];

  // Image path fix - use correct import or public folder
  const heroImage = "C:\Users\Lenovo\Dhaneshwari\frontend\src\assets\Dhaneshwari Photoshoot\About_us_hero.jpg"; // Public folder se

  return (
    <>
      <Navbar />
      <div className="bg-[#fcf7ea] min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[600px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={hero}
              alt="Dhaneswari Hotel Varanasi"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"; // Fallback image
              }}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                About Dhaneswari Hotel
              </h1>
              <p className="text-2xl md:text-3xl text-white font-light mb-8">
                Where Ancient Tradition Meets Modern Luxury
              </p>
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-[#0ac2c2] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0">
                Explore Our Story
              </button>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Our Story
              </h2>
              <div className="w-24 h-1 bg-yellow-400 mx-auto" />
            </div>

            <div className="space-y-6 text-gray-600 text-lg py-9 px-9 font-semibold rounded-xl leading-relaxed">
              {storyContent.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-16 px-4 ">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {missionVision.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#fcf7ea] p-10 rounded-2xl shadow-lg border-t-4 border-yellow-400 hover:shadow-xl transition-shadow bg-white"
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 group-hover:text-yellow-600 transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-20 px-4 ">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Our Core Values
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreValues.map((value, index) => (
                <div
                  key={index}
                  className="bg-[#fcf7ea] p-8 rounded-xl shadow-md bg-white hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-center text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Commitment Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-8">
                  Our Commitment to You
                </h2>
                <ul className="space-y-4">
                  {commitments.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-yellow-400 text-xl">✓</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Hotel Luxury Room"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Map */}
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.123456789012!2d82.987654321!3d25.317654321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDE5JzAzLjUiTiA4MsKwNTknMTUuNSJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="w-full h-full"
                  title="Hotel Location"
                />
              </div>

              {/* Contact Info */}
              <div className="flex flex-col justify-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-8">
                  How to Reach Us
                </h2>

                <div className="space-y-6">
                  {locationData.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#fcf7ea] rounded-xl flex items-center justify-center text-2xl">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <address className="mt-8 pt-8 border-t border-gray-200 not-italic text-gray-600">
                  <p className="font-bold mb-2">📍 Address</p>
                  B 1/158, Dumraon Colony, Assi,
                  <br />
                  Varanasi, Uttar Pradesh 221005
                </address>

                {/* Contact Buttons */}
                <div className="mt-6 flex gap-4">
                  <a
                    href="tel:+911234567890"
                    className="bg-[#0df2f2] text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-[#0ac2c2] transition-colors text-center flex-1"
                  >
                    Call Us
                  </a>
                  <a
                    href="mailto:info@dhaneswarihotel.com"
                    className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors text-center flex-1"
                  >
                    Email Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;