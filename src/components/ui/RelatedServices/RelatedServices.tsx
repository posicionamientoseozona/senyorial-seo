import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import styles from "./RelatedServices.module.css";

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  price?: string;
}

interface RelatedServicesProps {
  currentService: string;
  title?: string;
  className?: string;
}

export default function RelatedServices({
  currentService,
  title = "Otros servicios que podrían interesarte",
  className = ""
}: RelatedServicesProps) {
  const allServices: Service[] = [
    {
      id: "oficinas",
      title: "Limpieza de Oficinas",
      description: "Espacios profesionales impecables con control de calidad supervisado",
      image: "/images/services/oficinas/Oficinas-hero.webp",
      href: "/servicios/oficinas",
      price: "Desde 16,15€/hora"
    },
    {
      id: "comunidades",
      title: "Limpieza de Comunidades",
      description: "Mantenimiento integral de portales, escaleras y zonas comunes",
      image: "/images/services/comunidades/Comunidades-hero.webp",
      href: "/servicios/comunidades",
      price: "Desde 17,85€/hora"
    },
    {
      id: "hoteles",
      title: "Limpieza de Hoteles",
      description: "Servicio especializado para el sector hotelero y turístico",
      image: "/images/services/hoteles/IMG_9639-scaled-1-1.webp",
      href: "/servicios/hoteles",
      price: "Presupuesto personalizado"
    },
    {
      id: "limpieza-domestica",
      title: "Limpieza Doméstica",
      description: "Servicio flexible por horas para particulares y situaciones especiales",
      image: "/images/services/hogares/kitchen-2165756_1920.webp",
      href: "/servicios/limpieza-domestica",
      price: "Desde 16,15€/hora"
    }
  ];

  // Filtrar el servicio actual y mostrar máximo 3
  const relatedServices = allServices
    .filter(service => service.id !== currentService)
    .slice(0, 3);

  if (relatedServices.length === 0) return null;

  return (
    <section className={`${styles.relatedServices} ${className}`}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <Link href="/servicios" className={styles.viewAll}>
            Ver todos los servicios
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className={styles.servicesGrid}>
          {relatedServices.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className={styles.serviceCard}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={service.image}
                  alt={service.title}
                  width={300}
                  height={200}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.serviceImage}
                />
                {service.price && (
                  <div className={styles.priceTag}>
                    {service.price}
                  </div>
                )}
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>

                <div className={styles.cardFooter}>
                  <span className={styles.learnMore}>
                    Más información
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}