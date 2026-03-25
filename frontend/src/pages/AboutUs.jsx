import hero from "../assets/Dhaneshwari Photoshoot/20250601_122955.jpg";
import { 
  Hotel, ArrowUp, MapPin, Camera, Bell, Clock, Wifi, Compass, 
  Star, Users, Award, Shield, Heart, Target, Eye, Phone, Mail,
  Train, Plane, Landmark, Check, ChevronRight, Navigation
} from "lucide-react";

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
      icon: <Plane className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "Varanasi Cantt Station",
      description: "5 km (approx. 15 mins drive)",
      icon: <Train className="h-8 w-8 text-green-600" />,
    },
    {
      title: "Assi Ghat",
      description: "Walking distance (approx. 500 meters)",
      icon: <Landmark className="h-8 w-8 text-red-600" />,
    },
  ];

  const coreValues = [
    {
      title: "Authentic Hospitality",
      description:
        "Treating every guest with the warmth and respect of ancient Indian traditions.",
      icon: <Heart className="h-12 w-12 text-red-600" />,
    },
    {
      title: "Integrity",
      description:
        "Operating with transparency and honesty in every interaction.",
      icon: <Shield className="h-12 w-12 text-green-600" />,
    },
    {
      title: "Excellence",
      description:
        "Striving for perfection in our service and attention to detail.",
      icon: <Star className="h-12 w-12 text-orange-600" />,
    },
    {
      title: "Sustainability",
      description:
        "Protecting the environment and local ecology for future generations.",
      icon: <Wifi className="h-12 w-12 text-purple-600" />,
    },
    {
      title: "Cultural Respect",
      description:
        "Honoring the diverse traditions and beliefs of our guests and community.",
      icon: <Compass className="h-12 w-12 text-pink-600" />,
    },
    {
      title: "Continuous Improvement",
      description:
        "Always evolving to better serve the needs of our global travelers.",
      icon: <ArrowUp className="h-12 w-12 text-green-800" />,
    },
  ];

  const missionVision = [
    {
      title: "Our Mission",
      description:
        "To preserve and promote the spiritual heritage of Varanasi through authentic and soulful hospitality. We strive to create memorable experiences that connect our guests with the divine essence of this ancient city.",
      icon: <Target className="h-10 w-10 text-green-600" />,
    },
    {
      title: "Our Vision",
      description:
        "To be the global benchmark for luxury experiences that honor ancient traditions while embracing modern comforts. We envision a world where every traveler can experience the magic of Varanasi.",
      icon: <Eye className="h-10 w-10 text-blue-600" />,
    },
  ];

  const storyContent = [
    "Founded in 1995, Dhaneswari Hotel was born from a profound vision of the divine Goddess Dhaneswari. Nestled in the heart of the world's oldest living city, we sought to create a bridge between the timeless spiritual energy of Varanasi and the sophisticated needs of the modern traveler.",
    "For over 25 years, our journey has been defined by a commitment to authentic hospitality. What began as a modest heritage home has evolved into a premier luxury destination, yet our soul remains rooted in the traditional values of 'Atithi Devo Bhava'—treating every guest as God.",
    
    "For over 25 years, our journey has been defined by a commitment to authentic hospitality. What began as a modest heritage home has evolved into a premier luxury destination, yet our soul remains rooted in the traditional values of 'Atithi Devo Bhava'—treating every guest as God.",
  ];

  const stats = [
    { value: "25+", label: "Years of Heritage", icon: <Award className="h-8 w-8 text-amber-600" /> },
    { value: "42", label: "Luxury Rooms", icon: <Hotel className="h-8 w-8 text-amber-600" /> },
    { value: "50K+", label: "Happy Guests", icon: <Users className="h-8 w-8 text-amber-600" /> },
    { value: "4.8", label: "Guest Rating", icon: <Star className="h-8 w-8 text-amber-600" /> },
  ];

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section - Full width */}
        <section className="relative h-[600px] overflow-hidden w-full">
          <div className="absolute inset-0 w-full">
            <img
              src={hero}
              alt="Dhaneswari Hotel Varanasi"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";
              }}
            />
            <div className="absolute inset-0 bg-black/40 w-full" />
          </div>

          <div className="relative h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl w-full">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                About Dhaneswari Hotel
              </h1>
              <p className="text-2xl md:text-3xl text-white font-light mb-8">
                Where Ancient Tradition Meets Modern Luxury
              </p>
              <button className="bg-amber-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                Explore Our Story
              </button>
            </div>
          </div>
        </section>

        {/* Our Story Section - Full width */}
        <section className="w-full px-4 sm:px-6 lg:px-10 pt-10 pb-10">
          <div className="w-full py-4 rounded-2xl">
            <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-start">
              <div className="w-full">
                <h2 className="group relative inline-block text-3xl sm:text-4xl font-bold text-gray-900 font-[Poppins] cursor-pointer mb-8">
                  Our Story
                  <span className="absolute left-0 -bottom-3 h-1 w-16 bg-black transition-all duration-500 group-hover:w-full"></span>
                </h2>
                <div className="space-y-6 text-gray-600 text-lg leading-relaxed w-full">
                  {storyContent.map((paragraph, index) => (
                    <p key={index} className="hover:text-gray-900 transition-colors duration-300 w-full">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl w-full">
                <img
                  src={hero}
                  alt="Hotel Story"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section - Full width */}
        <section className="w-full px-4 sm:px-6 bg-[#e4dccc] lg:px-10 pt-5 pb-10">
          <div className="w-full py-4 bg-[#e4dccc] rounded-3xl">
            <div className="max-w-8xl mx-auto w-full pl-7 pr-7">
              <div className="text-center mb-16 w-full">
                <h2 className="group relative inline-block text-3xl sm:text-4xl font-bold text-gray-900 font-[Poppins] cursor-pointer">
                  Mission & Vision
                  <span className="absolute left-1/2 -translate-x-1/2 -bottom-3 h-1 w-16 bg-black transition-all duration-500 group-hover:w-full"></span>
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8 w-full">
                {missionVision.map((item, index) => (
                  <div
                    key={index}
                    className="group p-10 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full"
                  >
                    <div className="w-16 h-16 mb-6 rounded-xl bg-amber-50 flex items-center justify-center group-hover:bg-amber-100 transition-colors duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-amber-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section - Full width */}
        <section className="w-full px-4 sm:px-6 lg:px-10 pt-5 pb-12">
          <div className="w-full py-6 rounded-2xl">
            <div className="max-w-5xl mx-auto w-full">
              <div className="text-center mb-16 w-full">
                <h2 className="group relative inline-block text-3xl sm:text-4xl font-bold text-gray-900 font-[Poppins] cursor-pointer">
                  Our Achievements
                  <span className="absolute left-1/2 -translate-x-1/2 -bottom-3 h-1 w-16 bg-black transition-all duration-500 group-hover:w-full"></span>
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group w-full">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-amber-100 transition-colors duration-300">
                      {stat.icon}
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-500 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section - Full width */}
        <section className="w-full px-4 bg-[#e4dccc] sm:px-6 lg:px-10 pt-5 pb-10">
          <div className="w-full py-4  rounded-3xl">
            <div className="max-w-8xl pl-7 pr-7 mx-auto w-full">
              <div className="text-center mb-16 w-full">
                <h2 className="group relative inline-block text-3xl sm:text-4xl font-bold text-gray-900 font-[Poppins] cursor-pointer">
                  Our Core Values
                  <span className="absolute left-1/2 -translate-x-1/2 -bottom-3 h-1 w-16 bg-black transition-all duration-500 group-hover:w-full"></span>
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
                  The principles that guide everything we do
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {coreValues.map((value, index) => (
                  <div
                    key={index}
                    className="group p-8 rounded-2xl  bg-gray-50 border-b-4 border-orange-400  shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full"
                  >
                    <div className="flex justify-center mb-6">
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 group-hover:shadow-md transition-shadow duration-300">
                        {value.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 text-center group-hover:text-amber-600 transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Commitment Section - Full width */}
        <section className="w-full px-4 sm:px-6 lg:px-10 pt-5 pb-10">
          <div className="w-full py-4 rounded-2xl">
            <div className="max-w-8xl pl-7 pr-7 mx-auto w-full">
              <div className="text-center mb-16 w-full">
                <h2 className="group relative inline-block text-3xl sm:text-4xl font-bold text-gray-900 font-[Poppins] cursor-pointer">
                  Our Commitment to You
                  <span className="absolute left-1/2 -translate-x-1/2 -bottom-3 h-1 w-16 bg-black transition-all duration-500 group-hover:w-full"></span>
                </h2>
              </div>
              <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
                <div className="space-y-4 w-full">
                  {commitments.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 group w-full">
                      <span className="text-red-500 mt-1">
                        <Check className="h-5 w-5" />
                      </span>
                      <span className="text-gray-800 lg:text-xl group-hover:text-black   transition-colors duration-300">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-xl w-full">
                  <img
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Hotel Luxury Room"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location Section - Full width */}
      <section className="w-full px-4 bg-gray-100 sm:px-6 lg:px-10 pb-20">
  <div className="w-full py-16">
    <div className="max-w-7xl mx-auto w-full">

      <div className="text-center mb-16">
        <h2 className="group relative inline-block text-3xl sm:text-4xl font-bold text-gray-900 font-[Poppins]">
          How to Reach Us
          <span className="absolute left-1/2 -translate-x-1/2 -bottom-3 h-1 w-16 bg-black transition-all duration-500 group-hover:w-full"></span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-center">

        {/* Map */}
        <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://maps.google.com/maps?q=Dhaneshwari%20Luxury%20Stay%20Varanasi&z=17&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="w-full h-full"
            title="Hotel Location"
          />
        </div>

        {/* Right Content */}
        <div className="flex flex-row justify-center">
        <div className="flex flex-col justify-center space-y-8">

          {/* Location Info */}
          <div className="space-y-5">
            {locationData.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 group"
              >
                <div className="p-3 rounded-lg bg-white shadow-sm group-hover:bg-amber-50 transition">
                  {item.icon}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-amber-600 transition">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Address */}
          <div className="flex flex-row justify-center">
          <address className="pt-6 border-t  border-gray-200 not-italic">
            <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-700" />
              Address
            </h3>

            <p className="text-gray-600 text-m font-semibold leading-relaxed">
              Dhaneshwari Guestline <br />
              B 1/158, Dumraon Colony, Assi <br />
              Varanasi, Uttar Pradesh 221005
            </p>
          </address>
</div>
          {/* Buttons */}
          <div className="flex gap-4 pt-2">

            <a
              href="tel:+911234567890"
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <Phone className="h-4 w-4" />
              Call Us
            </a>

            <a
              href="mailto:info@dhaneswarihotel.com"
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Email Us
            </a>

          </div>

        </div>

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