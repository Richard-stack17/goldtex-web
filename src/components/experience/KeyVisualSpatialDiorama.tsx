"use client";

import { useState, useEffect } from "react";

export default function KeyVisualSpatialDiorama() {
  const [activeFocal, setActiveFocal] = useState<"center" | "left" | "right" | "all">("center");
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    title: string;
    subtitle: string;
    format?: string;
  } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxImage(null);
    };
    if (lightboxImage) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxImage]);

  return (
    <div className="spatial-diorama-container" id="key-visual-diorama">
      {/* ================= 1. CABECERA EDITORIAL DE CAPÍTULO ================= */}
      <div className="diorama-section-header">
        <div className="diorama-chapter-tag">
          <span className="chapter-pill">CAPÍTULO 03</span>
          <span>• IDENTIDAD VISUAL &amp; DIRECCIÓN DE ARTE</span>
        </div>
        <h2 className="diorama-title">
          Key Visual de Campaña <br />
          <span className="text-gold-gradient font-editorial italic lowercase">
            &amp; composición espacial
          </span>
        </h2>
        <p className="diorama-lead">
          Composición publicitaria maestra: la diseñadora en su taller rodeada de telas nobles en Verde Institucional y Oro Papaya. Una buena decisión es el inicio de un gran proyecto.
        </p>
      </div>

      {/* Selector de Perspectivas / Focal Modes */}
      <div className="diorama-perspective-nav">
        <button
          type="button"
          className={`perspective-pill-btn ${activeFocal === "center" ? "is-active" : ""}`}
          onClick={() => setActiveFocal("center")}
        >
          <span className="pill-dot"></span>
          ★ Master Key Visual Panorámico 4K
        </button>
        <button
          type="button"
          className={`perspective-pill-btn ${activeFocal === "left" ? "is-active" : ""}`}
          onClick={() => setActiveFocal("left")}
        >
          <span className="pill-dot"></span>
          ✦ Perspectiva I: Vuelo Textil Atelier
        </button>
        <button
          type="button"
          className={`perspective-pill-btn ${activeFocal === "right" ? "is-active" : ""}`}
          onClick={() => setActiveFocal("right")}
        >
          <span className="pill-dot"></span>
          ✦ Perspectiva II: Showroom Living
        </button>
        <button
          type="button"
          className={`perspective-pill-btn ${activeFocal === "all" ? "is-active" : ""}`}
          onClick={() => setActiveFocal("all")}
        >
          <span className="pill-dot"></span>
          👁 Vista Tríptico Completo (3 Planos)
        </button>
      </div>

      {/* ================= 2. SPATIAL 3D IMMERSIVE GALLERY (IMÁGENES COMPLETAS) ================= */}
      <div className="diorama-stage-wrapper">
        {/* Marca de Agua Tipográfica Monumental detrás de las imágenes */}
        <div className="diorama-backdrop-watermark" aria-hidden="true">
          <span className="watermark-bold">LA DECISIÓN</span>
          <span className="watermark-italic">segura</span>
        </div>

        {/* Galería Curva en 3 Capas de Profundidad */}
        <div className={`diorama-layers-track mode-${activeFocal}`}>
          {/* Capa Izquierda Flotante: -150px de profundidad */}
          <div
            className={`diorama-side-layer layer-left ${activeFocal === "left" ? "is-focal" : activeFocal === "all" ? "is-spread" : ""}`}
            onClick={() => setActiveFocal("left")}
            title="Ver perspectiva Atelier"
          >
            <div className="layer-frame">
              <img
                src="/key_visual_2.png"
                alt="Goldtex Fabric Detail Perspective — Sillón botánico y vuelo textil"
                className="layer-img"
              />
              <div className="layer-gradient-overlay"></div>
              
              <button
                type="button"
                className="layer-lightbox-trigger"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxImage({
                    src: "/key_visual_2.png",
                    title: "Perspectiva 01 — Vuelo Textil & Tapicería",
                    subtitle: "Estudio de tapicería botánica, monstera y textiles decorativos Goldtex (600 × 750 px)",
                    format: "Perspectiva Atelier",
                  });
                }}
                title="Ver imagen completa en alta definición"
                aria-label="Abrir imagen completa"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <polyline points="9 21 3 21 3 15"></polyline>
                  <line x1="21" y1="3" x2="14" y2="10"></line>
                  <line x1="3" y1="21" x2="10" y2="14"></line>
                </svg>
              </button>

              <div className="layer-depth-badge badge-left">
                DEPTH LAYER: -150PX • VUELO TEXTIL
              </div>

              <div className="layer-hover-hint">
                <span>✦ Vista Atelier</span>
              </div>
            </div>
          </div>

          {/* COMPOSICIÓN CENTRAL HERO: Formato Panorámico Completo Sin Recorte */}
          <div
            className={`diorama-hero-card ${activeFocal === "center" ? "is-focal" : activeFocal === "all" ? "is-spread" : ""}`}
            onClick={() => setActiveFocal("center")}
          >
            {/* Anillos de Resplandor Oro y Esmeralda */}
            <div className="hero-glow-aura" aria-hidden="true"></div>

            {/* Escenario Visual Panorámico con Pop-Out Orb controlado */}
            <div className="hero-visual-stage">
              {/* Marco Estructural Editorial con Aspect Ratio Panorámico 2279:1458 */}
              <div className="hero-frame">
                <img
                  src="/ev3_key_visual_master.png"
                  alt="Master Key Visual 4K — La Decisión Segura (Goldtex Telas que Inspiran)"
                  className="hero-main-img"
                />

                {/* Badge Superior Izquierdo */}
                <div className="hero-master-badge">
                  <span className="badge-gold-dot"></span>
                  <span>CAMPAIGN KEY VISUAL • MASTER SHOT</span>
                </div>

                {/* Badge Superior Derecho: Telemetría Espacial (dentro del frame, nunca recortado) */}
                <div className="hero-focal-pill">
                  FOCAL DEPTH: 0.00 • 2279 × 1458 PX
                </div>
              </div>

              {/* Sello Flotante 3D Pop-Out (anclado a la esquina inferior derecha del marco, sin tapar la placa) */}
              <div className="hero-popout-orb" aria-hidden="true">
                <div className="orb-glass-inner">
                  <span>
                    TELA EN MOVIMIENTO<br />
                    • SALIDA DE PLANO 3D •<br />
                    <small style={{ color: "#ffffff", opacity: 0.85 }}>GAMARRA 2024</small>
                  </span>
                </div>
              </div>
            </div>

            {/* Placa Editorial Consola debajo del Marco (No tapa la imagen ni se solapa con el orbe) */}
            <div className="hero-editorial-plaque">
              <div className="plaque-col-info">
                <div className="plaque-tag">
                  <span className="badge-gold-dot"></span>
                  <span>COMPOSICIÓN PUBLICITARIA MAESTRA • DIRECCIÓN DE ARTE GOLDTEX</span>
                </div>
                <h3 className="plaque-headline">La Decisión Segura</h3>
                <p className="plaque-narrative">
                  “Una buena decisión es el inicio de un gran proyecto.” La diseñadora en su taller rodeada de rollos nobles en Verde Institucional (<span style={{ color: "#4ade80", fontWeight: 600 }}>#083E35</span>) y Oro Papaya (<span style={{ color: "#F1B734", fontWeight: 600 }}>#F1B734</span>).
                </p>
              </div>

              <div className="plaque-col-actions">
                <div className="plaque-meta-item">
                  <span className="meta-label">ENCUADRE PANORÁMICO</span>
                  <span className="meta-val">100% VISIBLE • 4K</span>
                </div>
                <button
                  type="button"
                  className="plaque-expand-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxImage({
                      src: "/ev3_key_visual_master.png",
                      title: "Master Key Visual 4K — La Decisión Segura",
                      subtitle: "Composición publicitaria maestra Goldtex • Resolución nativa 2279 × 1458 px sin recorte",
                      format: "Master Key Visual 4K",
                    });
                  }}
                  title="Ver imagen completa en pantalla completa"
                  aria-label="Abrir imagen completa en 4K"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <polyline points="9 21 3 21 3 15"></polyline>
                    <line x1="21" y1="3" x2="14" y2="10"></line>
                    <line x1="3" y1="21" x2="10" y2="14"></line>
                  </svg>
                  <span>Ver Completa (4K)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Capa Derecha Flotante: +150px de profundidad */}
          <div
            className={`diorama-side-layer layer-right ${activeFocal === "right" ? "is-focal" : activeFocal === "all" ? "is-spread" : ""}`}
            onClick={() => setActiveFocal("right")}
            title="Ver perspectiva Showroom"
          >
            <div className="layer-frame">
              <img
                src="/key_visual.png"
                alt="Showroom Goldtex Key Visual — Atelier View y modelo saltando en traje floral"
                className="layer-img"
              />
              <div className="layer-gradient-overlay"></div>
              
              <button
                type="button"
                className="layer-lightbox-trigger"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxImage({
                    src: "/key_visual.png",
                    title: "Perspectiva 02 — Showroom & Movimiento",
                    subtitle: "Dirección de arte de sastrería y aplicación residencial en alta definición (600 × 750 px)",
                    format: "Showroom Living",
                  });
                }}
                title="Ver imagen completa en alta definición"
                aria-label="Abrir imagen completa"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <polyline points="9 21 3 21 3 15"></polyline>
                  <line x1="21" y1="3" x2="14" y2="10"></line>
                  <line x1="3" y1="21" x2="10" y2="14"></line>
                </svg>
              </button>

              <div className="layer-depth-badge badge-right">
                DEPTH LAYER: +150PX • ATELIER VIEW
              </div>

              <div className="layer-hover-hint">
                <span>✦ Vista Showroom</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 3. EL TRÍPTICO DE AUTOR (PSICOLOGÍA CROMÁTICA) ================= */}
      <div className="triptico-section">
        <div className="triptico-grid">
          {/* Tarjeta de Psicología Cromática */}
          <div className="triptico-card">
            <span className="triptico-card-kicker">PSICOLOGÍA CROMÁTICA</span>
            <h4 className="triptico-card-title">El Tríptico de Autor</h4>
            <div className="swatch-list">
              {/* Obsidian Void */}
              <div className="swatch-item">
                <div className="swatch-box" style={{ background: "#010806", border: "1px solid rgba(255,255,255,0.2)" }}></div>
                <div>
                  <div className="swatch-header">
                    <h5>Obsidian Void</h5>
                    <span className="swatch-hex">#010806</span>
                  </div>
                  <p className="swatch-desc">
                    El silencio visual del taller nocturno. Concede el escenario solemne para que el verde y el oro brillen sin competir con ruido blanco.
                  </p>
                </div>
              </div>

              {/* Brunswick Green */}
              <div className="swatch-item">
                <div className="swatch-box" style={{ background: "#083E35", border: "1px solid rgba(241,183,52,0.4)" }}></div>
                <div>
                  <div className="swatch-header">
                    <h5 style={{ color: "#4ade80" }}>Brunswick Green</h5>
                    <span className="swatch-hex" style={{ color: "#F1B734" }}>#083E35</span>
                  </div>
                  <p className="swatch-desc">
                    La estabilidad, la confianza patrimonial y la nobleza del oficio textil. No es un verde común; es un esmeralda profundo de sastrería militar histórica.
                  </p>
                </div>
              </div>

              {/* Papaya Gold */}
              <div className="swatch-item">
                <div className="swatch-box" style={{ background: "#F1B734", boxShadow: "0 0 20px #F1B734" }}></div>
                <div>
                  <div className="swatch-header">
                    <h5 style={{ color: "#F1B734" }}>Papaya Gold</h5>
                    <span className="swatch-hex">#F1B734</span>
                  </div>
                  <p className="swatch-desc">
                    La cinta métrica, la rentabilidad, el hilo de oro y el brillo del forro sedoso. Utilizado como acento de precisión y lujo editorial.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta de Arquitectura Tipográfica */}
          <div className="triptico-card flex flex-col justify-between">
            <div>
              <span className="triptico-card-kicker">ARQUITECTURA TIPOGRÁFICA</span>
              <h4 className="triptico-card-title">Tratamiento Editorial de Marca</h4>
              <div className="typo-examples-list">
                <div className="typo-example-box">
                  <span className="typo-meta-tag">TITULARES MONUMENTALES (CINZEL &amp; PLAYFAIR)</span>
                  <span className="typo-specimen-serif">LA DECISIÓN SEGURA</span>
                  <p className="swatch-desc">
                    Serifas afiladas de alto contraste que evocan la aguja de coser y las grandes cabeceras de moda internacional (Vogue, Harper’s Bazaar).
                  </p>
                </div>

                <div className="typo-example-box">
                  <span className="typo-meta-tag">CUERPO EDITORIAL (PLUS JAKARTA SANS / CANTARELL)</span>
                  <span className="typo-specimen-sans">Telas que inspiran confianza industrial y libertad creativa.</span>
                  <p className="swatch-desc">
                    Tipografía geométrica neutral, limpia, con perfecta legibilidad en fichas técnicas, briefs de compra y navegación digital.
                  </p>
                </div>
              </div>
            </div>

            <div className="triptico-footer-meta">
              <span>EDITORIAL SYSTEM SPEC: V4.2</span>
              <span>AA+ CONTRAST ACCESSIBILITY</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 4. GÉNESIS DEL ARTE: DEL BOCETO A LA REALIZACIÓN FINAL ================= */}
      <div className="genesis-section">
        <div className="genesis-header">
          <span className="triptico-card-kicker">GÉNESIS DEL ARTE</span>
          <h4 className="genesis-title">Del Boceto Inicial a la Realización Final</h4>
          <p className="genesis-lead">
            La conceptualización original nació dibujando la ondulación de una cinta métrica fusionada con el vuelo
            de un vestido de gala sobre el suelo de concreto de una fábrica.
          </p>
        </div>

        <div className="genesis-grid">
          {/* Fase 01: Boceto Conceptual */}
          <div className="genesis-card">
            <div className="genesis-card-top">
              <span className="genesis-tag-gold">FASE 01 • BOCETO CONCEPTUAL</span>
              <span className="genesis-tag-dim">Tinta a mano alzada</span>
            </div>
            <div className="genesis-img-box">
              <img
                src="/boceto_campana.png"
                alt="Boceto conceptual a mano alzada — Fachada Goldtex y silueta"
                className="genesis-img"
              />
              <button
                type="button"
                className="layer-lightbox-trigger"
                onClick={() => {
                  setLightboxImage({
                    src: "/boceto_campana.png",
                    title: "Fase 01 — Boceto Conceptual a Mano Alzada",
                    subtitle: "Estudio de perspectiva: umbral de entrada de Goldtex y la silueta del comprador (745 × 1024 px)",
                    format: "Boceto de Taller",
                  });
                }}
                title="Ver boceto completo"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <polyline points="9 21 3 21 3 15"></polyline>
                  <line x1="21" y1="3" x2="14" y2="10"></line>
                  <line x1="3" y1="21" x2="10" y2="14"></line>
                </svg>
              </button>
            </div>
            <div className="genesis-card-caption">
              <span className="quote-italic">“La tela no cae; la tela danza.”</span>
              <p className="swatch-desc" style={{ marginTop: "0.4rem" }}>
                Estudio inicial de perspectiva: planteamiento del umbral de entrada de Goldtex y la silueta del comprador.
              </p>
            </div>
          </div>

          {/* Fase 02: Campaña Oficial */}
          <div className="genesis-card genesis-card--highlight">
            <div className="genesis-card-top">
              <span className="genesis-tag-gold font-bold">FASE 02 • CAMPAÑA OFICIAL</span>
              <span className="genesis-tag-gold">Master Key Visual Fachada</span>
            </div>
            <div className="genesis-img-box">
              <img
                src="/la_decision_segura.png"
                alt="Master Key Visual 4K — La Decisión Segura Fachada"
                className="genesis-img"
              />
              <button
                type="button"
                className="layer-lightbox-trigger"
                onClick={() => {
                  setLightboxImage({
                    src: "/la_decision_segura.png",
                    title: "Fase 02 — Campaña Oficial: Fachada La Decisión Segura",
                    subtitle: "Render final concluido con iluminación dorada volumétrica sobre el frontis Verde Institucional (1024 × 672 px)",
                    format: "Render Oficial",
                  });
                }}
                title="Ver render completo"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <polyline points="9 21 3 21 3 15"></polyline>
                  <line x1="21" y1="3" x2="14" y2="10"></line>
                  <line x1="3" y1="21" x2="10" y2="14"></line>
                </svg>
              </button>
            </div>
            <div className="genesis-card-caption">
              <span className="quote-italic" style={{ color: "var(--white-chalk)" }}>
                Render Final Concluido
              </span>
              <p className="swatch-desc" style={{ marginTop: "0.4rem" }}>
                Iluminación dorada volumétrica envolviendo la silueta sobre el frontis Verde Institucional [RGB: 0, 62, 51].
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 5. LIGHTBOX MODAL: VISUALIZACIÓN EN ALTA DEFINICIÓN 100% COMPLETA ================= */}
      {lightboxImage && (
        <div
          className="diorama-lightbox-backdrop"
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="diorama-lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-header">
              <div>
                {lightboxImage.format && (
                  <span className="lightbox-tag">{lightboxImage.format}</span>
                )}
                <h4 className="lightbox-title">{lightboxImage.title}</h4>
                <p className="lightbox-subtitle">{lightboxImage.subtitle}</p>
              </div>
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={() => setLightboxImage(null)}
                aria-label="Cerrar vista completa"
              >
                ✕
              </button>
            </div>
            <div className="lightbox-img-wrapper">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="lightbox-full-img"
              />
            </div>
            <div className="lightbox-footer">
              <span className="lightbox-spec">VISUALIZACIÓN COMPLETA 100% SIN RECORTE • ARTE ORIGINAL GOLDTEX</span>
              <button
                type="button"
                className="lightbox-action-btn"
                onClick={() => window.open(lightboxImage.src, "_blank")}
              >
                Abrir imagen original en nueva pestaña ↗
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

