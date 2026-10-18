"use client";

import { useState } from "react";

interface Milestone {
  year: string;
  name: string;
  desc: string;
  tag: string;
  stat: string;
}

const MILESTONES: Milestone[] = [
  {
    year: "2005",
    name: "Fundación",
    desc: "Nace Goldtex en Gamarra, Lima, como tienda de telas importadas, sentando las bases de calidad, honestidad y confianza textil.",
    tag: "Gamarra, La Victoria • Origen Textil",
    stat: "1er Local Comercial",
  },
  {
    year: "2008",
    name: "Importación Global",
    desc: "Diversificación estratégica del catálogo con textiles exclusivos de alta gama traídos directamente desde Asia y Europa.",
    tag: "Comercio Internacional • Red Global",
    stat: "+20 Familias de Telas",
  },
  {
    year: "2010",
    name: "Expansión Nacional",
    desc: "Apertura de canales de distribución hacia provincias clave: Arequipa, Trujillo y Chiclayo, consolidando la venta mayorista.",
    tag: "Cobertura Nacional • Distribución",
    stat: "3 Ciudades Principales",
  },
  {
    year: "2015",
    name: "Identidad de Marca",
    desc: "Nacimiento del lema insignia 'Telas Que Inspiran' y consolidación de la identidad visual corporativa orientada a confeccionistas.",
    tag: "Brand Book • Telas Que Inspiran",
    stat: "Identidad Consolidada",
  },
  {
    year: "2020",
    name: "Transformación Digital",
    desc: "Implementación integral de atención digital, asesoría remota y catálogo virtual con respuesta inmediata por WhatsApp Business.",
    tag: "WhatsApp Business • Canal Digital",
    stat: "Atención Digital 24/7",
  },
  {
    year: "2022",
    name: "Asesoramiento Técnico",
    desc: "Consultoría especializada para emprendedores y diseñadores sobre composición, caída, gramaje y rendimiento por metro.",
    tag: "Soporte Especializado • Confección",
    stat: "Consultoría de Telas",
  },
  {
    year: "2024",
    name: "Producción Local",
    desc: "Alianzas estratégicas con talleres y tejedurías peruanas para producción propia de telas básicas con altos estándares Goldtex.",
    tag: "Industria Peruana • Talleres Aliados",
    stat: "Manufactura Local",
  },
  {
    year: "2026",
    name: "Campaña Nacional",
    desc: "Iniciativas de Emprendimiento y lanzamiento de la línea exclusiva 'Emprende Fácil', impulsando a la nueva generación de creadores.",
    tag: "Emprende Fácil • Campaña 2026",
    stat: "Línea Exclusiva 2026",
  },
];

