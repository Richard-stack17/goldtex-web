"use client";

import { useState } from "react";

export default function Audiovisual() {
  const [activeCut, setActiveCut] = useState<"oficial" | "atelier">("oficial");

  const handleSelectCut = (cut: "oficial" | "atelier") => {
    setActiveCut(cut);
    if (typeof window !== "undefined") {
      const vOficial = document.getElementById("spot-video-3") as HTMLVideoElement | null;
      const vAtelier = document.getElementById("spot-video-4") as HTMLVideoElement | null;

      if (cut === "oficial") {
        if (vAtelier && !vAtelier.paused) vAtelier.pause();
        if (vOficial && vOficial.paused) vOficial.play().catch(() => {});
      } else {
        if (vOficial && !vOficial.paused) vOficial.pause();
        if (vAtelier && vAtelier.paused) vAtelier.play().catch(() => {});
      }
    }
  };

  return (
    <>
      <section id="audiovisual">
        <div className="section-header">
          <p>Narrativa &amp; Storytelling • Campaña Nacional</p>
          <h2>Producción Audiovisual</h2>
          <p
            style={{
              fontSize: "0.98rem",
              color: "rgba(242, 235, 221, 0.75)",
              maxWidth: "780px",
              margin: "0.8rem auto 0",
              fontWeight: "300",
              lineHeight: "1.6",
            }}
          >
            De la inspiración textil en el atelier al spot oficial de televisión y medios digitales. El ecosistema audiovisual que consolida a Goldtex como el aliado de confianza del diseñador peruano.
          </p>
        </div>

        {/* Master Brand Film: Teatro Cinemático Panorámico 16:9 con Selector de Corte */}
        <div className="brand-film-hero-card reveal-card">
          <div className="brand-film-badge-bar">
            <div className="brand-film-tag">
              <span className="brand-film-tag-dot"></span>
              <span>Master Panorámico 16:9</span>
            </div>

            {/* Selector interactivo de versión cinemática */}
            <div className="brand-film-version-tabs" role="tablist" aria-label="Versiones del Film Principal">
              <button
                type="button"
                className={`brand-version-tab ${activeCut === "oficial" ? "is-active" : ""}`}
                onClick={() => handleSelectCut("oficial")}
                role="tab"
                aria-selected={activeCut === "oficial"}
              >
                <span className="tab-indicator"></span>
                <span>Spot Oficial Broadcast (16:9)</span>
              </button>
              <button
                type="button"
                className={`brand-version-tab ${activeCut === "atelier" ? "is-active" : ""}`}
                onClick={() => handleSelectCut("atelier")}
                role="tab"
                aria-selected={activeCut === "atelier"}
              >
                <span className="tab-indicator"></span>
                <span>Fashion Film Atelier (16:9)</span>
              </button>
            </div>

            <div className="brand-film-meta">
              00:10 • Audio Estéreo • Dirección Goldtex
            </div>
          </div>

          {/* Reproductor Corte 1: Spot Oficial Broadcast (publicidad.mp4) */}
          <div
            className="video-player-container is-landscape"
            id="video-container-3"
            style={{ display: activeCut === "oficial" ? "block" : "none" }}
          >
            <video
              id="spot-video-3"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/poster_publicidad.jpg"
              data-action="togglePlayVideo(3)"
            >
              <source src="/publicidad.mp4" type="video/mp4" />
              Tu navegador no soporta video.
            </video>
            <div className="video-overlay-controls">
              <div className="video-ctrl-group">
                <button
                  className="video-ctrl-btn"
                  id="audio-btn-3"
                  data-action="toggleAudioVideo(3)"
                  title="Activar/Silenciar Sonido"
                >
                  <span id="audio-icon-3" data-ic-muted>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                  </span>
                  <span id="audio-text-3">Silenciado</span>
                </button>
                <button
                  className="video-ctrl-btn"
                  id="play-btn-3"
                  data-action="togglePlayVideo(3)"
                  title="Pausar/Reproducir"
                >
                  <span id="play-icon-3" data-ic-pause>
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1.2"/><rect x="14" y="4" width="4" height="16" rx="1.2"/></svg>
                  </span>
                </button>
              </div>
              <div className="video-ctrl-group">
                <button
                  className="video-ctrl-btn"
                  data-action="toggleFullscreenVideo(3)"
                  title="Pantalla Completa"
                >
                  <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 3H3v5"/><path d="M16 3h5v5"/><path d="M8 21H3v-5"/><path d="M16 21h5v-5"/></svg></span>
                  <span>Pantalla Completa</span>
                </button>
              </div>
            </div>
          </div>

          {/* Reproductor Corte 2: Fashion Film Atelier (brand_film_goldtex.mp4 / gemini_generated_video_41dc46fa.mp4) */}
          <div
            className="video-player-container is-landscape"
            id="video-container-4"
            style={{ display: activeCut === "atelier" ? "block" : "none" }}
          >
            <video
              id="spot-video-4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/poster_brand_film.jpg"
              data-action="togglePlayVideo(4)"
            >
              <source src="/brand_film_goldtex.mp4" type="video/mp4" />
              <source src="/gemini_generated_video_41dc46fa.mp4" type="video/mp4" />
              Tu navegador no soporta video.
            </video>
            <div className="video-overlay-controls">
              <div className="video-ctrl-group">
                <button
                  className="video-ctrl-btn"
                  id="audio-btn-4"
                  data-action="toggleAudioVideo(4)"
                  title="Activar/Silenciar Sonido"
                >
                  <span id="audio-icon-4" data-ic-muted>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                  </span>
                  <span id="audio-text-4">Silenciado</span>
                </button>
                <button
                  className="video-ctrl-btn"
                  id="play-btn-4"
                  data-action="togglePlayVideo(4)"
                  title="Pausar/Reproducir"
                >
                  <span id="play-icon-4" data-ic-pause>
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1.2"/><rect x="14" y="4" width="4" height="16" rx="1.2"/></svg>
                  </span>
                </button>
              </div>
              <div className="video-ctrl-group">
                <button
                  className="video-ctrl-btn"
                  data-action="toggleFullscreenVideo(4)"
                  title="Pantalla Completa"
                >
                  <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 3H3v5"/><path d="M16 3h5v5"/><path d="M8 21H3v-5"/><path d="M16 21h5v-5"/></svg></span>
                  <span>Pantalla Completa</span>
                </button>
              </div>
            </div>
          </div>

          {/* Información dinámica según el corte activo */}
          {activeCut === "oficial" ? (
            <div className="brand-film-info">
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.6rem",
                    color: "var(--gold-champagne)",
                    marginBottom: "0.5rem",
                    letterSpacing: "0.06em",
                  }}
                >
                  Spot Oficial: &quot;Telas que Inspiran&quot;
                </h3>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "rgba(242, 235, 221, 0.82)",
                    lineHeight: "1.65",
                    fontWeight: "300",
                    maxWidth: "680px",
                  }}
                >
                  Film publicitario central de la campaña nacional Goldtex: recorrido por el showroom de telas en Gamarra, corte y confección en taller, coreografía en satén esmeralda y oro (<em>&quot;Dale vida a tus ideas&quot;</em>) y cierre oficial de marca con canales digitales.
                </p>
              </div>
              <div className="brand-film-specs">
                <span className="brand-spec-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                  16:9 Panorámico
                </span>
                <span className="brand-spec-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  Broadcast &amp; TV
                </span>
                <span className="brand-spec-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  @Goldtex_Oficial
                </span>
              </div>
            </div>
          ) : (
            <div className="brand-film-info">
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.6rem",
                    color: "var(--gold-champagne)",
                    marginBottom: "0.5rem",
                    letterSpacing: "0.06em",
                  }}
                >
                  Fashion Film: Atelier &amp; Alta Costura
                </h3>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "rgba(242, 235, 221, 0.82)",
                    lineHeight: "1.65",
                    fontWeight: "300",
                    maxWidth: "680px",
                  }}
                >
                  Corte conceptual de moda textil: retrato sensorial de la cadencia del satén dorado y esmeralda, diseño en taller con patrones de sastrería y enfoque macro en la pureza y caída de los hilados Goldtex.
                </p>
              </div>
              <div className="brand-film-specs">
                <span className="brand-spec-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                  16:9 Panorámico
                </span>
                <span className="brand-spec-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  Alta Costura
                </span>
                <span className="brand-spec-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  Dirección de Arte
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Separador de Spots Redes Sociales */}
        <div className="vertical-spots-divider">
          <span className="vertical-spots-label">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="5" y="2" width="14" height="20" rx="3"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg>
            Spots para Redes Sociales • Formato 9:16
          </span>
        </div>

        <div className="video-grid">
          {/* Video 1: Spot I - Guía de Telas (TikTok / Reels) */}
          <div className="video-card reveal-card">
            <div className="video-player-container" id="video-container-1">
              <video
                id="spot-video-1"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="/poster_spot1.jpg"
                data-action="togglePlayVideo(1)"
              >
                <source src="/guia_telas_algodon.mp4" type="video/mp4" />
                <source src="/publicidad.mp4" type="video/mp4" />
                Tu navegador no soporta video.
              </video>
              <div className="video-overlay-controls">
                <div className="video-ctrl-group">
                  <button
                    className="video-ctrl-btn"
                    id="audio-btn-1"
                    data-action="toggleAudioVideo(1)"
                    title="Activar/Silenciar Sonido"
                  >
                    <span id="audio-icon-1" data-ic-muted>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                    </span>
                    <span id="audio-text-1">Silenciado</span>
                  </button>
                  <button
                    className="video-ctrl-btn"
                    id="play-btn-1"
                    data-action="togglePlayVideo(1)"
                    title="Pausar/Reproducir"
                  >
                    <span id="play-icon-1" data-ic-pause>
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1.2"/><rect x="14" y="4" width="4" height="16" rx="1.2"/></svg>
                    </span>
                  </button>
                </div>
                <div className="video-ctrl-group">
                  <button
                    className="video-ctrl-btn"
                    data-action="toggleFullscreenVideo(1)"
                    title="Pantalla Completa"
                  >
                    <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 3H3v5"/><path d="M16 3h5v5"/><path d="M8 21H3v-5"/><path d="M16 21h5v-5"/></svg></span>
                    <span>Pantalla Completa</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="card-info">
              <h3>Spot I: Guía de Telas (TikTok / Reels)</h3>
              <p>Cápsula vertical en tienda física Goldtex explicando las propiedades y variedad del algodón peruano.</p>
            </div>
          </div>

          {/* Video 2: Spot II - Texturas & Atelier */}
          <div className="video-card reveal-card">
            <div className="video-player-container" id="video-container-2">
              <video
                id="spot-video-2"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="/poster_spot2.jpg"
                data-action="togglePlayVideo(2)"
              >
                <source src="/publicidad2.mp4" type="video/mp4" />
                Tu navegador no soporta video.
              </video>
              <div className="video-overlay-controls">
                <div className="video-ctrl-group">
                  <button
                    className="video-ctrl-btn"
                    id="audio-btn-2"
                    data-action="toggleAudioVideo(2)"
                    title="Activar/Silenciar Sonido"
                  >
                    <span id="audio-icon-2" data-ic-muted>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                    </span>
                    <span id="audio-text-2">Silenciado</span>
                  </button>
                  <button
                    className="video-ctrl-btn"
                    id="play-btn-2"
                    data-action="togglePlayVideo(2)"
                    title="Pausar/Reproducir"
                  >
                    <span id="play-icon-2" data-ic-pause>
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1.2"/><rect x="14" y="4" width="4" height="16" rx="1.2"/></svg>
                    </span>
                  </button>
                </div>
                <div className="video-ctrl-group">
                  <button
                    className="video-ctrl-btn"
                    data-action="toggleFullscreenVideo(2)"
                    title="Pantalla Completa"
                  >
                    <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 3H3v5"/><path d="M16 3h5v5"/><path d="M8 21H3v-5"/><path d="M16 21h5v-5"/></svg></span>
                    <span>Pantalla Completa</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="card-info">
              <h3>Spot II: Texturas &amp; Atelier</h3>
              <p>Cápsula vertical de moda exhibiendo la caída del satén esmeralda y detalles en brocado dorado.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
