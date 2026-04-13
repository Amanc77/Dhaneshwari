import React, { useEffect, useState, useCallback } from "react";
import { Search, Edit, Trash2, Plus, Eye } from "lucide-react";
import Modal from "./Modal";
import api from "../../api/axios";
import { resolveUploadUrl } from "../../utils/apiBase";

const emptyForm = {
  roomType: "",
  shortDescription: "",
  size: "",
  totalRooms: 1,
  bookedRooms: 0,
  pricePerNight: "",
  baseOccupancy: 2,
  maxOccupancy: 3,
  extraAdultPrice: 0,
  amenitiesText: "",
  imagesText: "",
};

function parseAmenities(text) {
  return text
    .split(/[,|\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseImages(text) {
  return text
    .split(/[,|\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

const AdminRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [modalMode, setModalMode] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const loadRooms = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/rooms");
      setRooms(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e?.response?.data?.error || "Failed to load rooms");
      setRooms([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRooms();
  }, [loadRooms]);

  const roomToForm = (r) => ({
    roomType: r.roomType || "",
    shortDescription: r.shortDescription || "",
    size: r.size || "",
    totalRooms: r.totalRooms ?? 1,
    bookedRooms: r.bookedRooms ?? 0,
    pricePerNight: r.pricePerNight != null ? String(r.pricePerNight) : "",
    baseOccupancy: r.baseOccupancy ?? 2,
    maxOccupancy: r.maxOccupancy ?? 3,
    extraAdultPrice: r.extraAdultPrice ?? 0,
    amenitiesText: Array.isArray(r.amenities) ? r.amenities.join(", ") : "",
    imagesText: Array.isArray(r.images) ? r.images.join(", ") : "",
  });

  const openAdd = () => {
    setSelectedRoom(null);
    setForm(emptyForm);
    setModalMode("edit");
  };

  const openEdit = (room) => {
    setSelectedRoom(room);
    setForm(roomToForm(room));
    setModalMode("edit");
  };

  const openView = (room) => {
    setSelectedRoom(room);
    setModalMode("view");
  };

  const payloadFromForm = (isNew) => ({
    roomType: form.roomType.trim(),
    shortDescription: form.shortDescription.trim(),
    size: form.size.trim(),
    totalRooms: Number(form.totalRooms) || 1,
    bookedRooms: isNew ? 0 : Number(form.bookedRooms) || 0,
    pricePerNight: Number(form.pricePerNight) || 0,
    baseOccupancy: Number(form.baseOccupancy) || 2,
    maxOccupancy: Number(form.maxOccupancy) || 3,
    extraAdultPrice: Number(form.extraAdultPrice) || 0,
    amenities: parseAmenities(form.amenitiesText),
    images: parseImages(form.imagesText),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const body = payloadFromForm(!selectedRoom);
      if (!body.roomType || !body.pricePerNight) {
        setError("Room type and price are required");
        return;
      }
      if (selectedRoom) {
        await api.put(`/rooms/${selectedRoom._id}`, body);
      } else {
        await api.post("/rooms", body);
      }
      setModalMode(null);
      loadRooms();
    } catch (err) {
      setError(err?.response?.data?.error || "Save failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this room type from the database?")) return;
    setError("");
    try {
      await api.delete(`/rooms/${id}`);
      loadRooms();
    } catch (err) {
      setError(err?.response?.data?.error || "Delete failed");
    }
  };

  const filtered = rooms.filter(
    (r) =>
      r.roomType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const thumb = (r) => {
    const u = r.images?.[0];
    if (!u) return null;
    return resolveUploadUrl(u);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rooms</h1>
          <p className="text-gray-600 mt-1">CRUD on <code className="text-sm bg-gray-100 px-1 rounded">rooms</code></p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
        >
          <Plus size={20} />
          Add room type
        </button>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>
      )}

      <div className="bg-white rounded-lg p-4 shadow-md">
        <div className="relative max-w-md">
          <Search size={20} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by room type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Type</th>
                <th className="px-4 py-3 text-left font-semibold">Inventory</th>
                <th className="px-4 py-3 text-left font-semibold">₹ / night</th>
                <th className="px-4 py-3 text-left font-semibold">Guests</th>
                <th className="px-4 py-3 text-left font-semibold">Preview</th>
                <th className="px-4 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    Loading…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    No rooms
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{r.roomType}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {r.bookedRooms ?? 0} / {r.totalRooms ?? 0} booked
                    </td>
                    <td className="px-4 py-3">₹{r.pricePerNight}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {r.baseOccupancy}–{r.maxOccupancy}
                    </td>
                    <td className="px-4 py-3">
                      {thumb(r) ? (
                        <img src={thumb(r)} alt="" className="h-10 w-14 object-cover rounded border" />
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button type="button" onClick={() => openView(r)} className="p-2 hover:bg-blue-100 rounded text-blue-600">
                          <Eye size={18} />
                        </button>
                        <button type="button" onClick={() => openEdit(r)} className="p-2 hover:bg-blue-100 rounded text-blue-600">
                          <Edit size={18} />
                        </button>
                        <button type="button" onClick={() => handleDelete(r._id)} className="p-2 hover:bg-red-100 rounded text-red-600">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={modalMode === "edit"}
        onClose={() => setModalMode(null)}
        title={selectedRoom ? "Edit room" : "Add room"}
      >
        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <div>
            <label className="font-medium text-gray-700">Room type *</label>
            <input
              className="mt-1 w-full border rounded-lg px-3 py-2"
              value={form.roomType}
              onChange={(e) => setForm((f) => ({ ...f, roomType: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="font-medium text-gray-700">Short description</label>
            <textarea
              className="mt-1 w-full border rounded-lg px-3 py-2"
              rows={2}
              value={form.shortDescription}
              onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-medium text-gray-700">Size label</label>
              <input
                className="mt-1 w-full border rounded-lg px-3 py-2"
                value={form.size}
                onChange={(e) => setForm((f) => ({ ...f, size: e.target.value }))}
                placeholder="e.g. 320 sq ft"
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">Price / night (₹) *</label>
              <input
                type="number"
                className="mt-1 w-full border rounded-lg px-3 py-2"
                value={form.pricePerNight}
                onChange={(e) => setForm((f) => ({ ...f, pricePerNight: e.target.value }))}
                required
                min="0"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-medium text-gray-700">Total rooms *</label>
              <input
                type="number"
                className="mt-1 w-full border rounded-lg px-3 py-2"
                value={form.totalRooms}
                onChange={(e) => setForm((f) => ({ ...f, totalRooms: e.target.value }))}
                min="1"
                required
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">Booked</label>
              <input
                type="number"
                className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-50"
                value={form.bookedRooms}
                onChange={(e) => setForm((f) => ({ ...f, bookedRooms: e.target.value }))}
                min="0"
                disabled={!selectedRoom}
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">Extra adult ₹</label>
              <input
                type="number"
                className="mt-1 w-full border rounded-lg px-3 py-2"
                value={form.extraAdultPrice}
                onChange={(e) => setForm((f) => ({ ...f, extraAdultPrice: e.target.value }))}
                min="0"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-medium text-gray-700">Base occupancy</label>
              <input
                type="number"
                className="mt-1 w-full border rounded-lg px-3 py-2"
                value={form.baseOccupancy}
                onChange={(e) => setForm((f) => ({ ...f, baseOccupancy: e.target.value }))}
                min="1"
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">Max occupancy</label>
              <input
                type="number"
                className="mt-1 w-full border rounded-lg px-3 py-2"
                value={form.maxOccupancy}
                onChange={(e) => setForm((f) => ({ ...f, maxOccupancy: e.target.value }))}
                min="1"
              />
            </div>
          </div>
          <div>
            <label className="font-medium text-gray-700">Amenities (comma-separated)</label>
            <input
              className="mt-1 w-full border rounded-lg px-3 py-2"
              value={form.amenitiesText}
              onChange={(e) => setForm((f) => ({ ...f, amenitiesText: e.target.value }))}
              placeholder="WiFi, AC, TV"
            />
          </div>
          <div>
            <label className="font-medium text-gray-700">Image paths or URLs (comma-separated)</label>
            <input
              className="mt-1 w-full border rounded-lg px-3 py-2"
              value={form.imagesText}
              onChange={(e) => setForm((f) => ({ ...f, imagesText: e.target.value }))}
              placeholder="/uploads/room.jpg or https://..."
            />
          </div>
          <div className="flex gap-2 pt-4 border-t">
            <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium">
              Save
            </button>
            <button type="button" className="flex-1 bg-gray-200 py-2 rounded-lg" onClick={() => setModalMode(null)}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={modalMode === "view"} onClose={() => setModalMode(null)} title={selectedRoom?.roomType || "Room"}>
        {selectedRoom && (
          <div className="space-y-2 text-sm">
            <p className="text-gray-600">{selectedRoom.shortDescription}</p>
            <p><span className="text-gray-500">Size:</span> {selectedRoom.size || "—"}</p>
            <p><span className="text-gray-500">Inventory:</span> {selectedRoom.bookedRooms}/{selectedRoom.totalRooms}</p>
            <p><span className="text-gray-500">Price:</span> ₹{selectedRoom.pricePerNight}</p>
            <p><span className="text-gray-500">Occupancy:</span> {selectedRoom.baseOccupancy}–{selectedRoom.maxOccupancy}</p>
            <p><span className="text-gray-500">Amenities:</span> {(selectedRoom.amenities || []).join(", ") || "—"}</p>
            <button
              type="button"
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
              onClick={() => {
                openEdit(selectedRoom);
              }}
            >
              Edit
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminRooms;
