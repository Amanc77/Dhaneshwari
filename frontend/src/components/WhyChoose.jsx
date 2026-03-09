const features = [
  "Premium Rooms",
  "Prime Location",
  "Premium Rooms",
  "Tour & Sightseeing",
  "Hotel Amenities",
  "24×7 Reception",
];

function WhyChoose() {
  return (
    <section className="bg-[#d8d1c4] py-24 text-center">
      {/* Title */}
      <h2 className="mb-16 text-5xl font-semibold text-gray-800">
        Why Choose us ?
      </h2>

      {/* Cards */}
      <div className="mx-auto flex justify-center gap-8 px-6 flex-wrap">
        {features.map((item, i) => (
          <div
            key={i}
            className="flex h-[120px] w-[200px] items-center justify-center rounded-2xl bg-white text-base font-semibold text-gray-800 shadow-md"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChoose;
