import { useState, useEffect, useRef } from "react";

import g1 from "../assets/Dhaneshwari Photoshoot/roomwithTV.jpeg";
import g2 from "../assets/Dhaneshwari Photoshoot/room2.jpeg";
import g3 from "../assets/Dhaneshwari Photoshoot/room3.jpeg";
import g4 from "../assets/Dhaneshwari Photoshoot/room4.jpeg";
import g5 from "../assets/Dhaneshwari Photoshoot/room5.jpeg";
import g6 from "../assets/Dhaneshwari Photoshoot/astheticRoom.jpeg";
import g7 from "../assets/Dhaneshwari Photoshoot/boubleBedRoom.jpeg";
import g8 from "../assets/Dhaneshwari Photoshoot/Gallary1.jpg";
import g9 from "../assets/Dhaneshwari Photoshoot/room5.jpeg";
import g10 from "../assets/Dhaneshwari Photoshoot/roomBalloon2.jpg";
import g12 from "../assets/Dhaneshwari Photoshoot/Gallary3.jpg";

const images = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g12];

function Lightbox({ selectedImage, setSelectedImage, images }) {
  if (!selectedImage) return null;

  const currentIndex = images.findIndex((img) => img === selectedImage);

  const prevImage = (e) => {
    e.stopPropagation();
    const index = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[index]);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    const index = (currentIndex + 1) % images.length;
    setSelectedImage(images[index]);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={() => setSelectedImage(null)}
    >
      <button
        className="absolute right-4 top-4 text-white text-2xl"
        onClick={() => setSelectedImage(null)}
      >
        ✕
      </button>

      <button
        className="absolute left-6 top-1/2 -translate-y-1/2 text-white text-3xl"
        onClick={prevImage}
      >
        ‹
      </button>

      <img
        src={selectedImage}
        alt="Gallery"
        className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-3xl"
        onClick={nextImage}
      >
        ›
      </button>
    </div>
  );
}

function Gallery() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const autoPlayRef = useRef();

  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const extendedImages = [
    ...images.slice(-itemsPerView),
    ...images,
    ...images.slice(0, itemsPerView),
  ];

  const totalSlides = images.length;
  const startIndex = itemsPerView;
  const [slideIndex, setSlideIndex] = useState(startIndex);

  useEffect(() => {
    setSlideIndex(itemsPerView);
  }, [itemsPerView]);

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
    <>
      <section className="w-full px-4  sm:px-6 lg:px-10">
        <div className="w-full py-10 sm:py-8 lg:py-10 rounded-2xl">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12 px-4">
         <h2 className="group relative inline-block text-2xl sm:text-3xl font-semibold text-gray-900 font-[Poppins] cursor-pointer">
  Our Gallery
  <span className=" absolute left-1/2 -translate-x-1/2 -bottom-2 h-1/17 w-12 bg-black transition-all duration-500 group-hover:w-full"></span>
</h2>
        </div>

          <div
            className="relative group px-4 sm:px-6 lg:px-8"
            onMouseEnter={pauseAutoPlay}
            onMouseLeave={resumeAutoPlay}
          >
            <div className="relative rounded-3xl overflow-hidden">
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 sm:w-32 bg-gradient-to-r from-[#e4dbc9] to-transparent"></div>
              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 sm:w-32 bg-gradient-to-l from-[#e4dbc9] to-transparent"></div>

              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${slideIndex * (100 / itemsPerView)}%)`,
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onTransitionEnd={handleTransitionEnd}
              >
                {extendedImages.map((img, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 px-2"
                    style={{ width: `${100 / itemsPerView}%` }}
                  >
                    <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition">
                      <img
                        src={img}
                        alt={`Gallery ${(index % images.length) + 1}`}
                        className="h-64 w-full object-cover transition-transform duration-700 hover:scale-110"
                        onClick={() => setSelectedImage(img)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {images.length > itemsPerView && (
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

          {images.length > itemsPerView && (
            <div className="mt-8 flex justify-center space-x-3">
              {images.map((_, i) => {
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

      <Lightbox
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        images={images}
      />
    </>
  );
}

export default Gallery;