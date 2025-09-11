import axios from "axios";
import { auth } from "../../Firebase/Firebase.config";

// Base URL
const BASE_URL = "https://b11a11-server-side-shakibbash-ctf8t5uq3.vercel.app";

// Create axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// -------------------- REQUEST INTERCEPTOR --------------------
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const currentUser = auth.currentUser;
      let token = null;

      if (currentUser) {
        token = await currentUser.getIdToken(true);
        localStorage.setItem("riseAndServeToken", token);
      } else {
        token = localStorage.getItem("riseAndServeToken");
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn("No token available");
      }
    } catch (err) {
      console.error("Failed to get Firebase token:", err);
      localStorage.removeItem("riseAndServeToken");
      window.location.href = "/login";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// -------------------- RESPONSE INTERCEPTOR --------------------
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      localStorage.removeItem("riseAndServeToken");
      localStorage.removeItem("riseAndServeEmail");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// -------------------- EVENT API --------------------
export const eventAPI = {
  getAll: () => apiClient.get("/events"),
  getById: (id) => apiClient.get(`/events/${id}`),
  search: (params) => apiClient.get("/event-search", { params }),
  create: (data) => apiClient.post("/events", data),
  update: (id, data) => apiClient.put(`/events/${id}`, data),
  delete: (id) => apiClient.delete(`/events/${id}`),
  join: (id) => apiClient.post(`/events/${id}/join`),
  joined: () => apiClient.get("/events/joined"), 
  creatorEvents: (email) => apiClient.get(`/events/creator/${email}`),
};

export default apiClient;
