import Home from "../../src/pages/Home";
import Seo from "../../src/components/Seo";

export const handle = {
  scripts: [
    "/js/home.js",
    "/js/hmnav.js",
    "/js/es34model.js",
    // "/js/analytics.js",
  ],
};

export default function IndexRoute() {
  return (
    <>
      <Seo title="ClutchDen | Data-Driven Sports Intelligence & Winning Strategies" description="Explore ClutchDen for professional sports analysis, data-driven insights, and winning strategies." />
      <Home />
    </>
  );
}
