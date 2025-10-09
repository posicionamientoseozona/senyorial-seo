import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import GTMScript from "@/components/analytics/GTMScript";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://senyorial.es'),
  title: {
    default: "Senyorial - Empresa de Limpieza Profesional en Palma de Mallorca",
    template: "%s | Senyorial"
  },
  description: "Servicios de limpieza profesional en Palma de Mallorca. Limpieza doméstica, oficinas, final de obra y limpieza profunda. Solicita tu presupuesto personalizado.",
  keywords: ["limpieza", "Palma de Mallorca", "empresa de limpieza", "limpieza doméstica", "limpieza oficinas"],
  authors: [{ name: "Senyorial" }],
  creator: "Senyorial",
  publisher: "Senyorial",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://senyorial.es',
    siteName: 'Senyorial',
    title: 'Senyorial - Empresa de Limpieza Profesional en Palma de Mallorca',
    description: 'Servicios de limpieza profesional en Palma de Mallorca. Limpieza doméstica, oficinas, final de obra y limpieza profunda.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Senyorial - Empresa de Limpieza Profesional',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Senyorial - Empresa de Limpieza Profesional en Palma de Mallorca',
    description: 'Servicios de limpieza profesional en Palma de Mallorca.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: undefined,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={montserrat.variable}>
      <head>
        {/* Preload imagen crítica LCP */}
        <link
          rel="preload"
          as="image"
          href="/images/services/oficinas/cityoffice.webp"
          fetchPriority="high"
        />
        {/* Control de barra de estado iOS */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        {/* CSS crítico mínimo para LCP */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .hero-lcp {
                position: relative;
                height: 100vh;
                background-image: url('/images/services/oficinas/cityoffice.webp');
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
              }
            `,
          }}
        />
      </head>
      <body className={montserrat.className}>
        <GTMScript />
        {children}
      </body>
    </html>
  );
}
