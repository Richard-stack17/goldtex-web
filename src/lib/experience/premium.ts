/*
 * Goldtex — Premium Scroll Experience (Wave 1)
 *
 * Capa de refinamiento premium que complementa showroom.ts:
 *  · Scroll-spy del nav (badge del capítulo activo brillante).
 *  · Timeline "Trayectoria" como scrollytelling pinneado en desktop
 *    (rail dorado que se llena, año-gigante fantasma que muta, nodos
 *    que despiertan secuencialmente) y stepper vertical en móvil.
 *  · Revelado editorial + parallax suave (sin recortes: la imagen se
 *    traslada entera, nunca se escala > 1 — regla del cliente).
 *
 * Todo lo creado aquí es reversible (dispose) para convivir con
 * React StrictMode (remontaje doble en dev).
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type PremiumHandle = { dispose: () => void };

export function initPremiumExperience(): PremiumHandle {
  const disposers: Array<() => void> = [];

  const ctx = gsap.context(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ------------------------------------------------------------
     * 1 · SCROLL-SPY — badge del nav del capítulo visible
     * ---------------------------------------------------------- */
    const badges = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(".nav-badge[href^='#']"),
    );
    const targets = badges
      .map((b) => document.querySelector(b.getAttribute("href") ?? "###"))
      .filter((el): el is Element => el !== null);

    if (badges.length && targets.length) {
      const ratios = new Map<Element, number>();
      const spy = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            const t: Element = e.target;
            ratios.set(t, e.isIntersecting ? e.intersectionRatio : 0);
          }
          let best = -1;
          let bestRatio = 0;
          targets.forEach((t, i) => {
            const r = ratios.get(t) ?? 0;
            if (r > bestRatio) {
              bestRatio = r;
              best = i;
            }
          });
          badges.forEach((b, i) =>
            b.classList.toggle("is-active", i === best && bestRatio > 0.1),
          );
        },
        { threshold: [0.1, 0.25, 0.5, 0.75] },
      );
      targets.forEach((t) => spy.observe(t));
      disposers.push(() => spy.disconnect());
    }

    /* ------------------------------------------------------------
     * 2 · TIMELINE v2 — trayectoria como tráiler
     *     Desktop: pin + rail que se llena + año fantasma mutante.
     *     Móvil: stepper vertical con rail que desciende.
     * ---------------------------------------------------------- */
    const track = document.querySelector<HTMLElement>(".timeline-v2");
    const fill = track?.querySelector<HTMLElement>("[data-tl-fill]") ?? null;
    const ghost = track?.querySelector<HTMLElement>("[data-tl-ghost]") ?? null;
    const current = track?.querySelector<HTMLElement>("[data-tl-current]") ?? null;
    const nodes = gsap.utils.toArray<HTMLElement>(
      ".timeline-node-v2",
      track ?? undefined,
    );
    const years = nodes.map((n) => n.dataset.tlYear ?? "");

    const applyStep = (progress: number) => {
      const n = Math.max(1, nodes.length);
      const idx = Math.min(nodes.length - 1, Math.max(0, Math.floor(progress * n * 1.02)));
      nodes.forEach((nd, k) => nd.classList.toggle("is-active", k === idx));
      if (ghost && years[idx]) ghost.textContent = years[idx];
      if (current) current.textContent = String(idx + 1).padStart(2, "0");
    };

    if (track && fill && nodes.length && !reduced) {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 901px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: track,
            start: "top 14%",
            end: "+=1500",
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => applyStep(self.progress),
          },
        });
        // nodos despiertan en cascada mientras el rail avanza
        tl.fromTo(
          nodes,
          { autoAlpha: 0.22, y: 26 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.62, ease: "power1.out" },
          0,
        );
        tl.to(
          fill,
          { scaleX: 1, duration: Math.max(0.5, nodes.length * 0.62), ease: "none" },
          0,
        );
        if (ghost) {
          tl.fromTo(
            ghost,
            { y: -18, opacity: 0.3 },
            { y: 16, opacity: 0.75, duration: Math.max(0.5, nodes.length * 0.62), ease: "none" },
            0,
          );
        }
        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      mm.add("(max-width: 900px)", () => {
        // rail vertical que desciende
        const st = ScrollTrigger.create({
          trigger: track,
          start: "top 72%",
          end: "bottom 45%",
          scrub: true,
          onUpdate: (self) => {
            fill.style.transform = `scaleY(${Math.max(0.001, self.progress)})`;
            applyStep(self.progress);
          },
        });
        // revelado de nodos al entrar (una sola vez)
        nodes.forEach((nd, i) =>
          gsap.fromTo(
            nd,
            { autoAlpha: 0, y: 26 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              delay: i * 0.02,
              ease: "power2.out",
              scrollTrigger: { trigger: nd, start: "top 88%", once: true },
            },
          ),
        );
        return () => {
          st.kill();
        };
      });

      disposers.push(() => mm.revert());
    } else if (nodes.length) {
      // reduced-motion: estado final legible, nada animado
      gsap.set(nodes, { autoAlpha: 1, y: 0 });
      if (fill) fill.style.transform = "scaleX(1)";
    }

    /* ------------------------------------------------------------
     * 3 · DECORACIÓN — revelado editorial + parallax de la escena
     *     (el marco nunca recorta: se traslada la imagen entera)
     * ---------------------------------------------------------- */
    const decor = document.querySelector<HTMLElement>(".editorial-decor-section");
    if (decor && !reduced) {
      const content = decor.querySelector(".editorial-content");
      if (content && content.children.length) {
        gsap.fromTo(
          Array.from(content.children),
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: { trigger: decor, start: "top 72%", once: true },
          },
        );
      }
      const visual = decor.querySelector(".editorial-visual");
      if (visual) {
        gsap.fromTo(
          visual,
          { autoAlpha: 0, x: 46, rotateY: 5 },
          {
            autoAlpha: 1,
            x: 0,
            rotateY: 0,
            duration: 1.25,
            ease: "power3.out",
            scrollTrigger: { trigger: decor, start: "top 68%", once: true },
          },
        );
        const img = decor.querySelector<HTMLElement>(".editorial-visual img");
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -6 },
            {
              yPercent: 7,
              ease: "none",
              scrollTrigger: {
                trigger: decor,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            },
          );
        }
        const badge = decor.querySelector<HTMLElement>(".editorial-badge-float, .decor-badge, .editorial-visual-badge");
        if (badge) {
          gsap.to(badge, {
            y: -7,
            repeat: -1,
            yoyo: true,
            duration: 2.4,
            ease: "sine.inOut",
          });
        }
      }
    }

    /* ------------------------------------------------------------
     * 4 · CONTACTO HONESTO — el CTA copia un mensaje de cotización
     *     real y los canales por-confirmar pulsan su nota informativa.
     * ---------------------------------------------------------- */
    const QUOTE =
      "Hola GOLDTEX, quiero cotizar telas por metros o fardos desde Gamarra. ¿Me pueden compartir stock, precios y despacho a Lima?";
    const cta = document.querySelector<HTMLButtonElement>("[data-copy-quote]");
    if (cta) {
      const toast = document.createElement("div");
      toast.className = "gt-toast";
      toast.setAttribute("role", "status");
      document.body.appendChild(toast);
      let hideT: number | undefined;
      const onCtaClick = async () => {
        try {
          await navigator.clipboard.writeText(QUOTE);
          toast.textContent = "✓ Mensaje de cotización copiado — pégalo en WhatsApp Business";
        } catch {
          toast.textContent = QUOTE;
        }
        toast.classList.add("is-on");
        window.clearTimeout(hideT);
        hideT = window.setTimeout(() => toast.classList.remove("is-on"), 3400);
      };
      cta.addEventListener("click", onCtaClick);
      disposers.push(() => {
        cta.removeEventListener("click", onCtaClick);
        window.clearTimeout(hideT);
        toast.remove();
      });
    }
    document
      .querySelectorAll<HTMLButtonElement>("[data-social-pending]")
      .forEach((b) => {
        const onPending = () => {
          const note = b
            .closest(".contact-cta")
            ?.querySelector<HTMLElement>(".pending-note");
          const target = note ?? document.querySelector<HTMLElement>(".pending-note");
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "center" });
            target.classList.add("is-flashing");
            window.setTimeout(() => target.classList.remove("is-flashing"), 1700);
          }
        };
        b.addEventListener("click", onPending);
        disposers.push(() => b.removeEventListener("click", onPending));
      });
  });

  /* ---- Dispose idempotente (StrictMode remonta dos veces en dev) ---- */
  const restore = () => {
    document
      .querySelectorAll<HTMLElement>(".timeline-node-v2.is-active")
      .forEach((el) => el.classList.remove("is-active"));
    const ghost = document.querySelector<HTMLElement>("[data-tl-ghost]");
    const firstYear = document
      .querySelector<HTMLElement>(".timeline-node-v2[data-tl-year]")
      ?.dataset.tlYear;
    if (ghost && firstYear) ghost.textContent = firstYear;
    const current = document.querySelector<HTMLElement>("[data-tl-current]");
    if (current) current.textContent = "01";
    document
      .querySelectorAll<HTMLElement>(".nav-badge.is-active")
      .forEach((el) => el.classList.remove("is-active"));
  };

  return {
    dispose() {
      for (const d of disposers) d();
      ctx.revert();
      restore();
    },
  };
}
