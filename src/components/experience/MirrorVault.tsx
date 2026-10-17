"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface MirrorItem {
  src: string;
  tag: string;
  title: string;
  desc: string;
}

const MIRROR_ITEMS: MirrorItem[] = [
  {
    src: "/assets/evidencias/ev3/ev3_page_03.png",
    tag: "Evidencia 03 · Pág. 3",
    title: "Tipografía Oficial",
    desc: "Times New Roman & Cantarell: jerarquía tipográfica oficial del Brand Book.",
  },
  {
    src: "/assets/evidencias/ev3/ev3_page_04.png",
    tag: "Evidencia 03 · Pág. 4",
    title: "Paleta Cromática",
    desc: "Brunswick Green (#083E35) y Papaya Orange / Gold (#F1B734).",
  },
  {
    src: "/assets/evidencias/ev3/ev3_page_05.png",
    tag: "Evidencia 03 · Pág. 5",
    title: "Ángulo & Encuadre",
    desc: "Ángulo 3/4 y encuadre plano medio para humanizar la confección textil.",
  },
  {
    src: "/assets/evidencias/ev3/ev3_page_06.png",
    tag: "Evidencia 03 · Pág. 6",
    title: "Poses & Actitud",
    desc: "Sentada, apoyada sobre la mesa, con actitud reflexiva y segura.",
  },
  {
    src: "/assets/evidencias/ev3/ev3_page_07.png",
    tag: "Evidencia 03 · Pág. 7",
    title: "Vestimenta",
    desc: "Indumentaria estructurada con tejidos exclusivos y sofisticación sobria.",
  },
  {
    src: "/assets/evidencias/ev3/ev3_page_08.png",
    tag: "Evidencia 03 · Pág. 8",
    title: "Iluminación de Ventana",
    desc: "Luz natural suave simulando luz de ventana con temperatura cálida.",
  },
  {
    src: "/assets/evidencias/ev3/ev3_page_09.png",
    tag: "Evidencia 03 · Pág. 9",
    title: "Fondos Texturizados",
    desc: "Rollos textiles en estanterías oscuras que aportan volumen y realismo.",
  },
  {
    src: "/assets/evidencias/ev3/ev3_page_10.png",
    tag: "Evidencia 03 · Pág. 10",
    title: "Contexto de Atelier",
    desc: "Mesas de corte, maniquíes y confección en el taller textil.",
  },
  {
    src: "/boceto_ev3_key_visual.png",
    tag: "Evidencia 03 · Pág. 11",
    title: "Boceto Conceptual",
    desc: "Boceto a mano alzada: silueta reflexiva frente al rollo textil.",
  },
  {
    src: "/assets/evidencias/ev3/ev3_page_12.png",
    tag: "Evidencia 03 · Pág. 12",
    title: "Especificaciones Técnicas",
    desc: "Criterios de composición y dirección de arte del Key Visual.",
  },
  {
    src: "/key_visual.png",
    tag: "Campaña · Pieza 01",
    title: "Traje & Movimiento",
    desc: "Dinamismo, caída de tela y estampados botánicos en suspensión.",
  },
  {
    src: "/key_visual_2.png",
    tag: "Campaña · Pieza 02",
    title: "Tapicería & Espacios",
    desc: "Aplicación textil contemporánea con tejidos jacquard y mobiliario.",
  },
];

