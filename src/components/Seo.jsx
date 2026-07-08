import * as ReactHelmetAsync from "react-helmet-async";

// Safely extract Helmet for seamless client-build and serverless runtime interop
const Helmet = ReactHelmetAsync.Helmet || (ReactHelmetAsync.default && ReactHelmetAsync.default.Helmet);

function Seo({
  title = "ClutchDen | Data-Driven Sports Intelligence & Winning Strategies",
  description = "ClutchDen is a performance-driven sports intelligence platform built on professional analysis, real-time data, and disciplined strategies to help you make smarter decisions and achieve consistent results.",
  keywords = "ClutchDen, sports betting, sports intelligence, football predictions, basketball predictions, tennis predictions, esports, live odds, betting tips, sports analysis, data analytics, winning strategies",
  author = "ClutchDen",
  robots = "index, follow",
  canonical,
  url,
  image = "https://clutchden.onrender.com/api/winners/694b1b411a20171048782e75/image",
  siteName = "ClutchDen",
  twitterSite = "@clutchden",
  twitterCreator = "@clutchden",
  themeColor = "#0B1E33",
  ogTitle,
  ogDescription,
  twitterTitle,
  twitterDescription,
  twitterImage,
}) {
  const pageUrl = canonical || url || (typeof window !== "undefined" ? window.location.href : "https://clutchden.online/");

  return (
    <Helmet>
      {/* Primary SEO */}
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robots} />
      <meta name="theme-color" content={themeColor} />

      {/* Canonical */}
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={ogTitle || title} />
      <meta
        property="og:description"
        content={ogDescription || description}
      />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:creator" content={twitterCreator} />
      <meta name="twitter:title" content={twitterTitle || title} />
      <meta
        name="twitter:description"
        content={twitterDescription || description}
      />
      <meta name="twitter:image" content={twitterImage || image} />

      {/* Extra */}
      <meta name="format-detection" content="telephone=no" />

      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/ClutchdenWebLogo.svg" />
    </Helmet>
  );
}

export default Seo;
