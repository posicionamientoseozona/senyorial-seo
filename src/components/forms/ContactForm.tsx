"use client";

import React, { useState, useImperativeHandle, forwardRef, useCallback } from "react";
import styles from "./ContactForm.module.css";
import SuccessAnimation from "../ui/SuccessAnimation";
import { trackFormSubmission } from "@/lib/gtm";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  frequency: string;
  area: string;
  message: string;
}

interface ContactFormProps {
  onSubmit?: (isSubmitting: boolean, isValid: boolean) => void;
}

export interface ContactFormRef {
  submit: () => void;
}

const ContactForm = forwardRef<ContactFormRef, ContactFormProps>(({ onSubmit }, ref) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    frequency: "",
    area: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isFormValid = useCallback(() => {
    return formData.name.trim() !== "" &&
           formData.email.trim() !== "" &&
           formData.phone.trim() !== "" &&
           formData.service !== "" &&
           formData.message.trim() !== "";
  }, [formData.name, formData.email, formData.phone, formData.service, formData.message]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!isFormValid()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch('/api/send-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }

      setSubmitStatus("success");

      // Trackear conversión en GTM
      trackFormSubmission('contact');

      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        frequency: "",
        area: "",
        message: "",
      });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Exponer la función submit al componente padre
  useImperativeHandle(ref, () => ({
    submit: handleSubmit
  }));

  // Notificar al componente padre sobre cambios en el estado
  React.useEffect(() => {
    if (onSubmit) {
      onSubmit(isSubmitting, isFormValid());
    }
  }, [isSubmitting, formData, onSubmit, isFormValid]);

  const serviceOptions = [
    { value: "", label: "Selecciona un servicio" },
    { value: "limpieza-por-horas", label: "Limpieza por Horas" },
    { value: "oficinas", label: "Limpieza de Oficinas" },
    { value: "comunidades", label: "Limpieza de Comunidades" },
  ];

  const frequencyOptions = [
    { value: "", label: "¿Con qué frecuencia?" },
    { value: "unica", label: "Una vez" },
    { value: "semanal", label: "Cada 7 días" },
    { value: "quincenal", label: "Cada 14 días" },
    { value: "mensual", label: "Cada 28 días" },
  ];

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {submitStatus === "success" && (
        <SuccessAnimation
          type="contact"
          onClose={() => setSubmitStatus("idle")}
        />
      )}

      {submitStatus === "error" && (
        <div className={styles.errorMessage}>
          <span className={styles.errorIcon}>❌</span>
          <p>Ha ocurrido un error. Por favor, inténtalo de nuevo o llámanos directamente.</p>
        </div>
      )}

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Nombre completo *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            required
            placeholder="Tu nombre completo"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.label}>
            Teléfono *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={styles.input}
            required
            placeholder="+34 600 000 000"
          />
        </div>

        <div className={styles.formGroup + " " + styles.fullWidth}>
          <label htmlFor="email" className={styles.label}>
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
            placeholder="tu@email.com"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="service" className={styles.label}>
            Tipo de servicio *
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className={styles.select}
            required
          >
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="frequency" className={styles.label}>
            Frecuencia
          </label>
          <select
            id="frequency"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            className={styles.select}
          >
            {frequencyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup + " " + styles.fullWidth}>
          <label htmlFor="area" className={styles.label}>
            Superficie aproximada (m²)
          </label>
          <input
            type="text"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            className={styles.input}
            placeholder="Ej: 80 m², 3 habitaciones, etc."
          />
        </div>

        <div className={styles.formGroup + " " + styles.fullWidth}>
          <label htmlFor="message" className={styles.label}>
            Mensaje adicional *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={styles.textarea}
            rows={4}
            required
            placeholder="Cuéntanos más detalles sobre lo que necesitas..."
          />
        </div>
      </div>

    </form>
  );
});

ContactForm.displayName = 'ContactForm';

export default ContactForm;