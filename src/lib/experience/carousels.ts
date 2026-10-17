// @ts-nocheck
/* Port verbatim de script2: carruseles propios (.evidencia-* via .carousel-*) + Swiper coverflow (#swiper-keyvisual).
   Fase 1 de migración: fidelidad 1:1. TODO: typing progresivo. */
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

export interface CarouselsHandle { dispose(): void; }

export function initCarousels(): CarouselsHandle {

    function initCarousel(root) {
        var track = root.querySelector(".carousel-track");
        var slides = Array.prototype.slice.call(root.querySelectorAll(".carousel-slide"));
        var dots = Array.prototype.slice.call(root.querySelectorAll(".carousel-dot"));
        var prev = root.querySelector(".carousel-prev");
        var next = root.querySelector(".carousel-next");
        var currentEl = root.querySelector(".carousel-current");
        if (!track || slides.length < 2) { return; }

        var index = 0;
        var startX = null;

        function goTo(i) {
            index = ((i % slides.length) + slides.length) % slides.length;
            track.style.transform = "translateX(-" + (index * 100) + "%)";
            slides.forEach(function (s, k) {
                s.classList.toggle("is-active", k === index);
            });
            dots.forEach(function (d, k) {
                d.classList.toggle("is-active", k === index);
                d.setAttribute("aria-selected", k === index ? "true" : "false");
            });
            if (currentEl) {
                currentEl.textContent = String(index + 1).padStart(2, "0");
            }
            startAutoplay();
        }

        if (prev) { prev.addEventListener("click", function () { goTo(index - 1); }); }
        if (next) { next.addEventListener("click", function () { goTo(index + 1); }); }
        dots.forEach(function (d, k) {
            d.addEventListener("click", function () { goTo(k); });
        });

        // Navegación por teclado
        root.setAttribute("tabindex", "0");
        root.addEventListener("keydown", function (e) {
            if (e.key === "ArrowLeft") { goTo(index - 1); }
            if (e.key === "ArrowRight") { goTo(index + 1); }
        });

        // Reproducción automática (se pausa al interactuar o salir de la pestaña)
        var AUTOPLAY_MS = 6000;
        var autoplayTimer = null;
        function stopAutoplay() {
            if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
        }
        function startAutoplay() {
            stopAutoplay();
            autoplayTimer = setInterval(function () { goTo(index + 1); }, AUTOPLAY_MS);
            // Registro de dispose (toque mínimo): guardamos el ÚLTIMO handle del
            // intervalo en el propio raíz en el momento de crearlo. dispose() lee
            // ese registro; si stopAutoplay ya lo detuvo, hace clearInterval de un
            // handle muerto, lo cual es un no-op seguro (nada se "reconecta": el
            // valor se escribe solo al crear un intervalo NUEVO).
            root.__gtAutoplayTimer = autoplayTimer;
        }

        // Swipe táctil / arrastre
        var viewport = root.querySelector(".carousel-viewport");
        if (viewport) {
            viewport.addEventListener("pointerdown", function (e) { startX = e.clientX; stopAutoplay(); });
            viewport.addEventListener("pointerup", function (e) {
                if (startX === null) { return; }
                var dx = e.clientX - startX;
                if (Math.abs(dx) > 48) { goTo(index + (dx < 0 ? 1 : -1)); }
                startX = null;
            });
            viewport.addEventListener("pointerenter", stopAutoplay);
            viewport.addEventListener("pointerleave", startAutoplay);
        }

        // Pausar al navegar con teclado o cuando la pestaña está inactiva
        root.addEventListener("focusin", stopAutoplay);
        root.addEventListener("focusout", startAutoplay);
        // En el original este handler era una función anónima: así es imposible
        // retirar el listener de document. Para lograr un dispose() completo (el listener
        // global sobrevive al borrado del DOM y en re-montaje de StrictMode
        // reiniciaría el intervalo sobre nodos detached), lo levantamos a una
        // variable local y guardamos la referencia en el raíz para poder limpiarlo
        // en dispose(). Único desvío en initCarousel junto con el registro del
        // intervalo.
        var onVisibilityChange = function () {
            if (document.hidden) { stopAutoplay(); } else { startAutoplay(); }
        };
        document.addEventListener("visibilitychange", onVisibilityChange);
        root.__gtVisibilityHandler = onVisibilityChange;

        goTo(0);
    }

    var carouselRoots = document.querySelectorAll(".carousel");
    carouselRoots.forEach(initCarousel);

    // ================= INICIALIZACIÓN SWIPER 3D COVERFLOW =================
    var swiperKeyVisual = null;
    if (typeof Swiper !== "undefined") {
        // Desvío único aquí respecto al original: la instancia se captura (antes se
        // descartaba) para poder llamar a destroy() en dispose(). Con el import de
        // npm el "typeof Swiper !== undefined" siempre da true; se conserva por
        // fidelidad 1:1 con script2. La config va EXACTA (el bundle de npm
        // auto-habilita los módulos: sin clave "modules:", igual que el CDN v11).
        swiperKeyVisual = new Swiper(".goldtex-3d-swiper", {
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: "auto",
            loop: true,
            speed: 800,
            autoplay: {
                delay: 3200,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            coverflowEffect: {
                rotate: 22,
                stretch: 0,
                depth: 220,
                modifier: 1.2,
                /* Sin sombras internas de coverflow: el slide ya tiene box-shadow,
                   y los overlays de sombra pueden pintarse negros en algunos GPU. */
                slideShadows: false
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            }
        });
    }

    return {
        dispose: function () {
            // React borra el DOM al desmontar y con él los listeners ligados a los
            // elementos (click/keydown/pointer*/focus*), pero quedan dos fugas en un
            // re-montaje de StrictMode: el intervalo de autoplay y el listener
            // global de "visibilitychange", que en un re-montaje volvería a arrancar
            // el intervalo sobre nodos ya detached.
            //
            // Estrategia elegida (la menos invasiva que funciona): initCarousel, con
            // solo dos líneas extra, escribe su último handle de intervalo y su
            // handler de visibilitychange en el propio elemento raíz; aquí los
            // limpiamos recorriendo los roots del init. dispose() se llama desde el
            // cleanup del useEffect, cuando el DOM sigue montado, así que
            // carouselRoots (captura de document.querySelectorAll(".carousel") del
            // momento init) sigue resolviendo los nodos correctos incluso si la
            // estructura ya cambió. El destroy() del Swiper destruye también su
            // autoplay interno. El original no guardaba ninguna marca de
            // re-inicialización (no existe data-swiper-initialized ni guard similar),
            // así que NO añadimos nada por ese lado.
            carouselRoots.forEach(function (root) {
                if (root.__gtVisibilityHandler) {
                    document.removeEventListener("visibilitychange", root.__gtVisibilityHandler);
                    root.__gtVisibilityHandler = null;
                }
                if (root.__gtAutoplayTimer) {
                    clearInterval(root.__gtAutoplayTimer);
                    root.__gtAutoplayTimer = null;
                }
            });
            if (swiperKeyVisual) {
                swiperKeyVisual.destroy(true, true);
                swiperKeyVisual = null;
            }
        }
    };
}
