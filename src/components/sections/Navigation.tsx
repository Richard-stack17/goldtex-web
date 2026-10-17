export default function Navigation() {
  return (
    <header>
      <nav id="main-nav" aria-label="Navegación Principal Goldtex">
        <a href="#hero-section" className="brand-container" style={{ textDecoration: "none" }}>
          <div className="brand-logo-badge">
            <img src="/logo.png" alt="Goldtex Logo" className="brand-logo-img" />
          </div>
          <div className="brand-logo-text">
            <h1>Goldtex</h1>
            <div className="brand-tagline">Telas que inspiran • Gamarra</div>
          </div>
        </a>

        <div className="nav-actions">
          <div className="nav-live-status">
            <span className="live-dot" aria-hidden="true"></span>
            <span>Showroom 3D Activo</span>
          </div>
          <a href="#hero-section" className="nav-badge">Inicio</a>
          <a href="#evidencia-1" className="nav-badge">01 Investigación</a>
          <a href="#evidencia-2" className="nav-badge">02 Estrategia</a>
          <a href="#evidencia-3" className="nav-badge">03 Key Visual</a>
          <a href="#evidencia-4" className="nav-badge">04 Ecosistema</a>
          <a href="#equipo" className="nav-badge">Equipo</a>
        </div>
      </nav>
    </header>
  );
}
