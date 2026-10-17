"use client";

import { useEffect, useRef } from "react";

export default function GoldenThreadCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animId: number;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const mouse = {
      x: width / 2,
      y: height / 2,
      prevX: width / 2,
      prevY: height / 2,
      speed: 0,
      active: false,
    };

    // Física de hebra de seda con 32 puntos
    const POINT_COUNT = 32;
    const points: { x: number; y: number; vx: number; vy: number }[] = [];
    for (let i = 0; i < POINT_COUNT; i++) {
      points.push({ x: mouse.x, y: mouse.y, vx: 0, vy: 0 });
    }

    // Micro-partículas de chispas doradas
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      decay: number;
    }
    const particles: Particle[] = [];
    const MAX_PARTICLES = 45;

    const spawnGoldDust = (x: number, y: number, count = 2) => {
      for (let i = 0; i < count; i++) {
        if (particles.length > MAX_PARTICLES) particles.shift();
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.2 + 0.5;
        particles.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.3,
          size: Math.random() * 2 + 0.8,
          alpha: 1,
          decay: Math.random() * 0.03 + 0.015,
        });
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouse.active = true;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      const dx = mouse.x - mouse.prevX;
      const dy = mouse.y - mouse.prevY;
      mouse.speed = Math.sqrt(dx * dx + dy * dy);

      if (mouse.speed > 6) {
        spawnGoldDust(mouse.x, mouse.y, Math.min(2, Math.floor(mouse.speed / 10) + 1));
      }
    };

    window.addEventListener("pointermove", handlePointerMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (mouse.active) {
        // Actualizar primer punto hacia el cursor
        points[0].x += (mouse.x - points[0].x) * 0.45;
        points[0].y += (mouse.y - points[0].y) * 0.45;

        // Propagar tensión hacia el resto de la hebra
        for (let i = 1; i < POINT_COUNT; i++) {
          const prev = points[i - 1];
          const curr = points[i];
          curr.vx = (prev.x - curr.x) * 0.38;
          curr.vy = (prev.y - curr.y) * 0.38;
          curr.x += curr.vx;
          curr.y += curr.vy;
        }

        // Dibujar el hilo de seda dorado continuo
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < POINT_COUNT - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }

        const grad = ctx.createLinearGradient(
          points[0].x,
          points[0].y,
          points[POINT_COUNT - 1].x,
          points[POINT_COUNT - 1].y
        );
        grad.addColorStop(0, "rgba(255, 241, 206, 0.95)");
        grad.addColorStop(0.3, "rgba(241, 183, 52, 0.75)");
        grad.addColorStop(0.8, "rgba(199, 146, 1, 0.35)");
        grad.addColorStop(1, "rgba(8, 62, 53, 0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.lineCap = "round";
        ctx.shadowColor = "#F1B734";
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Dibujar y actualizar partículas de chispas
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.fillStyle = `rgba(241, 183, 52, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 65,
      }}
      aria-hidden="true"
    />
  );
}
