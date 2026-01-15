import Link from "next/link";
import { Phone, MapPin, Clock, AlertTriangle, MessageCircle, Mail } from "lucide-react";
import styles from "./ContactCTA.module.css";

export default function ContactCTA() {
  return (
    <section className={styles.cta}>
      <div className="container">
        <div className={styles.ctaCard}>
          <div className={styles.ctaContent}>
            <h2 className={styles.title}>
              ¿No encuentras lo que <span className={styles.highlight}>buscas</span>?
            </h2>
            <p className={styles.description}>
              Ofrecemos servicios de limpieza personalizados: limpieza por horas, limpieza de oficinas, mantenimiento de comunidades y soluciones adaptadas a tus necesidades específicas. Contacta con nosotros para una solución a medida.
            </p>

            <div className={styles.buttons}>
              <Link href="/presupuestar" className="btn1">
                Solicitar Presupuesto
              </Link>
              <Link href="/contacto" className="btn2">
                <Mail size={20} style={{marginRight: '8px'}} />
                Contactar
              </Link>
            </div>
          </div>

          <div className={styles.contactInfo}>
            <div className={styles.infoSection}>
              <h3 className={styles.infoTitle}>Contacta con nosotros</h3>

              <div className={styles.infoItems}>
                <div className={styles.infoItem}>
                  <Phone className={styles.infoIcon} size={24} />
                  <div className={styles.infoContent}>
                    <p className={styles.infoLabel}>Teléfono y WhatsApp</p>
                    <a
                      href="https://wa.me/34611710243"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.infoValue}
                      data-gtm-event="whatsapp_contact"
                      data-gtm-source="cta-telefono"
                    >
                      +34 611 71 02 43
                    </a>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <MapPin className={styles.infoIcon} size={24} />
                  <div className={styles.infoContent}>
                    <p className={styles.infoLabel}>Zona de servicio</p>
                    <p className={styles.infoValue}>
                      Palma de Mallorca<br />
                      Islas Baleares
                    </p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <Clock className={styles.infoIcon} size={24} />
                  <div className={styles.infoContent}>
                    <p className={styles.infoLabel}>Horarios</p>
                    <p className={styles.infoValue}>
                      <strong>L-V:</strong> 9:00 - 21:00<br />
                      <strong>S-D:</strong> Consultar
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.urgentSection}>
              <div className={styles.urgentBadge}>
                <AlertTriangle className={styles.urgentIcon} size={24} />
                <div>
                  <p className={styles.urgentTitle}>¿Necesidad urgente?</p>
                  <p className={styles.urgentText}>
                    Contacta por WhatsApp para servicios de emergencia
                  </p>
                  <a
                    href="https://wa.me/34611710243?text=Hola, necesito un servicio urgente de limpieza"
                    className="btn3"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-gtm-event="whatsapp_contact"
                    data-gtm-source="cta-urgente"
                  >
                    <MessageCircle size={20} style={{marginRight: '8px'}} />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}