import { Metadata } from "next";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import Link from "next/link";
import { Building, Calendar, Sparkles, Users, Star, Mail, Calculator } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import RelatedServices from "@/components/ui/RelatedServices";
import styles from "./oficinas.module.css";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "Limpieza de Oficinas en Palma de Mallorca | Desde 16,15€/hora",
  description: "Servicio de limpieza de oficinas en Palma de Mallorca: aspirado, fregado, limpieza de mesas y equipamiento, baños y zonas comunes.",
  openGraph: {
    title: "Limpieza de Oficinas en Palma de Mallorca | Desde 16,15€/hora",
    description: "Servicio de limpieza de oficinas en Palma de Mallorca: aspirado, fregado, limpieza de mesas y equipamiento, baños y zonas comunes.",
    type: "website",
    locale: "es_ES",
    siteName: "Senyorial",
    url: "https://senyorial.es/servicios/oficinas",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Limpieza de Oficinas - Senyorial Palma de Mallorca",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Limpieza de Oficinas en Palma de Mallorca",
    description: "Desde 16,15€/hora. Tarifa Básica o Premium con flexibilidad horaria",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://senyorial.es/servicios/oficinas",
  },
};

// Schema.org structured data para la empresa y reseñas
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Senyorial",
  "description": "Empresa de limpieza de oficinas en Palma de Mallorca",
  "url": "https://senyorial.es/servicios/oficinas/",
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
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Marina Prieto Gómez"
      },
      "datePublished": "2024-10-03",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Estamos muy contentas con la limpieza de la oficina de eliminamostudeuda.com en Palma y con el trato tanto del equipo de Senyorial como de Yandira ✨💕"
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Francesc Albert Beltrán Serrano"
      },
      "datePublished": "2024-07-25",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Muy satisfecho con Fernanda, nunca había tenido la casa tan limpia. Un 10"
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "ANA MARTINEZ"
      },
      "datePublished": "2024-06-24",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Contenta con el trato y el servicio que ofrece la empresa y en especial con Kaliana, muy buena trabajadora, profesional y como persona un 10."
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Su at Strand Mallorca"
      },
      "datePublished": "2024-06-14",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Attentive since the first contact, flexible to adapt to the individual business needs. We thank the work of Adrià, Diana & their team, all delivering a good service."
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Maria Jigena"
      },
      "datePublished": "2024-06-03",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Todo muy bien gracias por todo"
    }
  ],
  "service": {
    "@type": "Service",
    "name": "Limpieza de Oficinas",
    "description": "Servicios de limpieza comercial para oficinas y despachos en Palma de Mallorca",
    "offers": {
      "@type": "Offer",
      "price": "16.15",
      "priceCurrency": "EUR",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "16.15",
        "priceCurrency": "EUR",
        "unitCode": "HUR"
      }
    }
  }
};

