"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";

interface Chapter {
  id: string;
  time: number;
  label: string;
  title: string;
  desc: string;
  icon: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: "paleta",
    time: 0,
    label: "00:00",
    title: "Paleta Institucional",
    desc: "Normativa cromática RGB / CMYK: Verde Institucional, Oro y Blanco.",
    icon: "🎨",
  },
  {
    id: "banner",
    time: 5,
    label: "00:05",
    title: "Roll-Up Publicitario",
    desc: "Banner comercial para punto de venta: «Dale vida a tus ideas».",
    icon: "🏷️",
  },
  {
    id: "polos",
    time: 13,
    label: "00:13",
    title: "Polos para Colaboradores",
    desc: "Indumentaria corporativa en Verde #083E35 con isotipo GT bordado.",
    icon: "👔",
  },
  {
    id: "merch",
    time: 23,
    label: "00:23",
    title: "Merchandising Corporativo",
    desc: "Pines metálicos, bolígrafos de diseño y botellas térmicas oficiales.",
    icon: "🎁",
  },
  {
    id: "precinto",
    time: 33,
    label: "00:33",
    title: "Precinto de Seguridad",
    desc: "Sellos inviolables y cintas de garantía para rollos textiles de alta costura.",
    icon: "🛡️",
  },
];

export default function Evidencia4ComplementoVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(40);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Formato mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Sincronizar tiempo y capítulo activo
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    setCurrentTime(cur);

    // Determinar capítulo activo según el tiempo actual
    let activeIdx = 0;
    for (let i = 0; i < CHAPTERS.length; i++) {
      if (cur >= CHAPTERS[i].time - 0.5) {
        activeIdx = i;
      }
    }
    setActiveChapterIndex(activeIdx);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 40);
    }
  };

  // Play / Pause
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // Mute / Unmute
  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !videoRef.current.muted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
    if (!newMuted && videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Replay
  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  // Saltar a capítulo
  const seekToChapter = (time: number, idx: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = time;
    setActiveChapterIndex(idx);
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Click en barra de progreso para hacer scrub
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickPos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = clickPos * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Fullscreen
  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;

    if (!document.fullscreenElement) {
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if ((el as any).webkitRequestFullscreen) {
        (el as any).webkitRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  // IntersectionObserver para pausar cuando no está en pantalla
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && !video.paused) {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="ev4-video-showcase-wrapper" style={{ marginTop: "4rem", marginBottom: "4rem" }}>
      {/* Header del bloque */}
      <div className="ev4-showcase-header" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <span
          className="evidencia-badge"
          style={{
            borderColor: "rgba(241, 183, 52, 0.55)",
            background: "rgba(8, 62, 53, 0.45)",
            color: "var(--gold-champagne)",
          }}
        >
          Ecosistema POP &amp; Merchandising · Campaña Nacional
        </span>
        <h2
          className="section-title-xl"
          style={{
            fontSize: "clamp(2rem, 3.8vw, 3.2rem)",
            marginTop: "0.6rem",
            marginBottom: "0.8rem",
            letterSpacing: "-0.01em",
          }}
        >
          Material Complementario · Marca &amp; Aplicaciones
        </h2>
        <p
          className="section-lead"
          style={{
            maxWidth: "820px",
            margin: "0 auto",
            color: "rgba(242, 235, 221, 0.8)",
            lineHeight: "1.65",
            fontSize: "1.05rem",
          }}
        >
          Despliegue integral de la campaña <em>“La Decisión Segura”</em> en puntos de contacto clave:
          desde el banner roll-up para showroom y la indumentaria de tienda, hasta el merchandising de fidelización
          y los precintos de autenticidad para rollos textiles.
        </p>
      </div>

      {/* Main Showcase Stage */}
      <div
        className="ev4-showcase-card"
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          background: "linear-gradient(180deg, rgba(8, 62, 53, 0.4) 0%, rgba(3, 26, 22, 0.8) 100%)",
          border: "1px solid rgba(241, 183, 52, 0.3)",
          borderRadius: "28px",
          padding: "clamp(1.2rem, 2.8vw, 2.2rem)",
          boxShadow: "0 35px 80px rgba(0, 0, 0, 0.85), 0 0 50px rgba(8, 62, 53, 0.35)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* Barra superior de especificaciones */}
        <div
          className="ev4-showcase-topbar"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "1.2rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid rgba(241, 183, 52, 0.15)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                display: "inline-block",
                width: "9px",
                height: "9px",
                borderRadius: "50%",
                background: "#f1b734",
                boxShadow: "0 0 10px #f1b734",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.86rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--gold-champagne)",
                fontWeight: "600",
              }}
            >
              Spot Oficial Complementario · 16:9 Full HD
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: "0.78rem",
                padding: "4px 12px",
                borderRadius: "20px",
                background: "rgba(241, 183, 52, 0.12)",
                color: "var(--gold-caramel)",
                border: "1px solid rgba(241, 183, 52, 0.3)",
                fontWeight: "500",
              }}
            >
              00:40 • 30 FPS
            </span>
            <span
              style={{
                fontSize: "0.78rem",
                padding: "4px 12px",
                borderRadius: "20px",
                background: "rgba(8, 62, 53, 0.6)",
                color: "rgba(242, 235, 221, 0.85)",
                border: "1px solid rgba(242, 235, 221, 0.18)",
              }}
            >
              Master POP &amp; Merchandising
            </span>
          </div>
        </div>

        {/* Contenedor del reproductor de video */}
        <div
          ref={containerRef}
          className="ev4-video-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            borderRadius: "18px",
            overflow: "hidden",
            background: "#020e0b",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.9)",
            border: "1px solid rgba(241, 183, 52, 0.25)",
          }}
        >
          <video
            ref={videoRef}
            src="/complemento_evidencia4.mp4"
            poster="/poster_ev4_complemento.jpg"
            playsInline
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onClick={togglePlay}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
              cursor: "pointer",
              background: "#000",
              transform: "translateZ(0)",
              willChange: "transform",
            }}
          >
            Tu navegador no soporta el formato de video MP4.
          </video>

          {/* Botón flotante central de Play cuando está pausado */}
          {!isPlaying && (
            <button
              type="button"
              onClick={togglePlay}
              aria-label="Reproducir video"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "82px",
                height: "82px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(241, 183, 52, 0.95) 0%, rgba(184, 134, 11, 0.85) 100%)",
                border: "2px solid rgba(255, 255, 255, 0.4)",
                boxShadow: "0 0 35px rgba(241, 183, 52, 0.6), 0 10px 30px rgba(0, 0, 0, 0.6)",
                color: "#001a15",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease",
                zIndex: 12,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.1)";
                e.currentTarget.style.boxShadow = "0 0 50px rgba(241, 183, 52, 0.85), 0 15px 40px rgba(0, 0, 0, 0.8)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)";
                e.currentTarget.style.boxShadow = "0 0 35px rgba(241, 183, 52, 0.6), 0 10px 30px rgba(0, 0, 0, 0.6)";
              }}
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: "4px" }}>
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </button>
          )}

          {/* Barra de Controles Cinemáticos */}
          <div
            className="ev4-video-controls"
            style={{
              position: "absolute",
              bottom: "16px",
              left: "16px",
              right: "16px",
              background: "rgba(2, 18, 14, 0.88)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(241, 183, 52, 0.32)",
              borderRadius: "16px",
              padding: "10px 16px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              zIndex: 15,
              opacity: isHovered || !isPlaying ? 1 : 0.88,
              transition: "opacity 0.3s ease",
            }}
          >
            {/* Barra de progreso interactiva (Scrubber) */}
            <div
              ref={progressBarRef}
              onClick={handleProgressBarClick}
              style={{
                position: "relative",
                width: "100%",
                height: "6px",
                background: "rgba(242, 235, 221, 0.16)",
                borderRadius: "3px",
                cursor: "pointer",
                overflow: "hidden",
              }}
              title="Avanzar o retroceder en el video"
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: `${progressPercent}%`,
                  background: "linear-gradient(90deg, #b8860b 0%, #f1b734 80%, #fff 100%)",
                  boxShadow: "0 0 8px rgba(241, 183, 52, 0.7)",
                  transition: "width 0.1s linear",
                }}
              />
            </div>

            {/* Fila de botones y tiempo */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {/* Play / Pause button */}
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pausar" : "Reproducir"}
                  style={{
                    background: "rgba(241, 183, 52, 0.18)",
                    border: "1px solid rgba(241, 183, 52, 0.4)",
                    color: "var(--gold-champagne)",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {isPlaying ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" rx="1.2" />
                      <rect x="14" y="4" width="4" height="16" rx="1.2" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: "2px" }}>
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  )}
                </button>

                {/* Restart button */}
                <button
                  type="button"
                  onClick={handleRestart}
                  aria-label="Reiniciar video"
                  title="Reiniciar"
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "rgba(242, 235, 221, 0.75)",
                    cursor: "pointer",
                    padding: "4px 8px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="1 4 1 10 7 10" />
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                  </svg>
                </button>

                {/* Mute / Unmute */}
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Activar audio" : "Silenciar audio"}
                  style={{
                    background: isMuted ? "transparent" : "rgba(241, 183, 52, 0.15)",
                    border: "1px solid rgba(241, 183, 52, 0.3)",
                    color: "var(--gold-champagne)",
                    borderRadius: "20px",
                    padding: "5px 12px",
                    fontSize: "0.82rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {isMuted ? (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 5 6 9H2v6h4l5 4V5z" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                      </svg>
                      <span>Silenciado</span>
                    </>
                  ) : (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 5 6 9H2v6h4l5 4V5z" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                      </svg>
                      <span style={{ color: "var(--gold-caramel)" }}>Con Audio</span>
                    </>
                  )}
                </button>

                {/* Reloj de tiempo */}
                <div
                  style={{
                    fontSize: "0.82rem",
                    fontFamily: "var(--font-sans)",
                    color: "rgba(242, 235, 221, 0.8)",
                    marginLeft: "4px",
                  }}
                >
                  <span style={{ color: "var(--gold-caramel)", fontWeight: "600" }}>{formatTime(currentTime)}</span>
                  <span style={{ margin: "0 4px", opacity: 0.5 }}>/</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Fullscreen Button */}
              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
                title="Pantalla completa"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(241, 183, 52, 0.3)",
                  color: "var(--gold-champagne)",
                  borderRadius: "20px",
                  padding: "5px 12px",
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3H3v5" />
                  <path d="M16 3h5v5" />
                  <path d="M8 21H3v-5" />
                  <path d="M16 21h5v-5" />
                </svg>
                <span>{isFullscreen ? "Reducir" : "Pantalla Completa"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================= TIMELINE INTERACTIVO DE CAPÍTULOS ================= */}
        <div style={{ marginTop: "1.8rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "0.8rem",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                fontSize: "0.82rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--gold-caramel)",
                fontWeight: "600",
              }}
            >
              Índice de Piezas y Aplicaciones (Haz clic para saltar al capítulo)
            </span>
            <span style={{ fontSize: "0.8rem", color: "rgba(242, 235, 221, 0.6)" }}>
              {activeChapterIndex + 1} de {CHAPTERS.length} capítulos
            </span>
          </div>

          <div
            className="ev4-chapters-scroll"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "10px",
            }}
          >
            {CHAPTERS.map((ch, idx) => {
              const isActive = activeChapterIndex === idx;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => seekToChapter(ch.time, idx)}
                  style={{
                    background: isActive
                      ? "linear-gradient(135deg, rgba(8, 62, 53, 0.95) 0%, rgba(241, 183, 52, 0.22) 100%)"
                      : "rgba(3, 26, 22, 0.55)",
                    border: isActive
                      ? "1.5px solid rgba(241, 183, 52, 0.85)"
                      : "1px solid rgba(242, 235, 221, 0.12)",
                    borderRadius: "14px",
                    padding: "10px 14px",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    boxShadow: isActive
                      ? "0 8px 24px rgba(241, 183, 52, 0.2), inset 0 0 12px rgba(241, 183, 52, 0.15)"
                      : "none",
                    transform: isActive ? "translateY(-2px)" : "none",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                    <span style={{ fontSize: "1.1rem" }}>{ch.icon}</span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: "0.75rem",
                        padding: "2px 6px",
                        borderRadius: "6px",
                        background: isActive ? "rgba(241, 183, 52, 0.9)" : "rgba(242, 235, 221, 0.1)",
                        color: isActive ? "#001a15" : "rgba(242, 235, 221, 0.8)",
                        fontWeight: "600",
                      }}
                    >
                      {ch.label}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.85rem",
                      fontWeight: isActive ? "700" : "600",
                      color: isActive ? "var(--gold-champagne)" : "rgba(242, 235, 221, 0.85)",
                      lineHeight: "1.25",
                    }}
                  >
                    {ch.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Ficha descriptiva del elemento actualmente en pantalla */}
        <div
          style={{
            marginTop: "1.5rem",
            background: "rgba(1, 18, 14, 0.65)",
            border: "1px solid rgba(241, 183, 52, 0.25)",
            borderRadius: "16px",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <span style={{ fontSize: "1.8rem" }}>{CHAPTERS[activeChapterIndex].icon}</span>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
              <span
                style={{
                  fontSize: "0.72rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--gold-caramel)",
                  fontWeight: "700",
                }}
              >
                Capítulo Actual · {CHAPTERS[activeChapterIndex].label}
              </span>
              <span style={{ color: "rgba(242, 235, 221, 0.4)" }}>•</span>
              <h4 style={{ margin: 0, fontSize: "0.98rem", color: "var(--gold-champagne)", fontWeight: "600" }}>
                {CHAPTERS[activeChapterIndex].title}
              </h4>
            </div>
            <p style={{ margin: 0, fontSize: "0.88rem", color: "rgba(242, 235, 221, 0.75)", lineHeight: "1.4" }}>
              {CHAPTERS[activeChapterIndex].desc}
            </p>
          </div>
        </div>

        {/* ================= BENTO GRID DE 4 APLICACIONES DESTACADAS ================= */}
        <div
          style={{
            marginTop: "2.4rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
          }}
        >
          {/* Card 1: Roll-up */}
          <div
            style={{
              background: "rgba(3, 26, 22, 0.5)",
              border: "1px solid rgba(241, 183, 52, 0.2)",
              borderRadius: "18px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "1.4rem" }}>🏷️</span>
              <span style={{ fontSize: "0.74rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--gold-caramel)", fontWeight: "600" }}>
                01 · Showroom
              </span>
            </div>
            <h4 style={{ margin: 0, fontSize: "1.05rem", color: "var(--gold-champagne)" }}>
              Roll-Up Banner Publicitario
            </h4>
            <p style={{ margin: 0, fontSize: "0.86rem", color: "rgba(242, 235, 221, 0.7)", lineHeight: "1.5" }}>
              Estructura retráctil de 2.0x0.85m con impresión UV de alta definición para el acceso a tienda y ferias del sector textil en Gamarra.
            </p>
          </div>

          {/* Card 2: Indumentaria */}
          <div
            style={{
              background: "rgba(3, 26, 22, 0.5)",
              border: "1px solid rgba(241, 183, 52, 0.2)",
              borderRadius: "18px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "1.4rem" }}>👔</span>
              <span style={{ fontSize: "0.74rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--gold-caramel)", fontWeight: "600" }}>
                02 · Personal
              </span>
            </div>
            <h4 style={{ margin: 0, fontSize: "1.05rem", color: "var(--gold-champagne)" }}>
              Polos para Colaboradores
            </h4>
            <p style={{ margin: 0, fontSize: "0.86rem", color: "rgba(242, 235, 221, 0.7)", lineHeight: "1.5" }}>
              Piqué 100% algodón teñido en Verde Institucional (#083E35) con el imagotipo oficial Goldtex bordado en hilo blanco de alta densidad.
            </p>
          </div>

          {/* Card 3: Merchandising */}
          <div
            style={{
              background: "rgba(3, 26, 22, 0.5)",
              border: "1px solid rgba(241, 183, 52, 0.2)",
              borderRadius: "18px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "1.4rem" }}>🎁</span>
              <span style={{ fontSize: "0.74rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--gold-caramel)", fontWeight: "600" }}>
                03 · Fidelización
              </span>
            </div>
            <h4 style={{ margin: 0, fontSize: "1.05rem", color: "var(--gold-champagne)" }}>
              Merchandising Corporativo
            </h4>
            <p style={{ margin: 0, fontSize: "0.86rem", color: "rgba(242, 235, 221, 0.7)", lineHeight: "1.5" }}>
              Pines heráldicos GT, bolígrafos de acabado mate y botellas térmicas de acero inoxidable distribuidos a clientes mayoristas y atelieres.
            </p>
          </div>

          {/* Card 4: Precintos */}
          <div
            style={{
              background: "rgba(3, 26, 22, 0.5)",
              border: "1px solid rgba(241, 183, 52, 0.2)",
              borderRadius: "18px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "1.4rem" }}>🛡️</span>
              <span style={{ fontSize: "0.74rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--gold-caramel)", fontWeight: "600" }}>
                04 · Garantía
              </span>
            </div>
            <h4 style={{ margin: 0, fontSize: "1.05rem", color: "var(--gold-champagne)" }}>
              Precintos de Seguridad Textil
            </h4>
            <p style={{ margin: 0, fontSize: "0.86rem", color: "rgba(242, 235, 221, 0.7)", lineHeight: "1.5" }}>
              Fajas adhesivas de seguridad para embalaje de rollos textiles con sello de inviolabilidad, certificando metraje y autenticidad del tejido.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
