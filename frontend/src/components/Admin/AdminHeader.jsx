import React from "react";
import { Menu, Bell, User } from "lucide-react";

const AdminHeader = ({ onMenuClick, sidebarOpen }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Menu Button */}
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <Menu size={24} className="text-gray-700" />
        </button>

        {/* Right: Icons */}
        <div className="flex items-center gap-6">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} className="text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <span className="text-sm text-gray-700">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;