export default function OficinasPage() {
  const breadcrumbItems = [
    { label: "Senyorial", href: "/" },
    { label: "Servicios", href: "/servicios" },
    { label: "Limpieza de Oficinas" }
  ];

  const services = [
    {
      title: "Limpieza de áreas de trabajo",
      description: "Desinfectamos escritorios, equipos informáticos y superficies para un entorno seguro y ordenado",
      icon: Building
    },
    {
      title: "Salas de reuniones",
      description: "Mantenimiento especializado de salas de reuniones y espacios de presentación",
      icon: Users
    },
    {
      title: "Zonas comunes",
      description: "Limpieza completa de recepciones, pasillos y áreas de descanso",
      icon: Calendar
    },
    {
      title: "Baños y cocinas",
      description: "Desinfección y limpieza profunda de instalaciones sanitarias y área de cocina",
      icon: Sparkles
    }
  ];

  const features = [
    "Mismos profesionales en cada servicio",
    "Productos específicos para cada superficie",
    "Ambiente limpio y ordenado",
    "Servicio cubierto con seguro de Responsabilidad Civil",
    "Flexibilidad horaria",
    "Control de calidad supervisado"
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
      question: "¿Que incluye el servicio?",
      answer: "Limpieza completa de oficinas incluyendo escritorios, equipos informáticos, salas de reuniones, baños, zonas comunes y áreas de descanso. Productos de limpieza incluidos."
    },
    {
      question: "¿Tenéis experiencia previa en limpieza de oficinas?",
      answer: "Sí, tenemos amplia experiencia en limpieza comercial y de oficinas en Palma de Mallorca, con clientes satisfechos y referencias comprobables."
    },
    {
      question: "¿Cómo estructuran sus tarifas?",
      answer: "Nuestras tarifas comienzan desde 16,15€/hora con productos incluidos. El precio final depende del tamaño de la oficina y frecuencia del servicio."
    },
    {
      question: "¿Tienen un sistema de supervisión o control de calidad?",
      answer: "Sí, supervisamos cada intervención para garantizar el mejor servicio y mantener nuestros estándares de calidad."
    },
    {
      question: "¿Ofrecen servicios personalizados para adaptarse a las necesidades específicas de las empresas?",
      answer: "Absolutamente. Nos ajustamos al ritmo de tu oficina, evitando interrupciones durante la jornada laboral y adaptándonos a horarios específicos."
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
                Limpieza de <span style={{color: 'var(--color-secondary)'}}>Oficinas</span> en Palma de Mallorca
                <br />
                <span style={{
                  fontSize: '1.2rem',
                  fontWeight: '400',
                  color: 'rgba(255, 255, 255, 0.9)',
                  display: 'block',
                  marginTop: 'var(--space-sm)'
                }}>
                  Desde 16,15 €/hora: Tarifa Básica o Tarifa Premium, flexibilidad horaria y control de calidad.
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

        {/* Image Accordion Section */}
        <section style={{padding: 'var(--space-xl) 0', backgroundColor: 'var(--color-background)'}}>
          <div className="container">
            <div className={styles.accordionSection}>
              {/* Text Content */}
              <div>
                <h2 style={{marginBottom: 'var(--space-lg)', color: 'var(--color-primary)'}}>
                  Soluciones de limpieza para oficinas y despachos
                </h2>
                <p style={{marginBottom: 'var(--space-lg)', fontSize: '1.1rem', lineHeight: '1.6'}}>
                  En Senyorial ofrecemos limpiezas para oficinas y despachos en Palma de Mallorca.
                  Nos encargamos de mantener impecables todos los espacios de trabajo: escritorios,
                  zonas comunes, salas de reuniones, baños y áreas de descanso.
                </p>

                <h3 style={{marginBottom: 'var(--space-md)', color: 'var(--color-primary)'}}>
                  Flexibilidad y calidad de servicio
                </h3>
                <p style={{marginBottom: 'var(--space-lg)', lineHeight: '1.6'}}>
                  Nos ajustamos al ritmo de tu oficina, evitando interrupciones durante la jornada laboral.
                  Gracias a nuestro sistema de control de calidad, supervisamos cada intervención para garantizar el mejor servicio.
                </p>

              </div>

              {/* Image Accordion */}
              <div className={styles.imageAccordion}>
                <div className={styles.accordionItem}>
                  <Image
                    src="/images/services/oficinas/WhatsApp-Image-2023-05-01-at-18.46.55.jpeg"
                    alt="Limpieza de oficinas escritorios ordenadores Palma Mallorca"
                    width={400}
                    height={400}
                    className={styles.accordionImage}
                  />
                  <div className={styles.accordionOverlay}>
                    <div className={styles.accordionTitle}>Oficinas Modernas</div>
                    <div className={styles.accordionDescription}>Espacios de trabajo contemporáneos</div>
                  </div>
                </div>

                <div className={styles.accordionItem}>
                  <Image
                    src="/images/services/oficinas/1000013161.webp"
                    alt="Limpieza baños oficinas aseos empresas Palma"
                    width={400}
                    height={400}
                    className={styles.accordionImage}
                  />
                  <div className={styles.accordionOverlay}>
                    <div className={styles.accordionTitle}>Baños Corporativos</div>
                    <div className={styles.accordionDescription}>Aseos empresariales impecables</div>
                  </div>
                </div>

                <div className={styles.accordionItem}>
                  <Image
                    src="/images/services/oficinas/bb7d8d16-bf7e-42ad-ad26-b28a22949fe3.webp"
                    alt="Limpieza recepciones empresas zonas comunes oficinas"
                    width={400}
                    height={400}
                    className={styles.accordionImage}
                  />
                  <div className={styles.accordionOverlay}>
                    <div className={styles.accordionTitle}>Recepciones</div>
                    <div className={styles.accordionDescription}>Áreas de recepción profesionales</div>
                  </div>
                </div>

                <div className={styles.accordionItem}>
                  <Image
                    src="/images/services/oficinas/1000013155.webp"
                    alt="Limpieza cristales ventanas oficinas Mallorca"
                    width={400}
                    height={400}
                    className={styles.accordionImage}
                  />
                  <div className={styles.accordionOverlay}>
                    <div className={styles.accordionTitle}>Cristales y Ventanas</div>
                    <div className={styles.accordionDescription}>Transparencia perfecta</div>
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
              <h2>¿Qué incluye nuestro servicio de limpieza?</h2>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-lg)'}}>
              {services.map((service, index) => (
                <div key={index} style={{textAlign: 'center', padding: 'var(--space-lg)', backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)'}}>
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

        {/* Pricing Section */}
        <section style={{padding: 'var(--space-xl) 0'}}>
          <div className="container">
            <div style={{textAlign: 'center', marginBottom: 'var(--space-xl)'}}>
              <h2>Tarifas y características</h2>
              <div style={{
                padding: 'var(--space-xl)',
                backgroundColor: 'var(--color-white)',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow)',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                <div style={{marginBottom: 'var(--space-lg)'}}>
                  <span style={{textDecoration: 'line-through', color: 'var(--color-text-light)', fontSize: '1.5rem'}}>22€</span>
                  <span style={{fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-primary)', marginLeft: 'var(--space-sm)'}}>16,15€</span>
                  <span style={{fontSize: '1.2rem', color: 'var(--color-text)'}}> /hora</span>
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
          </div>
        </section>

        {/* Quality Section */}
        <section className="bg-primary" style={{padding: 'var(--space-xl) 0'}}>
          <div className="container">
            <div style={{textAlign: 'center', marginBottom: 'var(--space-xl)'}}>
              <h2 className="text-on-primary">Flexibilidad y calidad de servicio</h2>
              <p className="text-on-primary" style={{maxWidth: '800px', margin: '0 auto'}}>
                Nos ajustamos al ritmo de tu oficina, evitando interrupciones durante la jornada laboral.
                Gracias a nuestro sistema de control de calidad, supervisamos cada intervención para garantizar el mejor servicio.
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
            <FAQAccordion faqs={faqs} />
          </div>
        </section>

        {/* Related Services */}
        <RelatedServices
          currentService="oficinas"
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