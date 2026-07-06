import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="font-serif text-2xl font-bold text-ink flex-shrink-0">
          Amaravati <span className="text-primary">Times</span>
        </Link>

        <div className="hidden md:block flex-1 max-w-xs">
          <SearchBar />
        </div>

        <nav className="flex items-center gap-4 flex-shrink-0">
          {isAuthenticated ? (
            <>
              <Link to="/bookmarks" className="text-sm font-medium hover:text-primary">
                Saved
              </Link>
              <Link to="/profile" className="text-sm font-medium hover:text-primary">
                {user?.name || "Profile"}
              </Link>
              {user?.role?.toLowerCase() === "admin" && (
  <Link to="/admin" className="text-sm font-medium hover:text-primary">
    Admin
  </Link>
)}
              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-white bg-primary px-3 py-1.5 rounded-md hover:bg-primary-dark"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium hover:text-primary">
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-semibold text-white bg-primary px-3 py-1.5 rounded-md hover:bg-primary-dark"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
      <div className="md:hidden px-4 pb-3">
        <SearchBar />
      </div>
    </header>
  );
};

export default Navbar;