export default function MirrorVault() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const reflectionRingRef = useRef<HTMLDivElement | null>(null);
  const [selectedItem, setSelectedItem] = useState<MirrorItem>(MIRROR_ITEMS[0]);
  const [currentAngle, setCurrentAngle] = useState<number>(0);
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const startAngle = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ring = ringRef.current;
    const reflectionRing = reflectionRingRef.current;
    const section = containerRef.current;
    if (!ring || !section) return;

    // Rotación fluida en 360° vinculada al scroll
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2,
      onUpdate: (self) => {
        if (!isDragging.current) {
          const rotation = self.progress * 360;
          setCurrentAngle(rotation);
          gsap.set(ring, { rotateY: rotation });
          if (reflectionRing) {
            gsap.set(reflectionRing, { rotateY: rotation });
          }
        }
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  // Interacción de arrastre con mouse / touch
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startAngle.current = currentAngle;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - startX.current;
    const newAngle = startAngle.current + deltaX * 0.45;
    setCurrentAngle(newAngle);
    if (ringRef.current) gsap.set(ringRef.current, { rotateY: newAngle });
    if (reflectionRingRef.current) gsap.set(reflectionRingRef.current, { rotateY: newAngle });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch (_) {}
  };

  const rotateToIndex = (index: number) => {
    const targetAngle = -index * 30;
    setSelectedItem(MIRROR_ITEMS[index]);
    gsap.to([ringRef.current, reflectionRingRef.current], {
      rotateY: targetAngle,
      duration: 1.2,
      ease: "power3.out",
      onUpdate: () => {
        if (ringRef.current) {
          const rot = gsap.getProperty(ringRef.current, "rotateY") as number;
          setCurrentAngle(rot);
        }
      },
    });
  };

  return (
    <section className="mirror-vault-section" ref={containerRef} id="boveda-espejos-3d">
      <div className="mirror-vault-header">
        <span className="evidencia-badge" style={{ borderColor: "var(--gold-caramel)" }}>
          Evidencia 03 • Dirección de Arte &amp; Key Visual
        </span>
        <h2 className="section-title-xl" style={{ margin: "0.5rem 0 0.3rem" }}>
          La Decisión Segura
        </h2>
        <p className="mirror-vault-subtitle">
          Pieza publicitaria principal de la campaña destacada al frente, respaldada por la Bóveda de Espejos 3D que gira en el fondo mostrando las 12 claves técnicas del Brand Book.
          <span className="mirror-drag-hint"> (Arrastra con el ratón o desliza con el scroll para girar los espejos en 360°)</span>
        </p>
      </div>

      <div
        className="mirror-vault-stage"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* CARRIER TRASERO: Empuja los 12 espejos y su reflejo al fondo (Z negativo) para que nunca tapen la imagen principal */}
        <div className="mirror-vault-backdrop-carrier">
          {/* 1. Anillo Curvo 3D de 12 Espejos Flotantes */}
          <div className="mirror-vault-ring" ref={ringRef}>
            {MIRROR_ITEMS.map((item, i) => {
              const angle = i * 30; // 12 espejos * 30deg = 360deg
              return (
                <div
                  key={item.src + i}
                  className="mirror-pane"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(520px)`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    rotateToIndex(i);
                  }}
                  title={item.title}
                >
                  <img src={item.src} alt={item.title} loading="lazy" />
                  <div className="mirror-pane-glass" aria-hidden="true"></div>
                  <div className="mirror-pane-tag">
                    <strong>{item.tag}</strong>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 2. Suelo Reflectante con Espejo Invertido */}
          <div className="mirror-vault-reflection-ring" ref={reflectionRingRef} aria-hidden="true">
            {MIRROR_ITEMS.map((item, i) => {
              const angle = i * 30;
              return (
                <div
                  key={"ref-" + item.src + i}
                  className="mirror-pane"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(520px)`,
                  }}
                >
                  <img src={item.src} alt="" />
                  <div className="mirror-pane-glass"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. TARJETA MAESTRA CENTRAL: LA IMAGEN PRINCIPAL EN PRIMER PLANO DESTACADO */}
        <div className="mirror-master-card" data-tilt data-tilt-max="5">
          <div className="master-card-frame">
            {/* Imagen Principal de Evidencia 3 en Máxima Resolución */}
            <img
              src="/ev3_key_visual_master.png"
              alt="Campaña Oficial Goldtex — La Decisión Segura"
              className="master-card-base"
            />

            {/* Aura de Resplandor Oro & Esmeralda */}
            <div className="master-card-ambient-glow" aria-hidden="true"></div>

            {/* Sello Oficial Superior */}
            <div className="master-card-top-tag">
              <span className="master-tag-dot"></span>
              <span>KEY VISUAL OFICIAL • PIEZA MAESTRA</span>
            </div>

            {/* Overlay Editorial Inferior */}
            <div className="master-card-overlay">
              <div className="master-overlay-text">
                <span className="experience-tag" style={{ background: "rgba(241,183,52,0.95)", color: "#001a15", fontWeight: 700 }}>
                  CAMPAÑA OFICIAL GOLDTEX
                </span>
                <h3 className="master-card-title">La Decisión Segura</h3>
                <p className="master-card-desc">
                  “Una buena decisión es el inicio de un gran proyecto.”
                </p>
                <div className="master-card-subinfo">
                  <span>Espejo de fondo activo: <strong>{selectedItem.title}</strong> — {selectedItem.tag}</span>
                </div>
              </div>
              <div className="master-card-actions">
                <button
                  type="button"
                  className="master-rotate-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    const next = (currentAngle + 30) % 360;
                    setCurrentAngle(next);
                    if (ringRef.current) gsap.to(ringRef.current, { rotateY: next, duration: 0.8, ease: "power2.out" });
                    if (reflectionRingRef.current) gsap.to(reflectionRingRef.current, { rotateY: next, duration: 0.8, ease: "power2.out" });
                  }}
                >
                  ↻ Girar Espejos (360°)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Plano base del suelo reflectante */}
        <div className="mirror-vault-floor" aria-hidden="true"></div>
      </div>
    </section>
  );
}
