const LOCAL_API_BASE_URL = "http://localhost:5000/api";
const LIVE_API_BASE_URL = "https://dhaneshwari.onrender.com/api";

function normalizeApiBaseUrl(url) {
  if (!url) return "";
  return url.trim().replace(/\/+$/, "");
}

export function apiBaseUrl() {
  const envUrl = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL);
  if (envUrl) return envUrl;

  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    const isLocalHost = host === "localhost" || host === "127.0.0.1";
    return isLocalHost ? LOCAL_API_BASE_URL : LIVE_API_BASE_URL;
  }

  return LOCAL_API_BASE_URL;
}

/** Base origin for /uploads (strip trailing /api from API base URL). */
export function uploadsBaseUrl() {
  const raw = apiBaseUrl();
  return raw.replace(/\/?api\/?$/i, "") || "http://localhost:5000";
}

export function resolveUploadUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${uploadsBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}
