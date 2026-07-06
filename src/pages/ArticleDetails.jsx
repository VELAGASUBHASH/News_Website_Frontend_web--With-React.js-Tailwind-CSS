import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Loader from "../components/Loader";
import RelatedArticles from "../components/RelatedArticles";
import LikeButton from "../components/LikeButton";
import BookmarkButton from "../components/BookmarkButton";
import CommentSection from "../components/CommentSection";
import { getArticleBySlug } from "../services/articleService";
import { formatDate } from "../utils/formatDate";
import { getPlaceholderImage } from "../utils/placeholderImage";

const handleImgError = (e) => {
  e.target.onerror = null;
  e.target.src = getPlaceholderImage();
};

const ArticleDetails = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getArticleBySlug(slug);
        if (!isMounted) return;
        setArticle(data.article);
        setRelated(data.relatedArticles ?? []);
      } catch (err) {
        if (!isMounted) return;
        setError(err.response?.data?.message || "This article could not be found.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchArticle();
    window.scrollTo({ top: 0 });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <MainLayout>
        <Loader fullScreen />
      </MainLayout>
    );
  }

  if (error || !article) {
    return (
      <MainLayout>
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-2">Article not found</h1>
          <p className="text-gray-500 mb-6">{error}</p>
          <Link to="/" className="text-primary font-semibold">
            Back to homepage
          </Link>
        </div>
      </MainLayout>
    );
  }

  const categoryName = article.category?.name;
  const authorName = article.author?.fullName;

  return (
    <MainLayout>
      <article className="max-w-3xl mx-auto px-4 py-12">
        {categoryName && (
          <Link
            to={`/category/${article.category?._id}`}
            className="text-xs font-semibold text-primary uppercase tracking-wide"
          >
            {categoryName}
          </Link>
        )}
        <h1 className="text-3xl md:text-4xl font-bold font-serif leading-tight mt-3">
          {article.title}
        </h1>

        <div className="flex items-center justify-between flex-wrap gap-3 mt-4 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            {authorName && (
              <>
                <span>By {authorName}</span>
                <span>•</span>
              </>
            )}
            <span>{formatDate(article.publishedAt || article.createdAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <LikeButton articleId={article._id} />
            <BookmarkButton articleId={article._id} />
          </div>
        </div>

        <img
          src={article.coverImage || getPlaceholderImage(article.title)}
          onError={handleImgError}
          alt={article.title}
          className="w-full h-96 object-cover rounded-sm my-8 bg-gray-100"
        />

        <div
          className="prose max-w-none prose-headings:font-serif prose-a:text-primary"
          dangerouslySetInnerHTML={{ __html: article.content || "" }}
        />

        <CommentSection articleId={article._id} />
        <RelatedArticles articles={related} />
      </article>
    </MainLayout>
  );
};

export default ArticleDetails;