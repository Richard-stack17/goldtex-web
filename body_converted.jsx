<body>

    {/*  Cortina de Entrada Cinemática (Intro Showreel con UNIDOS.mp4)  */}
    <div id="cinematic-curtain">
        <video id="intro-brand-video" autoPlay muted playsInline preload="auto" className="intro-fullscreen-video">
            <source src="/UNIDOS.mp4" type="video/mp4" />
        </video>
        <div className="intro-bottom-bar">
            <div className="curtain-text">Tejiendo Identidad • Goldtex Showroom 3D</div>
            <button id="skip-intro-btn" type="button" data-action="finishIntroCurtain()">Entrar al Showroom ⟶</button>
        </div>
    </div>

    {/*  Capa de Viñeta Cinemática  */}
    <div className="cinematic-vignette"></div>

    {/*  Capa de Orbes de Luz Dinámica (Aurora Mesh)  */}
    <div className="aurora-bg-layer" aria-hidden="true">
        <div className="aurora-orb gold"></div>
        <div className="aurora-orb emerald"></div>
    </div>

    {/*  Lienzo WebGL con Showroom 3D Físico  */}
    <div id="webgl-canvas"></div>

    {/*  Fondo de respaldo si WebGL no está disponible  */}
    <div id="webgl-fallback" aria-hidden="true"></div>

    {/*  Micro-indicador de toque en la tela  */}
    <div className="cloth-touch-indicator" id="cloth-touch-indicator"></div>

    <main>
        {/*  Navegación Superior: Capítulos del Caso de Estudio  */}
        <nav id="main-nav">
            <div className="brand-container">
                <div className="brand-logo-badge">
                    <img src="/logo.png" alt="Goldtex Logo" className="brand-logo-img" />
                </div>
                <div className="brand-logo-text">
                    <h1>Goldtex</h1>
                    <div className="brand-tagline">Telas que inspiran • Gamarra</div>
                </div>
            </div>
            <div className="nav-actions">
                <div className="nav-live-status">
                    <span className="live-dot"></span>
                    <span>Showroom 3D Activo</span>
                </div>
                <a href="#evidencia-1" className="nav-badge"
                    style={{ background: "rgba(8, 62, 53, 0.5)", borderColor: "var(--gold-champagne)" }}>Evidencia 01</a>
                <a href="#evidencia-2" className="nav-badge"
                    style={{ background: "rgba(198, 163, 74, 0.2)", borderColor: "var(--gold-champagne)" }}>Evidencia 02</a>
                <a href="#evidencia-3" className="nav-badge"
                    style={{ background: "rgba(8, 62, 53, 0.4)", borderColor: "var(--gold-brand)" }}>Evidencia 03</a>
                <a href="#equipo" className="nav-badge"
                    style={{ background: "rgba(241, 183, 52, 0.2)", borderColor: "var(--gold-caramel)" }}>Equipo</a>
            </div>
        </nav>

        {/*  Hero Section Inmersivo & Táctil  */}
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

        {/*  Marquee Cinético 1  */}
        <div className="kinetic-marquee">
            <div className="kinetic-track">
                <span>✦ EVIDENCIA 01 • INVESTIGACIÓN DE MERCADO • GOLDTEX GAMARRA • LA DECISIÓN SEGURA • SHOWROOM 3D • TELAS QUE INSPIRAN • </span>
                <span>✦ EVIDENCIA 01 • INVESTIGACIÓN DE MERCADO • GOLDTEX GAMARRA • LA DECISIÓN SEGURA • SHOWROOM 3D • TELAS QUE INSPIRAN • </span>
                <span>✦ EVIDENCIA 01 • INVESTIGACIÓN DE MERCADO • GOLDTEX GAMARRA • LA DECISIÓN SEGURA • SHOWROOM 3D • TELAS QUE INSPIRAN • </span>
                <span>✦ EVIDENCIA 01 • INVESTIGACIÓN DE MERCADO • GOLDTEX GAMARRA • LA DECISIÓN SEGURA • SHOWROOM 3D • TELAS QUE INSPIRAN • </span>
            </div>
        </div>

        {/*  ==================== EVIDENCIA 01 · INVESTIGACIÓN DE MERCADO ====================  */}
        <section className="evidencia-panel" id="evidencia-1">
            <div className="evidencia-header evidencia-video-portal">
                <video className="portal-bg-video" autoPlay muted loop playsInline preload="metadata">
                    <source src="/Fabric_rolls_levitating_in_sunlight_20261014210649.mp4" type="video/mp4" />
                </video>
                <div className="portal-video-overlay"></div>
                <div className="portal-header-content">
                    <span className="evidencia-badge">Evidencia 01 • Showroom & Mercado</span>
                    <h2 className="section-title-xl">Investigación de Mercado</h2>
                </div>
            </div>

            {/*  ¿Quién es Goldtex? / Oferta y propuesta actual  */}
            <section className="section-block" id="quien-es">
                <p className="section-kicker">La Empresa</p>
                <h2 className="section-title-xl">¿Quién es Goldtex?</h2>
                <p className="section-lead">Empresa peruana del sector textil, ubicada en Gamarra, La Victoria, Lima. Venta mayorista y minorista; atención mediante tienda física, canales digitales y WhatsApp Business, con asesoramiento técnico sobre telas y venta flexible por metros y otros volúmenes.</p>
                <div className="campaign-hero">
                    <div>
                        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--ivory)", marginBottom: "1rem" }}>Oferta y propuesta actual</h3>
                        <p style={{ fontSize: "0.95rem", color: "rgba(244,243,243,0.8)", lineHeight: "1.7", fontWeight: "300" }}>Productos destacados con especificaciones técnicas, venta por metros, atención vía WhatsApp y despacho a Lima y provincias. La siguiente ficha resume las modalidades de compra confirmadas en la investigación de mercado:</p>
                    </div>
                    <div className="campaign-visual-frame reveal-card">
                        <img src="/assets/evidencias/ev1/ev1_page_03.png"
                             alt="Oferta y propuesta actual de Goldtex — Evidencia 01, página 3"
                             loading="lazy" />
                        <div className="campaign-caption">Oferta y propuesta actual · Evidencia 01 · Pág. 3 del informe de investigación de mercados.</div>
                    </div>
                </div>
                            <div className="services-grid">
                <div className="service-card reveal-card" data-tilt data-tilt-max="5">
                    <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.5 17.5 17.5 2.5l4 4L6.5 21.5z"/><path d="m8 13 1.5 1.5"/><path d="m11 10 1.5 1.5"/><path d="m14 7 1.5 1.5"/></svg></div>
                    <h3>Venta por Metros</h3>
                    <p>Compra exacta para muestras, pequeñas colecciones y negocios en crecimiento.</p>
                </div>
                <div className="service-card reveal-card" data-tilt data-tilt-max="5">
                    <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m4.5 19.5 7.5-7.5"/><circle cx="16" cy="7.5" r="3.5"/><path d="M13.5 10.5c-1.2 2.2-3.4 4.2-6.5 5.5"/></svg></div>
                    <h3>Fardos & Rollos</h3>
                    <p>Venta por fardo/rollo cerrado y cuarto de docena para producción continua.</p>
                </div>
                <div className="service-card reveal-card" data-tilt data-tilt-max="5">
                    <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg></div>
                    <h3>WhatsApp Business</h3>
                    <p>Cotización, asesoramiento técnico y seguimiento directo de tu pedido.</p>
                </div>
                <div className="service-card reveal-card" data-tilt data-tilt-max="5">
                    <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1.5 7.5h13v9h-13z"/><path d="M14.5 10.5h3.6l3 3v3h-6.6z"/><circle cx="6" cy="18.5" r="1.8"/><circle cx="17.5" cy="18.5" r="1.8"/></svg></div>
                    <h3>Despacho a Todo el Perú</h3>
                    <p>Ruta express a Lima y envíos a provincias: Arequipa, Trujillo, Chiclayo y más.</p>
                </div>
            </div>
            </section>

            {/*  Público Objetivo Identificado  */}
            <section className="section-block" id="publico-objetivo">
                <p className="section-kicker">Segmentación</p>
                <h2 className="section-title-xl">Público Objetivo Identificado</h2>
                <p className="section-lead">Dos segmentos clave con necesidades distintas: el comprador por volumen y el emprendedor por metros.</p>
                <div className="reasons-grid">
                    <div className="reason-card reveal-card" data-tilt data-tilt-max="5">
                        <div className="reason-num">A</div>
                        <h3>Cliente Mayorista</h3>
                        <p><strong>20–45 años.</strong> Dueños de talleres. Compra por volumen y busca costo-beneficio en cada fardo y rollo cerrado.</p>
                    </div>
                    <div className="reason-card reveal-card" data-tilt data-tilt-max="5">
                        <div className="reason-num">B</div>
                        <h3>Emprendedor (Minorista)</h3>
                        <p><strong>20–35 años.</strong> Diseñadores y marcas emergentes. Compra telas por metros y busca rapidez e información clara.</p>
                    </div>
                </div>
                <div className="campaign-visual-frame reveal-card">
                    <img src="/assets/evidencias/ev1/ev1_page_04.png"
                         alt="Público objetivo identificado — Evidencia 01, página 4"
                         loading="lazy" />
                    <div className="campaign-caption">Público objetivo identificado · Evidencia 01 · Pág. 4 del informe de investigación de mercados.</div>
                </div>
            </section>

            {/*  Focus Group y Principales Problemas  */}
            <section className="section-block" id="focus-group">
                <p className="section-kicker">Método de Investigación</p>
                <h2 className="section-title-xl">Focus Group & Principales Problemas</h2>
                <p className="section-lead">Realizamos encuestas a clientes mediante Google Forms, focus group e investigación a profundidad sobre Goldtex (Facebook, Veritrade y catálogo físico).</p>

                <div className="campaign-hero">
                    <div>
                        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--ivory)", marginBottom: "1.2rem" }}>Simulación — Interacción Vendedor · Cliente</h3>
                        <div className="psych-card" style={{ borderLeft: "4px solid var(--gold-caramel)", marginBottom: "1.4rem" }} data-tilt data-tilt-max="5">
                            <p style={{ fontSize: "0.9rem", lineHeight: "1.7", color: "rgba(244,243,243,0.85)" }}><strong style={{ color: "var(--gold-caramel)" }}>Cliente (Participante del Focus Group):</strong> "Hola, vi su catálogo web. Quisiera cotizar 15 metros de Drill Industrial color azul marino y 10 metros de Popelina blanca para unas muestras de uniformes corporativos. ¿Tienen stock y cuánto sería el costo?"</p>
                        </div>
                        <div className="psych-card" style={{ borderLeft: "4px solid #083E35", marginBottom: "1.4rem" }} data-tilt data-tilt-max="5">
                            <p style={{ fontSize: "0.9rem", lineHeight: "1.7", color: "rgba(244,243,243,0.85)" }}><strong style={{ color: "#4ade80" }}>Vendedor (GOLDTEX):</strong> "¡Hola! Bienvenido a GOLDTEX. Sí, contamos con stock inmediato de ambas telas en la Galería Perla y Jr. Humboldt. Al ser una compra por metros variados, el Drill Industrial te sale a S/ 12.50 el metro y la Popelina a S/ 8.50. Nuestro Drill tiene un ancho exacto de 1.50 metros, lo que te permitirá optimizar tus cortes sin desperdiciar material. ¿Te confirmo el pedido para enviarte el código QR de Yape/Plin o transferencia BCP?"</p>
                        </div>
                        <div className="psych-card" style={{ borderLeft: "4px solid var(--gold-caramel)", marginBottom: "1.4rem" }} data-tilt data-tilt-max="5">
                            <p style={{ fontSize: "0.9rem", lineHeight: "1.7", color: "rgba(244,243,243,0.85)" }}><strong style={{ color: "var(--gold-caramel)" }}>Cliente (Participante):</strong> "Bien, el ancho de 1.50 m me da perfecto para los delantales. Hago el pago por Yape ahora mismo. ¿Me lo pueden enviar hoy por la tarde a mi taller en Los Olivos o despacharlo a la agencia?"</p>
                        </div>
                        <div className="psych-card" style={{ borderLeft: "4px solid #083E35" }} data-tilt data-tilt-max="5">
                            <p style={{ fontSize: "0.9rem", lineHeight: "1.7", color: "rgba(244,243,243,0.85)" }}><strong style={{ color: "#4ade80" }}>Vendedor (GOLDTEX):</strong> "¡Perfecto! Una vez recibido tu comprobante de pago, pasamos el pedido al área de corte y embalaje. Al ser cliente de Lima, tu pedido sale en nuestra ruta de reparto express y llega a tu taller en menos de 24 horas. ¡Gracias por confiar en nosotros para tu emprendimiento!"</p>
                        </div>
                    </div>
                    <div className="campaign-visual-frame reveal-card">
                        <img src="/assets/evidencias/ev1/ev1_page_06.png"
                             alt="Focus group — Evidencia 01, página 6"
                             loading="lazy" />
                        <div className="campaign-caption">Focus group · Evidencia 01 · Pág. 6 del informe de investigación de mercados.</div>
                    </div>
                </div>

                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--ivory)", margin: "3.5rem 0 1rem" }}>Principales Problemas Detectados</h3>
                <div className="services-grid">
                    <div className="service-card reveal-card" data-tilt data-tilt-max="5">
                        <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="13.5" r="7.5"/><path d="M12 10v3.5l2.5 1.5"/><path d="M9.5 2.5h5"/></svg></div>
                        <h3>Pérdida de Tiempo</h3>
                        <p>Buscando y cotizando en Gamarra, local por local.</p>
                    </div>
                    <div className="service-card reveal-card" data-tilt data-tilt-max="5">
                        <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="4" r="1.6"/><path d="M12 5.6v4"/><path d="m9 21 3-10 3 10"/><path d="M10.2 16h3.6"/></svg></div>
                        <h3>Información Técnica</h3>
                        <p>Falta de datos claros para calcular correctamente el material.</p>
                    </div>
                    <div className="service-card reveal-card" data-tilt data-tilt-max="5">
                        <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M11 18.5h2"/></svg></div>
                        <h3>Atención Digital</h3>
                        <p>Necesidad de atención digital rápida y directa.</p>
                    </div>
                    <div className="service-card reveal-card" data-tilt data-tilt-max="5">
                        <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m4.5 19.5 7.5-7.5"/><circle cx="16" cy="7.5" r="3.5"/><path d="M13.5 10.5c-1.2 2.2-3.4 4.2-6.5 5.5"/></svg></div>
                        <h3>Miedo al Rendimiento</h3>
                        <p>Miedo a comprar una tela que no cumpla con el rendimiento esperado.</p>
                    </div>
                </div>

                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--ivory)", margin: "3.5rem 0 1rem" }}>Insights Clave de la Investigación</h3>
                <div className="axes-row">
                    <div className="axis-card reveal-card">
                        <h4>01 · Confianza Técnica</h4>
                        <p>La información técnica genera confianza: el cliente quiere conocer las características de la tela antes de comprar.</p>
                    </div>
                    <div className="axis-card reveal-card">
                        <h4>02 · Cierre por WhatsApp</h4>
                        <p>WhatsApp es clave para el cierre: el canal permite una interacción rápida y directa.</p>
                    </div>
                    <div className="axis-card reveal-card">
                        <h4>03 · Venta por Metros</h4>
                        <p>La compra por metros y precios accesibles favorecen a emprendedores, especialmente para pequeñas colecciones y negocios en crecimiento.</p>
                    </div>
                </div>
            </section>

            {/*  El Brief Estratégico  */}
            <section className="section-block" id="brief-estrategico">
                <p className="section-kicker">El Brief Estratégico</p>
                <h2 className="section-title-xl">"De la idea a tu emprendimiento"</h2>
                <div className="campaign-hero">
                    <div>
                        <div className="psych-card" style={{ borderLeft: "4px solid var(--gold-caramel)", marginBottom: "1.4rem" }} data-tilt data-tilt-max="5">
                            <h4 style={{ fontFamily: "var(--font-display)", color: "var(--gold-caramel)", marginBottom: "0.4rem" }}>Proyecto</h4>
                            <p style={{ fontSize: "0.9rem", lineHeight: "1.65" }}>"De la idea a tu emprendimiento"</p>
                        </div>
                        <div className="psych-card" style={{ borderLeft: "4px solid var(--gold-caramel)", marginBottom: "1.4rem" }} data-tilt data-tilt-max="5">
                            <h4 style={{ fontFamily: "var(--font-display)", color: "var(--gold-caramel)", marginBottom: "0.4rem" }}>Objetivo</h4>
                            <p style={{ fontSize: "0.9rem", lineHeight: "1.65" }}>Incrementar en 25% las consultas calificadas vía WhatsApp en 3 meses. Mejora en la identidad visual.</p>
                        </div>
                        <div className="psych-card" style={{ borderLeft: "4px solid var(--gold-caramel)", marginBottom: "1.4rem" }} data-tilt data-tilt-max="5">
                            <h4 style={{ fontFamily: "var(--font-display)", color: "var(--gold-caramel)", marginBottom: "0.4rem" }}>Público</h4>
                            <p style={{ fontSize: "0.9rem", lineHeight: "1.65" }}>Diseñadores, confeccionistas y emprendedores textiles.</p>
                        </div>
                        <div className="psych-card" style={{ borderLeft: "4px solid var(--gold-caramel)", marginBottom: "1.4rem" }} data-tilt data-tilt-max="5">
                            <h4 style={{ fontFamily: "var(--font-display)", color: "var(--gold-caramel)", marginBottom: "0.4rem" }}>Propuesta</h4>
                            <p style={{ fontSize: "0.9rem", lineHeight: "1.65" }}>Mejora de catálogo digital + asesoramiento técnico + atención rápida + identidad visual, consolidando una imagen sólida.</p>
                        </div>
                        <div className="psych-card" style={{ borderLeft: "4px solid var(--gold-caramel)" }} data-tilt data-tilt-max="5">
                            <h4 style={{ fontFamily: "var(--font-display)", color: "var(--gold-caramel)", marginBottom: "0.4rem" }}>Mensaje Clave</h4>
                            <p style={{ fontSize: "0.9rem", lineHeight: "1.65" }}>"De la idea a tu emprendimiento: tenemos los insumos exactos para que transformes tu creatividad en un negocio real."</p>
                        </div>
                        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--ivory)", margin: "3rem 0 1rem" }}>Razón para Creer: "Más que una tienda, un aliado"</h3>
                                    <div className="reasons-grid">
                <div className="reason-card reveal-card" data-tilt data-tilt-max="5">
                    <div className="reason-num">01</div>
                    <h3>Asesoramiento Técnico</h3>
                    <p>Detallado sobre cada tela: composición, gramaje, ancho y uso recomendado antes de comprar.</p>
                </div>
                <div className="reason-card reveal-card" data-tilt data-tilt-max="5">
                    <div className="reason-num">02</div>
                    <h3>Catálogo Digital Claro</h3>
                    <p>Especificaciones y usos de cada producto, sin letras pequeñas ni sorpresas.</p>
                </div>
                <div className="reason-card reveal-card" data-tilt data-tilt-max="5">
                    <div className="reason-num">03</div>
                    <h3>Atención Directa</h3>
                    <p>Respuesta rápida y personalizada vía WhatsApp Business para cerrar tu cotización.</p>
                </div>
                <div className="reason-card reveal-card" data-tilt data-tilt-max="5">
                    <div className="reason-num">04</div>
                    <h3>Stock Inmediato</h3>
                    <p>Amplio stock físico en Gamarra con reposición constante de las telas con mayor demanda.</p>
                </div>
                <div className="reason-card reveal-card" data-tilt data-tilt-max="5">
                    <div className="reason-num">05</div>
                    <h3>Despacho Express</h3>
                    <p>Envíos a Lima y provincias para que tu pedido llegue a tiempo a tu taller.</p>
                </div>
            </div>
                    </div>
                    <div className="campaign-visual-frame reveal-card">
                        <img src="/assets/evidencias/ev1/ev1_page_09.png"
                             alt="Brief estratégico — Evidencia 01, página 9"
                             loading="lazy" />
                        <div className="campaign-caption">El brief estratégico · Evidencia 01 · Pág. 9 del informe de investigación de mercados.</div>
                    </div>
                </div>
            </section>

        {/*  ============ HISTORIA GOLDTEX: TIMELINE REAL (2005–2026) ============  */}
        <section className="section-block" id="historia">
            <p className="section-kicker">Trayectoria • Gamarra, Lima</p>
            <h2 className="section-title-xl">Casi dos décadas de textil peruano</h2>
            <p className="section-lead">
                Desde su fundación en Gamarra hasta la campaña nacional, Goldtex ha crecido
                con los confeccionistas y emprendedores del Perú.
            </p>

            <div className="timeline-track">
                <div className="timeline-node reveal-card">
                    <div className="timeline-year">2005</div>
                    <div className="timeline-name">Fundación</div>
                    <p className="timeline-desc">Nace Goldtex en Gamarra, Lima, como tienda de telas importadas.</p>
                </div>
                <div className="timeline-node reveal-card">
                    <div className="timeline-year">2008</div>
                    <div className="timeline-name">Importación Global</div>
                    <p className="timeline-desc">Diversificación de la oferta con telas de Asia y Europa.</p>
                </div>
                <div className="timeline-node reveal-card">
                    <div className="timeline-year">2010</div>
                    <div className="timeline-name">Expansión Nacional</div>
                    <p className="timeline-desc">Llegada a provincias clave: Arequipa, Trujillo y Chiclayo.</p>
                </div>
                <div className="timeline-node reveal-card">
                    <div className="timeline-year">2015</div>
                    <div className="timeline-name">Identidad de Marca</div>
                    <p className="timeline-desc">Creación del lema "Telas Que Inspiran" y consolidación de la imagen corporativa.</p>
                </div>
                <div className="timeline-node reveal-card">
                    <div className="timeline-year">2020</div>
                    <div className="timeline-name">Transformación Digital</div>
                    <p className="timeline-desc">Implementación de venta por canales digitales y atención personalizada por WhatsApp Business.</p>
                </div>
                <div className="timeline-node reveal-card">
                    <div className="timeline-year">2022</div>
                    <div className="timeline-name">Asesoramiento Técnico</div>
                    <p className="timeline-desc">Consultoría especializada para emprendedores sobre especificaciones de telas y usos.</p>
                </div>
                <div className="timeline-node reveal-card">
                    <div className="timeline-year">2024</div>
                    <div className="timeline-name">Producción Local</div>
                    <p className="timeline-desc">Alianza estratégica con talleres textiles peruanos para producción propia de telas básicas.</p>
                </div>
                <div className="timeline-node reveal-card">
                    <div className="timeline-year">2026</div>
                    <div className="timeline-name">Campaña Nacional</div>
                    <p className="timeline-desc">Iniciativas de Emprendimiento y lanzamiento de la línea exclusiva "Emprende Fácil".</p>
                </div>
            </div>
        </section>

        {/*  Benchmarking Cromático: El radar de competencia de Gamarra  */}
        <section className="benchmarking-section" id="benchmarking">
            <div className="section-header" style={{ textAlign: "center", marginBottom: "4rem" }}>
                <p>Análisis Situacional & Sustentación Visual • Indicador de Logro 1</p>
                <h2>Benchmarking Cromático</h2>
                <p style={{ fontSize: "0.95rem", color: "rgba(242, 235, 221, 0.7)", maxWidth: "760px", margin: "0.6rem auto 0", fontWeight: "300", lineHeight: "1.6" }}>El radar de competencia de Gamarra: mapeo del círculo cromático de los competidores directos del emporio textil y el cuadrante diferenciado de Goldtex.</p>
            </div>
            <div className="benchmarking-grid" style={{ gridTemplateColumns: "1fr" }}>
                {/*  Radar / Círculo Cromático de Competencia de Gamarra  */}
                <div className="chromatic-radar-card reveal-card">
                    <div className="experience-tag">Análisis del Entorno Textil</div>
                    <h3
                        style={{ fontFamily: "'Cinzel', serif", fontSize: "1.8rem", color: "var(--ivory)", marginBottom: "0.6rem" }}>
                        Mapeo en Círculo Cromático
                    </h3>
                    <p
                        style={{ fontSize: "0.92rem", color: "rgba(242, 235, 221, 0.75)", lineHeight: "1.6", fontWeight: "300" }}>
                        Visualización de la competencia directa en Gamarra. Evidencia la saturación de tonos cálidos y
                        azules estándar, validando el posicionamiento diferenciado de Goldtex en el cuadrante del
                        <strong style={{ color: "#4ade80" }}>Verde Profundo</strong> y acentos en <strong
                            style={{ color: "#F1B734" }}>Dorado Imperial</strong>.
                    </p>

                    {/*  Gráfico Oficial del Círculo Cromático con Todos los Logos del Mercado de Gamarra  */}
                    <div className="chromatic-wheel-wrapper">
                        <img src="/circulo_cromatico_competencia.jpg"
                            alt="Mapeo Cromático de Competencia Textil en Gamarra" className="chromatic-wheel-img" />
                    </div>

                    {/*  Matriz de Competidores Directos con Logos Oficiales Extraídos  */}
                    <div className="competitor-matrix-list">
                        {/*  1. Textil Fiorela's  */}
                        <div className="competitor-badge-card">
                            <div className="comp-logo-thumb" style={{ background: "#ffffff" }}>
                                <img src="/logos_competencia/logo_fiorelas.png" alt="Textil Fiorela's Logo" />
                            </div>
                            <div className="comp-info">
                                <h5>Textil Fiorela's</h5>
                                <span style={{ color: "#ff2a8d" }}>Magenta • (#FF007F)</span>
                            </div>
                        </div>

                        {/*  2. Nabila  */}
                        <div className="competitor-badge-card">
                            <div className="comp-logo-thumb" style={{ background: "#ffffff" }}>
                                <img src="/logos_competencia/logo_nabila.png" alt="Nabila Logo" />
                            </div>
                            <div className="comp-info">
                                <h5>Nabila</h5>
                                <span style={{ color: "#ff4d4d" }}>Rojo / Coral • (#E63946)</span>
                            </div>
                        </div>

                        {/*  3. Grupo Textil Casas  */}
                        <div className="competitor-badge-card">
                            <div className="comp-logo-thumb" style={{ background: "#ffffff" }}>
                                <img src="/logos_competencia/logo_casas.png" alt="Grupo Textil Casas Logo" />
                            </div>
                            <div className="comp-info">
                                <h5>Grupo Textil Casas</h5>
                                <span style={{ color: "#ff7700" }}>Naranja • (#FF6B00)</span>
                            </div>
                        </div>

                        {/*  4. TB S.A.C.  */}
                        <div className="competitor-badge-card">
                            <div className="comp-logo-thumb" style={{ background: "#ffffff" }}>
                                <img src="/logos_competencia/logo_tb_sac.png" alt="TB S.A.C. Logo" />
                            </div>
                            <div className="comp-info">
                                <h5>TB S.A.C.</h5>
                                <span style={{ color: "#d4af37" }}>Dorado Cálido • (#D4AF37)</span>
                            </div>
                        </div>

                        {/*  5. Industria Textil Perú  */}
                        <div className="competitor-badge-card">
                            <div className="comp-logo-thumb" style={{ background: "#ffffff" }}>
                                <img src="/logos_competencia/logo_industria_textil_peru.png"
                                    alt="Industria Textil Perú Logo" />
                            </div>
                            <div className="comp-info">
                                <h5>Industria Textil Perú</h5>
                                <span style={{ color: "#a855f7" }}>Morado • (#6B21A8)</span>
                            </div>
                        </div>

                        {/*  6. Multitelas  */}
                        <div className="competitor-badge-card">
                            <div className="comp-logo-thumb" style={{ background: "#ffffff" }}>
                                <img src="/logos_competencia/logo_multitelas.png" alt="Multitelas Logo" />
                            </div>
                            <div className="comp-info">
                                <h5>Multitelas</h5>
                                <span style={{ color: "#3b82f6" }}>Azul / Índigo • (#2563EB)</span>
                            </div>
                        </div>

                        {/*  7. Tejidos San Jacinto  */}
                        <div className="competitor-badge-card">
                            <div className="comp-logo-thumb" style={{ background: "#ffffff" }}>
                                <img src="/logos_competencia/logo_san_jacinto.png" alt="Tejidos San Jacinto Logo" />
                            </div>
                            <div className="comp-info">
                                <h5>Tejidos San Jacinto S.A.</h5>
                                <span style={{ color: "#0284c7" }}>Azul Celeste • (#0284C7)</span>
                            </div>
                        </div>

                        {/*  8. Dini Textil  */}
                        <div className="competitor-badge-card">
                            <div className="comp-logo-thumb" style={{ background: "#ffffff" }}>
                                <img src="/logos_competencia/logo_dini.png" alt="Dini Textil Logo" />
                            </div>
                            <div className="comp-info">
                                <h5>Dini Textil</h5>
                                <span style={{ color: "#1e3a8a" }}>Azul Marino Profundo</span>
                            </div>
                        </div>

                        {/*  9. Badge Destacado de Goldtex con Logo Oficial  */}
                        <div className="competitor-badge-card goldtex-highlight">
                            <div className="comp-logo-thumb" style={{ background: "#ffffff", width: "62px", height: "42px" }}>
                                <img src="/logos_competencia/logo_goldtex.png" alt="Goldtex Logo" />
                            </div>
                            <div className="comp-info"
                                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                <div>
                                    <h5
                                        style={{ color: "var(--gold-champagne)", fontWeight: "700", fontSize: "0.98rem", fontFamily: "var(--font-display)" }}>
                                        GOLDTEX • La Decisión Segura</h5>
                                    <span style={{ color: "#4ade80", fontSize: "0.78rem" }}>Verde Institucional [RGB: 0, 62,
                                        51] + Dorado/Caramelo [RGB: 228, 195, 58]</span>
                                </div>
                                <span
                                    style={{ background: "rgba(228,195,58,0.25)", border: "1px solid var(--gold-caramel)", padding: "5px 12px", borderRadius: "12px", fontSize: "0.72rem", color: "var(--gold-caramel)", fontWeight: "700", letterSpacing: "0.05em" }}>DIFERENCIADOR</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </section>

        {/*  Marquee Cinético 2  */}
        <div className="kinetic-marquee" style={{ transform: "rotate(1.2deg)", marginTop: "5rem" }}>
            <div className="kinetic-track">
                <span>✦ EVIDENCIA 02 • ESTRATEGIA DE CAMPAÑA • LA DECISIÓN SEGURA • ALTA SASTRERÍA • CALIDAD GARANTIZADA • GAMARRA LIMA • </span>
                <span>✦ EVIDENCIA 02 • ESTRATEGIA DE CAMPAÑA • LA DECISIÓN SEGURA • ALTA SASTRERÍA • CALIDAD GARANTIZADA • GAMARRA LIMA • </span>
                <span>✦ EVIDENCIA 02 • ESTRATEGIA DE CAMPAÑA • LA DECISIÓN SEGURA • ALTA SASTRERÍA • CALIDAD GARANTIZADA • GAMARRA LIMA • </span>
                <span>✦ EVIDENCIA 02 • ESTRATEGIA DE CAMPAÑA • LA DECISIÓN SEGURA • ALTA SASTRERÍA • CALIDAD GARANTIZADA • GAMARRA LIMA • </span>
            </div>
        </div>

        {/*  ==================== EVIDENCIA 02 · ESTRATEGIA DE CAMPAÑA ====================  */}
        <section className="evidencia-panel" id="evidencia-2">
            <div className="evidencia-header evidencia-video-portal">
                <video className="portal-bg-video" autoPlay muted loop playsInline preload="metadata">
                    <source src="/Tailor_cutting_emerald_green_satin_20261014210733.mp4" type="video/mp4" />
                </video>
                <div className="portal-video-overlay"></div>
                <div className="portal-header-content">
                    <span className="evidencia-badge">Evidencia 02 • Precisión & Sastrería</span>
                    <h2 className="section-title-xl">Estrategia "La Decisión Segura"</h2>
                </div>
            </div>

            {/*  Concepto Creativo de Campaña  */}
            <section className="section-block" id="concepto-creativo">
            <p className="section-kicker">Campaña Publicitaria • Corporación Goldtex S.A.C.</p>
            <h2 className="section-title-xl">El Concepto Creativo</h2>
            <p className="section-lead">
                "Todo empezó con una buena tela. Todo crece con una decisión segura."
                La base firme de tus creaciones.
            </p>

                <p className="section-lead" style={{ marginTop: "1.4rem" }}>Justificación gráfica y conceptual: unión sin fisuras que fusiona el beneficio funcional de Goldtex (stock mayorista garantizado, fardos continuos en Jr. Gamarra) con el anhelo emocional de Pedro (certeza, prestigio y cero errores). Eslogan rector: "Todo empezó con una buena tela. Todo crece con una decisión segura."</p>

                <div className="campaign-visual-frame reveal-card">
                    <img src="/extracted/pptx_media/image12.png"
                         alt="Portada de campaña La Decisión Segura — Corporación Goldtex S.A.C."
                         loading="lazy" />
                    <div className="campaign-caption">
                        Campaña "La Decisión Segura" — Estrategia integral de comunicación gráfica y abastecimiento continuo para erradicar el quiebre de stock en talleres textiles.
                    </div>
                </div>
            </section>

            {/*  Buyer Persona: Pedro, el confeccionista  */}
            <section className="section-block" id="buyer-persona">
                <p className="section-kicker">Buyer Persona</p>
                <h2 className="section-title-xl">"Pedro, el confeccionista"</h2>
                <p className="section-lead">34 años, dueño y administrador de un taller de confección textil (independiente) con 4 años de experiencia operando activamente en el mercado de confecciones. Adquiere insumos por fardos y rollos cerrados para reducir el costo por prenda fabricada y busca un balance riguroso entre calidad de fibra, resistencia del tejido y precio por metro.</p>
                <p className="section-lead"><strong style={{ color: "var(--gold-caramel)" }}>El gran problema / quiebre:</strong> frustración crítica ante el desabastecimiento o quiebre de stock inesperado en tiendas mayoristas cuando ya tiene contratos de entrega comprometidos con sus clientes.</p>
                            {/*  Buyer Persona: Pedro  */}
            <div className="persona-card reveal-card" data-tilt data-tilt-max="5">
                <img src="/extracted/pptx_media/image13.png"
                     alt="Buyer persona Pedro, el confeccionista — dueño de taller de confección"
                     loading="lazy" />
                <div>
                    <p className="section-kicker" style={{ marginBottom: "0.6rem" }}>Buyer Persona</p>
                    <p className="persona-quote">"Si la tela falla o se retrasa, pierdo a mis clientes y mi reputación."</p>
                    <p className="persona-meta">
                        <strong style={{ color: "var(--gold-caramel)" }}>Pedro, el confeccionista</strong> — 34 años, dueño y
                        administrador de un taller de confección textil con 4 años de experiencia. Adquiere insumos por
                        fardos y rollos cerrados para reducir el costo por prenda fabricada y busca un balance riguroso
                        entre calidad de fibra, resistencia del tejido y precio por metro.
                    </p>
                </div>
            </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--ivory)", margin: "3.5rem 0 1rem" }}>Mapa de Empatía del Cliente Objetivo</h3>
                <div className="services-grid">
                    <div className="service-card reveal-card" data-tilt data-tilt-max="5">
                        <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9.5 18h5"/><path d="M10.5 21h3"/><path d="M12 2.5a6 6 0 0 0-3.7 10.7c.8.7 1.2 1.4 1.2 2.3h5c0-.9.4-1.6 1.2-2.3A6 6 0 0 0 12 2.5z"/></svg></div>
                        <h3>¿Qué Piensa y Siente?</h3>
                        <p>"Si la tela falla o se retrasa, pierdo a mis clientes y mi reputación." Desea crecer, comprar maquinaria moderna y consolidar su marca de ropa.</p>
                    </div>
                    <div className="service-card reveal-card" data-tilt data-tilt-max="5">
                        <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 12s3.6-6.8 10-6.8S22 12 22 12s-3.6 6.8-10 6.8S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg></div>
                        <h3>¿Qué Ve y Experimenta?</h3>
                        <p>Alta informalidad y promesas falsas de entrega en el mercado. Variación de calidad entre diferentes partidas de tela en proveedores informales.</p>
                    </div>
                    <div className="service-card reveal-card" data-tilt data-tilt-max="5">
                        <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 11.5 18-5v11L3 14.5v-3z"/><path d="M11.6 17.2a3 3 0 1 1-5.8-1.6"/></svg></div>
                        <h3>¿Qué Hace y Dice?</h3>
                        <p>Recorre Jr. Gamarra buscando muestras, comparando gramajes y precios. Exige garantías de stock continuo antes de firmar pedidos de confección.</p>
                    </div>
                    <div className="service-card reveal-card" data-tilt data-tilt-max="5">
                        <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13 2.5 4.5 13.5H11l-1 8 8.5-11H12l1-8z"/></svg></div>
                        <h3>Frustraciones vs. Necesidades</h3>
                        <p><strong>Dolor:</strong> Máquinas detenidas por falta de rollos de tela. <strong>Necesidad:</strong> Un proveedor estratégico confiable que garantice stock y despacho inmediato.</p>
                    </div>
                </div>
            </section>

            {/*  Ejes Creativos  */}
            <section className="section-block" id="ejes-creativos">
                <p className="section-kicker">Técnica Creativa 1 · Lluvia de Ideas y Ejes</p>
                <h2 className="section-title-xl">Los Ejes Creativos</h2>
                <p className="section-lead">Seguridad, Calidad y Comodidad: los tres pilares que erradican el quiebre de stock en talleres textiles y fidelizan al confeccionista.</p>
                                    <div className="axes-row">
                        <div className="axis-card reveal-card">
                            <h4>01 · Seguridad</h4>
                            <p>Cero incertidumbre: garantía total de metraje, stock reservado para clientes recurrentes y alertas prioritarias de nuevas partidas de fardos.</p>
                        </div>
                        <div className="axis-card reveal-card">
                            <h4>02 · Calidad</h4>
                            <p>Consistencia de producto: fichas técnicas de encogimiento, solidez de color y gramaje estandarizado, con asesoría especializada en tienda.</p>
                        </div>
                        <div className="axis-card reveal-card">
                            <h4>03 · Comodidad</h4>
                            <p>Valor agregado: salón VIP / showroom confortable para compras mayoristas ágiles y merchandising identitario del confeccionista.</p>
                        </div>
                    </div>
            </section>

            {/*  Matriz de Metáforas  */}
            <section className="section-block" id="matriz-metafiras">
                <p className="section-kicker">Técnica Creativa 2 · Matriz de Metáforas</p>
                <h2 className="section-title-xl">Matriz de Metáforas</h2>
                <p className="section-lead">Tres símbolos del oficio textil que traducen la promesa de marca en imágenes memorables para la campaña.</p>
                <div className="reasons-grid">
                    <div className="reason-card reveal-card" data-tilt data-tilt-max="5">
                        <div className="reason-num">01</div>
                        <h3>El Rollo de Tela</h3>
                        <p>La continuidad garantizada: un rollo completo es la promesa de que el stock nunca se quiebra a mitad de producción. La base firme de cada creación.</p>
                    </div>
                    <div className="reason-card reveal-card" data-tilt data-tilt-max="5">
                        <div className="reason-num">02</div>
                        <h3>La Puntada</h3>
                        <p>La calidad que se ve y se siente: cada puntada une fibra y confianza. Consistencia de gramaje, solidez de color y encogimiento controlado.</p>
                    </div>
                    <div className="reason-card reveal-card" data-tilt data-tilt-max="5">
                        <div className="reason-num">03</div>
                        <h3>La Boina de Taller</h3>
                        <p>La "Boina del Confeccionista Goldtex": emblema de oficio y distinción para clientes frecuentes por compras de volumen. Pertenencia al club mayorista.</p>
                    </div>
                </div>
            </section>

            {/*  Ecosistema y Aplicación de Piezas Gráficas  */}
            <section className="section-block" id="piezas-graficas">
                <p className="section-kicker">Ecosistema de Marca</p>
                <h2 className="section-title-xl">Aplicación de Piezas Gráficas & Kit B2B</h2>
                <p className="section-lead">La campaña vive en la tienda física, en el merchandising de pertenencia y en el canal digital de asistencia.</p>
                <div className="services-grid">
                    <div className="service-card reveal-card" data-tilt data-tilt-max="5">
                        <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3.5 9 5 3.5h13L20.5 9"/><path d="M3.5 9c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0"/><path d="M3.5 9h17v11h-17z"/><path d="M9.5 20v-5h5v5"/></svg></div>
                        <h3>1. Fachada & Punto de Venta</h3>
                        <p>Señalética clara de despacho rápido y zona de atención mayorista por fardos en Jr. Gamarra. Expositores táctiles con muestras reales de tejidos de punto y certificaciones de calidad.</p>
                    </div>
                    <div className="service-card reveal-card" data-tilt data-tilt-max="5">
                        <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2.5 19 5.5v5.2c0 4.8-3.2 7.9-7 9.3-3.8-1.4-7-4.5-7-9.3V5.5z"/><path d="m9 11.8 2.1 2.1 4-4.2"/></svg></div>
                        <h3>2. Kit de Pertenencia B2B</h3>
                        <p>Entrega de la "Boina Goldtex" a clientes frecuentes por compras de volumen, junto a una cinta métrica profesional de sastre y catálogo físico de muestras de tela.</p>
                    </div>
                    <div className="service-card reveal-card" data-tilt data-tilt-max="5">
                        <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg></div>
                        <h3>3. Canal Digital & Chat de Asistencia</h3>
                        <p>Canal de mensajería directa con catálogo de stock en tiempo real y alertas de arribo de fardos para clientes recurrentes.</p>
                    </div>
                </div>
            </section>
        </section>

        {/*  Marquee Cinético 3  */}
        <div className="kinetic-marquee" style={{ transform: "rotate(-1.4deg)", marginTop: "5rem" }}>
            <div className="kinetic-track">
                <span>✦ EVIDENCIA 03 • DIRECCIÓN DE ARTE & KEY VISUAL • HILOS DE ORO & SEDA ESMERALDA • IDENTIDAD OFICIAL • TELAS QUE INSPIRAN • </span>
                <span>✦ EVIDENCIA 03 • DIRECCIÓN DE ARTE & KEY VISUAL • HILOS DE ORO & SEDA ESMERALDA • IDENTIDAD OFICIAL • TELAS QUE INSPIRAN • </span>
                <span>✦ EVIDENCIA 03 • DIRECCIÓN DE ARTE & KEY VISUAL • HILOS DE ORO & SEDA ESMERALDA • IDENTIDAD OFICIAL • TELAS QUE INSPIRAN • </span>
                <span>✦ EVIDENCIA 03 • DIRECCIÓN DE ARTE & KEY VISUAL • HILOS DE ORO & SEDA ESMERALDA • IDENTIDAD OFICIAL • TELAS QUE INSPIRAN • </span>
            </div>
        </div>

        {/*  ==================== EVIDENCIA 03 · DIRECCIÓN DE ARTE ====================  */}
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

            {/*  Render Final: Boceto vs Key Visual (La Decisión Segura)  */}
        {/*  Sección 1: Key Visual & Campaña Oficial (Imágenes locales)  */}
        <section id="key-visual">
            <div className="section-header">
                <p>Estrategia Visual & Composición • Campaña Oficial</p>
                <h2>El Key Visual: La Decisión Segura</h2>
            </div>

            {/*  Comparativa Procesal: Boceto Original a Mano Alzada vs. Key Visual Final  */}
            <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1.25fr", gap: "3rem", marginBottom: "3.5rem", alignItems: "stretch" }}>
                {/*  1. Boceto Original  */}
                <div className="media-card reveal-card" style={{ border: "1px dashed rgba(228, 195, 58, 0.45)" }} data-tilt data-tilt-max="5">
                    <div className="media-card-img-wrap"
                        style={{ height: "auto", maxHeight: "580px", background: "#ffffff", padding: "1.5rem" }}>
                        <img src="/boceto_campana.png" alt="Boceto Original a Mano Alzada - La Decisión Segura"
                            style={{ objectFit: "contain", width: "100%", height: "auto", maxHeight: "520px" }} />
                    </div>
                    <div className="card-info">
                        <div className="experience-tag" style={{ marginBottom: "0.4rem" }}>Proceso Creativo • Ilustración</div>
                        <h3
                            style={{ fontFamily: "var(--font-display)", fontSize: "1.45rem", color: "var(--gold-caramel)", marginBottom: "0.3rem" }}>
                            Boceto Conceptual de Campaña
                        </h3>
                        <p style={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.85)", lineHeight: "1.55" }}>
                            Planteamiento inicial a mano alzada: conceptualización de la perspectiva de la tienda
                            Goldtex, el umbral de entrada y la silueta del comprador dirigiéndose hacia el interior.
                        </p>
                    </div>
                </div>

                {/*  2. Key Visual Final Terminado  */}
                <div className="media-card reveal-card"
                    style={{ border: "1.5px solid var(--gold-caramel)", boxShadow: "0 35px 80px rgba(0,0,0,0.95), 0 0 35px rgba(228, 195, 58, 0.25)" }} data-tilt data-tilt-max="5">
                    <div className="media-card-img-wrap" style={{ height: "auto", maxHeight: "580px", background: "#000" }}>
                        <img src="/la_decision_segura.png" alt="Campaña Oficial Goldtex - La Decisión Segura"
                            style={{ objectFit: "contain", width: "100%", height: "auto", maxHeight: "520px" }} />
                    </div>
                    <div className="card-info">
                        <div className="experience-tag" style={{ marginBottom: "0.4rem" }}>Arte Final • Key Visual</div>
                        <h3
                            style={{ fontFamily: "var(--font-display)", fontSize: "1.45rem", color: "var(--gold-caramel)", marginBottom: "0.3rem" }}>
                            Render Final: "LA DECISIÓN SEGURA"
                        </h3>
                        <p style={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.85)", lineHeight: "1.55" }}>
                            Materialización fotográfica con iluminación dorada volumétrica envolviendo la silueta sobre
                            el frontis Verde Institucional [RGB: 0, 62, 51], proyectando exclusividad y garantía
                            comercial.
                        </p>
                    </div>
                </div>
            </div>

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
                    </div>
                    {/*  Controles de navegación Swiper 3D  */}
                    <div className="swiper-pagination"></div>
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                </div>
        </section>
        </section>

        {/*  ============ BIBLIOTECA DE CONTENIDO: EXPERIENCIA INTERACTIVA & PRODUCCIÓN ============  */}
        {/*  Sección 3: Tendencias en Decoración (Editorial de Interiorismo & Estilo)  */}
        <section className="editorial-decor-section" id="decoracion-tendencias">
            <div className="editorial-container">
                <div className="editorial-content">
                    <div className="editorial-breadcrumbs">
                        <span>Inicio</span>
                        <span>/</span>
                        <span className="active">Interiorismo & Decoración</span>
                    </div>

                    <div className="editorial-tag">Línea Hogar & Dormitorio</div>

                    <h2 className="editorial-title">
                        ¿Quieres dar un nuevo aire a tu espacio? <em>Estas son las texturas</em> que transformarán cada
                        rincón.
                    </h2>

                    <div className="editorial-gold-line"></div>

                    <p className="editorial-lead">
                        Reviste tu dormitorio con cobertores piel de carnero, oso y 3D, edredones
                        y sábanas polar de la línea hogar de Goldtex. Compra por metros o
                        fardos, con asesoramiento técnico para elegir la textura correcta.
                    </p>

                    <div className="editorial-highlights">
                        <div className="editorial-highlight-card">
                            <h4>Cobertores & Edredones</h4>
                            <p>Piel de carnero, oso y 3D: abrigo y textura para dormitorio y decoración.</p>
                        </div>
                        <div className="editorial-highlight-card">
                            <h4>Sábanas Polar & Toallas</h4>
                            <p>Suavidad y absorción para el hogar, con venta flexible por metros.</p>
                        </div>
                    </div>

                    <div className="editorial-cta-group">
                        <a href="#servicios" className="editorial-cta-btn">
                            <span>Explorar Línea Hogar</span>
                            <span>⟶</span>
                        </a>
                    </div>
                </div>

                <div className="editorial-visual">
                    <div className="editorial-image-frame">
                        <img src="/decoracion_tendencias.jpg"
                            alt="Decoración de interiores con textiles exclusivos de Goldtex" loading="lazy" />
                    </div>
                    <div className="editorial-badge-float">
                        <div className="editorial-badge-dot"></div>
                        <div className="editorial-badge-text">
                            Línea Hogar & Dormitorio
                            <strong>Goldtex Gamarra</strong>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/*  SECCIÓN DE EXPERIENCIA TÁCTIL: CONFIGURADOR DE TEJIDOS & FIBER SCANNER  */}
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

        {/*  Sección 2: Videos Locales de Campaña  */}
        <section id="audiovisual">
            <div className="section-header">
                <p>Narrativa & Storytelling</p>
                <h2>Producción Audiovisual</h2>
            </div>

            <div className="video-grid">
                {/*  Video 1: Spot I  */}
                <div className="video-card reveal-card">
                    <div className="video-player-container" id="video-container-1">
                        <video id="spot-video-1" autoPlay muted loop playsInline preload="auto"
                            poster="/poster_spot1.jpg" data-action="togglePlayVideo(1)">
                            <source src="/publicidad.mp4" type="video/mp4" />
                            Tu navegador no soporta video.
                        </video>
                        <div className="video-overlay-controls">
                            <div className="video-ctrl-group">
                                <button className="video-ctrl-btn" id="audio-btn-1" data-action="toggleAudioVideo(1)"
                                    title="Activar/Silenciar Sonido">
                                    <span id="audio-icon-1">🔇</span>
                                    <span id="audio-text-1">Silenciado</span>
                                </button>
                                <button className="video-ctrl-btn" id="play-btn-1" data-action="togglePlayVideo(1)"
                                    title="Pausar/Reproducir">
                                    <span id="play-icon-1">⏸</span>
                                </button>
                            </div>
                            <div className="video-ctrl-group">
                                <button className="video-ctrl-btn" data-action="toggleFullscreenVideo(1)"
                                    title="Pantalla Completa">
                                    <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 3H3v5"/><path d="M16 3h5v5"/><path d="M8 21H3v-5"/><path d="M16 21h5v-5"/></svg></span>
                                    <span>Pantalla Completa</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card-info">
                        <h3>Spot I: Campaña Nacional</h3>
                        <p>Pieza publicitaria oficial de la campaña "La decisión segura".</p>
                    </div>
                </div>

                {/*  Video 2: Spot II  */}
                <div className="video-card reveal-card">
                    <div className="video-player-container" id="video-container-2">
                        <video id="spot-video-2" autoPlay muted loop playsInline preload="auto"
                            poster="/poster_spot2.jpg" data-action="togglePlayVideo(2)">
                            <source src="/publicidad2.mp4" type="video/mp4" />
                            Tu navegador no soporta video.
                        </video>
                        <div className="video-overlay-controls">
                            <div className="video-ctrl-group">
                                <button className="video-ctrl-btn" id="audio-btn-2" data-action="toggleAudioVideo(2)"
                                    title="Activar/Silenciar Sonido">
                                    <span id="audio-icon-2">🔇</span>
                                    <span id="audio-text-2">Silenciado</span>
                                </button>
                                <button className="video-ctrl-btn" id="play-btn-2" data-action="togglePlayVideo(2)"
                                    title="Pausar/Reproducir">
                                    <span id="play-icon-2">⏸</span>
                                </button>
                            </div>
                            <div className="video-ctrl-group">
                                <button className="video-ctrl-btn" data-action="toggleFullscreenVideo(2)"
                                    title="Pantalla Completa">
                                    <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 3H3v5"/><path d="M16 3h5v5"/><path d="M8 21H3v-5"/><path d="M16 21h5v-5"/></svg></span>
                                    <span>Pantalla Completa</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card-info">
                        <h3>Spot II: Texturas & Tienda</h3>
                        <p>Segundo spot de la campaña publicitaria nacional de Goldtex.</p>
                    </div>
                </div>
            </div>
        </section>

        <footer>
            {/*  ============ CONTACTO / CTA ============  */}
            <section className="section-block" id="contacto" style={{ paddingBottom: "2rem" }}>
                <div className="contact-cta reveal-card">
                    <div>
                        <p className="section-kicker">Contacto Directo</p>
                        <h2>Cotiza tu próxima compra de telas</h2>
                        <p>
                            Escríbenos por WhatsApp Business con las telas, metros y colores que
                            necesitas. Te respondemos con stock, precio por metro y opciones de
                            despacho a Lima y provincias.
                        </p>
                        <p style={{ marginTop: "1.2rem" }}>
                            <a className="cta-button" href="https://wa.me/XXXXXXXXXXX" target="_blank" rel="noopener">
                                <span className="cta-icon"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg></span>
                                <span>Cotizar por WhatsApp</span>
                            </a>
                        </p>
                        <p className="pending-note">
                            * Número de WhatsApp Business pendiente de confirmación por el cliente (no figura en los documentos).
                        </p>
                        <div className="social-row">
                            <a className="social-btn" href="#" title="Instagram" aria-label="Instagram" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"/></svg></a>
                            <a className="social-btn" href="#" title="Facebook" aria-label="Facebook" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21.5v-7.2h2.42l.38-2.78h-2.8V9.5c0-.8.23-1.35 1.38-1.35h1.47V5.6c-.26-.03-1.14-.11-2.17-.11-2.16 0-3.64 1.32-3.64 3.74v2.07H8.4v2.78h2.48v7.12h2.62z"/></svg></a>
                            <a className="social-btn" href="#" title="TikTok" aria-label="TikTok" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.6 3c.4 2.2 1.8 3.6 4 3.9v3c-1.6 0-3-.5-4-1.3v6.6c0 3.5-2.5 5.9-5.7 5.9-3 0-5.4-2.3-5.4-5.4 0-3.2 2.6-5.6 5.8-5.4v3.1c-1.4-.3-2.6.6-2.6 2.2 0 1.4 1.1 2.4 2.4 2.4 1.5 0 2.6-1.1 2.6-2.9V3h3.3z"/></svg></a>
                            <a className="social-btn" href="https://wa.me/XXXXXXXXXXX" title="WhatsApp" aria-label="WhatsApp" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg></a>
                        </div>
                        <p className="pending-note">
                            * Enlaces a redes sociales pendientes de confirmación por el cliente (no figuran en los documentos).
                        </p>
                    </div>
                    <div className="contact-facts">
                        <div><strong>Ubicación:</strong> Jr. Gamarra, La Victoria, Lima — Emporio Comercial de Gamarra</div>
                        <div><strong>Empresa:</strong> Corporación Goldtex S.A.C. · RUC 20519448794</div>
                        <div><strong>Trayectoria:</strong> Más de 15 años en el rubro textil mayorista</div>
                        <div><strong>Canales:</strong> Tienda física · Catálogo digital · WhatsApp Business</div>
                    </div>
                </div>
            </section>

            <p>© 2026 Corporación Goldtex S.A.C. — Gamarra, La Victoria, Lima · RUC 20519448794</p>
            <p style={{ fontSize: "0.8rem", color: "rgba(244, 243, 243, 0.7)", marginTop: "6px" }}>
                Desarrollado por: <strong style={{ color: "var(--gold-champagne)" }}>Jhon Ricardo Quispe Ramos</strong> •
                <strong style={{ color: "var(--gold-champagne)" }}>Sebastián Alonso Galiano Villasis</strong> • <strong
                    style={{ color: "var(--gold-champagne)" }}>Jesús Miguel Goyzueta Castro</strong>
            </p>
            <div className="footer-credits" style={{ marginTop: "12px" }}>Telas que Inspiran • La Decisión Segura</div>
            {/*  ============ FICHA DE EQUIPO • AA3 ============  */}
            <div className="team-credits-card reveal-card" id="equipo" style={{ maxWidth: "1400px", margin: "3rem auto 0 auto" }}>
                <div className="team-title-group">
                    <h5>Equipo de Investigación y Diseño • AA3</h5>
                    <span>Taller de Desarrollo Gráfico — Sustentación de Indicador de Logro 1</span>
                </div>
                <div className="team-members-chips">
                    <div className="member-chip">
                        <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l2.1 6.4 6.4 2.1-6.4 2.1L12 20l-2.1-6.4-6.4-2.1 6.4-2.1z"/></svg></span> Jhon Ricardo Quispe Ramos
                    </div>
                    <div className="member-chip">
                        <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l2.1 6.4 6.4 2.1-6.4 2.1L12 20l-2.1-6.4-6.4-2.1 6.4-2.1z"/></svg></span> Sebastián Alonso Galiano Villasis
                    </div>
                    <div className="member-chip">
                        <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l2.1 6.4 6.4 2.1-6.4 2.1L12 20l-2.1-6.4-6.4-2.1 6.4-2.1z"/></svg></span> Jesús Miguel Goyzueta Castro
                    </div>
                </div>
            </div>

        </footer>
    </main>