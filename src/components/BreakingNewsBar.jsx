import { Link } from "react-router-dom";
import { useArticles } from "../hooks/useArticles";

const BreakingNewsBar = () => {
  const { articles, loading } = useArticles({ breaking: true, limit: 5 });

  if (loading || !articles.length) return null;

  return (
    <div className="bg-ink text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-4">
        <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-sm flex-shrink-0">
          BREAKING
        </span>
        <div className="flex gap-8 overflow-x-auto scrollbar-hide text-sm">
          {articles.map((article) => (
            <Link
              key={article._id || article.slug}
              to={`/article/${article.slug}`}
              className="whitespace-nowrap hover:text-primary-light"
            >
              {article.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsBar;