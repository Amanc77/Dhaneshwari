import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";

import image1 from "../assets/Dhaneshwari Photoshoot/Kashi-Vishwanath.webp";
import image2 from "../assets/Dhaneshwari Photoshoot/kalBharavTemple.webp";
import image3 from "../assets/Dhaneshwari Photoshoot/eveningArati.webp";
import image4 from "../assets/Dhaneshwari Photoshoot/manikarnika_Ghat.webp";
import image5 from "../assets/Dhaneshwari Photoshoot/Bundri_Ghat.jpg";
import image6 from "../assets/Dhaneshwari Photoshoot/KashiDham.jpg";

const attractions = [
  {
    id: 1,
    title: "Kal Bhairav Temple",
    desc: "Ancient temple known as the guardian of Kashi, one of the most revered temples in Varanasi",
    distance: "100 mtrs",
    img: image2,
    seo: {
      alt: "Kal Bhairav Temple Varanasi - Ancient guardian temple of Kashi",
      filename: "kal-bhairav-temple-varanasi"
    }
  },
  {
    id: 2,
    title: "Manikarnika Ghat",
    desc: "Sacred cremation ghat on the banks of Ganga, one of the holiest ghats in Varanasi",
    distance: "200 mtrs",
    img: image4,
    seo: {
      alt: "Manikarnika Ghat Varanasi - Sacred cremation ghat on Ganga river",
      filename: "manikarnika-ghat-varanasi"
    }
  },
  {
    id: 3,
    title: "Kashi Dham Museum",
    desc: "Museum showcasing the rich cultural heritage of Kashi with ancient artifacts and exhibits",
    distance: "100 mtrs",
    img: image6,
    seo: {
      alt: "Kashi Dham Museum Varanasi - Cultural heritage museum",
      filename: "kashi-dham-museum-varanasi"
    }
  },
  {
    id: 4,
    title: "Bundri Patoka Ghat",
    desc: "Historic ghat known for its spiritual significance and serene atmosphere",
    distance: "100 mtrs",
    img: image5,
    seo: {
      alt: "Bundri Patoka Ghat Varanasi - Historic spiritual ghat",
      filename: "bundri-patoka-ghat-varanasi"
    }
  },
  {
    id: 5,
    title: "Dhanvantri Koop",
    desc: "Sacred well associated with the god of Ayurveda, known for its healing properties",
    distance: "250 mtrs",
    img: image1,
    seo: {
      alt: "Dhanvantri Koop Varanasi - Sacred Ayurvedic well",
      filename: "dhanvantri-koop-varanasi"
    }
  },
  {
    id: 6,
    title: "Chandra Koop",
    desc: "Ancient well with mythological significance and historical importance",
    distance: "200 mtrs",
    img: image1,
    seo: {
      alt: "Chandra Koop Varanasi - Ancient mythological well",
      filename: "chandra-koop-varanasi"
    }
  },
  {
    id: 7,
    title: "Evening Ganga Aarti",
    desc: "Spiritual evening ritual on the holy Ganga ghats with lamps and chanting",
    distance: "900 mtrs",
    img: image3,
    seo: {
      alt: "Evening Ganga Aarti Varanasi - Spiritual river ceremony",
      filename: "evening-ganga-aarti-varanasi"
    }
  },
  {
    id: 8,
    title: "Kashi Vishwanath Temple",
    desc: "Sacred temple dedicated to Lord Shiva in Varanasi, one of the twelve Jyotirlingas",
    distance: "800 mtrs",
    img: image1,
    seo: {
      alt: "Kashi Vishwanath Temple Varanasi - Sacred Jyotirlinga temple",
      filename: "kashi-vishwanath-temple-varanasi"
    }
  }
];

