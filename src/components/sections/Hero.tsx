/* Generado desde index.html — contenido íntegro preservado (conversión mecánica HTML→JSX). */
export default function Hero() {
  return (
    <>
        <section className="hero" id="hero-section">
            {/*  Video de Fondo del Hero (Bucle continuo de hilos de seda sin texto)  */}
            <video className="hero-video-bg" id="hero-bg-video" autoPlay muted loop playsInline preload="auto">
                <source src="/Green_silk_threads_and_gold_20261014210923.mp4" type="video/mp4" />
                <source src="/heroe_video.mp4" type="video/mp4" />
            </video>
            <div className="hero-video-overlay"></div>

            <div className="hero-interactive-anchor">
                <div className="hero-pill">
                    <span className="hero-pill-icon"></span>
                    <span className="hero-pretitle">Gamarra, La Victoria, Lima • Desde 2005</span>
                </div>
                <div className="hero-title-wrap">
                    <h1 className="hero-title">GOLDTEX</h1>
                </div>
                <div style={{ marginBottom: "1.6rem" }}>
                    <span
                        style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3.2vw, 2.2rem)", letterSpacing: "0.28em", color: "var(--gold-caramel)", textTransform: "uppercase", fontWeight: "700", display: "inline-block", borderBottom: "2px solid var(--gold-caramel)", paddingBottom: "6px", textShadow: "0 0 25px rgba(241, 183, 52, 0.4)" }}>
                        LA DECISIÓN SEGURA
                    </span>
                </div>
                <p className="hero-subtitle">
                    Una buena decisión es el inicio de un gran proyecto.<br />
                    Más de 50 tipos de telas, venta por metros y fardos, asesoramiento
                    técnico y despacho express a Lima y provincias.
                </p>

                {/*  Botones de Acción Táctil Directa  */}
                <div className="hero-interaction-hud">
                    <button className="hud-btn active" id="btn-touch-mode" data-action="setInteractionMode('orbit')">
                        <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 3v6h-6"/></svg> Arrastrar Rollo</span>
                    </button>
                    <button className="hud-btn" id="btn-cloth-touch" data-action="setInteractionMode('touch')">
                        <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 12.5V6a1.5 1.5 0 0 1 3 0v5.5"/><path d="M11 11V4.5a1.5 1.5 0 0 1 3 0V11"/><path d="M14 11V6a1.5 1.5 0 0 1 3 0v6.5"/><path d="M17 13c0 3.9-2.6 6.5-5.8 6.5a5.4 5.4 0 0 1-4.3-2.1L5.4 14.6a1.5 1.5 0 0 1 2.3-1.9l1.8 2.1"/></svg> Tocar la Tela</span>
                    </button>
                    <button className="hud-btn" id="btn-zoom-fiber" data-action="scrollToExperience()">
                        <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg> Explorar Fibras</span>
                    </button>
                </div>

                <div className="hero-viewport-tags" style={{ marginTop: "1.5rem" }}>
                    <button className="tag-pill active" data-action="switch3DCamera('overview')">Vista Global</button>
                    <button className="tag-pill" data-action="switch3DCamera('focus-drape')">Pliegues & Caída</button>
                    <button className="tag-pill" data-action="switch3DCamera('focus-roll')">Rollo Principal</button>
                </div>
            </div>

            {/*  Indicador Táctil Flotante  */}
            <div className="hero-drag-prompt" data-action="setInteractionMode('orbit')">
                <div className="drag-icon-pulse"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l2.1 6.4 6.4 2.1-6.4 2.1L12 20l-2.1-6.4-6.4-2.1 6.4-2.1z"/></svg></div>
                <div className="drag-prompt-text">
                    <span>Arrastra el cursor</span>
                    Gira el rollo en 360° en tiempo real
                </div>
            </div>

            <div className="scroll-hint" data-action="scrollToExperience()">
                <span>Desliza para explorar</span>
                <div className="scroll-needle"></div>
            </div>
        </section>
    </>
  );
}
