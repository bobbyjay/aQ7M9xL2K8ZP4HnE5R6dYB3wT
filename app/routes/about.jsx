import About from "../../src/pages/About";
import Seo from "../../src/components/Seo";

export default function AboutRoute() {
  return (
    <>
      <Seo title="About | ClutchDen" description="Learn more about ClutchDen's mission, strategy, and how the platform helps sports enthusiasts make smarter decisions." />
      <About />
    </>
  );
}
