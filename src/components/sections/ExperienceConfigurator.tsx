/* Generado desde index.html — contenido íntegro preservado (conversión mecánica HTML→JSX). */
export default function ExperienceConfigurator() {
  return (
    <>
        <section className="experience-stage" id="experience-configurator">
            <div className="experience-panel reveal-card">
                <div className="experience-info">
                    <div className="experience-tag">Catálogo Interactivo 3D</div>
                    <h2 className="experience-title">Explora Nuestras Telas</h2>
                    <p className="experience-desc">
                        Selecciona una línea de producto y observa cómo se comporta el textil en el
                        showroom 3D: caída, relieve y densidad de tejido. La ficha técnica detallada
                        se confirma por WhatsApp Business.
                    </p>

                    {/*  Selector de Líneas de Producto Reales  */}
                    <div className="fabric-selector-grid">
                        <div className="fabric-chip active" data-action="selectFabricPreset('drill-industrial')">
                            <span className="chip-name">Drill Industrial</span>
                            <span className="chip-detail">Uniformes • Ancho 1.50 m</span>
                        </div>
                        <div className="fabric-chip" data-action="selectFabricPreset('popelina')">
                            <span className="chip-name">Popelina</span>
                            <span className="chip-detail">Ligera • Confección</span>
                        </div>
                        <div className="fabric-chip" data-action="selectFabricPreset('tejido-punto')">
                            <span className="chip-name">Tejidos de Punto</span>
                            <span className="chip-detail">Ropa Urbana & Deportiva</span>
                        </div>
                        <div className="fabric-chip" data-action="selectFabricPreset('algodon-poly')">
                            <span className="chip-name">Algodón & Poliéster</span>
                            <span className="chip-detail">Estampados & Corporativo</span>
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                        <button className="hud-btn" data-action="triggerFabricWave()"
                            style={{ background: "rgba(241, 183, 52, 0.2)" }}>
                            <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 12c2-3.5 4-3.5 6 0s4 3.5 6 0 4-3.5 6 0"/></svg> Ondular Tejido</span>
                        </button>
                        <button className="hud-btn" data-action="zoomToMicroFiber()">
                            <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/><path d="M11 8.5v5"/><path d="M8.5 11h5"/></svg> Zoom a la Urdimbre</span>
                        </button>
                    </div>
                    <p className="catalog-note">
                        Líneas confirmadas en la investigación de mercado: tejidos de punto, algodón,
                        poliéster y estampados para ropa urbana, corporativa y deportiva; venta por
                        metros, fardo/rollo cerrado y cuarto de docena.
                    </p>
                </div>

                {/*  HUD de Ficha Técnica del Textil  */}
                <div className="scanner-hud-card">
                    <div className="scanner-laser-line"></div>
                    <div className="scanner-header">
                        <div className="scanner-title">
                            <span>◈</span> Ficha Técnica en Vivo
                        </div>
                        <div className="scanner-status" id="scanner-status-text">IDENTIFICANDO TELA...</div>
                    </div>

                    <div className="spec-gauge-grid">
                        <div className="gauge-item">
                            <span className="gauge-label">Referencia</span>
                            <span className="gauge-val" id="spec-gsm">Drill Industrial</span>
                            <span className="gauge-sub" id="spec-weight">Venta por metros</span>
                        </div>
                        <div className="gauge-item">
                            <span className="gauge-label">Ancho</span>
                            <span className="gauge-val" id="spec-weave">1.50 m</span>
                            <span className="gauge-sub" id="spec-threads">Optimiza cortes</span>
                        </div>
                        <div className="gauge-item">
                            <span className="gauge-label">Modalidad</span>
                            <span className="gauge-val" id="spec-comp">Metros / Fardos</span>
                            <span className="gauge-sub" id="spec-origin">Cuarto de docena</span>
                        </div>
                        <div className="gauge-item">
                            <span className="gauge-label">Precio ref.</span>
                            <span className="gauge-val" id="spec-finish">S/ 12.50 m</span>
                            <span className="gauge-sub" id="spec-stretch">Cotiza por WhatsApp</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  );
}
