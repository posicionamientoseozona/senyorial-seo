import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | Senyorial - Empresa de Limpieza en Mallorca",
  description: "Contacta con Senyorial para solicitar tu presupuesto de limpieza en Palma de Mallorca. Respuesta en menos de 24 horas. Teléfono: +34 611 71 02 43",
  keywords: ["contacto limpieza", "presupuesto Palma de Mallorca", "empresa limpieza contactar"],
  openGraph: {
    title: "Contacto | Senyorial - Empresa de Limpieza",
    description: "Contacta con nosotros para solicitar tu presupuesto personalizado",
    type: "website",
    locale: "es_ES",
    siteName: "Senyorial",
    url: "https://senyorial.es/contacto",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contacto - Senyorial Empresa de Limpieza Palma de Mallorca",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto | Senyorial",
    description: "Solicita tu presupuesto personalizado. Respuesta en menos de 24h",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://senyorial.es/contacto",
  },
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}