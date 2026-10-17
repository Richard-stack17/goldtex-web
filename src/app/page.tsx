/*
 * Página única Goldtex (migrada desde index.html).
 * Cada sección es un componente servidor que conserva el DOM/id original
 * (anclas de navegación #evidencia-1..3, #audiovisual, etc. intactas).
 * La capa de experiencia (WebGL + animaciones) se monta como <GoldtexExperience />.
 */
import GoldtexExperience from "@/components/experience/GoldtexExperience";
import Overlays from "@/components/sections/Overlays";
import Navigation from "@/components/sections/Navigation";
import SpatialHud from "@/components/experience/SpatialHud";
import Hero from "@/components/sections/Hero";
import Evidencia1 from "@/components/sections/Evidencia1";
import Evidencia2 from "@/components/sections/Evidencia2";
import Evidencia3 from "@/components/sections/Evidencia3";
import Evidencia4 from "@/components/sections/Evidencia4";
import DecoracionTendencias from "@/components/sections/DecoracionTendencias";
import ExperienceConfigurator from "@/components/sections/ExperienceConfigurator";
import Audiovisual from "@/components/sections/Audiovisual";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      {/* Capas cinemáticas: cortina de entrada, viñeta, aurora, lienzo WebGL */}
      <Overlays />

      {/* HUD Espacial Fijo a la Izquierda — Active Theory Telemetría */}
      <SpatialHud />

      <main>
        <Navigation />
        <Hero />
        <Evidencia1 />
        <Evidencia2 />
        <Evidencia3 />
        <Evidencia4 />
        <DecoracionTendencias />
        <ExperienceConfigurator />
        <Audiovisual />
        <Footer />
      </main>

      {/* Capa cliente: exhibidor 3D + Lenis/GSAP + acciones (data-action) */}
      <GoldtexExperience />
    </>
  );
}
