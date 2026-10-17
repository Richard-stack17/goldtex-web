"use client";

import { useState } from "react";

export default function KeyVisualSpatialDiorama() {
  const [activeFocal, setActiveFocal] = useState<"center" | "left" | "right">("center");

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

      {/* ================= 2. SPATIAL 3D IMMERSIVE GALLERY (LA IMAGEN DEL USUARIO) ================= */}
      <div className="diorama-stage-wrapper">
        {/* Marca de Agua Tipográfica Monumental detrás de las imágenes */}
        <div className="diorama-backdrop-watermark" aria-hidden="true">
          <span className="watermark-bold">LA DECISIÓN</span>
          <span className="watermark-italic">segura</span>
        </div>

        {/* Galería Curva en 3 Capas de Profundidad */}
        <div className="diorama-layers-track">
          {/* Capa Izquierda Flotante: -150px de profundidad */}
          <div
            className={`diorama-side-layer layer-left ${activeFocal === "left" ? "is-focal" : ""}`}
            onClick={() => setActiveFocal("left")}
            title="Ver perspectiva Atelier"
          >
            <div className="layer-frame">
              <img
                src="/key_visual_2.png"
                alt="Goldtex Fabric Detail Perspective"
                className="layer-img"
              />
              <div className="layer-gradient-overlay"></div>
            </div>
            <div className="layer-depth-badge badge-left">
              DEPTH LAYER: -150PX • VUELO TEXTIL
            </div>
          </div>

          {/* COMPOSICIÓN CENTRAL HERO: Focal Depth 0.00 */}
          <div
            className={`diorama-hero-card ${activeFocal === "center" ? "is-focal" : ""}`}
            onClick={() => setActiveFocal("center")}
          >
            {/* Anillos de Resplandor Oro y Esmeralda */}
            <div className="hero-glow-aura" aria-hidden="true"></div>

            {/* Píldora Superior Derecha: Telemetría Espacial */}
            <div className="hero-focal-pill">
              FOCAL DEPTH: 0.00 (CENTRAL HERO)
            </div>

            {/* Marco Estructural Editorial */}
            <div className="hero-frame">
              <img
                src="/ev3_key_visual_master.png"
                alt="Master Key Visual 4K — La Decisión Segura"
                className="hero-main-img"
              />

              {/* Degradado Cinematográfico */}
              <div className="hero-img-overlay" aria-hidden="true"></div>

              {/* Badge Superior Izquierdo */}
              <div className="hero-master-badge">
                <span className="badge-gold-dot"></span>
                <span>CAMPAIGN KEY VISUAL • MASTER SHOT</span>
              </div>

              {/* Contenido Editorial Inferior */}
              <div className="hero-footer-content">
                <div>
                  <span className="hero-kicker-label">CAMPAÑA CENTRAL</span>
                  <h3 className="hero-display-title">La Decisión Segura</h3>
                  <p className="hero-caption-text">
                    “Una buena decisión es el inicio de un gran proyecto.” Dirección de arte y composición publicitaria oficial Goldtex.
                  </p>
                </div>
                <div className="hero-project-year">
                  PROYECTO GAMARRA 2024
                </div>
              </div>
            </div>

            {/* Sello Flotante 3D Pop-Out */}
            <div className="hero-popout-orb" aria-hidden="true">
              <div className="orb-glass-inner">
                <span>
                  TELA EN MOVIMIENTO<br />
                  • SALIDA DE PLANO 3D •
                </span>
              </div>
            </div>
          </div>

          {/* Capa Derecha Flotante: +150px de profundidad */}
          <div
            className={`diorama-side-layer layer-right ${activeFocal === "right" ? "is-focal" : ""}`}
            onClick={() => setActiveFocal("right")}
            title="Ver perspectiva Showroom"
          >
            <div className="layer-frame">
              <img
                src="/key_visual.png"
                alt="Showroom Goldtex Key Visual"
                className="layer-img"
              />
              <div className="layer-gradient-overlay"></div>
            </div>
            <div className="layer-depth-badge badge-right">
              DEPTH LAYER: +150PX • ATELIER VIEW
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
                alt="Boceto conceptual a mano alzada"
                className="genesis-img"
              />
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
              <span className="genesis-tag-gold">Master Key Visual 4K</span>
            </div>
            <div className="genesis-img-box">
              <img
                src="/la_decision_segura.png"
                alt="Master Key Visual 4K — La Decisión Segura"
                className="genesis-img"
              />
              <div className="genesis-img-badge">
                <strong>GOLDTEX • TELAS QUE INSPIRAN</strong>
                <p>Una buena tela es el inicio de un gran proyecto.</p>
              </div>
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
    </div>
  );
}
