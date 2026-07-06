import { useState, useEffect } from "react";
import { getArticles } from "../services/articleService";

export const useArticles = (params = {}) => {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const paramsKey = JSON.stringify(params);

  useEffect(() => {
    let isMounted = true;

    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getArticles(params);
        if (!isMounted) return;
        const list = data.articles ?? data.data ?? [];
        setArticles(list);
        setPagination({
          page: data.page ?? params.page ?? 1,
          totalPages: data.totalPages ?? 1,
          total: data.total ?? list.length,
        });
      } catch (err) {
        if (!isMounted) return;
        setError(err.response?.data?.message || "Failed to load articles.");
        setArticles([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchArticles();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsKey]);

  return { articles, pagination, loading, error };
};