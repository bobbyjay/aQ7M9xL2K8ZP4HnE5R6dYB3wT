import ProtectedRoute from "../../../src/components/ProtectedRoute";
import DepositPage from "../../../src/pages/Deposit";
import Seo from "../../../src/components/Seo";

export default function DepositRoute() {
  return (
    <ProtectedRoute>
      <Seo title="Deposit | ClutchDen" description="Deposit funds into your ClutchDen account to start using the platform." />
      <DepositPage />
    </ProtectedRoute>
  );
}
