import { useState } from "react";

function Testimonials() {
  const reviews = [
    { 
      id: 1, 
      text: "From check-in to check-out, everything was smooth. Hospitality was top class and the location is perfect.",
      author: "Rahul Sharma"
    },
    { 
      id: 2, 
      text: "Amazing experience! The staff was very helpful and the rooms were clean.",
      author: "Priya Patel"
    },
    { 
      id: 3, 
      text: "Beautiful property with great amenities. Will definitely come back.",
      author: "Amit Kumar"
    },
    { 
      id: 4, 
      text: "Excellent service and wonderful location. Highly recommended!",
      author: "Neha Singh"
    },
    { 
      id: 5, 
      text: "Perfect stay for families. Kids loved the pool and activities.",
      author: "Vikram Mehta"
    },
    { 
      id: 6, 
      text: "Luxurious experience with attention to every detail. Five stars!",
      author: "Anjali Gupta"
    },
  ];

  const [centerIndex, setCenterIndex] = useState(2); // Start with 3rd review in center

  // Get 3 reviews to display with current center
  const getVisibleReviews = () => {
    const totalReviews = reviews.length;
    const prevIndex = (centerIndex - 1 + totalReviews) % totalReviews;
    const nextIndex = (centerIndex + 1) % totalReviews;
    
    return [
      reviews[prevIndex],
      reviews[centerIndex],
      reviews[nextIndex]
    ];
  };

  const next = () => {
    setCenterIndex(prev => (prev + 1) % reviews.length);
  };

  const prev = () => {
    setCenterIndex(prev => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToReview = (index) => {
    setCenterIndex(index);
  };

  const visibleReviews = getVisibleReviews();

  return (
    <section className="py-16 px-4 text-center ">
      <h2 className="mb-12 text-3xl md:text-4xl font-bold text-gray-800">
        What Our Guests Say
      </h2>

      <div className="flex items-center justify-center gap-4 max-w-7xl mx-auto">
        {/* Previous Button */}
        <button
          onClick={prev}
          className="text-2xl w-12 h-12 rounded-full flex items-center justify-center
            text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-all duration-300"
          aria-label="Previous testimonial"
        >
          ◀
        </button>

        {/* Cards Container */}
        <div className="flex items-center justify-center gap-8 overflow-hidden py-8 px-2">
          {visibleReviews.map((review, index) => {
            const isCenter = index === 1; 
            
            return (
              <div
  key={review.id}
  className={`
    bg-white shadow-lg transition-all duration-500 ease-in-out
    flex flex-col justify-center items-center text-center
    rounded-full
    ${isCenter 
      ? 'w-72 h-72 md:w-80 md:h-80 p-8 scale-105 z-10 shadow-xl ring-2 ring-black-500' 
      : 'w-60 h-60 md:w-64 md:h-64 p-6 scale-95 opacity-80 shadow-md'
    }
  `}
>
                {/* Avatar Circle */}
                <div className="mb-4">
                  <div className={`
                    rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200
                    ${isCenter ? 'w-20 h-20 text-3xl' : 'w-16 h-16 text-2xl'}
                  `}>
                    👤
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex text-yellow-400 text-sm mb-3 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                {/* Review Text */}
                <p className={`
                  text-gray-700 leading-relaxed mb-3
                  ${isCenter ? 'text-sm' : 'text-xs'}
                `}>
                  "{review.text}"
                </p>

                {/* Author Name - only show on center card */}
                {isCenter && (
                  <p className="text-sm font-semibold text-gray-600 mt-2">
                    - {review.author}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={next}
          className="text-2xl w-12 h-12 rounded-full flex items-center justify-center
            text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-all duration-300"
          aria-label="Next testimonial"
        >
          ▶
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="mt-10 flex justify-center items-center gap-3">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => goToReview(index)}
            className={`
              rounded-full transition-all duration-300 
              focus:outline-none focus:ring-2 focus:ring-green-400
              ${centerIndex === index 
                ? 'bg-black w-8 h-3' 
                : 'bg-black hover:bg-green-400 w-3 h-3'
              }
            `}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>

      {/* Current Review Indicator */}
      <p className="mt-4 text-sm text-gray-500">
        Currently viewing: {centerIndex + 1} of {reviews.length} reviews
      </p>
    </section>
  );
}

export default Testimonials;