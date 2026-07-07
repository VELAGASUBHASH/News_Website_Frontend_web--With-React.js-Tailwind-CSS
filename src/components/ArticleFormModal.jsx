import { useState } from "react";
import Modal from "./Modal";
import FormInput from "./FormInput";
import Button from "./Button";
import ImageUploadField from "./ImageUploadField";
import { useCategories } from "../hooks/useCategories";

const ArticleFormModal = ({ initialData, onSave, onClose }) => {
  const { categories } = useCategories();
  const [form, setForm] = useState({
  title: initialData?.title || "",
  summary: initialData?.summary || "",
  content: initialData?.content || "",
  category: initialData?.category?._id || initialData?.category || "",
  coverImage: initialData?.coverImage || { url: "", publicId: "" },
  tags: (initialData?.tags || []).join(", "),
  isFeatured: initialData?.isFeatured || false,
  isBreaking: initialData?.isBreaking || false,
  status: initialData?.status || "PUBLISHED",
});
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.summary.trim() || !form.content.trim() || !form.category) {
      setError("Title, summary, content, and category are required.");
      return;
    }
    setSaving(true);
    setError(null);

    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    const success = await onSave(payload);
    setSaving(false);
    if (!success) setError("Could not save article.");
  };

  return (
    <Modal title={initialData ? "Edit Article" : "New Article"} onClose={onClose} maxWidth="max-w-2xl">
      <form onSubmit={handleSubmit}>
        {error && <p className="text-sm text-primary mb-3">{error}</p>}

        <FormInput label="Title" name="title" value={form.title} onChange={handleChange} />
        <FormInput label="Summary" name="summary" value={form.summary} onChange={handleChange} />

        <div className="mb-4">
          <label className="block text-sm font-medium text-ink mb-1">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-ink mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-primary/40 text-sm"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <FormInput
          label="Tags (comma-separated)"
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="e.g. amaravati, infrastructure, crda"
        />

        <ImageUploadField
  value={form.coverImage}
  onChange={(coverImageObj) => setForm({ ...form, coverImage: coverImageObj })}
/>

        <div className="flex items-center gap-6 mb-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="isBreaking" checked={form.isBreaking} onChange={handleChange} />
            Breaking
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="text-sm border border-gray-300 rounded-md px-2 py-1 outline-none"
          >
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
          </select>
        </div>

        <Button type="submit" loading={saving} fullWidth={false}>
          Save Article
        </Button>
      </form>
    </Modal>
  );
};

export default ArticleFormModal;
