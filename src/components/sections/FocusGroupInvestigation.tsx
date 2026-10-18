"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Clock,
  Ruler,
  ShieldAlert,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles,
  Maximize2,
  X,
  FileSpreadsheet,
  CheckCheck,
  Building2,
  Smartphone,
  Send,
  MapPin
} from "lucide-react";

interface FocusGroupProps {
  onOpenLightbox?: (src: string, title: string) => void;
}

export default function FocusGroupInvestigation({ onOpenLightbox }: FocusGroupProps) {
  // Estado para la simulación interactiva de WhatsApp
  const [chatStep, setChatStep] = useState<number>(4);
  const [isPlayingChat, setIsPlayingChat] = useState<boolean>(false);
  const [activeProblem, setActiveProblem] = useState<number | null>(null);
  const [selectedEvidence, setSelectedEvidence] = useState<{ src: string; title: string; subtitle: string } | null>(null);

  const chatMessages = [
    {
      id: 1,
      sender: "client",
      author: "Cliente (Participante Focus Group)",
      avatarText: "CL",
      time: "10:42 AM",
      text: "Hola, vi su catálogo web. Quisiera cotizar 15 metros de Drill Industrial color azul marino y 10 metros de Popelina blanca para unas muestras de uniformes corporativos. ¿Tienen stock y cuánto sería el costo?",
      badge: "Consulta de Muestra & Presupuesto"
    },
    {
      id: 2,
      sender: "seller",
      author: "Asesor Técnico GOLDTEX",
      avatarText: "GX",
      time: "10:43 AM",
      text: "¡Hola! Bienvenido a GOLDTEX. Sí, contamos con stock inmediato de ambas telas en la Galería Perla y Jr. Humboldt. Al ser una compra por metros variados, el Drill Industrial te sale a S/ 12.50 el metro y la Popelina a S/ 8.50. Nuestro Drill tiene un ancho exacto de 1.50 metros, lo que te permitirá optimizar tus cortes sin desperdiciar material. ¿Te confirmo el pedido para enviarte el código QR de Yape/Plin o transferencia BCP?",
      badge: "Asesoría Técnica + Cotización + QR Yape/BCP",
      specsSnippet: {
        drill: "Drill Industrial: 1.50m ancho útil · Cero merma",
        popelina: "Popelina Blanca: S/ 8.50 / metro",
        stock: "Disponibilidad inmediata en Gamarra"
      }
    },
    {
      id: 3,
      sender: "client",
      author: "Cliente (Participante Focus Group)",
      avatarText: "CL",
      time: "10:45 AM",
      text: "Bien, el ancho de 1.50 m me da perfecto para los delantales. Hago el pago por Yape ahora mismo. ¿Me lo pueden enviar hoy por la tarde a mi taller en Los Olivos o despacharlo a la agencia?",
      badge: "Cierre de Venta con Yape Express"
    },
    {
      id: 4,
      sender: "seller",
      author: "Asesor Técnico GOLDTEX",
      avatarText: "GX",
      time: "10:46 AM",
      text: "¡Perfecto! Una vez recibido tu comprobante de pago, pasamos el pedido al área de corte y embalaje. Al ser cliente de Lima, tu pedido sale en nuestra ruta de reparto express y llega a tu taller en menos de 24 horas. ¡Gracias por confiar en nosotros para tu emprendimiento!",
      badge: "Ruta Express < 24 hrs a Taller"
    }
  ];

  // Control de reproducción automática del chat
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingChat) {
      if (chatStep < chatMessages.length) {
        timer = setTimeout(() => {
          setChatStep((prev) => prev + 1);
        }, 1800);
      } else {
        setIsPlayingChat(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isPlayingChat, chatStep]);

  const handleStartPlay = () => {
    setChatStep(1);
    setIsPlayingChat(true);
  };

  const handleResetChat = () => {
    setIsPlayingChat(false);
    setChatStep(4);
  };

  const problemsData = [
    {
      id: 0,
      icon: Clock,
      title: "Pérdida de Tiempo en Gamarra",
      stat: "4 a 6 horas perdidas",
      statLabel: "por visita presencial",
      friction: "Recorrer galería por galería, cotizando local por local bajo congestión y cargando rollos de tela.",
      quote: "«Buscar telas en Gamarra te quita medio día de trabajo en el taller solo para encontrar el tono exacto.»",
      solutionTitle: "Catálogo Web + WhatsApp Directo",
      solutionDesc: "Consulta digital en 2 minutos, validación de stock en tiempo real y despacho directo sin salir del taller.",
      accent: "#F1B734"
    },
    {
      id: 1,
      icon: Ruler,
      title: "Falta de Información Técnica",
      stat: "35% merma promedio",
      statLabel: "en talleres por corte impreciso",
      friction: "Comprar sin saber el ancho exacto ni la composición real, generando desperdicio de tela y costos ocultos.",
      quote: "«Te venden diciendo que tiene 1.50m y al desenrollar mide 1.42m; eso arruina el tizado del corte.»",
      solutionTitle: "Fichas con Ancho Útil Garantizado",
      solutionDesc: "Especificación técnica verificada (1.50 m exactos) para cálculo milimétrico de moldes y optimización total.",
      accent: "#4ade80"
    },
    {
      id: 2,
      icon: Smartphone,
      title: "Atención Digital Lenta y Fría",
      stat: "> 24 hrs de espera",
      statLabel: "en canales informales",
      friction: "Empresas textiles tradicionales que tardan horas o días en responder mensajes y no atienden pedidos fraccionados.",
      quote: "«Escribes a cotizar y te contestan al día siguiente cuando ya perdiste el pedido con tu cliente.»",
      solutionTitle: "Respuesta Express & Cierre Yape/BCP",
      solutionDesc: "Asesor asignado en WhatsApp Business, confirmación inmediata con QR y seguimiento de despacho.",
      accent: "#38bdf8"
    },
    {
      id: 3,
      icon: ShieldAlert,
      title: "Miedo al Rendimiento & Calidad",
      stat: "Riesgo de devolución",
      statLabel: "por tela que encoge o destiñe",
      friction: "Incertidumbre de adquirir metros de tela que al lavar pierdan textura, solidez de color o resistencia.",
      quote: "«Si la popelina o el drill encogen en la confección, el cliente nos rechaza todo el lote de uniformes.»",
      solutionTitle: "Venta Flexible desde Metros + Respaldo",
      solutionDesc: "Compra exacta desde pocos metros para pruebas de laboratorio y muestras antes de invertir en volumen.",
      accent: "#f59e0b"
    }
  ];

  return (
    <section className="section-block relative" id="focus-group">
      {/* Glow ambiental de fondo */}
      <div 
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 pointer-events-none opacity-25 blur-3xl"
        style={{
          background: "radial-gradient(ellipse at center, rgba(241,183,52,0.18) 0%, rgba(8,62,53,0.3) 50%, transparent 80%)"
        }}
      />

      {/* Header Superior de la Sección */}
      <div className="relative z-10 mb-10 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[rgba(241,183,52,0.35)] bg-[rgba(8,62,53,0.45)] backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(241,183,52,0.12)]">
          <span className="w-2 h-2 rounded-full bg-[var(--gold-caramel)] animate-pulse" />
          <span className="text-xs uppercase tracking-widest font-semibold text-[var(--gold-caramel)]">
            Investigación Primaria & Trabajo de Campo
          </span>
        </div>

        <h2 className="section-title-xl mb-4 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[var(--ivory)] leading-tight tracking-tight">
          Focus Group & <span className="text-[var(--gold-caramel)] italic">Principales Problemas</span>
        </h2>

        <p className="text-base sm:text-lg text-[rgba(244,243,243,0.85)] max-w-3xl mx-auto leading-relaxed font-light">
          Realizamos una investigación exhaustiva triangulando encuestas cuantitativas mediante{" "}
          <strong className="text-[var(--gold-caramel)] font-medium">Google Forms</strong>, sesiones cualitativas de{" "}
          <strong className="text-[var(--gold-caramel)] font-medium">Focus Group</strong> con confeccionistas reales, y un análisis profundo omnicanal de Goldtex (Facebook Meta, importaciones Veritrade y catálogo físico de Gamarra).
        </p>
      </div>

      {/* =========================================================================
          BLOQUE 1: LA TRIANGULACIÓN METODOLÓGICA (3 PILARES BENTO)
          ========================================================================= */}
      <div className="mb-16 relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4 border-b border-[rgba(241,183,52,0.15)] pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--gold-caramel)]">Metodología 360°</span>
            <h3 className="text-xl sm:text-2xl font-serif text-[var(--ivory)] mt-0.5">Cómo Investigamos el Ecosistema Textil</h3>
          </div>
          <button
            onClick={() => setSelectedEvidence({
              src: "/assets/evidencias/ev1/ev1_page_05.png",
              title: "Cómo Investigamos · Evidencia 01 (Pág. 5)",
              subtitle: "Ficha oficial de metodología de investigación de mercados Goldtex"
            })}
            className="inline-flex items-center gap-2 text-xs font-medium px-3.5 py-2 rounded-lg bg-[rgba(241,183,52,0.1)] hover:bg-[rgba(241,183,52,0.2)] text-[var(--gold-caramel)] border border-[rgba(241,183,52,0.25)] transition-all duration-300 cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Ver Lámina Oficial Pág. 5
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tarjeta 1: Google Forms */}
          <div className="group relative rounded-2xl border border-[rgba(241,183,52,0.2)] bg-[rgba(8,62,53,0.4)] backdrop-blur-md p-6 hover:border-[rgba(241,183,52,0.5)] transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[rgba(241,183,52,0.12)] border border-[rgba(241,183,52,0.3)] flex items-center justify-center text-[var(--gold-caramel)] group-hover:scale-110 transition-transform">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded-full bg-[rgba(241,183,52,0.15)] text-[var(--gold-caramel)] font-semibold">
                  Cuantitativo
                </span>
              </div>
              <h4 className="text-lg font-serif font-bold text-[var(--ivory)] mb-2">Encuestas Google Forms</h4>
              <p className="text-xs sm:text-sm text-[rgba(244,243,243,0.78)] leading-relaxed mb-4">
                Sondeo estructurado a confeccionistas independientes, talleres de Lima y clientes de provincias sobre frecuencia de compra, volumen habitual y fricciones de compra.
              </p>
              <div className="space-y-2 pt-2 border-t border-[rgba(241,183,52,0.1)]">
                <div className="flex items-center gap-2 text-xs text-[rgba(244,243,243,0.9)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--gold-caramel)] shrink-0" />
                  <span>Perfilación de clientes mayoristas vs. minoristas</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[rgba(244,243,243,0.9)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--gold-caramel)] shrink-0" />
                  <span>Validación de ticket promedio y recurrencia mensual</span>
                </div>
              </div>
            </div>
            <div className="mt-5 pt-3 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-xs text-[var(--gold-caramel)]">
              <span>Validación empírica</span>
              <span className="font-mono">100% Digital</span>
            </div>
          </div>

          {/* Tarjeta 2: Focus Group Presencial / Taller */}
          <div className="group relative rounded-2xl border border-[rgba(74,222,128,0.3)] bg-gradient-to-b from-[rgba(8,62,53,0.65)] to-[rgba(5,35,30,0.7)] backdrop-blur-md p-6 hover:border-[rgba(74,222,128,0.6)] transition-all duration-300 hover:shadow-[0_12px_32px_rgba(8,62,53,0.5)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[rgba(74,222,128,0.15)] border border-[rgba(74,222,128,0.35)] flex items-center justify-center text-[#4ade80] group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded-full bg-[rgba(74,222,128,0.18)] text-[#4ade80] font-semibold">
                  Cualitativo
                </span>
              </div>
              <h4 className="text-lg font-serif font-bold text-[var(--ivory)] mb-2">Focus Group con Confeccionistas</h4>
              <p className="text-xs sm:text-sm text-[rgba(244,243,243,0.78)] leading-relaxed mb-4">
                Mesa de trabajo y simulación directa con diseñadores y emprendedores de prendas. Evaluación táctil de Popelina, Drill Industrial y experiencia real en mostrador.
              </p>
              <div className="space-y-2 pt-2 border-t border-[rgba(74,222,128,0.15)]">
                <div className="flex items-center gap-2 text-xs text-[rgba(244,243,243,0.9)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4ade80] shrink-0" />
                  <span>Detección de dolor al comprar tela sin ancho exacto</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[rgba(244,243,243,0.9)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4ade80] shrink-0" />
                  <span>Simulación de compra vía WhatsApp & despacho a taller</span>
                </div>
              </div>
            </div>
            <div className="mt-5 pt-3 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-xs text-[#4ade80]">
              <span>Sesiones presenciales</span>
              <span className="font-mono">Taller & Muestrario</span>
            </div>
          </div>

          {/* Tarjeta 3: Inteligencia Veritrade + Meta */}
          <div className="group relative rounded-2xl border border-[rgba(241,183,52,0.2)] bg-[rgba(8,62,53,0.4)] backdrop-blur-md p-6 hover:border-[rgba(241,183,52,0.5)] transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[rgba(56,189,248,0.12)] border border-[rgba(56,189,248,0.3)] flex items-center justify-center text-[#38bdf8] group-hover:scale-110 transition-transform">
                  <Search className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded-full bg-[rgba(56,189,248,0.15)] text-[#38bdf8] font-semibold">
                  Inteligencia Comercial
                </span>
              </div>
              <h4 className="text-lg font-serif font-bold text-[var(--ivory)] mb-2">Auditoría Omnicanal & Aduanas</h4>
              <p className="text-xs sm:text-sm text-[rgba(244,243,243,0.78)] leading-relaxed mb-4">
                Cruce de data de importación textil en Veritrade (volumen y aranceles), escucha activa en Facebook Meta y contraste entre catálogo físico vs. oferta digital.
              </p>
              <div className="space-y-2 pt-2 border-t border-[rgba(56,189,248,0.15)]">
                <div className="flex items-center gap-2 text-xs text-[rgba(244,243,243,0.9)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                  <span>Veritrade: Mapeo de insumos de alta rotación</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[rgba(244,243,243,0.9)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                  <span>Facebook & Gamarra: Brecha digital en el mostrador</span>
                </div>
              </div>
            </div>
            <div className="mt-5 pt-3 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-xs text-[#38bdf8]">
              <span>Data aduanera & social</span>
              <span className="font-mono">Veritrade + Meta</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BLOQUE 2: SIMULACIÓN INTERACTIVA DE COMPRA WHATSAPP (VENDEDOR · CLIENTE)
          ========================================================================= */}
      <div className="mb-20 relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4 border-b border-[rgba(241,183,52,0.15)] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--gold-caramel)]">Simulación en Vivo</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Interacción Validada
              </span>
            </div>
            <h3 className="text-xl sm:text-3xl font-serif text-[var(--ivory)] mt-0.5">
              Simulación — Interacción Vendedor · Cliente
            </h3>
            <p className="text-xs sm:text-sm text-[rgba(244,243,243,0.7)] mt-1">
              Transcripción interactiva del diálogo de cotización, especificación técnica y cierre express obtenido en el Focus Group.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleStartPlay}
              disabled={isPlayingChat}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg bg-[var(--gold-caramel)] hover:bg-[#ffd166] text-[#001A15] transition-all shadow-md disabled:opacity-50 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Reproducir Diálogo
            </button>
            <button
              onClick={handleResetChat}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.14)] text-[var(--ivory)] border border-[rgba(255,255,255,0.15)] transition-all cursor-pointer"
              title="Mostrar todos los mensajes"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reiniciar
            </button>
            <button
              onClick={() => setSelectedEvidence({
                src: "/assets/evidencias/ev1/ev1_page_06.png",
                title: "Simulación Focus Group · Evidencia 01 (Pág. 6)",
                subtitle: "Lámina oficial con transcripción textual del diálogo vendedor-cliente"
              })}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-[rgba(241,183,52,0.12)] hover:bg-[rgba(241,183,52,0.22)] text-[var(--gold-caramel)] border border-[rgba(241,183,52,0.25)] transition-all cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              Lámina Pág. 6
            </button>
          </div>
        </div>

        {/* Layout: Simulador WhatsApp a la izquierda + Panel de Análisis a la derecha */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Mockup iPhone / WhatsApp Premium */}
          <div className="lg:col-span-7 rounded-3xl border border-[rgba(241,183,52,0.35)] bg-[#031511] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.65)] backdrop-blur-xl">
            {/* Top Bar de WhatsApp */}
            <div className="bg-[#05261f] border-b border-[rgba(241,183,52,0.2)] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#083E35] border border-[var(--gold-caramel)] flex items-center justify-center font-bold text-sm text-[var(--gold-caramel)] shadow-inner">
                    GX
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#05261f]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-[var(--ivory)]">GOLDTEX · Jr. Humboldt</span>
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-[9px] text-[#001A15] inline-flex items-center justify-center font-black" title="Empresa Verificada">
                      ✓
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-medium">En línea · Asesoría Textil Inmediata</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-[rgba(244,243,243,0.6)]">
                <span className="hidden sm:inline px-2 py-0.5 rounded bg-[rgba(241,183,52,0.1)] text-[var(--gold-caramel)] border border-[rgba(241,183,52,0.2)] font-mono text-[10px]">
                  WhatsApp Business
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
            </div>

            {/* Fecha del chat */}
            <div className="p-4 sm:p-6 space-y-4 min-h-[460px] bg-[radial-gradient(circle_at_top,_#041d17_0%,_#020f0c_100%)] relative">
              <div className="text-center">
                <span className="inline-block text-[11px] uppercase tracking-wider text-[rgba(244,243,243,0.5)] bg-[rgba(8,62,53,0.6)] px-3 py-1 rounded-full border border-[rgba(255,255,255,0.06)]">
                  Sesión Focus Group · Caso Real
                </span>
              </div>

              {/* Mensajes del Chat */}
              {chatMessages.slice(0, chatStep).map((msg) => {
                const isSeller = msg.sender === "seller";
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isSeller ? "items-start" : "items-end"} transition-all duration-500`}
                  >
                    <div className="text-[10px] text-[rgba(244,243,243,0.5)] mb-1 px-1 font-mono flex items-center gap-1.5">
                      <span className={isSeller ? "text-emerald-400 font-semibold" : "text-[var(--gold-caramel)] font-semibold"}>
                        {msg.author}
                      </span>
                      <span>·</span>
                      <span>{msg.time}</span>
                    </div>

                    <div
                      className={`max-w-[92%] sm:max-w-[85%] rounded-2xl p-4 shadow-lg text-xs sm:text-sm leading-relaxed ${
                        isSeller
                          ? "bg-[rgba(8,62,53,0.85)] border border-[rgba(74,222,128,0.35)] text-[var(--ivory)] rounded-tl-sm shadow-[0_4px_20px_rgba(8,62,53,0.4)]"
                          : "bg-gradient-to-br from-[#12392f] to-[#0a2720] border border-[rgba(241,183,52,0.45)] text-[var(--ivory)] rounded-tr-sm shadow-[0_4px_20px_rgba(241,183,52,0.15)]"
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>

                      {/* Snippet técnico enriquecido si es el vendedor */}
                      {msg.specsSnippet && (
                        <div className="mt-3 p-2.5 rounded-xl bg-[rgba(0,18,14,0.65)] border border-[rgba(74,222,128,0.25)] text-xs space-y-1 font-mono">
                          <div className="text-[10px] uppercase tracking-wider text-[var(--gold-caramel)] font-semibold flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-[var(--gold-caramel)]" /> Ficha Técnica Directa:
                          </div>
                          <div className="text-emerald-300">✓ {msg.specsSnippet.drill}</div>
                          <div className="text-[rgba(244,243,243,0.85)]">✓ {msg.specsSnippet.popelina}</div>
                          <div className="text-[var(--gold-caramel)]">✓ {msg.specsSnippet.stock}</div>
                        </div>
                      )}

                      {/* Footer de burbuja con checks */}
                      <div className="mt-2 pt-1 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-[10px] text-[rgba(244,243,243,0.55)]">
                        <span className="italic font-light">{msg.badge}</span>
                        <div className="flex items-center gap-1 text-sky-400 font-mono">
                          <span>{msg.time}</span>
                          <CheckCheck className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Indicador de escribiendo si está en reproducción */}
              {isPlayingChat && chatStep < chatMessages.length && (
                <div className="flex items-center gap-2 text-xs text-[var(--gold-caramel)] bg-[rgba(8,62,53,0.7)] px-3 py-2 rounded-full w-fit border border-[rgba(241,183,52,0.2)] animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-[var(--gold-caramel)]" />
                  <span>El interlocutor está escribiendo...</span>
                </div>
              )}
            </div>

            {/* Input bar decorativa */}
            <div className="bg-[#05261f] border-t border-[rgba(241,183,52,0.15)] px-4 py-3 flex items-center justify-between gap-3 text-xs text-[rgba(244,243,243,0.5)]">
              <span className="truncate">Escribe un mensaje de cotización a Goldtex...</span>
              <div className="w-7 h-7 rounded-full bg-[var(--gold-caramel)] text-[#001A15] flex items-center justify-center shrink-0">
                <Send className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Columna Derecha: Claves de la Simulación & Foto Real de Gamarra */}
          <div className="lg:col-span-5 space-y-6">
            {/* Card Explicativa de Factores de Éxito */}
            <div className="rounded-2xl border border-[rgba(241,183,52,0.25)] bg-[rgba(8,62,53,0.5)] backdrop-blur-md p-6">
              <h4 className="text-lg font-serif font-bold text-[var(--ivory)] mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--gold-caramel)]" />
                Diagnóstico del Comportamiento de Compra
              </h4>
              <div className="space-y-3.5 text-xs sm:text-sm text-[rgba(244,243,243,0.82)]">
                <div className="p-3 rounded-xl bg-[rgba(0,18,14,0.45)] border border-[rgba(241,183,52,0.15)]">
                  <strong className="text-[var(--gold-caramel)] block mb-1">1. Requisito de Ancho Exacto (1.50 m):</strong>
                  El cliente decide el pedido al saber que el ancho optimiza sus patrones de corte sin merma para delantales corporativos.
                </div>
                <div className="p-3 rounded-xl bg-[rgba(0,18,14,0.45)] border border-[rgba(74,222,128,0.2)]">
                  <strong className="text-emerald-400 block mb-1">2. Inmediatez de Pago por Yape / QR:</strong>
                  La eliminación de trámites burocráticos y la confirmación vía captura reduce el ciclo de compra de días a menos de 5 minutos.
                </div>
                <div className="p-3 rounded-xl bg-[rgba(0,18,14,0.45)] border border-[rgba(56,189,248,0.2)]">
                  <strong className="text-sky-400 block mb-1">3. Ruta Express a Taller (&lt; 24h):</strong>
                  La promesa de entrega en Los Olivos evita que el confeccionista deba viajar a Gamarra a cargar peso.
                </div>
              </div>
            </div>

            {/* Thumbnail interactivo de la Lámina Oficial de Evidencia 01 Pág. 6 */}
            <div 
              onClick={() => setSelectedEvidence({
                src: "/assets/evidencias/ev1/ev1_page_06.png",
                title: "Evidencia 01 · Página 6 — Focus Group",
                subtitle: "Informe de Investigación de Mercados para Goldtex"
              })}
              className="group relative rounded-2xl overflow-hidden border border-[rgba(241,183,52,0.3)] bg-[#011410] cursor-pointer shadow-lg hover:border-[var(--gold-caramel)] transition-all"
            >
              <img
                src="/assets/evidencias/ev1/ev1_page_06.png"
                alt="Focus Group Evidencia 01 Pág 6"
                className="w-full h-44 object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00120E] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                <span className="text-[var(--ivory)] font-medium bg-[#083E35]/90 px-2.5 py-1 rounded-md border border-[rgba(241,183,52,0.3)]">
                  Ver lámina original (Pág. 6)
                </span>
                <span className="w-7 h-7 rounded-full bg-[var(--gold-caramel)] text-[#001A15] flex items-center justify-center shadow">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BLOQUE 3: PRINCIPALES PROBLEMAS DETECTADOS (MATRIZ INTERACTIVA 3D)
          ========================================================================= */}
      <div className="mb-20 relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4 border-b border-[rgba(241,183,52,0.15)] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--gold-caramel)]">Dolores vs. Solución</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Puntos de Fricción Críticos
              </span>
            </div>
            <h3 className="text-xl sm:text-3xl font-serif text-[var(--ivory)] mt-0.5">
              Principales Problemas Detectados
            </h3>
            <p className="text-xs sm:text-sm text-[rgba(244,243,243,0.7)] mt-1">
              Fricciones reales identificadas en el mercado de Gamarra y cómo la estrategia de Goldtex resuelve cada una.
            </p>
          </div>

          <button
            onClick={() => setSelectedEvidence({
              src: "/assets/evidencias/ev1/ev1_page_07.png",
              title: "Principales Problemas Detectados · Evidencia 01 (Pág. 7)",
              subtitle: "Registro fotográfico y hallazgos en tienda Goldtex de Gamarra"
            })}
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-lg bg-[rgba(241,183,52,0.12)] hover:bg-[rgba(241,183,52,0.22)] text-[var(--gold-caramel)] border border-[rgba(241,183,52,0.25)] transition-all cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Lámina Oficial Pág. 7
          </button>
        </div>

        {/* Grilla de 4 Problemas con diseño interactivo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {problemsData.map((prob) => {
            const Icon = prob.icon;
            const isHovered = activeProblem === prob.id;
            return (
              <div
                key={prob.id}
                onMouseEnter={() => setActiveProblem(prob.id)}
                onMouseLeave={() => setActiveProblem(null)}
                className={`group relative rounded-2xl border transition-all duration-300 p-6 backdrop-blur-md overflow-hidden ${
                  isHovered
                    ? "border-[var(--gold-caramel)] bg-gradient-to-br from-[rgba(8,62,53,0.85)] to-[#041a14] shadow-[0_16px_40px_rgba(0,0,0,0.6)] -translate-y-1"
                    : "border-[rgba(241,183,52,0.2)] bg-[rgba(8,62,53,0.45)] hover:border-[rgba(241,183,52,0.45)]"
                }`}
              >
                {/* Header del problema */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${prob.accent}18`,
                        borderColor: `${prob.accent}40`,
                        color: prob.accent
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[rgba(244,243,243,0.6)]">
                        Problema 0{prob.id + 1}
                      </span>
                      <h4 className="text-lg font-serif font-bold text-[var(--ivory)] leading-snug">
                        {prob.title}
                      </h4>
                    </div>
                  </div>

                  {/* Badge de impacto estadístico */}
                  <div className="text-right shrink-0">
                    <span 
                      className="inline-block text-xs font-mono font-bold px-2.5 py-1 rounded-md border"
                      style={{
                        color: prob.accent,
                        backgroundColor: `${prob.accent}15`,
                        borderColor: `${prob.accent}30`
                      }}
                    >
                      {prob.stat}
                    </span>
                    <span className="block text-[9px] text-[rgba(244,243,243,0.5)] mt-0.5">{prob.statLabel}</span>
                  </div>
                </div>

                {/* Síntoma y Fricción */}
                <p className="text-xs sm:text-sm text-[rgba(244,243,243,0.78)] leading-relaxed mb-3">
                  {prob.friction}
                </p>

                {/* Cita textual del confeccionista */}
                <div className="p-3 rounded-xl bg-[rgba(0,18,14,0.55)] border border-[rgba(255,255,255,0.06)] text-xs text-[rgba(244,243,243,0.85)] italic mb-4">
                  {prob.quote}
                </div>

                {/* Solución Goldtex */}
                <div className="pt-3 border-t border-[rgba(241,183,52,0.15)] flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-400 block mb-0.5">
                      Solución Goldtex: {prob.solutionTitle}
                    </span>
                    <p className="text-[11px] sm:text-xs text-[rgba(244,243,243,0.7)] leading-relaxed">
                      {prob.solutionDesc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fila Fotográfica de Evidencia de Tienda en Gamarra */}
        <div className="rounded-2xl border border-[rgba(241,183,52,0.25)] bg-[rgba(8,62,53,0.35)] p-5 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 relative rounded-xl overflow-hidden border border-[rgba(241,183,52,0.3)] shadow-lg group">
              <img
                src="/assets/evidencias/ev1/ev1_page_07_img_01.jpeg"
                alt="Tienda Goldtex en Jr. Humboldt, Gamarra"
                className="w-full h-56 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 bg-[rgba(0,18,14,0.75)] backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] text-[var(--gold-caramel)] border border-[rgba(241,183,52,0.3)] font-mono flex items-center gap-1.5">
                <MapPin className="w-3 h-3" />
                Jr. Humboldt / Galería Perla · Gamarra
              </div>
              <button
                onClick={() => setSelectedEvidence({
                  src: "/assets/evidencias/ev1/ev1_page_07_img_01.jpeg",
                  title: "Tienda Física Goldtex en Gamarra",
                  subtitle: "Levantamiento visual in-situ del mostrador y afluencia de clientes"
                })}
                className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-[var(--gold-caramel)] text-[#001A15] flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="md:col-span-7">
              <div className="inline-flex items-center gap-1.5 text-xs text-[var(--gold-caramel)] font-mono uppercase tracking-wider mb-2">
                <Building2 className="w-3.5 h-3.5" />
                Validación Territorial
              </div>
              <h4 className="text-lg sm:text-xl font-serif font-bold text-[var(--ivory)] mb-2">
                El Puente entre el Mostrador Físico y el Ecosistema Digital
              </h4>
              <p className="text-xs sm:text-sm text-[rgba(244,243,243,0.8)] leading-relaxed mb-4">
                La presencia en Jr. Humboldt consolida el respaldo tangible de Goldtex: almacén propio, corte in-situ y atención experta. La nueva plataforma digital canaliza las cotizaciones antes de que el cliente gaste horas en el emporio, cerrando pedidos con despacho en 24h a cualquier distrito de Lima o agencia de provincia.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-[rgba(241,183,52,0.15)] text-center">
                <div className="p-2 rounded-lg bg-[rgba(0,18,14,0.4)] border border-[rgba(255,255,255,0.05)]">
                  <span className="block text-base font-bold text-[var(--gold-caramel)] font-mono">1.50 m</span>
                  <span className="text-[10px] text-[rgba(244,243,243,0.6)]">Ancho Exacto Garantizado</span>
                </div>
                <div className="p-2 rounded-lg bg-[rgba(0,18,14,0.4)] border border-[rgba(255,255,255,0.05)]">
                  <span className="block text-base font-bold text-[#4ade80] font-mono">&lt; 24h</span>
                  <span className="text-[10px] text-[rgba(244,243,243,0.6)]">Despacho Express Lima</span>
                </div>
                <div className="p-2 rounded-lg bg-[rgba(0,18,14,0.4)] border border-[rgba(255,255,255,0.05)] col-span-2 sm:col-span-1">
                  <span className="block text-base font-bold text-[#38bdf8] font-mono">Desde 1 m</span>
                  <span className="text-[10px] text-[rgba(244,243,243,0.6)]">Venta Flexible por Metros</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BLOQUE 4: INSIGHTS CLAVE DE LA INVESTIGACIÓN (BENTO ESTRATÉGICO)
          ========================================================================= */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4 border-b border-[rgba(241,183,52,0.15)] pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--gold-caramel)]">Estrategia & Conclusiones</span>
            <h3 className="text-xl sm:text-3xl font-serif text-[var(--ivory)] mt-0.5">
              Insights Clave de la Investigación
            </h3>
            <p className="text-xs sm:text-sm text-[rgba(244,243,243,0.7)] mt-1">
              Las 3 certezas operativas sobre las que se cimentó el Brief Creativo y la nueva identidad de Goldtex.
            </p>
          </div>

          <button
            onClick={() => setSelectedEvidence({
              src: "/assets/evidencias/ev1/ev1_page_08.png",
              title: "Insights Clave de la Investigación · Evidencia 01 (Pág. 8)",
              subtitle: "Resumen ejecutivo de pilares estratégicos para Goldtex"
            })}
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-lg bg-[rgba(241,183,52,0.12)] hover:bg-[rgba(241,183,52,0.22)] text-[var(--gold-caramel)] border border-[rgba(241,183,52,0.25)] transition-all cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Lámina Oficial Pág. 8
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Insight 1 */}
          <div className="relative rounded-2xl border border-[rgba(241,183,52,0.3)] bg-gradient-to-b from-[rgba(8,62,53,0.6)] to-[rgba(4,26,22,0.7)] p-6 backdrop-blur-md hover:border-[var(--gold-caramel)] transition-all group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-serif font-black text-[var(--gold-caramel)]">01</span>
                <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-[rgba(241,183,52,0.15)] text-[var(--gold-caramel)] font-semibold">
                  Pilar Técnico
                </span>
              </div>
              <h4 className="text-lg font-serif font-bold text-[var(--ivory)] mb-2 group-hover:text-[var(--gold-caramel)] transition-colors">
                Confianza Técnica
              </h4>
              <p className="text-xs sm:text-sm text-[rgba(244,243,243,0.8)] leading-relaxed mb-4">
                La información técnica verificada genera confianza inmediata. El cliente necesita conocer el ancho útil, gramaje y composición antes de cotizar para planificar su producción sin riesgos.
              </p>
            </div>
            <div className="pt-3 border-t border-[rgba(241,183,52,0.15)]">
              <span className="text-[11px] text-[var(--gold-caramel)] font-mono block">Impacto:</span>
              <span className="text-xs text-[rgba(244,243,243,0.9)]">+85% mayor probabilidad de cierre cuando hay ficha técnica visible.</span>
            </div>
          </div>

          {/* Insight 2 */}
          <div className="relative rounded-2xl border border-[rgba(74,222,128,0.3)] bg-gradient-to-b from-[rgba(8,62,53,0.6)] to-[rgba(4,26,22,0.7)] p-6 backdrop-blur-md hover:border-[#4ade80] transition-all group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-serif font-black text-[#4ade80]">02</span>
                <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-[rgba(74,222,128,0.15)] text-[#4ade80] font-semibold">
                  Canal de Conversión
                </span>
              </div>
              <h4 className="text-lg font-serif font-bold text-[var(--ivory)] mb-2 group-hover:text-[#4ade80] transition-colors">
                Cierre por WhatsApp
              </h4>
              <p className="text-xs sm:text-sm text-[rgba(244,243,243,0.8)] leading-relaxed mb-4">
                WhatsApp Business es el canal definitivo para el cierre comercial. Permite una interacción fluida, envío de fotos en alta resolución de la tela, confirmación de stock y cobro rápido con QR.
              </p>
            </div>
            <div className="pt-3 border-t border-[rgba(74,222,128,0.15)]">
              <span className="text-[11px] text-[#4ade80] font-mono block">Impacto:</span>
              <span className="text-xs text-[rgba(244,243,243,0.9)]">Tiempo de respuesta promedio menor a 3 minutos eleva el cierre en un 40%.</span>
            </div>
          </div>

          {/* Insight 3 */}
          <div className="relative rounded-2xl border border-[rgba(56,189,248,0.3)] bg-gradient-to-b from-[rgba(8,62,53,0.6)] to-[rgba(4,26,22,0.7)] p-6 backdrop-blur-md hover:border-[#38bdf8] transition-all group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-serif font-black text-[#38bdf8]">03</span>
                <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-[rgba(56,189,248,0.15)] text-[#38bdf8] font-semibold">
                  Modelo Comercial
                </span>
              </div>
              <h4 className="text-lg font-serif font-bold text-[var(--ivory)] mb-2 group-hover:text-[#38bdf8] transition-colors">
                Venta por Metros
              </h4>
              <p className="text-xs sm:text-sm text-[rgba(244,243,243,0.8)] leading-relaxed mb-4">
                La venta flexible fraccionada favorece la tracción de diseñadores independientes, estudiantes y marcas emergentes, convirtiéndolos en clientes recurrentes cuando escalan a fardos cerrados.
              </p>
            </div>
            <div className="pt-3 border-t border-[rgba(56,189,248,0.15)]">
              <span className="text-[11px] text-[#38bdf8] font-mono block">Impacto:</span>
              <span className="text-xs text-[rgba(244,243,243,0.9)]">Fidelización desde la fase de prototipo hacia la producción continua.</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MODAL LIGHTBOX MUSEOGRÁFICO DE LÁMINAS DE EVIDENCIA
          ========================================================================= */}
      {selectedEvidence && (
        <div 
          className="fixed inset-0 z-50 bg-[#00120E]/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setSelectedEvidence(null)}
        >
          <div 
            className="relative max-w-5xl w-full bg-[#031d17] border border-[rgba(241,183,52,0.4)] rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div className="px-6 py-4 bg-[#05261f] border-b border-[rgba(241,183,52,0.2)] flex items-center justify-between">
              <div>
                <h4 className="text-base sm:text-lg font-serif font-bold text-[var(--ivory)]">
                  {selectedEvidence.title}
                </h4>
                <p className="text-xs text-[rgba(244,243,243,0.65)]">{selectedEvidence.subtitle}</p>
              </div>
              <button
                onClick={() => setSelectedEvidence(null)}
                className="w-9 h-9 rounded-full bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.15)] text-[var(--ivory)] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Imagen en Alta Definición */}
            <div className="p-4 sm:p-6 bg-[#010c09] flex items-center justify-center max-h-[75vh] overflow-auto">
              <img
                src={selectedEvidence.src}
                alt={selectedEvidence.title}
                className="max-h-[70vh] w-auto object-contain rounded-xl shadow-2xl border border-[rgba(255,255,255,0.08)]"
              />
            </div>

            {/* Footer con metadata */}
            <div className="px-6 py-3 bg-[#05261f] border-t border-[rgba(241,183,52,0.15)] flex items-center justify-between text-xs text-[var(--gold-caramel)]">
              <span>Informe Oficial de Investigación · Goldtex Textiles</span>
              <span className="font-mono">Evidencia 01</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
