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

const tiktok: Slide[] = [
  { src: `${BASE}/ev4_tiktok_01.png`, tag: "TikTok · Pieza 01", title: "Perfil GOLDTEX en TikTok", text: "Presencia vertical de la marca con la identidad cromática verde institucional y dorado." },
  { src: `${BASE}/ev4_tiktok_02.png`, tag: "TikTok · Pieza 02", title: "Contenido de Campaña", text: "Formato corto 9:16 que comunica el mensaje: una buena tela es el inicio de un gran proyecto." },
  { src: `${BASE}/ev4_tiktok_03.png`, tag: "TikTok · Pieza 03", title: "Pieza Vertical", text: "Aplicación de tipografía Times New Roman y Cantarell sobre contenido audiovisual." },
];

const instagram: Slide[] = [
  { src: `${BASE}/ev4_instagram_01.png`, tag: "Instagram · Pieza 01", title: "Perfil GOLDTEX en Instagram", text: "Feed coherente con la paleta y los recursos gráficos del manual de marca." },
  { src: `${BASE}/ev4_instagram_02.png`, tag: "Instagram · Pieza 02", title: "Post de Campaña", text: "Publicación cuadrada 1:1 bajo el concepto “La decisión segura”." },
  { src: `${BASE}/ev4_instagram_03.png`, tag: "Instagram · Pieza 03", title: "Historia", text: "Story vertical para generar interacción y tráfico hacia la tienda en Gamarra." },
  { src: `${BASE}/ev4_instagram_04.jpeg`, tag: "Instagram · Pieza 04", title: "Banner Panorámico", text: "Pieza horizontal de portada que unifica telas, marca y mensaje." },
];

const calle: Slide[] = [
  { src: `${BASE}/ev4_calle_01.png`, tag: "Vía pública · Pieza 01", title: "Panel Publicitario", text: "Valla de gran formato para el emporio comercial de Gamarra." },
  { src: `${BASE}/ev4_calle_02.png`, tag: "Vía pública · Pieza 02", title: "Mockup Urbano", text: "Aplicación de la campaña en el entorno urbano para reforzar el reconocimiento de marca." },
];

const pillars = [
  { k: "¿Quiénes somos?", v: "Empresa de comercialización de telas en Gamarra, atendiendo a clientes mayoristas y minoristas con productos de calidad." },
  { k: "Problema", v: "Falta de una identidad visual corporativa definida y coherente que la diferencie frente a la competencia." },
  { k: "Solución", v: "Identidad visual integral: logotipo, paleta cromática, tipografía y recursos gráficos coherentes y profesionales." },
];

import SpatialPhoneBillboard from "@/components/experience/SpatialPhoneBillboard";

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
        <img src={`${BASE}/ev4_portada_logo.png`} alt="Logotipo GOLDTEX — Telas que inspiran"
          style={{ maxWidth: "340px", width: "100%", margin: "0 auto 2rem", display: "block" }} />
        <p className="section-kicker">Concepto de Campaña</p>
        <h2 className="section-title-xl">Una buena tela es el inicio de un gran proyecto</h2>
        <div className="ev4-eco-grid">
          {pillars.map((p, i) => (
            <article key={p.k}
              className={`ev4-eco-card ev4-eco-${i === 0 ? "somos" : i === 1 ? "problema" : "solucion"} reveal-card`}>
              <span className="ev4-eco-idx">0{i + 1}</span>
              {i === 2 && <span className="ev4-eco-ghost" aria-hidden="true">03</span>}
              <div className="ev4-eco-head">
                <span className="ev4-eco-icon" aria-hidden="true">
                  {i === 0 ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                  ) : i === 1 ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>
                  )}
                </span>
                <span className="experience-tag">{p.k}</span>
              </div>
              {i === 0 ? (
                <div className="ev4-eco-body">
                  <p>{p.v}</p>
                  <figure className="ev4-eco-figure">
                    {/* REGLA DE ORO: imagen completa, contain — nunca cover */}
                    <img src="/chica.jpg" alt="Asesoría de telas en tienda Goldtex" loading="lazy" />
                    <figcaption className="ev4-eco-figure-cap">Asesoría de telas en tienda · Gamarra</figcaption>
                  </figure>
                </div>
              ) : (
                <p>{p.v}</p>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* EFECTO 3: CELULAR 3D FLOTANTE, CINTA CONTINUA PASANTE Y BILLBOARD CALLEJERO CON LUCES LED */}
      <SpatialPhoneBillboard />

      <section className="section-block" id="ev4-tiktok" style={{ marginTop: "4rem" }}>
        <p className="section-kicker">Archivo de Campaña</p>
        <h2 className="section-title-xl">Galería Detallada · TikTok</h2>
        <Carousel id="carousel-ev4-tiktok" label="Piezas de TikTok" slides={tiktok} />
      </section>

      <section className="section-block" id="ev4-instagram">
        <p className="section-kicker">Archivo de Campaña</p>
        <h2 className="section-title-xl">Galería Detallada · Instagram</h2>
        <Carousel id="carousel-ev4-instagram" label="Piezas de Instagram" slides={instagram} />
      </section>

      <section className="section-block" id="ev4-calle">
        <p className="section-kicker">Archivo de Campaña</p>
        <h2 className="section-title-xl">Galería Detallada · Vía Pública</h2>
        <Carousel id="carousel-ev4-calle" label="Publicidad exterior" slides={calle} />
      </section>
    </section>
  );
}
