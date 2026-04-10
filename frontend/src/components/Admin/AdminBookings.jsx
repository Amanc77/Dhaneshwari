import React, { useState } from "react";
import { Search, Eye, CheckCircle, X, Plus } from "lucide-react";
import Modal from "./Modal";

const AdminBookings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState([
    { id: 1, guest: "John Doe", room: "Room 101", checkIn: "2026-04-15", checkOut: "2026-04-18", status: "Confirmed", amount: 450, email: "john@example.com", phone: "9876543210" },
    { id: 2, guest: "Jane Smith", room: "Room 205", checkIn: "2026-04-20", checkOut: "2026-04-22", status: "Pending", amount: 300, email: "jane@example.com", phone: "9876543211" },
    { id: 3, guest: "Mike Johnson", room: "Room 310", checkIn: "2026-04-25", checkOut: "2026-04-27", status: "Confirmed", amount: 350, email: "mike@example.com", phone: "9876543212" },
    { id: 4, guest: "Sarah Williams", room: "Room 102", checkIn: "2026-04-10", checkOut: "2026-04-12", status: "Completed", amount: 250, email: "sarah@example.com", phone: "9876543213" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [formData, setFormData] = useState({
    guest: "",
    email: "",
    phone: "",
    room: "",
    checkIn: "",
    checkOut: "",
    status: "Pending",
    amount: 0,
  });

  // Open Add Booking Modal
  const openAddModal = () => {
    setCurrentBooking(null);
    setFormData({
      guest: "",
      email: "",
      phone: "",
      room: "",
      checkIn: "",
      checkOut: "",
      status: "Pending",
      amount: 0,
    });
    setIsModalOpen(true);
  };

  // Open Edit Booking Modal
  const openEditModal = (booking) => {
    setCurrentBooking(booking);
    setFormData({
      guest: booking.guest,
      email: booking.email,
      phone: booking.phone,
      room: booking.room,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      status: booking.status,
      amount: booking.amount,
    });
    setIsModalOpen(true);
  };

  // Open View Booking Modal
  const openViewModal = (booking) => {
    setCurrentBooking(booking);
    setIsViewModalOpen(true);
  };

  // Close Modals
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentBooking(null);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setCurrentBooking(null);
  };

  // Handle Form Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseInt(value) : value,
    }));
  };

  // Handle Save Booking
  const handleSaveBooking = (e) => {
    e.preventDefault();

    if (currentBooking) {
      // Edit existing booking
      setBookings(
        bookings.map((booking) =>
          booking.id === currentBooking.id
            ? { ...booking, ...formData }
            : booking
        )
      );
    } else {
      // Add new booking
      const newBooking = {
        id: Math.max(...bookings.map((b) => b.id), 0) + 1,
        ...formData,
      };
      setBookings([...bookings, newBooking]);
    }

    closeModal();
  };

  // Handle Confirm Booking
  const handleConfirmBooking = (id) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status: "Confirmed" } : booking
      )
    );
  };

  // Handle Delete Booking
  const handleDeleteBooking = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      setBookings(bookings.filter((booking) => booking.id !== id));
    }
  };

  // Handle Cancel Booking
  const handleCancelBooking = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      setBookings(
        bookings.map((booking) =>
          booking.id === id ? { ...booking, status: "Cancelled" } : booking
        )
      );
    }
  };

  // Filter bookings based on search
  const filteredBookings = bookings.filter(
    (booking) =>
      booking.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bookings Management</h1>
          <p className="text-gray-600 mt-1">View and manage all reservations</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus size={20} />
          New Booking
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 shadow-md">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings by guest name, room, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Booking ID</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Guest</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Room</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Check-in</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Check-out</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Amount</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3 font-medium text-gray-900">#{booking.id}</td>
                    <td className="px-6 py-3 text-gray-900">{booking.guest}</td>
                    <td className="px-6 py-3 text-gray-600">{booking.room}</td>
                    <td className="px-6 py-3 text-gray-600">{booking.checkIn}</td>
                    <td className="px-6 py-3 text-gray-600">{booking.checkOut}</td>
                    <td className="px-6 py-3"> 
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 font-medium text-gray-900">\${booking.amount}</td>
                    <td className="px-6 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openViewModal(booking)}
                          className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => openEditModal(booking)}
                          className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                          title="Edit Booking"
                        >
                          Edit
                        </button>
                        {booking.status === "Pending" && (
                          <button
                            onClick={() => handleConfirmBooking(booking.id)}
                            className="p-2 hover:bg-green-100 rounded-lg transition-colors text-green-600"
                            title="Confirm Booking"
                          >
                            <CheckCircle size={18} />
                          </button>
                        )} 
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                          title="Cancel Booking"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                    No bookings found
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
        title={currentBooking ? "Edit Booking" : "Create New Booking"}
      >
        <form onSubmit={handleSaveBooking} className="space-y-4">
          {/* Guest Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Guest Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="guest"
              value={formData.guest}
              onChange={handleInputChange}
              placeholder="e.g., John Doe"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email and Phone */}
          <div className="grid grid-cols-2 gap-4">
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
          </div>

          {/* Room */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room <span className="text-red-500">*</span>
            </label>
            <select
              name="room"
              value={formData.room}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a room</option>
              <option value="Room 101">Room 101 - Deluxe</option>
              <option value="Room 102">Room 102 - Deluxe</option>
              <option value="Room 205">Room 205 - Suite</option>
              <option value="Room 310">Room 310 - Standard</option>
            </select>
          </div>

          {/* Check-in and Check-out */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check-in <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check-out <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              min="0"
              required
              placeholder="e.g., 300"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {currentBooking ? "Update Booking" : "Create Booking"}
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
        title="Booking Details"
      >
        {currentBooking && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Booking ID</p>
                <p className="text-lg font-semibold text-gray-900">#{currentBooking.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Guest Name</p>
                <p className="text-lg font-semibold text-gray-900">{currentBooking.guest}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Email</p>
                <p className="text-gray-900">{currentBooking.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Phone</p>
                <p className="text-gray-900">{currentBooking.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Room</p>
                <p className="text-lg font-semibold text-gray-900">{currentBooking.room}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Status</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-1 ${getStatusColor(
                    currentBooking.status
                  )}`}
                >
                  {currentBooking.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Check-in</p>
                <p className="text-gray-900">{currentBooking.checkIn}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Check-out</p>
                <p className="text-gray-900">{currentBooking.checkOut}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600">Total Amount</p>
              <p className="text-lg font-semibold text-gray-900">\${currentBooking.amount}</p>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <button
                onClick={() => {
                  closeViewModal();
                  openEditModal(currentBooking);
                }}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Edit Booking
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

export default AdminBookings;