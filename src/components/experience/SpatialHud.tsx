"use client";

import { useEffect, useState } from "react";

interface NavTarget {
  id: string;
  code: string;
  label: string;
}

const TARGETS: NavTarget[] = [
  { id: "evidencia-1", code: "[01]", label: "INVESTIGACIÓN & GAMARRA" },
  { id: "evidencia-2", code: "[02]", label: "ESTRATEGIA: LA DECISIÓN SEGURA" },
  { id: "evidencia-3", code: "[03]", label: "BÓVEDA DE ESPEJOS 3D (KEY VISUAL)" },
  { id: "evidencia-4", code: "[04]", label: "ECOSISTEMA TIKTOK & OOH" },
];

export default function SpatialHud() {
  const [activeId, setActiveId] = useState<string>("evidencia-1");
  const [camZ, setCamZ] = useState<number>(15.0);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;
      // Simula profundidad Z de la cámara
      setCamZ(Number((15.0 - progress * 24.5).toFixed(1)));

      // Determinar sección activa
      let current = TARGETS[0].id;
      for (const t of TARGETS) {
        const el = document.getElementById(t.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            current = t.id;
          }
        }
      }
      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWarp = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside
      className={`spatial-hud-left ${collapsed ? "is-collapsed" : ""}`}
      aria-label="Explorador Espacial Goldtex"
    >
      <div className="spatial-hud-header">
        <div className="spatial-hud-status">
          <span className="spatial-radar-dot" aria-hidden="true"></span>
          <span className="spatial-radar-text">TELEMETRÍA ORBITAL · 60 FPS</span>
        </div>
        <button
          type="button"
          className="spatial-hud-toggle"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expandir HUD" : "Minimizar HUD"}
          title={collapsed ? "Expandir HUD" : "Minimizar HUD"}
        >
          {collapsed ? "▲" : "▼"}
        </button>
      </div>

      <div className="spatial-hud-body">
        <div className="spatial-hud-brand">
          <span className="spatial-hud-kicker">ACTIVE THEORY · ENGINE</span>
          <h4 className="spatial-hud-title">EXPLORADOR ESPACIAL GOLDTEX</h4>
          <div className="spatial-hud-coords">
            <span>POS_Z: <strong>{camZ}m</strong></span>
            <span>FOV: <strong>45.0°</strong></span>
            <span>AXIS: <strong>SPATIAL_3D</strong></span>
          </div>
        </div>

        <nav className="spatial-hud-nav" aria-label="Navegación Rápida de Cámara">
          {TARGETS.map((t) => {
            const isActive = activeId === t.id;
            return (
              <button
                key={t.id}
                type="button"
                className={`spatial-hud-btn ${isActive ? "is-active" : ""}`}
                onClick={() => handleWarp(t.id)}
              >
                <span className="spatial-btn-code">{t.code}</span>
                <span className="spatial-btn-label">{t.label}</span>
                <span className="spatial-btn-indicator" aria-hidden="true"></span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
