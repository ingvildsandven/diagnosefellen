import "./App.css";
import { Outlet, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import BookingPage from "./pages/BookingPage/BookingPage";
import Navbar from "./components/Navbar/Navbar";
import AdminPage from "./pages/AdminPage/AdminPage";
import PostPage from "./pages/PostPage/PostPage";

function Layout() {
  return (
    <>
      <Navbar /> <Outlet />
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
        <Route path="/admin/" element={<AdminPage />} />
        <Route path="/booking/" element={<BookingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
