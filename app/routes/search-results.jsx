import SearchResults from "../../src/pages/SearchResults";
import Seo from "../../src/components/Seo";
import { useSearchParams } from "react-router-dom";

export default function SearchResultsRoute() {
  const [searchParams] = useSearchParams();

  const searchResult = searchParams.get("q") || "Search";

  return (
    <>
      <Seo 
        title={`Search Results | ${searchResult}`} 
        description={`${searchResult} insights and predictions across ClutchDen's data-driven content.`} 
      />
      <SearchResults />
    </>
  );
}
