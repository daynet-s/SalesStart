import { useEffect, useState } from "react";
import { getWishlist, deleteFromWishlist, updateWishlistNote } from "../services/gameService";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Estados para Modales
  const [editModal, setEditModal] = useState({ show: false, id: null, text: "" });
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, name: "" });

  useEffect(() => {
    document.body.classList.add("gamer-rgb");
    return () => {
      document.body.classList.remove("gamer-rgb");
    };
    
  }, []);

  useEffect(() => {
    loadList();
  }, []);

  const loadList = async () => {
    const data = await getWishlist();
    setItems(data);
    setLoading(false);
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // --- MANEJADORES DE ACCIÓN ---
  const confirmDelete = async () => {
    if (!deleteModal.id) return;
    await deleteFromWishlist(deleteModal.id);
    showToast("Juego eliminado de la lista");
    setDeleteModal({ show: false, id: null, name: "" });
    loadList();
  };

  const confirmEdit = async () => {
    if (!editModal.id) return;
    await updateWishlistNote(editModal.id, editModal.text);
    showToast("Nota actualizada correctamente");
    setEditModal({ show: false, id: null, text: "" });
    loadList();
  };

  return (
    <main className="container-narrow">
      <h1 className="wave-title text-center mb-2">Mi Colección</h1>
      <p className="text-center text-light opacity-75 mb-4 fs-5">
        Gestiona tus juegos deseados y notas personales
      </p>

      {/* --- TOAST --- */}
      {toast && (
        <div className="custom-toast">
          <i className="bi bi-check-circle-fill text-success"></i> {toast}
        </div>
      )}

      {/* --- MODAL EDITAR NOTA --- */}
      {editModal.show && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
             style={{ zIndex: 2000, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(5px)" }}>
          <div className="card glass p-4 shadow-lg animate-pop" style={{ width: "400px", border: "1px solid var(--brand-2)" }}>
            <h5 className="text-light fw-bold mb-3"><i className="bi bi-pencil-square me-2"></i>Editar Nota</h5>
            <textarea 
              className="form-control bg-dark text-light mb-4" rows="3" autoFocus
              value={editModal.text} onChange={(e) => setEditModal({...editModal, text: e.target.value})}
              style={{ border: "1px solid rgba(255,255,255,0.2)" }}
            />
            <div className="d-flex gap-2 justify-content-end">
              <button onClick={() => setEditModal({show:false})} className="btn btn-sm btn-outline-light">Cancelar</button>
              <button onClick={confirmEdit} className="btn btn-sm btn-gradient">Guardar Cambios</button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL CONFIRMAR BORRAR --- */}
      {deleteModal.show && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
             style={{ zIndex: 2000, background: "rgba(0,0,0,0.9)" }}>
          <div className="card glass p-4 shadow-lg animate-pop text-center" style={{ width: "350px", borderColor: "#ff4d6d" }}>
            <i className="bi bi-exclamation-triangle text-danger fs-1 mb-2"></i>
            <h5 className="text-light fw-bold">¿Eliminar juego?</h5>
            <p className="text-secondary small">Se borrará <strong>{deleteModal.name}</strong> de tu lista.</p>
            <div className="d-flex gap-2 justify-content-center mt-3">
              <button onClick={() => setDeleteModal({show:false})} className="btn btn-sm btn-outline-light px-4">No</button>
              <button onClick={confirmDelete} className="btn btn-sm btn-danger px-4">Sí, Borrar</button>
            </div>
          </div>
        </div>
      )}

      {/* --- LISTA --- */}
      {loading ? (
        <div className="text-center text-white mt-5"><div className="spinner-border text-info"></div></div>
      ) : items.length === 0 ? (
        <div className="text-center text-white mt-5 p-5 glass rounded-4">
            <i className="bi bi-joystick fs-1 text-secondary mb-3 d-block"></i>
            <p className="fs-5">Tu lista está vacía</p>
            <Link to="/" className="btn btn-outline-neon mt-2">Explorar Catálogo</Link>
        </div>
      ) : (
        <div className="row g-3">
          {items.map((item) => (
            <div key={item.id} className="col-12">
              <div className="card glass p-3 d-flex flex-column flex-md-row align-items-center gap-3 hover-border" 
                   style={{ transition: "0.3s", border: "1px solid rgba(255,255,255,0.05)" }}>
                
                {/* Imagen */}
                <img 
                  src={item.videojuego.detail || "/assets/img/placeholder.jpg"} 
                  alt={item.videojuego.nombre} 
                  style={{width: 100, height: 60, objectFit: "cover", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)"}}
                />
                
                {/* Info */}
                <div className="flex-grow-1 text-center text-md-start">
                    <h5 className="mb-1 text-light fw-bold text-truncate" style={{maxWidth: "400px"}}>
                      {item.videojuego.nombre}
                    </h5>
                    <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 text-secondary small">
                        <span><i className="bi bi-calendar3 me-1"></i>{item.fechaAgregado}</span>
                    </div>
                    
                    {/* Nota Visual */}
                    {item.nota ? (
                        <div className="mt-2 p-2 rounded-3 bg-dark bg-opacity-50 border border-secondary border-opacity-25 d-inline-block">
                            <span className="text-info small fst-italic"><i className="bi bi-chat-quote-fill me-2"></i>{item.nota}</span>
                        </div>
                    ) : (
                        <span className="d-block mt-2 text-muted small fst-italic">Sin nota</span>
                    )}
                </div>

                {/* Botones de Acción Gamer */}
                <div className="d-flex gap-2">
                    <Link to={`/detalle/${encodeURIComponent(item.videojuego.id)}`} 
                          className="btn-icon-neon" title="Ver Detalle">
                        <i className="bi bi-eye-fill"></i>
                    </Link>
                    
                    <button onClick={() => setEditModal({show:true, id: item.id, text: item.nota || ""})} 
                            className="btn-icon-neon edit" title="Editar Nota">
                        <i className="bi bi-pencil-fill"></i>
                    </button>
                    
                    <button onClick={() => setDeleteModal({show:true, id: item.id, name: item.videojuego.nombre})} 
                            className="btn-icon-neon del" title="Eliminar">
                        <i className="bi bi-trash-fill"></i>
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}