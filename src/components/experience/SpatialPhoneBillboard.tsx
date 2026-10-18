"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TIKTOK_SLIDES = [
  {
    src: "/assets/evidencias/ev4/ev4_tiktok_01.png",
    title: "GOLDTEX Oficial en TikTok",
    subtitle: "Perfil Vertical de Marca · 9:16",
    handle: "@Goldtex.Oficial",
    desc: "Presencia digital con estética esmeralda y dorada para captar diseñadores jóvenes y confeccionistas.",
  },
  {
    src: "/assets/evidencias/ev4/ev4_tiktok_02.png",
    title: "Campaña “La Decisión Segura”",
    subtitle: "Contenido de Alto Impacto",
    handle: "@Goldtex.Oficial",
    desc: "Una buena tela es el inicio de un gran proyecto: storytelling textil con ritmo cinemático.",
  },
  {
    src: "/assets/evidencias/ev4/ev4_tiktok_03.png",
    videoSrc: "/publicidad2.mp4",
    poster: "/poster_publicidad2.jpg",
    title: "Video Vertical de Producto",
    subtitle: "Texturas y Caída de Tejidos",
    handle: "@Goldtex.Oficial",
    desc: "Muestra de sedas, satines y algodones estructurados en primer plano con tipografía oficial.",
  },
];

const INSTAGRAM_SLIDES = [
  {
    src: "/imagen_instagram.png",
    title: "Post Oficial en Instagram",
    subtitle: "Publicación de Campaña · 1:1",
    handle: "@Goldtex_Oficial",
    desc: "“El color de tus ideas también es una buena tela” — Post de interacción y engagement en la cuenta oficial.",
  },
  {
    src: "/assets/evidencias/ev4/ev4_instagram_01.png",
    title: "Feed Oficial en Instagram",
    subtitle: "Curaduría Estética & Grilla",
    handle: "@goldtex.pe",
    desc: "Coherencia visual impecable basada en el Brand Book y los lineamientos de dirección de arte.",
  },
  {
    src: "/assets/evidencias/ev4/ev4_instagram_02.png",
    title: "Post de Campaña 1:1",
    subtitle: "Publicación Principal",
    handle: "@goldtex.pe",
    desc: "Pieza emblemática que refuerza el valor de comprar con confianza en Gamarra.",
  },
  {
    src: "/assets/evidencias/ev4/ev4_instagram_03.png",
    title: "Story / Historia Interactiva",
    subtitle: "Tráfico hacia Showroom",
    handle: "@goldtex.pe",
    desc: "Llamado a la acción directo con enlace a WhatsApp Business y catálogo mayorista.",
  },
];

const FACEBOOK_SLIDES = [
  {
    src: "/imagen_facebook.png",
    title: "Fanpage Oficial en Facebook",
    subtitle: "Comunidad & Catálogo B2B",
    handle: "Goldtex · Servicios y Distribución de Textiles",
    desc: "Canal verificado con 254k seguidores y más de 1.2M de alcance publicitario para talleres y confeccionistas en Lima y provincias.",
  },
];

