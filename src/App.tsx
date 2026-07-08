import "./App.css";
import { Outlet, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import BookingPage from "./pages/BookingPage/BookingPage";
import Navbar from "./components/Navbar/Navbar";
import AdminPage from "./pages/AdminPage/AdminPage";
import PostPage from "./pages/PostPage/PostPage";
import Footer from "./components/Footer/Footer";
import AdminLoginPage from "./pages/AdminLoginPage/AdminLoginPage";
import ProtectedAdminRoute from "./pages/AdminLoginPage/ProtectedAdminRoute";

function Layout() {
  return (
    <>
      <Navbar /> <Outlet /> <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/about/" element={<AboutPage />} />
        <Route path="/posts/" element={<PostPage />} />
        <Route path="/booking/" element={<BookingPage />} />
        
        <Route path="/admin-login" element={<AdminLoginPage />} />

        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
