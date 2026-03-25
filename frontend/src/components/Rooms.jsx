import { useNavigate } from "react-router-dom";
import room1 from "../assets/Dhaneshwari Photoshoot/roomewithBlancket.jpeg";
import room2 from "../assets/Dhaneshwari Photoshoot/roomwithBalloon.jpg";
import room3 from "../assets/Dhaneshwari Photoshoot/astheticRoom.jpeg";
import { buildQuickPaymentState } from "../utils/quickPaymentState";

const rooms = [
  {
    title: "Deluxe Room",
    desc: "Elegant interiors with modern comfort.",
    img: room1,
    price: 3499,
  },
  {
    title: "Premium Room",
    desc: "Luxury stay experience for couples & families.",
    img: room2,
    price: 4499,
  },
  {
    title: "Family Suite",
    desc: "Spacious comfort with premium amenities.",
    img: room3,
    price: 6999,
  },
];

function Rooms() {
  const navigate = useNavigate();

  return (
<<<<<<< fix-ui
    <section className="w-full px-4 sm:px-6 lg:px-10">
      <div className="w-full py-10 sm:py-6 lg:py-8  rounded-2xl">
      <div className="text-center mb-8 sm:mb-10 lg:mb-12 px-4">
         <h2 className="group relative inline-block text-2xl sm:text-3xl font-semibold text-gray-900 font-[Poppins] cursor-pointer">
 Our Luxury Rooms 
  <span className=" absolute left-1/2 -translate-x-1/2 -bottom-2 h-1/17 w-12 bg-black transition-all duration-500 group-hover:w-full"></span>
</h2>
=======
    <section className="w-full  pt-10 px-4 sm:px-6 lg:px-10">
      <div className="w-full py-10 sm:py-12 lg:py-14 bg-[#e4dcce] rounded-2xl">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 px-4">
          <h2 className="group relative inline-block text-2xl sm:text-3xl font-semibold text-gray-900 font-[Poppins] cursor-pointer">
            Our Luxury Rooms
            <span className=" absolute left-1/2 -translate-x-1/2 -bottom-2 h-1/17 w-12 bg-black transition-all duration-500 group-hover:w-full"></span>
          </h2>
>>>>>>> main
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 px-4 sm:px-6 lg:px-8">
          {rooms.map((room, i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={room.img}
                className="h-48 sm:h-52 lg:h-56 w-full object-cover"
                alt={room.title}
              />

              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <h3 className="mb-1 text-base sm:text-lg font-semibold text-gray-900">
                  {room.title}
                </h3>

                <p className="text-sm text-gray-600">{room.desc}</p>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/payment", {
                      state: buildQuickPaymentState({
                        name: room.title,
                        image: room.img,
                        pricePerNight: room.price,
                      }),
                    })
                  }
                  className="mt-4 sm:mt-6 w-max rounded-md bg-orange-500 px-5 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-orange-600"
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Rooms;
