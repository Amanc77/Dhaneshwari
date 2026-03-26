import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Hotel,
  ArrowUp,
  MapPin,
  Camera,
  Bell,
  Clock,
  Compass,
} from "lucide-react";

const features = [
  {
    text: "Prime Location",
    icon: <MapPin className="h-8 w-8 text-emerald-600" />,
    description: "Heart of the city with easy access to attractions"
  },
  {
    text: "Premium Quality Rooms",
    icon: <Hotel className="h-8 w-8 text-amber-600" />,
    description: "Luxuriously designed rooms with modern amenities"
  },
  {
    text: "24x7 Reception",
    icon: <Clock className="h-8 w-8 text-blue-600" />,
    description: "Round-the-clock assistance for your convenience"
  },
  {
    text: "Lift Facility",
    icon: <ArrowUp className="h-8 w-8 text-indigo-600" />,
    description: "Easy access to all floors with modern elevators"
  },
  {
    text: "Premium Hotel Amenities",
    icon: <Bell className="h-8 w-8 text-orange-600" />,
    description: "World-class amenities for a memorable stay"
  },
  {
    text: "Darshan Assistance",
    icon: <Compass className="h-8 w-8 text-rose-600" />,
    description: "Guidance for temple visits and spiritual tours"
  },
  {
    text: "Tour & Sightseeing",
    icon: <Camera className="h-8 w-8 text-purple-600" />,
    description: "Explore local attractions with expert guidance"
  },
];

function WhyChoose() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Hotel",
      "name": "Dhaneshwari Hotel",
      "description": "Luxury hotel offering prime location, premium rooms, 24x7 reception, and exceptional amenities",
      "amenityFeature": features.map(feature => ({
        "@type": "LocationFeatureSpecification",
        "name": feature.text,
        "description": feature.description
      }))
    });
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Why Choose Dhaneshwari Hotel | Premium Amenities & Services</title>
        <meta 
          name="description" 
          content="Discover why Dhaneshwari Hotel is the perfect choice for your stay. Prime location, premium rooms, 24x7 reception, lift facility, darshan assistance, and tour services." 
        />
        <meta 
          name="keywords" 
          content="Dhaneshwari Hotel amenities, luxury hotel Varanasi, prime location hotel, 24x7 reception, darshan assistance, tour services, hotel facilities" 
        />
        <link rel="canonical" href={typeof window !== "undefined" ? `${window.location.origin}/why-choose-us` : "https://dhaneshwari.com/why-choose-us"} />
      </Helmet>

      <section className="w-full px-4 sm:px-6 lg:px-10 pt-8">
        <div className="w-full py-2 sm:py-12 lg:py-16  rounded-2xl">
          <div className="text-center mb-10">
            <h1 className="group relative inline-block text-2xl sm:text-3xl font-semibold text-gray-900 font-[Poppins] cursor-pointer">
              Why Choose Us?
              <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 h-[3px] w-12 bg-black transition-all duration-500 group-hover:w-full"></span>
            </h1>
            
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 pt-4 lg:grid-cols-7 gap-7 px-2">
            {features.map((item, i) => (
              <div
                key={i}
                className="group relative min-h-[140px] overflow-hidden rounded-2xl bg-white p-5 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center justify-center text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-amber-500/0 opacity-0 transition-all duration-500 group-hover:via-amber-500/5 group-hover:opacity-100"></div>

                <div className="relative mb-3 flex justify-center">
                  <div className="rounded-xl bg-gray-50 p-3 transition-all duration-500 group-hover:scale-110 group-hover:bg-amber-50 group-hover:shadow-lg">
                    {item.icon}
                  </div>
                </div>

                <h2 className="relative text-sm sm:text-base font-semibold text-gray-900 text-center mb-1">
                  {item.text}
                </h2>
                

                <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-amber-400 to-amber-600 "></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default WhyChoose;
