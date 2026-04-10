import React, { useState } from "react";
import { Search, Edit, Trash2, Plus, Eye, X, Star } from "lucide-react";

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

// Star Rating Component
const StarRating = ({ rating, setRating, readOnly = false }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={readOnly ? "button" : "button"}
          onClick={() => !readOnly && setRating(star)}
          disabled={readOnly}
          className={`transition-colors ${
            star <= rating
              ? "text-yellow-500"
              : "text-gray-300"
          } hover:text-yellow-400`}
        >
          <Star size={24} fill={star <= rating ? "currentColor" : "none"} />
        </button>
      ))}
    </div>
  );
};

// Testimonial Form Modal
const TestimonialFormModal = ({ isOpen, onClose, testimonial, onSave, mode }) => {
  const [formData, setFormData] = useState(
    testimonial || {
      id: null,
      title: "",
      review: "",
      author: "",
      email: "",
      rating: 5,
      tripType: "",
      daysStayed: "",
      date: new Date().toLocaleDateString(),
    }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.review || !formData.author || !formData.rating) {
      alert("Please fill in all required fields");
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${mode === "add" ? "Add" : "Edit"} Testimonial`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Exceptional Stay & Service"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author Name *
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="e.g., Mr. John Doe"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="e.g., john@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating *
            </label>
            <StarRating rating={formData.rating} setRating={handleRatingChange} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trip Type
            </label>
            <input
              type="text"
              name="tripType"
              value={formData.tripType}
              onChange={handleInputChange}
              placeholder="e.g., Business Trip, Family Visit"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Days Stayed
            </label>
            <input
              type="number"
              name="daysStayed"
              value={formData.daysStayed}
              onChange={handleInputChange}
              placeholder="e.g., 3"
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Review *
          </label>
          <textarea
            name="review"
            value={formData.review}
            onChange={handleInputChange}
            placeholder="Write the testimonial review..."
            rows="5"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {mode === "add" ? "Add Testimonial" : "Update Testimonial"}
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

// View Testimonial Modal
const ViewTestimonialModal = ({ isOpen, onClose, testimonial, onEdit }) => {
  if (!testimonial) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Testimonial Details">
      <div className="space-y-6">
        {/* Star Rating */}
        <div>
          <p className="text-gray-600 text-sm mb-2">Rating</p>
          <StarRating rating={testimonial.rating} readOnly={true} />
        </div>

        {/* Title */}
        <div>
          <p className="text-gray-600 text-sm">Title</p>
          <p className="text-xl font-semibold text-gray-900">{testimonial.title}</p>
        </div>

        {/* Review */}
        <div>
          <p className="text-gray-600 text-sm">Review</p>
          <p className="text-gray-900 leading-relaxed">{testimonial.review}</p>
        </div>

        {/* Author Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 text-sm">Author</p>
            <p className="font-semibold text-gray-900">{testimonial.author}</p>
          </div>
          {testimonial.email && (
            <div>
              <p className="text-gray-600 text-sm">Email</p>
              <p className="text-gray-900">{testimonial.email}</p>
            </div>
          )}
        </div>

        {/* Trip Details */}
        <div className="grid grid-cols-2 gap-4">
          {testimonial.tripType && (
            <div>
              <p className="text-gray-600 text-sm">Trip Type</p>
              <p className="text-gray-900">{testimonial.tripType}</p>
            </div>
          )}
          {testimonial.daysStayed && (
            <div>
              <p className="text-gray-600 text-sm">Days Stayed</p>
              <p className="text-gray-900">{testimonial.daysStayed} nights</p>
            </div>
          )}
        </div>

        {/* Date */}
        {testimonial.date && (
          <div>
            <p className="text-gray-600 text-sm">Date</p>
            <p className="text-gray-900">{testimonial.date}</p>
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
            Edit Testimonial
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

// Main AdminTestimonials Component
const AdminTestimonials = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("All");

  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      title: "Exceptional Stay & Service",
      review:
        "I loved everything about this hotel, from room types, customer service, specially house keeping was on top level and facilities to the serene pool area and gym facility. I will recommend this place to all my friends.",
      author: "Mr. Satish K",
      email: "satish@example.com",
      rating: 5,
      tripType: "Business Trip",
      daysStayed: "3",
      date: "March 2024",
    },
    {
      id: 2,
      title: "Warm, Welcoming & Comfortable",
      review:
        "Wonderful stay at Dhaneshwari Guestline – highly recommend! The staff was exceptionally welcoming and went out of their way to ensure I had a comfortable stay from start to finish.",
      author: "Mr. Pavan Dahale",
      email: "pavan@example.com",
      rating: 5,
      tripType: "Solo Traveller",
      daysStayed: "2",
      date: "February 2024",
    },
    {
      id: 3,
      title: "Professional Staff & Prime Location",
      review:
        "Wonderful experience. The staff was very helpful and professional. Rooms are well maintained and the hotel is in a prime location, close to major temples and attractions.",
      author: "Mr. Anand",
      email: "anand@example.com",
      rating: 4,
      tripType: "Family Visit",
      daysStayed: "2",
      date: "January 2024",
    },
  ]);

  const [modalMode, setModalMode] = useState(null); // 'add', 'edit', 'view'
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const handleOpenAddModal = () => {
    setSelectedTestimonial(null);
    setModalMode("add");
  };

  const handleOpenEditModal = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setModalMode("edit");
  };

  const handleOpenViewModal = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setModalMode("view");
  };

  const handleSaveTestimonial = (updatedTestimonial) => {
    if (modalMode === "add") {
      setTestimonials((prev) => [
        ...prev,
        { ...updatedTestimonial, id: Date.now() },
      ]);
    } else if (modalMode === "edit") {
      setTestimonials((prev) =>
        prev.map((testimonial) =>
          testimonial.id === updatedTestimonial.id
            ? updatedTestimonial
            : testimonial
        )
      );
    }
    setModalMode(null);
  };

  const handleDeleteTestimonial = (testimonialId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this testimonial?"
      )
    ) {
      setTestimonials((prev) =>
        prev.filter((testimonial) => testimonial.id !== testimonialId)
      );
    }
  };

  const filteredTestimonials = testimonials.filter((testimonial) => {
    const matchesSearch =
      testimonial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.review.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating =
      filterRating === "All" || testimonial.rating === parseInt(filterRating);
    return matchesSearch && matchesRating;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Testimonials Management
          </h1>
          <p className="text-gray-600 mt-1">Manage guest testimonials and reviews</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Testimonial
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 shadow-md">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px] relative">
            <Search size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search testimonials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>All Ratings</option>
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>
        </div>
      </div>

      {/* Testimonials Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">
                  Review
                </th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">
                  Trip Type
                </th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTestimonials.map((testimonial) => (
                <tr
                  key={testimonial.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-3 font-medium text-gray-900">
                    {testimonial.title}
                  </td>
                  <td className="px-6 py-3 text-gray-900">{testimonial.author}</td>
                  <td className="px-6 py-3 text-gray-600 text-sm">
                    {testimonial.email || "N/A"}
                  </td>
                  <td className="px-6 py-3 text-gray-600 max-w-xs">
                    <p className="truncate">{testimonial.review}</p>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < testimonial.rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-3 text-gray-600">
                    {testimonial.tripType || "N/A"}
                  </td>
                  <td className="px-6 py-3 text-gray-600 text-sm">
                    {testimonial.date}
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenViewModal(testimonial)}
                        className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleOpenEditModal(testimonial)}
                        className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteTestimonial(testimonial.id)
                        }
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

        {filteredTestimonials.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No testimonials found matching your criteria
          </div>
        )}
      </div>

      {/* Modals */}
      {modalMode === "add" || modalMode === "edit" ? (
        <TestimonialFormModal
          isOpen={true}
          onClose={() => setModalMode(null)}
          testimonial={selectedTestimonial}
          onSave={handleSaveTestimonial}
          mode={modalMode}
        />
      ) : null}

      {modalMode === "view" ? (
        <ViewTestimonialModal
          isOpen={true}
          onClose={() => setModalMode(null)}
          testimonial={selectedTestimonial}
          onEdit={() => {
            setModalMode("edit");
          }}
        />
      ) : null}
    </div>
  );
};

export default AdminTestimonials;