import { Metadata } from "next";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import Link from "next/link";
import { Home, Clock, Sparkles, Shield, Star, Calculator, Mail } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import RelatedServices from "@/components/ui/RelatedServices";
import styles from "./limpieza-domestica.module.css";
import FAQAccordion from "@/components/ui/FAQAccordion/FAQAccordion";

export const metadata: Metadata = {
  title: "Limpieza Doméstica en Palma de Mallorca | Servicio Flexible por Horas",
  description: "Limpieza a domicilio en Palma de Mallorca: abrillantado de suelos, limpieza de superficies, baños y cocina, y limpieza general de casas y apartamentos.",
  openGraph: {
    title: "Limpieza a domicilio en Palma de Mallorca | Senyorial",
    description: "Limpieza a domicilio en Palma de Mallorca: abrillantado de suelos, limpieza de superficies, baños y cocina, y limpieza general de casas y apartamentos.",
    type: "website",
    locale: "es_ES",
    siteName: "Senyorial",
    url: "https://senyorial.es/servicios/limpieza-domestica",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Limpieza Doméstica por Horas - Senyorial Palma de Mallorca",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Limpieza Doméstica por Horas en Palma de Mallorca",
    description: "Servicio flexible para particulares, final de obra y mudanzas",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://senyorial.es/servicios/limpieza-domestica",
  },
};

// Schema.org structured data para limpieza doméstica
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://senyorial.es/#empresa",
  "name": "Senyorial",
  "url": "https://senyorial.es/servicios/limpieza-domestica",
  "image": "https://senyorial.es/images/logoSenyorial/bc-rev-02.jpg",
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
};


