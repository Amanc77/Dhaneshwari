import React, { useEffect, useState } from "react";
import AdminStats from "./AdminStats";
import api from "../../api/axios";

function formatDate(d) {
  if (!d) return "—";
  try {
    return new Date(d).toLocaleDateString();
  } catch {
    return "—";
  }
}

function statusLabel(status) {
  if (!status) return "—";
  return status.charAt(0).toUpperCase() + status.slice(1);
}

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data: res } = await api.get("/admin/dashboard");
        if (!cancelled) {
          setData(res);
          setError("");
        }
      } catch (e) {
        if (!cancelled) {
          setError(
            e?.response?.data?.error ||
              "Could not load dashboard. Sign in as an admin."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const recentBookings = data?.recentBookings || [];
  const occupancy = data?.occupancy || [];
  const avgOccupancy = occupancy.length
    ? Math.round(
        occupancy.reduce((s, o) => s + (o.occupancyPercent || 0), 0) /
          occupancy.length
      )
    : 0;
  const pendingTasks = data?.bookings?.pending ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, Admin</p>
      </div>

      <AdminStats
        totalUsers={data?.totalUsers}
        activeBookings={data?.bookings?.total}
        totalRooms={occupancy.length}
        totalRevenue={data?.totalRevenue}
        loading={loading}
        error={error}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Overview</h2>
          <p className="text-sm text-gray-600">
            Key metrics above are loaded from your database. Add a chart library
            later if you want historical trends.
          </p>
          {!loading && data?.bookings && (
            <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 text-sm">
              <div className="rounded-lg bg-gray-50 p-4">
                <dt className="text-gray-500">Total</dt>
                <dd className="text-lg font-semibold text-gray-900">
                  {data.bookings.total}
                </dd>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <dt className="text-gray-500">Confirmed</dt>
                <dd className="text-lg font-semibold text-gray-900">
                  {data.bookings.confirmed}
                </dd>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <dt className="text-gray-500">Pending</dt>
                <dd className="text-lg font-semibold text-gray-900">
                  {data.bookings.pending}
                </dd>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <dt className="text-gray-500">Cancelled</dt>
                <dd className="text-lg font-semibold text-gray-900">
                  {data.bookings.cancelled}
                </dd>
              </div>
            </dl>
          )}
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Info</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Avg. occupancy (rooms):</span>
              <span className="font-bold text-gray-900">
                {loading ? "…" : `${avgOccupancy}%`}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Confirmed bookings:</span>
              <span className="font-bold text-gray-900">
                {loading ? "…" : data?.bookings?.confirmed ?? "—"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending bookings:</span>
              <span className="font-bold text-gray-900">
                {loading ? "…" : pendingTasks}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Recent Bookings
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                  Guest
                </th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                  Room
                </th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                  Check-in
                </th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-gray-500">
                    Loading…
                  </td>
                </tr>
              ) : recentBookings.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-gray-500">
                    No bookings yet.
                  </td>
                </tr>
              ) : (
                recentBookings.map((booking) => {
                  const roomName =
                    booking.room?.roomType || booking.room || "—";
                  const st = statusLabel(booking.status);
                  return (
                    <tr key={booking._id || booking.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-900">
                        {booking.guestName || "—"}
                      </td>
                      <td className="px-4 py-3 text-gray-900">{roomName}</td>
                      <td className="px-4 py-3 text-gray-900">
                        {formatDate(booking.checkIn)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : booking.status === "cancelled"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {st}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
