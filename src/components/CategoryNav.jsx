import { NavLink } from "react-router-dom";
import { useCategories } from "../hooks/useCategories";

const CategoryNav = () => {
  const { categories, loading } = useCategories();

  if (loading || !categories.length) return null;

  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex gap-6 overflow-x-auto scrollbar-hide py-3 text-sm font-medium">
          {categories.map((category) => (
            <NavLink
              key={category._id}
              to={`/category/${category._id}`}
              className={({ isActive }) =>
                `whitespace-nowrap pb-1 border-b-2 transition ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-ink hover:text-primary"
                }`
              }
            >
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CategoryNav;