export default function LimpiezaDomesticaPage() {
  const breadcrumbItems = [
    { label: "Senyorial", href: "/" },
    { label: "Servicios", href: "/servicios" },
    { label: "Limpieza Doméstica" }
  ];

  const services = [
    {
      title: "Limpieza doméstica regular",
      description: "Servicios puntuales o frecuentes para el mantenimiento de tu hogar",
      icon: Home
    },
    {
      title: "Final de obra para comercios",
      description: "Limpieza completa después de reformas, obras o construcciones",
      icon: Sparkles
    },
    {
      title: "Limpieza después de mudanzas",
      description: "Limpieza profunda para dejar el espacio impecable tras una mudanza",
      icon: Clock
    },
    {
      title: "Situaciones especiales",
      description: "Limpieza después de incendios o cualquier situación que requiera soporte profesional",
      icon: Shield
    }
  ];

  const features = [
    "Tarifa básica: cliente aporta productos de limpieza",
    "Tarifa premium: nos encargamos de todo incluyendo productos",
    "Servicio flexible por horas según tus necesidades",
    "Personal cualificado y de confianza",
    "Cobertura de seguro de responsabilidad civil",
    "Disponibilidad para situaciones de emergencia"
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
      name: "Marina Ferragut Córdoba",
      date: "2024-06-03",
      rating: 5,
      comment: "Muy cumplidores y serviciales, un 10 tambien para Fernanda puntual, buena trabajadora y muy atenta. No me la quiteis."
    }
  ];

  const faqs = [
    {
      question: "¿Cuál es la diferencia entre tarifa básica y premium?",
      answer: "En la tarifa básica el cliente aporta los productos de limpieza, mientras que en la tarifa premium nos encargamos de todo incluyendo productos profesionales de alta calidad."
    },
    {
      question: "¿Ofrecen servicios para situaciones de emergencia?",
      answer: "Sí, estamos disponibles para limpieza después de incendios, inundaciones, mudanzas urgentes y cualquier situación especial que requiera soporte profesional."
    },
    {
      question: "¿Cómo funciona el servicio por horas?",
      answer: "Nos adaptamos completamente a tus necesidades. Puedes contratar desde 2 horas puntuales hasta servicios regulares semanales o mensuales."
    },
    {
      question: "¿Realizan limpieza de final de obra?",
      answer: "Sí, tenemos experiencia en limpieza post-construcción para comercios, oficinas y hogares. Eliminamos polvo, restos de obra y dejamos el espacio listo para su uso."
    },
    {
      question: "¿El personal está asegurado?",
      answer: "Absolutamente. Todo nuestro personal cuenta con cobertura de seguro de responsabilidad civil y está debidamente cualificado y supervisado."
    }
  ];

  return (
    <Layout>
      <div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

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
                Limpieza de <span style={{color: 'var(--color-secondary)'}}>Casas</span> en Palma de Mallorca
                <br />
                <span style={{
                  fontSize: '1.2rem',
                  fontWeight: '400',
                  color: 'rgba(255, 255, 255, 0.9)',
                  display: 'block',
                  marginTop: 'var(--space-sm)'
                }}>
                  Servicio versátil y flexible por horas, tanto para particulares como situaciones especiales
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
                  Servicio de limpieza flexible y versátil
                </h2>
                <p style={{marginBottom: 'var(--space-lg)', lineHeight: '1.6'}}>
                  Ofrecemos un servicio versátil y flexible por horas, tanto para particulares que necesiten
                  servicios puntuales como frecuentes en la limpieza doméstica de su hogar, final de obra
                  para su comercio, limpieza después de una mudanza, limpieza en profundidad, después de
                  un incendio o cualquier tipo de situación en el que necesiten soporte de limpieza profesional.
                </p>

                <h3 style={{marginBottom: 'var(--space-md)', color: 'var(--color-primary)'}}>
                  Dos modalidades de servicio
                </h3>
                <p style={{marginBottom: 'var(--space-lg)', lineHeight: '1.6'}}>
                  Pueden elegir entre la <strong>tarifa básica</strong> en la que el cliente aporta los productos
                  o la <strong>tarifa premium</strong> en la que nos encargamos de todo, incluyendo productos
                  profesionales de alta calidad.
                </p>

                <div style={{
                  padding: 'var(--space-lg)',
                  backgroundColor: 'var(--color-white)',
                  borderRadius: 'var(--radius)',
                  boxShadow: 'var(--shadow)',
                  marginBottom: 'var(--space-lg)'
                }}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-md)'}}>
                    <Calculator size={32} color="var(--color-primary)" />
                    <div>
                      <span style={{textDecoration: 'line-through', color: 'var(--color-text-light)', fontSize: '1.5rem'}}>22€</span>
                      <span style={{fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-primary)', marginLeft: 'var(--space-sm)'}}>16,15€</span>
                      <span style={{fontSize: '1.2rem', color: 'var(--color-text)'}}> /hora</span>
                    </div>
                  </div>
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

              {/* Image Accordion */}
              <div className={styles.imageAccordion}>
                <div className={styles.accordionItem}>
                  <Image
                    src="/images/services/hogares/kitchen-2165756_1920.webp"
                    alt="Limpieza cocinas domésticas Palma Mallorca"
                    width={400}
                    height={400}
                    className={styles.accordionImage}
                  />
                  <div className={styles.accordionOverlay}>
                    <div className={styles.accordionTitle}>Cocinas</div>
                    <div className={styles.accordionDescription}>Limpieza completa y desengrase</div>
                  </div>
                </div>

                <div className={styles.accordionItem}>
                  <Image
                    src="/images/services/hogares/IMG_0012.jpeg"
                    alt="Limpieza salones hogares Palma"
                    width={400}
                    height={400}
                    className={styles.accordionImage}
                  />
                  <div className={styles.accordionOverlay}>
                    <div className={styles.accordionTitle}>Salones y Estancias</div>
                    <div className={styles.accordionDescription}>Espacios de vida impecables</div>
                  </div>
                </div>

                <div className={styles.accordionItem}>
                  <Image
                    src="/images/services/hogares/WhatsApp Image 2025-02-20 at 19.51.37 (1).jpeg"
                    alt="Limpieza profesional baños Palma Mallorca"
                    width={400}
                    height={400}
                    className={styles.accordionImage}
                  />
                  <div className={styles.accordionOverlay}>
                    <div className={styles.accordionTitle}>Baños</div>
                    <div className={styles.accordionDescription}>Desinfección y limpieza profunda</div>
                  </div>
                </div>

                <div className={styles.accordionItem}>
                  <Image
                    src="/images/services/hogares/WhatsApp Image 2025-02-20 at 19.50.09 (3).jpeg"
                    alt="Final de obra limpieza Mallorca"
                    width={400}
                    height={400}
                    className={styles.accordionImage}
                  />
                  <div className={styles.accordionOverlay}>
                    <div className={styles.accordionTitle}>Final de Obra</div>
                    <div className={styles.accordionDescription}>Preparamos tu espacio</div>
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
              <h2>¿Para qué situaciones ofrecemos nuestro servicio?</h2>
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

        {/* Quality Section */}
        <section className="bg-primary" style={{padding: 'var(--space-xl) 0'}}>
          <div className="container">
            <div style={{textAlign: 'center', marginBottom: 'var(--space-xl)'}}>
              <h2 className="text-on-primary">Flexibilidad y calidad de servicio</h2>
              <p className="text-on-primary" style={{maxWidth: '800px', margin: '0 auto'}}>
                Nos adaptamos completamente a tus necesidades, ofreciendo tanto servicios puntuales como regulares.
                Nuestro equipo profesional está preparado para cualquier situación, desde limpieza doméstica regular
                hasta situaciones de emergencia.
              </p>
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
          currentService="limpieza-domestica"
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