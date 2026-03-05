// ../pages/Home.jsx
import React from 'react';
import HmNav from '../components/HmNav';
import { Link } from "react-router-dom";
import { useMenu, MenuProvider } from "../context/MenuContext";
import { useAuth } from "../context/AuthContext";
import Footersection from '../components/footer';
import '../styles/homepage.css';
import '../styles/button.css';
import '../styles/font_stylesheet.css';
import addimage1 from '../assets/images/20251124_160453012.jpg';
import addimage2 from '../assets/images/20251124_160453256.jpg';
import addimage3 from '../assets/images/20251124_160430700.png';
import coin1x from '../assets/Coins-ftsy-spts-ptrms-emb@1x.png';
import coin2x from '../assets/Coins-ftsy-spts-ptrms-emb@2x.png';
import coin3x from '../assets/Coins-ftsy-spts-ptrms-emb@3x.png';
import goldRush from "../assets/images/soccer_diagram.png";
import searchIcon from "../assets/searchIcon.svg";
import soccerIcon from "../assets/soccerIcon.svg";
import basketballIcon from "../assets/basketballIcon.svg";
import tennisIcon from "../assets/tennisIcon.svg";
import baseballIcon from "../assets/baseballIcon.svg";
import cs2Icon from "../assets/cs2Icon.svg";
import fireIcon from "../assets/fire.svg";

// official league partners img
import nbaImg from '../assets/NBA_Logo.svg';
import mlbImg from '../assets/MLB_Logo.svg';
import nflImg from '../assets/NFL_Logo.svg';
import premierLeagueImg from '../assets/Premier_League.svg';

