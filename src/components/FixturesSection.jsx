import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import NotifyIcon from "../assets/notificationsicon.svg";
import "../styles/homepage.css";

const FixtureItem = () => {
  const { fixtures } = useAuth();

  const [fixturesData, setFixturesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchFixtures = async (retryCount = 0) => {
      try {
        const data = await fixtures(); // your API call

        if (data && data.length > 0) {
          setFixturesData(data);
          setLoading(false);
        } else {
          throw new Error("No data returned");
        }
      } catch (error) {
        if (retryCount < 2) {
          // retry up to 3 times
          setTimeout(() => {
            fetchFixtures(retryCount + 1);
          }, 1500); // delay so requests are not at same time
        } else {
          console.error("Failed to fetch fixtures:", error);
          setLoading(false);
        }
      }
    };

    fetchFixtures();
  }, [fixtures]);

  if (loading) {
    return <div className="fixture-skeleton">Loading fixtures...</div>;
  }

  return (
    <div className="fixtures-container">
      {fixturesData.map((fixture) => (
        <div key={fixture.id} className="fixture-item">

            <div className="fixture-time">{fixture.time}</div>

            <div className="fixture-team">
                <div>
                    <img src={fixture.homeTeamLogo} alt={`${fixture.homeTeam} logo`} />
                    <span>{fixture.homeTeam}</span>
                </div>
                <div>
                    <img src={fixture.awayTeamLogo} alt={`${fixture.awayTeam} logo`} />
                    <span>{fixture.awayTeam}</span>
                </div>
            </div>

            <div className="notification-container">
                <button className="notify-btn">
                    <img src={NotifyIcon} alt="Notify" />
                </button>
            </div>

        </div>
      ))}
    </div>
  );
};

export default FixtureItem;