console.log("root.js loaded!");

const messages = [
  "🚀 Root.js is working!",
  "🎉 JavaScript injected successfully!",
  "⏰ Updated after 5 seconds!",
  "✅ SSR script injection is working!"
];

let index = 0;

const banner = document.createElement("div");
banner.style.cssText = `
  position:fixed;
  top:20px;
  right:20px;
  background:#111;
  color:#fff;
  padding:12px 18px;
  border-radius:8px;
  z-index:999999;
  font-family:Arial,sans-serif;
  box-shadow:0 4px 12px rgba(0,0,0,.3);
`;

document.body.appendChild(banner);

function updateMessage() {
  banner.textContent = messages[index];
  index = (index + 1) % messages.length;
}

updateMessage();
setInterval(updateMessage, 5000);