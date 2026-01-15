import Link from "next/link";
import Image from "next/image";
import styles from "./ServicesSection.module.css";

export default function ServicesSection() {

  const services = [
    {
      title: "Oficinas y Negocios",
      description: "Servicios de limpieza comercial para oficinas, locales y espacios de trabajo profesionales.",
      icon: "/images/services/oficinas/oficinaslimp.webp",
      href: "/servicios/oficinas",
      features: ["Limpieza comercial", "Horarios adaptables", "Mantenimiento regular", "Imagen profesional", "Personal especializado"]
    },
    {
      title: "Limpieza de Hoteles",
      description: "Servicios especializados para hoteles y apartamentos turísticos.",
      icon: "/images/services/hoteles/IMG_9639-scaled-1-1.webp",
      href: "/servicios/hoteles",
      features: ["Sector hotelero", "Check-out rápido", "Zonas comunes", "Servicio 24/7", "Habitaciones y baños"]
    },
    {
      title: "Limpieza Comunidades",
      description: "Limpieza integral de comunidades: escaleras, portales y zonas comunes.",
      icon: "/images/services/comunidades/comunidadeslimp.webp",
      href: "/servicios/comunidades",
      features: ["Escaleras y portales", "Zonas comunes", "Servicio regular", "Garajes incluidos", "Ascensores y accesos"]
    },
    {
      title: "Limpieza Doméstica",
      description: "Servicio versátil y flexible por horas para particulares y situaciones especiales.",
      icon: "/images/services/hogares/hogareslimp.webp",
      href: "/servicios/limpieza-domestica",
      features: ["Servicio por horas", "Tarifa básica/premium", "Final de obra", "Mudanzas", "Situaciones especiales"]
    }
  ];

  return (
    <section className={styles.services} id="servicios">
      <div className="container">
        <header className={styles.header}>
          <h2 className={styles.title}>Servicios de Limpieza</h2>
          <p className={styles.subtitle}>
            Servicios de limpieza profesionales: limpieza de oficinas, limpieza por horas, mantenimiento de comunidades y soluciones especializadas para cada cliente en Palma de Mallorca.
          </p>
        </header>
      </div>

      <div className={styles.servicesScroll}>
        <div className={styles.servicesContainer}>
          {services.map((service, index) => (
            <article key={index} className={styles.serviceCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <Image
                    src={service.icon}
                    alt={`Icono de ${service.title}`}
                    fill
                    sizes="(max-width: 768px) 80px, 100px"
                    className={styles.serviceIcon}
                  />
                </div>
                <h3 className={styles.cardTitle}>{service.title}</h3>
              </div>

              <div className={styles.cardContent}>
                <p className={styles.cardDescription}>{service.description}</p>

                <ul className={styles.featureList}>
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={styles.feature}>
                      <span className={styles.checkIcon}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.cardFooter}>
                <Link href={service.href} className="btn4">
                  Más información
                  <span className={styles.arrow}>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="container">
        <div className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>¿Buscas una Empresa de Limpiezas en Palma de Confianza?</h2>
            <p className={styles.ctaText}>
              Ofrecemos servicios personalizados adaptados a tus necesidades específicas.
              Contacta con nosotros y te daremos una solución a medida.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/presupuestar" className="btn1">
                Solicitar Presupuesto
              </Link>
              <Link href="/contacto" className="btn2">
                Contactar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}