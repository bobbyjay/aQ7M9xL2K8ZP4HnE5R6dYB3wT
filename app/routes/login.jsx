import Login from "../../src/pages/Login";
import Seo from "../../src/components/Seo";

export default function LoginRoute() {
  return (
    <>
      <Seo title="Login | ClutchDen" description="Sign in to your ClutchDen account to access your sports insights and account dashboard." />
      <Login />
    </>
  );
}