import { useEffect, useState, useRef, useMemo} from 'react';
function HomeContent() {
  const { 
    getLatestNews 
  } = useAuth();
  const { setShowMenuBar } = useMenu();
  const [isFixed, setIsFixed] = useState(false);
  const navbarRef = useRef(null);
  const bannerRef = useRef(null);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const searchRef = useRef(null);

  /*----------- LATEST NEWS ------------*/
  const [latestNews, setLatestNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState(null);

  const sports = [
    "Football",
    "Basketball",
    "Tennis",
    "Baseball",
    "Cricket",
    "Hockey",
    "MMA",
    "Boxing",
    "Rugby",
    "Soccer",
    "Swimming",
    "Volleyball",
    "Wrestling",
    "Table Tennis",
    "Golf",
    "Skiing",
    "Skateboarding",
    "Track & Field",
    "Gymnastics",
    "Badminton"
  ];


  // handler for "View All" button on click shows all the popular sports features 
  const handleViewAllBtn = () => {
    setShowAllFeatures(true);
  }
  
  useEffect(() => {
    if (!bannerRef.current || !navbarRef.current) return;
    if (!imageLoaded) return; // wait until image is loaded

    // Store navbar height for placeholder when fixed
    setNavbarHeight(navbarRef.current.offsetHeight);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsFixed(!entry.isIntersecting);
      },
      { root: null, threshold: 0 }
    );

    observer.observe(bannerRef.current);

    return () => observer.disconnect();
  }, [imageLoaded]); // re-run effect when imageLoaded changes

  useEffect(() => { 
    const img = new Image(); img.onload = () => setImageLoaded(true); 
    img.src = coin1x; 
  }, []);
  
  // --- Filtered Results (Memoized + Debounced) ---
  const filteredSports = useMemo(() => {
    if (!search.trim()) return [];
    const lower = search.toLowerCase();
    return sports.filter((sport) => sport.toLowerCase().includes(lower));
  }, [search, sports]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setResults(filteredSports.slice(0, 10));
    }, 150); // debounce 150ms
    return () => clearTimeout(timer);
  }, [filteredSports]);

  // --- Keyboard Navigation ---
  const handleKeyDown = (e) => {
    if (!results.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    }
    if (e.key === "Enter") {
      if (activeIndex >= 0) {
        e.preventDefault();
        selectItem(results[activeIndex]);
      }
    }
    if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };
  
  /* ---------------- SELECT ITEM ---------------- */
  const selectItem = (sport) => {
    setSearch(sport);
    setShowDropdown(false);
    setActiveIndex(-1);
  };

  // --- Click Outside to Close Dropdown ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- SHOW DROPDOWN ONLY WHEN TYPING ---------------- */
  useEffect(() => {
    if (search.trim()) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
      setActiveIndex(-1);
    }
  }, [search]);

  /* ---------------- FETCH LATEST NEWS ---------------- */
  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        setNewsLoading(true);

        const res = await getLatestNews();

        // ✅ check if array
        if (Array.isArray(res)) {
          setLatestNews(res);
          setNewsError(null);
        } else {
          setLatestNews([]);
          setNewsError("Failed to fetch latest news.");
          console.error("Failed to fetch latest news: Response is not an array");
        }
 
      } catch (err) {
        console.error("Failed to fetch latest news:", err);
        setNewsError("Failed to fetch latest news.");
        setLatestNews([]);
      } finally {
        setNewsLoading(false);
      }
    };

    fetchLatestNews();
  }, [getLatestNews]);

  const fetchedNews = useRef(false);

  /* ---------------- Prevent double API calls + Retry Logic ---------------- */
  useEffect(() => {
    if (fetchedNews.current) return;
    fetchedNews.current = true;

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    const fetchLatestNews = async () => {
      const MAX_RETRIES = 3;
      const RETRY_DELAY = 2000; // 2 seconds between retries

      setNewsLoading(true);

      try {
        let attempt = 0;
        let data = null;

        while (attempt < MAX_RETRIES) {
          try {
            data = await getLatestNews();
  
            if (data && data.length > 0) {
              break; // success
            }

          } catch (error) {
            console.warn(`News fetch attempt ${attempt + 1} failed`);
          }

          attempt++;

          if (attempt < MAX_RETRIES) {
            await delay(RETRY_DELAY); // wait before retry
          }
        }

        setLatestNews(data || []);

      } catch (error) {
        console.error("Failed to fetch latest news:", error);
        setLatestNews([]);
      } finally {
        setNewsLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  if (!imageLoaded) {
    return (
      <div className="loader-overlay">
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
      </div>
    );
  }

  return (
    <MenuProvider>
    <div className="homepage-root" onClick={() => setShowMenuBar(false)}>
      {/* NAVBAR */}
      <header className="home-header">
        <div ref={bannerRef} className='top-adds-banna'>ads stays here</div>
        <nav ref={navbarRef} className={`stagnantnav ${isFixed ? 'fixed' : ''}`}>
          <HmNav />
        </nav>
      </header>
      {/* Placeholder to prevent jump */}
      {isFixed && <div style={{ height: navbarHeight }} />}

      {/* MAIN CONTENT */}
      <main className="home-main">

        {/* HERO SECTION */}
        <section className="hero-section">
          <div className='wlc-banna-div'>
            <div className='wlc-banna'>
              <img 
                src={coin1x} 
                alt="welcome banner" 
                className='wlc-banna-img'
                srcSet={`${coin1x} 1x, ${coin2x} 2x, ${coin3x} 3x`}
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            <div className='wlc-banna-content'>
              <h2 className='wlc-banna-txt'>THE GOLD STANDARD OF FANTASY SPORTS IS HERE</h2>
              <p className='wlc-banna-desc'>Join millions of users who are already enjoying the best fantasy sports experience in the industry.</p>
            </div>
          </div>
          {/* search for sports */}
          <div className='search-bar-container-div'>
            <div className='search-bar-container' ref={searchRef}>
              <div className='center-searchIcon'>
                <img 
                  src={searchIcon} 
                  alt="search icon" 
                  className='searchIcon'
                />
              </div>
              <form onSubmit={(e) => e.preventDefault()} className='search-form-containner'>
                <input 
                  type="text" 
                  name="sports-search-engin" 
                  id="sports-search-engin" 
                  placeholder="Search for a sports game ..."
                  className='search-input-box'
                  value={search ?? ""} 
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                />
                <button type="submit" className="search-btn">Search</button>
              </form>
            </div>
            <div className='search-bar-Dropdown-container' ref={searchRef}>
                  {showDropdown && results.length > 0 && (
                    <div className="search-dropdown">
                      {results.map((sport, index) => {
                        const regex = new RegExp(`(${search})`, "gi");
                        const highlighted = sport.replace(
                          regex,
                          (match) => `<span class="search-highlight">${match}</span>`
                        );
                        return (
                          <div
                            key={index}
                            className={`search-item ${index === activeIndex ? "active" : ""}`}
                            onClick={() => selectItem(sport)}
                            dangerouslySetInnerHTML={{ __html: highlighted }}
                          />
                        );
                      })}
                    </div>
                  )}
            </div>
          </div>

          {/* types of sports */}
          <div className='types-of-sports-div'>
            <div className='scroll-typ-sports'>
              <div className='sports-ty-soccer'>
                <div className='sport-icon-div'><img src={soccerIcon} alt="soccer" className='sportIcon' /></div>
                <div className='sports-ty-name'>soccer</div>
              </div>
              <div className='sports-ty-nba'>
                <div className='sport-icon-div'><img src={basketballIcon} alt="basketball" className='sportIcon' /></div>
                <div className='sports-ty-name'>basketball</div>
              </div>
              <div className='sports-ty-tennis'>
                <div className='sport-icon-div'><img src={tennisIcon} alt="tennis" className='sportIcon' /></div>
                <div className='sports-ty-name'>tennis</div>
              </div>
              <div className='sports-ty-mlb'>
                <div className='sport-icon-div'><img src={baseballIcon} alt="baseball" className='sportIcon' /></div>
                <div className='sports-ty-name'>baseball</div>
              </div>
              <div className='sports-ty-cs2'>
                <div className='sport-icon-div'><img src={cs2Icon} alt="cs2" className='sportIcon' /></div>
                <div className='sports-ty-name'>cs2</div>
              </div>
            </div>
          </div>

          {/* line divider */}
          <div className='line-divider'>
            <span className='line-divider-line' />
          </div>

          {/* populer sports */}
          <div className='popular-header-txt-cont'>
            <div className='fireEmojiIcon-div'>
              <img src={fireIcon} alt="fire" className='fireEmojiIcon'/>
            </div>
            <h2 className='popular-heading-txt'>Explore Our Popular Sports AI features</h2>
            <button className='view-all-btn' onClick={handleViewAllBtn}>View All</button>
          </div>
          <div className='populer-sports-div-containner'>
            <div className='populer-sports-div'>
              <div className='populer-sports-grid'>
                <div className='populer-sport-card'>
                  <div className='populer-sport-image-div'>
                    <img src={goldRush} alt="gold rush" className='populer-sport-image' />
                  </div>
                  <div className='populer-sport-content'>
                    <h3 className='populer-sport-title'>Premier League Gold Rush</h3>
                    <p className='populer-sport-desc'>Experience the thrill of the Premier League with our Gold Rush feature. Get real-time insights, expert analysis, and exclusive betting opportunities to strike gold on your favorite teams and players.</p>
                    <button 
                      className='click-to-try-btn'
                      onClick={() => (window.location.href = "/bets")}
                    >Try Gold Rush</button>
                  </div>
                </div>
                {/* Add more popular sport cards as needed */}
              </div>
            </div>

            <div className='populer-sports-div'>
              {/* Add more popular sport cards as needed */}
              <div className='populer-sport-card'>
                <div className='populer-sport-image-div'>
                  <img src={addimage1} alt="gold rush" className='populer-sport-image' />
                </div>
                <div className='populer-sport-content'>
                  <h3 className='populer-sport-title'>AI Pro: AllSport Analysis</h3>
                  <p className='populer-sport-desc'>Unlock the power of AI Pro for comprehensive analysis across all sports. From soccer to basketball, our AI-driven insights provide you with the edge you need to make informed decisions and elevate your betting strategy.</p>
                  <button 
                    className='click-to-try-btn'
                    onClick={() => (window.location.href = "/bets")}
                  >Try AI Pro</button>
                </div>
              </div>
            </div>

            <div className='populer-sports-div' style={{display: showAllFeatures ? "block" : "none"}}>
              {/* Add more popular sport cards as needed */}
              <div className='populer-sport-card'>
                <div className='populer-sport-image-div'>   
                  <img src={addimage2} alt="gold rush" className='populer-sport-image' />
                </div>
                <div className='populer-sport-content'>
                  <h3 className='populer-sport-title'>Safe Bet: Risk-Aware Insights</h3>
                  <p className='populer-sport-desc'>Introducing Safe Bet, our risk-aware insights feature designed to help you make informed decisions while managing your exposure. With a focus on responsible betting, Safe Bet provides data-driven recommendations that prioritize sustainability and long-term success.</p>
                  <button
                    className='click-to-try-btn'
                    onClick={() => (window.location.href = "/bets")}
                  >Try Safe Bet</button>
                </div>
              </div>
            </div>

            <div className='populer-sports-div' style={{display: showAllFeatures ? "block" : "none"}}>
              {/* Add more popular sport cards as needed */}
              <div className='populer-sport-card'>
                <div className='populer-sport-image-div'>
                  <img src={addimage3} alt="gold rush" className='populer-sport-image' />
                </div>
                <div className='populer-sport-content'>
                  <h3 className='populer-sport-title'>ClutchDen Embedded: Real-Time Analytics</h3>
                  <p className='populer-sport-desc'>Experience the future of sports betting with ClutchDen Embedded. Our real-time analytics feature provides you with instant insights and data-driven recommendations directly within your betting interface, allowing you to make informed decisions at the moment of action.</p>
                  <button
                    className='click-to-try-btn'
                    onClick={() => (window.location.href = "/bets")}
                  >Try ClutchDen Embedded</button>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* NEWS SECTION */}
        <section className="latest-news">

          <div className="news-header">
            <h2>Latest Sports News</h2>
          </div>

          {/* Loading State */}
          {newsLoading && (
            <div className="news-grid skeleton-grid">

              <div className="featured-news skeleton"></div>

            </div>
          )}

          {/* No Data */}
          {!newsLoading && !newsError && latestNews.length === 0 && (
            <p>No news available.</p>
          )}

          {/* Actual Content */}
          {!newsLoading && latestNews.length > 0 && (
            <div className="news-grid">

              <div className="featured-news">
                <img
                  src={latestNews[0].image?.url || "/images/placeholder.jpg"}
                  alt={latestNews[0].image?.alt || latestNews[0].title}
                />
                <div className="featured-overlay">
                  <h3>{latestNews[0].title}</h3>
                  <p>{latestNews[0].summary}</p>
                </div>
              </div>

              <div className="news-list">
                {latestNews.slice(1, 5).map((news) => (
                  <div key={news.id} className="news-card">
                    <img src={news.image} alt={news.title} />
                    <div className="news-content">
                      <h4>{news.title}</h4>
                      <p>{news.summary}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </section>

        <section className="trust-section">
          <h2 className='heading-txt-1' style={{marginBottom: "32px", textAlign: "center"}}>Hear From Our Customers</h2>
          <p className='ads-txts' style={{marginBottom: "26px", textAlign: "center"}}>
            Real feedback from verified users who trust ClutchDen for transparency,
            performance, and consistent payouts.
          </p>

          <div className="trust-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">
                <span className='star-energy'>⭐</span><span className='star-energy'>⭐</span><span className='star-energy'>⭐</span><span className='star-energy'>⭐</span><span className='star-energy'>⭐</span>
              </div>
              <p className="testimonial-quote" >
                “I am impressed with the customer service and speed of payout.”
              </p>
              <div className="testimonial-author">
                <strong>Sarah Morris</strong>
                <span>Verified Customer</span>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">
                <span className='star-energy'>⭐</span><span className='star-energy'>⭐</span><span className='star-energy'>⭐</span><span className='star-energy'>⭐</span><span className='star-energy'>⭐</span>
              </div>
              <p className="testimonial-quote">
                “Excellent service and competitive rates. Highly recommended!”
              </p>
              <div className="testimonial-author">
                <strong>John Davis</strong>
                <span>Verified Customer</span>
              </div>
            </div>
  
            <div className="testimonial-card">
              <div className="testimonial-stars">
                <span className='star-energy'>⭐</span><span className='star-energy'>⭐</span><span className='star-energy'>⭐</span><span className='star-energy'>⭐</span><span className='star-energy'>⭐</span>
              </div>
              <p className="testimonial-quote">
                “The mobile experience is seamless and customer support is top-notch.”
              </p>
              <div className="testimonial-author">
                <strong>Emily Johnson</strong>
                <span>Verified Customer</span>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">
                <span className='star-energy'>⭐</span><span className='star-energy'>⭐</span><span className='star-energy'>⭐</span><span className='star-energy'>⭐</span><span className='star-energy'>⭐</span>
              </div>
              <p className="testimonial-quote">
                “ClutchDen delivers consistent results with full transparency. The analytics,
                win history, and payout process give me complete confidence in every stake.”
              </p>
              <div className="testimonial-author">
                <strong>Michael Turner</strong>
                <span>Verified Customer</span>
              </div>
            </div>
          </div>
        </section>

        <section className='line-role'><span className='the-line'></span></section>
      </main>

      {/* FOOTER */}
      <footer className="home-footer">
        <div className='official-league-partners-container'>

          <div>
            <h2 className='official-league-partners-heading-txt'>Official League Partners</h2>
          </div>
      
          <div className='official-league-partners-div-1'>

            <div className='official-league-partners-div-1-1'>
              <img 
                src={premierLeagueImg} 
                alt="premier league" 
                className='official-league-partners-img'
              />
            </div>
            <div className='official-league-partners-div-1-1'>
              <img 
                src={nbaImg} 
                alt="nba" 
                className='official-league-partners-img'
              />
            </div>
            <div className='official-league-partners-div-1-1'>
              <img 
                src={nflImg} 
                alt="nfl" 
                className='official-league-partners-img'
              />
            </div>
            <div className='official-league-partners-div-1-1'>
              <img 
                src={mlbImg} 
                alt="mlb" 
                className='official-league-partners-img'
              />
            </div>

          </div>
          <div>
            <span className='official-league-partners-divider-line' />
          </div>
        </div>
        <div>
          <div className='footer-content-div'>

            <div className='platform-content-div'>
              <h3 className='footer-heading'>PLATFORM</h3>
              <ul className='footer-list'>
                <li><Link to="/market-insights" className='footer-link-txt'>Market Insights</Link></li>
                <li><Link to="/OddS" className='footer-link-txt'>Odds</Link></li>
                <li><Link to="/contact" className='footer-link-txt'>DFS</Link></li>
              </ul>
            </div>

            <div className='platform-content-div'>
              <h3 className='footer-heading'>AI HUB</h3>
              <ul className='footer-list'>
                <li><Link to="/bets" className='footer-link-txt'>Predictive Analytics</Link></li>
                <li><Link to="/profile" className='footer-link-txt'>Trend Tracking</Link></li>
                <li><Link to="/contact" className='footer-link-txt'>Injury Probability</Link></li>
                <li><Link to="/blog" className='footer-link-txt'>The Clutchden Blog</Link></li>
              </ul>
            </div>

            <div className='platform-content-div'>
              <h3 className='footer-heading'>LEGAL & COMPLIANCE</h3>
              <ul className='footer-list'>
                <li><Link to="/terms-of-service" className='footer-link-txt'>Terms of Service</Link></li>
                <li><Link to="/privacy-policy" className='footer-link-txt'>Privacy Policy</Link></li>
                <li><Link to="/careers" className='footer-link-txt'>Careers</Link></li>
              </ul>
            </div>

            <div className='platform-content-div'>
              <h3 className='footer-heading'>CONNECT</h3>
              <ul className='footer-list'>
                <li><Link to="/support" className='footer-link-txt'>Support</Link></li>
                <li><Link to="/affiliate-program" className='footer-link-txt'>Affiliate Program</Link></li>
                <li><Link to="/social-media" className='footer-link-txt'>Social Media</Link></li>
              </ul>
            </div>

          </div>
        </div>
        <Footersection />
      </footer>
    </div>
    </MenuProvider>
  );
}

export default function Home() {
  return (
    <MenuProvider>
      <HomeContent />
    </MenuProvider>
  );
}

