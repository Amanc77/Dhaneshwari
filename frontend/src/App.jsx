import { Navigate, Route, Routes } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import RoomsAmenities from "./pages/RoomsAmenities";
import GalleryPage from "./pages/GalleryPage";
import FamousAttractions from "./pages/FamousAttractions";
import BlogPost from "./pages/BlogPost";
import RoomDetail from "./pages/RoomDetail";
import ContactUs from "./pages/ContactUs";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import Reservation from "./pages/Reservation";
import UserReservationPage from "./pages/UserReservationPage";
import Testimonials from "./components/Testimonials";
import OTASection from "./components/OTA";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminUsers from "./components/Admin/AdminUsers";
import AdminBookings from "./components/Admin/AdminBookings";
import AdminRooms from "./components/Admin/AdminRooms";
import AdminTestimonials from "./components/Admin/AdminTestimonials";

function App() {
  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="rooms" element={<AdminRooms />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
      </Route>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="rooms" element={<RoomsAmenities />} />
        <Route path="rooms/:roomId" element={<RoomDetail />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route
          path="FamousAttractions"
          element={<Navigate to="/famous-attractions" replace />}
        />
        <Route path="famous-attractions" element={<FamousAttractions />} />
        <Route path="famous-attractions/:slug" element={<BlogPost />} />
        <Route
          path="blog"
          element={<Navigate to="/famous-attractions" replace />}
        />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="reservation" element={<Reservation />} />
        <Route
          path="my-reservations"
          element={
            <ProtectedRoute roles={["user", "admin"]}>
              <UserReservationPage />
            </ProtectedRoute>
          }
        />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="ota-platforms" element={<OTASection />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute roles={["user", "admin"]}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="booking" element={<Booking />} />
        <Route path="payment" element={<Payment />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
