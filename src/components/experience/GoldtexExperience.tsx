"use client";

/*
 * GoldtexExperience — capa de experiencia (la única parte cliente de la app).
 *
 * 1. Inicializa el port del showroom 3D (Three.js + Lenis + GSAP + video handlers).
 * 2. Inicializa los carruseles (propios + Swiper coverflow).
 * 3. Enlaza los botones del markup vía delegación de eventos sobre [data-action]:
 *    el HTML original usaba onclick="fn(args)"; en la migración cada botón lleva
 *    data-action="fn(args)" y este componente lo despacha al handler equivalente.
 *

 */
import { useEffect, useRef } from "react";
import {
  initShowroomExperience,
  type ShowroomActions,
  type ShowroomHandle,
} from "@/lib/experience/showroom";
import { initCarousels } from "@/lib/experience/carousels";

export default function GoldtexExperience() {
  const handlesRef = useRef<ShowroomHandle | null>(null);

  useEffect(() => {
    // Autoplay videos (Spots) ya asegurado dentro de initShowroomExperience.
    const showroom = initShowroomExperience();
    const carousels = initCarousels();
    handlesRef.current = showroom;

    // Delegación de acciones (equivalente fiel a los onclick inline originales)
    const dispatch = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest?.("[data-action]") as HTMLElement | null;
      if (!target) return;
      const raw = target.getAttribute("data-action");
      if (!raw) return;
      const match = raw.match(/^([A-Za-z_$][\w$]*)\s*\(([^)]*)\)$/);
      if (!match) return;
      const name = match[1];
      const argList = match[2].trim();
      const args: (string | number)[] = [];
      if (argList) {
        for (const piece of argList.split(",")) {
          const token = piece.trim().replace(/^['"]|['"]$/g, "");
          args.push(/^-?\d+(\.\d+)?$/.test(token) ? Number(token) : token);
        }
      }
      const action = showroom.actions[name as keyof ShowroomActions] as
        | ((...a: unknown[]) => void)
        | undefined;
      if (typeof action === "function") {
        // switch3DCamera / selectFabricPreset necesitan el botón clickeado
        // (el original lo sacaba del `event.currentTarget` del onclick inline).
        if (name === "switch3DCamera" || name === "selectFabricPreset") {
          action(...args, target);
        } else {
          action(...args);
        }
      }
    };

    document.addEventListener("click", dispatch);

    return () => {
      document.removeEventListener("click", dispatch);
      carousels.dispose();
      showroom.dispose();
      handlesRef.current = null;
    };
  }, []);

  // Renderiza nada: solo orquesta el DOM ya servido por los componentes servidor.
  return null;
}
