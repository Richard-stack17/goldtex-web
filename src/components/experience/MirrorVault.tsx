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
    title: "Patrones & Texturas",
    desc: "Nervaduras textiles botánicas y tramas jacquard estructuradas.",
  },
  {
    src: "/assets/evidencias/ev3/ev3_page_06.png",
    tag: "Evidencia 03 · Pág. 6",
    title: "Aplicación Textil",
    desc: "Composición de moda editorial y confección de sastrería de alta gama.",
  },
  {
    src: "/assets/evidencias/ev3/ev3_page_07.png",
    tag: "Evidencia 03 · Pág. 7",
    title: "Recursos Gráficos",
    desc: "Sistemas modulares y retículas de soporte para campaña publicitaria.",
  },
  {
    src: "/assets/evidencias/ev3/ev3_page_08.png",
    tag: "Evidencia 03 · Pág. 8",
    title: "Fotografía & Acabados",
    desc: "Iluminación volumétrica y contraste de brillo en telas satinadas.",
  },
  {
    src: "/boceto_campana.png",
    tag: "Proceso Creativo",
    title: "Boceto Conceptual",
    desc: "Planteamiento inicial a mano alzada de la silueta en la tienda Goldtex.",
  },
  {
    src: "/la_decision_segura.png",
    tag: "Arte Final · Key Visual",
    title: "La Decisión Segura",
    desc: "Materialización fotográfica con halo dorado volumétrico y frontis verde.",
  },
  {
    src: "/key_visual.png",
    tag: "Pieza Maestra 01",
    title: "Traje & Movimiento",
    desc: "Fusión de dinamismo, alta sastrería y telas flotantes que desafían la gravedad.",
  },
  {
    src: "/key_visual_2.png",
    tag: "Pieza Maestra 02",
    title: "Tapicería & Espacios",
    desc: "Aplicación textil contemporánea a mobiliario de lujo con tejidos oscuros.",
  },
  {
    src: "/moodboard.jpg",
    tag: "Dirección de Arte",
    title: "Moodboard Gamarra",
    desc: "Atmósfera conceptual, texturas crudas y sofisticación cosmopolita.",
  },
  {
    src: "/chica.jpg",
    tag: "Pieza Central · Musa",
    title: "Textile Artistry",
    desc: "La bailarina textil: donde nace la inspiración para grandes creadores.",
  },
];

export default function MirrorVault() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const reflectionRingRef = useRef<HTMLDivElement | null>(null);
  const [selectedItem, setSelectedItem] = useState<MirrorItem>(MIRROR_ITEMS[11]);
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

    // Rotación vinculada al scroll (Pin ScrollTrigger)
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=2200",
      pin: true,
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
          Evidencia 03 • Espacio 360° Inmersivo
        </span>
        <h2 className="section-title-xl" style={{ margin: "0.5rem 0 0.3rem" }}>
          La Bóveda de Espejos Goldtex
        </h2>
        <p className="mirror-vault-subtitle">
          Anillo curvo de 12 espejos flotantes con suelo de obsidiana reflectante.
          <span className="mirror-drag-hint"> (Arrastra con el ratón o desliza con el scroll para girar en 360°)</span>
        </p>
      </div>

      <div
        className="mirror-vault-stage"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
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

        {/* 2. Suelo Reflectante de Obsidiana con Espejo Invertido (scaleY(-1)) */}
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

        {/* 3. Tarjeta Maestra Central con Efecto 3D Pop-Out de la Bailarina */}
        <div className="mirror-master-card" data-tilt data-tilt-max="8">
          <div className="master-card-frame">
            {/* Imagen base en el marco del espejo */}
            <img
              src="/chica.jpg"
              alt="Musa Textil Goldtex — Donde nace la inspiración"
              className="master-card-base"
            />
            {/* Capa Pop-Out recortada que sobresale un 18% hacia arriba y a los lados */}
            <img
              src="/chica.jpg"
              alt=""
              className="master-card-popout"
              aria-hidden="true"
            />
            {/* Halo y gradiente de cristal inferior */}
            <div className="master-card-overlay">
              <span className="experience-tag" style={{ background: "rgba(241,183,52,0.9)", color: "#001a15" }}>
                PIEZA MAESTRA · 3D POP-OUT
              </span>
              <h3 className="master-card-title">“Donde Nace la Inspiración”</h3>
              <p className="master-card-desc">
                {selectedItem.title} — {selectedItem.desc}
              </p>
              <div className="master-card-actions">
                <button
                  type="button"
                  className="master-rotate-btn"
                  onClick={() => {
                    const next = (currentAngle + 30) % 360;
                    setCurrentAngle(next);
                    if (ringRef.current) gsap.to(ringRef.current, { rotateY: next, duration: 0.6 });
                    if (reflectionRingRef.current) gsap.to(reflectionRingRef.current, { rotateY: next, duration: 0.6 });
                  }}
                >
                  ↻ Girar Siguiente Espejo
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
