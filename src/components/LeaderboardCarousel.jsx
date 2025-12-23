import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/carousel.css";

/**
 * Props:
 *  - selectedEvent
 *  - speed
 */
export default function LeaderboardCarousel({
  selectedEvent = null,
  speed = 120,
}) {
  const { getLeaderboard } = useAuth();

  // Leaderboard state
  const [lbData, setLbData] = useState([]);
  const [lbLoading, setLbLoading] = useState(false);

  // Refs
  const containerRef = useRef(null);
  const firstSetRef = useRef(null);
  const styleTagRef = useRef(null);

  const [measuredWidth, setMeasuredWidth] = useState(0);

  // ---------------------------
  //  LOAD LEADERBOARD FROM API
  // ---------------------------
  useEffect(() => {
    const loadLB = async () => {
      setLbLoading(true);

      const res = await getLeaderboard();

      if (!res?.success) {
        console.error("Failed to load leaderboard");
        setLbLoading(false);
        return;
      }

      // At this point, lbData already contains imageUrl as blob URL
      setLbData(res.leaderboard || []);
      setLbLoading(false);
    };

    loadLB();
  }, []);

  // ---------------------------
  //   MEASURE WIDTH OF FIRST SET
  // ---------------------------
  useEffect(() => {
    function measure() {
      if (!firstSetRef.current) return;
      const w = Math.ceil(firstSetRef.current.getBoundingClientRect().width);
      if (w && w !== measuredWidth) setMeasuredWidth(w);
    }

    measure();

    const ro = new ResizeObserver(measure);
    if (firstSetRef.current) ro.observe(firstSetRef.current);

    window.addEventListener("resize", measure);

    return () => {
      if (firstSetRef.current) ro.unobserve(firstSetRef.current);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [lbData.length]);

  // ---------------------------
  //     INJECT KEYFRAME ANIMATION
  // ---------------------------
  useEffect(() => {
    if (styleTagRef.current) {
      styleTagRef.current.remove();
      styleTagRef.current = null;
    }

    if (!measuredWidth || measuredWidth <= 0) return;

    const totalScrollWidth = measuredWidth * 2;
    const duration = Math.max(6, totalScrollWidth / (speed || 120));
    const animName = `carousel-scroll-${measuredWidth}-${Math.round(duration)}`;

    const css = `
      @keyframes ${animName} {
        from { transform: translateX(0); }
        to   { transform: translateX(-${totalScrollWidth}px); }
      }

      .leaderboard-carousel__scroller-${measuredWidth} {
        animation: ${animName} ${duration}s linear infinite;
      }
    `;

    const styleTag = document.createElement("style");
    styleTag.innerHTML = css;
    document.head.appendChild(styleTag);
    styleTagRef.current = styleTag;

    return () => {
      if (styleTagRef.current) {
        styleTagRef.current.remove();
        styleTagRef.current = null;
      }
    };
  }, [measuredWidth, speed]);

  // ---------------------------
  //           RENDER UI
  // ---------------------------
  if (lbLoading) {
    return (
      <div className="leaderboard-carousel__container">
        <div className="leaderboard-carousel__empty"><span className="loader-span"></span>Loading...</div>
      </div>
    );
  }

  if (!lbData || lbData.length === 0) {
    return (
      <div className="leaderboard-carousel__container">
        <div className="leaderboard-carousel__empty">No winners yet</div>
      </div>
    );
  }

  const renderCard = (entry, index, isCopy = false) => {
    const w = entry || {};
    const key = isCopy ? `copy-${w._id}-${index}` : w._id || `e-${index}`;

    return (
      <div
        key={key}
        className={`game-card ${selectedEvent === w._id ? "selected" : ""}`}
      >
        <img
          src={w.imageUrl || "/default-user.png"}
          alt={w.username || "avatar"}
          className="winners-profile-img"
          referrerPolicy="no-referrer"
        />
        <div className="info">
          <strong>{w.username || "Unknown User"}</strong>
          <p className="ads-txts">Rank: {w.rank ?? "N/A"}</p>
          <p className='ads-txts'>Event: {w.prize || "N/A"}</p>
          <p className='ads-txts'>Amount Won: ${w.amount || 0}</p>
          <span className="date">
            {w.createdAt
              ? new Date(w.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "No date"}
          </span>
        </div>
      </div>
    );
  };

  const scrollerClass =
    measuredWidth > 0
      ? `leaderboard-carousel__scroller-${measuredWidth}`
      : "leaderboard-carousel__scroller";

  return (
    <div className="leaderboard-carousel__container" ref={containerRef}>
      <div className={`leaderboard-carousel__scroller ${scrollerClass}`}>
        <div className="leaderboard-carousel__group" ref={firstSetRef}>
          {lbData.map((entry, i) => renderCard(entry, i, false))}
        </div>

        <div className="leaderboard-carousel__group">
          {lbData.map((entry, i) => renderCard(entry, i, true))}
        </div>

        <div className="leaderboard-carousel__group">
          {lbData.map((entry, i) => renderCard(entry, i, true))}
        </div>
      </div>
    </div>
  );
}