export default function SpatialPhoneBillboard() {
  const [activeTab, setActiveTab] = useState<"tiktok" | "instagram" | "facebook">("tiktok");
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const phoneRef = useRef<HTMLDivElement | null>(null);
  const ribbonRef = useRef<HTMLDivElement | null>(null);
  const billboardRef = useRef<HTMLDivElement | null>(null);
  const [lightsOn, setLightsOn] = useState<boolean>(false);

  const slides =
    activeTab === "tiktok"
      ? TIKTOK_SLIDES
      : activeTab === "instagram"
      ? INSTAGRAM_SLIDES
      : FACEBOOK_SLIDES;
  const currentSlide = slides[slideIndex % slides.length];

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    // 1. Cinta continua pasante detrás del teléfono (movimiento horizontal infinito)
    const ribbon = ribbonRef.current;
    let ribbonTween: gsap.core.Tween | null = null;
    if (ribbon) {
      ribbonTween = gsap.to(ribbon, {
        xPercent: -50,
        duration: 25,
        ease: "none",
        repeat: -1,
      });
    }

    // 2. Encendido cinemático de luces LED del Billboard al hacer scroll
    const billboard = billboardRef.current;
    let st: ScrollTrigger | null = null;
    if (billboard) {
      st = ScrollTrigger.create({
        trigger: billboard,
        start: "top 65%",
        onEnter: () => setLightsOn(true),
        onLeaveBack: () => setLightsOn(false),
      });
    }

    return () => {
      ribbonTween?.kill();
      st?.kill();
    };
  }, []);

  // Parallax interactivo del teléfono al mover el cursor
  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!phoneRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(phoneRef.current, {
      rotateY: -12 + x * 26,
      rotateX: 7 - y * 22,
      duration: 0.4,
      ease: "power1.out",
    });
  };

  const handleStageMouseLeave = () => {
    if (!phoneRef.current) return;
    gsap.to(phoneRef.current, {
      rotateY: -12,
      rotateX: 7,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  return (
    <div className="ev4-spatial-container">
      {/* Título de la sección interactiva */}
      <div className="ev4-header-block">
        <span className="evidencia-badge" style={{ borderColor: "var(--gold-caramel)" }}>
          Ecosistema Digital 3D · Redes & Vía Pública
        </span>
        <h2 className="section-title-xl" style={{ margin: "0.5rem 0 0.5rem" }}>
          Despliegue Multiplataforma
        </h2>
        <p className="section-lead" style={{ margin: "0 auto 1.5rem", maxWidth: "800px" }}>
          El impacto de “La Decisión Segura” en el entorno móvil y en las calles del emporio comercial de Gamarra.
        </p>

        {/* Selector de plataforma */}
        <div className="ev4-platform-tabs">
          <button
            type="button"
            className={`platform-tab-btn ${activeTab === "tiktok" ? "is-active" : ""}`}
            onClick={() => {
              setActiveTab("tiktok");
              setSlideIndex(0);
            }}
          >
            <span className="tab-icon">♪</span> TikTok @Goldtex.Oficial
          </button>
          <button
            type="button"
            className={`platform-tab-btn ${activeTab === "instagram" ? "is-active" : ""}`}
            onClick={() => {
              setActiveTab("instagram");
              setSlideIndex(0);
            }}
          >
            <span className="tab-icon">📷</span> Instagram @goldtex.pe
          </button>
          <button
            type="button"
            className={`platform-tab-btn ${activeTab === "facebook" ? "is-active" : ""}`}
            onClick={() => {
              setActiveTab("facebook");
              setSlideIndex(0);
            }}
          >
            <span className="tab-icon">🌐</span> Facebook @Goldtex
          </button>
        </div>
      </div>

      {/* ================= STAGE 3D: CELULAR FLOTANTE + CINTA CONTINUA TRASERA ================= */}
      <div
        className="ev4-spatial-stage"
        onMouseMove={handleStageMouseMove}
        onMouseLeave={handleStageMouseLeave}
      >
        {/* Cinta continua pasante detrás del teléfono */}
        <div className="ev4-ribbon-track" ref={ribbonRef} aria-hidden="true">
          <img src="/imagen_facebook.png" alt="Facebook Goldtex" className="ev4-ribbon-item" />
          <img src="/imagen_mockup.png" alt="Mockup Uniformes Goldtex" className="ev4-ribbon-item" />
          <img src="/imagen_instagram.png" alt="Post Instagram Goldtex" className="ev4-ribbon-item" />
          <img src="/assets/evidencias/ev4/ev4_calle_02.png" alt="" className="ev4-ribbon-item" />
          <img src="/image_4d7087.jpg" alt="" className="ev4-ribbon-item" />
          <img src="/assets/evidencias/ev4/ev4_instagram_04.jpeg" alt="" className="ev4-ribbon-item" />
          {/* Duplicado para loop sin saltos */}
          <img src="/imagen_facebook.png" alt="Facebook Goldtex" className="ev4-ribbon-item" />
          <img src="/imagen_mockup.png" alt="Mockup Uniformes Goldtex" className="ev4-ribbon-item" />
          <img src="/imagen_instagram.png" alt="Post Instagram Goldtex" className="ev4-ribbon-item" />
          <img src="/assets/evidencias/ev4/ev4_calle_02.png" alt="" className="ev4-ribbon-item" />
          <img src="/image_4d7087.jpg" alt="" className="ev4-ribbon-item" />
          <img src="/assets/evidencias/ev4/ev4_instagram_04.jpeg" alt="" className="ev4-ribbon-item" />
        </div>

        {/* Mockup de iPhone 3D Flotante */}
        <div className="ev4-phone-wrapper" ref={phoneRef}>
          <div className="ev4-phone-chassis">
            {/* Dynamic Island */}
            <div className="ev4-phone-island">
              <span className="island-camera"></span>
            </div>

            {/* Reflejo de cristal frontal */}
            <div className="ev4-phone-glare" aria-hidden="true"></div>

            {/* Pantalla del teléfono */}
            <div className="ev4-phone-screen">
              {(currentSlide as any).videoSrc ? (
                <video
                  src={(currentSlide as any).videoSrc}
                  poster={(currentSlide as any).poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transform: "translateZ(0)",
                  }}
                />
              ) : (
                <img
                  src={currentSlide.src}
                  alt={currentSlide.title}
                  className="ev4-screen-media"
                  key={currentSlide.src}
                />
              )}

              {/* Interfaz nativa superpuesta tipo TikTok / Reel */}
              <div className="ev4-screen-ui">
                <div className="screen-header">
                  <span className="screen-live-tag">LIVE GAMARRA</span>
                  <span className="screen-time">19:30</span>
                </div>

                <div className="screen-sidebar">
                  <div className="screen-action-btn">
                    <span>❤️</span>
                    <small>18.4K</small>
                  </div>
                  <div className="screen-action-btn">
                    <span>💬</span>
                    <small>1,248</small>
                  </div>
                  <div className="screen-action-btn">
                    <span>↗</span>
                    <small>Compartir</small>
                  </div>
                  <div className="screen-action-btn screen-disc-btn">
                    <span className="screen-vinyl-disc">💿</span>
                  </div>
                </div>

                <div className="screen-footer">
                  <div className="screen-handle">{currentSlide.handle}</div>
                  <p className="screen-caption">{currentSlide.desc}</p>
                  <div className="screen-audio-badge">
                    <span>♫ Sonido original - Goldtex Telas que Inspiran</span>
                  </div>
                </div>
              </div>

              {/* Botones de navegación interna dentro de la pantalla */}
              <button
                type="button"
                className="screen-nav-btn screen-prev"
                onClick={() => setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length)}
                aria-label="Anterior pieza"
              >
                ‹
              </button>
              <button
                type="button"
                className="screen-nav-btn screen-next"
                onClick={() => setSlideIndex((prev) => (prev + 1) % slides.length)}
                aria-label="Siguiente pieza"
              >
                ›
              </button>
            </div>
          </div>

          {/* Sombra 3D proyectada en el suelo */}
          <div className="ev4-phone-shadow" aria-hidden="true"></div>
        </div>

        {/* Ficha descriptiva al lado del teléfono */}
        <div className="ev4-phone-meta">
          <span className="experience-tag" style={{ background: "rgba(241,183,52,0.9)", color: "#001a15" }}>
            {currentSlide.subtitle}
          </span>
          <h3 className="phone-meta-title">{currentSlide.title}</h3>
          <p className="phone-meta-desc">{currentSlide.desc}</p>
          <div className="phone-meta-dots">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`phone-dot ${idx === slideIndex % slides.length ? "is-active" : ""}`}
                onClick={() => setSlideIndex(idx)}
                aria-label={`Ver pieza ${idx + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* ================= ACTIVACIÓN OMNICANAL: DEL ENTORNO MÓVIL AL PUNTO DE VENTA ================= */}
      <div className="ev4-omnichannel-showcase reveal-card" id="activacion-omnicanal">
        <div className="omnichannel-badge-bar">
          <div className="omnichannel-tag">
            <span className="omnichannel-dot"></span>
            <span>Activación Omnicanal • Retail &amp; Experiencia Digital</span>
          </div>
          <div className="omnichannel-meta">
            Jr. Humboldt &amp; Galería Perla • Tienda Física + Redes
          </div>
        </div>

        <div className="video-player-container is-landscape" id="video-container-ev4">
          <video
            id="spot-video-ev4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/poster_ev4_omnichannel.jpg"
            data-action="togglePlayVideo('ev4')"
          >
            <source src="/activacion_gamarra_omnichannel.mp4" type="video/mp4" />
            <source src="/gemini_generated_video_957fde8f.mp4" type="video/mp4" />
            Tu navegador no soporta video.
          </video>
          <div className="video-overlay-controls">
            <div className="video-ctrl-group">
              <button
                className="video-ctrl-btn"
                id="audio-btn-ev4"
                data-action="toggleAudioVideo('ev4')"
                title="Activar/Silenciar Sonido"
              >
                <span id="audio-icon-ev4" data-ic-muted>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                </span>
                <span id="audio-text-ev4">Silenciado</span>
              </button>
              <button
                className="video-ctrl-btn"
                id="play-btn-ev4"
                data-action="togglePlayVideo('ev4')"
                title="Pausar/Reproducir"
              >
                <span id="play-icon-ev4" data-ic-pause>
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1.2"/><rect x="14" y="4" width="4" height="16" rx="1.2"/></svg>
                </span>
              </button>
            </div>
            <div className="video-ctrl-group">
              <button
                className="video-ctrl-btn"
                data-action="toggleFullscreenVideo('ev4')"
                title="Pantalla Completa"
              >
                <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 3H3v5"/><path d="M16 3h5v5"/><path d="M8 21H3v-5"/><path d="M16 21h5v-5"/></svg></span>
                <span>Pantalla Completa</span>
              </button>
            </div>
          </div>
        </div>

        <div className="omnichannel-info">
          <div>
            <h3 className="omnichannel-title">
              De la Pantalla al Mostrador: Experiencia de Compra en Gamarra
            </h3>
            <p className="omnichannel-desc">
              Film demostrativo del viaje del cliente: el descubrimiento digital a través del celular interactivo conecta directamente con la tienda física de Goldtex. Personal capacitado con uniforme institucional asesora en mostrador, despliega fardos y mide la tela con precisión técnica para cada emprendimiento textil.
            </p>
          </div>
          <div className="omnichannel-pills">
            <span className="brand-spec-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Jr. Humboldt, Gamarra
            </span>
            <span className="brand-spec-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>
              Corte &amp; Venta por Metros
            </span>
            <span className="brand-spec-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg>
              Omnicanalidad Móvil
            </span>
          </div>
        </div>
      </div>

      {/* ================= CIERRE MONUMENTAL: BILLBOARD CALLEJERO CON LUCES LED ================= */}
      <section className="ev4-billboard-section" ref={billboardRef} id="publicidad-calles-billboard">
        <div className="billboard-kicker-wrap">
          <p className="section-kicker">Vía Pública &amp; Gran Formato</p>
          <h2 className="section-title-xl">Publicidad en las Calles de Gamarra</h2>
          <p className="section-lead" style={{ margin: "0 auto", maxWidth: "750px" }}>
            El Key Visual monumental instalado en las arterias del emporio comercial, visible a gran distancia con iluminación frontal de alta potencia.
          </p>
        </div>

        <div className={`ev4-billboard-container ${lightsOn ? "lights-active" : ""}`}>
          {/* Focos LED superiores con conos de luz */}
          <div className="ev4-billboard-lights" aria-hidden="true">
            {[0, 1, 2, 3].map((foco) => (
              <div key={foco} className="billboard-spotlight-fixture">
                <div className="spotlight-bulb"></div>
                <div className="billboard-light-cone"></div>
              </div>
            ))}
          </div>

          {/* Marco y afiche publicitario */}
          <div className="billboard-poster-frame">
            <img
              src="/image_4d7087.jpg"
              alt="Billboard Oficial Goldtex — La Decisión Segura"
              className="billboard-poster-img"
            />
            <div className="billboard-reflection-glaze"></div>
          </div>

          {/* Placa metálica de ingeniería */}
          <div className="billboard-specs-bar">
            <span>FORMATO: <strong>VALLA PANORÁMICA 12x4M</strong></span>
            <span>UBICACIÓN: <strong>JR. GAMARRA · LIMA, PERÚ</strong></span>
            <span>ILUMINACIÓN: <strong>LED VOLUMÉTRICA 4500K</strong></span>
          </div>
        </div>
      </section>
    </div>
  );
}
