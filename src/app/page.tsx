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
  title: "Empresa de Limpieza Palma - Senyorial | Servicios Profesionales",
  description: "Empresa de limpieza Palma líder en servicios profesionales. Limpieza doméstica, oficinas, hoteles y comunidades en Palma de Mallorca. Presupuesto gratis en 2 minutos.",
  keywords: ["empresa de limpieza Palma", "limpieza Palma", "empresa limpieza Palma de Mallorca", "servicios limpieza Palma", "limpieza profesional Palma", "limpieza doméstica Palma", "limpieza oficinas Palma"],
  openGraph: {
    title: "Empresa de Limpieza Palma - Senyorial",
    description: "Empresa de limpieza Palma líder en servicios profesionales. Limpieza doméstica, oficinas, hoteles y comunidades en Palma de Mallorca. Presupuesto gratis en 2 minutos.",
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
