// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import api, { API } from "../api/api";
import { useNavigate } from "react-router-dom";
import { setTokenGetter } from "../api/api";


const AuthContext = createContext(null);

export { AuthContext };
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [pendingEmail, setPendingEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  // ---------------------- RECEIPT STATES ----------------------
  const [receipt, setReceipt] = useState(null);
  const [receiptLoading, setReceiptLoading] = useState(false);     
  const [receiptError, setReceiptError] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState(null);

  /* ---------------------------------------------------------
     🔄 INJECT TOKEN GETTER INTO api.js
  --------------------------------------------------------- */

  // 🔥 CONNECT AuthContext → Axios
  setTokenGetter(() => localStorage.getItem("token"));

  /* ---------------------------------------------------------
     🔵 Load profile picture
  --------------------------------------------------------- */
  const loadProfilePicture = async (userId) => {
  if (!userId) return;

  try {
    // Make sure responseType is blob
    const res = await api.getProfilePicture(userId, { responseType: "blob" });

    if (!(res.data instanceof Blob)) throw new Error("Invalid image response");

    // Revoke previous blob URL
    setProfilePicUrl((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return URL.createObjectURL(res.data);
    });

  } catch (err) {
    console.warn("Failed to load profile picture, using fallback", err);
    setProfilePicUrl((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return null;
    });
  }
};

  /* ---------------------------------------------------------
   🟢 Load logged-in user on refresh (FULLY FIXED)
  --------------------------------------------------------- */
  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      const token = localStorage.getItem("token");
 
     // No token → stop loading and exit
      if (!token) {
        if (mounted) {
          setUser(null);
          setProfilePicUrl(null); // clear old avatar
          setLoading(false);
        }
        return;
      }

      try {
       // Fetch /me
        const res = await api.getMe();
        const freshUser = res.data?.data || null;

        if (mounted) {
          // Save user
          setUser(freshUser);
          setProfilePicUrl((prev) => {
            if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
            return null; // reset before loading new
          });
         // Load profile picture ONLY if user exists
          const id = freshUser?._id || freshUser?.id;
          if (id) {
            await loadProfilePicture(id);
          }
        }
      } catch (err) {
       // Token expired or backend says no
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          if (mounted) setUser(null);
        }
      } finally {
       // 🔥 ALWAYS stop loading — THIS FIXES YOUR ISSUE
        if (mounted) setLoading(false);
      }
    }

    loadUser();

    return () => {
      mounted = false;

      // Clean up blob URL on unmount
      setProfilePicUrl((prev) => {
        if (prev?.startsWith("blob:")) {
          URL.revokeObjectURL(prev);
        }
        return null;  
      });
    };
  }, []);



  /* ---------------------------------------------------------
     REGISTER
  --------------------------------------------------------- */
  const register = async ({ username, email, password }) => {
    try {
      await api.register({ username, email, password });
      setPendingEmail(email);
      navigate("/verify-email");
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || "Registration failed",
      };
    }
  };

  /* ---------------------------------------------------------
     VERIFY EMAIL
  --------------------------------------------------------- */
  const verifyEmail = async (code) => {
    try {
      const res = await api.verifyEmail({ email: pendingEmail, code });
      const data = res.data.data;

      if (data?.token) {
        localStorage.setItem("token", data.token);

        const newUser = {
          _id: data.id || data._id,
          username: data.username,
          email: data.email,
          profilePicture: data.profilePicture || null,
        };

        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));

        await loadProfilePicture(newUser._id);

        navigate("/Profile");
        return { success: true };
      }

      navigate("/login");
      return { success: false };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || "Invalid code",
      };
    }
  };


  /* ---------------------------------------------------------
     LOGIN
  --------------------------------------------------------- */
  const login = async ({ email, password }) => {
    try {
      const res = await api.login({ email, password });
      const data = res.data.data;

      if (!data?.token) throw new Error("No token returned by backend.");

      localStorage.setItem("token", data.token);

      const loggedInUser = {
        _id: data.id || data._id,
        email: data.email,
        username: data.username,
        profilePicture: data.profilePicture || null,
      };

      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      await loadProfilePicture(loggedInUser._id);

      navigate("/Profile");
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || err.message || "Login failed",
      };
    }
  };


  /* ---------------------------------------------------------
     LOGOUT
  --------------------------------------------------------- */
  const logout = () => {
    // Clear auth
    localStorage.removeItem("token");

    // Clear persisted user data
    localStorage.removeItem("user");
    localStorage.removeItem("profilePicUrl");
 
    // Reset app state
    setUser(null);

    // Optional: force UI reset
    navigate("/login", { replace: true });
  };

  /* ---------------------------------------------------------
     🟣 WITHDRAW (used by WithdrawalPage)
  --------------------------------------------------------- */
  const withdraw = async ({ amount, walletType, walletAddress }) => {
    try {
      const res = await api.withdraw({
        amount,
        walletType,
        walletAddress,
      });

      return res.data; // { success, message }
    } catch (err) {
      return {
        success: false,
        message:
          err.response?.data?.message || "Withdrawal request failed.",
      };
    }
  };

  /* ---------------------------------------------------------
   🟡 DEPOSIT (used by DepositPage)
  --------------------------------------------------------- */
  const deposit = async (amount) => {
    try {
      const res = await api.deposit({ amount });
      return res.data;
    } catch (err) {
      return {
        success: false,
        message: err.message || "Deposit service unavailable.",
      };
    }
  };

  /* -----------------------------------------
    🟡 BETTING API (updated to match api.js)
  ----------------------------------------- */

  // Get ALL events
  const getEvents = async () => {
    try {
      const res = await api.getEvents();
      return res.data;
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // Get markets for an event
  const getMarkets = async (eventId) => {
    try {
      const res = await api.getMarkets(eventId);
      return res.data;
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // Place bet
  const placeBet = async (body) => {
    try {
      const res = await api.placeBet(body);
      return res.data;
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // Get user bets
  const getBets = async () => {
    try {
      const res = await api.getBets();
      return res.data;
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  
  /* -------------------------------------------------------------
   🌐 SUPPORT SYSTEM — FULLY UPDATED FOR SupportPage.jsx
 --------------------------------------------------------------*/
 const [tickets, setTickets] = useState([]);
 const [messages, setMessages] = useState([]);
 const [activeTicket, setActiveTicket] = useState(null);

 /* -------------------------------------------------------------
  Get ALL tickets for user
 --------------------------------------------------------------*/
  const fetchSupportTickets = async () => {
    try {
     const res = await api.get("/support/tickets");

     const data = Array.isArray(res.data?.tickets)
      ? res.data.tickets
      : [];

     setTickets(data);
     return { success: true, data };
    } catch (err) {
    setTickets([]);
    return { success: false, message: "Could not load tickets" };
    }
  };

  /* -------------------------------------------------------------
  Get SINGLE ticket thread + messages
  --------------------------------------------------------------*/
  const fetchSingleTicket = async (ticketId) => {
   if (!ticketId) return;

    try {
      const res = await api.get(`/support/ticket/${ticketId}`);

      const ticket = res.data?.ticket || {};
      const msgs = Array.isArray(ticket.messages)
      ? ticket.messages
      : [];

      setMessages(msgs);

      return {
        success: true,
        data: {
          ...ticket,
          messages: msgs,
        },
      };

    } 

    catch (err) {
      setMessages([]);
      return {
        success: false,
        message: "Could not load ticket messages",
      };
    }
  };


  /* ----------------------------------------
    SUPPORT TICKET FUNCTIONS (UPDATED)
  ---------------------------------------- */

// CREATE TICKET
const createTicket = async (formData) => {
  try {
    const res = await API.post("/support/tickets", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return {
      success: res.data?.success || true,
      message: res.data?.message || "Support ticket created successfully",
      data: res.data?.data || null,
    };
  } catch (err) {
    return {
      success: false,
      message: err?.response?.data?.message || "Failed to create ticket",
    };
  }
};

// GET ALL TICKETS
const getTickets = async () => {
  try {
    const res = await API.get("/support/tickets");

    // Backend returns: { success, message, data: [ ... ] }
    const tickets = Array.isArray(res.data?.data) ? res.data.data : [];

    return {
      success: true,
      data: tickets,
    };
  } catch (err) {
    console.log("❌ getTickets error:", err);
    return {
      success: false,
      message: "Unable to load tickets",
      data: [],
    };
  }
};

// GET TICKET THREAD BY ID
const getTicketThread = async (ticketId) => {
  try {
    const res = await API.get(`/support/ticket/${ticketId}`);

    // Backend returns: { success, message, data: {ticket} }
    const ticket = res.data?.data || {};

    return {
      success: true,
      data: ticket,
    };
  } catch (err) {
    console.log("❌ getTicketThread error:", err);
    return {
      success: false,
      message: "Could not load ticket thread",
      data: { messages: [] },
    };
  }
};

// REPLY TO TICKET
const replyToTicket = async (ticketId, formData) => {
  try {
    const res = await API.post(`/support/ticket/${ticketId}/messages`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return {
      success: true,
      message: res.data?.message || "Message sent",
      data: res.data?.data || null,
    };
  } catch (err) {
    return {
      success: false,
      message: err?.response?.data?.message || "Failed to reply",
    };
  }
};

  // ------------------------------------------------
  // ⭐ UPDATE PROFILE (THE BLOCK YOU ASKED FOR)
  // ------------------------------------------------

  const updateProfile = async (data = {}, file = null) => {
    try {
      let formData;
      let headers = {};

      if (file) {
        // if uploading an image, use FormData
        formData = new FormData();
        formData.append("image", file);

        // append any other data if needed
        for (const key in data) {
          formData.append(key, data[key]);
        }

        headers["Content-Type"] = "multipart/form-data";
      } else {
        formData = data; // normal JSON update
      }

      const res = await API.post("/upload/profile-image", formData, { headers });

      // Update local user state
      const updatedUser = { ...user, ...res.data.data };
    
      // If a profile picture was uploaded, generate blob URL
      if (file && res.data.data.profilePicture) {
        const picRes = await api.getProfilePicture(res.data.data._id);
        const imageUrl = URL.createObjectURL(picRes.data);
        updatedUser.profilePictureUrl = imageUrl;
      }

      setUser(updatedUser);

      return { success: true, data: updatedUser };
    } catch (err) {
      console.error("updateProfile error:", err);
      return {
        success: false,
        message: err.response?.data?.message || "Profile update failed",
      };
    }
  };

  //riceipts logic
  const fetchReceipt = async (receiptId) => {
    try {
      const res = await API.get(`/bets/${receiptId}/receipt`);
  
      // Backend returns: { success, message, data: {ticket} }
      const receipt = res.data?.data || {};

      return {
        success: true,
        data: receipt,
      };
    } catch (err) {
      console.log("❌ receipt error:", err);
      return {
        success: false,
        message: "Could not load  receipt",
        data: { messages: [] },
      };
    }
  };
  
  const getReceiptById = async (receiptId) => {
    try {
      setReceiptLoading(true);
      setReceipt(null);
      setReceiptError(null);

      const res = await API.get(`/bets/${receiptId}/receipt`);

      if (res.data?.success) {
        setReceipt(res.data.data); // save receipt into context
        return { success: true, data: res.data.data };
      } else {
        setReceiptError(res.data.message || "Failed to fetch receipt");
       return { success: false, message: res.data.message };
      }
    } catch (error) {
      console.error("Receipt fetch failed:", error);
      setReceiptError("Network error fetching receipt");
      return { success: false, message: "Network error" };
    } finally {
      setReceiptLoading(false);
    }
  };

 /* -----------------------------------------
    🟡 BETTING API (updated to match api.js)
  ----------------------------------------- */

  // Get ALL Leaderboard
  const getLeaderboard = async () => {
    try {
      const res = await api.getLeaderboard();

      if (!res.data?.success) {
        return { success: false, message: res.data?.message || "Failed to fetch leaderboard", leaderboard: [] };
      }

      const winners = res.data.data || [];
 
      // Fetch image blobs in parallel
      const winnersWithImages = await Promise.all(
        winners.map(async (winner) => {
          let imageUrl = null;
 
          if (winner._id) {
            try {
              const imgRes = await api.getWinnerImage(winner._id);
              imageUrl = URL.createObjectURL(imgRes.data);
            } catch (err) {
              console.error(`Failed to load image for winner ${winner._id}:`, err);
            }
          }
  
          return { ...winner, imageUrl };
        })
      );
 
      return { success: true, message: res.data.message, leaderboard: winnersWithImages };
    } catch (err) {
      console.error("Leaderboard fetch failed:", err);
      return { success: false, message: err.message, leaderboard: [] };
    }
  };




  return (
    <AuthContext.Provider
        value={{
          user,
          pendingEmail,
          loading,
          register,
          verifyEmail,
          login,
          logout,
          withdraw,          // <-- added here
          deposit,        // <-- ADD THIS
          getEvents,
          getMarkets,
          placeBet,
          getBets,
          getReceiptById,
          receipt,
          receiptLoading,
          receiptError,
          // SUPPORT
          createTicket,
          getLeaderboard,
          getTickets,
          getTicketThread,
          replyToTicket,
          updateProfile,
          fetchReceipt, // ⬅️ added

          isAuthenticated: !!user,
        }}
    >
    {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
