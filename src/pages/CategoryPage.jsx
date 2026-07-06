import { useParams, useSearchParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import CategoryNav from "../components/CategoryNav";
import ArticleGrid from "../components/ArticleGrid";
import Pagination from "../components/Pagination";
import SortFilterBar from "../components/SortFilterBar";
import { useArticles } from "../hooks/useArticles";
import { useCategories } from "../hooks/useCategories";

const LIMIT = 9;

const CategoryPage = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const sort = searchParams.get("sort") || "latest";

  const { categories } = useCategories();
  const currentCategory = categories.find((c) => c._id === id);

  const { articles, pagination, loading, error } = useArticles({
    category: id,
    sort,
    page,
    limit: LIMIT,
  });

  const handlePageChange = (newPage) => {
    setSearchParams({ page: String(newPage), sort });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (newSort) => {
    setSearchParams({ page: "1", sort: newSort });
  };

  return (
    <MainLayout>
      <CategoryNav />
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold font-serif mb-6">
          {currentCategory?.name || "Category"}
        </h1>
        {error && <p className="text-primary text-sm mb-4">{error}</p>}
        <SortFilterBar sort={sort} onSortChange={handleSortChange} resultCount={pagination.total} />
        <ArticleGrid articles={articles} loading={loading} />
        <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={handlePageChange} />
      </section>
    </MainLayout>
  );
};

export default CategoryPage;