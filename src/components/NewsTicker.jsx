import { Link } from "react-router-dom";
import { useArticles } from "../hooks/useArticles";

const NewsTicker = () => {
  const { articles: breaking, loading } = useArticles({ breaking: true, limit: 5 });

  if (loading || breaking.length === 0) return null;

  // Duplicate the list so the marquee loops seamlessly
  const loopItems = [...breaking, ...breaking];

  return (
    <div className="bg-ink text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center gap-4">
        <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-sm flex-shrink-0 z-10">
          BREAKING
        </span>
        <div className="ticker-track flex-1 overflow-hidden">
          <div className="ticker-content flex gap-10 text-sm whitespace-nowrap">
            {loopItems.map((article, idx) => (
              <Link
                key={`${article._id || article.slug}-${idx}`}
                to={`/article/${article.slug}`}
                className="hover:text-primary-light transition"
              >
                {article.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;