/* Generado desde index.html — contenido íntegro preservado (conversión mecánica HTML→JSX). */
export default function Overlays() {
  return (
    <>
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
    </>
  );
}
