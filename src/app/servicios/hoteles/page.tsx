import { Metadata } from "next";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import Link from "next/link";
import { Hotel, Users, Utensils, Calendar, Calculator, Mail, Star } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import RelatedServices from "@/components/ui/RelatedServices";
import styles from "./hoteles.module.css";
import FAQAccordion from "@/components/ui/FAQAccordion/FAQAccordion";

export const metadata: Metadata = {
  title: "Limpieza de hoteles en Palma de Mallorca | Senyorial",
  description: "Limpieza de hoteles en Palma: habitaciones, baños y suelos, cambio de sábanas y toallas, y mantenimiento de zonas comunes.",
  openGraph: {
    title: "Limpieza de hoteles en Palma de Mallorca | Senyorial",
    description: "Limpieza de hoteles en Palma: habitaciones, baños y suelos, cambio de sábanas y toallas, y mantenimiento de zonas comunes.",
    type: "website",
    locale: "es_ES",
    siteName: "Senyorial",
    url: "https://senyorial.es/servicios/hoteles",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Limpieza de Hoteles - Senyorial Palma de Mallorca",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Limpieza de Hoteles en Palma de Mallorca",
    description: "Servicio profesional para habitaciones, baños y zonas comunes",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://senyorial.es/servicios/hoteles",
  },
};

// Schema.org structured data para hoteles
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://senyorial.es/#empresa",
  "name": "Senyorial",
  "url": "https://senyorial.es/servicios/limpieza-domestica",
  "image": "https://senyorial.es/_next/image?url=%2Fimages%2FlogoSenyorial%2Fs-f1-clean.png&w=96&q=75",
  "telephone": "+34 611 71 02 43",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Carrer Ricard Roca, 4",
    "addressLocality": "Palma de Mallorca",
    "postalCode": "07008",
    "addressRegion": "Illes Balears",
    "addressCountry": "ES"
  },
  "openingHours": [
    "Mo-Fr 09:00-21:00"
  ],
  "priceRange": "€€",
  "areaServed": {
    "@type": "City",
    "name": "Palma de Mallorca"
  },
  "sameAs": [
    "https://www.facebook.com/Senyorial",
    "https://www.instagram.com/senyorial_es/",
    "https://www.linkedin.com/company/senyorial/",
    "https://share.google/uKo09hStnI0KEIS7r"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.6",
    "reviewCount": "24",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": "Francesc Albert Beltrán Serrano",
      "datePublished": "2024-07-25",
      "reviewBody": "Muy satisfecho con Fernanda, nunca había tenido la casa tan limpia. Un 10",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@type": "Review",
      "author": "Berta Parés Bofill",
      "datePublished": "2024-05-24",
      "reviewBody": "Kaliana es muy trabajadora y perfeccionista en lo que hace. La casa queda muy limpia.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1"
      }
    }
  ],
  "service": {
    "@type": "Service",
    "serviceType": "Limpieza a domicilio en Palma de Mallorca",
    "description": "El servicio de limpieza a domicilio de Senyorial incluye limpieza de suelos, baños, cocina, muebles y superficies, adaptándose a las necesidades de cada hogar.",
    "areaServed": "Palma de Mallorca",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Senyorial"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios incluidos",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Limpieza de suelos" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Limpieza de baños" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Limpieza de cocinas" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Limpieza de muebles" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Limpieza de superficies" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Organización de habitaciones" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Personal profesional" } }
      ]
    }
  }
}

