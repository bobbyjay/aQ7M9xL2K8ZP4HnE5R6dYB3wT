import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { generateReceiptPDF } from "../api/generateReceiptPDF";
import clutchdenem from "../assets/clutchdenEmbedded.svg"
import ProfileIcon from "../assets/ProfileIcon.svg";
import backIcon from "../assets/back.svg";
import fireIcon from "../assets/fire.svg";
import awardIcon from "../assets/award.svg";
import newbieAward from "../assets/newbieAward.svg";
import platinumAward from "../assets/platinumAward.svg";
import goldenAward from "../assets/goldenAward.svg";
import goldRush from "../assets/images/gold_rush.png"
import "../styles/betpage.css";
import { Navigate, useNavigate } from "react-router-dom";
import LeaderboardCarousel from "../components/LeaderboardCarousel.jsx";
import { useRef } from "react";

export default function BetPage() {
  const {
    getEvents,
    getMarkets,
    placeBet,
    getBets,

    // Receipt logic from AuthContext
    getReceiptById,
    receipt,
    receiptLoading,
    receiptError,
    getLeaderboard,
  } = useAuth();

  // DATA
  const [events, setEvents] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [bets, setBets] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  // SELECTIONS
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("");
  const [stake, setStake] = useState("");

  // LOADING STATES
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingMarkets, setLoadingMarkets] = useState(false);
  const [loadingBets, setLoadingBets] = useState(true);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);
  const [showBetHistoryPopup, setShowBetHistoryPopup] = useState(false);
  const [ShowViewPopup, setShowviewPopup ] = useState(false);
  const [ShowStakePopup, setShowStakePopup ] = useState(false);
  const [ShowErrorPopup, setShowErrorPopup ] = useState(false);
  const [ShowMassagePopup, setShowmassagePopup ] = useState(false);
  const [betPlaced, setBetPlaced] = useState(false);


  // ERROR STATE
  const [error, setError] = useState("");


  const navigaten = useNavigate();

  const [massageline, setmassageline] = useState("");
  
  const targetRef = useRef(null);
  // -------------------------------------
  // Load Events & Bets
  // -------------------------------------
  useEffect(() => {
    loadEvents();
    loadBets();
    handleLeaderboard();
  }, []);

  const handleCloseBetHistoryPopup = () => {
    setShowBetHistoryPopup(false);
  };
  const handleOpenBetHistoryPopup = () => {
    setShowBetHistoryPopup(true);
  };
  const handleCloseviewPopup = () => {
    setShowviewPopup(false)
  };
  const handleOpenviewPopup = () => {
    setShowviewPopup(true)
  };
  const handleOpenStakePopup = () => {
    setShowStakePopup(true)
  };
  const handleCloseStakePopup = () => {
    setShowStakePopup(false)
  };
  const handleCloseErrorPopup = () => {  
    setShowErrorPopup(false)
  };
  const handleCloseMassagePopup = () => {
    setShowmassagePopup(false)
  };
  const handleScrollToDiv = () => {
    targetRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };


  const loadEvents = async () => {
    setLoadingEvents(true);
    const res = await getEvents();

    if (!res?.success) {
      setError("Failed to load events");
    } else {
      setEvents(res.data || res.events || []);
    }

    setLoadingEvents(false);
  };

  const loadBets = async () => {
    setLoadingBets(true);
    const res = await getBets(); // FIXED

    if (!res?.success) {
      setShowBetHistoryPopup(true)
      setError("Failed to load bets");
    } else {
      setBets(res.data || res.bets || []);
    }

    setLoadingBets(false);
  };

  // -------------------------------------
  // Load Markets when event selected
  // -------------------------------------
  const handleLeaderboard = async () => {
    setLoadingLeaderboard(true);
    setLeaderboard([]); // clear old

    const res = await getLeaderboard();

    if (!res?.success) {
      setError("Failed to load leaderboard");
      setLoadingLeaderboard(false);
      return;
    }

    // Put leaderboard array into state
    setLeaderboard(res.leaderboard || []);
    setLoadingLeaderboard(false);
  };


  // -------------------------------------
  // Load Markets when event selected
  // -------------------------------------
  const handleEventChange = async (eventId) => {
    setSelectedEvent(eventId);
    setSelectedMarket("");
    setMarkets([]);

    if (!eventId) return;

    setLoadingMarkets(true);
    const res = await getMarkets(eventId);

    if (!res?.success) {
      setError("Failed to load markets");
    } else {
      setMarkets(res.data?.markets || res.markets || []);
    }

    setLoadingMarkets(false);
  };

  // -------------------------------------
  // Place Bet
  // -------------------------------------
  const handlePlaceBet = async (e) => {
    e.preventDefault();

    if (!selectedEvent || !selectedMarket || !stake) {
      setError("Please complete all fields");
      setShowErrorPopup(true)
      return;
    }

    const body = {
      eventId: selectedEvent,
      marketId: selectedMarket,
      stake: Number(stake),
    };

    const res = await placeBet(body);

    if (!res?.success) {
      setError(res.message || "Error placing bet");
      setShowErrorPopup(true);
      return;
    }

    setError(null);
    setStake("");
    loadBets();
    setShowmassagePopup(true);
    setmassageline("Bet placed successfully!");
    setBetPlaced(true);
  };

  // -------------------------------------
  // View Receipt
  // -------------------------------------
  const handleViewReceipt = async (bet) => {
    // bet._id is the correct ID from your backend
    if (!bet || !bet._id) {
      console.error("❌ Bet ID missing:", bet);
      return;
      
    }

    await getReceiptById(bet._id);
  };

  const handlePDFDownload = () => {
    if (receipt) generateReceiptPDF(receipt);
  };

  return (
    <div style={{ margin: "0" }} >
      <div >
        <div className="heading-containner" >
          <div className="heading-containner-div">
            <div className="back-icon-btn-div">
              <button onClick={() => navigaten(-1)} className="back-icon-btn">
                <img src={backIcon} alt="back" className="back-icon"/>
              </button>
            </div>
            <div className="back-icon-btn-div">
              <Link to="/Profile" style={{ margin: "none"}}>
                <img src={ProfileIcon} alt="profile" className="profile-icon" />
              </Link>
            </div>
          </div>
          <div>
            <img src={clutchdenem} alt="clutchdenembeder" className="cluch-em"/>
          </div>
        </div>
        <div className="betting-page" >
          <div className="section1-cover" ref={targetRef}>
            <img src={fireIcon} alt="fire" className="fire-icon"/>
            <div className="s1-tx-div">
              <h3 className="popular-tx">Popular Events</h3>
            </div>
          </div>

          {/* ------------------------------------- */}
          {/* Place Bet */}
          {/* ------------------------------------- */}
          <div className="bet-form" style={{ color: "white" }} >

            <ul className="popular-games-list">
              {/* Placeholder */}
              <li
                onClick={() => handleEventChange("")}
                style={{
                  padding: "25px 8px",
                  background: selectedEvent === "" ? "#464242ff" : "#313030ff",
                  cursor: "pointer",
                  borderBottom: "1px solid #ddd"
                }}
              > </li>
              {/* Loading state */}
              {loadingEvents ? (
                <li style={{ padding: "8px", color: "#666" }}>
                  <div className="loader-overlay" role="status" aria-live="polite" aria-label="loadingEvents">
                    <svg className="spinner" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...loadingEvents}>
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
                  </div>
                </li>
              ) : (
                events.map((event) => (
                  <li
                    key={event._id}
                    onClick={() => handleEventChange(event._id)}
                    className={selectedEvent === event._id ? "list-of-popular-games" : ""}
                    style={{
                      minWidth: "100px",
                      maxHeight: "200px",
                      marginBottom: "10px",
                      overflow: "hidden",
                      display: "grid",
                      gridTemplateRows: "1fr auto",
                      background: "linear-gradient(46deg, #2b2727ad, #5c5a5a88)",
                      border: "1px solid rgba(255, 255, 255, 0.25)"
                    }}
                    id="list-of-popular-games"
                  >
                   {event.name || event.title}
                    <div className="event-date-tx"
                      style={{
                        paddingTop: "0",
                        marginTop: "0"
                      }}
                    >
                      {event.createdAt
                        ? new Date(event.createdAt).toLocaleDateString("en-US", {
                         year: "numeric",
                         month: "short",
                         day: "numeric",
                        })
                      : "No date"}
                    </div>
                  </li>
                ))
              )}
            </ul>
  
            
            <ul style={{ listStyle: "none", padding: "0", marginTop: "10px" }}>
              {/* Placeholder */}
              <li
                onClick={() => setSelectedMarket("")}
                className="opt-event"
                style={{
                  padding: "8px",
                  background: selectedMarket === "" ? "#020202ff" : "#020202ff",
                  borderBottom: "1px solid #7775756e",
                  borderTop: "1px solid #7775756e",
                  textAlign: "center"
                }}
              >
               choose an event
              </li>

              {/* Loading */}
              {loadingMarkets ? (
                <li style={{ padding: "8px", color: "#777" }}>
                  <span className="loader-span"></span>loading...
                </li>
              ) : (
                markets.map((market) => (
                  <li
                    key={market._id}
                    onClick={() => setSelectedMarket(market._id)}
                    className="ads-txts"
                    style={{
                      padding: "10px",
                      background: selectedMarket === market._id ? "#1a1a1a" : "#333333ff",
                      cursor: "pointer",
                      borderBottom: "1px solid #ddd",
                      margin: "0"
                    }}
                  >
                    <div onClick={handleOpenStakePopup} style={{display: "flex"}}>
                      <div className="market-name">{market.name}</div> <div>Payout stake returns: <b style={{color: "#ceba03ff", fontWeight: "600", fontFamily: "sans-serif"}}>x{market.odds}</b></div>
                    </div>
                  </li>
                ))
              )}
            </ul>
  
          </div>
        </div>
   
        {/* ------------------------------------- */}
        {/* Bets History */}
        {/* ------------------------------------- */}
        <div className="more-btn-div">
          <button className="more-btn" onClick={handleOpenBetHistoryPopup}>
            <div className="arrow-button-right-tx" style={{padding: "5px 10px", borderRadius: "24px", border: "2px solid #818181e5", margin: "10px"}}>view bets history</div>
          </button>
        </div>

        <div style={{ padding: "8px", color: "#fcfbfbff" }} className="top-winner-div">
          <div>
            <img src={awardIcon} alt="award" className="award-icon"/>
          </div>
          <div className="top-winner-tx">
            Top event winners
          </div>
        </div>

        {/* Load leaderboard when clicked */}
        <li
          onClick={handleLeaderboard}
          style={{ cursor: "pointer", padding: "6px", color: "#aaa", width: "100px" }}
        >
          Leaderboard
        </li>
        
        <div className="leaderboard-componet-cover">
          <LeaderboardCarousel/>
        </div>

        <div className="award-containner">
          <div className="award-name-containner">AWARDS</div>
          <div className="award-name-img-containner">
            <div className="award-name-img1-div">
              <h3 className="award-name-txt-001">Newbie</h3>
              <img src={newbieAward} alt="newbie"
                className="award-name-img" 
                id="deals-box-1"
                style={{
                  maxWidth: "15vw",
                  maxHeight: "15vh"
                }}
              />
            </div>
            <div className="award-name-img2-div">
              <h3 className="award-name-txt-002">Platinum</h3>
              <img src={platinumAward} alt="platinum" 
                className="award-name-img"
                id="deals-box-1"
                style={{
                  maxWidth: "15vw",
                  maxHeight: "15vh"
                }}
              />
            </div>
            <div className="award-name-img3-div">
              <h3 className="award-name-txt-003">Gold</h3>
              <img src={goldenAward} alt="gold"
                className="award-name-img"
                id="deals-box-1"
                style={{
                  maxWidth: "15vw",
                  maxHeight: "15vh"
                }} 
              />
            </div>
          </div>
        </div>

        <div 
          className="header-txt-format-div"
          style={{
            display: "flex",
            justifyContent: "center",
            color: "white",
            fontWeight: "800",
            textAlign: "center",
            padding: "10px"
          }}
        ><h3 className="header-txt-format">TOP EVENT DEALS TO GET EXCITED ABOUT</h3></div>
        
        <div className="deals-section" style={{maxWidth: "100vw", color: "white"}}>
          <div 
            
          >
          <div 
            className="deals-div"
            style={{
              borderRadius: "5px",
              minHeight: "180px"
            }}
          >
            <div
              style={{
                height: "40px",
                borderBottom: "1px solid #00000056",
                minWidth: "100%"
              }}
            >
              <div 
                style={{
                  padding: "2px 5px",
                  display: "grid", 
                  gridTemplateColumns: " 1fr auto",
                  fontSize: "0.7em",
                  fontFamily: "sans-serif",
                  fontWeight: "600",
                  color: "#000000f1"
                }}
              >
                <div>Ladder challenge <br /> <b>Top Win Special</b></div>
                <div>★ ★ ★ ★ ★</div>
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: "0.7em",
                  fontFamily: "sans-serif",
                  fontWeight: "600",
                  color: "#ffffffd5",
                  padding: "5px"
                }}
              >
                Climb the ladder, dominate the board, and cash out big. <br /> This is where serious winners are made.
              </div>
            </div>

            <div
              style={{
                height: "40px",
                borderTop: "1px solid #00000056"
              }}
            >
              <div className="bonus-div" style={{marginBottom: "2px"}}>
                <div className="bonus-content"><span></span>Place $500 Stake</div>
                <p className="total-txt">Total Payout: $8,150.00</p>
              </div>
            </div>
          </div>
          </div>
          
          <div
            
          >
          <div 
            className="deals-div"
            style={{ 
              borderRadius: "5px",
              height: "180px"
            }}
          >
            <div
              style={{
                height: "40px",
                borderBottom: "1px solid #00000056"
              }}
            >
              <div 
                style={{
                  padding: "2px 5px",
                  display: "grid", 
                  gap: "3px",
                  gridTemplateColumns: " 1fr auto",
                  fontSize: "0.7em",
                  fontFamily: "sans-serif",
                  fontWeight: "600",
                  color: "#000000f1"
                }}
              >
                <div>Weekend Boost <b>Popular Pick</b></div>
                <div>★★★★☆</div>
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: "0.7em",
                  fontFamily: "sans-serif",
                  fontWeight: "600",
                  color: "#ffffffd5",
                  padding: "5px"
                }}
              >
                A fan-favorite deal featuring boosted odds on a high-interest event.
              </div>
            </div>

            <div
              style={{
                height: "40px",
                borderTop: "1px solid #00000056"
              }}
            >
              <div className="bonus-div">
                <div className="bonus-content"><span></span>Place $800 Stake</div>
                <p className="total-txt">Total Payout: $11,000.00</p>
              </div>
            </div>
          </div>
          </div>

          <div
            
          >
          <div 
            className="deals-div"
            style={{ 
              borderRadius: "5px",
              height: "180px"
            }}
          >
            <div
              style={{
                height: "40px",
                borderBottom: "1px solid #00000056"
              }}
            >
              <div 
                style={{
                  padding: "2px 5px",
                  display: "grid", 
                  gap: "3px",
                  gridTemplateColumns: " 1fr auto",
                  fontSize: "0.7em",
                  fontFamily: "sans-serif",
                  fontWeight: "600",
                  color: "#000000f1"
                }}
              >
                <div>High Odds Combo <br /> <b>MAX PROFIT</b></div>
                <div>★★★★☆</div>
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: "0.7em",
                  fontFamily: "sans-serif",
                  fontWeight: "600",
                  color: "#ffffffd5",
                  padding: "5px"
                }}
              >
                Carefully selected outcomes combined for maximum returns. Available for a limited time.
              </div>
            </div>

            <div
              style={{
                height: "40px",
                borderTop: "1px solid #00000056"
              }}
            >
              <div className="bonus-div">
                <div className="bonus-content"><span></span>Place $1,000 Stake</div>
                <p className="total-txt">Total Payout: $20,000.00</p>
              </div>
            </div>
          </div>
          </div>

          <div
            
          >
          <div 
            className="deals-div"
            style={{ 
              borderRadius: "5px",
              height: "180px"
            }}
          >
            <div
              style={{
                height: "40px",
                borderBottom: "1px solid #00000056"
              }}
            >
              <div 
                style={{
                  padding: "2px 5px",
                  display: "grid", 
                  gap: "3px",
                  gridTemplateColumns: " 1fr auto",
                  fontSize: "0.7em",
                  fontFamily: "sans-serif",
                  fontWeight: "600",
                  color: "#000000f1"
                }}
              >
                <div>Safe Play Deal <br /> <b>Steady Returns</b></div>
                <div>★★★☆☆</div>
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: "0.7em",
                  fontFamily: "sans-serif",
                  fontWeight: "600",
                  color: "#ffffffd5",
                  padding: "5px"
                }}
              >
                Lower risk selection designed for consistent and reliable winnings.
              </div>
            </div>

            <div
              style={{
                height: "40px",
                borderTop: "1px solid #00000056"
              }}
            >
              <div className="bonus-div">
                <div className="bonus-content"><span></span>Place $300 Stake</div>
                <p className="total-txt">Total Payout: $700.00</p>
              </div>
            </div>
          </div>
          </div>
        </div>

        <div style={{
          display: "flex",
          justifyContent: "center",
          margin: "5vh 0"
        }}>
          <div style={{
            color: "white",
            maxWidth: "90vw",
            fontFamily: "sans-serif",
            fontWeight: "100"
          }}>
            Step into today’s top opportunity and put your stake where the action is. These premium deals are carefully selected to deliver high value odds, competitive payouts, and real winning potential. Whether you’re chasing big returns or steady gains, this is your chance to stay ahead of the game. Don’t wait until the odds shift secure your position now and turn every stake into a winning moment.
          </div>
        </div>

        <div className="ads-6-containner">
          <div className="ads-name-gold-rush">
            <div className="gold-rush-img-div">
              <img src={goldRush} alt="gold rush" className="gold-rush-img"/>
            </div>
            <div style={{maxHeight: "24.9vw"}}>
              <div className="center-object">
                <h3 className="gold-rush-txt">Success is one Tap Away</h3>
                <button className="start-earning-btn" onClick={handleScrollToDiv}>Start Earning</button>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div>
          {showBetHistoryPopup && (
            <div className="ep-overlay" >
              <div className="ep-modal" onClick={(e) => e.stopPropagation()}>
                <div className="ep-header">
                  <h3>Your Bets</h3>
                  <button className="ep-close" onClick={handleCloseBetHistoryPopup}>×</button>
                </div>
                {/* FIXED — replaced the error-causing line */}
                <div className="bet-history" id="setBetHistory">
                  {loadingBets ? (
                    <p>Loading bets...</p>
                  ) : bets.length === 0 ? (
                    <p>No bets yet.</p>
                  ) : (
                    <ul className="bet-list-tx">
                      {bets.map((bet) => (
                        <li key={bet._id} className="bet-hisstory-lists">
                          <strong>{bet?.event?.title}</strong> – {bet?.market?.name}
                          {" "} <br />
                          stake: ${bet.stake}{" "} <br />
                          status: {bet.status}

                          <div onClick={handleCloseBetHistoryPopup} style={{ width: "150px" }}>
                            <div onClick={handleOpenviewPopup}>
                              <button
                                style={{
                                  marginLeft: "10px",
                                  padding: "10px 0",
                                  background: "#555",
                                  color: "white",
                                  width: "150px",
                                  borderRadius: "10px"
                                }}
                              onClick={() => handleViewReceipt(bet)}
                              >
                                <div >View Receipt</div>
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="ep-actions">
                  <button className="ep-btn" onClick={handleCloseBetHistoryPopup}>OK</button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
        {ShowViewPopup && (
            <div className="ep-overlay" >
              <div className="ep-modal" onClick={(e) => e.stopPropagation()}>
                <div className="ep-header">
                  <h3>Your receipt</h3>
                   <button className="ep-close" onClick={handleCloseviewPopup}>×</button>
                  </div>
                  {/* FIXED — replaced the error-causing line */}
                  <div className="bet-history" id="setBetHistory">
                    {/* ------------------------------------- */}
                    {/* Receipt View */}
                    {/* ------------------------------------- */}
                    <div style={{ marginTop: "10px" }}>
                    {receiptLoading && <p><span className="loader-span"></span>Loading receipt…</p>}
                    {receiptError && (
                      <p style={{ color: "red", fontWeight: "bold" }}>{receiptError}</p>
                    )}
  
                    {receipt && (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateRows: "auto auto",
                          background: "#222",
                          color: "white",
                          borderRadius: "8px",
                        }}
                      >
                        <div
                          style={{
                            padding: "10px"
                          }}
                        >
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr auto"
                            }}
                          >
                            <p style={{display: "flex", justifyContent: "space-between", fontFamily: "sans-serif"}}>
                              {receipt.event}
                              <b 
                                style={{
                                  fontSize: "0.8em", 
                                  padding: "5px", 
                                  background: "#b1b1b1ff", 
                                  borderRadius: "5px",
                                  color: "black",
                                  fontFamily: "sans-serif",
                                  fontWeight: "500",
                                  marginLeft: "10px"
                                }}> {receipt.status}
                              </b> {/*--- Status ---*/}
                            </p> 

                          </div>
                          <p style={{fontFamily: "sans-serif", color: "#ccc"}}>{receipt.market}</p>
                          <p style={{display: "flex",fontFamily: "sans-serif",fontWeight: "100", justifyContent: "space-between"}}><strong>Odds:</strong> {receipt.odds}</p>
                          <p style={{display: "flex",fontFamily: "sans-serif",fontWeight: "100", justifyContent: "space-between"}}><strong>Stake:</strong> ${receipt.stake}</p>
                          <p style={{display: "flex",fontFamily: "sans-serif", justifyContent: "space-between"}}><strong>To Win:</strong> ${receipt.potentialWin}</p>
                        </div>
                        <div 
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                            gap: "12%",
                            borderTop: "1px solid #ffffff96",
                            width: "100%",
                            padding: "0 10px"
                          }}
                        >
                          <p style={{fontSize: "0.8em", fontFamily: "sans-serif"}}>{receipt.receiptId}</p>
                          <p style={{fontSize: "0.8em", fontFamily: "sans-serif"}}> <strong>Date:</strong> 
                            {new Date(receipt.placedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit', 
                              minute: '2-digit',
                              hour12: true // set for AM/PM
                            })}
                          </p>
                        </div>
  
                        <button
                          onClick={handlePDFDownload}
                          style={{
                            marginTop: "10px",
                            padding: "10px",
                            background: "green",
                            color: "white",
                            borderRadius: "5px",
                          }}
                        >
                          Download PDF Receipt
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          {ShowStakePopup && (
            <div className="ep-overlay" >
              <div className="ep-modal" onClick={(e) => e.stopPropagation()} >
                <div className="ep-header">
                  <h3 className="amount-txt">AMOUNT</h3>
                  <button className="ep-close" onClick={handleCloseStakePopup}>×</button>
                </div>
                      
                {/* FIXED — replaced the error-causing line */}
                <div className="stake-input-div">
                  <div>
                    Place your stake for the selected event:
                  </div>
                  <input
                    type="number"
                    value={stake}
                    onChange={(e) => setStake(e.target.value)}
                    placeholder="Enter amount"
                    className="stake-input"
                  />
                  <div>
                    Potential Payout: ${stake && selectedMarket ? (stake * (markets.find(m => m._id === selectedMarket)?.odds || 0)).toFixed(2) : "0.00"}
                  </div>
                  <div style={{ color: "red", fontSize: "0.8em", marginTop: "5px" }}>
                    (Minimum stake: $200)
                  </div>
                  <button onClick={handlePlaceBet} className="place-bet-btn"><div onClick={handleCloseStakePopup}>Place Bet</div></button>
                </div>

                <div className="ep-actions">
                  <button className="ep-btn" onClick={handleCloseStakePopup}>CLOSE</button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          {ShowErrorPopup && (
            <div className="ep-overlay" >
              <div className="ep-modal" onClick={(e) => e.stopPropagation()}>
                <div className="ep-header">
                  <h3>Message!</h3>
                  <button className="ep-close" onClick={handleCloseErrorPopup}>×</button>
                </div>
                      
                {/* FIXED — replaced the error-causing line */}
                <div>
                  {/* Error */}
                  {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
                <div className="ep-actions">
                  <button className="ep-btn" onClick={handleCloseErrorPopup}>OK</button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          {ShowMassagePopup && (
            <div className="ep-overlay" >
              <div className="ep-modal" onClick={(e) => e.stopPropagation()}>
                <div className="ep-header">
                  <h3>Message!</h3>
                  <button className="ep-close" onClick={handleCloseMassagePopup}>×</button>
                </div>
                {betPlaced && (
                  <div className="confirmation-div">
                    <div className="success-container">
                      <div className="check-circle">
                        <div className="checkmark" />
                      </div>
                        {/* confetti */}
                      <span className="confetti c1" />
                      <span className="confetti c2" />
                      <span className="confetti c3" />
                      <span className="confetti c4" />
                    </div>
                  </div>
                )}     
                {/* FIXED — replaced the error-causing line */}
                <div style={{display: "flex", justifyContent: "center"}}>{massageline}</div>
                <div className="ep-actions">
                  <button className="ep-btn" onClick={handleCloseMassagePopup}>OK</button>
                </div>
              </div>
            </div>
          )}
        </div>
        </div>

        <footer className="bet-footer">
          <div className="bet-footer-tx-001-div">
            <p className="bet-footer-tx-001">Copyright © 2019 - 2025 Clutchden. All rights reserved and protected by law.</p>
          </div>
          <div style={{ display: "flex", justifyContent: "center"}}>
            <div className="bet-footer-tx-002-div">18+</div>
            <div className="bet-footer-tx-003-div">
              <Link to="/terms-of-service" className="bet-footer-tx-003"> Learn more about our Terms of Service </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
