import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getLikeCount, getLikeStatus, toggleLike } from "../services/likeService";

const POLL_INTERVAL_MS = 15000;

const HeartIcon = ({ filled }) => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 21s-6.5-4.35-9.33-8.28C1 10.36 1.5 6.5 4.9 5.1 7.2 4.15 9.6 5 12 7.5c2.4-2.5 4.8-3.35 7.1-2.4 3.4 1.4 3.9 5.26 2.23 7.62C18.5 16.65 12 21 12 21z" />
  </svg>
);

const LikeButton = ({ articleId }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchLikeData = useCallback(async () => {
    try {
      const countData = await getLikeCount(articleId);
      setCount(countData.likes ?? 0);

      if (isAuthenticated) {
        const statusData = await getLikeStatus(articleId);
        setLiked(!!statusData.liked);
      }
    } catch (err) {
      // Fail silently, keep current values
    }
  }, [articleId, isAuthenticated]);

  useEffect(() => {
    let isMounted = true;

    const initialFetch = async () => {
      setLoading(true);
      if (isMounted) await fetchLikeData();
      if (isMounted) setLoading(false);
    };
    initialFetch();

    const interval = setInterval(() => {
      if (document.visibilityState === "visible") fetchLikeData();
    }, POLL_INTERVAL_MS);

    const handleFocus = () => fetchLikeData();
    window.addEventListener("focus", handleFocus);

    return () => {
      isMounted = false;
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
    };
  }, [fetchLikeData]);

  const handleClick = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (submitting) return;

    const prevLiked = liked;
    const prevCount = count;
    setLiked(!prevLiked);
    setCount(prevLiked ? prevCount - 1 : prevCount + 1);
    setSubmitting(true);

    try {
      const data = await toggleLike(articleId);
      setLiked(!!data.liked);
      // API doesn't echo back the new count on toggle, so refetch to get the true total
      const countData = await getLikeCount(articleId);
      setCount(countData.likes ?? (data.liked ? prevCount + 1 : prevCount - 1));
    } catch (err) {
      setLiked(prevLiked);
      setCount(prevCount);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-sm font-medium transition ${
        liked
          ? "border-primary text-primary bg-red-50"
          : "border-gray-300 text-gray-600 hover:border-primary hover:text-primary"
      }`}
    >
      <HeartIcon filled={liked} />
      <span>{count}</span>
    </button>
  );
};

export default LikeButton;