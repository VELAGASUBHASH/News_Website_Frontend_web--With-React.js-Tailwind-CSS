import { useState, useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";
import Loader from "../components/Loader";
import Button from "../components/Button";
import ConfirmDialog from "../components/ConfirmDialog";
import CategoryFormModal from "../components/CategoryFormModal";
import { getCategories } from "../services/categoryService";
import { createCategory, updateCategory, deleteCategory } from "../services/adminCategoryService";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCategory, setEditingCategory] = useState(undefined); // undefined = closed, null = new, obj = edit
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data.categories ?? data ?? []);
    } catch (err) {
      setError("Could not load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSave = async (formData) => {
    try {
      if (editingCategory && editingCategory._id) {
        const data = await updateCategory(editingCategory._id, formData);
        const updated = data.category ?? data;
        setCategories((cats) =>
          cats.map((c) => (c._id === editingCategory._id ? { ...c, ...updated } : c))
        );
      } else {
        const data = await createCategory(formData);
        const created = data.category ?? data;
        setCategories((cats) => [...cats, created]);
      }
      setEditingCategory(undefined);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    try {
      await deleteCategory(pendingDelete._id);
      setCategories((cats) => cats.filter((c) => c._id !== pendingDelete._id));
      setPendingDelete(null);
    } catch (err) {
      setError("Could not delete category. It may have articles attached.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <AdminLayout><Loader /></AdminLayout>;

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold font-serif">Categories</h2>
        <Button onClick={() => setEditingCategory(null)} fullWidth={false}>
          + New Category
        </Button>
      </div>

      {error && <p className="text-primary text-sm mb-4">{error}</p>}

      <div className="border border-gray-200 rounded-md divide-y divide-gray-100">
        {categories.map((cat) => (
          <div key={cat._id} className="flex items-center justify-between px-4 py-3">
            <span className="text-sm font-medium">{cat.name}</span>
            <div className="flex gap-3">
              <button
                onClick={() => setEditingCategory(cat)}
                className="text-xs font-medium text-gray-500 hover:text-primary"
              >
                Edit
              </button>
              <button
                onClick={() => setPendingDelete(cat)}
                className="text-xs font-medium text-gray-500 hover:text-primary"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {categories.length === 0 && (
          <p className="px-4 py-8 text-center text-gray-400 text-sm">No categories yet.</p>
        )}
      </div>

      {editingCategory !== undefined && (
        <CategoryFormModal
          initialData={editingCategory}
          onSave={handleSave}
          onClose={() => setEditingCategory(undefined)}
        />
      )}

      {pendingDelete && (
        <ConfirmDialog
          title="Delete category"
          message={`Delete "${pendingDelete.name}"? Articles in this category may be affected.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setPendingDelete(null)}
          loading={deleting}
        />
      )}
    </AdminLayout>
  );
};

export default AdminCategories;