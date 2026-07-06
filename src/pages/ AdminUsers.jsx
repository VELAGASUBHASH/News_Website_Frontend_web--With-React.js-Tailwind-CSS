import { useState, useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";
import Loader from "../components/Loader";
import Badge from "../components/Badge";
import ConfirmDialog from "../components/ConfirmDialog";
import {
  getAllUsers,
  updateUserRole,
  updateUserStatus,
  deleteUser,
} from "../services/adminUserService";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data.users ?? data ?? []);
    } catch (err) {
      setError("Could not load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, role) => {
    const prev = users;
    setUsers((u) => u.map((usr) => (usr._id === id ? { ...usr, role } : usr)));
    try {
      await updateUserRole(id, role);
    } catch (err) {
      setUsers(prev);
      setError("Could not update role.");
    }
  };


const handleStatusToggle = async (id, currentStatus) => {
  const newStatus = currentStatus === "Active" ? "Blocked" : "Active";
  const prev = users;
  setUsers((u) => u.map((usr) => (usr._id === id ? { ...usr, status: newStatus } : usr)));
  try {
    await updateUserStatus(id, newStatus);
  } catch (err) {
    setUsers(prev);
    setError("Could not update status.");
  }
};

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    try {
      await deleteUser(pendingDelete._id);
      setUsers((u) => u.filter((usr) => usr._id !== pendingDelete._id));
      setPendingDelete(null);
    } catch (err) {
      setError("Could not delete user.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <AdminLayout><Loader /></AdminLayout>;

  return (
    <AdminLayout>
      <h2 className="text-xl font-bold font-serif mb-6">User Management</h2>
      {error && <p className="text-primary text-sm mb-4">{error}</p>}

      <div className="overflow-x-auto border border-gray-200 rounded-md">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => (
              <tr key={u._id}>
                <td className="px-4 py-3 font-medium">{u.name}</td>
                <td className="px-4 py-3 text-gray-500">{u.email}</td>
                <td className="px-4 py-3">
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                    className="text-xs border border-gray-300 rounded-md px-2 py-1 outline-none"
                  >

<option value="User">User</option>
<option value="Admin">Admin</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => handleStatusToggle(u._id, u.status)}>
// Replace the Badge rendering for status:
<Badge variant={u.status === "Active" ? "success" : "danger"}>
  {u.status || "Active"}
</Badge>
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => setPendingDelete(u)}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pendingDelete && (
        <ConfirmDialog
          title="Delete user"
          message={`Are you sure you want to delete ${pendingDelete.name}? This cannot be undone.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setPendingDelete(null)}
          loading={deleting}
        />
      )}
    </AdminLayout>
  );
};

export default AdminUsers;