export default function TimelineSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const current = MILESTONES[activeIndex];
  const progressPercent = (activeIndex / (MILESTONES.length - 1)) * 100;

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(MILESTONES.length - 1, prev + 1));
  };

  return (
    <section
      id="historia"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 z-10 scroll-mt-28 text-left"
    >
      {/* Encabezado Editorial */}
      <div className="mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2.5 mb-3 px-3.5 py-1 rounded-full bg-[#F1B734]/10 border border-[#F1B734]/30 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#F1B734] shadow-[0_0_8px_#F1B734]"></span>
          <span className="text-[#F1B734] font-semibold text-xs uppercase tracking-[0.22em]">
            Trayectoria • Gamarra, Lima
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F4F3F3] font-bold tracking-tight mb-4">
          Casi dos décadas de textil peruano
        </h2>
        <p className="text-base sm:text-lg text-[#F4F3F3]/80 font-light max-w-3xl leading-relaxed">
          Desde su fundación en Gamarra hasta la campaña nacional, Goldtex ha crecido
          con los confeccionistas y emprendedores del Perú.
        </p>
      </div>

      {/* Riel interactivo horizontal con hilos dorados */}
      <div className="relative mb-8 pb-4">
        {/* Línea guía base */}
        <div className="absolute top-5 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#F1B734]/25 to-transparent hidden md:block"></div>

        {/* Línea de progreso dorado activo */}
        <div
          className="absolute top-5 left-6 h-[2px] bg-gradient-to-r from-[#8F6D1F] via-[#F1B734] to-[#FFE59A] shadow-[0_0_12px_rgba(241,183,52,0.8)] transition-all duration-500 hidden md:block"
          style={{ width: `calc(${progressPercent}% * 0.94)` }}
        ></div>

        {/* Nodos interactivos */}
        <div className="flex items-center justify-between overflow-x-auto pb-4 pt-1 md:overflow-visible no-scrollbar gap-5 md:gap-0 relative z-10 px-2">
          {MILESTONES.map((item, i) => {
            const isActive = i === activeIndex;
            const isPassed = i <= activeIndex;

            return (
              <button
                key={item.year}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Seleccionar hito ${item.year}: ${item.name}`}
                className="flex flex-col items-center group cursor-pointer focus:outline-none flex-shrink-0 transition-all duration-300 px-1"
              >
                {/* Indicador / Orb */}
                <div className="h-10 flex items-center justify-center">
                  {isActive ? (
                    <span className="w-5 h-5 rounded-full bg-[#F1B734] border-2 border-[#FFE59A] ring-4 ring-[#F1B734]/35 shadow-[0_0_20px_rgba(241,183,52,0.9)] scale-110 transition-all duration-300"></span>
                  ) : isPassed ? (
                    <span className="w-3.5 h-3.5 rounded-full bg-[#F1B734]/80 border-2 border-[#FFE59A]/60 group-hover:scale-125 transition-all duration-300"></span>
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full bg-[#00120E] border-2 border-[#F1B734]/40 group-hover:border-[#F1B734] group-hover:scale-125 transition-all duration-300"></span>
                  )}
                </div>

                {/* Año */}
                <span
                  className={`font-serif text-sm md:text-base font-bold tracking-wide transition-all duration-300 ${
                    isActive
                      ? "text-[#FFE59A] scale-110 drop-shadow-[0_0_8px_rgba(241,183,52,0.5)]"
                      : "text-[#F4F3F3]/60 group-hover:text-[#F4F3F3]"
                  }`}
                >
                  {item.year}
                </span>

                {/* Número correlativo */}
                <span className="text-[10px] tracking-widest text-[#F1B734]/60 font-mono mt-0.5">
                  0{i + 1}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tarjeta principal Spotlight */}
      <div className="relative rounded-3xl border border-[#F1B734]/30 bg-gradient-to-br from-[#083E35]/90 via-[#03241E]/95 to-[#00120E]/98 p-6 sm:p-10 md:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden transition-all duration-500">
        {/* Borde superior dorado luminoso */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FFE59A]/80 to-transparent"></div>

        {/* Año gigante watermark de fondo */}
        <div
          aria-hidden="true"
          className="absolute -right-4 -bottom-6 sm:-bottom-10 md:-bottom-14 text-[6.5rem] sm:text-[10rem] md:text-[13rem] font-serif font-black text-white/[0.04] select-none pointer-events-none leading-none"
        >
          {current.year}
        </div>

        {/* Fila superior de metadatos y controles */}
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10 mb-6 border-b border-white/10 pb-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-[#F1B734]/15 border border-[#F1B734]/40 text-[#F1B734] text-xs font-semibold tracking-widest uppercase font-mono">
              Hito 0{activeIndex + 1} de 0{MILESTONES.length}
            </span>
            <span className="text-[#F4F3F3]/70 text-xs tracking-wider uppercase font-medium">
              {current.tag}
            </span>
          </div>

          {/* Botones Anterior / Siguiente */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              disabled={activeIndex === 0}
              aria-label="Hito anterior"
              className="px-3 py-1.5 rounded-xl border border-[#F1B734]/40 bg-[#083E35]/60 text-[#F4F3F3] hover:bg-[#F1B734] hover:text-[#00120E] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Ant</span>
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={activeIndex === MILESTONES.length - 1}
              aria-label="Hito siguiente"
              className="px-3 py-1.5 rounded-xl border border-[#F1B734]/40 bg-[#083E35]/60 text-[#F4F3F3] hover:bg-[#F1B734] hover:text-[#00120E] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
            >
              <span>Sig</span>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Contenido principal del hito activo */}
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#F1B734] tracking-tight drop-shadow-[0_2px_15px_rgba(241,183,52,0.3)]">
              {current.year}
            </span>
            <span className="text-xs uppercase tracking-widest text-[#F1B734]/80 font-mono">
              • {current.stat}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-[#F4F3F3] tracking-wide uppercase mb-4">
            {current.name}
          </h3>
          <p className="text-base sm:text-lg text-[#F4F3F3]/90 font-light leading-relaxed">
            {current.desc}
          </p>
        </div>
      </div>

      {/* Resumen de los 8 hitos en mini-tarjetas clicables */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3 mt-6">
        {MILESTONES.map((m, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <button
              key={`card-${m.year}`}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`p-3 rounded-2xl text-left border transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "bg-[#F1B734]/20 border-[#F1B734] shadow-[0_0_20px_rgba(241,183,52,0.25)] ring-1 ring-[#F1B734]/50 translate-y-[-2px]"
                  : "bg-[#083E35]/30 border-white/10 hover:border-[#F1B734]/40 hover:bg-[#083E35]/50"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`font-serif text-base font-bold ${
                    isSelected ? "text-[#FFE59A]" : "text-[#F1B734]"
                  }`}
                >
                  {m.year}
                </span>
                <span className="text-[10px] text-white/40 font-mono">
                  0{idx + 1}
                </span>
              </div>
              <div
                className={`text-xs tracking-wide truncate ${
                  isSelected ? "text-white font-semibold" : "text-white/70 font-medium"
                }`}
              >
                {m.name}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
