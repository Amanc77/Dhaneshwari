import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import {
  galleryNearbyImages,
  galleryRoomsImages,
} from "../data/galleryImages.js";

const images = [...galleryRoomsImages, ...galleryNearbyImages];

// Enhanced Lightbox with keyboard navigation and image counter
function Lightbox({ selectedImage, setSelectedImage, images }) {
  if (!selectedImage) return null;

  const currentIndex = images.findIndex((img) => img === selectedImage);
  const totalImages = images.length;

  const prevImage = useCallback((e) => {
    e?.stopPropagation();
    const index = (currentIndex - 1 + totalImages) % totalImages;
    setSelectedImage(images[index]);
  }, [currentIndex, totalImages, setSelectedImage, images]);

  const nextImage = useCallback((e) => {
    e?.stopPropagation();
    const index = (currentIndex + 1) % totalImages;
    setSelectedImage(images[index]);
  }, [currentIndex, totalImages, setSelectedImage, images]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevImage, nextImage, setSelectedImage]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={() => setSelectedImage(null)}
    >
      <button
        className="absolute right-4 top-4 text-white text-2xl hover:scale-110 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200"
        onClick={() => setSelectedImage(null)}
        aria-label="Close lightbox"
      >
        ✕
      </button>

      <button
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-white text-3xl hover:scale-110 hover:bg-white/20 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200"
        onClick={prevImage}
        aria-label="Previous image"
      >
        ‹
      </button>

      <img
        src={selectedImage}
        alt=""
        loading="lazy"
        decoding="async"
        className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
        {currentIndex + 1} / {totalImages}
      </div>

      <button
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-white text-3xl hover:scale-110 hover:bg-white/20 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200"
        onClick={nextImage}
        aria-label="Next image"
      >
        ›
      </button>
    </div>
  );
}

