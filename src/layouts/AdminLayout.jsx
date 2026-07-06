import { NavLink } from "react-router-dom";
import MainLayout from "./MainLayout";

const NAV_ITEMS = [
  { to: "/admin", label: "Overview", end: true },
  { to: "/admin/articles", label: "Articles" },
  { to: "/admin/categories", label: "Categories" },
  { to: "/admin/users", label: "Users" },
];

const AdminLayout = ({ children }) => {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold font-serif mb-6">Admin Panel</h1>
        <div className="flex gap-8">
          <aside className="w-48 flex-shrink-0">
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </aside>
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminLayout;