import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { rooms } from "../data/siteData";
import api from "../api/axios";

function RoomsAmenities() {
  const [roomsData, setRoomsData] = useState(rooms);
  const [amenitiesData, setAmenitiesData] = useState([
    "24/7 Front Desk Support",
    "Daily Housekeeping",
    "Airport / Station Transfer (On request)",
    "Local Assistance & Recommendations",
    "Family-friendly Spaces",
    "Secure & Peaceful Location",
  ]);

  useEffect(() => {
    api
      .get("/rooms")
      .then(({ data }) => {
        if (!Array.isArray(data) || data.length === 0) return;
        const mapped = data.map((room, idx) => ({
          id: room._id || rooms[idx]?.id || `room-${idx + 1}`,
          title: room.roomType,
          desc: room.shortDescription || rooms[idx]?.desc || "Comfortable stay",
          img: room.images?.[0] || rooms[idx]?.img,
          priceFrom: `₹${room.pricePerNight?.toLocaleString("en-IN") || "0"}`,
          amenities: room.amenities || [],
        }));
        setRoomsData(mapped);
      })
      .catch(() => {});

    api
      .get("/amenities")
      .then(({ data }) => {
        if (!Array.isArray(data) || data.length === 0) return;
        setAmenitiesData(data.map((item) => item.name));
      })
      .catch(() => {});
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <header className="mb-10">
        <h1 className="text-4xl font-semibold">Rooms & Amenities</h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Choose the room that fits your trip. Every stay includes warm service,
          clean spaces, and essential comfort.
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-3">
        {roomsData.map((room) => (
          <article
            key={room.id}
            className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md"
          >
            <img
              src={room.img}
              alt={room.title}
              className="h-56 w-full object-cover"
              loading="lazy"
            />

            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {room.title}
                </h2>
                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                  From {room.priceFrom}
                </span>
              </div>

              <p className="mt-1 text-sm text-gray-600">{room.desc}</p>

              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                {room.amenities.slice(0, 4).map((a) => (
                  <li key={a} className="flex items-center gap-2">
                    <span className="text-orange-500">✓</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center gap-3">
                <Link
                  to={`/rooms/${room.id}`}
                  className="w-full rounded-md bg-orange-500 px-5 py-2 text-center text-sm font-medium text-white shadow hover:bg-orange-600"
                >
                  View Details
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-14 rounded-2xl bg-white p-8 shadow-md">
        <h2 className="text-2xl font-semibold">Amenities you can count on</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {amenitiesData.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-gray-200 bg-[#f9f6f0] px-4 py-3 text-sm text-gray-700"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default RoomsAmenities;

