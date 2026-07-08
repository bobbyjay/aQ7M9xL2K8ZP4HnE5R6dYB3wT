import ProtectedRoute from "../../../src/components/ProtectedRoute";
import BetPage from "../../../src/pages/Bet";
import Seo from "../../../src/components/Seo";

export default function BetsRoute() {
  return (
    <ProtectedRoute>
      <Seo title="Bet Slip | ClutchDen" description="View and manage your betting activity on ClutchDen." />
      <BetPage />
    </ProtectedRoute>
  );
}
