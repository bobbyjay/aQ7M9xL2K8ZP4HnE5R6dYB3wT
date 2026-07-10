// public/js/es34model.js
const API_BASE = "https://clutchden-api-server.onrender.com/api";

const coin1x = "/assets/Coins-ftsy-spts-ptrms-emb@1x.webp";
const coin2x = "/assets/Coins-ftsy-spts-ptrms-emb@2x.webp";
const coin3x = "/assets/Coins-ftsy-spts-ptrms-emb@3x.webp";

function updateWelcomeBanner() {
  const img = document.querySelector(".wlc-banna-img");

  if (!img) return;

  img.src = coin1x;
  img.srcset = `${coin1x} 1x, ${coin2x} 2x, ${coin3x} 3x`;
  img.sizes = "(max-width: 768px) 100vw, 800px";
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", updateWelcomeBanner, {
    once: true,
  });
} else {
  updateWelcomeBanner();
}


// latestNews

function normalizeImageUrl(url) {
  if (!url) return "/images/placeholder.jpg";
  return url.replace(/^http:\/\//, "https://");
}

async function renderLatestNews() {
  const container = document.getElementById("newsLateast");

  if (!container) return;

  // Loading state
  container.innerHTML = `
    <div class="news-grid skeleton-grid">
      <div class="featured-news skeleton"></div>
    </div>
  `;

  try {
    const response = await fetch(`${API_BASE}/news/latest`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`News fetch failed: ${response.status}`);
    }

    const latestNews = await response.json();

    if (!Array.isArray(latestNews) || latestNews.length === 0) {
      container.innerHTML = "<p>No news available.</p>";
      // console.log("API response:", response);
      return;
    }

    const featured = latestNews[0];

    container.innerHTML = `
      <div class="news-grid">

        <div class="featured-news">
          <img
            src="${normalizeImageUrl(featured.image?.url)}"
            alt="${featured.image?.alt || featured.title}"
          />
          <div class="featured-overlay">
            <h3>${featured.title}</h3>
            <p>${featured.summary}</p>
          </div>
        </div>

        <div class="news-list">
          ${latestNews
            .slice(1, 5)
            .map(
              (news) => `
                <div class="news-card">
                  <img
                    src="${normalizeImageUrl(news.image?.url || news.image)}"
                    alt="${news.title}"
                  />
                  <div class="news-content">
                    <h4>${news.title}</h4>
                    <p>${news.summary}</p>
                  </div>
                </div>
              `
            )
            .join("")}
        </div>

      </div>
    `;
  } catch (err) {
    container.innerHTML = "<p>Failed to fetch latest news.</p>";
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderLatestNews);
} else {
  renderLatestNews();
}

// Search Logics
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

let activeIndex = -1;
let currentResults = [];

function searchSports() {
  const container = document.getElementById("searchBarForm");
  if (!container) return;

  container.innerHTML = `
    <form id="sportsSearchForm" class="search-form-containner">
      <input
        type="text"
        id="sports-search-engin"
        name="sports-search-engin"
        class="search-input-box"
        placeholder="Search for a sports game..."
        autocomplete="off"
      />
      <button
        id="sportsSearchBtn"
        type="submit"
        class="search-btn"
        disabled
      >
        Search
      </button>
    </form>
  `;

  const form = document.getElementById("sportsSearchForm");
  const input = document.getElementById("sports-search-engin");
  const button = document.getElementById("sportsSearchBtn");

  input.addEventListener("input", () => {
    const value = input.value.trim();

    button.disabled = value.length === 0;

    currentResults = sports.filter((sport) =>
      sport.toLowerCase().includes(value.toLowerCase())
    );

    activeIndex = -1;

    searchDropdown(value);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (input.value.trim()) {
      // console.log("Searching:", input.value.trim());

      // Navigate or perform your search here.
      // Example:
      // /search-results', { state: { query: trimmedSearch } }
      window.location.href = `/search-results?q=${encodeURIComponent(input.value.trim())}`;

      // Clear the input and dropdown after search
      input.value = "";
      currentResults = [];
      activeIndex = -1;
      searchDropdown();
    }
  });
}

function searchDropdown(search = "") {
  const container = document.getElementById("searchDropdownContainer");
  if (!container) return;

  if (!search || currentResults.length === 0) {
    container.innerHTML = "";
    return;
  }

  const regex = new RegExp(`(${search})`, "gi");

  container.innerHTML = `
    <div class="search-bar-Dropdown-container">
      <div class="search-dropdown">
        ${currentResults
          .map((sport, index) => {
            const highlighted = sport.replace(
              regex,
              '<span class="search-highlight">$1</span>'
            );

            return `
              <div
                class="search-item ${index === activeIndex ? "active" : ""}"
                data-sport="${sport}"
              >
                ${highlighted}
              </div>
            `;
          })
          .join("")}
      </div>
    </div>
  `;

  container.querySelectorAll(".search-item").forEach((item) => {
    item.addEventListener("click", () => {
      const sport = item.dataset.sport;

      document.getElementById("sports-search-engin").value = sport;
      container.innerHTML = "";

      console.log("Selected:", sport);

      // Optional:
      // window.location.href = `/search?q=${encodeURIComponent(sport)}`;
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", searchSports);
} else {
  searchSports();
}

// NOTES

{/* <div className='search-bar-Dropdown-container' ref={searchRef}>
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
</div> */}

{/* <form onSubmit={handleSearchSubmit} className='search-form-containner'>
  <input 
    type="text" 
    name="sports-search-engin" 
    id="sports-search-engin" 
    placeholder="Search for a sports game ..."
    className='search-input-box'
    value={search ?? ""} 
    onChange={(e) => {
      const nextValue = e.target.value;
      setSearch(nextValue);
      setActiveInde
      if (!nextValue.trim()) {
        setResults([]);
        setShowDropdown(false);
      }
    }}
    onKeyDown={handleKeyDown}
    autoComplete="off"
  />
  <button type="submit" className="search-btn" disabled={!isSearchActive}>Search</button>
</form> */}