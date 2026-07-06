import { useState, useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";
import Loader from "../components/Loader";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Pagination from "../components/Pagination";
import ConfirmDialog from "../components/ConfirmDialog";
import ArticleFormModal from "../components/ArticleFormModal";
import { getArticles } from "../services/articleService";
import { createArticle, updateArticle, deleteArticle } from "../services/adminArticleService";
import { formatDate } from "../utils/formatDate";

const LIMIT = 10;

const AdminArticles = () => {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingArticle, setEditingArticle] = useState(undefined);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchArticles = async (page = 1) => {
    setLoading(true);
    try {
      const data = await getArticles({ page, limit: LIMIT, sort: "latest" });
      setArticles(data.articles ?? []);
      setPagination({ page: data.page ?? page, totalPages: data.totalPages ?? 1 });
    } catch (err) {
      setError("Could not load articles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(1);
  }, []);

  const handleSave = async (formData) => {
    try {
      if (editingArticle && editingArticle._id) {
        await updateArticle(editingArticle._id, formData);
      } else {
        await createArticle(formData);
      }
      setEditingArticle(undefined);
      fetchArticles(pagination.page);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    try {
      await deleteArticle(pendingDelete._id);
      setPendingDelete(null);
      fetchArticles(pagination.page);
    } catch (err) {
      setError("Could not delete article.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <AdminLayout><Loader /></AdminLayout>;

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold font-serif">Articles</h2>
        <Button onClick={() => setEditingArticle(null)} fullWidth={false}>
          + New Article
        </Button>
      </div>

      {error && <p className="text-primary text-sm mb-4">{error}</p>}

      <div className="overflow-x-auto border border-gray-200 rounded-md">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {articles.map((article) => {
              const categoryName =
                typeof article.category === "string" ? article.category : article.category?.name;
              return (
                <tr key={article._id}>
                  <td className="px-4 py-3 font-medium max-w-xs truncate">{article.title}</td>
                  <td className="px-4 py-3 text-gray-500">{categoryName}</td>
                  <td className="px-4 py-3">
<Badge variant={article.status === "DRAFT" ? "neutral" : "success"}>
  {article.status || "PUBLISHED"}
</Badge>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {formatDate(article.publishedAt || article.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setEditingArticle(article)}
                      className="text-xs font-medium text-gray-500 hover:text-primary mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setPendingDelete(article)}
                      className="text-xs font-medium text-gray-500 hover:text-primary"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            {articles.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                  No articles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={(p) => fetchArticles(p)}
      />

      {editingArticle !== undefined && (
        <ArticleFormModal
          initialData={editingArticle}
          onSave={handleSave}
          onClose={() => setEditingArticle(undefined)}
        />
      )}

      {pendingDelete && (
        <ConfirmDialog
          title="Delete article"
          message={`Delete "${pendingDelete.title}"? This cannot be undone.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setPendingDelete(null)}
          loading={deleting}
        />
      )}
    </AdminLayout>
  );
};

export default AdminArticles;