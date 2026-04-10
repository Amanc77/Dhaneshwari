import React from "react";
import AdminStats from "./AdminStats";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AdminDashboard = () => {
  const chartData = [
    { month: "Jan", bookings: 40, revenue: 2400 },
    { month: "Feb", bookings: 45, revenue: 2210 },
    { month: "Mar", bookings: 50, revenue: 2290 },
    { month: "Apr", bookings: 55, revenue: 2000 },
    { month: "May", bookings: 60, revenue: 2181 },
    { month: "Jun", bookings: 70, revenue: 2500 },
  ];

  const recentBookings = [
    { id: 1, guest: "John Doe", room: "Room 101", date: "2026-04-10", status: "Confirmed" },
    { id: 2, guest: "Jane Smith", room: "Room 205", date: "2026-04-11", status: "Pending" },
    { id: 3, guest: "Mike Johnson", room: "Room 310", date: "2026-04-12", status: "Confirmed" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, Admin</p>
      </div>

      {/* Statistics */}
      <AdminStats />

      {/* Charts and Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Bookings & Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" fill="#3B82F6" />
              <Bar dataKey="revenue" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Info */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Info</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Occupancy Rate:</span>
              <span className="font-bold text-gray-900">78%</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Avg. Rating:</span>
              <span className="font-bold text-gray-900">4.8/5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending Tasks:</span>
              <span className="font-bold text-gray-900">3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">Guest</th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">Room</th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">Date</th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900">{booking.guest}</td>
                  <td className="px-4 py-3 text-gray-900">{booking.room}</td>
                  <td className="px-4 py-3 text-gray-900">{booking.date}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;