import ArticleCard from "./ArticleCard";
import ArticleCardSkeleton from "./ArticleCardSkeleton";

const ArticleGrid = ({ articles, loading, columns = 3, skeletonCount = 6 }) => {
  const gridClass =
    columns === 4
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8";

  if (loading) {
    return (
      <div className={gridClass}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!articles.length) {
    return <div className="text-center py-16 text-gray-400">No articles found.</div>;
  }

  return (
    <div className={gridClass}>
      {articles.map((article) => (
        <ArticleCard key={article._id || article.slug} article={article} />
      ))}
    </div>
  );
};

export default ArticleGrid;