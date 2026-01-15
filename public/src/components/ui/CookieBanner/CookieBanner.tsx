"use client";

import { useState, useEffect } from 'react';
import styles from './CookieBanner.module.css';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (consent: 'all' | 'essential') => {
    localStorage.setItem('cookie_consent', consent);
    setIsVisible(false);
    // We might need to reload or trigger an event to load scripts if consent was just given
    window.dispatchEvent(new CustomEvent('cookie_consent_update', { detail: consent }));
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.cookieBanner}>
      <div className={styles.content}>
        <p className={styles.text}>
          Este sitio web utiliza cookies para mejorar la experiencia del usuario y analizar el tráfico. Puedes aceptar todas o solo las esenciales.
          {/* Replace with your actual privacy policy page */}
          {/* <Link href="/politica-de-privacidad" className={styles.policyLink}>Política de Privacidad</Link> */}
        </p>
        <div className={styles.actions}>
          <button onClick={() => handleConsent('essential')} className={styles.declineButton}>
            Rechazar
          </button>
          <button onClick={() => handleConsent('all')} className={styles.acceptButton}>
            Aceptar Todas
          </button>
        </div>
      </div>
    </div>
  );
}
