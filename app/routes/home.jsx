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

export default function HomeRoute() {
  return (
    <>
      <Seo title="Home | ClutchDen" description="ClutchDen delivers sports intelligence and strategy for modern bettors and analysts." />
      <Home />
    </>
  );
}