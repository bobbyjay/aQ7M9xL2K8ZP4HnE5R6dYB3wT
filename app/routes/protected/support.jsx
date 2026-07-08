import ProtectedRoute from "../../../src/components/ProtectedRoute";
import SupportPage from "../../../src/pages/Support";
import Seo from "../../../src/components/Seo";

export default function SupportRoute() {
  return (
    <ProtectedRoute>
      <Seo title="Support Center | ClutchDen" description="Access your support center and account help from ClutchDen." />
      <SupportPage />
    </ProtectedRoute>
  );
}
