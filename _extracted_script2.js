    <script>
    (function () {
        "use strict";

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
            document.addEventListener("visibilitychange", function () {
                if (document.hidden) { stopAutoplay(); } else { startAutoplay(); }
            });

            goTo(0);
        }

        document.addEventListener("DOMContentLoaded", function () {
            document.querySelectorAll(".carousel").forEach(initCarousel);

            // ================= INICIALIZACIÓN SWIPER 3D COVERFLOW =================
            if (typeof Swiper !== "undefined") {
                new Swiper(".goldtex-3d-swiper", {
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
        });
    })();