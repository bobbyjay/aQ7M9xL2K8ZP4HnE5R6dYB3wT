import Register from "../../src/pages/Register";
import Seo from "../../src/components/Seo";

export default function RegisterRoute() {
  return (
    <>
      <Seo title="Register | ClutchDen" description="Create your ClutchDen account and join the community of data-driven sports followers." />
      <Register />
    </>
  );
}
