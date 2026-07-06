import { Link } from "react-router-dom";
import { formatRelativeTime } from "../utils/formatDate";
import { getPlaceholderImage } from "../utils/placeholderImage";
import ArticleGrid from "./ArticleGrid";
import ArticleCardSkeleton from "./ArticleCardSkeleton";

const handleImgError = (e) => {
  e.target.onerror = null;
  e.target.src = getPlaceholderImage();
};

const LatestNewsGrid = ({ articles, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2">
          <ArticleCardSkeleton />
        </div>
        <div className="space-y-4">
          <ArticleCardSkeleton />
          <ArticleCardSkeleton />
        </div>
      </div>
    );
  }

  if (!articles.length) {
    return <div className="text-center py-16 text-gray-400">No articles found.</div>;
  }

  const [lead, ...rest] = articles;
  const sideItems = rest.slice(0, 2);
  const gridItems = rest.slice(2);

  const leadCategoryName =
    typeof lead.category === "string" ? lead.category : lead.category?.name;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Big lead article */}
        <Link to={`/article/${lead.slug}`} className="lg:col-span-2 group block">
          <div className="overflow-hidden rounded-sm mb-3 bg-gray-100">
            <img
              src={lead.coverImage || getPlaceholderImage(lead.title)}
              onError={handleImgError}
              alt={lead.title}
              className="w-full h-80 object-cover group-hover:scale-105 transition duration-300"
            />
          </div>
          {leadCategoryName && (
            <span className="text-xs font-semibold text-primary uppercase tracking-wide">
              {leadCategoryName}
            </span>
          )}
          <h3 className="font-serif text-2xl font-bold leading-snug mt-1 group-hover:text-primary">
            {lead.title}
          </h3>
          {lead.summary && (
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">{lead.summary}</p>
          )}
          <span className="text-xs text-gray-400 mt-2 block">
            {formatRelativeTime(lead.publishedAt || lead.createdAt)}
          </span>
        </Link>

        {/* Smaller side items */}
        <div className="space-y-4 divide-y divide-gray-100">
          {sideItems.map((article) => {
            const categoryName =
              typeof article.category === "string" ? article.category : article.category?.name;
            return (
              <Link
                key={article._id || article.slug}
                to={`/article/${article.slug}`}
                className="flex gap-3 group pt-4 first:pt-0"
              >
                <img
                  src={article.coverImage || getPlaceholderImage()}
                  onError={handleImgError}
                  alt={article.title}
                  className="w-24 h-20 object-cover rounded-sm flex-shrink-0 bg-gray-100"
                />
                <div className="min-w-0">
                  {categoryName && (
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                      {categoryName}
                    </span>
                  )}
                  <h4 className="text-sm font-semibold leading-snug mt-1 group-hover:text-primary line-clamp-2">
                    {article.title}
                  </h4>
                  <span className="text-xs text-gray-400 mt-1 block">
                    {formatRelativeTime(article.publishedAt || article.createdAt)}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Remaining articles in the standard grid */}
      {gridItems.length > 0 && <ArticleGrid articles={gridItems} loading={false} />}
    </>
  );
};

export default LatestNewsGrid;