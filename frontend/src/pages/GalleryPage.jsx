import { useEffect, useState } from "react";
import { GalleryCarousel } from "../components/Gallery";
import api from "../api/axios";
import {
  galleryNearbyImages,
  galleryRoomsImages,
} from "../data/galleryImages.js";

function GalleryPage() {
  const [roomsImages, setRoomsImages] = useState(galleryRoomsImages);
  const [nearbyImages, setNearbyImages] = useState(galleryNearbyImages);

  useEffect(() => {
    api
      .get("/gallery")
      .then(({ data }) => {
        if (!Array.isArray(data) || data.length === 0) return;
        const roomSection = data.find((s) => s.name?.toLowerCase().includes("room"));
        const nearbySection = data.find((s) => s.name?.toLowerCase().includes("nearby"));
        const roomUrls = roomSection?.items?.map((it) => it.url).filter(Boolean);
        const nearbyUrls = nearbySection?.items?.map((it) => it.url).filter(Boolean);
        if (roomUrls?.length) setRoomsImages(roomUrls);
        if (nearbyUrls?.length) setNearbyImages(nearbyUrls);
      })
      .catch(() => {
        // Keep fallback images if API fails
      });
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <header className="mb-10">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
          Gallery
        </p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-gray-900">
          Gallery
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          A glimpse of our rooms, spaces, and the calm vibe around the property.
        </p>
      </header>

      <div className="space-y-16">
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Our Rooms</h2>
            <p className="text-gray-600 text-sm mt-1">
              Rooms, interiors, and in-room comfort.
            </p>
          </div>

          <div className="rounded-2xl bg-[#e9e2d3] p-4 sm:p-6 shadow-sm">
            <GalleryCarousel label="Our Rooms" images={roomsImages} />
          </div>
        </section>

        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Nearby Places
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Attractions and surroundings near the property.
            </p>
          </div>

          <div className="rounded-2xl bg-[#e9e2d3] p-4 sm:p-6 shadow-sm">
            <GalleryCarousel
              label="Nearby Places"
              images={nearbyImages}
            />
          </div>
        </section>

        <section className="rounded-2xl bg-[#e9e2d3] p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Close View of the Room
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Watch a short walkthrough of the room.
          </p>

          <div className="overflow-hidden rounded-2xl shadow-md">
            <video
              className="w-full rounded-2xl"
              controls
              playsInline
              preload="metadata"
              src="/videos/room-close-view.mp4"
            />
          </div>

          <p className="mt-3 text-sm text-gray-700">
            Put your video file at{" "}
            <span className="font-semibold">
              frontend/public/videos/room-close-view.mp4
            </span>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

export default GalleryPage;
