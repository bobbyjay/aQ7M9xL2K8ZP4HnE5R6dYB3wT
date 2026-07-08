import ProtectedRoute from "../../../src/components/ProtectedRoute";
import Profile from "../../../src/pages/Profile";
import Seo from "../../../src/components/Seo";

export default function ProfileRoute() {
  return (
    <ProtectedRoute>
      <Seo title="Profile | ClutchDen" description="Manage your ClutchDen profile, preferences, and account settings." />
      <Profile />
    </ProtectedRoute>
  );
}
