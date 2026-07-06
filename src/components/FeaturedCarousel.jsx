import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { formatRelativeTime } from "../utils/formatDate";
import { getPlaceholderImage } from "../utils/placeholderImage";

const AUTO_ROTATE_MS = 5000;

const handleImgError = (e) => {
  e.target.onerror = null;
  e.target.src = getPlaceholderImage();
};

const FeaturedCarousel = ({ articles, loading }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback(
    (index) => {
      if (!articles.length) return;
      setActiveIndex(((index % articles.length) + articles.length) % articles.length);
    },
    [articles.length]
  );

  useEffect(() => {
    if (articles.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % articles.length);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, [articles.length]);

  if (loading) {
    return <div className="w-full h-96 bg-gray-100 rounded-sm animate-pulse" />;
  }

  if (!articles.length) return null;

  const active = articles[activeIndex];
  const categoryName =
    typeof active.category === "string" ? active.category : active.category?.name;

  return (
    <div className="relative">
      <Link to={`/article/${active.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-sm">
          <img
            src={active.coverImage || getPlaceholderImage(active.title)}
            onError={handleImgError}
            alt={active.title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            {categoryName && (
              <span className="text-xs font-semibold text-primary-light uppercase tracking-wide">
                {categoryName}
              </span>
            )}
            <h2 className="text-white font-serif text-2xl md:text-3xl font-bold leading-tight mt-2 group-hover:underline">
              {active.title}
            </h2>
            {active.summary && (
              <p className="text-gray-200 text-sm mt-2 line-clamp-2 max-w-2xl">{active.summary}</p>
            )}
            <span className="text-xs text-gray-300 mt-2 block">
              {formatRelativeTime(active.publishedAt || active.createdAt)}
            </span>
          </div>
        </div>
      </Link>

      {articles.length > 1 && (
        <>
          <button
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Previous"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/90 hover:bg-white rounded-full text-ink shadow"
          >
            ‹
          </button>
          <button
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Next"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/90 hover:bg-white rounded-full text-ink shadow"
          >
            ›
          </button>

          <div className="flex justify-center gap-2 mt-3">
            {articles.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  idx === activeIndex ? "w-6 bg-primary" : "w-1.5 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedCarousel;