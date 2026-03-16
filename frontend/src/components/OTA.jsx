import React from "react";

const otaPlatforms = [
  {
    name: "MakeMyTrip",
    logo: "https://logos-world.net/wp-content/uploads/2023/08/MakeMyTrip-Logo-500x281.png",
    url: "https://www.makemytrip.com/hotels/dhaneshwari",
    rating: "4.6",
    reviews: "2k+",
    gradient: "from-purple-500 to-indigo-600"
  },
  {
    name: "Agoda",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Agoda_Logo.png",
    url: "https://www.agoda.com/dhaneshwari-hotel",
    rating: "4.3",
    reviews: "850+",
    gradient: "from-red-500 to-pink-500"
  },
  {
    name: "Booking.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Booking.com_logo.svg/2560px-Booking.com_logo.svg.png",
    url: "https://www.booking.com/hotel/in/dhaneshwari.html",
    rating: "4.5",
    reviews: "1.2k+",
    gradient: "from-blue-500 to-cyan-500"
  }
];

function OTAHighlights() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10">
      <div className="w-full py-8 mb-6 rounded-2xl">
        <div className="text-center mb-12 px-4">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12 px-4">
         <h2 className="group relative inline-block text-2xl sm:text-3xl font-semibold text-gray-900 font-[Poppins] cursor-pointer">
    Book on Top OTAs
  <span className=" absolute left-1/2 -translate-x-1/2 -bottom-2 h-1/17 w-12 bg-black transition-all duration-500 group-hover:w-full"></span>
</h2>
        </div>
          <p className="text-gray-600 max-w-xl mx-auto">
            Choose from India's most trusted travel platforms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
          {otaPlatforms.map((platform, index) => (
            <a
              key={index}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1"
            >
              

              <div className=" border-b-4 border-amber-400 p-8 flex flex-col items-center">
                <div className="h-16 mb-6 flex items-center justify-center">
                  <img
                    src={platform.logo}
                    alt={platform.name}
                    className="h-12 w-auto object-contain"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${platform.name}&background=random&size=128`;
                    }}
                  />
                </div>

                <h3 className="text-lg font-semibold text-gray-800 text-center mb-4">
                  {platform.name}
                </h3>

                <div className="flex items-center justify-center gap-2 mb-6">
                  <span className="text-yellow-400">★</span>
                  <span className="font-medium text-gray-700">{platform.rating}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-500">{platform.reviews} reviews</span>
                </div>

                <div
                  className={`w-full text-center py-2 px-4 rounded-lg bg-orange-500/79 text-white font-medium opacity-90 group-hover:opacity-100 transition-opacity`}
                >
                  Book Now →
                </div>
              </div>
            </a>
          ))}
        </div>

        
      </div>
    </section>
  );
}

export default OTAHighlights;