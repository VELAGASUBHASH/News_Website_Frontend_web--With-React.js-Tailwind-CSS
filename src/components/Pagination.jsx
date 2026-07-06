const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1.5 text-sm border border-gray-300 rounded-md disabled:opacity-40 hover:border-primary"
      >
        Prev
      </button>

      {pages.map((p, idx) => (
        <span key={p} className="flex items-center">
          {idx > 0 && p - pages[idx - 1] > 1 && <span className="px-1 text-gray-400">...</span>}
          <button
            onClick={() => onPageChange(p)}
            className={`px-3 py-1.5 text-sm rounded-md border ${
              p === page ? "bg-primary text-white border-primary" : "border-gray-300 hover:border-primary"
            }`}
          >
            {p}
          </button>
        </span>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1.5 text-sm border border-gray-300 rounded-md disabled:opacity-40 hover:border-primary"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;