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
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
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
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
