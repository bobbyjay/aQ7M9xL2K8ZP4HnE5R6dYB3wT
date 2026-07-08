import NotFound from "../../src/pages/NotFound.jsx";
import Seo from "../../src/components/Seo.jsx";

export default function NotFoundRoute() {
  return (
    <>
        <Seo 
            title="404 page" 
            description="Oops, sorry we can't find that page!" 
        />
        <NotFound />
    </>
  );
}
