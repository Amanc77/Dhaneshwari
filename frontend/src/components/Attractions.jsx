import { useState, useEffect } from "react";
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
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

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
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalGroups = Math.ceil(attractions.length / itemsPerView);
  const maxIndex = Math.max(attractions.length - itemsPerView, 0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + itemsPerView;
      return nextIndex >= attractions.length ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const prevIndexCalc = prevIndex - itemsPerView;
      return prevIndexCalc < 0 ? maxIndex : prevIndexCalc;
    });
  };

  const goToGroup = (groupIndex) => {
    setCurrentIndex(groupIndex * itemsPerView);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
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
  };

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl text-center px-4">

        <div className="mb-9 items-center text-center justify-between">
          <h2 className="text-3xl font-semibold text-center text-gray-900">
            Famous Attractions
          </h2>
        </div>

        <div className="relative">

          <div
            className="overflow-hidden rounded-2xl py-8"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${(currentIndex / itemsPerView) * 100}%)` }}
            >
              {attractions.map((item) => (
                <div
                  key={item.id}
                  className="min-w-0 px-3"
                  style={{ flex: `0 0 ${100 / itemsPerView}%` }}
                >
                  <div className="group h-full overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">

                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="p-5">
                      <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-600 line-clamp-2">
                        {item.desc}
                      </p>

                      <button className="mt-3 text-sm font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                        Learn more →
                      </button>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {attractions.length > itemsPerView && (
            <>
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className={`absolute -left-4 top-1/2 hidden -translate-y-1/2 transform rounded-full bg-white p-3 shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl focus:outline-none sm:block ${currentIndex === 0 ? 'cursor-not-allowed opacity-50' : 'opacity-100'}`}
              >
                ‹
              </button>

              <button
                onClick={nextSlide}
                disabled={currentIndex >= maxIndex}
                className={`absolute -right-4 top-1/2 hidden -translate-y-1/2 transform rounded-full bg-white p-3 shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl focus:outline-none sm:block ${currentIndex >= maxIndex ? 'cursor-not-allowed opacity-50' : 'opacity-100'}`}
              >
                ›
              </button>
            </>
          )}
        </div>

        {attractions.length > itemsPerView && (
          <div className="mt-8 flex flex-col items-center space-y-3">
            <div className="flex space-x-2">
              {Array.from({ length: totalGroups }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToGroup(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${Math.floor(currentIndex / itemsPerView) === i ? "w-8 bg-blue-600" : "w-2.5 bg-gray-300 hover:bg-gray-400"}`}
                />
              ))}
            </div>

            <span className="text-xs text-gray-400 sm:hidden">
              ← Swipe to navigate →
            </span>
          </div>
        )}

      </div>
    </section>
  );
}

export default Attractions;