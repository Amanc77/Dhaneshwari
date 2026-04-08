import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { attractionPosts, blogPosts } from "../data/siteData";
import api from "../api/axios";
import NotFound from "./NotFound";
import { Helmet } from "react-helmet-async";
import { getImageAlt, getSeoFileName } from "../utils/imageSeo";

function BlogPost() {
  const { slug } = useParams();
  const allPosts = [...blogPosts, ...attractionPosts];
  const fallbackPost = allPosts.find((p) => p.slug === slug);
  const [post, setPost] = useState(fallbackPost || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api
      .get(`/blogs/${slug}`)
      .then(({ data }) => {
        if (!mounted || !data) return;
        setPost({
          title: data.title,
          slug: data.slug,
          excerpt: data.metaDescription || "",
          date: data.createdAt
            ? new Date(data.createdAt).toLocaleDateString("en-IN")
            : "",
          image: data.image || fallbackPost?.image,
          content: (data.content || "")
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean),
        });
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [slug]);

  if (!loading && !post) return <NotFound />;
  if (!post) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <Helmet>
        <title>{`${post.title} | Dhaneshwari Blog`}</title>
        <meta name="description" content={post.excerpt} />
        <link
          rel="canonical"
          href={
            typeof window !== "undefined"
              ? `${window.location.origin}/famous-attractions/${post.slug}`
              : `https://dhaneshwari.com/famous-attractions/${post.slug}`
          }
        />
      </Helmet>
      <div className="text-xs font-semibold tracking-wide text-gray-500">
        {post.date}
      </div>
      <h1 className="mt-3 text-4xl font-semibold">{post.title}</h1>
      <p className="mt-4 text-gray-600">{post.excerpt}</p>

      {post.image && (
        <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-md">
          <div className="relative h-56 w-full sm:h-72">
            <img
              src={post.image}
              alt={getImageAlt(post)}
              data-seo-filename={getSeoFileName(post.title)}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      )}

      <div className="mt-10 space-y-5 rounded-2xl bg-white p-8 shadow-md">
        {post.content.map((para, i) => (
          <p key={i} className="text-gray-700 leading-relaxed">
            {para}
          </p>
        ))}
      </div>

      <div className="mt-10">
        <Link
          to="/famous-attractions"
          className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-800 shadow-sm hover:border-gray-400"
        >
          <span aria-hidden="true">←</span> Back to Famous Attractions
        </Link>
      </div>
    </div>
  );
}

export default BlogPost;
