import { useState, useEffect, useRef } from "react";
import g1 from "../assets/Dhaneshwari Photoshoot/20250601_123036.jpg";
import g2 from "../assets/Dhaneshwari Photoshoot/20250601_123123.jpg";
import g3 from "../assets/Dhaneshwari Photoshoot/20250601_123123.jpg";
import g4 from "../assets/Dhaneshwari Photoshoot/20250601_123123.jpg";
import g5 from "../assets/Dhaneshwari Photoshoot/20250601_123123.jpg";

const images = [g1, g2, g3, g4, g5];

function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const autoPlayRef = useRef();
  
  const itemsPerView = 4;
  
  // Create infinite loop by duplicating images
  const extendedImages = [
    ...images.slice(-itemsPerView), // Last items for seamless backward scroll
    ...images,
    ...images.slice(0, itemsPerView) // First items for seamless forward scroll
  ];
  
  const totalSlides = images.length;
  const startIndex = itemsPerView; // Start from the first original image
  const [slideIndex, setSlideIndex] = useState(startIndex);

  // Handle transition end for infinite loop
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    
    // If we've scrolled past the original set, jump to the corresponding position
    if (slideIndex >= totalSlides + itemsPerView) {
      // Jump to beginning of original set
      setSlideIndex(startIndex);
    } else if (slideIndex < itemsPerView) {
      // Jump to end of original set
      setSlideIndex(totalSlides + itemsPerView - 1);
    }
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlideIndex(prev => prev + 1);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlideIndex(prev => prev - 1);
  };

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    // Adjust index to account for cloned slides
    setSlideIndex(startIndex + index);
  };

  // Auto-play functionality
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(autoPlayRef.current);
  }, []);

  // Pause auto-play on hover
  const pauseAutoPlay = () => clearInterval(autoPlayRef.current);
  const resumeAutoPlay = () => {
    clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 3000);
  };

  // Touch handlers for mobile swipe
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

  // Lightbox modal
  const Lightbox = () => {
    if (!selectedImage) return null;

    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={() => setSelectedImage(null)}
      >
        <button 
          className="absolute right-4 top-4 rounded-full  p-3 text-white transition-all hover:bg-white/20"
          onClick={() => setSelectedImage(null)}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/20"
          onClick={(e) => {
            e.stopPropagation();
            const currentImageIndex = images.findIndex(img => img === selectedImage);
            const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
            setSelectedImage(images[prevIndex]);
          }}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/20"
          onClick={(e) => {
            e.stopPropagation();
            const currentImageIndex = images.findIndex(img => img === selectedImage);
            const nextIndex = (currentImageIndex + 1) % images.length;
            setSelectedImage(images[nextIndex]);
          }}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <img 
          src={selectedImage} 
          alt="Gallery"
          className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
          onClick={(e) => e.stopPropagation()}
        />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white">
          {images.findIndex(img => img === selectedImage) + 1} / {images.length}
        </div>
      </div>
    );
  };

  // Calculate which images are currently visible
  const visibleStartIndex = slideIndex;
  const visibleImages = extendedImages.slice(visibleStartIndex, visibleStartIndex + itemsPerView);

  return (
    <>
      <section className="py-16 ">
        <div className="mx-auto max-w-7xl px-4">
          {/* Header with animated badge */}
          <div className="mb-12 text-center">
          
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Gallery</h2>
            <div className="flex items-center justify-center space-x-2">
              
            </div>
          </div>

          {/* Main carousel */}
          <div 
            className="relative group"
            onMouseEnter={pauseAutoPlay}
            onMouseLeave={resumeAutoPlay}
          >
            {/* Carousel container with shadow and rounded corners */}
            <div className="relative rounded-3xl   overflow-hidden">
              {/* Gradient overlays for smooth edges */}
              <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent"></div>
              <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent"></div>
              
              {/* Images container */}
              <div 
                className="flex transition-transform duration-500 ease-out cursor-grab active:cursor-grabbing"
                style={{ 
                  transform: `translateX(-${(slideIndex * (100 / itemsPerView))}%)`,
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
                    <div className="group/img relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl">
                      <img
                        src={img}
                        alt={`Gallery ${(index % images.length) + 1}`}
                        className="h-64 w-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                        onClick={() => setSelectedImage(img)}
                      />
                      
                      {/* Overlay with zoom icon */}
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover/img:opacity-100">
                        <button className="transform scale-0 rounded-full bg-white p-3 transition-all duration-300 group-hover/img:scale-100 hover:bg-blue-600 hover:text-white">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </button>
                      </div>

                     
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation buttons with animations */}
            {images.length > itemsPerView && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute -left-4 top-1/2 z-20 -translate-y-1/2 transform rounded-full bg-white p-4 shadow-xl transition-all duration-300 hover:scale-110 hover:bg-orange-500 hover:text-white focus:outline-none opacity-0 group-hover:opacity-100"
                  aria-label="Previous images"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute -right-4 top-1/2 z-20 -translate-y-1/2 transform rounded-full bg-white p-4 shadow-xl transition-all duration-300 hover:scale-110 hover:bg-orange-500 hover:text-white focus:outline-none opacity-0 group-hover:opacity-100"
                  aria-label="Next images"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Enhanced navigation dots with animation */}
          {images.length > itemsPerView && (
            <div className="mt-8 flex flex-col items-center space-y-4">
              <div className="flex space-x-3">
                {images.map((_, i) => {
                  const isActive = (slideIndex - startIndex + totalSlides) % totalSlides === i;
                  return (
                    <button
                      key={i}
                      onClick={() => goToSlide(i)}
                      className={`group/dot relative transition-all duration-500 ${
                        isActive ? 'scale-125' : 'scale-100'
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    >
                      <div className={`h-3 rounded-full transition-all duration-500 ${
                        isActive 
                          ? "w-12 bg-orange-400" 
                          : "w-3 bg-orange-500 group-hover/dot:bg-gray-400"
                      }`} />
                    
                    </button>
                  );
                })}
              </div>
              
              {/* Progress indicator */}
             
            </div>
          )}

          {/* View all button with hover effect */}
          {images.length > itemsPerView * 2 && (
            <div className="mt-10 text-center">
              <button className="group/btn inline-flex items-center space-x-3 rounded-full border-2 border-blue-600 bg-white px-8 py-3 text-sm font-medium text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-xl">
                <span>Explore Full Gallery</span>
                <svg className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Lightbox modal */}
      <Lightbox />
    </>
  );
}

export default Gallery;
