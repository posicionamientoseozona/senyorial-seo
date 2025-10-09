import { Metadata } from "next";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import Link from "next/link";
import { Building, Calendar, Sparkles, Star, Mail, Calculator, Home } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import RelatedServices from "@/components/ui/RelatedServices";
import styles from "./comunidades.module.css";
import FAQAccordion from "@/components/ui/FAQAccordion/FAQAccordion";

export const metadata: Metadata = {
  title: "Limpieza de Comunidades en Palma de Mallorca | Portales y Escaleras",
  description: "Limpieza de comunidades de vecinos en Palma de Mallorca. Portales, escaleras, ascensores y zonas comunes. Frecuencia diaria, semanal o quincenal.",
  keywords: ["limpieza comunidades", "Palma de Mallorca", "portales", "escaleras", "ascensores", "zonas comunes", "comunidades vecinos"],
  openGraph: {
    title: "Limpieza de Comunidades en Palma de Mallorca",
    description: "Limpiezas integrales y mantenimiento para comunidades de vecinos",
    type: "website",
    locale: "es_ES",
    siteName: "Senyorial",
    url: "https://senyorial.es/servicios/comunidades",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Limpieza de Comunidades - Senyorial Palma de Mallorca",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Limpieza de Comunidades en Palma de Mallorca",
    description: "Portales, escaleras y zonas comunes. Limpiezas integrales",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://senyorial.es/servicios/comunidades",
  },
};

// Schema.org structured data para la empresa y reseñas
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Senyorial",
  "description": "Empresa de limpieza de comunidades de vecinos en Palma de Mallorca",
  "url": "https://senyorial.es/servicios/comunidades/",
  "telephone": "+34611710243",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Palma de Mallorca",
    "addressCountry": "ES"
  },
  "openingHours": [
    "Mo-Fr 09:00-21:00",
    "Sa-Su by appointment"
  ],
  "priceRange": "€€",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "22",
    "bestRating": "5",
    "worstRating": "1"
  },
  "service": {
    "@type": "Service",
    "name": "Limpieza de Comunidades",
    "description": "Servicios de limpieza para comunidades de vecinos en Palma de Mallorca"
  }
};

