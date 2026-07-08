import fs from "fs";
import path from "path";

const indexPath = path.resolve("index.html");

let html = fs.readFileSync(indexPath, "utf8");

const seo = `
<title>ClutchDen | Data-Driven Sports Intelligence & Winning Strategies</title>

<meta
  name="description"
  content="ClutchDen is a performance-driven sports intelligence platform built on professional analysis, real-time data, and disciplined strategies to help you make smarter decisions and achieve consistent results."
/>

<meta
  name="keywords"
  content="ClutchDen, sports betting, football predictions, basketball predictions, esports, live odds, sports intelligence"
/>

<meta name="author" content="ClutchDen" />
<meta name="robots" content="index, follow" />
<meta name="theme-color" content="#0B1E33" />

<link rel="canonical" href="https://clutchden.online/" />

<meta property="og:type" content="website" />
<meta property="og:site_name" content="ClutchDen" />
<meta property="og:url" content="https://clutchden.online/" />
<meta property="og:title" content="ClutchDen | Where Data, Discipline & Strategy Create Winners" />
<meta
  property="og:description"
  content="Join ClutchDen and gain access to professional sports analysis, data-driven insights, transparent performance, and disciplined strategies."
/>
<meta
  property="og:image"
  content="https://clutchden.onrender.com/api/winners/694b1b411a20171048782e75/image"
/>

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@clutchden" />
<meta name="twitter:creator" content="@clutchden" />
<meta
  name="twitter:title"
  content="ClutchDen 🏆 | Data-Driven Sports Intelligence"
/>
<meta
  name="twitter:description"
  content="Compete smarter with professional analysis, real-time sports data, disciplined strategies, and transparent performance metrics."
/>
<meta
  name="twitter:image"
  content="https://clutchden.onrender.com/api/winners/694b1b411a20171048782e75/image"
/>
`;

html = html.replace("<!-- SEO -->", seo);

fs.writeFileSync(indexPath, html);

console.log("✅ SEO injected");