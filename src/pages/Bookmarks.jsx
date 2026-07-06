import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import ArticleGrid from "../components/ArticleGrid";
import { getBookmarks } from "../services/bookmarkService";

const Bookmarks = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchBookmarks = async () => {
      setLoading(true);
      try {
        const data = await getBookmarks();
        if (!isMounted) return;
        const list = data.bookmarks ?? data ?? [];
        // Normalize: each item might be the article itself, or a wrapper { article: {...} }
        const normalized = list.map((item) => item.article ?? item);
        setArticles(normalized);
      } catch (err) {
        if (!isMounted) return;
        setError("Could not load your saved articles.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBookmarks();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold font-serif mb-2">Saved Articles</h1>
        <p className="text-gray-500 text-sm mb-8">Articles you've bookmarked for later.</p>

        {error && <p className="text-primary text-sm mb-4">{error}</p>}
        <ArticleGrid articles={articles} loading={loading} />
      </div>
    </MainLayout>
  );
};

export default Bookmarks;