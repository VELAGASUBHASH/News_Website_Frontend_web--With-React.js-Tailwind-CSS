import { useState } from "react";
import Button from "./Button";

const CommentForm = ({ onSubmit, initialValue = "", submitLabel = "Post Comment", onCancel }) => {
  const [content, setContent] = useState(initialValue);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || submitting) return;
    setSubmitting(true);
    const success = await onSubmit(content.trim());
    setSubmitting(false);
    if (success && !initialValue) setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your thoughts..."
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-sm resize-none"
      />
      <div className="flex items-center gap-2 mt-2">
        <Button type="submit" loading={submitting} fullWidth={false}>
          {submitLabel}
        </Button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-gray-500 hover:text-ink px-2"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default CommentForm;