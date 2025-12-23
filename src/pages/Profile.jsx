// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import notificationIcon from "../assets/notificationsicon.svg";
import transferIcon from "../assets/transfer.svg";
import requestIcon from "../assets/request.svg";
import swapIcon from "../assets/swap.svg"
import depositIcon from "../assets/deposit.svg"
import cancelIcon from "../assets/cancel.svg"
import SettingsIcon from "../assets/settings.svg";
import "../styles/profile.css";
import Settings from "../components/Settings";
import Avatar from "../components/Avatar";


export default function Profile() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [profile, setProfile] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const fallbackAvatar = user
  ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.id)}`
  : "/default-avatar.png"; // default for guest

  /* ---- HANDLE LOGOUT ---- */
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.reload();
    }
  }, [isAuthenticated, authLoading]);

  /* ---- LOAD DASHBOARD DATA ---- */
  
  useEffect(() => {
    if (authLoading) return; // WAIT for AuthContext to finish loading

    if (!isAuthenticated) {
      setProfilePicUrl(null); // Reset profilePicUrl on logout
      setError("Please login to continue.");
      setLoading(false);
      return;
    }

    // Still no user yet? WAIT instead of returning.
    if (!user) {
      return; // Wait until user restores
    }            
    if (!isAuthenticated) return;

    async function loadDashboard() {
      try {
        setLoading(true);

        if (!user) return;

        const [profileRes, picRes, balRes, txRes, notifRes] =
          await Promise.allSettled([
            api.getMe(),
            api.getAuthenticatedProfilePicture(),
            api.getBalance(),
            api.transactions(),
            api.getNotifications(),
          ]);

        /* ---- PROFILE ---- */
        if (profileRes.status === "fulfilled") {
          setProfile(profileRes.value?.data?.data || null);
        }

        /* ---- PROFILE PICTURE ---- */
        if (picRes.status === "fulfilled" && picRes.value) {
          try {
            const response = picRes.value;
            let blob;
            
            if (typeof response.blob === 'function') {
              blob = await response.blob();
            } else if (response instanceof Blob) {
              blob = response;
            } else if (response.data instanceof Blob) {
              blob = response.data;
            }
            
            if (blob && blob.size > 0) {
              setProfilePicUrl((prev) => {
                if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
                return URL.createObjectURL(blob);
              });
            } else {
              setProfilePicUrl(null);
            }
          } catch (err) {
            console.error("Profile picture error:", err);
            setProfilePicUrl(null);
          }
        } else {
          setProfilePicUrl(null);
        }


        /* ---- BALANCE ---- */
        if (balRes.status === "fulfilled") {
          setBalance(balRes.value?.data?.data?.balance || 0);
        }

        /* ---- TRANSACTIONS ---- */
        if (txRes.status === "fulfilled") {
          const list = txRes.value?.data?.data;
          setTransactions(Array.isArray(list) ? list : []);
        } else {
          setTransactions([]);
        }

        /* ---- NOTIFICATIONS ---- */
        if (notifRes.status === "fulfilled") {
          const list = notifRes.value?.data?.data;
          setNotifications(Array.isArray(list) ? list : []);
        }
      } catch (err) {
        console.error("Dashboard Error:", err);
        setError("Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [authLoading, isAuthenticated, user]);

  /* ---- UI ---- */

  if (loading) return <div className="loader-overlay" role="status" aria-live="polite" aria-label="loading">
                    <svg className="spinner" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                      <circle cx="12" cy="2" r="0" fill="#3b82f6">
                        <animate attributeName="r" begin="0" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate>
                      </circle>
                      <circle cx="12" cy="2" r="0" fill="#3b82f6" transform="rotate(45 12 12)">
                        <animate attributeName="r" begin="0.125s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate>
                      </circle>
                      <circle cx="12" cy="2" r="0" fill="#3b82f6" transform="rotate(90 12 12)">
                        <animate attributeName="r" begin="0.25s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate>
                      </circle>
                      <circle cx="12" cy="2" r="0" fill="#3b82f6" transform="rotate(135 12 12)">
                        <animate attributeName="r" begin="0.375s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate>
                      </circle>
                      <circle cx="12" cy="2" r="0" fill="#3b82f6" transform="rotate(180 12 12)">
                        <animate attributeName="r" begin="0.5s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate>
                      </circle>
                      <circle cx="12" cy="2" r="0" fill="#3b82f6" transform="rotate(225 12 12)">
                        <animate attributeName="r" begin="0.625s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate>
                      </circle>
                      <circle cx="12" cy="2" r="0" fill="#3b82f6" transform="rotate(270 12 12)">
                        <animate attributeName="r" begin="0.75s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate>
                      </circle>
                      <circle cx="12" cy="2" r="0" fill="#3b82f6" transform="rotate(315 12 12)">
                        <animate attributeName="r" begin="0.875s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate>
                      </circle>
                    </svg>
                  </div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="profilecontainner">
      <header className="headerdiv">
        <div className="imageandifo">
          <div className="profilecoverdiv">
            <Avatar isSelf size={80} />
          </div>

          <div className="wbusertx">
            <h1>Welcome Back, {profile?.username}</h1>
            <div className="emailtx">{profile?.email}</div>
          </div>
        </div>


        <div>
          <div className="sndivbox">

            <label htmlFor="settingsbtn">
              <div className="settingsdiv">
                <img src={SettingsIcon} alt="Settings" className="settingicon" />
              </div>
            </label>
            
            <label htmlFor="notificationBar">
              <div className="notificationdiv">
                <img src={notificationIcon} alt="notification" className="notifyicon" />
              </div>
            </label>


          </div>
        </div>
      </header>

  
      <main>
        <section className="sec-top">
          <div>
            <input type="checkbox" name="notification" id="notificationBar" className="disapearcheckbox" />
            <div className="notificationlookup">
              {/* NOTIFICATIONS */}
              <label htmlFor="notificationBar" className="canceldiv1">
                <img src={cancelIcon} alt="cancel" className="cancelbtn"/>
              </label>
              <h2>Notifications</h2>
              <div className="notifyscroll">
                {notifications.length === 0 ? (
                <p>No notifications</p>
                ) : (
                  <ul>
                    {notifications.map((n, index) => (
                    <li key={n._id || n.id || index} className="notifydiv">{n.message}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="balancesection">
          {/* BALANCE */}
          <div className="balancediv">
            <h3 className="abtx">Available Balance :</h3>
            <div className="bstx">
              $
              {Number(balance).toLocaleString()}
            </div>
          </div>
        </section>
        <section className="paymentoption">
          
          <div className="paymentfexcover">

            <div className="paymentoptiondivinner">
              <span
                onClick={() => (window.location.href = "/support")}
                className="redirecttologin" >
                <img src={transferIcon} alt="transfer" className="paymentIcon"/> 
              </span>
              <div>
                <p>Transfer</p>
              </div>
            </div>

            <div className="paymentoptiondivinner">
              <span
                onClick={() => (window.location.href = "/withdrawal")}
                className="redirecttologin" >
                <img src={requestIcon} alt="request" className="paymentIcon"/>
              </span>
              <div>
                <p>Request</p>
              </div>
            </div>

            <div className="paymentoptiondivinner"> 
              <span
                onClick={() => (window.location.href = "/bets")}
                className="redirecttologin" >
                <img src={swapIcon} alt="swap" className="paymentIcon" />
              </span>
              <div>
                <p>Swap</p>
              </div>
            </div>

            <div className="paymentoptiondivinner">
              <span
                onClick={() => (window.location.href = "/deposit")}
                className="redirecttologin" >
                <img src={depositIcon} alt="deposit" className="paymentIcon"/>
              </span>
              <div>
                <p>Deposit</p>
              </div>
            </div>

          </div>
        </section> 

        <section></section>
        <section className="transactionsectuon">
          <div className="transactioninfo">
            {/* TRANSACTIONS */}
            <h2>Transaction History</h2>
            <div className="transactionschemamaker">
              {transactions.length === 0 ? (
              <p className="transactionschema">No transactions yet.</p>
              ) : (
                <ul>
                  {transactions.map((t, index) => (
                  <li key={t._id || t.id || index} className="transactionschema">
                    {t.type?.toUpperCase()}  ${t.amount}  {t.status}
                  </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
        <div>
          <input type="checkbox" name="settingsbtn" id="settingsbtn" />
          <div className="settingsbox">
            <label htmlFor="settingsbtn">
              <div className="settingsdiv1">
                <img src={cancelIcon} alt="cancel" className="settingicon1" />
              </div>
            </label>
            <Settings/>
          </div>
        </div>

      </main>


    </div>
  );
}
