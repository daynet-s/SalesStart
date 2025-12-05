// src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ nombre:"", apellido:"", email:"", pass:"" });
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (Object.values(form).some(v => !v)) {
      setError("Completa todos los campos antes de continuar");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Por favor ingresa un correo electrónico válido");
      return;
    }

    setError("");
    nav("/login");
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card card glass p-4 shadow-lg text-center">
        <h1 className="fw-bold mb-2 text-light">Registra tu cuenta</h1>
        <p
          className="mb-3 fw-medium"
          style={{
            color: "#c7f8ff",
            textShadow: "0 0 8px rgba(0, 240, 206, .5)",
            fontSize: "1.05rem",
            letterSpacing: "0.3px"
          }}
        >
          Complete los campos con su información
        </p>

        <form onSubmit={handleSubmit} className="text-start">
          {["nombre","apellido","email","pass"].map((field,i)=>(
            <div className="mb-3" key={i}>
              <label className="form-label text-light text-capitalize">
                {field==="email"?"Correo electrónico":field==="pass"?"Contraseña":field}
              </label>
              <input
                type={field==="pass"?"password":"text"}
                name={field}
                value={form[field]}
                onChange={handleChange}
                className={`form-control bg-dark text-light border-0 rounded-pill px-3 py-2 ${
                  !form[field] && error ? "is-invalid" : ""
                }`}
              />
            </div>
          ))}

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <button type="submit" className="btn btn-neon w-100 mb-2">Registrarse</button>
          <Link to="/login" className="btn btn-outline-neon w-100">Ir a Login</Link>
        </form>
      </div>
    </div>
  );
}
