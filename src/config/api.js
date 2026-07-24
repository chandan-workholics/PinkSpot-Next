const LOCAL_API_BASE_URL = "http://localhost:5000/api/v1";
const LIVE_API_BASE_URL = "https://pinkspot.cc/api/v1";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  (process.env.NODE_ENV === "production" ? LIVE_API_BASE_URL : LOCAL_API_BASE_URL);

export const apiUrl = (path = "") =>
  `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
