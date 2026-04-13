import React from "react";
import { Users, Calendar, DoorOpen, TrendingUp } from "lucide-react";

const StatCard = ({ icon: Icon, title, value, color }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );
};

function formatNum(n) {
  if (n == null || Number.isNaN(n)) return "—";
  return Number(n).toLocaleString();
}

const AdminStats = ({
  totalUsers,
  activeBookings,
  totalRooms,
  totalRevenue,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-lg p-6 shadow-md animate-pulse h-28 bg-gray-200"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
    );
  }

  const stats = [
    {
      title: "Total Users",
      value: formatNum(totalUsers),
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Bookings (all)",
      value: formatNum(activeBookings),
      icon: Calendar,
      color: "bg-green-500",
    },
    {
      title: "Room types",
      value: formatNum(totalRooms),
      icon: DoorOpen,
      color: "bg-purple-500",
    },
    {
      title: "Revenue (confirmed)",
      value: `₹${formatNum(totalRevenue)}`,
      icon: TrendingUp,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default AdminStats;
