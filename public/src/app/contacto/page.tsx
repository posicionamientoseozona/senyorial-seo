"use client";

import { useState, useRef } from "react";
import Layout from "@/components/layout/Layout";
import ContactForm, { ContactFormRef } from "@/components/forms/ContactForm";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Phone, MapPin, Clock, Zap, MessageCircle, Gift, Shield, Mail } from "lucide-react";
import styles from "./contacto.module.css";

export default function ContactoPage() {
  const breadcrumbItems = [
    { label: "Senyorial", href: "/" },
    { label: "Contacto" }
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const contactFormRef = useRef<ContactFormRef>(null);

  const handleFormStatusChange = (submitting: boolean, valid: boolean) => {
    setIsSubmitting(submitting);
    setIsFormValid(valid);
  };

  const handleFloatingButtonClick = () => {
    if (contactFormRef.current && isFormValid && !isSubmitting) {
      contactFormRef.current.submit();
    }
  };
  return (
    <Layout>
      <div className={styles.contactPage}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1 className={styles.title}>
                <span className={styles.highlight}>Contacta</span> con Nosotros
              </h1>
              <p className={styles.subtitle}>
                Estamos aquí para ayudarte con todas tus necesidades de limpieza.
                Solicita tu presupuesto personalizado sin compromiso.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className={styles.mainContent}>
          <div className="container">
            <div className={styles.contentGrid}>
              {/* Formulario */}
              <div className={styles.formSection}>
                <div className={styles.formWrapper}>
                  <h2 className={styles.formTitle}>Solicita tu presupuesto</h2>
                  <p className={styles.formDescription}>
                    Rellena el formulario y te contactaremos en menos de 24 horas
                    con un presupuesto personalizado para tus necesidades.
                  </p>
                  <ContactForm
                    ref={contactFormRef}
                    onSubmit={handleFormStatusChange}
                  />
                </div>
              </div>

              {/* Información de contacto */}
              <div className={styles.infoSection}>
                <div className={styles.infoCard}>
                  <h3 className={styles.infoTitle}>Información de Contacto</h3>

                  <div className={styles.contactItems}>
                    <div className={styles.contactItem}>
                      <div className={styles.iconWrapper}>
                        <Phone className={styles.icon} />
                      </div>
                      <div className={styles.contactContent}>
                        <h4 className={styles.contactLabel}>Teléfono</h4>
                        <a
                          href="https://wa.me/34611710243"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.contactValue}
                          data-gtm-event="whatsapp_contact"
                          data-gtm-source="contacto-telefono"
                        >
                          +34 611 71 02 43
                        </a>
                        <p className={styles.contactNote}>Llamadas y WhatsApp disponibles</p>
                      </div>
                    </div>

                    <div className={styles.contactItem}>
                      <div className={styles.iconWrapper}>
                        <MapPin className={styles.icon} />
                      </div>
                      <div className={styles.contactContent}>
                        <h4 className={styles.contactLabel}>Zona de Servicio</h4>
                        <p className={styles.contactValue}>
                          Palma de Mallorca<br />
                          Islas Baleares, España
                        </p>
                        <p className={styles.contactNote}>Y alrededores</p>
                      </div>
                    </div>

                    <div className={styles.contactItem}>
                      <div className={styles.iconWrapper}>
                        <Clock className={styles.icon} />
                      </div>
                      <div className={styles.contactContent}>
                        <h4 className={styles.contactLabel}>Horarios</h4>
                        <div className={styles.contactValue}>
                          <p><strong>Lunes a Viernes:</strong><br />9:00 - 21:00</p>
                          <p><strong>Sábado y Domingo:</strong><br />Consultar disponibilidad</p>
                        </div>
                        <p className={styles.contactNote}>Horarios flexibles disponibles</p>
                      </div>
                    </div>

                    <div className={styles.contactItem}>
                      <div className={styles.iconWrapper}>
                        <Zap className={styles.icon} />
                      </div>
                      <div className={styles.contactContent}>
                        <h4 className={styles.contactLabel}>Tiempo de Respuesta</h4>
                        <p className={styles.contactValue}>Menos de 24 horas</p>
                        <p className={styles.contactNote}>Respuesta rápida garantizada</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <div className={styles.whatsappCard}>
                  <div className={styles.whatsappContent}>
                    <MessageCircle className={styles.whatsappIcon} />
                    <h3 className={styles.whatsappTitle}>¿Necesitas ayuda inmediata?</h3>
                    <p className={styles.whatsappText}>
                      Escríbenos por WhatsApp para consultas rápidas
                      y servicios urgentes.
                    </p>
                    <a
                      href="https://wa.me/34611710243?text=Hola, necesito información sobre servicios de limpieza"
                      className="btn3"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-gtm-event="whatsapp_contact"
                      data-gtm-source="contacto-cta"
                    >
                      <MessageCircle size={20} style={{marginRight: '8px'}} />
                      Escribir por WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Breadcrumbs items={breadcrumbItems} />

        {/* Benefits Section */}
        <section className={styles.benefitsSection}>
          <div className="container">
            <div className={styles.benefitsGrid}>
              <div className={styles.benefit}>
                <Gift className={styles.benefitIcon} />
                <h3 className={styles.benefitTitle}>Presupuesto Gratuito</h3>
                <p className={styles.benefitText}>
                  Sin coste ni compromiso. Te damos un presupuesto detallado y transparente.
                </p>
              </div>

              <div className={styles.benefit}>
                <Clock className={styles.benefitIcon} />
                <h3 className={styles.benefitTitle}>Respuesta en 24h</h3>
                <p className={styles.benefitText}>
                  Te contactamos en menos de 24 horas con toda la información que necesitas.
                </p>
              </div>

              <div className={styles.benefit}>
                <Zap className={styles.benefitIcon} />
                <h3 className={styles.benefitTitle}>Totalmente Personalizado</h3>
                <p className={styles.benefitText}>
                  Cada presupuesto se adapta a tus necesidades específicas y horarios.
                </p>
              </div>

              <div className={styles.benefit}>
                <Shield className={styles.benefitIcon} />
                <h3 className={styles.benefitTitle}>Garantía Total</h3>
                <p className={styles.benefitText}>
                  Todos nuestros servicios incluyen seguro y garantía de satisfacción.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Botón Flotante de Contacto */}
        <div className={styles.floatingButton}>
          <button
            onClick={handleFloatingButtonClick}
            disabled={!isFormValid || isSubmitting}
            className={isFormValid && !isSubmitting ? 'btn1' : `${styles.contactoButton} ${!isFormValid ? styles.disabled : ''}`}
          >
            {isSubmitting ? (
              <>
                <span className={styles.loadingSpinner}></span>
                Enviando...
              </>
            ) : (
              <>
                <Mail size={20} style={{marginRight: '8px'}} />
                Contactar Ahora
              </>
            )}
          </button>
        </div>
      </div>
    </Layout>
  );
}