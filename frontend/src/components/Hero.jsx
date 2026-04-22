import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import hero from "../assets/Dhaneshwari Photoshoot/room77.jpeg";
import api from "../api/axios";

function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [heroContent, setHeroContent] = useState({
    title: "Welcome to Dhaneshwari",
    image: hero,
    buttonText: "Book Now",
    buttonLink: "/booking",
  });

  useEffect(() => {
    api
      .get("/slider")
      .then(({ data }) => {
        if (!Array.isArray(data) || data.length === 0) return;
        const active = data.find((slide) => slide.isActive !== false) || data[0];
        setHeroContent({
          title: active.title || "Welcome to Dhaneshwari",
          image: active.imageUrl || hero,
          buttonText: active.buttonText || "Book Now",
          buttonLink: active.buttonLink || "/booking",
        });
      })
      .catch(() => {
        // Keep fallback hero data when API fails
      });
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = heroContent.image;
    img.onload = () => setImageLoaded(true);
  }, [heroContent.image]);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Hotel",
      "name": "Dhaneshwari Hotel",
      "description": "Luxury hotel in Varanasi offering premium accommodations and world-class hospitality",
      "image": heroContent.image,
      "priceRange": "₹₹₹",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Varanasi",
        "addressRegion": "UP",
        "addressCountry": "IN"
      },
      "potentialAction": {
        "@type": "ReserveAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://dhaneshwari.com/booking",
          "inLanguage": "en",
          "actionPlatform": [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform"
          ]
        }
      }
    });
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <link rel="preload" as="image" href={hero} />
      
      <section className="relative h-[280px] sm:h-[380px] md:h-[450px] lg:h-[520px] w-full overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
        )}
        
        <img
          src={heroContent.image}
          alt="Dhaneshwari Hotel - Luxury accommodation in Varanasi with premium amenities and world-class hospitality"
          className={`h-full w-full object-cover scale-105 blur-[2px] brightness-75 transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 text-white px-4 lg:px-0">
          <h1 className="mb-4 sm:mb-6 lg:mb-8 text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wide drop-shadow-lg">
            {heroContent.title}
          </h1>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6">
            <Link
              to={heroContent.buttonLink}
              className="rounded-full bg-orange-600 px-6 py-3 sm:px-8 sm:py-3.5 lg:px-10 lg:py-4 text-center text-sm sm:text-base font-semibold text-white shadow-lg transition hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              {heroContent.buttonText}
            </Link>
            <button 
              className="rounded-full border border-white/70 px-6 py-3 sm:px-8 sm:py-3.5 lg:px-10 lg:py-4 text-sm sm:text-base font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              aria-label="Explore Services"
            >
              Explore Services
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;