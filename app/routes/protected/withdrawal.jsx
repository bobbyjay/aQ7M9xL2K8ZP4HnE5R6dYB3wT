import ProtectedRoute from "../../../src/components/ProtectedRoute";
import WithdrawalPage from "../../../src/pages/Withdrawal";
import Seo from "../../../src/components/Seo";

export default function WithdrawalRoute() {
  return (
    <ProtectedRoute>
      <Seo title="Withdraw | ClutchDen" description="Withdraw funds from your ClutchDen account securely and conveniently." />
      <WithdrawalPage />
    </ProtectedRoute>
  );
}
