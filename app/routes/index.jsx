import Home from "../../src/pages/Home";
import Seo from "../../src/components/Seo";
// import "../../src/js/es34model.js?url";

export const handle = {
  scripts: [
    "/js/home.js",
    "/js/hmnav.js",
    // "/js/analytics.js",
  ],

  // scriptModule: [
  //   es34ModelUrl,
  // ],
  
};

export default function IndexRoute() {
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
      <Seo title="ClutchDen | Data-Driven Sports Intelligence & Winning Strategies" description="Explore ClutchDen for professional sports analysis, data-driven insights, and winning strategies." />
      <Home />
    </>
  );
}