export default function HotelesPage() {
  const breadcrumbItems = [
    { label: "Senyorial", href: "/" },
    { label: "Servicios", href: "/servicios" },
    { label: "Limpieza de Hoteles" }
  ];

  const services = [
    {
      title: "Limpieza de habitaciones y baños",
      description: "Higienización completa de habitaciones, cambio de ropa de cama y limpieza profunda de baños",
      icon: Hotel
    },
    {
      title: "Limpieza de zonas comunes y recepción",
      description: "Mantenimiento de lobbys, pasillos, escaleras y áreas de recepción para causar la mejor primera impresión",
      icon: Users
    },
    {
      title: "Higienización de áreas de restauración y salas de eventos",
      description: "Limpieza especializada de cocinas, comedores, salas de eventos y áreas gastronómicas",
      icon: Utensils
    },
    {
      title: "Servicio adaptado según ocupación y temporada",
      description: "Flexibilidad total para adaptarnos a la ocupación del hotel y la temporada turística",
      icon: Calendar
    }
  ];

  const features = [
    "Personal cualificado con experiencia en el sector hotelero",
    "Adaptados a la temporada turística y ocupación variable",
    "Paga solo las horas trabajadas, sin costes fijos",
    "Software de control de tareas para máxima eficiencia",
    "Productos certificados específicos para uso hotelero",
    "Atención directa y prioritaria para resolver incidencias"
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
    }
  ];

  const faqs = [
    {
      question: "¿Qué incluye vuestro servicio de limpieza de hoteles?",
      answer: "Incluye limpieza completa de habitaciones, baños, zonas comunes, recepción, áreas de restauración, salas de eventos y cualquier espacio del hotel. Nos adaptamos completamente a vuestras necesidades específicas."
    },
    {
      question: "¿Cómo gestionan la rotación de empleados para evitar problemas de continuidad?",
      answer: "Contamos con personal fijo cualificado y un sistema de respaldo que garantiza continuidad. Cada empleado conoce los estándares específicos de tu hotel para mantener la calidad constante."
    },
    {
      question: "¿Cómo estructuran sus tarifas?",
      answer: "Facturamos únicamente las horas trabajadas, sin costes fijos. Ofrecemos tarifas competitivas adaptadas a la ocupación y temporada de tu hotel, con máxima transparencia."
    },
    {
      question: "¿Tienen un sistema de supervisión o control de calidad?",
      answer: "Sí, utilizamos software de control de tareas que nos permite supervisar cada turno, gestionar incidencias de forma ágil y mantener los más altos estándares de calidad."
    },
    {
      question: "¿Ofrecen servicios personalizados para adaptarse a las necesidades específicas del hotel?",
      answer: "Absolutamente. Adaptamos equipos, tareas y horarios según tus preferencias para integrarnos perfectamente en la operativa diaria del hotel, respetando a los huéspedes."
    }
  ];

  return (
    <Layout>
      <div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

        {/* Hero Section */}
        <section className={styles.heroMobile}>
          <div className="container" style={{position: 'relative', zIndex: 2}}>
            <div style={{maxWidth: '600px', color: 'white'}}>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 'bold',
                marginBottom: 'var(--space-lg)',
                color: 'white',
                lineHeight: '1.1',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(0, 91, 141, 0.05))',
                backdropFilter: 'blur(8px) saturate(1.8)',
                WebkitBackdropFilter: 'blur(8px) saturate(1.8)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 8px 32px rgba(0, 91, 141, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                display: 'inline-block',
                padding: 'var(--space-md)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                Limpieza de <span style={{color: 'var(--color-secondary)'}}>Hoteles</span> en Palma de Mallorca
                <br />
                <span style={{
                  fontSize: '1.2rem',
                  fontWeight: '400',
                  color: 'rgba(255, 255, 255, 0.9)',
                  display: 'block',
                  marginTop: 'var(--space-sm)'
                }}>
                  Servicio profesional de limpieza para mantener tu hotel siempre impecable
                </span>
              </h1>
              <div className={styles.heroButtons} style={{display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap'}}>
                <Link href="/presupuestar" className="btn1">
                  <Calculator size={16} style={{marginRight: '8px'}} />
                  <span className="btn-text-full">Solicitar Presupuesto</span>
                  <span className="btn-text-mobile" style={{display: 'none'}}>Presupuesto</span>
                </Link>
                <Link href="/contacto" className="btn2">
                  <Mail size={16} style={{marginRight: '8px'}} />
                  <span className="btn-text-full">Contactar</span>
                  <span className="btn-text-mobile" style={{display: 'none'}}>Contactar</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Breadcrumbs items={breadcrumbItems} />

        {/* Introduction Section */}
        <section style={{padding: 'var(--space-xl) 0'}}>
          <div className="container">
            <div className={styles.accordionSection}>
              <div>
                <h2 style={{marginBottom: 'var(--space-lg)', color: 'var(--color-primary)'}}>
                  Limpieza profesional para hoteles
                </h2>
                <p style={{marginBottom: 'var(--space-lg)', lineHeight: '1.6'}}>
                  En Senyorial ofrecemos un servicio de limpieza para hoteles en Palma de Mallorca.
                  Higienizamos habitaciones, baños, zonas comunes, áreas de restauración y más.
                  Garantizando una experiencia confortable para tus huéspedes.
                </p>

                <h3 style={{marginBottom: 'var(--space-md)', color: 'var(--color-primary)'}}>
                  Nos adaptamos a tu operativa diaria
                </h3>
                <p style={{marginBottom: 'var(--space-lg)', lineHeight: '1.6'}}>
                  Adaptamos equipos, tareas y horarios según tus preferencias para integrarnos en la operativa
                  diaria del hotel. Además, supervisamos cada turno mediante tecnología de control de calidad,
                  lo que nos permite gestionar cualquier incidencia de forma ágil y eficaz.
                </p>

                <Link href="/presupuestar" className="btn1">
                  <Mail size={16} style={{marginRight: '8px'}} />
                  Contrata nuestros servicios
                </Link>
              </div>

              {/* Image Accordion */}
              <div className={styles.imageAccordion}>
                <div className={styles.accordionItem}>
                  <Image
                    src="/images/services/hoteles/IMG_9639-scaled-1-1.webp"
                    alt="Limpieza habitaciones hoteles Palma Mallorca"
                    width={400}
                    height={400}
                    className={styles.accordionImage}
                  />
                  <div className={styles.accordionOverlay}>
                    <div className={styles.accordionTitle}>Habitaciones de Hotel</div>
                    <div className={styles.accordionDescription}>Limpieza completa y cambio de ropa</div>
                  </div>
                </div>

                <div className={styles.accordionItem}>
                  <Image
                    src="/images/services/hoteles/limpieza-de-cristales-hotel.webp"
                    alt="Limpieza cristales hoteles ventanas Palma"
                    width={400}
                    height={400}
                    className={styles.accordionImage}
                  />
                  <div className={styles.accordionOverlay}>
                    <div className={styles.accordionTitle}>Cristales y Ventanas</div>
                    <div className={styles.accordionDescription}>Limpieza especializada de cristales</div>
                  </div>
                </div>

                <div className={styles.accordionItem}>
                  <Image
                    src="/images/services/hoteles/limpieza-terraza.webp"
                    alt="Limpieza terrazas hoteles áreas exteriores"
                    width={400}
                    height={400}
                    className={styles.accordionImage}
                  />
                  <div className={styles.accordionOverlay}>
                    <div className={styles.accordionTitle}>Terrazas y Exteriores</div>
                    <div className={styles.accordionDescription}>Mantenimiento de áreas exteriores</div>
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
              <h2>¿Qué incluye nuestro servicio de limpieza para hoteles?</h2>
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
              <h2>¿Por qué elegir Senyorial para la limpieza de tu hotel?</h2>
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
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 'var(--space-lg)', maxWidth: '1000px', margin: '0 auto'}}>
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
                      <Star key={i} size={16} fill="var(--color-secondary)" color="var(--color-secondary)" style={{marginRight: '2px'}} />
                    ))}
                  </div>
                  <p style={{margin: 0, lineHeight: '1.6'}}>{testimonial.comment}</p>
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
          currentService="hoteles"
          title="Otros servicios de limpieza profesional"
        />

        {/* CTA Section */}
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