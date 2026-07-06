import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/maintenance.css';

function SearchResults() {
  const location = useLocation();
  const query = location.state?.query || new URLSearchParams(location.search).get('query') || '';

  const sports = [
    'Football',
    'Basketball',
    'Tennis',
    'Baseball',
    'Cricket',
    'Hockey',
    'MMA',
    'Boxing',
    'Rugby',
    'Soccer',
    'Swimming',
    'Volleyball',
    'Wrestling',
    'Table Tennis',
    'Golf',
    'Skiing',
    'Skateboarding',
    'Track & Field',
    'Gymnastics',
    'Badminton',
  ];

  const filteredSports = query
    ? sports.filter((sport) => sport.toLowerCase().includes(query.toLowerCase()))
    : sports;

  return (
    <div className="maintenance-container">
      <div className="maintenance-card">
        <div className="maintenance-icon">🔎</div>

        <h1 className="maintenance-title">
          Search Results for “{query || 'all sports'}”
        </h1>

        <p className="maintenance-text">
          {filteredSports.length > 0
            ? `Showing ${filteredSports.length} matching sports.`
            : 'No sports matched your search.'}
        </p>

        <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {filteredSports.slice(0, 10).map((sport) => (
            <span
              key={sport}
              style={{
                padding: '0.45rem 0.75rem',
                borderRadius: '999px',
                background: '#f3f4f6',
                color: '#111827',
                fontSize: '0.95rem',
              }}
            >
              {sport}
            </span>
          ))}
        </div>

        <p className="maintenance-subtext" style={{ marginTop: '1rem' }}>
          <Link to="/home" style={{ color: '#2563eb', textDecoration: 'underline' }}>
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SearchResults;
