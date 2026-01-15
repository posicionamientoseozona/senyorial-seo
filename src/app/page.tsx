import { Metadata } from "next";
import dynamic from 'next/dynamic';
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/ui/HeroSection/HeroSection";

// Carga dinámica para componentes "below the fold"
const ServicesSection = dynamic(() => import('@/components/ui/ServicesSection/ServicesSection'));
const AboutSection = dynamic(() => import('@/components/ui/AboutSection/AboutSection'));
const MapSection = dynamic(() => import('@/components/ui/MapSection/MapSection'));
const ContactCTA = dynamic(() => import('@/components/ui/ContactCTA/ContactCTA'));

export const metadata: Metadata = {
  title: "Empresa de Limpiezas en Palma de Mallorca | Senyorial",
  description: "Empresa de limpieza en Palma especializada en oficinas, comunidades, hoteles y viviendas del centro. Ofrecemos limpiezas regulares y por horas. Solicita presupuesto.",
  openGraph: {
    title: "Empresa de Limpiezas en Palma de Mallorca | Senyorial",
    description: "Empresa de limpieza en Palma especializada en oficinas, comunidades, hoteles y viviendas del centro. Ofrecemos limpiezas regulares y por horas. Solicita presupuesto.",
    type: "website",
    locale: "es_ES",
    siteName: "Senyorial",
    url: "https://senyorial.es",
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Oficinas modernas en Palma de Mallorca - Senyorial',
      },
    ],
  },
  alternates: {
    canonical: "https://senyorial.es",
  },
};

export default function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <MapSection />
      <ContactCTA />
    </Layout>
  );
}
