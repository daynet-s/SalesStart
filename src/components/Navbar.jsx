import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-dark px-3"
      style={{
        background: "linear-gradient(180deg, #140026 0%, #1a003b 100%)",
        boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div style={{ width: "42px" }} />

      <h1
        className="navbar-brand m-0 flex-grow-1 text-center fw-bold"
        style={{
          fontSize: "1.6rem",
          letterSpacing: "1px",
          color: "#fff",
        }}
      >
        <Link
          to="/"
          className="text-decoration-none text-light"
          style={{
            cursor: "pointer",
            transition: "text-shadow 0.3s",
          }}
          onMouseEnter={(e) =>
            (e.target.style.textShadow =
              "0 0 12px #9a66ff, 0 0 24px #9a66ff")
          }
          onMouseLeave={(e) => (e.target.style.textShadow = "none")}
        >
          SalesStart
        </Link>
      </h1>
      

      {/* Botón Wishlist */}
    <Link
        to="/wishlist"
        className="btn p-0 d-flex align-items-center justify-content-center rounded-circle me-3"
        style={{
          width: "42px", height: "42px",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#e3d3ff",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255, 77, 109, 0.3)"; // Un tono rojizo para diferenciar
          e.currentTarget.style.color = "#fff";
          e.currentTarget.style.boxShadow = "0 0 8px #ff4d6d";
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.1)";
          e.currentTarget.style.color = "#e3d3ff";
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <i className="bi bi-heart-fill fs-5"></i>
      </Link>

      <Link
        to="/login"
        className="btn p-0 d-flex align-items-center justify-content-center rounded-circle"
        style={{
          width: "42px",
          height: "42px",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#e3d3ff",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(123,44,255,0.3)";
          e.currentTarget.style.color = "#fff";
          e.currentTarget.style.boxShadow = "0 0 8px #9a66ff";
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.1)";
          e.currentTarget.style.color = "#e3d3ff";
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <i className="bi bi-person-fill text-light fs-4" style={{ fontSize: "1.3rem" }}></i>
      </Link>
    </nav>
  );
}
