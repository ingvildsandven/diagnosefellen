import "./App.css";
import { Outlet, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import BookingPage from "./pages/BookingPage/BookingPage";
import Navbar from "./components/Navbar/Navbar";
import AdminPage from "./pages/AdminPage/AdminPage";

function Layout() {
  return (
    <>
      <Navbar /> <Outlet />
    </>
  );
}

        //<Route path="/project/:id" element={<ProjectPage />} />
        //<Route path="/experience/:id" element={<ExperiencePage />} />
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/about/" element={<AboutPage />} />
        <Route path="/admin/" element={<AdminPage />} />
        <Route path="/booking/" element={<BookingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
