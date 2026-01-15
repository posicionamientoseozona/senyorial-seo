import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Empleo | Únete a Senyorial en Mallorca",
  description: "Trabajo de limpieza en Palma de Mallorca con Senyorial. Estabilidad, formación continua y excelente ambiente laboral.",
  keywords: [
    "empleo limpieza Mallorca",
    "trabajo limpieza Palma",
    "ofertas trabajo limpieza",
    "empleos Senyorial",
    "trabajo estable limpieza",
    "limpiadora Palma",
    "equipo limpieza Mallorca",
    "formación limpieza",
    "carrera profesional limpieza"
  ],
  openGraph: {
    title: "Únete a Nuestro Equipo | Senyorial",
    description: "Trabajo de limpieza en Palma de Mallorca con Senyorial. Estabilidad, formación continua y excelente ambiente laboral",
    type: "website",
    locale: "es_ES",
    siteName: "Senyorial",
    url: "https://senyorial.es/empleo",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Empleo en Senyorial - Empresa de Limpieza Palma de Mallorca",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Empleo en Limpieza | Senyorial Mallorca",
    description: "Trabajo con estabilidad, formación continua y excelente ambiente laboral",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://senyorial.es/empleo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function EmpleoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}