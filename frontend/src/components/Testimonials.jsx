import { useState } from "react";

function Testimonials() {
  const reviews = [
    {
      id: 1,
      text: "I loved everything about this hotel, from room types, customer service, specially house keeping by samsuddin was on top level and facilities to the serene pool area and gym facility. I will recommend others for sure",
      author: "Mr. satish k"
    },
    {
      id: 2,
      text: "Wonderful Stay at Ramee Guestline – Highly Recommend! I recently stayed at Ramee Guestline, and it was an incredible experience from start to finish. The staff was exceptionally welcoming and went out of their way to ensure I had a comfortable stay.",
      author: "Mr. Pavan Dahale"
    },
    {
      id: 3,
      text: "Wonderful experience. The staff was very helpful and professional. Mr Kamal, Mr Sohel, Mr Ram Sattai and Mr Tatyya were some of the notable staff who were very helpful and kind. Rooms are well maintained. Hotel is also in a prime location.",
      author: "Mr. Anand"
    },
    {
      id: 4,
      text: "Excellent service and beautiful property. The breakfast buffet had amazing variety and the location is perfect for exploring the city. Will definitely come back on my next visit.",
      author: "Mr. Rajesh Kumar"
    },
    {
      id: 5,
      text: "The staff went above and beyond to make our anniversary special. They decorated the room and arranged a cake. Such thoughtful service! Highly recommended for couples.",
      author: "Mr. Amit Shah"
    },
    {
      id: 6,
      text: "Great value for money. The rooms were spotless, and the staff was always smiling and helpful. The pool area is well maintained and perfect for relaxing after a long day.",
      author: "Mr. Vikram Singh"
    }
  ];

  const [centerIndex, setCenterIndex] = useState(1);

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
    <section className="py-16 px-4 ">
      <h2 className="text-center mb-12 text-3xl md:text-4xl font-bold text-gray-800">
        What Our Guests Say
      </h2>

      <div className="flex items-center justify-center gap-4 max-w-7xl mx-auto">
        <button
          onClick={prev}
          className="text-3xl w-12 h-12 rounded-full flex items-center justify-center
            text-gray-400  transition-all duration-300
            hover:bg-gray-100 hover:text-orange-400"
          aria-label="Previous testimonial"
        >
          ←
        </button>

        <div className="flex items-center justify-center gap-6 overflow-hidden py-8 px-2">
          {visibleReviews.map((review, index) => {
            const isCenter = index === 1;

            return (
        <div
  key={review.id}
  className={`
    relative bg-white transition-all duration-500 ease-in-out
    flex flex-col rounded-lg border-t-4 border-[#C9A46A]
    ${isCenter 
      ? 'w-80 md:w-96 p-6 scale-105 z-10 shadow-lg' 
      : 'w-72 md:w-80 p-5 scale-95 opacity-70 shadow-md'
    }
    h-[320px] md:h-[360px]
  `}
>

<div className="absolute -top-5 right-6">
  <span className="w-10 h-10 bg-[#C9A46A] text-white rounded-full flex items-center justify-center text-xl font-serif shadow-md">
    "
  </span>
</div>

  <div className="flex-1 overflow-y-auto custom-scrollbar mt-4">
    <p
      className={`
      text-gray-700 leading-relaxed font-light
      ${isCenter ? "text-base" : "text-sm"}
    `}
    >
      {review.text}
      
    </p>
  </div>
<div className="text-black-500 text-sm md:text-m font-semibold">
  Rating: ⭐⭐⭐⭐⭐
</div>
  <div className="border-t border-dotted border-gray-300 my-3"></div>

  <p
    className={`
    text-[#C9A46A] font-medium text-center flex-shrink-0
    ${isCenter ? "text-base" : "text-sm"}
  `}
  >
    {review.author}
  </p>
</div>
            );
          })}
        </div>

        <button
          onClick={next}
          className="text-3xl w-12 h-12 rounded-full flex items-center justify-center
            text-gray-400 hover:text-gray-600 transition-all duration-300
            hover:bg-gray-100 hover:text-orange-400"
          aria-label="Next testimonial"
        >
          →
        </button>
      </div>

      <div className="mt-8 flex justify-center items-center gap-2">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => goToReview(index)}
            className={`
              rounded-full transition-all duration-300 
              focus:outline-none
              ${centerIndex === index 
                ? 'bg-gray-800 w-6 h-2.5' 
                : 'bg-gray-300 hover:bg-gray-400 w-2.5 h-2.5'
              }
            `}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>

      <p className="mt-4 text-center text-sm text-gray-500">
        Showing {centerIndex + 1} of {reviews.length} reviews
      </p>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d1d1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
      `}</style>
    </section>
  );
}

export default Testimonials;