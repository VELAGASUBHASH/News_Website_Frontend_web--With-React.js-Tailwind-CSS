import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import AdminLayout from "../layouts/AdminLayout";
import StatCard from "../components/StatCard";
import Loader from "../components/Loader";
import {
  getDashboardOverview,
  getMonthlyUsers,
  getMonthlyArticles,
  getTopCategories,
  getTopAuthors,
} from "../services/dashboardService";

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Backend returns [{ _id: { month: 7 }, users: 3 }] — map to chart-friendly { month: "Jul", count: 3 }
const normalizeMonthlyData = (rawData, valueKey) =>
  (Array.isArray(rawData) ? rawData : []).map((item) => ({
    month: MONTH_NAMES[(item._id?.month ?? 1) - 1] ?? "?",
    count: item[valueKey] ?? 0,
  }));

// Backend returns [{ _id, totalArticles, category: [{ name }] }] — flatten to { name, count }
const normalizeTopCategories = (rawData) =>
  (Array.isArray(rawData) ? rawData : []).map((item) => ({
    name: item.category?.[0]?.name ?? "Unknown",
    count: item.totalArticles ?? 0,
  }));

// Backend returns [{ _id, articles, author: [{ fullName }] }] — flatten to { name, count }
const normalizeTopAuthors = (rawData) =>
  (Array.isArray(rawData) ? rawData : []).map((item) => ({
    name: item.author?.[0]?.fullName ?? "Unknown",
    count: item.articles ?? 0,
  }));

const AdminDashboard = () => {
  const [overview, setOverview] = useState(null);
  const [monthlyUsers, setMonthlyUsers] = useState([]);
  const [monthlyArticles, setMonthlyArticles] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [topAuthors, setTopAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchAll = async () => {
      setLoading(true);
      try {
        const [overviewData, usersData, articlesData, categoriesData, authorsData] =
          await Promise.all([
            getDashboardOverview(),
            getMonthlyUsers(),
            getMonthlyArticles(),
            getTopCategories(),
            getTopAuthors(),
          ]);

        if (!isMounted) return;
        setOverview(overviewData.statistics ?? {});
        setMonthlyUsers(normalizeMonthlyData(usersData, "users"));
        setMonthlyArticles(normalizeMonthlyData(articlesData, "articles"));
        setTopCategories(normalizeTopCategories(categoriesData));
        setTopAuthors(normalizeTopAuthors(authorsData));
      } catch (err) {
        if (!isMounted) return;
        setError("Could not load dashboard data.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAll();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <AdminLayout><Loader /></AdminLayout>;

  return (
    <AdminLayout>
      {error && <p className="text-primary text-sm mb-4">{error}</p>}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total Users" value={overview?.totalUsers ?? "—"} />
        <StatCard label="Total Articles" value={overview?.totalArticles ?? "—"} accent />
        <StatCard label="Total Categories" value={overview?.totalCategories ?? "—"} />
        <StatCard label="Total Comments" value={overview?.totalComments ?? "—"} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label="Published" value={overview?.publishedArticles ?? "—"} />
        <StatCard label="Drafts" value={overview?.draftArticles ?? "—"} />
        <StatCard label="Total Likes" value={overview?.totalLikes ?? "—"} />
        <StatCard label="Total Bookmarks" value={overview?.totalBookmarks ?? "—"} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="border border-gray-200 rounded-md p-5">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Monthly Users
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyUsers}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#C8102E" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="border border-gray-200 rounded-md p-5">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Monthly Articles
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyArticles}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#111111" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="border border-gray-200 rounded-md p-5">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Top Categories
          </h3>
          {topCategories.length === 0 ? (
            <p className="text-sm text-gray-400">No data available.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {topCategories.map((cat, idx) => (
                <li key={idx} className="flex items-center justify-between py-2 text-sm">
                  <span>{cat.name}</span>
                  <span className="font-semibold text-primary">{cat.count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border border-gray-200 rounded-md p-5">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Top Authors
          </h3>
          {topAuthors.length === 0 ? (
            <p className="text-sm text-gray-400">No data available.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {topAuthors.map((author, idx) => (
                <li key={idx} className="flex items-center justify-between py-2 text-sm">
                  <span>{author.name}</span>
                  <span className="font-semibold text-primary">{author.count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
