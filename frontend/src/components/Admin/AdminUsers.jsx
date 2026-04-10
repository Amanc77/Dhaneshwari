import React, { useState } from "react";
import { Search, Edit, Trash2, Plus, Eye } from "lucide-react";
import Modal from "./Modal";

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "User", status: "Active", joined: "2026-01-15", phone: "9876543210", city: "Mumbai" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active", joined: "2026-02-20", phone: "9876543211", city: "Delhi" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "Admin", status: "Active", joined: "2026-03-10", phone: "9876543212", city: "Bangalore" },
    { id: 4, name: "Sarah Williams", email: "sarah@example.com", role: "User", status: "Inactive", joined: "2026-01-05", phone: "9876543213", city: "Pune" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    role: "User",
    status: "Active",
  });

  // Open Add User Modal
  const openAddModal = () => {
    setCurrentUser(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      city: "",
      role: "User",
      status: "Active",
    });
    setIsModalOpen(true);
  };

  // Open Edit User Modal
  const openEditModal = (user) => {
    setCurrentUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      city: user.city,
      role: user.role,
      status: user.status,
    });
    setIsModalOpen(true);
  };

  // Open View User Modal
  const openViewModal = (user) => {
    setCurrentUser(user);
    setIsViewModalOpen(true);
  };

  // Close Modals
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setCurrentUser(null);
  };

  // Handle Form Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Save User
  const handleSaveUser = (e) => {
    e.preventDefault();

    if (currentUser) {
      // Edit existing user
      setUsers(
        users.map((user) =>
          user.id === currentUser.id
            ? { ...user, ...formData }
            : user
        )
      );
    } else {
      // Add new user
      const newUser = {
        id: Math.max(...users.map((u) => u.id), 0) + 1,
        ...formData,
        joined: new Date().toISOString().split("T")[0],
      };
      setUsers([...users, newUser]);
    }

    closeModal();
  };

  // Handle Delete User
  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  // Filter users based on search
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600 mt-1">Manage all system users</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus size={20} />
          Add User
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 shadow-md">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Role</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Joined</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3 font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-3 text-gray-600">{user.email}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === "Admin"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-600">{user.joined}</td>
                    <td className="px-6 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openViewModal(user)}
                          className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => openEditModal(user)}
                          className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                          title="Edit User"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                          title="Delete User"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={currentUser ? "Edit User" : "Add New User"}
      >
        <form onSubmit={handleSaveUser} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., John Doe"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="e.g., john@example.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone and City */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="e.g., 9876543210"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="e.g., Mumbai"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {currentUser ? "Update User" : "Add User"}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 bg-gray-200 text-gray-900 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* View Details Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        title="User Details"
      >
        {currentUser && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Full Name</p>
                <p className="text-lg font-semibold text-gray-900">{currentUser.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Email</p>
                <p className="text-lg font-semibold text-gray-900">{currentUser.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Phone</p>
                <p className="text-lg font-semibold text-gray-900">{currentUser.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">City</p>
                <p className="text-lg font-semibold text-gray-900">{currentUser.city}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Role</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-1 ${
                    currentUser.role === "Admin"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {currentUser.role}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Status</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-1 ${
                    currentUser.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {currentUser.status}
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600">Joined</p>
              <p className="text-gray-900 mt-1">{currentUser.joined}</p>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <button
                onClick={() => {
                  closeViewModal();
                  openEditModal(currentUser);
                }}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Edit User
              </button>
              <button
                onClick={closeViewModal}
                className="flex-1 bg-gray-200 text-gray-900 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
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