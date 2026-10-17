import type { Metadata, Viewport } from "next";
import "./globals.css";

/*
 * Layout raíz Goldtex (App Router).
 * Metadatos migrated verbatim desde el <head> original de index.html.
 *
 * Nota de migración: se conservan las Google Fonts vía <link> (Cinzel, Cantarell,
 * Plus Jakarta Sans, Playfair Display) porque el sistema de diseño usa los nombres
 * literales de familia en CSS (font-family: 'Cinzel', serif). Migrar a next/font
 * requeriría reescribir cada referencia; queda como optimización pendiente.
 */

export const metadata: Metadata = {
  title: "GOLDTEX — Telas que Inspiran | Proveedor Textil en Gamarra, Lima",
  description:
    "GOLDTEX Gamarra: proveedor textil en La Victoria, Lima. Más de 50 tipos de telas, venta por metros y fardos, asesoramiento técnico, WhatsApp Business y despacho express a Lima y provincias. Telas que inspiran.",
  openGraph: {
    title: "GOLDTEX — Telas que Inspiran",
    description:
      "La decisión segura. Una buena decisión es el inicio de un gran proyecto. Proveedor textil en Gamarra, Lima.",
    type: "website",
    images: ["/la_decision_segura.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: [{ url: "/favicon-64.png", sizes: "64x64" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#083E35",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* Tipografías editoriales oficiales de la marca */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cantarell:ital,wght@0,400;0,700;1,400&family=Cinzel:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@200;300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
