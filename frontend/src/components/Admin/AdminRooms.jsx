import React, { useState } from "react";
import { Search, Edit, Trash2, Plus, Eye, X, Upload } from "lucide-react";

// Modal Component
const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// Image Upload Component
const ImageUploadField = ({ imageUrl, onChange, onClear }) => {
  const [preview, setPreview] = useState(imageUrl || null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target.result);
    };
    reader.readAsDataURL(file);

    // Simulate Cloudinary upload
    setUploading(true);
    
    // For demo: use a mock Cloudinary URL
    // In real app: upload to Cloudinary and get URL
    setTimeout(() => {
      const mockUrl = `https://res.cloudinary.com/demo/image/upload/v1/${Date.now()}.jpg`;
      onChange(mockUrl);
      setUploading(false);
    }, 1500);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Room Image (Cloudinary URL)
      </label>

      {/* Image Preview */}
      {preview && (
        <div className="relative rounded-lg overflow-hidden w-full h-48 bg-gray-200">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          {uploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}
        </div>
      )}

      {/* URL Display */}
      {imageUrl && (
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-600 mb-1">Cloudinary URL:</p>
          <p className="text-xs text-blue-600 break-all font-mono">{imageUrl}</p>
        </div>
      )}

      {/* Upload Button */}
      <div className="flex gap-2">
        <label className="flex-1">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
          <button
            type="button"
            onClick={(e) => e.currentTarget.parentElement.querySelector('input').click()}
            disabled={uploading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            <Upload size={18} />
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
        </label>

        {imageUrl && (
          <button
            type="button"
            onClick={() => {
              onClear();
              setPreview(null);
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

// Room Form Modal
const RoomFormModal = ({ isOpen, onClose, room, onSave, mode }) => {
  const [formData, setFormData] = useState(
    room || {
      id: null,
      name: "",
      type: "Standard",
      capacity: 2,
      price: "",
      status: "Available",
      imageUrl: "",
      description: "",
      amenities: "",
    }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUrlChange = (url) => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: url,
    }));
  };

  const handleImageClear = () => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${mode === "add" ? "Add" : "Edit"} Room`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Room 101"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room Type *
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Standard</option>
              <option>Deluxe</option>
              <option>Suite</option>
              <option>Penthouse</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Capacity (Guests) *
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              min="1"
              max="10"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price per Night *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="e.g., 150"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status *
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Available</option>
              <option>Occupied</option>
              <option>Maintenance</option>
              <option>Reserved</option>
            </select>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="border-t pt-4">
          <ImageUploadField
            imageUrl={formData.imageUrl}
            onChange={handleImageUrlChange}
            onClear={handleImageClear}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Add room description..."
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amenities (comma-separated)
          </label>
          <input
            type="text"
            name="amenities"
            value={formData.amenities}
            onChange={handleInputChange}
            placeholder="e.g., WiFi, AC, TV, Mini Bar"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {mode === "add" ? "Add Room" : "Update Room"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

// View Room Modal
const ViewRoomModal = ({ isOpen, onClose, room, onEdit }) => {
  if (!room) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Room Details">
      <div className="space-y-6">
        {/* Room Image */}
        {room.imageUrl && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Image</h3>
            <img
              src={room.imageUrl}
              alt={room.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <p className="text-xs text-gray-600 mt-2 break-all">
              URL: {room.imageUrl}
            </p>
          </div>
        )}

        {/* Room Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 text-sm">Room Name</p>
            <p className="font-semibold text-gray-900">{room.name}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Room Type</p>
            <p className="font-semibold text-gray-900">{room.type}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Capacity</p>
            <p className="font-semibold text-gray-900">{room.capacity} guests</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Price per Night</p>
            <p className="font-semibold text-gray-900">${room.price}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-600 text-sm">Status</p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                room.status === "Available"
                  ? "bg-green-100 text-green-800"
                  : room.status === "Occupied"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {room.status}
            </span>
          </div>
        </div>

        {room.description && (
          <div>
            <p className="text-gray-600 text-sm">Description</p>
            <p className="text-gray-900">{room.description}</p>
          </div>
        )}

        {room.amenities && (
          <div>
            <p className="text-gray-600 text-sm">Amenities</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {room.amenities.split(",").map((amenity, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {amenity.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => {
              onEdit();
              onClose();
            }}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Edit Room
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Main AdminRooms Component
const AdminRooms = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: "Room 101",
      type: "Deluxe",
      capacity: 2,
      price: "150",
      status: "Available",
      imageUrl: "https://res.cloudinary.com/demo/image/upload/v1/room1.jpg",
      description: "Beautiful deluxe room with city view",
      amenities: "WiFi, AC, TV, Mini Bar",
    },
    {
      id: 2,
      name: "Room 205",
      type: "Suite",
      capacity: 4,
      price: "250",
      status: "Occupied",
      imageUrl: "https://res.cloudinary.com/demo/image/upload/v1/room2.jpg",
      description: "Spacious suite with living area",
      amenities: "WiFi, AC, TV, Kitchenette, Jacuzzi",
    },
    {
      id: 3,
      name: "Room 310",
      type: "Standard",
      capacity: 2,
      price: "120",
      status: "Available",
      imageUrl: "",
      description: "Comfortable standard room",
      amenities: "WiFi, AC, TV",
    },
  ]);

  const [modalMode, setModalMode] = useState(null); // 'add', 'edit', 'view'
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleOpenAddModal = () => {
    setSelectedRoom(null);
    setModalMode("add");
  };

  const handleOpenEditModal = (room) => {
    setSelectedRoom(room);
    setModalMode("edit");
  };

  const handleOpenViewModal = (room) => {
    setSelectedRoom(room);
    setModalMode("view");
  };

  const handleSaveRoom = (updatedRoom) => {
    if (modalMode === "add") {
      setRooms((prev) => [...prev, { ...updatedRoom, id: Date.now() }]);
    } else if (modalMode === "edit") {
      setRooms((prev) =>
        prev.map((room) => (room.id === updatedRoom.id ? updatedRoom : room))
      );
    }
    setModalMode(null);
  };

  const handleDeleteRoom = (roomId) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      setRooms((prev) => prev.filter((room) => room.id !== roomId));
    }
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "All" || room.type === filterType;
    const matchesStatus =
      filterStatus === "All" || room.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rooms Management</h1>
          <p className="text-gray-600 mt-1">Manage all hotel rooms with Cloudinary images</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Room
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 shadow-md">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px] relative">
            <Search size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>All Types</option>
            <option>Standard</option>
            <option>Deluxe</option>
            <option>Suite</option>
            <option>Penthouse</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>All Status</option>
            <option>Available</option>
            <option>Occupied</option>
            <option>Maintenance</option>
            <option>Reserved</option>
          </select>
        </div>
      </div>

      {/* Rooms Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Room Name</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Type</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Capacity</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Price/Night</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Image URL</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.map((room) => (
                <tr key={room.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 font-medium text-gray-900">{room.name}</td>
                  <td className="px-6 py-3 text-gray-600">{room.type}</td>
                  <td className="px-6 py-3 text-gray-600">{room.capacity} guests</td>
                  <td className="px-6 py-3 font-medium text-gray-900">${room.price}</td>
                  <td className="px-6 py-3">
                    {room.imageUrl ? (
                      <a
                        href={room.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm truncate max-w-xs block"
                        title={room.imageUrl}
                      >
                        📷 View Image
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm">No Image</span>
                    )}
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        room.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : room.status === "Occupied"
                          ? "bg-blue-100 text-blue-800"
                          : room.status === "Maintenance"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {room.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenViewModal(room)}
                        className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleOpenEditModal(room)}
                        className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteRoom(room.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No rooms found matching your criteria
          </div>
        )}
      </div>

      {/* Modals */}
      {modalMode === "add" || modalMode === "edit" ? (
        <RoomFormModal
          isOpen={true}
          onClose={() => setModalMode(null)}
          room={selectedRoom}
          onSave={handleSaveRoom}
          mode={modalMode}
        />
      ) : null}

      {modalMode === "view" ? (
        <ViewRoomModal
          isOpen={true}
          onClose={() => setModalMode(null)}
          room={selectedRoom}
          onEdit={() => {
            setModalMode("edit");
          }}
        />
      ) : null}
    </div>
  );
};

export default AdminRooms;