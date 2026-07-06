import { useSearchParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import CategoryNav from "../components/CategoryNav";
import NewsTicker from "../components/NewsTicker";
import FeaturedCarousel from "../components/FeaturedCarousel";
import LatestNewsGrid from "../components/LatestNewsGrid";
import Pagination from "../components/Pagination";
import SortFilterBar from "../components/SortFilterBar";
import { useArticles } from "../hooks/useArticles";

const LATEST_LIMIT = 9;

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const sort = searchParams.get("sort") || "latest";

  const { articles: featured, loading: featuredLoading } = useArticles({
    featured: true,
    sort: "latest",
    limit: 5,
  });

  const {
    articles: latest,
    pagination,
    loading: latestLoading,
  } = useArticles({ sort, page, limit: LATEST_LIMIT });

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
      <NewsTicker />

      <section className="max-w-6xl mx-auto px-4 py-10">
        <span className="text-xs font-bold text-primary uppercase tracking-widest">
          Amaravati &amp; Andhra Pradesh
        </span>
        <div className="mt-3">
          <FeaturedCarousel articles={featured} loading={featuredLoading} />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10 border-t border-gray-100">
        <h2 className="text-2xl font-bold font-serif mb-6">Latest News</h2>
        <SortFilterBar sort={sort} onSortChange={handleSortChange} resultCount={pagination.total} />
        <LatestNewsGrid articles={latest} loading={latestLoading} />
        <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={handlePageChange} />
      </section>
    </MainLayout>
  );
};

export default Home;