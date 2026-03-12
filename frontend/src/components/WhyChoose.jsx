import { Hotel, MapPin, Camera, Bell, Clock, Wifi } from "lucide-react";

const features = [
  { text: "Premium Rooms", icon: <Hotel className="h-8 w-8 text-amber-600" /> },

  {
    text: "Prime Location",
    icon: <MapPin className="h-8 w-8 text-emerald-600" />,
  },

  {
    text: "Free WiFi",
    icon: <Wifi className="h-8 w-8 text-indigo-600" />,
  },

  {
    text: "Tour & Sightseeing",
    icon: <Camera className="h-8 w-8 text-purple-600" />,
  },

  {
    text: "Hotel Amenities",
    icon: <Bell className="h-8 w-8 text-orange-600" />,
  },

  {
    text: "24x7 Reception",
    icon: <Clock className="h-8 w-8 text-blue-600" />,
  },
];

function WhyChoose() {
  return (
    <section className="py-10 sm:py-12 lg:py-16 text-center font-[Poppins] px-4">
      <h2 className="mb-8 sm:mb-10 lg:mb-12 text-2xl sm:text-3xl font-semibold">
        Why Choose us ?
      </h2>

      <div className="mx-auto  flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-10">
        {features.map((item, i) => (
          <div
            key={i}
            className="group relative w-full max-w-[260px] sm:w-[calc(50%-12px)] sm:max-w-[200px] lg:w-[11.25rem] lg:max-w-[11.25rem] overflow-hidden rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-amber-500/0 opacity-0 transition-all duration-500 group-hover:via-amber-500/10 group-hover:opacity-100"></div>

            <div className="relative mb-3 sm:mb-4 lg:mb-4 flex justify-center">
              <div className="rounded-xl bg-gray-50 p-2.5 sm:p-3 lg:p-3 transition-all duration-500 group-hover:scale-110 group-hover:bg-amber-50 group-hover:shadow-lg">
                {item.icon}
              </div>
            </div>

            <h3 className="relative mb-2 text-sm sm:text-base font-semibold text-gray-900 whitespace-nowrap">
              {item.text}
            </h3>

            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-500"></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChoose;
