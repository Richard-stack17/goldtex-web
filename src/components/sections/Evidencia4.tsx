/* Evidencia 04 — Campaña "La decisión segura" (contenido extraído de EVIDENCIA_4.pptx). */
type Slide = { src: string; tag: string; title: string; text: string; contain?: boolean };

const BASE = "/assets/evidencias/ev4";

function Carousel({ id, label, slides }: { id: string; label: string; slides: Slide[] }) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="carousel" id={id} aria-roledescription="carrusel" aria-label={label}>
      <div className="carousel-viewport">
        <div className="carousel-track">
          {slides.map((s, i) => (
            <figure key={s.src} className={`carousel-slide${i === 0 ? " is-active" : ""}`}>
              <div className="carousel-img-wrap carousel-img-wrap--contain" style={{ background: "#0b1f1b" }}>
                <img src={s.src} alt={`${s.title} — Evidencia 04`} loading="lazy" />
              </div>
              <figcaption className="carousel-caption">
                <span className="experience-tag">{s.tag}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="carousel-counter" aria-hidden="true">
        <span className="carousel-current">01</span><span className="carousel-sep">/</span>
        <span className="carousel-total">{pad(slides.length)}</span>
      </div>
      <button className="carousel-btn carousel-prev" type="button" aria-label="Diapositiva anterior"><span aria-hidden="true">‹</span></button>
      <button className="carousel-btn carousel-next" type="button" aria-label="Diapositiva siguiente"><span aria-hidden="true">›</span></button>
      <div className="carousel-dots" role="tablist" aria-label="Navegación del carrusel">
        {slides.map((_, i) => (
          <button key={i} className={`carousel-dot${i === 0 ? " is-active" : ""}`} type="button" role="tab"
            aria-selected={i === 0} aria-label={`Diapositiva ${i + 1} de ${slides.length}`}>
            <span className="carousel-dot-num">{pad(i + 1)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const mockupsYAplicaciones: Slide[] = [
  {
    src: "/imagen_mockup.png",
    tag: "Identidad & Branding · Mockup",
    title: "Mockup de Indumentaria Corporativa",
    text: "Uniformes institucionales con polo verde corporativo y logotipo bordado para el equipo de ventas y asesores en tienda Gamarra.",
  },
  {
    src: "/imagen_facebook.png",
    tag: "Redes Sociales · Fanpage Facebook",
    title: "Presencia Corporativa en Facebook",
    text: "Página oficial verificada con 254k seguidores, catálogo de insumos y más de 1.2M de alcance para talleres textiles.",
  },
  {
    src: "/imagen_instagram.png",
    tag: "Redes Sociales · Campaña Digital",
    title: "Mockup Post Instagram",
    text: "“El color de tus ideas también es una buena tela” — Publicación interactiva de campaña oficial en Instagram.",
  },
  {
    src: `${BASE}/ev4_calle_02.png`,
    tag: "Vía pública · Mockup Urbano",
    title: "Mockup Publicidad Exterior",
    text: "Aplicación de la campaña en el entorno urbano y paraderos para reforzar el reconocimiento de marca.",
  },
];

const pillars = [
  { k: "¿Quiénes somos?", v: "Empresa de comercialización de telas en Gamarra, atendiendo a clientes mayoristas y minoristas con productos de calidad." },
  { k: "Problema", v: "Falta de una identidad visual corporativa definida y coherente que la diferencie frente a la competencia." },
  { k: "Solución", v: "Identidad visual integral: logotipo, paleta cromática, tipografía y recursos gráficos coherentes y profesionales." },
];

import SpatialPhoneBillboard from "@/components/experience/SpatialPhoneBillboard";
import Evidencia4ComplementoVideo from "@/components/experience/Evidencia4ComplementoVideo";

export default function Evidencia4() {
  return (
    <section className="evidencia-panel" id="evidencia-4">
      <div className="evidencia-header evidencia-video-portal">
        <video className="portal-bg-video" autoPlay muted loop playsInline preload="metadata" poster={`${BASE}/ev4_fondo.jpeg`}>
          <source src="/ev4_fondo.mp4" type="video/mp4" />
        </video>
        <div className="portal-video-overlay"></div>
        <div className="portal-header-content">
          <span className="evidencia-badge">Evidencia 04 • Campaña &amp; Medios</span>
          <h2 className="section-title-xl">“La Decisión Segura”</h2>
        </div>
      </div>

      <section className="section-block" id="ev4-contexto">
        <div className="ev4-logo-badge">
          <img
            src={`${BASE}/ev4_portada_logo.png`}
            alt="Logotipo GOLDTEX — Telas que inspiran"
          />
        </div>
        <p className="section-kicker">Concepto de Campaña</p>
        <h2 className="section-title-xl">Una buena tela es el inicio de un gran proyecto</h2>

        <div className="ev4-eco-grid">
          {/* 01: ¿QUIÉNES SOMOS? */}
          <article className="ev4-eco-card ev4-eco--somos reveal-card">
            <span className="ev4-eco-idx">01</span>
            <div className="ev4-eco-head">
              <span className="ev4-eco-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </span>
              <span className="experience-tag">¿Quiénes somos?</span>
            </div>

            <div className="ev4-eco-body">
              <div className="ev4-eco-content">
                <p className="ev4-eco-lead">
                  Empresa de comercialización de telas en el emporio comercial de Gamarra, atendiendo a clientes mayoristas y minoristas con productos de calidad.
                </p>
                <ul className="ev4-eco-bullets">
                  <li>
                    <span className="bullet-dot" />
                    <span><strong>Atención Integral:</strong> Venta por mayor y menor para diseñadores y confeccionistas.</span>
                  </li>
                  <li>
                    <span className="bullet-dot" />
                    <span><strong>Presencia en Gamarra:</strong> Ubicación estratégica en el principal polo textil del Perú.</span>
                  </li>
                  <li>
                    <span className="bullet-dot" />
                    <span><strong>Surtido &amp; Calidad:</strong> Diversidad de texturas, caídas y colores para alta confección.</span>
                  </li>
                </ul>
              </div>

              <figure className="ev4-eco-figure">
                <div className="ev4-eco-img-wrap">
                  <img src="/chica.jpg" alt="Asesoría de telas en tienda Goldtex" loading="lazy" />
                </div>
                <figcaption className="ev4-eco-figure-cap">
                  Asesoría de telas en tienda · Gamarra
                </figcaption>
              </figure>
            </div>
          </article>

          {/* 02: PROBLEMA */}
          <article className="ev4-eco-card ev4-eco--problema reveal-card">
            <span className="ev4-eco-idx">02</span>
            <div className="ev4-eco-head">
              <span className="ev4-eco-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </span>
              <span className="experience-tag">Problema</span>
            </div>

            <div className="ev4-eco-content">
              <p className="ev4-eco-lead">
                Falta de una identidad visual corporativa definida y coherente que la diferencie frente a la competencia.
              </p>
              <ul className="ev4-eco-bullets ev4-eco-bullets--problem">
                <li>
                  <span className="bullet-alert">⚠️</span>
                  <span><strong>Sin sistema normativo:</strong> Presencia física en tienda pero sin lineamientos gráficos unificados.</span>
                </li>
                <li>
                  <span className="bullet-alert">⚠️</span>
                  <span><strong>Baja diferenciación:</strong> Dificultad para destacar en la saturación comercial de Gamarra.</span>
                </li>
                <li>
                  <span className="bullet-alert">⚠️</span>
                  <span><strong>Percepción limitada:</strong> Restringe la consolidación de valor de marca y recordación del cliente.</span>
                </li>
              </ul>
              <div className="ev4-eco-pill-row">
                <span className="ev4-tag-pill">Sin manual normativo</span>
                <span className="ev4-tag-pill">Dispersión visual</span>
                <span className="ev4-tag-pill">Baja recordación</span>
              </div>
            </div>
          </article>

          {/* 03: SOLUCIÓN */}
          <article className="ev4-eco-card ev4-eco--solucion reveal-card">
            <span className="ev4-eco-idx">03</span>
            <span className="ev4-eco-ghost" aria-hidden="true">03</span>
            <div className="ev4-eco-head">
              <span className="ev4-eco-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                </svg>
              </span>
              <span className="experience-tag">Solución</span>
            </div>

            <div className="ev4-eco-content">
              <p className="ev4-eco-lead">
                Identidad visual integral: logotipo, paleta cromática, tipografía y recursos gráficos coherentes y profesionales.
              </p>

              <div className="ev4-solution-grid">
                <div className="ev4-solution-mini">
                  <div className="ev4-mini-top">
                    <span className="ev4-mini-icon">🏛️</span>
                    <h4>Logotipo &amp; Isotipo GT</h4>
                  </div>
                  <p>Monograma heráldico con serifa que transmite prestigio, trayectoria y solidez textil.</p>
                </div>

                <div className="ev4-solution-mini">
                  <div className="ev4-mini-top">
                    <span className="ev4-mini-icon">🎨</span>
                    <h4>Paleta Institucional</h4>
                  </div>
                  <p>Verde Institucional (#083E35) y Oro Papaya (#F1B734), equilibrio de lujo y tradición.</p>
                </div>

                <div className="ev4-solution-mini">
                  <div className="ev4-mini-top">
                    <span className="ev4-mini-icon">✒️</span>
                    <h4>Tipografía de Marca</h4>
                  </div>
                  <p>Times New Roman para jerarquía editorial combinada con Cantarell para legibilidad moderna.</p>
                </div>

                <div className="ev4-solution-mini">
                  <div className="ev4-mini-top">
                    <span className="ev4-mini-icon">📐</span>
                    <h4>Recursos Gráficos</h4>
                  </div>
                  <p>Tramas textiles continuas, patrones geométricos y señalética coherente para retail y digital.</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* VIDEO COMPLEMENTARIO: MATERIAL POP, INDUMENTARIA, MERCHANDISING Y PRECINTOS DE SEGURIDAD */}
      <Evidencia4ComplementoVideo />

      {/* EFECTO 3: CELULAR 3D FLOTANTE, CINTA CONTINUA PASANTE Y BILLBOARD CALLEJERO CON LUCES LED */}
      <SpatialPhoneBillboard />

      <section className="section-block" id="ev4-mockups" style={{ marginTop: "4rem" }}>
        <p className="section-kicker">Archivo de Campaña</p>
        <h2 className="section-title-xl">Galería Detallada · Mockups &amp; Aplicaciones</h2>
        <Carousel id="carousel-ev4-mockups" label="Mockups y aplicaciones de campaña" slides={mockupsYAplicaciones} />
      </section>
    </section>
  );
}
