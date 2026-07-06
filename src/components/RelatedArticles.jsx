import ArticleCard from "./ArticleCard";

const RelatedArticles = ({ articles }) => {
  if (!articles.length) return null;

  return (
    <div className="mt-16 border-t border-gray-200 pt-10">
      <h2 className="text-xl font-bold font-serif mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <ArticleCard key={article._id || article.slug} article={article} />
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;