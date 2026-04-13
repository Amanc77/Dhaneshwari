import React, { useEffect, useState, useCallback } from "react";
import { Search, Edit, Trash2, Plus, Eye } from "lucide-react";
import Modal from "./Modal";
import api from "../../api/axios";

function formatDate(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return "—";
  }
}

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
  });

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/admin/users", {
        params: { page, limit: 20, search: searchTerm.trim() || undefined },
      });
      setUsers(data.users || []);
      setTotalPages(data.totalPages || 1);
    } catch (e) {
      setError(e?.response?.data?.error || "Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm]);

  useEffect(() => {
    const t = setTimeout(() => {
      loadUsers();
    }, searchTerm ? 300 : 0);
    return () => clearTimeout(t);
  }, [loadUsers, searchTerm]);

  const openAddModal = () => {
    setCurrentUser(null);
    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "user",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setCurrentUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      password: "",
      phone: user.phone || "",
      role: user.role || "user",
    });
    setIsModalOpen(true);
  };

  const openViewModal = (user) => {
    setCurrentUser(user);
    setIsViewModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setCurrentUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (currentUser) {
        const payload = {
          name: formData.name,
          phone: formData.phone,
          role: formData.role,
        };
        if (formData.password && formData.password.length >= 6) {
          payload.password = formData.password;
        }
        await api.put(`/admin/users/${currentUser._id}`, payload);
      } else {
        await api.post("/admin/users", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          role: formData.role,
        });
      }
      closeModal();
      loadUsers();
    } catch (err) {
      setError(err?.response?.data?.error || "Could not save user");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user from the database?")) return;
    setError("");
    try {
      await api.delete(`/admin/users/${id}`);
      loadUsers();
    } catch (err) {
      setError(err?.response?.data?.error || "Could not delete user");
    }
  };

  const roleLabel = (r) =>
    r === "admin" ? "Admin" : "User";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600 mt-1">MongoDB <code className="text-sm bg-gray-100 px-1 rounded">users</code> collection</p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus size={20} />
          Add user
        </button>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>
      )}

      <div className="bg-white rounded-lg p-4 shadow-md">
        <div className="flex gap-4 flex-wrap items-center">
          <div className="flex-1 min-w-[200px] relative">
            <Search size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => {
                setPage(1);
                setSearchTerm(e.target.value);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Role</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Phone</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Joined</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Loading…
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3 font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-3 text-gray-600">{user.email}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {roleLabel(user.role)}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-600">{user.phone || "—"}</td>
                    <td className="px-6 py-3 text-gray-600">{formatDate(user.createdAt)}</td>
                    <td className="px-6 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => openViewModal(user)}
                          className="p-2 hover:bg-blue-100 rounded-lg text-blue-600"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => openEditModal(user)}
                          className="p-2 hover:bg-blue-100 rounded-lg text-blue-600"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteUser(user._id)}
                          className="p-2 hover:bg-red-100 rounded-lg text-red-600"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 p-4 border-t">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1 rounded border disabled:opacity-50"
            >
              Previous
            </button>
            <span className="py-1 text-sm text-gray-600">
              Page {page} / {totalPages}
            </span>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1 rounded border disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={currentUser ? "Edit user" : "Add user"}
      >
        <form onSubmit={handleSaveUser} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={Boolean(currentUser)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {currentUser ? "New password (optional)" : "Password"}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required={!currentUser}
              minLength={currentUser ? 0 : 6}
              autoComplete="new-password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={currentUser ? "Leave blank to keep current" : "Min 6 characters"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium"
            >
              {currentUser ? "Save changes" : "Create user"}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 bg-gray-200 text-gray-900 py-2 rounded-lg hover:bg-gray-300 font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isViewModalOpen} onClose={closeViewModal} title="User details">
        {currentUser && (
          <div className="space-y-4">
            <p><span className="text-gray-500">Name:</span> {currentUser.name}</p>
            <p><span className="text-gray-500">Email:</span> {currentUser.email}</p>
            <p><span className="text-gray-500">Role:</span> {roleLabel(currentUser.role)}</p>
            <p><span className="text-gray-500">Phone:</span> {currentUser.phone || "—"}</p>
            <p><span className="text-gray-500">Joined:</span> {formatDate(currentUser.createdAt)}</p>
            <div className="flex gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => {
                  closeViewModal();
                  openEditModal(currentUser);
                }}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={closeViewModal}
                className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminUsers;
