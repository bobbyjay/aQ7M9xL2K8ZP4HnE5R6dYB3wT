// public/js/es34model.js

const coin1x = "/images/Coins-ftsy-spts-ptrms-emb@1x.webp";
const coin2x = "/images/Coins-ftsy-spts-ptrms-emb@2x.webp";
const coin3x = "/images/Coins-ftsy-spts-ptrms-emb@3x.webp";

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