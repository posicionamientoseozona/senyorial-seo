import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Clock, Check, Star, Shield } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = 2026;

  const serviceLinks = [
    { href: "/servicios/limpieza-domestica", label: "Limpieza Doméstica" },
    { href: "/servicios/oficinas", label: "Oficinas y Negocios" },
    { href: "/servicios/hoteles", label: "Limpieza de Hoteles" },
    { href: "/servicios/comunidades", label: "Limpieza de Comunidades" },
  ];

  const companyLinks = [
    { href: "/", label: "Inicio" },
    { href: "/servicios", label: "Servicios" },
    { href: "/empleo", label: "Empleo" },
    { href: "/contacto", label: "Contacto" },
    { href: "/presupuestar", label: "Presupuestar" },
  ];

  const legalLinks = [
    { href: "/legal/politica-privacidad", label: "Política de Privacidad" },
    { href: "/legal/politica-cookies", label: "Política de Cookies" },
    { href: "/legal/terminos-y-condiciones", label: "Términos y Condiciones" },
  ];

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          {/* Sección principal con logo e info */}
          <div className={styles.mainSection}>
            <Link href="/" className={styles.footerLogo}>
              <Image
                src="/images/logoSenyorial/s-f1-clean.png"
                alt="Senyorial - Empresa de Limpieza"
                width={80}
                height={80}
                style={{ objectFit: 'contain', width: 'auto', height: '60px' }}
              />
            </Link>
            <p className={styles.description}>
              Empresa de limpieza profesional en Palma de Mallorca.
              Ofrecemos servicios de limpieza doméstica, oficinas,
              limpieza profunda y final de obra con la máxima calidad.
            </p>
            <div className={styles.socialLinks}>
              {/* Redes sociales - agregar cuando estén disponibles */}
            </div>
          </div>

          {/* Servicios */}
          <div className={styles.linkSection}>
            <span className={styles.sectionTitle}>Servicios</span>
            <ul className={styles.linkList}>
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div className={styles.linkSection}>
            <span className={styles.sectionTitle}>Empresa</span>
            <ul className={styles.linkList}>
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA y Contacto */}
          <div className={styles.contactSection}>
            <span className={styles.sectionTitle}>¿Necesitas presupuesto?</span>
            <div className={styles.ctaContainer}>
              <Link href="/presupuestar" className={styles.footerCtaButton}>
                Presupuestar Gratis
              </Link>
            </div>

            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <Phone className={styles.contactIcon} size={20} />
                <div>
                  <a href="https://wa.me/34611710243" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                    +34 611 71 02 43
                  </a>
                  <p className={styles.contactNote}>Llamadas y WhatsApp</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <MapPin className={styles.contactIcon} size={20} />
                <div>
                  <p className={styles.contactText}>
                    C/Ricard Roca 4<br />
                    07008, Palma de Mallorca
                  </p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <Clock className={styles.contactIcon} size={20} />
                <div>
                  <p className={styles.contactText}>
                    <strong>L-V:</strong> 9:00 - 21:00<br />
                    <strong>S-D:</strong> Consultar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Separador */}
        <hr className={styles.divider} />

        {/* Sección inferior */}
        <div className={styles.footerBottom}>
          <div className={styles.legal}>
            <p className={styles.copyright}>
              © {currentYear} Senyorial. Todos los derechos reservados.
            </p>
            <div className={styles.legalLinks}>
              {legalLinks.map((link, index) => (
                <span key={link.href}>
                  <Link href={link.href} className={styles.legalLink}>
                    {link.label}
                  </Link>
                  {index < legalLinks.length - 1 && <span className={styles.separator}> | </span>}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.badges}>
            <div className={styles.badge}>
              <Check className={styles.badgeIcon} size={16} />
              <span>Empresa Local</span>
            </div>
            <div className={styles.badge}>
              <Star className={styles.badgeIcon} size={16} />
              <span>Calidad Garantizada</span>
            </div>
            <div className={styles.badge}>
              <Shield className={styles.badgeIcon} size={16} />
              <span>Seguros Incluidos</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}