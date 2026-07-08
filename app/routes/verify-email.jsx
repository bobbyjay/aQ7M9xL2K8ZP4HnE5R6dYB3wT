import VerifyEmailPage from "../../src/pages/VerifyEmailPage";
import Seo from "../../src/components/Seo";

export default function VerifyEmailRoute() {
  return (
    <>
      <Seo title="Verify Email | ClutchDen" description="Verify your email to complete your ClutchDen registration and activate your account." />
      <VerifyEmailPage />
    </>
  );
}
