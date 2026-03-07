import { 
  Hotel,
  MapPin,
  Camera,
  Bell,
  Clock
} from 'lucide-react';

const features = [
  { text: "Premium Rooms", icon: <Hotel className="h-8 w-8 text-amber-600" /> },
  { text: "Premium Rooms", icon: <Hotel className="h-8 w-8 text-amber-600" /> },
  { text: "Prime Location", icon: <MapPin className="h-8 w-8 text-emerald-600" /> },
  { text: "Premium Rooms", icon: <Hotel className="h-8 w-8 text-amber-600" /> },
  { text: "Tour & Sightseeing", icon: <Camera className="h-8 w-8 text-purple-600" /> },
  { text: "Hotel Amenities", icon: <Bell className="h-8 w-8 text-orange-600" /> },
  { text: "24x7 Reception", icon: <Clock className="h-8 w-8 text-blue-600" /> },
];

function WhyChoose() {
  return (
    <section className="py-16 text-center font-[Poppins]">
      <h2 className="mb-15 text-3xl font-semibold">Why Choose us ?</h2>

      <div className="mx-auto max-w-7xl flex flex-col justify-center gap-12 px-4">
        
        <div className="flex justify-center gap-10">
          {features.slice(0,4).map((item, i) => (
            <div
              key={i}
              className="group relative w-45 overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-amber-500/0 opacity-0 transition-all duration-500 group-hover:via-amber-500/10 group-hover:opacity-100"></div>
              
              <div className="relative mb-4 flex justify-center">
                <div className="rounded-xl bg-gray-50 p-3 transition-all duration-500 group-hover:scale-110 group-hover:bg-amber-50 group-hover:shadow-lg">
                  {item.icon}
                </div>
              </div>
              
              <h3 className="relative mb-2 text-base font-semibold text-gray-900 whitespace-nowrap">
                {item.text}
              </h3>
              
              <div className="absolute bottom-0 left-1 h-1 w-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-500"></div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center gap-10">
          {features.slice(4).map((item, i) => (
            <div
              key={i}
              className="group relative w-45 overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-amber-500/0 opacity-0 transition-all duration-500 group-hover:via-amber-500/10 group-hover:opacity-100"></div>
              
              <div className="relative mb-4 flex justify-center">
                <div className="rounded-xl bg-gray-50 p-3 transition-all duration-500 group-hover:scale-110 group-hover:bg-amber-50 group-hover:shadow-lg">
                  {item.icon}
                </div>
              </div>
              
              <h3 className="relative mb-2 text-base font-semibold text-gray-900 whitespace-nowrap">
                {item.text}
              </h3>
              
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-500"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyChoose;