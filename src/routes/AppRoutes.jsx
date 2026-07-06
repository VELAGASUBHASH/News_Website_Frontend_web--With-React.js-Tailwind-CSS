import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Bookmarks from "../pages/Bookmarks";
import AdminDashboard from "../pages/AdminDashboard";
import AdminArticles from "../pages/AdminArticles";
import AdminCategories from "../pages/AdminCategories";
import AdminUsers from "../pages/ AdminUsers.jsx";
import ArticleDetails from "../pages/ArticleDetails";
import CategoryPage from "../pages/CategoryPage";
import SearchResults from "../pages/SearchResults";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/article/:slug" element={<ArticleDetails />} />
      <Route path="/category/:id" element={<CategoryPage />} />
      <Route path="/search" element={<SearchResults />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Route>

      <Route element={<ProtectedRoute requiredRole="admin" />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/articles" element={<AdminArticles />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/users" element={<AdminUsers />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;