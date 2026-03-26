import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

function Testimonials() {
  const reviews = [
    {
      id: 1,
      title: "Exceptional Stay & Service",
      text: "I loved everything about this hotel, from room types, customer service, specially house keeping was on top level and facilities to the serene pool area and gym facility. I will recommend others for sure.",
      author: "Mr. Satish K",
      meta: "Business Trip • 3 Nights",
      rating: 5,
      date: "March 2024"
    },
    {
      id: 2,
      title: "Warm, Welcoming & Comfortable",
      text: "Wonderful stay at Dhaneshwari Guestline – highly recommend! The staff was exceptionally welcoming and went out of their way to ensure I had a comfortable stay from start to finish.",
      author: "Mr. Pavan Dahale",
      meta: "Solo Traveller • Weekend",
      rating: 5,
      date: "February 2024"
    },
    {
      id: 3,
      title: "Professional Staff & Prime Location",
      text: "Wonderful experience. The staff was very helpful and professional. Rooms are well maintained and the hotel is in a prime location, close to major temples and attractions.",
      author: "Mr. Anand",
      meta: "Family Visit • 2 Nights",
      rating: 4,
      date: "January 2024"
    },
    {
      id: 4,
      title: "Feels Like A Second Home",
      text: "Amazing service and great hospitality. The team made us feel at home and helped us with local guidance and temple visits. We will definitely visit again.",
      author: "Mr. Rahul",
      meta: "Family Trip • 4 Nights",
      rating: 5,
      date: "December 2023"
    },
  ];

  const [index, setIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerView(1);
      else setItemsPerView(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const next = () => {
    setIndex((prev) => (prev + 1) % reviews.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const getVisibleReviews = () => {
    const visible = [];
    for (let i = 0; i < itemsPerView; i++) {
      visible.push(reviews[(index + i) % reviews.length]);
    }
    return visible;
  };

  const visibleReviews = getVisibleReviews();

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % reviews.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length]);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Dhaneshwari Hotel",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.8,
        "reviewCount": reviews.length,
        "bestRating": 5,
        "worstRating": 1
      },
      "review": reviews.map(review => ({
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": review.rating,
          "bestRating": 5
        },
        "author": {
          "@type": "Person",
          "name": review.author
        },
        "reviewBody": review.text,
        "name": review.title
      }))
    });
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5 mb-2">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < rating ? "text-yellow-500 fill-current" : "text-gray-300 fill-current"}`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Guest Reviews & Testimonials | Dhaneshwari Hotel Varanasi</title>
        <meta 
          name="description" 
          content="Read authentic guest reviews and testimonials for Dhaneshwari Hotel. See why our guests love our exceptional service, prime location, and comfortable rooms in Varanasi." 
        />
        <meta 
          name="keywords" 
          content="Dhaneshwari Hotel reviews, guest testimonials, hotel reviews Varanasi, customer feedback, hotel ratings" 
        />
        <link rel="canonical" href={typeof window !== "undefined" ? `${window.location.origin}/testimonials` : "https://dhaneshwari.com/testimonials"} />
      </Helmet>

      <section className="px-4 sm:px-6 lg:px-10">
        <div className="w-full rounded-3xl px-4 sm:px-6 lg:px-10 py-10">
          <div className="text-center mb-14">
            <div className="text-center mb-8 sm:mb-10 lg:mb-12 px-4">
              <h1 className="group relative inline-block text-2xl sm:text-3xl font-semibold text-gray-900 font-[Poppins] cursor-pointer">
                What Our Guests Say ?
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 h-0.5 w-12 bg-black transition-all duration-500 group-hover:w-full"></span>
              </h1>
            </div>

            <p className="mt-3 text-sm md:text-base text-[#7b6a57] max-w-2xl mx-auto">
              Real stories from guests who chose Dhaneshwari Guestline for their
              Kashi Vishwanath visit and Varanasi stay.
            </p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
              {visibleReviews.map((review) => (
                <article
                  key={review.id}
                  className="relative rounded-2xl bg-white shadow-lg px-6 py-8 md:px-7 md:py-9 border border-[#f0e2d3] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="absolute -top-6 left-8">
                    <div className="w-11 h-11 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-md">
                      <span className="text-2xl leading-none">“</span>
                    </div>
                  </div>

                  <div className="mt-4 mb-2" />

                  {renderStars(review.rating)}

                  <h2 className="text-base md:text-lg font-semibold text-[#3e2f23] mb-3">
                    {review.title}
                  </h2>

                  <p className="text-sm md:text-[15px] leading-relaxed text-[#6f5d4a] line-clamp-4">
                    {review.text}
                  </p>

                  <div className="mt-8 pt-5 border-t border-[#f0e2d3] flex flex-col gap-1">
                    <p className="text-sm font-semibold text-[#3e2f23]">
                      {review.author}
                    </p>

                    {review.meta && (
                      <p className="text-xs text-[#8e7a64]">{review.meta}</p>
                    )}

                    {review.date && (
                      <p className="text-xs text-[#8e7a64]">{review.date}</p>
                    )}

                    <div className="mt-3 h-[2px] w-24 bg-gradient-to-r from-[#b7905b] via-[#d7aa6b] to-transparent rounded-full" />
                  </div>
                </article>
              ))}
            </div>

            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Previous testimonials"
            >
              ❮
            </button>

            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Next testimonials"
            >
              ❯
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 mt-8">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIndex(i);
                  setIsAutoPlaying(false);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-amber-500" : "w-2 bg-amber-500 hover:bg-amber-300"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

         
        </div>
      </section>
    </>
  );
}

export default Testimonials;