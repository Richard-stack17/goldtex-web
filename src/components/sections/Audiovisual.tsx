/* Generado desde index.html — contenido íntegro preservado (conversión mecánica HTML→JSX). */
export default function Audiovisual() {
  return (
    <>
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
                                    <span id="audio-icon-1" data-ic-muted><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg></span>
                                    <span id="audio-text-1">Silenciado</span>
                                </button>
                                <button className="video-ctrl-btn" id="play-btn-1" data-action="togglePlayVideo(1)"
                                    title="Pausar/Reproducir">
                                    <span id="play-icon-1" data-ic-pause><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1.2"/><rect x="14" y="4" width="4" height="16" rx="1.2"/></svg></span>
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
                                    <span id="audio-icon-2" data-ic-muted><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg></span>
                                    <span id="audio-text-2">Silenciado</span>
                                </button>
                                <button className="video-ctrl-btn" id="play-btn-2" data-action="togglePlayVideo(2)"
                                    title="Pausar/Reproducir">
                                    <span id="play-icon-2" data-ic-pause><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1.2"/><rect x="14" y="4" width="4" height="16" rx="1.2"/></svg></span>
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
    </>
  );
}
