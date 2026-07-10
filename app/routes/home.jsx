import Home from "../../src/pages/Home";
import Seo from "../../src/components/Seo";
import es34ModelUrl from "../../src/js/es34model.js?url";

export const handle = {
  scripts: [
    "/js/home.js",
    "/js/hmnav.js",
    // "/js/analytics.js",
  ],

  scriptModule: [es34ModelUrl],
};

export default function HomeRoute() {
  return (
    <>
      <Seo title="Home | ClutchDen" description="ClutchDen delivers sports intelligence and strategy for modern bettors and analysts." />
      <Home />
    </>
  );
}