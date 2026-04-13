import React, { useEffect, useState, useCallback } from "react";
import { Search, Edit, Trash2, Plus, Eye, Star } from "lucide-react";
import Modal from "./Modal";
import api from "../../api/axios";
import { resolveUploadUrl } from "../../utils/apiBase";

const TRIP_TYPES = ["", "Holiday", "Business", "Family", "Couple", "Solo"];

const emptyForm = {
  title: "",
  name: "",
  review: "",
  rating: 5,
  photo: "",
  tripType: "",
  daysStayed: "",
  month: "",
  year: new Date().getFullYear(),
};

const AdminTestimonials = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("All");

  const [modalMode, setModalMode] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/testimonials");
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e?.response?.data?.error || "Failed to load testimonials");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openAdd = () => {
    setSelected(null);
    setForm({ ...emptyForm, year: new Date().getFullYear() });
    setModalMode("edit");
  };

  const openEdit = (t) => {
    setSelected(t);
    setForm({
      title: t.title || "",
      name: t.name || "",
      review: t.review || "",
      rating: t.rating || 5,
      photo: t.photo || "",
      tripType: t.tripType || "",
      daysStayed: t.daysStayed != null ? String(t.daysStayed) : "",
      month: t.month || "",
      year: t.year != null ? t.year : new Date().getFullYear(),
    });
    setModalMode("edit");
  };

  const openView = (t) => {
    setSelected(t);
    setModalMode("view");
  };

  const buildPayload = () => {
    const payload = {
      title: form.title.trim(),
      name: form.name.trim(),
      review: form.review.trim(),
      rating: Number(form.rating) || 5,
      photo: form.photo.trim() || undefined,
      tripType: form.tripType || undefined,
      daysStayed: form.daysStayed === "" ? undefined : Number(form.daysStayed),
      month: form.month.trim() || undefined,
      year: form.year === "" ? undefined : Number(form.year),
    };
    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const payload = buildPayload();
      if (!payload.title || !payload.name || !payload.review) {
        setError("Title, guest name, and review are required");
        return;
      }
      if (selected) {
        await api.put(`/testimonials/${selected._id}`, payload);
      } else {
        await api.post("/testimonials", payload);
      }
      setModalMode(null);
      load();
    } catch (err) {
      setError(err?.response?.data?.error || "Save failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    setError("");
    try {
      await api.delete(`/testimonials/${id}`);
      load();
    } catch (err) {
      setError(err?.response?.data?.error || "Delete failed");
    }
  };

  const filtered = items.filter((t) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      !q ||
      (t.title || "").toLowerCase().includes(q) ||
      (t.name || "").toLowerCase().includes(q) ||
      (t.review || "").toLowerCase().includes(q);
    const matchesRating =
      filterRating === "All" || String(t.rating) === filterRating;
    return matchesSearch && matchesRating;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-600 mt-1">CRUD on <code className="text-sm bg-gray-100 px-1 rounded">testimonials</code></p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
        >
          <Plus size={20} />
          Add testimonial
        </button>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>
      )}

      <div className="bg-white rounded-lg p-4 shadow-md flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px] relative">
          <Search size={20} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterRating}
          onChange={(e) => setFilterRating(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option>All Ratings</option>
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Title</th>
                <th className="px-4 py-3 text-left font-semibold">Guest</th>
                <th className="px-4 py-3 text-left font-semibold">Review</th>
                <th className="px-4 py-3 text-left font-semibold">Rating</th>
                <th className="px-4 py-3 text-left font-semibold">Trip</th>
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
                    No testimonials
                  </td>
                </tr>
              ) : (
                filtered.map((t) => (
                  <tr key={t._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium max-w-[140px] truncate">{t.title}</td>
                    <td className="px-4 py-3">{t.name}</td>
                    <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{t.review}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i <= (t.rating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{t.tripType || "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button type="button" onClick={() => openView(t)} className="p-2 hover:bg-blue-100 rounded text-blue-600">
                          <Eye size={18} />
                        </button>
                        <button type="button" onClick={() => openEdit(t)} className="p-2 hover:bg-blue-100 rounded text-blue-600">
                          <Edit size={18} />
                        </button>
                        <button type="button" onClick={() => handleDelete(t._id)} className="p-2 hover:bg-red-100 rounded text-red-600">
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

      <Modal isOpen={modalMode === "edit"} onClose={() => setModalMode(null)} title={selected ? "Edit testimonial" : "Add testimonial"}>
        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <div>
            <label className="font-medium text-gray-700">Title *</label>
            <input
              className="mt-1 w-full border rounded-lg px-3 py-2"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="font-medium text-gray-700">Guest name *</label>
            <input
              className="mt-1 w-full border rounded-lg px-3 py-2"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="font-medium text-gray-700">Review *</label>
            <textarea
              className="mt-1 w-full border rounded-lg px-3 py-2"
              rows={4}
              value={form.review}
              onChange={(e) => setForm((f) => ({ ...f, review: e.target.value }))}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-medium text-gray-700">Rating (1–5)</label>
              <input
                type="number"
                min="1"
                max="5"
                className="mt-1 w-full border rounded-lg px-3 py-2"
                value={form.rating}
                onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value }))}
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">Trip type</label>
              <select
                className="mt-1 w-full border rounded-lg px-3 py-2"
                value={form.tripType}
                onChange={(e) => setForm((f) => ({ ...f, tripType: e.target.value }))}
              >
                {TRIP_TYPES.map((opt) => (
                  <option key={opt || "none"} value={opt}>
                    {opt || "(none)"}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-medium text-gray-700">Days stayed</label>
              <input
                type="number"
                min="1"
                className="mt-1 w-full border rounded-lg px-3 py-2"
                value={form.daysStayed}
                onChange={(e) => setForm((f) => ({ ...f, daysStayed: e.target.value }))}
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">Month</label>
              <input
                className="mt-1 w-full border rounded-lg px-3 py-2"
                placeholder="March"
                value={form.month}
                onChange={(e) => setForm((f) => ({ ...f, month: e.target.value }))}
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">Year</label>
              <input
                type="number"
                className="mt-1 w-full border rounded-lg px-3 py-2"
                value={form.year}
                onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
              />
            </div>
          </div>
          <div>
            <label className="font-medium text-gray-700">Photo URL or /uploads path</label>
            <input
              className="mt-1 w-full border rounded-lg px-3 py-2"
              value={form.photo}
              onChange={(e) => setForm((f) => ({ ...f, photo: e.target.value }))}
              placeholder="/uploads/guest.jpg"
            />
          </div>
          <div className="flex gap-2 pt-4 border-t">
            <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium">
              Save
            </button>
            <button type="button" className="flex-1 bg-gray-200 py-2 rounded-lg" onClick={() => setModalMode(null)}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={modalMode === "view"} onClose={() => setModalMode(null)} title={selected?.title || "Testimonial"}>
        {selected && (
          <div className="space-y-2 text-sm">
            <p className="font-semibold text-gray-900">{selected.name}</p>
            <p className="text-gray-700 whitespace-pre-wrap">{selected.review}</p>
            {selected.photo && (
              <img src={resolveUploadUrl(selected.photo)} alt="" className="max-h-40 rounded border" />
            )}
            <p className="text-gray-500">
              {selected.tripType || "—"} · {selected.daysStayed ? `${selected.daysStayed} days` : ""}{" "}
              {selected.month || selected.year ? `· ${selected.month || ""} ${selected.year || ""}` : ""}
            </p>
            <button
              type="button"
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
              onClick={() => openEdit(selected)}
            >
              Edit
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminTestimonials;
