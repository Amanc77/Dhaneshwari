import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import api from "../api/axios";
import room1 from "../assets/Dhaneshwari Photoshoot/roomewithBlancket.jpeg";
import room2 from "../assets/Dhaneshwari Photoshoot/roomwithBalloon.jpg";
import room3 from "../assets/Dhaneshwari Photoshoot/astheticRoom.jpeg";
import { buildQuickPaymentState } from "../utils/quickPaymentState";
import { getImageAlt, getSeoFileName } from "../utils/imageSeo";

const fallbackRooms = [
  {
    title: "Deluxe Room",
    desc: "Elegant interiors with modern comfort. Perfect for business travelers and couples seeking a luxurious stay.",
    img: room1,
    price: 3499,
    amenities: ["Free WiFi", "AC", "TV", "Mini Bar"],
    size: "320 sq ft",
    occupancy: "2 Adults"
  },
  {
    title: "Premium Room",
    desc: "Luxury stay experience for couples & families with premium amenities and breathtaking views.",
    img: room2,
    price: 4499,
    amenities: ["Free WiFi", "AC", "TV", "Mini Bar", "Bathtub"],
    size: "450 sq ft",
    occupancy: "3 Adults"
  },
  {
    title: "Family Suite",
    desc: "Spacious comfort with premium amenities. Ideal for families and groups seeking extra space and luxury.",
    img: room3,
    price: 6999,
    amenities: ["Free WiFi", "AC", "TV", "Mini Bar", "Bathtub", "Living Area"],
    size: "650 sq ft",
    occupancy: "4 Adults"
  },
];

function Rooms() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState(fallbackRooms);

  useEffect(() => {
    let mounted = true;
    const fallbackImages = [room1, room2, room3];
    api
      .get("/rooms")
      .then(({ data }) => {
        if (!mounted || !Array.isArray(data) || data.length === 0) return;
        const mapped = data.map((room, idx) => ({
          id: room._id,
          title: room.roomType,
          desc: room.shortDescription || "Elegant interiors with modern comfort.",
          img: room.images?.[0] || fallbackImages[idx % fallbackImages.length],
          price: room.pricePerNight,
          amenities: room.amenities || [],
          size: room.size || "Spacious",
          occupancy: `${room.maxOccupancy || room.baseOccupancy || 2} Adults`,
        }));
        setRooms(mapped);
      })
      .catch(() => {
        // Keep fallback UI data if API fails
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Luxury Rooms at Dhaneshwari Hotel",
      "description": "Explore our collection of luxury rooms and suites at Dhaneshwari Hotel",
      "numberOfItems": rooms.length,
      "itemListElement": rooms.map((room, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": room.title,
          "description": room.desc,
          "offers": {
            "@type": "Offer",
            "price": room.price,
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock"
          }
        }
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
        <title>Luxury Rooms & Suites | Dhaneshwari Hotel Varanasi</title>
        <meta 
          name="description" 
          content="Experience luxury at Dhaneshwari Hotel with our Deluxe Rooms, Premium Rooms, and Family Suites. Book now for premium amenities, spacious interiors, and best rates." 
        />
        <meta 
          name="keywords" 
          content="Dhaneshwari Hotel rooms, luxury rooms Varanasi, Deluxe Room, Premium Room, Family Suite, hotel accommodation Varanasi" 
        />
        <link rel="canonical" href={typeof window !== "undefined" ? `${window.location.origin}/rooms` : "https://dhaneshwari.com/rooms"} />
        <meta property="og:title" content="Luxury Rooms & Suites | Dhaneshwari Hotel" />
        <meta property="og:description" content="Discover our luxurious rooms and suites at Dhaneshwari Hotel. Book now for an unforgettable stay experience." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <section className="w-full px-4 sm:px-6 lg:px-10 ">
        <div className="w-full py-10 sm:py-6 lg:py-5 rounded-2xl">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12 px-4">
            <h1 className="group relative inline-block text-2xl sm:text-3xl font-semibold text-gray-900 font-[Poppins] cursor-pointer">
              Our Luxury Rooms
              <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 h-0.5 w-12 bg-black transition-all duration-500 group-hover:w-full"></span>
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 pt-4 lg:gap-8 px-2 sm:px-2 lg:px-2">
            {rooms.map((room, i) => (
              <div
                key={room.id || i}
                className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={room.img}
                    className="h-48 sm:h-52 lg:h-56 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={getImageAlt(room)}
                    loading="lazy"
                    decoding="async"
                    data-seo-filename={getSeoFileName(room.title)}
                  />
                 
                </div>

                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <h2 className="mb-1 text-base sm:text-lg font-semibold text-gray-900">
                    {room.title}
                  </h2>
                  
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                    <span>{room.size}</span>
                    <span>•</span>
                    <span>{room.occupancy}</span>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">{room.desc}</p>

                 

                  <button
                    type="button"
                    onClick={() =>
                      navigate("/payment", {
                        state: buildQuickPaymentState({
                          name: room.title,
                          image: room.img,
                          pricePerNight: room.price,
                        }),
                      })
                    }
                    className="mt-4 sm:mt-6 w-max rounded-md bg-orange-500 px-5 py-2 text-sm font-medium text-white shadow transition-all duration-300 hover:bg-orange-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    aria-label={`Book ${room.title}`}
                  >
                    Book Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Rooms;