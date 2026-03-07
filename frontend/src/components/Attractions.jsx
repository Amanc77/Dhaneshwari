import { useState, useEffect, useRef } from "react";
import room1 from "../assets/Dhaneshwari Photoshoot/20250601_122955.jpg";
import room2 from "../assets/Dhaneshwari Photoshoot/20250601_122955.jpg";
import room3 from "../assets/Dhaneshwari Photoshoot/20250601_122955.jpg";

const attractions = [
  {
    id: 1,
    title: "Kashi Vishwanath",
    desc: "One of the most famous Hindu temples dedicated to Lord Shiva, located in the heart of Varanasi.",
    img: room1,
  },
  {
    id: 2,
    title: "Kal Bhairav Temple",
    desc: "Ancient temple dedicated to Kal Bhairav, the guardian deity of Varanasi, known for its unique rituals.",
    img: room2,
  },
  {
    id: 3,
    title: "Evening Ganga Aarti",
    desc: "Mesmerizing spiritual ceremony performed daily at Dashashwamedh Ghat with fire, smoke and chants.",
    img: room3,
  },
  {
    id: 4,
    title: "Sarnath",
    desc: "Sacred Buddhist site where Buddha gave his first sermon, featuring ancient stupas and museums.",
    img: room2,
  },
];

function Attractions() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const autoPlayRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const extendedAttractions = [
    ...attractions.slice(-itemsPerView),
    ...attractions,
    ...attractions.slice(0, itemsPerView),
  ];

  const totalSlides = attractions.length;
  const startIndex = itemsPerView;
  const [slideIndex, setSlideIndex] = useState(startIndex);

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
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
    resumeAutoPlay();
  };

  return (
    <section className="py-0 ">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Famous Attractions
          </h2>

        
        </div>

        <div
          className="relative group"
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
        >
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute left-0 top-0 z-10 h-full w-32"></div>
            <div className="absolute right-0 top-0 z-10 h-full w-32 "></div>

            <div
              className="flex transition-transform duration-500 ease-out cursor-grab active:cursor-grabbing"
              style={{
                transform: `translateX(-${
                  slideIndex * (100 / itemsPerView)
                }%)`,
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
                  <div className="group/card relative overflow-hidden rounded-2xl bg-white  transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-110"
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
                className="absolute -left-4 top-1/2 z-20 -translate-y-1/2 transform rounded-full bg-white p-4 shadow-xl transition-all duration-300 hover:scale-110 hover:bg-orange-500 hover:text-white focus:outline-none opacity-0 group-hover:opacity-100"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute -right-4 top-1/2 z-20 -translate-y-1/2 transform rounded-full bg-white p-4 shadow-xl transition-all duration-300 hover:scale-110 hover:bg-orange-500 hover:text-white focus:outline-none opacity-0 group-hover:opacity-100"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}
        </div>

        {attractions.length > itemsPerView && (
          <div className="mt-8 flex flex-col items-center space-y-4">
            <div className="flex space-x-3">
              {Array.from({ length: totalSlides }).map((_, i) => {
                const isActive =
                  (slideIndex - startIndex + totalSlides) % totalSlides === i;

                return (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={`group/dot relative transition-all duration-500 ${
                      isActive ? "scale-125" : "scale-100"
                    }`}
                  >
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        isActive
                          ? "w-12 bg-orange-400"
                          : "w-3 bg-orange-500 group-hover/dot:bg-orange-300"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

         
          </div>
        )}
      </div>
    </section>
  );
}

export default Attractions;