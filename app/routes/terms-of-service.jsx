import TermsOfService from "../../src/pages/termsOfService";
import Seo from "../../src/components/Seo";

export default function TermsOfServiceRoute() {
  return (
    <>
      <Seo title="Terms of Service | ClutchDen" description="Review the ClutchDen terms of service and usage agreement before getting started." />
      <TermsOfService />
    </>
  );
}
