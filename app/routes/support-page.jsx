import CustomerSupportPage from "../../src/pages/customerSupport";
import Seo from "../../src/components/Seo";

export default function SupportPageRoute() {
  return (
    <>
      <Seo title="Support | ClutchDen" description="Reach the ClutchDen support team for assistance with your account and experience." />
      <CustomerSupportPage />
    </>
  );
}
