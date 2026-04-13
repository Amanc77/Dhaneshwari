import React, { useEffect, useState, useCallback } from "react";
import { Search, Eye, CheckCircle, X, Plus } from "lucide-react";
import Modal from "./Modal";
import api from "../../api/axios";

function formatDate(d) {
  if (!d) return "—";
  try {
    return new Date(d).toLocaleString();
  } catch {
    return "—";
  }
}

function isoDateInput(d) {
  if (!d) return "";
  try {
    return new Date(d).toISOString().slice(0, 10);
  } catch {
    return "";
  }
}

function getStatusColor(status) {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

const AdminBookings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    room: "",
    checkIn: "",
    checkOut: "",
    status: "pending",
    totalAmount: "",
  });

  const loadRooms = async () => {
    try {
      const { data } = await api.get("/rooms");
      setRooms(Array.isArray(data) ? data : []);
    } catch {
      setRooms([]);
    }
  };

  const loadBookings = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/bookings", {
        params: {
          page,
          limit: 12,
          guest: searchTerm.trim() || undefined,
        },
      });
      setBookings(data.bookings || []);
      setTotalPages(data.totalPages || 1);
    } catch (e) {
      setError(e?.response?.data?.error || "Failed to load bookings");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm]);

  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => loadBookings(), searchTerm ? 350 : 0);
    return () => clearTimeout(t);
  }, [loadBookings, searchTerm]);

  const openAddModal = () => {
    setCurrentBooking(null);
    setFormData({
      guestName: "",
      guestEmail: "",
      guestPhone: "",
      room: rooms[0]?._id || "",
      checkIn: "",
      checkOut: "",
      status: "pending",
      totalAmount: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (b) => {
    setCurrentBooking(b);
    setFormData({
      guestName: b.guestName || "",
      guestEmail: b.guestEmail || "",
      guestPhone: b.guestPhone || "",
      room: typeof b.room === "object" ? b.room?._id : b.room || "",
      checkIn: isoDateInput(b.checkIn),
      checkOut: isoDateInput(b.checkOut),
      status: b.status || "pending",
      totalAmount: b.totalAmount != null ? String(b.totalAmount) : "",
    });
    setIsModalOpen(true);
  };

  const openViewModal = (b) => {
    setCurrentBooking(b);
    setIsViewModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentBooking(null);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setCurrentBooking(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "totalAmount" ? value : value,
    }));
  };

  const handleSaveBooking = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (currentBooking) {
        await api.put(`/bookings/${currentBooking._id}`, {
          guestName: formData.guestName,
          guestEmail: formData.guestEmail,
          guestPhone: formData.guestPhone,
          totalAmount: formData.totalAmount === "" ? undefined : Number(formData.totalAmount),
          status: formData.status,
        });
      } else {
        await api.post("/bookings", {
          guestName: formData.guestName,
          guestEmail: formData.guestEmail,
          guestPhone: formData.guestPhone || undefined,
          room: formData.room,
          checkIn: new Date(formData.checkIn).toISOString(),
          checkOut: new Date(formData.checkOut).toISOString(),
          totalAmount:
            formData.totalAmount === "" ? undefined : Number(formData.totalAmount),
          status: formData.status,
        });
      }
      closeModal();
      loadBookings();
    } catch (err) {
      setError(err?.response?.data?.error || err?.response?.data?.errors?.[0]?.msg || "Save failed");
    }
  };

  const setStatus = async (id, status) => {
    setError("");
    try {
      await api.put(`/bookings/${id}`, { status });
      loadBookings();
    } catch (err) {
      setError(err?.response?.data?.error || "Update failed");
    }
  };

  const roomLabel = (b) =>
    b.room && typeof b.room === "object" ? b.room.roomType : "—";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
          <p className="text-gray-600 mt-1">Live data from <code className="text-sm bg-gray-100 px-1 rounded">bookings</code></p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
        >
          <Plus size={20} />
          New booking
        </button>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>
      )}

      <div className="bg-white rounded-lg p-4 shadow-md">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by guest name..."
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
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">ID</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Guest</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Room</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Check-in</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Check-out</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Amount</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    Loading…
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    No bookings
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs text-gray-600 max-w-[100px] truncate" title={b._id}>
                      {String(b._id).slice(-8)}
                    </td>
                    <td className="px-4 py-3 text-gray-900">{b.guestName}</td>
                    <td className="px-4 py-3 text-gray-600">{roomLabel(b)}</td>
                    <td className="px-4 py-3 text-gray-600">{formatDate(b.checkIn)}</td>
                    <td className="px-4 py-3 text-gray-600">{formatDate(b.checkOut)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(b.status)}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">₹{b.totalAmount != null ? b.totalAmount : "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 flex-wrap">
                        <button
                          type="button"
                          onClick={() => openViewModal(b)}
                          className="p-2 hover:bg-blue-100 rounded text-blue-600"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => openEditModal(b)}
                          className="p-2 hover:bg-blue-100 rounded text-blue-600 text-xs font-semibold"
                        >
                          Edit
                        </button>
                        {b.status === "pending" && (
                          <button
                            type="button"
                            onClick={() => setStatus(b._id, "confirmed")}
                            className="p-2 hover:bg-green-100 rounded text-green-600"
                            title="Confirm"
                          >
                            <CheckCircle size={18} />
                          </button>
                        )}
                        {b.status !== "cancelled" && (
                          <button
                            type="button"
                            onClick={() => setStatus(b._id, "cancelled")}
                            className="p-2 hover:bg-red-100 rounded text-red-600"
                            title="Cancel"
                          >
                            <X size={18} />
                          </button>
                        )}
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
            <span className="py-1 text-gray-600">Page {page} / {totalPages}</span>
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
        title={currentBooking ? "Edit booking" : "Create booking"}
      >
        <form onSubmit={handleSaveBooking} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Guest name</label>
            <input
              name="guestName"
              value={formData.guestName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="guestEmail"
                value={formData.guestEmail}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                name="guestPhone"
                value={formData.guestPhone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          {!currentBooking && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
              <select
                name="room"
                value={formData.room}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select room type</option>
                {rooms.map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.roomType} — ₹{r.pricePerNight}/night
                  </option>
                ))}
              </select>
            </div>
          )}
          {!currentBooking && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total amount (₹)</label>
            <input
              type="number"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleInputChange}
              min="0"
              step="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">pending</option>
              <option value="confirmed">confirmed</option>
              <option value="cancelled">cancelled</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4 border-t">
            <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium">
              {currentBooking ? "Save" : "Create"}
            </button>
            <button type="button" onClick={closeModal} className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300 font-medium">
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isViewModalOpen} onClose={closeViewModal} title="Booking details">
        {currentBooking && (
          <div className="space-y-3 text-sm">
            <p><span className="text-gray-500">Guest:</span> {currentBooking.guestName}</p>
            <p><span className="text-gray-500">Email:</span> {currentBooking.guestEmail}</p>
            <p><span className="text-gray-500">Phone:</span> {currentBooking.guestPhone || "—"}</p>
            <p><span className="text-gray-500">Room:</span> {roomLabel(currentBooking)}</p>
            <p><span className="text-gray-500">Check-in:</span> {formatDate(currentBooking.checkIn)}</p>
            <p><span className="text-gray-500">Check-out:</span> {formatDate(currentBooking.checkOut)}</p>
            <p>
              <span className="text-gray-500">Status:</span>{" "}
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(currentBooking.status)}`}>
                {currentBooking.status}
              </span>
            </p>
            <p><span className="text-gray-500">Amount:</span> ₹{currentBooking.totalAmount ?? "—"}</p>
            <div className="flex gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => {
                  closeViewModal();
                  openEditModal(currentBooking);
                }}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium"
              >
                Edit
              </button>
              <button type="button" onClick={closeViewModal} className="flex-1 bg-gray-200 py-2 rounded-lg font-medium">
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminBookings;
