import React from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Settings,
  LogOut,
  PhoneCall,
  MapPin,
  Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  const user = {
    name: "Divya Dubey",
    email: "divya@gmail.com",
    phone: "9876543210",
    location: "Lucknow, India"
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-[#e7e1d5] p-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

        {/* LEFT PROFILE CARD */}
        <div className="bg-white rounded-3xl shadow-lg p-6 text-center">
          <div className="w-24 h-24 mx-auto bg-amber-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {user.name[0]}
          </div>

          <h2 className="text-xl font-bold mt-4">{user.name}</h2>

          <div className="mt-4 space-y-2 text-gray-600 text-sm">
            <p className="flex items-center justify-center gap-2">
              <Mail className="text-red-600"size={16}/> {user.email}
            </p>
            <p className="flex items-center justify-center gap-2">
              <Phone className="text-green-600" size={16}/> {user.phone}
            </p>
            <p className="flex items-center justify-center gap-2">
              <MapPin className="text-blue-500" size={16}/> {user.location}
            </p>
          </div>

          <button className="mt-6 w-full bg-amber-500 text-white py-2 rounded-xl">
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="mt-3 w-full border py-2 rounded-xl flex items-center justify-center gap-2 text-gray-600"
          >
            <LogOut size={16}/> Logout
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:col-span-2 space-y-6">

          {/* QUICK ACTIONS */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>

            <div className="grid sm:grid-cols-2 gap-4">

              {/* Reservations */}
              <div
                onClick={() => navigate("/reservations")}
                className="cursor-pointer border rounded-xl p-4 hover:bg-amber-50 transition"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="text-blue-500"/>
                  <span className="font-medium">My Reservations</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  View and manage your bookings
                </p>
              </div>

              
              <div
                onClick={() => navigate("/contact")}
                className="cursor-pointer border rounded-xl p-4 hover:bg-amber-50 transition"
              >
                <div className="flex items-center gap-3">
                  <PhoneCall className="text-green-500"/>
                  <span className="font-medium">Contact Hotel</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Reach out for help or inquiries
                </p>
              </div>

              {/* Settings */}
              <div className="cursor-pointer border rounded-xl p-4 hover:bg-amber-50 transition">
                <div className="flex items-center gap-3">
                  <Settings className="text-gray-700"/>
                  <span className="font-medium">Account Settings</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Update preferences & password
                </p>
              </div>

            </div>
          </div>

          {/* STAY SUMMARY */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Your Stay Summary</h3>

            <div className="grid sm:grid-cols-3 gap-4 text-center">
              <div className="border rounded-xl p-4">
                <p className="text-2xl font-bold text-amber-500">5</p>
                <p className="text-sm text-gray-500">Total Stays</p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-2xl font-bold text-amber-500">2</p>
                <p className="text-sm text-gray-500">Upcoming</p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-2xl font-bold text-amber-500">4.5</p>
                <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                  Rating <Star size={14}/>
                </p>
              </div>
            </div>
          </div>

          

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;