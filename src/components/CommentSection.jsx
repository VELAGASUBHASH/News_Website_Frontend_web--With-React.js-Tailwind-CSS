import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getComments, addComment, updateComment, deleteComment } from "../services/commentService";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import Loader from "./Loader";

const CommentSection = ({ articleId }) => {
  const { isAuthenticated, user } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchComments = async () => {
      setLoading(true);
      try {
        const data = await getComments(articleId);
        if (!isMounted) return;
        setComments(data.comments ?? []);
      } catch (err) {
        if (!isMounted) return;
        setError("Could not load comments.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchComments();
    return () => {
      isMounted = false;
    };
  }, [articleId]);
const handleAdd = async (content) => {
  try {
    const data = await addComment({ articleId, content });
    let newComment = data.comment;

    if (user && (!newComment.user || typeof newComment.user === "string")) {
      newComment = {
        ...newComment,
        user: { _id: user._id, name: user.name, profileimg: user.profileimg },
      };
    }

    setComments((prev) => [newComment, ...prev]);
    return true;
  } catch (err) {
    setError("Could not post comment. Please try again.");
    return false;
  }
};

  const handleUpdate = async (commentId, content) => {
    try {
      const data = await updateComment(commentId, content);
      const updated = data.comment;
      setComments((prev) =>
        prev.map((c) => (c._id === commentId ? { ...c, content: updated.content ?? content } : c))
      );
      return true;
    } catch (err) {
      setError("Could not update comment.");
      return false;
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      setError("Could not delete comment.");
    }
  };

  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      <h2 className="text-xl font-bold font-serif mb-6">
        Comments {comments.length > 0 && `(${comments.length})`}
      </h2>

      {isAuthenticated ? (
        <div className="mb-6">
          <CommentForm onSubmit={handleAdd} />
        </div>
      ) : (
        <p className="text-sm text-gray-500 mb-6">
          <Link to="/login" className="text-primary font-semibold">
            Sign in
          </Link>{" "}
          to join the discussion.
        </p>
      )}

      {error && <p className="text-sm text-primary mb-4">{error}</p>}

      {loading ? (
        <Loader />
      ) : comments.length === 0 ? (
        <p className="text-sm text-gray-400 py-6">No comments yet. Be the first to comment.</p>
      ) : (
        <div>
          {comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;