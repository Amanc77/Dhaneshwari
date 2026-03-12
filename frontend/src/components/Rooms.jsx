import room1 from "../assets/Dhaneshwari Photoshoot/roomewithBlancket.jpeg";
import room2 from "../assets/Dhaneshwari Photoshoot/roomwithBalloon.jpg";
import room3 from "../assets/Dhaneshwari Photoshoot/astheticRoom.jpeg";

const rooms = [
  {
    title: "Deluxe Room",
    desc: "Elegant interiors with modern comfort.",
    img: room1,
  },
  {
    title: "Premium Room",
    desc: "Luxury stay experience for couples & families.",
    img: room2,
  },
  {
    title: "Family Suite",
    desc: "Spacious comfort with premium amenities.",
    img: room3,
  },
];

function Rooms() {
  return (
    <section className="py-10 sm:py-12 lg:py-16 px-4">
      <h2 className="mb-8 sm:mb-10 lg:mb-12 text-center text-2xl sm:text-3xl font-semibold">
        Our Luxury Rooms
      </h2>

      <div className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
        {rooms.map((room, i) => (
          <div
            key={i}
            className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md"
          >
            <img src={room.img} className="h-48 sm:h-52 lg:h-56 w-full object-cover" alt={room.title} />

            <div className="flex flex-1 flex-col p-4 sm:p-5">
              <h3 className="mb-1 text-base sm:text-lg font-semibold text-gray-900">
                {room.title}
              </h3>

              <p className="text-sm text-gray-600">{room.desc}</p>

              <button className="mt-4 sm:mt-6 w-max rounded-md bg-orange-500 px-5 py-2 text-sm font-medium text-white shadow hover:bg-orange-600">
                Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Rooms;
