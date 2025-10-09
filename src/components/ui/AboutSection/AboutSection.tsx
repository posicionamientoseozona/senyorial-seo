import { Users, Trophy, Zap, UserCheck, Wrench, Shield, Check, Smartphone, MapPin, Cpu } from "lucide-react";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  const stats = [
    {
      number: "6",
      label: "Años de Experiencia",
      sublabel: "Desde 2019",
      icon: Trophy
    },
    {
      number: "+2.500",
      label: "Servicios Anuales",
      sublabel: "+50 semanales",
      icon: Users
    },
    {
      number: "300.000€",
      label: "Seguro Responsabilidad Civil",
      sublabel: "Máxima protección",
      icon: Shield
    },
    {
      number: "<24h",
      label: "Tiempo Respuesta",
      sublabel: "Presupuesto online 2min",
      icon: Zap
    }
  ];

  const technologies = [
    {
      title: "Software de Gestión de Tareas",
      description: "Tecnología de última generación para gestión de equipos y optimización de tareas",
      icon: Cpu
    },
    {
      title: "Control Geolocalizado",
      description: "Seguimiento en tiempo real de servicios y auditoría automática de calidad",
      icon: MapPin
    },
    {
      title: "Presupuesto Online en PDF",
      description: "Obtén un presupuesto de limpieza personalizado, totalmente online. ¡En menos de dos minutos!",
      icon: Smartphone
    }
  ];

  const benefits = [
    {
      title: "Formación Específica Certificada",
      description: "Todo nuestro equipo recibe formación específica antes de incorporarse, garantizando técnicas profesionales de limpieza.",
      icon: UserCheck
    },
    {
      title: "Productos de Limpieza Profesionales",
      description: "Utilizamos únicamente productos profesionales de alta calidad, específicos para cada tipo de superficie y material.",
      icon: Wrench
    },
    {
      title: "Responsabilidad Civil 300.000€",
      description: "Responsabilidad civil de hasta 300.000€ para cubrir incidencias causadas a terceros durante la realización del servicio.",
      icon: Shield
    }
  ];

  return (
    <section className={styles.about}>
      {/* Estadísticas */}
      <div className={styles.statsSection}>
        <div className={styles.statsScroll}>
          <div className={styles.statsContainer}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <stat.icon className={styles.statIcon} size={32} />
                <span className={styles.statNumber}>{stat.number}</span>
                <span className={styles.statLabel}>{stat.label}</span>
                {stat.sublabel && (
                  <span className={styles.statSublabel}>{stat.sublabel}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container">
        <div className={styles.contentWrapper}>
          <h2 className={styles.title}>
            Limpiezas Profesionales desde 2019
          </h2>
          <p className={styles.description}>
            <strong>Senyorial</strong> es la empresa de limpieza Palma líder en servicios profesionales,
            especializada en limpieza doméstica, oficinas, hoteles y comunidades en <strong>Palma de Mallorca y alrededores</strong>. Como empresa de limpieza Palma de referencia, contamos con 6 años de experiencia
            y más de 2.500 servicios anuales, distinguiéndonos por nuestra tecnología avanzada y seguro
            de responsabilidad civil de 300.000€.
          </p>
        </div>
      </div>

      {/* Sección Combinada de Benefits y Tecnología */}
      <div className={styles.combinedSection}>
        <div className={styles.horizontalScroll}>
          <div className={styles.cardsContainer}>
            {benefits.map((benefit, index) => (
              <div key={`benefit-${index}`} className={styles.scrollCard}>
                <div className={styles.cardIcon}>
                  <benefit.icon size={32} />
                </div>
                <h3 className={styles.cardTitle}>{benefit.title}</h3>
                <p className={styles.cardDescription}>{benefit.description}</p>
              </div>
            ))}
            {technologies.map((tech, index) => (
              <div key={`tech-${index}`} className={styles.scrollCard}>
                <div className={styles.cardIcon}>
                  <tech.icon size={32} />
                </div>
                <h3 className={styles.cardTitle}>{tech.title}</h3>
                <p className={styles.cardDescription}>{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.contentWrapper}>
          <div className={styles.commitment}>
            <h3 className={styles.commitmentTitle}>Por Qué Somos Diferentes</h3>
            <div className={styles.commitmentPoints}>
              <div className={styles.commitmentPoint}>
                <Check className={styles.pointIcon} size={20} />
                <span>Empresa de limpieza Palma con seguimiento en tiempo real</span>
              </div>
              <div className={styles.commitmentPoint}>
                <Check className={styles.pointIcon} size={20} />
                <span>Trazabilidad total y auditoría automática de cada servicio</span>
              </div>
              <div className={styles.commitmentPoint}>
                <Check className={styles.pointIcon} size={20} />
                <span>Presupuestos online instantáneos en menos de 2 minutos</span>
              </div>
              <div className={styles.commitmentPoint}>
                <Check className={styles.pointIcon} size={20} />
                <span>Seguro de responsabilidad civil de 300.000€</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
