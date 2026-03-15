import { Hotel, ArrowUp,MapPin, Camera, Bell, Clock,ChefHat, Gauge,Wifi,Compass ,VenetianMask} from "lucide-react";

const features = [
   { text: "Prime Location", icon: <MapPin className="h-8 w-8 text-emerald-600" /> },
  { text: "Premium Quality Rooms", icon: <Hotel className="h-8 w-8 text-amber-600" /> },
 { text: "24x7 Reception", icon: <Clock className="h-8 w-8 text-blue-600" /> },
  { text: "Lift Facility", icon: <ArrowUp className="h-8 w-8 text-indigo-600" /> },
 
  { text: "Premium Hotel Amenities", icon: <Bell className="h-8 w-8 text-orange-600" /> },
   {text:"Darshan Assistance",icon:<Compass className="h-8 w-8 text-rose-600"/>},
    { text: "Tour & Sightseeing", icon: <Camera className="h-8 w-8 text-purple-600" /> },
];

function WhyChoose() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 pt-8">
      <div className="w-full py-10 sm:py-12  lg:py-16 bg-[#e4dcce] rounded-2xl">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 px-4">
         <h2 className="group relative inline-block text-2xl sm:text-3xl font-semibold text-gray-900 font-[Poppins] cursor-pointer">
  Why Choose us ?
  <span className=" absolute left-1/2 -translate-x-1/2 -bottom-2 h-1/17 w-12 bg-black transition-all duration-500 group-hover:w-full"></span>
</h2>
        </div>

        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8">
          {features.map((item, i) => (
            <div
              key={i}
              className="group relative w-full overflow-hidden rounded-2xl bg-white p-4 sm:p-5 lg:p-6 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-amber-500/0 opacity-0 transition-all duration-500 group-hover:via-amber-500/10 group-hover:opacity-100"></div>

              <div className="relative mb-3 sm:mb-4 flex justify-center">
                <div className="rounded-xl bg-gray-50 p-3 transition-all duration-500 group-hover:scale-110 group-hover:bg-amber-50 group-hover:shadow-lg">
                  {item.icon}
                </div>
              </div>

              <h3 className="relative text-sm sm:text-base font-semibold text-gray-900 whitespace-nowrap">
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