import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getSearchSuggestions } from "../services/articleService";
import { useDebounce } from "../hooks/useDebounce";

const SearchBar = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedQuery = useDebounce(query, 350);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedQuery || debouncedQuery.trim().length < 2) {
        setSuggestions([]);
        return;
      }
      try {
        const data = await getSearchSuggestions(debouncedQuery.trim());
        setSuggestions(data.suggestions ?? data ?? []);
      } catch (err) {
        setSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToSearch = (term) => {
    if (!term.trim()) return;
    navigate(`/search?q=${encodeURIComponent(term.trim())}`);
    setShowSuggestions(false);
    onClose?.();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    goToSearch(query);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xs">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search news..."
          className="w-full px-3 py-1.5 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-sm"
        />
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-72 overflow-y-auto">
          {suggestions.map((item, idx) => {
            const title = typeof item === "string" ? item : item.title;
            const slug = typeof item === "string" ? null : item.slug;
            return (
              <li key={slug || idx}>
                <button
                  type="button"
                  onClick={() => (slug ? navigate(`/article/${slug}`) : goToSearch(title))}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                >
                  {title}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;