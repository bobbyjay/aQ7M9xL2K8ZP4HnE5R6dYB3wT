import Home from "../../src/pages/Home";
import Seo from "../../src/components/Seo";
// import "../../src/js/es34model.js?url";
import { useEffect } from "react";

export const handle = {
  scripts: [
    "/js/home.js",
    "/js/hmnav.js",
    // "/js/analytics.js",
  ],
  // scriptModule: [
  //   es34ModelUrl
  // ],
};

export default function HomeRoute() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/js/es34model.js"; // This path points directly to your public folder
    script.type = "module";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Clean up on unmount
    };
  }, []);

  return (
    <>
      <Seo title="Home | ClutchDen" description="ClutchDen delivers sports intelligence and strategy for modern bettors and analysts." />
      <Home />
    </>
  );
}