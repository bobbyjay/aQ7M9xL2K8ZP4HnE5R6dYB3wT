// ../pages/Home.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from "react-router-dom";
import { useMenu, MenuProvider } from "../context/MenuContext";
import Footersection from '../components/footer';
import aiIcon from '../assets/ai_Icon.svg';
import safeIcon from '../assets/safe_icon.svg';
import facebookLogo from '../assets/facebookLogo.svg';
import instagramLogo from '../assets/instagram.svg';
import twitterLogo from '../assets/twitter.svg';
import '../styles/homepage.css';
import '../styles/button.css';
import '../styles/font_stylesheet.css';
import clutchdenem from "../assets/clutchdenEmbedded.svg";
import addimage1 from '../assets/images/20251124_160453012.jpg';
import addimage2 from '../assets/images/20251124_160453256.jpg';
import addimage3 from '../assets/images/20251124_160430700.png';
import addimage4 from '../assets/images/20251124_1604530.png';

function HomeContent() {
  const { setShowMenuBar } = useMenu();
  
  return (
    <MenuProvider>
    <div className="homepage-root" onClick={() => setShowMenuBar(false)}>
      {/* NAVBAR */}
      <header className="home-header">
        <nav className="stagnantnav">
          <Navbar />
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="home-main">

        {/* HERO SECTION */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h4 className="hero-sub">THE CHALLENGE ARENA FOR REAL ONES</h4>
              <h1 className="hero-title">BIG TIME WINS</h1>
              <p className="hero-desc">
                Join ClutchDen where elite analysis, community power, and
                disciplined strategy come together to create consistent results.
              </p>
              <div className="btn0001-div">
                <button 
                  className="glass-btn"
                  onClick={() => (window.location.href = "/bets")}
                >WIN NOW</button>
              </div>
            </div>

            <div className="hero-image-wrap">
              <div className="hero-image"></div>
            </div>
          </div>
        </section>

        {/* PERFORMANCE METRICS */}
        <section className="metrics-section">
          <h2 className="section-title">Platform Performance Overview</h2>
          <p className='ads-txts'>
            Our results are driven by data, discipline, and transparency not hype.
          </p>

          <div className="metrics-grid">
            <div className="metric-card">
              <h3 className="metric-card-No">72%</h3>
              <p className="metric-card-txt">Historical Win Rate</p>
            </div>
            <div className="metric-card">
              <h3 className="metric-card-No">+38%</h3>
              <p className="metric-card-txt">Average ROI per Cycle</p>
            </div>
            <div className="metric-card">
              <h3 className="metric-card-No">1,200+</h3>
              <p className="metric-card-txt">Successful AllStake Cycles</p>
            </div>
            <div className="metric-card">
              <h3 className="metric-card-No">24/7</h3>
              <p className="metric-card-txt">Market Monitoring</p>
            </div>
          </div>
        </section>

        {/* ADS / PROMOTIONS */}
        <section>
          <div></div>
          <div><h2 className='heading-txt'>How Can We Help You Today?</h2></div>
        </section>
        <section className="ads-section">
          <div className='ads-promo'>
            <div className='ads-content-div'>
              <h3>Start Building Your Financial Strength</h3>
              <p className='ads-txts'>For a limited time, get a $50 when you open any new account, and what helps you reach your financial goals.</p>
              <ul className='ads-txts'>
                <li className='list-contents-for-ads'>
                  <div className='style-checkmark'><span className='check-ani'></span></div>
                  <div className='list-contents-for-ads-txt'>No minimum balance required</div>
                </li>
                <li className='list-contents-for-ads'>
                  <div className='style-checkmark'><span className='check-ani'></span></div>
                  <div className='list-contents-for-ads-txt'>Free online and mobile banking services</div>
                </li>
                <li className='list-contents-for-ads'>
                  <div className='style-checkmark'><span className='check-ani'></span></div>
                  <div className='list-contents-for-ads-txt'>24/7 customer support</div>
                </li>
              </ul>
              <button 
                className='glass-btn'
                onClick={() => (window.location.href = "/Profile")}
              >🡢 Open Account Now
              </button>
            </div>
          </div>
          <div className='ads-promo'>
            <div className='ads2-content-div'>
              <div>
                <div className='ai-icon-div'>
                  <img src={aiIcon} alt="ai" style={{width: "32px"}}/>
                </div>
              </div>
              <h3 className='ad-tittle-name'>Start Winning <span className='doller-ani'>$</span> With Our AI Powered Analysts</h3>
              <div>
                <p className='ads-txts'>Our AI Powered analysts evaluate fixtures using multi layer models that consider form trends, matchup data, and market movement. Only selections that pass strict confidence thresholds reach the AllStake stage.</p>
              </div>
              <button 
                className='glass-btn'
                onClick={() => (window.location.href = "/bets")}
              >🡢 Try Out AI Pro</button>
            </div>
          </div>
          <div className='ads-promo'>
            <div className='ads3-content-div'>
              <div>
                <div className='ai-icon-div'>
                  <img src={safeIcon} alt="safe" style={{width: "32px"}}/>
                </div>
              </div>
              <h3>Risk-Aware Participation <span className='star'>★</span></h3>
              <p className='ads-txts'>
                Our systems are designed to encourage responsible participation.
                We emphasize bankroll awareness, controlled exposure, and long term
                sustainability over short term excitement.
              </p>
              <button 
                className='glass-btn'
                onClick={() => (window.location.href = "/Profile")}
              >🡢 Open Account Now</button>
            </div>
          </div>
        </section>

        {/* INFORMATION SECTION */}
        <section className="info-section">
          <article>
            <h2 className='heading-txt-1'>ClutchDen: Built for Smart Collective Earnings</h2>
            <p className='ads-txts'>
              ClutchDen is a performance focused sports intelligence community
              designed for individuals who value accuracy, strategy, and
              sustainability. Through structured analysis and collective
              participation, members gain access to opportunities typically
              reserved for high volume professionals.
            </p>
          </article>

          <article>
            <h2 className='heading-txt-1'>What Is the AllStake System?</h2>
            <p className='ads-txts'>
              AllStake is ClutchDen’s proprietary collective staking model.
              Participants pool capital into a unified position, allowing
              greater market leverage, reduced volatility, and more disciplined
              execution.
            </p>
          </article>

          <article>
            <h2 className='heading-txt-1' style={{padding: "10px"}}>How It Works</h2>
            <ol>
              <li className='ads-txts'>
                <strong>Capital Pooling:</strong> Members opt into a shared
                staking cycle.
              </li>
              <li className='ads-txts'>
                <strong>Professional Analysis:</strong> Data‑driven selections
                pass multiple validation layers.
              </li>
              <li className='ads-txts'>
                <strong>Unified Execution:</strong> One strategic stake is
                deployed.
              </li>
              <li className='ads-txts'>
                <strong>Transparent Distribution:</strong> Returns are shared
                fairly based on contribution.
              </li>
            </ol>
          </article>
        </section>

          {/* WHY CLUTCHDEN */}
        <section className="trust-section">
          <h2 className='heading-txt-1' style={{marginBottom: "32px", textAlign: "center"}}>Why Professionals Choose ClutchDen</h2>
          <div className="trust-grid">
            <div>
              <h4>Data Before Emotion</h4>
              <p className='ads-txts'>Every selection is driven by probability modeling, historical performance, and real market signals never impulse.</p>
            </div>
            <div>
              <h4>Collective Risk Control</h4>
              <p className='ads-txts'>Pooling capital reduces volatility and protects members from isolated decision errors.</p>
            </div>
            <div>
              <h4>Transparent Results</h4>
              <p className='ads-txts'>Performance metrics are tracked, reviewed, and shared openly with the community.</p>
            </div>
            <div>
              <h4>Built for Sustainability</h4>
              <p className='ads-txts'>ClutchDen prioritizes consistency and longevity over short term hype.</p>
            </div>
          </div>
        </section>

        {/* ANALYSIS PHILOSOPHY */}
        <section className="philosophy-section">
          <h2 className='heading-txt-1'>Our Analysis Philosophy</h2>
          <p className='ads-txts'>
            Winning consistently isn’t about predicting outcomes it’s about understanding probability, risk, and value.
          </p>
          <p className='ads-txts'>
            Our analysts evaluate fixtures using multi layer models that consider form trends, matchup data, market movement, and historical inefficiencies. Only selections that pass strict confidence thresholds reach the AllStake stage.
          </p>
        </section>

        {/* RESPONSIBILITY */}
        <section className="responsibility-section">
          <h2 className='heading-txt-1'>Transparency & Responsibility</h2>
          <p className='ads-txts'>
            ClutchDen does not promise guaranteed returns. Participation involves risk, and members are encouraged to engage responsibly and within their financial limits.
          </p>
          <p className='ads-txts'>
           Our platform is designed to educate, inform, and support disciplined decision making not reckless behavior.
          </p>
        </section>

        {/* FINAL CTA */}
        <section className="cta-section">
          <h2 className='heading-txt-1'>Ready to Compete Smarter?</h2>
          <p className='ads-txts'>Join a community built on intelligence, discipline, and collective strength.</p>
          <button className="glass-btn" style={{ margin: "20px"}}>Enter ClutchDen</button>
        </section>

        <section className="metrics-section">
          <h2 className="section-title">Built for Sustainability</h2>
          <p className='ads-txts'>
            Winning consistently isn’t about predicting outcomes it’s about understanding probability, risk, and value.
          </p>

          <div className="metrics-grid">
            <div className="metric-card-1"> 
              <div className='ad-img-containner-div'>
                <img src={addimage2} alt="ads" className='adscenter' style={{width: "200px"}}/>
              </div>
            </div>
          </div>
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

        <section className='trust-section'>
          <div className='ambient-layer'>
            <div className='circle-roam'><div className='circle-breathe'></div></div>
          </div>
          <div style={{zIndex: "1"}}>
            <img src={clutchdenem} alt="logo" style={{width: "200px"}}/>
          </div>
          <div style={{zIndex: "1"}}>
            <p className='ads-txts'>
              Every customer interaction is handled with transparency, respect, and
              accountability. Our support systems are built to ensure clarity and
              confidence at every stage of your journey.
            </p>
          </div>
          <div className='social-media-icon-grid-box' style={{zIndex: "1"}}>
            <div className='social-media-icon-div' style={{marginTop: "20px"}}>
              <Link to="https://www.instagram.com/clutchden.online?igsh=c2tvbHljOXdsd2g3" target="_blank" rel="noopener noreferrer" style={{margin: "0", padding: "0"}}>
                <img src={instagramLogo} alt="instagram" className='social-media-icon' style={{maxWidth: "16px", minWidth: "16px"}}/>
              </Link>
              <Link to="https://www.facebook.com/profile.php?id=100089899208648" target="_blank" rel="noopener noreferrer" style={{margin: "0", padding: "0"}}>
                <img src={facebookLogo} alt="facebook" className='social-media-icon' style={{maxWidth: "16px", minWidth: "16px"}}/>
              </Link>
              <Link to="https://twitter.com/clutchden" target="_blank" rel="noopener noreferrer" style={{margin: "0", padding: "0"}}>
                <img src={twitterLogo} alt="twitter" className='social-media-icon' style={{maxWidth: "16px", minWidth: "16px"}}/>
              </Link>
            </div>
          </div>
          <div className='links-section-grid-box' style={{zIndex: "1"}}>
            <div className='links-section'>
              <div className='links-div-containner-1'><span className='stroke-line'></span><h3 className='link-head-txt'>Quick Links</h3></div>
              <div className='links-div-containner' style={{display: "flex"}}>
                <div style={{minHeight : "25px", minWidth: "25px", maxWidth: "25px", maxHeight: "25px"}} >
                  <span className='forword-arrow'></span>
                </div> 
                <Link to="/about" style={{margin: "0", padding: "0"}} ><p className='quick-links-txts' >About Us</p></Link>
              </div>
              <div className='links-div-containner'>
                <div style={{minHeight : "25px", minWidth: "25px", maxWidth: "25px", maxHeight: "25px"}} >
                  <span className='forword-arrow'></span>
                </div>
                <Link to="/terms-of-service" style={{margin: "0", padding: "0"}} >
                  <p className='quick-links-txts' >Services</p>
                </Link>
              </div>
              <div className='links-div-containner'>
                <div style={{minHeight : "25px", minWidth: "25px", maxWidth: "25px", maxHeight: "25px"}} >
                  <span className='forword-arrow'></span>
                </div>
                <Link to="/support-page" style={{margin: "0", padding: "0"}} >
                  <p className='quick-links-txt' >Contact</p>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className='line-role'><span className='the-line'></span></section>
      </main>

      {/* FOOTER */}
      <footer className="home-footer">
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

