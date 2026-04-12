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

const AdminStats = () => {
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Active Bookings",
      value: "56",
      icon: Calendar,
      color: "bg-green-500",
    },
    {
      title: "Total Rooms",
      value: "24",
      icon: DoorOpen,
      color: "bg-purple-500",
    },
    {
      title: "Revenue",
      value: "$12,450",
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