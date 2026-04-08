import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../api/axios";
import image1 from "../assets/Dhaneshwari Photoshoot/Kashi-Vishwanath.webp";
import image2 from "../assets/Dhaneshwari Photoshoot/kalBharavTemple.webp";
import image3 from "../assets/Dhaneshwari Photoshoot/eveningArati.webp";
import image4 from "../assets/Dhaneshwari Photoshoot/manikarnika_Ghat.webp";
import image5 from "../assets/Dhaneshwari Photoshoot/Bundri_Ghat.jpg";
import image6 from "../assets/Dhaneshwari Photoshoot/KashiDham.jpg";
import { getImageAlt, getSeoFileName } from "../utils/imageSeo";

const placesBlogs = [
  {
    id: "kashi-vishwanath",
    title: "Kashi Vishwanath & Sacred Streets",
    description:
      "Walk through the narrow lanes leading to Kashi Vishwanath and discover small temples, shops, and stories at every turn.",
    image: image1,
  },
  {
    id: "manikarnika-ghar",
    title: "Manikarnika Ghat: Timeless Rituals",
    description:
      "Understand the spiritual importance of Manikarnika Ghat and how its rituals shape the soul of Varanasi.",
    image: image4,
  },
];

const experiencesBlogs = [
  {
    id: "ganga-aarti",
    title: "Evening Ganga Aarti Experience",
    description:
      "Best viewpoints, timings, and simple tips to enjoy the aarti comfortably without feeling rushed or crowded.",
    image: image3,
  },
  {
    id: "kashi-dham-museum",
    title: "Kashi Dham & Museum Trails",
    description:
      "A calm way to explore Kashi’s cultural side with short museum visits, photo spots, and nearby walks.",
    image: image6,
  },
];

const foodBlogs = [
  {
    id: "street-food",
    title: "Street Food You Must Try",
    description:
      "From kachori-sabzi to rabri and lassi, a simple list of flavours you shouldn’t miss near the main ghats.",
    image: image5,
  },
  {
    id: "local-cafes",
    title: "Calm Cafés Around the Ghats",
    description:
      "Quiet, cosy spots for coffee, conversations, and views of the Ganga after a long day of walking.",
    image: image2,
  },
];

function Section({ title, subtitle, items }) {
  return (
    <section className="mt-10 first:mt-0">
      <header className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl">
            {subtitle}
          </p>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {items.map((item) => (
          <Link
            key={item.id}
            to={`/famous-attractions/${item.id}`}
            className="block overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <article>
              <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={getImageAlt(item)}
                  data-seo-filename={getSeoFileName(item.title)}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {item.description}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Blog() {
  const [blogsData, setBlogsData] = useState([]);

  useEffect(() => {
    api
      .get("/blogs")
      .then(({ data }) => {
        if (!Array.isArray(data) || data.length === 0) return;
        setBlogsData(data.filter((b) => b.isPublished !== false));
      })
      .catch(() => {
        // Keep fallback static cards
      });
  }, []);

  const { places, experiences, food } = useMemo(() => {
    if (!blogsData.length) {
      return {
        places: placesBlogs,
        experiences: experiencesBlogs,
        food: foodBlogs,
      };
    }

    const toCard = (b, fallbackImage) => ({
      id: b.slug,
      title: b.title,
      description: b.metaDescription || b.content?.slice(0, 120) || "",
      image: b.image || fallbackImage,
    });

    return {
      places: blogsData
        .filter((b) => b.categories?.includes("Places you cannot forget"))
        .map((b) => toCard(b, image1)),
      experiences: blogsData
        .filter((b) => b.categories?.includes("Experiences you cannot miss"))
        .map((b) => toCard(b, image3)),
      food: blogsData
        .filter((b) => b.categories?.includes("Food you cannot forget to taste"))
        .map((b) => toCard(b, image5)),
    };
  }, [blogsData]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12 lg:py-16">
      <Helmet>
        <title>Famous Attractions Blog | Dhaneshwari Hotel</title>
        <meta
          name="description"
          content="Explore famous attractions, local experiences, and food around Varanasi in our short travel blogs."
        />
        <link
          rel="canonical"
          href={
            typeof window !== "undefined"
              ? `${window.location.origin}/famous-attractions`
              : "https://dhaneshwari.com/famous-attractions"
          }
        />
      </Helmet>
      <header className="text-center mb-8 sm:mb-10 lg:mb-12">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
          Famous Attractions
        </p>
        <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">
          Famous Attractions
        </h1>
        <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
          Short, easy-to-read stories about the places, experiences, and food
          that make your Varanasi stay unforgettable.
        </p>
      </header>

      <Section
        title="Places You Can't Forget"
        subtitle="Landmarks and neighbourhoods that stay with you long after you leave Kashi."
        items={places}
      />

      <Section
        title="Experiences You Can't Miss"
        subtitle="Evening rituals, quiet walks, and simple plans to enjoy the city at your own pace."
        items={experiences}
      />

      <Section
        title="Food You Can't Forget to Taste"
        subtitle="Comfort food, sweet treats, and relaxed café corners around the ghats."
        items={food}
      />
    </div>
  );
}

export default Blog;

