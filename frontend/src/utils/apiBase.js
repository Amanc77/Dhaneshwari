/** Base origin for /uploads (strip trailing /api from VITE_API_BASE_URL). */
export function uploadsBaseUrl() {
  const raw = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  return raw.replace(/\/?api\/?$/i, "") || "http://localhost:5000";
}

export function resolveUploadUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${uploadsBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}
