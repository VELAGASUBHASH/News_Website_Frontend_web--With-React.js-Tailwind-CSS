const ArticleCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="w-full h-48 bg-gray-200 rounded-sm mb-3" />
      <div className="h-3 w-16 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-full bg-gray-200 rounded mb-2" />
      <div className="h-4 w-3/4 bg-gray-200 rounded" />
    </div>
  );
};

export default ArticleCardSkeleton;