function Attractions() {
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const autoPlayRef = useRef();
  const sectionRef = useRef(null);

  // Schema markup for local attractions
  const attractionsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Famous Attractions Near Our Hotel in Varanasi",
    "description": "Explore the top tourist attractions and sacred sites near our hotel in Varanasi, including temples, ghats, and cultural landmarks.",
    "numberOfItems": attractions.length,
    "itemListElement": attractions.map((attraction, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "TouristAttraction",
        "name": attraction.title,
        "description": attraction.desc,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Varanasi",
          "addressRegion": "Uttar Pradesh",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "25.3176",
          "longitude": "82.9739"
        }
      }
    }))
  };

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
    }, 5000); // Increased to 5 seconds for better UX

    return () => clearInterval(autoPlayRef.current);
  }, []);

  const pauseAutoPlay = () => clearInterval(autoPlayRef.current);

  const resumeAutoPlay = () => {
    clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
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
      <Helmet>
        <title>Famous Attractions Near Our Hotel | Temples & Ghats in Varanasi</title>
        <meta 
          name="description" 
          content="Discover famous attractions near our hotel in Varanasi including Kashi Vishwanath Temple, Manikarnika Ghat, Kal Bhairav Temple, and Evening Ganga Aarti. All within walking distance." 
        />
        <meta 
          name="keywords" 
          content="Varanasi attractions, Kashi Vishwanath Temple, Manikarnika Ghat, Kal Bhairav Temple, Ganga Aarti, tourist places in Varanasi, temples near hotel" 
        />
        <meta name="author" content="Dhaneshwari Hotel" />
        <link rel="canonical" href="https://yourwebsite.com/attractions" />
        
        <meta property="og:title" content="Famous Attractions Near Our Hotel | Temples & Ghats in Varanasi" />
        <meta property="og:description" content="Explore sacred temples, historic ghats, and cultural landmarks within walking distance of our hotel in Varanasi." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/attractions" />
        <meta property="og:image" content={image1} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Famous Attractions Near Our Hotel | Temples & Ghats in Varanasi" />
        <meta name="twitter:description" content="Discover sacred temples and historic ghats near our hotel in Varanasi." />
        <meta name="twitter:image" content={image1} />
        
        <script type="application/ld+json">
          {JSON.stringify(attractionsSchema)}
        </script>
      </Helmet>

      <section 
        ref={sectionRef}
        className="w-full px-4 sm:px-6 lg:px-10"
        aria-label="Nearby Attractions Section"
        itemScope
        itemType="https://schema.org/ItemList"
      >
        <div className="w-full py-10 sm:py-6 lg:py-8 rounded-2xl">
          
          <div className="text-center mb-8 sm:mb-10 lg:mb-12 px-4">
            <h1 className="group relative inline-block text-2xl sm:text-3xl font-semibold text-gray-900 font-[Poppins] cursor-pointer">
              Famous Attractions 
              <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 h-1 w-12 bg-black transition-all duration-500 group-hover:w-full"></span>
            </h1>
          </div>

          <div
            className="relative group  py-4 sm:px-4 lg:px-2"
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
                role="region"
                aria-label="Attractions carousel"
              >
                {extendedAttractions.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex-shrink-0 px-2"
                    style={{ width: `${100 / itemsPerView}%` }}
                    itemScope
                    itemType="https://schema.org/TouristAttraction"
                  >
                    <div className="group/card relative overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                      <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
                       
                        <img
                          src={item.img}
                          alt=""
                          title={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/400x250?text=Attraction+Image';
                          }}
                        />
                        
                        <meta itemProp="image" content={item.img} />
                        
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                        
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-md">
                          <div className="flex items-center gap-1 text-green-600">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
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
                            <span className="text-xs font-medium">
                              {item.distance}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 
                          className="text-lg font-semibold text-gray-900 group-hover/card:text-orange-500 transition-colors"
                          itemProp="name"
                        >
                          {item.title}
                        </h3>

                        <p 
                          className="text-sm text-gray-600 line-clamp-2 mt-2"
                          itemProp="description"
                        >
                          {item.desc}
                        </p>

                        <button 
                          className="mt-3 text-sm font-medium text-orange-500 opacity-0 transition-all duration-300 group-hover/card:opacity-100 hover:translate-x-1 inline-flex items-center"
                          aria-label={`Learn more about ${item.title}`}
                          onClick={() => {
           
                            console.log(`Attraction clicked: ${item.title}`);
                          }}
                        >
                          Learn more
                          <svg
                            className="h-4 w-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
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

                      <div className="absolute top-0 right-0 h-16 w-16 -translate-y-8 translate-x-8  rounded-full transition-transform group-hover/card:scale-150"></div>
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
                  aria-label="Previous attractions"
                >
                  ‹
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-30 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white shadow-lg hover:bg-orange-500 hover:text-white transition"
                  aria-label="Next attractions"
                >
                  ›
                </button>
              </>
            )}
          </div>

          {attractions.length > itemsPerView && (
            <div className="mt-8 flex justify-center space-x-3" role="tablist" aria-label="Attractions carousel navigation">
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
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Go to attraction ${i + 1}`}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Attractions;