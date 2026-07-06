import { Link } from "react-router-dom";
import { formatRelativeTime } from "../utils/formatDate";
import { getPlaceholderImage } from "../utils/placeholderImage";
import ArticleCardSkeleton from "./ArticleCardSkeleton";

const handleImgError = (e) => {
  e.target.onerror = null;
  e.target.src = getPlaceholderImage();
};

const FeaturedSection = ({ articles, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ArticleCardSkeleton />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!articles.length) return null;

  const [hero, ...rest] = articles;
  const categoryName =
    typeof hero.category === "string" ? hero.category : hero.category?.name;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Link to={`/article/${hero.slug}`} className="lg:col-span-2 group block">
        <div className="overflow-hidden rounded-sm mb-4 bg-gray-100">
          <img
            src={hero.coverImage || getPlaceholderImage(hero.title)}
            onError={handleImgError}
            alt={hero.title}
            className="w-full h-96 object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
        {categoryName && (
          <span className="text-xs font-semibold text-primary uppercase tracking-wide">
            {categoryName}
          </span>
        )}
        <h2 className="font-serif text-3xl font-bold leading-tight mt-2 group-hover:text-primary">
          {hero.title}
        </h2>
        {hero.excerpt && <p className="text-gray-500 mt-2">{hero.excerpt}</p>}
        <span className="text-xs text-gray-400 mt-2 block">
          {formatRelativeTime(hero.publishedAt || hero.createdAt)}
        </span>
      </Link>

      <div className="space-y-4 divide-y divide-gray-100">
        {rest.slice(0, 4).map((article) => (
          <div key={article._id || article.slug} className="pt-4 first:pt-0">
            <Link to={`/article/${article.slug}`} className="group block">
              <h3 className="font-semibold text-base leading-snug group-hover:text-primary line-clamp-2">
                {article.title}
              </h3>
              <span className="text-xs text-gray-400 mt-1 block">
                {formatRelativeTime(article.publishedAt || article.createdAt)}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;