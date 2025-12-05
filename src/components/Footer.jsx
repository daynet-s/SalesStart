import "bootstrap-icons/font/bootstrap-icons.css";

export default function Footer() {
  return (
    <footer className="site-footer glass mt-4">
      <div className="container py-3">
        <div className="row align-items-center g-3">
          <div className="col-12 col-md-6 text-center text-md-start">
            <small className="text-muted">
              © {new Date().getFullYear()} <span className="fw-semibold text-light">SalesStart</span>. 
              Todos los derechos reservados.
            </small>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end gap-3">
            <a className="footer-link" href="https://github.com/daynet-s/SalesStart" target="_blank" rel="noreferrer">
              <i className="bi bi-github" /> <span className="d-none d-sm-inline">GitHub</span>
            </a>
            <a className="footer-link" href="#" target="_blank" rel="noreferrer">
              <i className="bi bi-discord" /> <span className="d-none d-sm-inline">Discord</span>
            </a>
            <a className="footer-link" href="#" target="_blank" rel="noreferrer">
              <i className="bi bi-envelope-fill" /> <span className="d-none d-sm-inline">Contacto</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
