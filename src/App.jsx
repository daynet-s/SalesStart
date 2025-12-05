import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Detail from "./pages/Detail.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Wishlist from "./pages/Wishlist.jsx";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    const body = document.body;
    // Activar fondo RGB solo en Home o Detail
    if (location.pathname === "/" || location.pathname.startsWith("/detalle") 
      || location.pathname.startsWith("/wishList")) {
      body.classList.add("retro-rgb");
    } else {
      body.classList.remove("retro-rgb");
    }
  }, [location.pathname]);

  return (
    <div className="page d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detalle/:slug" element={<Detail />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
