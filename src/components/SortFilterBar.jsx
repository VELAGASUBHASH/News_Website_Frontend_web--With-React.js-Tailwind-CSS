const SortFilterBar = ({ sort, onSortChange, resultCount }) => {
  return (
    <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
      <span className="text-sm text-gray-500">
        {resultCount != null ? `${resultCount} articles found` : ""}
      </span>
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="text-sm border border-gray-300 rounded-md px-3 py-1.5 outline-none focus:ring-2 focus:ring-primary/40"
      >
        <option value="latest">Latest</option>
        <option value="popular">Most Popular</option>
      </select>
    </div>
  );
};

export default SortFilterBar;