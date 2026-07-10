(() => {
  const container = document.getElementById("HmNav");
  if (!container) return;

  container.innerHTML = `
    <div class="hmnav-container">
      <div class="hmnav-logo">
        <img src="/assets/clutchdenEmbedded.svg" alt="ClutchDen Logo">
      </div>
      
      <!-- action button -->
      <div class="hmnav-actions">
        <button class="hmnav-btn hmnav-register">Register</button>
        <button class="hmnav-btn hmnav-enter">Login</button>
      </div>
    </div>
  `;

  container.querySelector(".hmnav-register")?.addEventListener("click", () => {
    window.location.href = "/register";
  });

  container.querySelector(".hmnav-enter")?.addEventListener("click", () => {
    window.location.href = "/login";
  });
})();


(() => {
  const banner = document.getElementById("banner");
  const navbar = document.getElementById("stagnantnav");

  if (!banner || !navbar) return;

  const updateNavbarLayout = () => {
    const rect = banner.getBoundingClientRect();

    if (rect.bottom <= 0) {
      navbar.classList.add("fixed");
    } else {
      navbar.classList.remove("fixed");
    }

    document.documentElement.style.setProperty(
      "--navbar-height",
      `${navbar.offsetHeight}px`
    );

    document.documentElement.classList.toggle(
      "desktop-view",
      window.innerWidth >= 1000
    );
  };

  const intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      navbar.classList.toggle("fixed", !entry.isIntersecting);
    },
    {
      threshold: 0,
    }
  );

  intersectionObserver.observe(banner);

  const resizeObserver = new ResizeObserver(() => {
    requestAnimationFrame(updateNavbarLayout);
  });

  resizeObserver.observe(navbar);

  window.addEventListener("resize", () => {
    requestAnimationFrame(updateNavbarLayout);
  }, { passive: true });

  window.addEventListener("orientationchange", () => {
    requestAnimationFrame(updateNavbarLayout);
  }, { passive: true });

  updateNavbarLayout();
})();