export default function ComunidadesPage() {
  const breadcrumbItems = [
    { label: "Senyorial", href: "/" },
    { label: "Servicios", href: "/servicios" },
    { label: "Limpieza de Comunidades" }
  ];

  const services = [
    {
      title: "Limpieza de portales y zonas comunes",
      description: "Mantenimiento completo de entradas, recepciones y espacios compartidos",
      icon: Building
    },
    {
      title: "Mantenimiento completo de entradas",
      description: "recepciones y espacios compartidos",
      icon: Building
    },
    {
      title: "Limpieza de escaleras y ascensores",
      description: "Limpieza profunda de escaleras, rellanos y ascensores con productos específicos",
      icon: Home
    },
    {
      title: "Limpieza profunda de escaleras",
      description: "rellanos y ascensores con productos específicos",
      icon: Home
    },
    {
      title: "Mantenimiento de zonas exteriores",
      description: "Cuidado de patios, garajes y áreas exteriores comunitarias",
      icon: Calendar
    },
    {
      title: "Cuidado de patios",
      description: "garajes y áreas exteriores comunitarias",
      icon: Calendar
    },
    {
      title: "Frecuencia personalizable",
      description: "Servicios diarios, semanales o quincenales según las necesidades de tu comunidad",
      icon: Sparkles
    },
    {
      title: "Servicios diarios, semanales o quincenales",
      description: "según las necesidades de tu comunidad",
      icon: Sparkles
    }
  ];

  const features = [
    "Personal fijo que conoce tu comunidad",
    "Productos específicos para cada superficie",
    "Supervisión y control de calidad",
    "Servicio cubierto con seguro de Responsabilidad Civil",
    "Flexibilidad horaria adaptada",
    "Gestión completa del personal"
  ];

  const testimonials = [
    {
      name: "Marina Prieto Gómez",
      date: "2024-10-03",
      rating: 5,
      comment: "Estamos muy contentas con la limpieza de la oficina de eliminamostudeuda.com en Palma y con el trato tanto del equipo de Senyorial como de Yandira ✨💕"
    },
    {
      name: "Francesc Albert Beltrán Serrano",
      date: "2024-07-25",
      rating: 5,
      comment: "Muy satisfecho con Fernanda, nunca había tenido la casa tan limpia. Un 10"
    },
    {
      name: "ANA MARTINEZ",
      date: "2024-06-24",
      rating: 5,
      comment: "Contenta con el trato y el servicio que ofrece la empresa y en especial con Kaliana, muy buena trabajadora, profesional y como persona un 10."
    },
    {
      name: "Su at Strand Mallorca",
      date: "2024-06-14",
      rating: 5,
      comment: "Attentive since the first contact, flexible to adapt to the individual business needs. We thank the work of Adrià, Diana & their team, all delivering a good service."
    },
    {
      name: "Marina Ferragut Córdoba",
      date: "2024-06-03",
      rating: 5,
      comment: "Muy cumplidores y serviciales, un 10 tambien para Fernanda puntual, buena trabajadora y muy atenta. No me la quiteis."
    },
    {
      name: "Berta Parés Bofill",
      date: "2024-05-24",
      rating: 5,
      comment: "Kaliana es muy trabajadora y perfeccionista en lo que hace. La casa queda muy limpia."
    }
  ];

  const faqs = [
    {
      question: "¿Qué abarca el servicio de limpieza de comunidades?",
      answer: "Incluye limpieza completa de portales, escaleras, rellanos, ascensores, patios, garajes y todas las zonas comunes. También buzones y elementos de mobiliario urbano de la comunidad."
    },
    {
      question: "¿Con qué frecuencia se realizan los servicios?",
      answer: "Ofrecemos servicios con frecuencia diaria, semanal o quincenal, adaptándonos a las necesidades específicas y presupuesto de cada comunidad de vecinos."
    },
    {
      question: "¿El personal de limpieza está cualificado?",
      answer: "Sí, contamos con personal fijo y cualificado que se familiariza con las necesidades específicas de tu comunidad. Todo nuestro equipo está formado y supervisado."
    },
    {
      question: "¿Cómo se gestionan incidencias o solicitudes especiales?",
      answer: "Tenemos un sistema de atención al cliente eficaz para gestionar cualquier incidencia o solicitud especial. Cada comunidad tiene un responsable asignado."
    },
    {
      question: "¿Cómo se realiza la facturación y el seguimiento del servicio?",
      answer: "Facturamos por horas trabajadas con total transparencia. Realizamos supervisión regular y proporcionamos informes de seguimiento del servicio."
    }
  ];

  return (
    <Layout>
      <div>
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        {/* Hero Section */}
        <section
          style={{
            height: '100vh',
            backgroundImage: 'url(/images/services/comunidades/Comunidades-hero.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            display: 'flex',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1
            }}
          />
          <div className="container" style={{position: 'relative', zIndex: 2}}>
            <div style={{maxWidth: '600px', color: 'white'}}>
              <span style={{
                display: 'inline-block',
                padding: 'var(--space-xs) var(--space-sm)',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                borderRadius: 'var(--radius)',
                fontSize: '0.9rem',
                fontWeight: '500',
                marginBottom: 'var(--space-md)'
              }}>
                Comunidades de Vecinos
              </span>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 'bold',
                marginBottom: 'var(--space-md)',
                color: 'white',
                lineHeight: '1.1'
              }}>
                Limpieza de <span style={{color: 'var(--color-secondary)'}}>Comunidades</span> en Palma de Mallorca
              </h1>
              <p style={{
                fontSize: '1.2rem',
                marginBottom: 'var(--space-lg)',
                color: 'rgba(255, 255, 255, 0.9)'
              }}>
                Limpiezas integrales y mantenimiento para comunidades de vecinos.
              </p>
              <div style={{display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap'}}>
                <Link href="/presupuestar" className="btn1">
                  <Calculator size={16} style={{marginRight: '8px'}} />
                  Obtén tu presupuesto personalizado
                </Link>
                <Link href="/contacto" className="btn2">
                  <Mail size={16} style={{marginRight: '8px'}} />
                  Contactar
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Breadcrumbs items={breadcrumbItems} />

        {/* Image Accordion Section */}
        <section style={{padding: 'var(--space-xl) 0', backgroundColor: 'var(--color-background)'}}>
          <div className="container">
            <div className={styles.accordionSection}>
              {/* Text Content */}
              <div>
                <h2 style={{marginBottom: 'var(--space-lg)', color: 'var(--color-primary)'}}>
                  Soluciones de limpieza para comunidades
                </h2>
                <p style={{marginBottom: 'var(--space-lg)', fontSize: '1.1rem', lineHeight: '1.6'}}>
                  En Senyorial nos encargamos de la limpieza de portales, escaleras, rellanos, ascensores,
                  patios, garajes y otras zonas compartidas en Palma de Mallorca, con la frecuencia que
                  necesite tu comunidad: diaria, semanal o quincenal.
                </p>

                <h3 style={{marginBottom: 'var(--space-md)', color: 'var(--color-primary)'}}>
                  Equipo y personal propio
                </h3>
                <p style={{marginBottom: 'var(--space-lg)', lineHeight: '1.6'}}>
                  Contamos con personal fijo que se familiariza con las necesidades específicas de tu comunidad.
                  Cada visita está supervisada para garantizar resultados impecables gracias a nuestros productos
                  de limpieza profesional adaptados a cada tipo de superficie.
                </p>

              </div>

              {/* Image Accordion */}
              <div className={styles.imageAccordion}>
                <div className={styles.accordionItem}>
                  <Image
                    src="/images/services/comunidades/Comunidades-hero.webp"
                    alt="Limpieza portales entrada comunidades Palma Mallorca"
                    width={400}
                    height={400}
                    className={styles.accordionImage}
                  />
                  <div className={styles.accordionOverlay}>
                    <div className={styles.accordionTitle}>Portales y Entradas</div>
                    <div className={styles.accordionDescription}>Zonas de acceso impecables</div>
                  </div>
                </div>

                <div className={styles.accordionItem}>
                  <Image
                    src="/images/services/comunidades/1000048599.webp"
                    alt="Limpieza escaleras rellanos comunidades vecinos"
                    width={400}
                    height={400}
                    className={styles.accordionImage}
                  />
                  <div className={styles.accordionOverlay}>
                    <div className={styles.accordionTitle}>Escaleras y Rellanos</div>
                    <div className={styles.accordionDescription}>Limpieza profunda y regular</div>
                  </div>
                </div>

                <div className={styles.accordionItem}>
                  <Image
                    src="/images/services/comunidades/1000048602.webp"
                    alt="Limpieza zonas comunes patios garajes comunidades"
                    width={400}
                    height={400}
                    className={styles.accordionImage}
                  />
                  <div className={styles.accordionOverlay}>
                    <div className={styles.accordionTitle}>Zonas Comunes</div>
                    <div className={styles.accordionDescription}>Patios, garajes y áreas exteriores</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section style={{padding: 'var(--space-xl) 0', backgroundColor: 'var(--color-background)'}}>
          <div className="container">
            <div style={{textAlign: 'center', marginBottom: 'var(--space-xl)'}}>
              <h2>¿Qué incluye el servicio de limpieza de comunidades?</h2>
            </div>
            <div className={styles.servicesScroll}>
              {services.map((service, index) => (
                <div key={index} style={{
                  minWidth: '300px',
                  maxWidth: '350px',
                  textAlign: 'center',
                  padding: 'var(--space-lg)',
                  backgroundColor: 'var(--color-white)',
                  borderRadius: 'var(--radius)',
                  boxShadow: 'var(--shadow)',
                  scrollSnapAlign: 'start',
                  flexShrink: 0
                }}>
                  <div style={{marginBottom: 'var(--space-md)', display: 'flex', justifyContent: 'center'}}>
                    <service.icon size={48} color="var(--color-primary)" />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section style={{padding: 'var(--space-xl) 0'}}>
          <div className="container">
            <div style={{textAlign: 'center', marginBottom: 'var(--space-xl)'}}>
              <h2>Senyorial es tu empresa de limpieza en Palma de Mallorca</h2>
              <div style={{
                padding: 'var(--space-xl)',
                backgroundColor: 'var(--color-white)',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow)',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                <ul style={{listStyle: 'none', textAlign: 'left'}}>
                  {features.map((feature, index) => (
                    <li key={index} style={{display: 'flex', alignItems: 'flex-start', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)'}}>
                      <span style={{color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '1.2rem'}}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section style={{padding: 'var(--space-xl) 0'}}>
          <div className="container">
            <div style={{textAlign: 'center', marginBottom: 'var(--space-xl)'}}>
              <h2>Opiniones de nuestros clientes</h2>
              <p>La evaluación general en Google es 4.5 de 5, en base a 22 reseñas</p>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-lg)', maxWidth: '1000px', margin: '0 auto'}}>
              {testimonials.map((testimonial, index) => (
                <div key={index} style={{
                  padding: 'var(--space-lg)',
                  backgroundColor: 'var(--color-white)',
                  borderRadius: 'var(--radius)',
                  boxShadow: 'var(--shadow)'
                }}>
                  <div style={{display: 'flex', alignItems: 'center', marginBottom: 'var(--space-sm)'}}>
                    <strong>{testimonial.name}</strong>
                    <span style={{marginLeft: 'auto', color: 'var(--color-text-light)', fontSize: '0.9rem'}}>{testimonial.date}</span>
                  </div>
                  <div style={{marginBottom: 'var(--space-sm)'}}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="var(--color-primary)" color="var(--color-primary)" style={{marginRight: '2px'}} />
                    ))}
                  </div>
                  <p style={{fontStyle: 'italic'}}>{testimonial.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{padding: 'var(--space-xl) 0', backgroundColor: 'var(--color-background)'}}>
          <div className="container">
            <div style={{textAlign: 'center', marginBottom: 'var(--space-xl)'}}>
              <h2>Preguntas frecuentes</h2>
            </div>
            <FAQAccordion faqs={faqs} className={styles.faqAccordion} />
          </div>
        </section>

        {/* Related Services */}
        <RelatedServices
          currentService="comunidades"
          title="Otros servicios de limpieza profesional"
        />

        {/* Schedule Section */}
        <section style={{padding: 'var(--space-xl) 0'}}>
          <div className="container">
            <div style={{textAlign: 'center', marginBottom: 'var(--space-xl)'}}>
              <h2>Trabajamos en todo Palma de Mallorca</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 'var(--space-md)',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                <div><strong>L-V:</strong> 9:00 - 21:00</div>
                <div><strong>S-D:</strong> Consultar</div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}