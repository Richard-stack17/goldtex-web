import MirrorVault from "@/components/experience/MirrorVault";
import KeyVisualSpatialDiorama from "@/components/experience/KeyVisualSpatialDiorama";

/* Generado desde index.html — contenido íntegro preservado (conversión mecánica HTML→JSX). */
export default function Evidencia3() {
  return (
    <>
        <section className="evidencia-panel" id="evidencia-3">
            <div className="evidencia-header evidencia-video-portal">
                <video className="portal-bg-video" autoPlay muted loop playsInline preload="metadata">
                    <source src="/Green_silk_threads_and_gold_20261014210923.mp4" type="video/mp4" />
                </video>
                <div className="portal-video-overlay"></div>
                <div className="portal-header-content">
                    <span className="evidencia-badge">Evidencia 03 • Urdimbre & Estética</span>
                    <h2 className="section-title-xl">Dirección de Arte & Key Visual</h2>
                </div>
            </div>

            {/* Bóveda de Espejos 3D — Anillo cilíndrico de 12 espejos con pop-out de la bailarina */}
            <MirrorVault />

            {/* HAUTE COUTURE SPATIAL DIORAMA (3 Capas de Profundidad + Tríptico de Autor + Génesis del Arte) */}
            <KeyVisualSpatialDiorama />

            {/*  Tipografía Oficial  */}
            <section className="section-block" id="tipografia-oficial">
                <p className="section-kicker">Sistema Tipográfico</p>
                <h2 className="section-title-xl">Tipografía Oficial</h2>
                <p className="section-lead">Times New Roman para títulos y encabezados (display / serif) y Cantarell para textos y cuerpos (sans-serif): la jerarquía editorial oficial del Brand Book.</p>
                {/*  Carrusel: Ficha tipográfica oficial  */}
                <div className="carousel" id="carousel-tipografia" aria-roledescription="carrusel" aria-label="Ficha tipográfica oficial">
                    <div className="carousel-viewport">
                        <div className="carousel-track">
                            <figure className="carousel-slide is-active">
                                <div className="carousel-img-wrap carousel-img-wrap--contain" style={{ background: "#ffffff", padding: "2rem" }}>
                                    <img src="/assets/evidencias/ev3/ev3_page_03.png" alt="Ficha tipográfica oficial — Evidencia 03, página 3" loading="lazy" />
                                </div>
                                <figcaption className="carousel-caption">
                                    <span className="experience-tag">Evidencia 03 · Pág. 3</span>
                                    <h3>Ficha Tipográfica</h3>
                                    <p>La dupla tipográfica oficial de la marca: Times New Roman y Cantarell en toda la alfabeto y numeración.</p>
                                </figcaption>
                            </figure>
                            <figure className="carousel-slide">
                                <div className="carousel-img-wrap carousel-img-wrap--contain" style={{ background: "#ffffff", padding: "2rem" }}>
                                    <img src="/tipografia_manual.png" alt="Lámina tipográfica y colorimétrica oficial Goldtex" loading="lazy" />
                                </div>
                                <figcaption className="carousel-caption">
                                    <span className="experience-tag">Lámina Técnica</span>
                                    <h3>Tipografía &amp; Colorimetría</h3>
                                    <p>Lámina manual oficial con la especificación tipográfica y colorimétrica de campaña.</p>
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                    <div className="carousel-counter" aria-hidden="true"><span className="carousel-current">01</span><span className="carousel-sep">/</span><span className="carousel-total">02</span></div>
                    <button className="carousel-btn carousel-prev" type="button" aria-label="Diapositiva anterior"><span aria-hidden="true">‹</span></button>
                    <button className="carousel-btn carousel-next" type="button" aria-label="Diapositiva siguiente"><span aria-hidden="true">›</span></button>
                    <div className="carousel-dots" role="tablist" aria-label="Navegación del carrusel">
                        <button className="carousel-dot is-active" type="button" role="tab" aria-selected="true" aria-label="Diapositiva 1 de 2"><span className="carousel-dot-num">01</span></button>
                        <button className="carousel-dot" type="button" role="tab" aria-selected="false" aria-label="Diapositiva 2 de 2"><span className="carousel-dot-num">02</span></button>
                    </div>
                </div>
                                    <div className="typo-spec-box">
                        <div className="typo-spec-item">
                            <span className="typo-spec-label">Títulos & Encabezados (Display / Serif)</span>
                            <span className="typo-spec-val" style={{ fontFamily: "var(--font-display)" }}>Times New Roman</span>
                        </div>
                        <div className="typo-spec-item">
                            <span className="typo-spec-label">Textos & Cuerpos (Sans-Serif)</span>
                            <span className="typo-spec-val" style={{ fontFamily: "var(--font-body)" }}>Cantarell (Oficial Brand
                                Book)</span>
                        </div>
                    </div>
            </section>

            {/*  Ficha Técnica de Identidad y Psicología del Color (unificada)  */}
            <section className="section-block" id="identidad-color">
                <p className="section-kicker">Identidad Corporativa Técnica</p>
                <h2 className="section-title-xl">Color & Psicología de Marca</h2>
                <p className="section-lead">Ficha técnica unificada: los tres colores oficiales de la marca y el efecto sensorial que proyectan sobre diseñadores, modistas y confeccionistas.</p>
                {/*  Carrusel: Identidad visual oficial  */}
                <div className="carousel" id="carousel-identidad" aria-roledescription="carrusel" aria-label="Identidad visual oficial">
                    <div className="carousel-viewport">
                        <div className="carousel-track">
                            <figure className="carousel-slide is-active">
                                <div className="carousel-img-wrap carousel-img-wrap--contain" style={{ padding: "2rem" }}>
                                    <img src="/assets/evidencias/ev3/ev3_page_04.png" alt="Colores oficiales — Evidencia 03, página 4" loading="lazy" />
                                </div>
                                <figcaption className="carousel-caption">
                                    <span className="experience-tag">Evidencia 03 · Pág. 4</span>
                                    <h3>Colores Oficiales</h3>
                                    <p>Brunswick Green, Papaya Orange y Chalk White: la paleta técnica oficial con sus valores RGB, HSB y CMYK.</p>
                                </figcaption>
                            </figure>
                            <figure className="carousel-slide">
                                <div className="carousel-img-wrap carousel-img-wrap--contain" style={{ padding: "2rem" }}>
                                    <img src="/moodboard.jpg" alt="Moodboard oficial Goldtex — The Art of Textile" loading="lazy" />
                                </div>
                                <figcaption className="carousel-caption">
                                    <span className="experience-tag">Dirección Creativa</span>
                                    <h3>Moodboard Oficial</h3>
                                    <p>Curaduría de texturas nobles, tejidos de punto, algodones, estampados y paletas tonales concebidas en el corazón de Gamarra.</p>
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                    <div className="carousel-counter" aria-hidden="true"><span className="carousel-current">01</span><span className="carousel-sep">/</span><span className="carousel-total">02</span></div>
                    <button className="carousel-btn carousel-prev" type="button" aria-label="Diapositiva anterior"><span aria-hidden="true">‹</span></button>
                    <button className="carousel-btn carousel-next" type="button" aria-label="Diapositiva siguiente"><span aria-hidden="true">›</span></button>
                    <div className="carousel-dots" role="tablist" aria-label="Navegación del carrusel">
                        <button className="carousel-dot is-active" type="button" role="tab" aria-selected="true" aria-label="Diapositiva 1 de 2"><span className="carousel-dot-num">01</span></button>
                        <button className="carousel-dot" type="button" role="tab" aria-selected="false" aria-label="Diapositiva 2 de 2"><span className="carousel-dot-num">02</span></button>
                    </div>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--ivory)", margin: "3.5rem 0 1rem" }}>Muestrario Oficial de Colores Técnicos</h3>
                                    <div className="brand-swatch-list">
                        <div className="swatch-card">
                            <div className="swatch-color-box"
                                style={{ backgroundColor: "#083E35", boxShadow: "0 0 15px rgba(8, 62, 53, 0.7)", border: "1px solid rgba(241, 183, 52, 0.3)" }}>
                            </div>
                            <div className="swatch-meta">
                                <h4>Brunswick Green</h4>
                                <span style={{ color: "#4ade80" }}>RGB(8, 62, 53) • CMYK(87, 0, 15, 76) • #083E35</span>
                                <p>Tono madre que transmite solidez, equilibrio, fiabilidad y la excelencia de fibras
                                    naturales puras.</p>
                            </div>
                        </div>

                        <div className="swatch-card">
                            <div className="swatch-color-box"
                                style={{ backgroundColor: "#F1B734", boxShadow: "0 0 15px rgba(241, 183, 52, 0.5)", border: "1px solid rgba(255, 255, 255, 0.3)" }}>
                            </div>
                            <div className="swatch-meta">
                                <h4>Papaya Orange</h4>
                                <span style={{ color: "var(--gold-caramel)" }}>RGB(241, 183, 52) • CMYK(0, 24, 78, 5) •
                                    #F1B734</span>
                                <p>Acento de prestigio, destello hilado y exclusividad que eleva la percepción de la
                                    marca.</p>
                            </div>
                        </div>

                        <div className="swatch-card">
                            <div className="swatch-color-box"
                                style={{ backgroundColor: "#F4F3F3", boxShadow: "0 0 15px rgba(244, 243, 243, 0.3)", border: "1px solid rgba(0, 0, 0, 0.2)" }}>
                            </div>
                            <div className="swatch-meta">
                                <h4>Chalk White</h4>
                                <span style={{ color: "#F4F3F3" }}>RGB(244, 243, 243) • CMYK(0, 0, 0, 4) • #F4F3F3</span>
                                <p>Pureza y neutralidad técnica que simboliza la fibra virgen de primera calidad.</p>
                            </div>
                        </div>
                    </div>

                    {/*  Especificaciones Tipográficas Oficiales  */}
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--ivory)", margin: "3.5rem 0 1rem" }}>Justificación Teórica: Psicología del Color</h3>
                <div className="psychology-cards-stack reveal-card" style={{ marginTop: "1.5rem" }}>
                                        {/*  Card 1: Verde Institucional  */}
                    <div className="psych-card" style={{ borderLeft: "4px solid #083E35" }} data-tilt data-tilt-max="5">
                        <div className="psych-card-header">
                            <div className="psych-color-pill"
                                style={{ background: "#083E35", boxShadow: "0 0 20px rgba(8,62,53,0.8)", border: "1px solid rgba(241,183,52,0.4)" }}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19.5C5 10 11.5 4 20 4c0 8.5-6 15.5-15 15.5z"/><path d="M5 19.5C8 14.5 12 10.5 16.5 8"/></svg>
                            </div>
                            <div className="psych-title-block">
                                <h4 style={{ fontFamily: "var(--font-display)" }}>Brunswick Green</h4>
                                <span style={{ color: "#4ade80" }}>RGB(8, 62, 53) • CMYK(87, 0, 15, 76) • #083E35</span>
                            </div>
                        </div>
                        <p>
                            Comunica <strong>confianza, solidez y equilibrio</strong>. Vinculado directamente al
                            concepto <em>"LA DECISIÓN SEGURA"</em>: evoca el origen natural, la resistencia y el confort
                            de las fibras textiles.
                        </p>
                        <div className="psych-tags">
                            <span className="psych-tag">Decisión Segura</span>
                            <span className="psych-tag">Fiabilidad & Calidad</span>
                            <span className="psych-tag">Confort Textil</span>
                        </div>
                    </div>

                    {/*  Card 2: Papaya Orange  */}
                    <div className="psych-card" style={{ borderLeft: "4px solid #F1B734" }} data-tilt data-tilt-max="5">
                        <div className="psych-card-header">
                            <div className="psych-color-pill"
                                style={{ background: "#F1B734", boxShadow: "0 0 20px rgba(241,183,52,0.5)", border: "1px solid rgba(255,255,255,0.3)", color: "#000" }}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3.5 8 8 12l4-7.5L16 12l4.5-4-1.5 11.5h-15z"/><path d="M5 21h14"/></svg>
                            </div>
                            <div className="psych-title-block">
                                <h4 style={{ fontFamily: "var(--font-display)" }}>Papaya Orange</h4>
                                <span style={{ color: "var(--gold-caramel)" }}>RGB(241, 183, 52) • CMYK(0, 24, 78, 5) • #F1B734</span>
                            </div>
                        </div>
                        <p>
                            Representa el <strong>triunfo comercial, el valor patrimonial y la exclusividad</strong>.
                            Eleva a Goldtex sobre la distribución textil masiva de Gamarra, dotando a la marca de un
                            sello premium y prestigio.
                        </p>
                        <div className="psych-tags">
                            <span className="psych-tag">Prestigio de Marca</span>
                            <span className="psych-tag">Valor & Exclusividad</span>
                            <span className="psych-tag">Éxito Comercial</span>
                        </div>
                    </div>

                    {/*  Cuadro de Guion para la Exposición Oral  */}
                    <div className="speech-script-box">

                        <blockquote>
                            "Al mapear a los competidores de Gamarra en el círculo cromático, confirmamos saturación en
                            magentas, naranjas y azules. Para consolidar el concepto de campaña <strong>'LA DECISIÓN
                                SEGURA'</strong>, Goldtex se apropia del <strong>Verde Institucional [RGB: 0, 62,
                                51]</strong> —que transmite fiabilidad y pureza de fibra— junto al
                            <strong>Dorado/Caramelo [RGB: 228, 195, 58]</strong>, garantizando sofisticación editorial y
                            diferenciación competitiva absoluta."
                        </blockquote>
                    </div>
                </div>
            </section>

            {/*  Dirección Fotográfica  */}
            <section className="section-block" id="direccion-fotografica">
                <p className="section-kicker">Producción Fotográfica</p>
                <h2 className="section-title-xl">Dirección Fotográfica</h2>
                <p className="section-lead">Ángulo 3/4 y encuadre plano medio; pose sentada, apoyada sobre la mesa, con actitud pensativa y segura; luz natural suave simulando luz de ventana con temperatura cálida.</p>
                {/*  Carrusel: Dirección fotográfica de campaña  */}
                <div className="carousel" id="carousel-foto" aria-roledescription="carrusel" aria-label="Dirección fotográfica de campaña">
                    <div className="carousel-viewport">
                        <div className="carousel-track">
                            <figure className="carousel-slide is-active">
                                <div className="carousel-img-wrap">
                                    <img src="/assets/evidencias/ev3/ev3_page_05.png" alt="Ángulo y encuadre — Evidencia 03, página 5" loading="lazy" />
                                </div>
                                <figcaption className="carousel-caption">
                                    <span className="experience-tag">Dirección Fotográfica</span>
                                    <h3>Ángulo &amp; Encuadre</h3>
                                    <p>Ángulo 3/4 con encuadre plano medio que humaniza a la modelo y protagoniza el textil.</p>
                                </figcaption>
                            </figure>
                            <figure className="carousel-slide">
                                <div className="carousel-img-wrap">
                                    <img src="/assets/evidencias/ev3/ev3_page_06.png" alt="Poses — Evidencia 03, página 6" loading="lazy" />
                                </div>
                                <figcaption className="carousel-caption">
                                    <span className="experience-tag">Dirección Fotográfica</span>
                                    <h3>Poses</h3>
                                    <p>Sentada, apoyada sobre la mesa, con actitud pensativa y segura.</p>
                                </figcaption>
                            </figure>
                            <figure className="carousel-slide">
                                <div className="carousel-img-wrap">
                                    <img src="/assets/evidencias/ev3/ev3_page_07.png" alt="Vestimenta — Evidencia 03, página 7" loading="lazy" />
                                </div>
                                <figcaption className="carousel-caption">
                                    <span className="experience-tag">Dirección Fotográfica</span>
                                    <h3>Vestimenta</h3>
                                    <p>Indumentaria estructurada con tejidos exclusivos que proyecta sofisticación global.</p>
                                </figcaption>
                            </figure>
                            <figure className="carousel-slide">
                                <div className="carousel-img-wrap">
                                    <img src="/assets/evidencias/ev3/ev3_page_08.png" alt="Iluminación — Evidencia 03, página 8" loading="lazy" />
                                </div>
                                <figcaption className="carousel-caption">
                                    <span className="experience-tag">Dirección Fotográfica</span>
                                    <h3>Iluminación</h3>
                                    <p>Luz natural suave simulando luz de ventana con temperatura cálida.</p>
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                    <div className="carousel-counter" aria-hidden="true"><span className="carousel-current">01</span><span className="carousel-sep">/</span><span className="carousel-total">04</span></div>
                    <button className="carousel-btn carousel-prev" type="button" aria-label="Diapositiva anterior"><span aria-hidden="true">‹</span></button>
                    <button className="carousel-btn carousel-next" type="button" aria-label="Diapositiva siguiente"><span aria-hidden="true">›</span></button>
                    <div className="carousel-dots" role="tablist" aria-label="Navegación del carrusel">
                        <button className="carousel-dot is-active" type="button" role="tab" aria-selected="true" aria-label="Diapositiva 1 de 4"><span className="carousel-dot-num">01</span></button>
                        <button className="carousel-dot" type="button" role="tab" aria-selected="false" aria-label="Diapositiva 2 de 4"><span className="carousel-dot-num">02</span></button>
                        <button className="carousel-dot" type="button" role="tab" aria-selected="false" aria-label="Diapositiva 3 de 4"><span className="carousel-dot-num">03</span></button>
                        <button className="carousel-dot" type="button" role="tab" aria-selected="false" aria-label="Diapositiva 4 de 4"><span className="carousel-dot-num">04</span></button>
                    </div>
                </div>
            </section>

        <div id="key-visual"></div>

                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--ivory)", margin: "3.5rem 0 0.2rem" }}>Galería de Campaña</h3>
                <p style={{ fontSize: "0.92rem", color: "rgba(244,243,243,0.7)", lineHeight: "1.6", fontWeight: "300", marginBottom: "0.6rem" }}>Desliza o usa las flechas para explorar las piezas gráficas oficiales de la campaña.</p>
                {/*  Carrusel 3D Swiper Coverflow: Galería de campaña — Key Visual  */}
                <div className="swiper goldtex-3d-swiper" id="swiper-keyvisual">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <div className="carousel-img-wrap">
                                <img src="/key_visual.png" alt="Key Visual Campaña Goldtex" />
                            </div>
                            <div className="carousel-caption">
                                <span className="experience-tag">Arte Final · Pieza 01</span>
                                <h3>Key Visual: Traje &amp; Movimiento</h3>
                                <p>Fusión de dinamismo, alta sastrería y estampados botánicos en un espacio conceptual que desafía la gravedad y eleva el arte textil.</p>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="carousel-img-wrap">
                                <img src="/key_visual_2.png" alt="Key Visual Interiorismo &amp; Tapicería Goldtex" />
                            </div>
                            <div className="carousel-caption">
                                <span className="experience-tag">Arte Final · Pieza 02</span>
                                <h3>Key Visual: Tapicería &amp; Espacios</h3>
                                <p>Aplicación textil a mobiliario y ambientación contemporánea con tejidos oscuros y jacquards ilustrados.</p>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="carousel-img-wrap">
                                <img src="/imagen_publicidad.jpeg" alt="Goldtex Showroom" />
                            </div>
                            <div className="carousel-caption">
                                <span className="experience-tag">Arte Final · Pieza 03</span>
                                <h3>Showroom Conceptual</h3>
                                <p>Aplicación de los principios de Gestalt y jerarquía visual en la exhibición física de rollos textiles en Gamarra.</p>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="carousel-img-wrap">
                                <img src="/senora.jpeg" alt="Textile Artistry Goldtex" />
                            </div>
                            <div className="carousel-caption">
                                <span className="experience-tag">Arte Final · Pieza 04</span>
                                <h3>Textile Artistry</h3>
                                <p>Diseño de indumentaria estructurado con tejidos exclusivos de Gamarra para proyectar sofisticación global.</p>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="carousel-img-wrap">
                                <img src="/imagen_mockup.png" alt="Mockup Indumentaria Institucional Goldtex" />
                            </div>
                            <div className="carousel-caption">
                                <span className="experience-tag">Arte Final · Pieza 05</span>
                                <h3>Mockup: Indumentaria Corporativa</h3>
                                <p>Uniformes oficiales con polo verde corporativo y logotipo bordado para el equipo de ventas y asesores en Gamarra.</p>
                            </div>
                        </div>
                    </div>
                    {/*  Controles de navegación Swiper 3D  */}
                    <div className="swiper-pagination"></div>
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                </div>
        </section>
    </>
  );
}
