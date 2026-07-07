import { Link } from "react-router-dom";
import { formatRelativeTime } from "../utils/formatDate";
import { getPlaceholderImage } from "../utils/placeholderImage";

const handleImgError = (e) => {
  e.target.onerror = null; // prevent infinite loop if fallback also fails
  e.target.src = getPlaceholderImage();
};

const ArticleCard = ({ article, variant = "default" }) => {
  const categoryName =
    typeof article.category === "string" ? article.category : article.category?.name;

  if (variant === "horizontal") {
    return (
      <Link
        to={`/article/${article.slug}`}
        className="flex gap-4 group border-b border-gray-100 pb-4"
      >
        <img
          src={article.coverImage?.url || getPlaceholderImage()}
          onError={handleImgError}
          alt={article.title}
          className="w-28 h-20 object-cover rounded-sm flex-shrink-0 bg-gray-100"
        />
        <div className="min-w-0">
          {categoryName && (
            <span className="text-xs font-semibold text-primary uppercase tracking-wide">
              {categoryName}
            </span>
          )}
          <h3 className="text-sm font-semibold leading-snug mt-1 group-hover:text-primary line-clamp-2">
            {article.title}
          </h3>
          <span className="text-xs text-gray-400 mt-1 block">
            {formatRelativeTime(article.publishedAt || article.createdAt)}
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/article/${article.slug}`} className="group block">
      <div className="overflow-hidden rounded-sm mb-3 bg-gray-100">
        <img
          src={article.coverImage || getPlaceholderImage()}
          onError={handleImgError}
          alt={article.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
        />
      </div>
      {categoryName && (
        <span className="text-xs font-semibold text-primary uppercase tracking-wide">
          {categoryName}
        </span>
      )}
      <h3 className="font-serif text-lg font-bold leading-snug mt-1 group-hover:text-primary line-clamp-2">
        {article.title}
      </h3>
      {article.summary && (
  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{article.summary}</p>
)}
      <span className="text-xs text-gray-400 mt-2 block">
        {formatRelativeTime(article.publishedAt || article.createdAt)}
      </span>
    </Link>
  );
};

export default ArticleCard;
