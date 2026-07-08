// app\routes.jsx

import { index, route } from "@react-router/dev/routes";

export default [
  index("./routes/index.jsx"),
  route("/.well-known/appspecific/com.chrome.devtools.json", "./routes/devtools.jsx"),
  route("home", "./routes/home.jsx"),
  route("login", "./routes/login.jsx"),
  route("register", "./routes/register.jsx"),
  route("verify-email", "./routes/verify-email.jsx"),
  route("support-page", "./routes/support-page.jsx"),
  route("terms-of-service", "./routes/terms-of-service.jsx"),
  route("about", "./routes/about.jsx"),
  route("search-results", "./routes/search-results.jsx"),
  route("sports", "./routes/protected/sports.jsx"),
  route("Profile", "./routes/protected/profile.jsx"),
  route("withdrawal", "./routes/protected/withdrawal.jsx"),
  route("deposit", "./routes/protected/deposit.jsx"),
  route("bets", "./routes/protected/bets.jsx"),
  route("support", "./routes/protected/support.jsx"),
  route("*", "./routes/404page.jsx"),
];