function GalleryCarousel({ label = "Gallery", images }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef(null);
  const [itemsPerView, setItemsPerView] = useState(4);

  // Responsive items per view with debounce
  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (window.innerWidth < 640) setItemsPerView(1);
        else if (window.innerWidth < 1024) setItemsPerView(2);
        else setItemsPerView(4);
      }, 100);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const length = images?.length ?? 0;
  const effectiveItemsPerView = Math.min(itemsPerView, Math.max(length, 1));
  const shouldCarousel = length > effectiveItemsPerView;
  const totalSlides = length;
  const startIndex = effectiveItemsPerView;
  const [slideIndex, setSlideIndex] = useState(startIndex);

  useEffect(() => {
    setSlideIndex(effectiveItemsPerView);
  }, [effectiveItemsPerView]);

  const extendedImages = useMemo(() => {
    if (!shouldCarousel || length === 0) return [];
    return [
      ...images.slice(-effectiveItemsPerView),
      ...images,
      ...images.slice(0, effectiveItemsPerView),
    ];
  }, [shouldCarousel, images, effectiveItemsPerView, length]);

  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false);
    if (!shouldCarousel || totalSlides === 0) return;
    setSlideIndex((current) => {
      if (current >= totalSlides + effectiveItemsPerView) return startIndex;
      if (current < effectiveItemsPerView) {
        return totalSlides + effectiveItemsPerView - 1;
      }
      return current;
    });
  }, [shouldCarousel, totalSlides, effectiveItemsPerView, startIndex]);

  const nextSlide = useCallback(() => {
    if (!shouldCarousel || isTransitioning) return;
    setIsTransitioning(true);
    setSlideIndex((prev) => prev + 1);
  }, [shouldCarousel, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (!shouldCarousel || isTransitioning) return;
    setIsTransitioning(true);
    setSlideIndex((prev) => prev - 1);
  }, [shouldCarousel, isTransitioning]);

  const goToSlide = useCallback((index) => {
    if (!shouldCarousel || isTransitioning) return;
    setIsTransitioning(true);
    setSlideIndex(startIndex + index);
  }, [shouldCarousel, isTransitioning, startIndex]);

  // Auto-play with pause functionality
  useEffect(() => {
    if (!shouldCarousel || totalSlides === 0 || isPaused) return;

    autoPlayRef.current = setInterval(() => {
      setSlideIndex((prev) => prev + 1);
    }, 4000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [shouldCarousel, totalSlides, isPaused]);

  const pauseAutoPlay = useCallback(() => {
    setIsPaused(true);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  const resumeAutoPlay = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Touch handlers
  const handleTouchStart = useCallback((e) => {
    setTouchStart(e.targetTouches[0].clientX);
    pauseAutoPlay();
  }, [pauseAutoPlay]);

  const handleTouchMove = useCallback((e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) {
      resumeAutoPlay();
      return;
    }

    const distance = touchStart - touchEnd;
    if (Math.abs(distance) > 50) {
      if (distance > 50) nextSlide();
      else prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
    setTimeout(resumeAutoPlay, 3000);
  }, [touchStart, touchEnd, nextSlide, prevSlide, resumeAutoPlay]);

  if (!length) return null;

  // Non-carousel layout for few images
  if (!shouldCarousel) {
    return (
      <>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((img, idx) => (
            <button
              key={`${label}-${idx}`}
              onClick={() => setSelectedImage(img)}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label={`View image ${idx + 1}`}
            >
              <img
                src={img}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-110 sm:h-64"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                View
              </div>
            </button>
          ))}
        </div>

        <Lightbox
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          images={images}
        />
      </>
    );
  }

  return (
    <>
      <div
        className="relative group"
        onMouseEnter={pauseAutoPlay}
        onMouseLeave={resumeAutoPlay}
      >
        <div className="relative rounded-3xl overflow-hidden">
         
          <div
            className="flex pt-4 transition-transform duration-500 ease-out will-change-transform"
            style={{
              transform: `translateX(-${
                slideIndex * (100 / effectiveItemsPerView)
              }%)`,
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedImages.map((img, index) => (
              <div
                key={`${img}-${index}`}
                className="flex-shrink-0 px-2"
                style={{ width: `${100 / effectiveItemsPerView}%` }}
              >
                <button
                  onClick={() => setSelectedImage(img)}
                  className="group relative w-full overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  aria-label={`View image ${(index % images.length) + 1}`}
                >
                  <img
                    src={img}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-56 sm:h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/90 shadow-lg hover:bg-orange-500 hover:text-white transition-all duration-300 backdrop-blur-sm"
          aria-label="Previous images"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/90 shadow-lg hover:bg-orange-500 hover:text-white transition-all duration-300 backdrop-blur-sm"
          aria-label="Next images"
        >
          ›
        </button>

        
      </div>

      <div className="mt-6 flex justify-center space-x-2 sm:space-x-3">
        {images.map((_, i) => {
          const isActive =
            (slideIndex - startIndex + totalSlides) % totalSlides === i;

          return (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                isActive
                  ? "w-6 sm:w-8 bg-orange-500"
                  : "w-2 bg-orange-500 hover:bg-orange-300"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          );
        })}
      </div>

      <Lightbox
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        images={images}
      />
    </>
  );
}

function Gallery() {
  
  const stats = {
    total: images.length,
    rooms: galleryRoomsImages.length,
    nearby: galleryNearbyImages.length,
  };

  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Dhaneshwari Hotel Gallery",
    "description": "Explore the beautiful gallery of Dhaneshwari Hotel featuring luxurious rooms, premium amenities, and nearby attractions in Varanasi.",
    "url": typeof window !== "undefined" ? window.location.href : "",
    "numberOfItems": stats.total,
    "image": images.slice(0, 10).map(img => ({
      "@type": "ImageObject",
      "contentUrl": img,
      "name": "Dhaneshwari Hotel Gallery Image",
      "description": "Premium accommodation and amenities at Dhaneshwari Hotel"
    }))
  };

  return (
    <>
      <Helmet>
        <title>Gallery | Dhaneshwari Hotel - Luxury Rooms & Nearby Attractions</title>
        <meta
          name="description"
          content="Explore the stunning gallery of Dhaneshwari Hotel in Varanasi. View our luxurious rooms, premium interiors, and nearby attractions. Experience world-class hospitality."
        />
        <meta
          name="keywords"
          content="Dhaneshwari Hotel Gallery, Luxury Hotel Varanasi, Hotel Rooms, Nearby Attractions, Hotel Interiors, Premium Accommodation"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : "https://dhaneshwari.com/gallery"} />
        <meta property="og:title" content="Gallery | Dhaneshwari Hotel - Luxury Living" />
        <meta property="og:description" content="Explore our beautiful gallery featuring luxurious rooms and premium amenities." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={images[0]} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        
        <script type="application/ld+json">
          {JSON.stringify(gallerySchema)}
        </script>
      </Helmet>

     <section className="w-full px-4 sm:px-6 lg:px-10 pt-8">
      <div className="w-full py-10 sm:py-6 lg:py-5  rounded-2xl">
          
          <div className="text-center mb-8 sm:mb-10 lg:mb-12 px-4">
            <h1 className="group relative inline-block text-2xl sm:text-3xl font-semibold text-gray-900 font-[Poppins] cursor-pointer">
              Gallery
              <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 h-1 w-12 bg-black transition-all duration-500 group-hover:w-full"></span>
            </h1>
          </div>

        <GalleryCarousel label="Gallery" images={images} />
        </div>
       
      </section>
    </>
  );
}

export default Gallery;