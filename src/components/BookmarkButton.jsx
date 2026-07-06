import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getBookmarkStatus, toggleBookmark } from "../services/bookmarkService";

const BookmarkIcon = ({ filled }) => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M6 3h12a1 1 0 011 1v17l-7-4-7 4V4a1 1 0 011-1z" />
  </svg>
);

const BookmarkButton = ({ articleId }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchStatus = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }
      try {
        const data = await getBookmarkStatus(articleId);
        if (!isMounted) return;
        setBookmarked(!!data.bookmarked);
      } catch (err) {
        // Fail silently
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchStatus();
    return () => {
      isMounted = false;
    };
  }, [articleId, isAuthenticated]);

  const handleClick = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (submitting) return;

    const prevBookmarked = bookmarked;
    setBookmarked(!prevBookmarked);
    setSubmitting(true);

    try {
      const data = await toggleBookmark(articleId);
      if (typeof data.bookmarked === "boolean") setBookmarked(data.bookmarked);
    } catch (err) {
      setBookmarked(prevBookmarked);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      title={bookmarked ? "Remove bookmark" : "Save article"}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-sm font-medium transition ${
        bookmarked
          ? "border-ink text-ink bg-gray-100"
          : "border-gray-300 text-gray-600 hover:border-ink hover:text-ink"
      }`}
    >
      <BookmarkIcon filled={bookmarked} />
      <span>{bookmarked ? "Saved" : "Save"}</span>
    </button>
  );
};

export default BookmarkButton;