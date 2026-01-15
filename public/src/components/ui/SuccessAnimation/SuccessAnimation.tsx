"use client";

import React, { useState, useEffect, useCallback } from "react";
import { CheckCircle2, X } from "lucide-react";
import styles from "./SuccessAnimation.module.css";

interface SuccessAnimationProps {
  title?: string;
  message?: string;
  type: "contact" | "quote" | "job";
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

const SuccessAnimation: React.FC<SuccessAnimationProps> = ({
  title,
  message,
  type,
  onClose,
  autoClose = true,
  autoCloseDelay = 5000,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  const getDefaultContent = () => {
    switch (type) {
      case "contact":
        return {
          title: "¡Solicitud enviada!",
          message: "Te contactaremos en menos de 24 horas. Revisa tu email para más detalles.",
        };
      case "quote":
        return {
          title: "¡Recibido!",
          message: "Enviaremos un presupuesto a tu email en menos de 1 minuto.",
        };
      case "job":
        return {
          title: "¡Aplicación enviada!",
          message: "Te contactaremos si tu perfil coincide con nuestras necesidades actuales.",
        };
      default:
        return {
          title: "¡Éxito!",
          message: "Tu solicitud ha sido enviada correctamente.",
        };
    }
  };

  const defaultContent = getDefaultContent();
  const displayTitle = title || defaultContent.title;
  const displayMessage = message || defaultContent.message;

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      setShouldRender(false);
      if (onClose) {
        onClose();
      }
    }, 300);
  }, [onClose]);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, handleClose]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div className={`${styles.overlay} ${isVisible ? styles.visible : ""}`}>
      <div className={`${styles.container} ${isVisible ? styles.containerVisible : ""}`}>
        <button className={styles.closeButton} onClick={handleClose} aria-label="Cerrar">
          <X size={20} />
        </button>

        <div className={styles.iconContainer}>
          <CheckCircle2
            className={`${styles.checkIcon} ${isVisible ? styles.checkIconVisible : ""}`}
            size={60}
          />
        </div>

        <h3 className={styles.title}>{displayTitle}</h3>
        <p className={styles.message}>{displayMessage}</p>

        <div className={styles.progressBar}>
          <div
            className={`${styles.progressFill} ${autoClose ? styles.progressFillActive : ""}`}
            style={{ animationDuration: `${autoCloseDelay}ms` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SuccessAnimation;