import { useSearchParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ArticleGrid from "../components/ArticleGrid";
import Pagination from "../components/Pagination";
import SortFilterBar from "../components/SortFilterBar";
import { useArticles } from "../hooks/useArticles";

const LIMIT = 9;

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const page = Number(searchParams.get("page")) || 1;
  const sort = searchParams.get("sort") || "latest";

  const { articles, pagination, loading, error } = useArticles({
    search: query,
    sort,
    page,
    limit: LIMIT,
  });

  const handlePageChange = (newPage) => {
    setSearchParams({ q: query, page: String(newPage), sort });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (newSort) => {
    setSearchParams({ q: query, page: "1", sort: newSort });
  };

  return (
    <MainLayout>
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold font-serif mb-2">Search results for "{query}"</h1>
        {error && <p className="text-primary text-sm mb-4">{error}</p>}
        <SortFilterBar sort={sort} onSortChange={handleSortChange} resultCount={pagination.total} />
        <ArticleGrid articles={articles} loading={loading} />
        <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={handlePageChange} />
      </section>
    </MainLayout>
  );
};

export default SearchResults;