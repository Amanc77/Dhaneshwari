import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  DoorOpen,
  Menu,
  X,
} from "lucide-react";

const AdminSidebar = ({ isOpen }) => {
  const location = useLocation();

  const menuItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
    { path: "/admin/users", icon: Users, label: "Users" },
    { path: "/admin/bookings", icon: Calendar, label: "Bookings" },
    { path: "/admin/rooms", icon: DoorOpen, label: "Rooms" },
    { path: "/admin/testimonials", icon: DoorOpen, label: "Testimonials" },
  ];

  const isActive = (path, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-gray-900 text-white transition-all duration-300 flex flex-col`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <h1 className={`font-bold text-xl ${!isOpen && "text-center"}`}>
          {isOpen ? "Dhaneshwari" : "D"}
        </h1>
        <p className={`text-xs text-gray-400 ${!isOpen && "hidden"}`}>
          Admin Panel
        </p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path, item.exact);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
              title={!isOpen ? item.label : ""}
            >
              <Icon size={20} />
              {isOpen && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <button
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          title="Logout"
        >
          <span className={isOpen ? "" : "hidden"}>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;