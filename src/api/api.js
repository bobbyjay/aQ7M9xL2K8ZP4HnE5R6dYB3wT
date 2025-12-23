// src/api.js
import axios from "axios";

/* -------------------------------------------
   🔄 TOKEN getter injected by AuthContext
------------------------------------------- */
let getAuthToken = () => localStorage.getItem("token");
export const setTokenGetter = (fn) => {
  getAuthToken = fn; 
};

/* ---------------------------------------------------
   🌍 LOAD BASE URL SAFELY
--------------------------------------------------- */
const API_BASE =
  import.meta.env.VITE_API_URL ||
  "https://clutchden.onrender.com/api";

/* ---------------------------------------------------
   🚀 INITIALIZE AXIOS INSTANCE
--------------------------------------------------- */
const API = axios.create({
  baseURL: API_BASE,
  timeout: 20000,
  withCredentials: false,
});

/* ---------------------------------------------------
   🔐 REQUEST INTERCEPTOR (token injection)
--------------------------------------------------- */
API.interceptors.request.use(
  (config) => {
    const token = getAuthToken(); // 🔥 now comes from AuthContext
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ---------------------------------------------------
   ❗ RESPONSE INTERCEPTOR (improved error handling)
--------------------------------------------------- */
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const serverMessage =
      error?.response?.data?.message ||
      error?.response?.data ||
      error.message;

    console.error("🌐 API ERROR:", serverMessage);

    if (status === 503) {
      return Promise.reject({
        status: 503,
        message: "Service unavailable please try again later.",
      });
    }

    if (error.code === "ECONNABORTED" || error.message === "Network Error") {
      return Promise.reject({
        status: 0,
        message: "Network error please check your connection.",
      });
    }

    return Promise.reject({
      status,
      data: error?.response?.data,
      message: serverMessage,
    });
  }
);

/* ---------------------------------------------------
   📌 API ROUTES
--------------------------------------------------- */
const api = {
  // AUTH
  register: (data) => API.post("/auth/register", data),
  verifyEmail: (data) => API.post("/auth/verify-email", data),
  resendCode: (data) => API.post("/auth/resend-code", data),
  login: (data) => API.post("/auth/login", data),

  // USERS
  getProfile: (id) => API.get(`/users/profile/${id}`),
  getMe: () => API.get("/users/me"),

  getAuthenticatedProfilePicture: () =>
    API.get("/users/profile-picture", { responseType: "blob" }),

  getProfilePicture: (id) =>
    API.get(`/users/${id}/profile-picture`, { responseType: "blob" }),

  getMyProfilePic: () =>
    API.get("/users/profile-pictures", { responseType: "blob" }),

  // leaderboard
  getLeaderboard: () => API.get(`/winners/recent`),

  // get winner image stream
  getWinnerImage: (winnerId) =>
    API.get(`/winners/${winnerId}/image`, { responseType: "blob" }),

  // ACCOUNT
  getBalance: () => API.get("/account/balance"),
  transactions: () => API.get("/account/transactions"),

  // WITHDRAW
  withdraw: (data) => API.post("/account/withdraw", data),

  // UPLOAD PROFILE
  updateProfile: (data) => API.get("/upload/profile-image"),
  
  // Upload profile picture (multipart/form-data)
  uploadProfilePicture: (file) => {
    const formData = new FormData();
    formData.append("image", file);

    return API.post("/upload/profile-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },


  // DEPOSIT
  deposit: (data) => API.post("/account/deposit", data),

  // --- BETTING ---

  // Get all events
  getEvents: () => API.get("/events"),

  // Get markets for an event
  getMarkets: (eventId) => API.get(`/events/${eventId}`),

  // Place a bet
  placeBet: (data) => API.post("/bets", data),

  // Get user bet history
  getBets: () => API.get("/bets/me"),

  // RECEIPTS
  getReceiptById: (receiptId) => API.get(`/bets/${receiptId}/receipt`),

  // NOTIFICATIONS
  getNotifications: () => API.get("/notifications"),

  // SUPPORT TICKETS (FIXED)
  createTicket: (formData) => API.post("/support/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }),

  getTickets: () => API.get("/support/tickets"),

  getTicketThread: (ticketId) => API.get(`/support/ticket/${ticketId}`),

  replyToTicket: (ticketId, formData) => API.post(`/support/ticket/${ticketId}/reply`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }),


};

export { API };
export default api;
