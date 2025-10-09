import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Presupuesto Online - Empresa de Limpieza Profesional en Palma de Mallorca",
  description: "Solicita tu presupuesto online personalizado para servicios de limpieza en Palma de Mallorca. Cálculo automático, precios transparentes y respuesta inmediata.",
  keywords: ["presupuesto limpieza", "precio limpieza Palma", "calculadora limpieza", "presupuesto online"],
  openGraph: {
    title: "Presupuesto Online | Senyorial",
    description: "Calcula tu presupuesto de limpieza online en menos de 2 minutos",
    type: "website",
    locale: "es_ES",
    siteName: "Senyorial",
    url: "https://senyorial.es/presupuestar",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Presupuesto Online - Senyorial Limpieza Palma de Mallorca",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Presupuesto Online | Senyorial",
    description: "Calcula tu presupuesto de limpieza online en menos de 2 minutos",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://senyorial.es/presupuestar",
  },
};

export default function PresupuestarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}