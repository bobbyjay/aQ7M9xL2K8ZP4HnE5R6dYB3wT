import ProtectedRoute from "../../../src/components/ProtectedRoute";
import Sports from "../../../src/pages/sports";
import Seo from "../../../src/components/Seo";

export default function SportsRoute() {
  return (
    <ProtectedRoute>
      <Seo title="Sports | ClutchDen" description="Browse ClutchDen sports coverage and insights for your favorite games and markets." />
      <Sports />
    </ProtectedRoute>
  );
}
