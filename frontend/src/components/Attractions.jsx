import { useState, useEffect, useRef } from "react";

import image1 from "../assets/Dhaneshwari Photoshoot/Kashi-Vishwanath.webp";
import image2 from "../assets/Dhaneshwari Photoshoot/kalBharavTemple.webp";
import image3 from "../assets/Dhaneshwari Photoshoot/eveningArati.webp";
import image4 from "../assets/Dhaneshwari Photoshoot/roomwithChaire.jpeg";

const attractions = [
  {
    title: "Kashi Vishwanath",
    desc: "Sacred temple dedicated to Lord Shiva in Varanasi.",
    img: image1,
  },
  {
    title: "Kal Bhairav Temple",
    desc: "Ancient temple known as the guardian of Kashi.",
    img: image2,
  },
  {
    title: "Evening Ganga Aarti",
    desc: "Spiritual evening ritual on the holy Ganga ghats.",
    img: image3,
  },
  {
    title: "Premium Room",
    desc: "Comfortable room with modern design and amenities.",
    img: image4,
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

  return (
    <section className="py-10 sm:py-12 lg:py-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 sm:mb-12 lg:mb-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Famous Attractions
          </h2>
        </div>

        <div
          className="relative group"
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
                    {/* IMAGE FULL WIDTH */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                      />
                    </div>

                    <div className="p-5">
                      <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover/card:text-orange-500 transition-colors">
                        {item.title}
                      </h3>

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

                    <div className="absolute top-0 right-0 h-16 w-16 -translate-y-8 translate-x-8 transform bg-orange-500/10 rounded-full transition-transform group-hover/card:scale-150"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {attractions.length > itemsPerView && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 sm:-left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white p-2 sm:p-4 shadow-xl hover:scale-110 hover:bg-orange-500 hover:text-white opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                aria-label="Previous"
              >
                ‹
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-2 sm:-right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white p-2 sm:p-4 shadow-xl hover:scale-110 hover:bg-orange-500 hover:text-white opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                aria-label="Next"
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
