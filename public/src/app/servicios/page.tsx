import { Metadata } from "next";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import styles from "./servicios.module.css";

export const metadata: Metadata = {
  title: "Servicios de Limpieza Profesional | Senyorial Mallorca",
  description: "Descubre todos nuestros servicios de limpieza profesional en Palma de Mallorca: limpieza doméstica, profunda, final de obra y oficinas. Calidad garantizada.",
  keywords: ["servicios limpieza", "Palma de Mallorca", "limpieza doméstica", "limpieza oficinas", "limpieza profunda", "final de obra"],
  openGraph: {
    title: "Servicios de Limpieza Profesional | Senyorial",
    description: "Servicios de limpieza profesional en Palma de Mallorca con calidad garantizada",
    type: "website",
    locale: "es_ES",
    siteName: "Senyorial",
    url: "https://senyorial.es/servicios",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Servicios de Limpieza Profesional - Senyorial Palma de Mallorca",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios de Limpieza Profesional | Senyorial",
    description: "Limpieza doméstica, oficinas, hoteles y comunidades en Palma de Mallorca",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://senyorial.es/servicios",
  },
};

export default function ServiciosPage() {
  const breadcrumbItems = [
    { label: "Senyorial", href: "/" },
    { label: "Servicios" }
  ];

  const services = [
    {
      id: "oficinas",
      title: "Limpieza de Oficinas",
      subtitle: "Espacios profesionales",
      description: "Servicios de limpieza comercial para oficinas y despachos en Palma de Mallorca. Productos incluidos, flexibilidad horaria y control de calidad supervisado.",
      image: "/images/services/oficinas/Oficinas-hero.webp",
      features: [
        "Limpieza de áreas de trabajo y escritorios",
        "Mismos profesionales en cada servicio",
        "Productos específicos para cada superficie",
        "Horarios adaptables (fuera de horario laboral)",
        "Servicio cubierto con seguro de Responsabilidad Civil",
        "Sistema de control de calidad supervisado"
      ],
      price: "Desde 16,15€/hora",
      href: "/servicios/oficinas"
    },
    {
      id: "hoteles",
      title: "Limpieza de Hoteles",
      subtitle: "Sector hotelero",
      description: "Servicios especializados de limpieza para hoteles, hostales y apartamentos turísticos. Garantizamos la máxima higiene y confort para todos tus huéspedes.",
      image: "/images/services/hoteles/IMG_9639-scaled-1-1.webp",
      features: [
        "Limpieza de habitaciones y check-out",
        "Cambio de ropa de cama y toallas",
        "Limpieza de baños y amenities",
        "Mantenimiento de zonas comunes",
        "Limpieza de restaurantes y cocinas",
        "Servicio 24/7 disponible"
      ],
      price: "Presupuesto personalizado",
      href: "/servicios/hoteles"
    },
    {
      id: "comunidades",
      title: "Limpieza de Comunidades",
      subtitle: "Espacios comunitarios",
      description: "Mantenimiento integral de comunidades de vecinos, escaleras, portales y zonas comunes. Servicio regular para mantener impecables los espacios compartidos.",
      image: "/images/services/comunidades/Comunidades-hero.webp",
      features: [
        "Limpieza de escaleras y rellanos",
        "Mantenimiento de portales y entradas",
        "Limpieza de ascensores",
        "Limpieza de garajes y sótanos",
        "Mantenimiento de zonas ajardinadas",
        "Servicio regular programado"
      ],
      price: "Desde 17,85€/hora",
      href: "/servicios/comunidades"
    },
    {
      id: "limpieza-domestica",
      title: "Limpieza Doméstica",
      subtitle: "Servicio flexible por horas",
      description: "Servicio versátil y flexible por horas para particulares. Incluye servicios puntuales, frecuentes, final de obra, mudanzas y situaciones especiales.",
      image: "/images/services/hogares/kitchen-2165756_1920.webp",
      features: [
        "Servicio flexible por horas según necesidades",
        "Tarifa básica: cliente aporta productos",
        "Tarifa premium: incluye productos profesionales",
        "Final de obra para comercios",
        "Limpieza después de mudanzas",
        "Situaciones especiales (incendios, emergencias)"
      ],
      price: "Desde 16,15€/hora",
      href: "/servicios/limpieza-domestica"
    }
  ];

  return (
    <Layout>
      <div className={styles.servicesPage}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1 className={styles.title}>
                Nuestros <span className={styles.highlight}>Servicios</span>
              </h1>
              <p className={styles.subtitle}>
                Ofrecemos servicios de limpieza profesional adaptados a cada necesidad
                en Palma de Mallorca. Calidad garantizada y total satisfacción.
              </p>
            </div>
          </div>
        </section>

        <Breadcrumbs items={breadcrumbItems} />

        {/* Services Section */}
        <section className={styles.servicesSection}>
          <div className="container">
            <div className={styles.servicesGrid}>
              {services.map((service) => (
                <div key={service.id} className={styles.serviceCard}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={400}
                      height={300}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={styles.serviceImage}
                    />
                    <div className={styles.priceTag}>
                      {service.price}
                    </div>
                  </div>

                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <span className={styles.serviceSubtitle}>{service.subtitle}</span>
                      <h2 className={styles.serviceTitle}>{service.title}</h2>
                      <p className={styles.serviceDescription}>{service.description}</p>
                    </div>

                    <div className={styles.featuresSection}>
                      <h3 className={styles.featuresTitle}>¿Qué incluye?</h3>
                      <ul className={styles.featuresList}>
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className={styles.feature}>
                            <span className={styles.checkIcon}>✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.cardActions}>
                      <Link href={service.href} className="btn4">
                        Más información
                      </Link>
                      <Link href="/presupuestar" className="btn1">
                        Solicitar presupuesto
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaCard}>
              <h2 className={styles.ctaTitle}>¿Necesitas un servicio personalizado?</h2>
              <p className={styles.ctaText}>
                Si no encuentras exactamente lo que buscas, no te preocupes.
                Creamos soluciones de limpieza a medida para cada cliente.
              </p>
              <div className={styles.ctaActions}>
                <Link href="/presupuestar" className="btn1">
                  Presupuestar Gratis
                </Link>
                <a href="https://wa.me/34611710243" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  <Phone size={16} style={{marginRight: '8px'}} />
                  +34 611 71 02 43
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}