
(function () {
  function updateView() {
    const elements = document.querySelectorAll(".types-of-sports-div");

    const desktop = window.innerWidth >= 1000;

    elements.forEach((el) => {
      el.classList.toggle("desktop", desktop);
      el.classList.toggle("mobile", !desktop);
    });
  }

  // Initial update
  updateView();

  // Update on resize
  window.addEventListener("resize", updateView);
})();

(function () {
  function render() {
    const desktop = window.innerWidth >= 1000;

    document.querySelectorAll(".scroll-typ-sports").forEach((el) => {
      if (desktop) {
        el.innerHTML = `
          <div class="scroll-typ-sports-desktop">
            <!-- Desktop Content -->
            <div class='sports-ty-soccer'>
              <div class='sport-icon-div'><img src="src/assets/soccerIcon.svg" alt="soccer" class='sportIcon' width="50" height="50" /></div>
              <div class='sports-ty-name'>soccer</div>
            </div>
            <div class='sports-ty-nba'>
              <div class='sport-icon-div'><img src="src/assets/basketballIcon.svg" alt="basketball" class='sportIcon' width="50" height="50" /></div>
              <div class='sports-ty-name'>basketball</div>
            </div>
            <div class='sports-ty-tennis'>
              <div class='sport-icon-div'><img src="src/assets/tennisIcon.svg" alt="tennis" class='sportIcon' width="50" height="50" /></div>
              <div class='sports-ty-name'>tennis</div>
            </div>
            <div class='sports-ty-mlb'>
              <div class='sport-icon-div'><img src="src/assets/baseballIcon.svg" alt="baseball" class='sportIcon' width="50" height="50" /></div>
              <div class='sports-ty-name'>baseball</div>
            </div>
            <div class='sports-ty-cs2'>
              <div class='sport-icon-div'><img src="src/assets/cs2Icon.svg" alt="cs2" class='sportIcon' width="50" height="50" /></div>
              <div class='sports-ty-name'>cs2</div>
            </div>
          </div>
        `;
      } else {
        el.innerHTML = `
            <!-- Mobile Content -->
            <div class='scroll-typ-sports-mobile'>
                <div class="scroll-typ-content">
                    <div class='scroll-typ-content'>
                      <div class='sports-ty-soccer'>
                        <div class='sport-icon-div'><img src="src/assets/soccerIcon.svg" alt="soccer" class='sportIcon' /></div>
                        <div class='sports-ty-name'>soccer</div>
                      </div>
                      <div class='sports-ty-nba'>
                        <div class='sport-icon-div'><img src="src/assets/basketballIcon.svg" alt="basketball" class='sportIcon' /></div>
                        <div class='sports-ty-name'>basketball</div>
                      </div>
                      <div class='sports-ty-tennis'>
                        <div class='sport-icon-div'><img src="src/assets/tennisIcon.svg" alt="tennis" class='sportIcon' /></div>
                        <div class='sports-ty-name'>tennis</div>
                      </div>
                      <div class='sports-ty-mlb'>
                        <div class='sport-icon-div'><img src="src/assets/baseballIcon.svg" alt="baseball" class='sportIcon' /></div>
                        <div class='sports-ty-name'>baseball</div>
                      </div>
                      <div class='sports-ty-cs2'>
                        <div class='sport-icon-div'><img src="src/assets/cs2Icon.svg" alt="cs2" class='sportIcon' /></div>
                        <div class='sports-ty-name'>cs2</div>
                      </div>
                    </div>
                </div>
            </div>
        `;
      }
    });
  }

  render();
  window.addEventListener("resize", render);
})();

// make a horizontally scrollable element start in the center
(function () {
  function centerScroll() {
    document.querySelectorAll(".scroll-typ-sports-mobile").forEach((el) => {
      el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
    });
  }

  // Initial centering
  centerScroll();

  // Re-center after resize
  window.addEventListener("resize", centerScroll);
})();
