import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { rooms } from "../data/siteData";
import api from "../api/axios";
import NotFound from "./NotFound";
import { buildQuickPaymentState, parseRupeePrice } from "../utils/quickPaymentState";

function RoomDetail() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(() => rooms.find((r) => r.id === roomId) || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api
      .get("/rooms")
      .then(({ data }) => {
        if (!mounted || !Array.isArray(data)) return;
        const found = data.find((r) => r._id === roomId);
        if (!found) return;
        setRoom({
          id: found._id,
          title: found.roomType,
          desc: found.shortDescription || "Comfortable premium stay.",
          img: found.images?.[0] || rooms[0]?.img,
          priceFrom: `₹${found.pricePerNight?.toLocaleString("en-IN") || "0"}`,
          amenities: found.amenities || [],
        });
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [roomId]);

  if (!loading && !room) return <NotFound />;
  if (!room) return null;

  const pricePerNight = parseRupeePrice(room.priceFrom);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="overflow-hidden rounded-2xl bg-white shadow-md">
          <img
            src={room.img}
            alt={room.title}
            className="h-[420px] w-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-4xl font-semibold">{room.title}</h1>
          <p className="mt-3 text-gray-600">{room.desc}</p>

          <div className="mt-5 inline-flex rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
            From {room.priceFrom} / night
          </div>

          <div className="mt-8 rounded-2xl bg-white p-8 shadow-md">
            <h2 className="text-xl font-semibold">Included amenities</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {room.amenities.map((a) => (
                <li key={a} className="flex items-center gap-2 text-gray-700">
                  <span className="text-orange-500">✓</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() =>
                navigate("/payment", {
                  state: buildQuickPaymentState({
                    name: room.title,
                    image: room.img,
                    pricePerNight: pricePerNight || 3499,
                  }),
                })
              }
              className="mt-8 w-full rounded-md bg-orange-500 px-5 py-3 text-sm font-medium text-white shadow hover:bg-orange-600"
            >
              Book this room
            </button>
          </div>

          <div className="mt-8">
            <Link
              to="/rooms"
              className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-800 shadow-sm hover:border-gray-400"
            >
              <span aria-hidden="true">←</span> Back to Rooms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetail;

