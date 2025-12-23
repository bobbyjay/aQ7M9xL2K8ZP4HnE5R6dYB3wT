import React from 'react'
import "../styles/aboutpage.css";

export default function About() {
  return (
    <div className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <h1 style={{color: "white", fontFamily: "sans-serif", fontWeight: "800"}}>THE CHALLENGE ARENA FOR REAL ONES</h1>
        <p style={{color: "#ccc", fontFamily: "sans-serif"}}>
          ClutchDen is a performance focused sports intelligence platform built
          for individuals who value discipline, accuracy, and long-term
          sustainability over noise and speculation.
        </p>
      </section>

      {/* MISSION */}
      <section className="about-section">
        <h2 style={{color: "#ccc", fontFamily: "sans-serif", fontWeight: "800"}}>Our Mission</h2>
        <p style={{color: "#ccc", fontFamily: "sans-serif"}}>
          To empower a disciplined community with professional-grade analysis,
          transparent performance data, and systems designed for controlled,
          intelligent participation.
        </p>
      </section>

      {/* DIFFERENTIATORS */}
      <section className="about-section">
        <h2 style={{color: "#ccc", fontFamily: "sans-serif", fontWeight: "800"}}>What Makes ClutchDen Different</h2>

        <div className="about-grid">
          <div className="about-card">
            <h3>Data Before Emotion</h3>
            <p>
              Every decision is driven by probability modeling, historical
              performance, and real-time market signals — never impulse.
            </p>
          </div>

          <div className="about-card">
            <h3>Collective Strength</h3>
            <p>
              Our collective participation systems reduce volatility and
              strengthen execution typically reserved for high-volume
              professionals.
            </p>
          </div>

          <div className="about-card">
            <h3>Transparent Performance</h3>
            <p>
              Win rates, ROI cycles, and staking outcomes are tracked and shared
              openly to build real trust.
            </p>
          </div>

          <div className="about-card">
            <h3>Built for Sustainability</h3>
            <p>
              We prioritize consistency and longevity over short-term hype or
              reckless exposure.
            </p>
          </div>
        </div>
      </section>

      {/* ALLSTAKE */}
      <section className="about-section dark">
        <h2>The AllStake System</h2>
        <p>
          AllStake is ClutchDen’s proprietary collective staking framework.
          Participants pool capital into unified positions, enabling smarter
          risk distribution and disciplined execution.
        </p>

        <ul className="about-list">
          <li><strong>Capital Pooling:</strong> Members opt into a shared cycle</li>
          <li><strong>Professional Analysis:</strong> Multi-layer validation</li>
          <li><strong>Unified Execution:</strong> One strategic position</li>
          <li><strong>Transparent Distribution:</strong> Fair returns by contribution</li>
        </ul>
      </section>

      {/* ANALYSIS PHILOSOPHY */}
      <section className="about-section">
        <h2 style={{color: "white", fontFamily: "sans-serif", fontWeight: "600"}}>Our Analysis Philosophy</h2>
        <p style={{color: "#ccc", fontFamily: "sans-serif"}}>
          Winning consistently isn’t about predicting outcomes it’s about
          understanding probability, inefficiencies, and value.
        </p>

        <p style={{color: "#ccc", fontFamily: "sans-serif"}}>
          Our analysts and AI powered models evaluate form trends, matchup data,
          market movement, and historical inefficiencies. Only selections that
          pass strict confidence thresholds reach the AllStake stage.
        </p>
      </section>

      {/* RESPONSIBILITY */}
      <section className="about-section muted">
        <h2 style={{color: "black", fontFamily: "sans-serif"}}>Transparency & Responsibility</h2>
        <p style={{fontFamily: "sans-serif"}}>
          ClutchDen does not promise guaranteed returns. Participation involves
          risk, and members are encouraged to engage responsibly and within
          their financial limits.
        </p>

        <p style={{fontFamily: "sans-serif"}}>
          Our platform is designed to educate, inform, and support disciplined
          decision-making not reckless behavior.
        </p>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>Ready to Compete Smarter?</h2>
        <p>
          Join a platform built on intelligence, discipline, and collective
          strength.
        </p>
        <button 
          type='bet-Button'
          className="about-btn" 
          onClick={() => (window.location.href = "/bets")}
        >Enter ClutchDen</button>
      </section>

    </div>
  );
}
