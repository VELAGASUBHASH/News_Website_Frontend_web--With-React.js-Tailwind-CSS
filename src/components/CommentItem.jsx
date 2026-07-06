import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { formatRelativeTime } from "../utils/formatDate";
import CommentForm from "./CommentForm";

const CommentItem = ({ comment, onUpdate, onDelete }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const commenterId = comment.user?._id || comment.user;
  const isOwner = user && commenterId === user._id;
  const commenterName = comment.user?.name || "Anonymous";
  const commenterAvatar = comment.user?.profileimg;

  const handleUpdate = async (content) => {
    const success = await onUpdate(comment._id, content);
    if (success) setIsEditing(false);
    return success;
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this comment?")) return;
    setDeleting(true);
    await onDelete(comment._id);
    setDeleting(false);
  };

  if (isEditing) {
    return (
      <div className="py-4 border-b border-gray-100">
        <CommentForm
          initialValue={comment.content}
          submitLabel="Save"
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="py-4 border-b border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {commenterAvatar && (
            <img
              src={commenterAvatar}
              alt={commenterName}
              className="w-6 h-6 rounded-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          )}
          <span className="text-sm font-semibold">{commenterName}</span>
        </div>
        <span className="text-xs text-gray-400">
          {formatRelativeTime(comment.createdAt)}
        </span>
      </div>
      <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">{comment.content}</p>
      {isOwner && (
        <div className="flex gap-3 mt-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-xs font-medium text-gray-500 hover:text-primary"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-xs font-medium text-gray-500 hover:text-primary disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentItem;