import { useState, useEffect, useRef } from "react";

import image1 from "../assets/Dhaneshwari Photoshoot/Kashi-Vishwanath.webp";
import image2 from "../assets/Dhaneshwari Photoshoot/kalBharavTemple.webp";
import image3 from "../assets/Dhaneshwari Photoshoot/eveningArati.webp";
import image4 from "../assets/Dhaneshwari Photoshoot/manikarnika_Ghat.webp";
import image5 from "../assets/Dhaneshwari Photoshoot/Bundri_Ghat.jpg";
import image6 from "../assets/Dhaneshwari Photoshoot/KashiDham.jpg";

const attractions = [
  {
    title: "Kal Bhairav Temple",
    desc: "Ancient temple known as the guardian of Kashi",
    distance: "100 mtrs ",
    img: image2,
  },

  {
    title: "Manikarnika Ghat",
    desc: "Sacred cremation ghat on the banks of Ganga",
    distance: "200 mtrs",
    img: image4,
  },
  {
    title: "Kashi Dham Museum",
    desc: "Museum showcasing the rich cultural heritage of Kashi",
    distance: "100 mtrs",
    img: image6,
  },
  {
    title: "Bundri Patoka Ghat",
    desc: "Historic ghat known for its spiritual significance",
    distance: "100 mtrs",
    img: image5,
  },
  {
    title: "Dhanvantri Koop",
    desc: "Sacred well associated with the god of Ayurveda",
    distance: "250 mtrs",
    img: image1,
  },
  {
    title: "Chandra Koop",
    desc: "Ancient well with mythological significance",
    distance: "200 mtrs",
    img: image1,
  },
  {
    title: "Evening Ganga Aarti",
    desc: "Spiritual evening ritual on the holy Ganga ghats",
    distance: "900 mtrs",
    img: image3,
  },
  {
    title: "Kashi Vishwanath Temple",
    desc: "Sacred temple dedicated to Lord Shiva in Varanasi",
    distance: "800 mtrs",
    img: image1,
  },
];

function Attractions() {
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const autoPlayRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = attractions.length;
  const startIndex = itemsPerView;
  const [slideIndex, setSlideIndex] = useState(startIndex);

  useEffect(() => {
    setSlideIndex(itemsPerView);
  }, [itemsPerView]);

  const extendedAttractions = [
    ...attractions.slice(-itemsPerView),
    ...attractions,
    ...attractions.slice(0, itemsPerView),
  ];

  const handleTransitionEnd = () => {
    setIsTransitioning(false);

    if (slideIndex >= totalSlides + itemsPerView) {
      setSlideIndex(startIndex);
    } else if (slideIndex < itemsPerView) {
      setSlideIndex(totalSlides + itemsPerView - 1);
    }
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlideIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlideIndex((prev) => prev - 1);
  };

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlideIndex(startIndex + index);
  };

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(autoPlayRef.current);
  }, []);

  const pauseAutoPlay = () => clearInterval(autoPlayRef.current);

  const resumeAutoPlay = () => {
    clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 3000);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    pauseAutoPlay();
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;

    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();

    setTouchStart(null);
    setTouchEnd(null);
    resumeAutoPlay();
  };

  // Function to get distance color
  const getDistanceColor = (distance) => {
    const value = parseInt(distance);
    if (value <= 100) return "bg-green-500";
    if (value <= 200) return "bg-yellow-500";
    if (value <= 500) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <section className="w-full  px-4 sm:px-6 lg:px-10">
      <div className="w-full py-10 sm:py-6 lg:py-8 rounded-2xl">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 px-4">
          <h2 className="group relative inline-block text-2xl sm:text-3xl font-semibold text-gray-900 font-[Poppins] cursor-pointer">
            Famous Attractions
            <span className=" absolute left-1/2 -translate-x-1/2 -bottom-2 h-1 w-12 bg-black transition-all duration-500 group-hover:w-full"></span>
          </h2>
        </div>

        <div
          className="relative group px-4 sm:px-6 lg:px-8"
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
        >
          <div className="relative rounded-3xl overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out cursor-grab active:cursor-grabbing"
              style={{
                transform: `translateX(-${slideIndex * (100 / itemsPerView)}%)`,
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedAttractions.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-2"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="group/card relative overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                    {/* Distance Badge - Top Right */}

                    <div className="relative w-full aspect-[16/10] overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                      />
                      {/* Gradient Overlay for better badge visibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover/card:text-orange-500 transition-colors">
                          {item.title}
                        </h3>

                        <div className="flex items-center gap-1 text-green-600">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span className="text-sm font-medium">
                            {item.distance}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 line-clamp-2">
                        {item.desc}
                      </p>

                      <button className="mt-3 text-sm font-medium text-orange-500 opacity-0 transition-all duration-300 group-hover/card:opacity-100 hover:translate-x-1 inline-flex items-center">
                        Learn more
                        <svg
                          className="h-4 w-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="absolute top-0 right-0 h-16 w-16 -translate-y-8 translate-x-8 bg-orange-500/10 rounded-full transition-transform group-hover/card:scale-150"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {attractions.length > itemsPerView && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-30 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white shadow-lg hover:bg-orange-500 hover:text-white transition"
              >
                ‹
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-30 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white shadow-lg hover:bg-orange-500 hover:text-white transition"
              >
                ›
              </button>
            </>
          )}
        </div>

        {attractions.length > itemsPerView && (
          <div className="mt-8 flex justify-center space-x-3">
            {Array.from({ length: totalSlides }).map((_, i) => {
              const isActive =
                (slideIndex - startIndex + totalSlides) % totalSlides === i;

              return (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`h-3 rounded-full transition-all duration-500 ${
                    isActive ? "w-12 bg-orange-400" : "w-3 bg-orange-500"
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Attractions;
