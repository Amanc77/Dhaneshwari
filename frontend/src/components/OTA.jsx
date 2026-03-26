import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const OTASection = () => {
  const platforms = [
    {
      id: 1,
      name: "MakeMyTrip",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 13c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z" />
        </svg>
      ),
      color: "text-red-500",
      bgColor: "bg-blue-50 group-hover:bg-blue-100",
      borderColor: "border-blue-200 group-hover:border-blue-300",
      url: "https://www.makemytrip.com/hotels/dhaneshwari_luxury_homestay-details-varanasi.html",
      rating: 4.5,
      reviews: 1240,
      features: "Free Cancellation • Instant Confirmation"
    },
    {
      id: 2,
      name: "Agoda",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
      ),
      color: "text-purple-600",
      bgColor: "bg-purple-50 group-hover:bg-purple-100",
      borderColor: "border-purple-200 group-hover:border-purple-300",
      url: "https://www.agoda.com/en-in/dhaneshwari-luxury-homestay/hotel/varanasi-in.html?cid=-310&ds=g02IhGn7y7JHzt7q",
      rating: 4.7,
      reviews: 2150,
      features: "VIP Access • Best Price Guarantee"
    },
    {
      id: 3,
      name: "Airbnb.com",
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 13c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z" />
        </svg>
      ),
      color: "text-green-700",
      bgColor: "bg-blue-50 group-hover:bg-blue-100",
      borderColor: "border-blue-200 group-hover:border-blue-300",
      url: "https://www.airbnb.co.in/rooms/1445081925613736894?source_impression_id=p3_1774512782_P3cKhNGQNgKGuHYn",
      rating: 4.8,
      reviews: 3250,
      features: "Genius Member Benefits • Free WiFi"
    }
  ];

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Booking Platforms for Dhaneshwari Hotel",
      "description": "Book your stay at Dhaneshwari Hotel through these trusted online travel agencies",
      "numberOfItems": platforms.length,
      "itemListElement": platforms.map((platform, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": platform.name,
        "url": platform.url,
        "description": `Book Dhaneshwari Hotel on ${platform.name} with ${platform.features}`
      }))
    });
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleRedirect = (url, platformName) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Helmet>
        <title>Book Your Stay | Dhaneshwari Hotel - Best Rates on MakeMyTrip, Agoda & Airbnb</title>
        <meta 
          name="description" 
          content="Book your luxury stay at Dhaneshwari Hotel through top booking platforms. Compare rates on MakeMyTrip, Agoda, and Airbnb. Best price guaranteed with instant confirmation." 
        />
        <meta 
          name="keywords" 
          content="Dhaneshwari Hotel booking, MakeMyTrip Dhaneshwari, Agoda Dhaneshwari, Airbnb Varanasi, hotel booking platforms, luxury hotel Varanasi" 
        />
        <link rel="canonical" href={typeof window !== "undefined" ? `${window.location.origin}/booking` : "https://dhaneshwari.com/booking"} />
        <meta property="og:title" content="Book Your Stay at Dhaneshwari Hotel - Best Rates Guaranteed" />
        <meta property="og:description" content="Find the best rates for Dhaneshwari Hotel on MakeMyTrip, Agoda, and Airbnb. Book now for instant confirmation and exclusive deals." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

       <section className="w-full px-4 sm:px-12 lg:px-8 pt-8">
      <div className="w-full py-10 sm:py-6 lg:py-5  rounded-2xl">
          
          <div className="text-center mb-8 sm:mb-10 lg:mb-12 px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Book Your Stay
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {platforms.map((platform) => (
              <div
                key={platform.id}
                className="group bg-white border-2 border-gray-100 rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
                onClick={() => handleRedirect(platform.url, platform.name)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleRedirect(platform.url, platform.name);
                  }
                }}
                aria-label={`Book Dhaneshwari Hotel on ${platform.name}`}
              >
                <div className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${platform.bgColor} mb-5 transition-all duration-300 group-hover:scale-110`}>
                    <div className={platform.color}>
                      {platform.icon}
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {platform.name}
                  </h2>
                  
                  
                  
                 
                  
                  <button
                    className={`w-full py-2.5 mt-4 pt-2 px-4 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRedirect(platform.url, platform.name);
                    }}
                    aria-label={`Book on ${platform.name}`}
                  >
                    Visit Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OTASection;