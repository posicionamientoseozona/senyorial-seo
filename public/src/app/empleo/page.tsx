"use client";

import { useState, useRef } from "react";
import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import {
  Users,
  Clock,
  MapPin,
  GraduationCap,
  Heart,
  Upload,
  X,
  Send,
  TrendingUp,
  Shield,
  Banknote
} from "lucide-react";
import SuccessAnimation from "@/components/ui/SuccessAnimation";
import styles from "./empleo.module.css";

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  experiencia: string;
  disponibilidad: string[];
  zonasPreferidas: string[];
  cv: File | null;
  presentacion: string;
}

interface ValidationErrors {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
}

interface FieldTouched {
  nombre: boolean;
  email: boolean;
  telefono: boolean;
  direccion: boolean;
}

export default function EmpleoPage() {
  const breadcrumbItems = [
    { label: "Senyorial", href: "/" },
    { label: "Empleo" }
  ];

  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    experiencia: "0",
    disponibilidad: [],
    zonasPreferidas: [],
    cv: null,
    presentacion: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({
    nombre: "El nombre es obligatorio",
    email: "El email es obligatorio",
    telefono: "El teléfono es obligatorio",
    direccion: "La dirección es obligatoria"
  });
  const [touched, setTouched] = useState<FieldTouched>({
    nombre: false,
    email: false,
    telefono: false,
    direccion: false
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Funciones de validación
  const validateField = (field: keyof ValidationErrors, value: string): string => {
    switch (field) {
      case 'nombre':
        if (!value.trim()) return 'El nombre es obligatorio';
        if (value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres';
        return '';

      case 'email':
        if (!value.trim()) return 'El email es obligatorio';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Introduce un email válido';
        return '';

      case 'telefono':
        if (!value.trim()) return 'El teléfono es obligatorio';
        const phoneRegex = /^(\+34|0034|34)?[6-9]\d{8}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) return 'Introduce un teléfono español válido';
        return '';

      case 'direccion':
        if (!value.trim()) return 'La dirección es obligatoria';
        if (value.trim().length < 8) return 'La dirección debe ser completa';
        return '';

      default:
        return '';
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Validar solo campos obligatorios
    if (['nombre', 'email', 'telefono', 'direccion'].includes(field)) {
      const error = validateField(field as keyof ValidationErrors, String(value));
      setErrors(prev => ({
        ...prev,
        [field]: error
      }));
    }
  };

  const handleFieldBlur = (field: keyof ValidationErrors) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const handleCheckboxChange = (field: 'disponibilidad' | 'zonasPreferidas', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleCVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Verificar tipo de archivo
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!validTypes.includes(file.type)) {
      alert('Por favor, sube un archivo PDF o Word (.doc/.docx)');
      return;
    }

    // Verificar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('El archivo no puede superar los 5MB');
      return;
    }

    setFormData(prev => ({
      ...prev,
      cv: file
    }));
  };

  const removeCv = () => {
    setFormData(prev => ({
      ...prev,
      cv: null
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isFormValid = () => {
    return formData.nombre &&
           formData.email &&
           formData.telefono &&
           formData.direccion &&
           formData.disponibilidad.length > 0 &&
           formData.zonasPreferidas.length > 0 &&
           formData.cv &&
           formData.presentacion.trim() &&
           !errors.nombre &&
           !errors.email &&
           !errors.telefono &&
           !errors.direccion;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Crear FormData para enviar archivos
      const submitFormData = new FormData();

      // Añadir campos de texto
      submitFormData.append('nombre', formData.nombre);
      submitFormData.append('email', formData.email);
      submitFormData.append('telefono', formData.telefono);
      submitFormData.append('direccion', formData.direccion);
      submitFormData.append('experiencia', formData.experiencia);
      submitFormData.append('presentacion', formData.presentacion);

      // Añadir arrays
      formData.disponibilidad.forEach(item => {
        submitFormData.append('disponibilidad', item);
      });

      formData.zonasPreferidas.forEach(item => {
        submitFormData.append('zonasPreferidas', item);
      });

      // Añadir CV si existe
      if (formData.cv) {
        submitFormData.append('cv', formData.cv);
      }

      // Enviar a la API
      const response = await fetch('/api/send-job-application', {
        method: 'POST',
        body: submitFormData
      });

      if (!response.ok) {
        throw new Error('Error al enviar la candidatura');
      }

      await response.json();

      setShowSuccess(true);

      // Reset form
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        direccion: "",
        experiencia: "0",
        disponibilidad: [],
        zonasPreferidas: [],
        cv: null,
        presentacion: ""
      });
      setTouched({
        nombre: false,
        email: false,
        telefono: false,
        direccion: false
      });

      // Limpiar también el input de archivo
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar la candidatura. Por favor, inténtelo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className={styles.empleoPage}>
        {showSuccess && (
          <SuccessAnimation
            type="job"
            onClose={() => setShowSuccess(false)}
          />
        )}
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1 className={styles.title}>
                Únete a Nuestro <span className={styles.highlight}>Equipo de Limpieza</span>
              </h1>
              <p className={styles.subtitle}>
                Buscamos personas responsables y comprometidas para formar parte de nuestro equipo.
                Ofrecemos estabilidad laboral, formación continua y un ambiente de trabajo positivo.
              </p>
              <div className={styles.heroFeatures}>
                <span className={styles.feature}>Trabajo estable</span>
                <span className={styles.feature}>Formación incluida</span>
                <span className={styles.feature}>Crecimiento profesional</span>
              </div>
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
                  <h2 className={styles.formTitle}>Envía tu candidatura</h2>
                  <p className={styles.formDescription}>
                    Completa todos los campos del formulario y nos pondremos en contacto contigo
                    para explicarte las oportunidades disponibles. Todos los campos son obligatorios.
                  </p>

                  <div className={styles.form}>
                    {/* Información Personal */}
                    <div className={styles.formGroup}>
                      <h3 className={styles.groupTitle}>Información Personal</h3>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Nombre completo *</label>
                        <input
                          type="text"
                          className={`${styles.input} ${errors.nombre ? styles.inputError : ''} ${!errors.nombre && formData.nombre ? styles.inputValid : ''}`}
                          value={formData.nombre}
                          onChange={(e) => handleInputChange('nombre', e.target.value)}
                          onBlur={() => handleFieldBlur('nombre')}
                          placeholder="Tu nombre completo"
                        />
                        {touched.nombre && errors.nombre && (
                          <span className={styles.errorMessage}>{errors.nombre}</span>
                        )}
                      </div>

                      <div className={styles.formGrid}>
                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Email *</label>
                          <input
                            type="email"
                            className={`${styles.input} ${errors.email ? styles.inputError : ''} ${!errors.email && formData.email ? styles.inputValid : ''}`}
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            onBlur={() => handleFieldBlur('email')}
                            placeholder="tu@email.com"
                          />
                          {touched.email && errors.email && (
                            <span className={styles.errorMessage}>{errors.email}</span>
                          )}
                        </div>

                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Teléfono *</label>
                          <input
                            type="tel"
                            className={`${styles.input} ${errors.telefono ? styles.inputError : ''} ${!errors.telefono && formData.telefono ? styles.inputValid : ''}`}
                            value={formData.telefono}
                            onChange={(e) => handleInputChange('telefono', e.target.value)}
                            onBlur={() => handleFieldBlur('telefono')}
                            placeholder="612 34 56 78"
                          />
                          {touched.telefono && errors.telefono && (
                            <span className={styles.errorMessage}>{errors.telefono}</span>
                          )}
                        </div>
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Dirección *</label>
                        <input
                          type="text"
                          className={`${styles.input} ${errors.direccion ? styles.inputError : ''} ${!errors.direccion && formData.direccion ? styles.inputValid : ''}`}
                          value={formData.direccion}
                          onChange={(e) => handleInputChange('direccion', e.target.value)}
                          onBlur={() => handleFieldBlur('direccion')}
                          placeholder="Tu dirección completa"
                        />
                        {touched.direccion && errors.direccion && (
                          <span className={styles.errorMessage}>{errors.direccion}</span>
                        )}
                      </div>
                    </div>

                    {/* Experiencia Laboral */}
                    <div className={styles.formGroup}>
                      <h3 className={styles.groupTitle}>Experiencia en Limpieza *</h3>

                      <div className={styles.experienceGrid}>
                        {[
                          { value: '0', label: 'Sin experiencia' },
                          { value: '1-2', label: '1-2 años' },
                          { value: '3-5', label: '3-5 años' },
                          { value: '5+', label: '5+ años' }
                        ].map(option => (
                          <label key={option.value} className={styles.radioLabel}>
                            <input
                              type="radio"
                              name="experiencia"
                              value={option.value}
                              checked={formData.experiencia === option.value}
                              onChange={(e) => handleInputChange('experiencia', e.target.value)}
                              className={styles.radio}
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Disponibilidad */}
                    <div className={styles.formGroup}>
                      <h3 className={styles.groupTitle}>Disponibilidad Horaria *</h3>

                      <div className={styles.availabilityGrid}>
                        {[
                          { value: 'mañanas', label: 'Mañanas', subtitle: '8:00 - 14:00' },
                          { value: 'tardes', label: 'Tardes', subtitle: '14:00 - 20:00' },
                          { value: 'fines-semana', label: 'Fines semana', subtitle: 'Sáb - Dom' },
                          { value: 'flexible', label: 'Flexible', subtitle: 'A convenir' }
                        ].map(option => (
                          <div
                            key={option.value}
                            className={`${styles.availabilityCard} ${formData.disponibilidad.includes(option.value) ? styles.selected : ''}`}
                            onClick={() => handleCheckboxChange('disponibilidad', option.value)}
                          >
                            <input
                              type="checkbox"
                              checked={formData.disponibilidad.includes(option.value)}
                              onChange={() => handleCheckboxChange('disponibilidad', option.value)}
                              className={styles.hiddenCheckbox}
                            />
                            <div className={styles.cardContent}>
                              <h4 className={styles.cardTitle}>{option.label}</h4>
                              <p className={styles.cardSubtitle}>{option.subtitle}</p>
                            </div>
                            <div className={styles.checkIcon}>
                              {formData.disponibilidad.includes(option.value) && '✓'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Zonas Preferidas */}
                    <div className={styles.formGroup}>
                      <h3 className={styles.groupTitle}>Zonas de Trabajo Preferidas *</h3>

                      <div className={styles.zonesGrid}>
                        {[
                          { value: 'palma-centro', label: 'Centro' },
                          { value: 'son-gotleu', label: 'Son Gotleu' },
                          { value: 'arenal', label: 'El Arenal' },
                          { value: 'portixol', label: 'Portixol' },
                          { value: 'cala-major', label: 'Cala Major' },
                          { value: 'indiferente', label: 'Cualquier zona' }
                        ].map(option => (
                          <div
                            key={option.value}
                            className={`${styles.zoneCard} ${formData.zonasPreferidas.includes(option.value) ? styles.selected : ''}`}
                            onClick={() => handleCheckboxChange('zonasPreferidas', option.value)}
                          >
                            <input
                              type="checkbox"
                              checked={formData.zonasPreferidas.includes(option.value)}
                              onChange={() => handleCheckboxChange('zonasPreferidas', option.value)}
                              className={styles.hiddenCheckbox}
                            />
                            <span className={styles.zoneLabel}>{option.label}</span>
                            <div className={styles.checkIcon}>
                              {formData.zonasPreferidas.includes(option.value) && '✓'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CV Upload */}
                    <div className={styles.formGroup}>
                      <h3 className={styles.groupTitle}>Currículum Vitae *</h3>

                      <div className={styles.uploadArea}>
                        <input
                          ref={fileInputRef}
                          type="file"
                          id="cv-upload"
                          accept=".pdf,.doc,.docx"
                          onChange={handleCVUpload}
                          className={styles.fileInput}
                        />

                        {!formData.cv ? (
                          <label htmlFor="cv-upload" className={styles.uploadButton}>
                            <Upload size={20} />
                            <span>Subir CV (PDF, DOC, DOCX)</span>
                          </label>
                        ) : (
                          <div className={styles.fileUploaded}>
                            <div className={styles.fileName}>
                              <span>{formData.cv.name}</span>
                              <button
                                type="button"
                                onClick={removeCv}
                                className={styles.removeButton}
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Presentación */}
                    <div className={styles.formGroup}>
                      <h3 className={styles.groupTitle}>Presentación Personal</h3>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Cuéntanos sobre ti *</label>
                        <textarea
                          className={styles.textarea}
                          rows={4}
                          value={formData.presentacion}
                          onChange={(e) => handleInputChange('presentacion', e.target.value)}
                          placeholder="Cuéntanos por qué te interesa trabajar con nosotros, qué te motiva y cualquier información que consideres relevante... (obligatorio)"
                        />
                      </div>
                    </div>

                    {/* Frase legal RGPD */}
                    <div className={styles.legalNotice}>
                      <p style={{ fontStyle: 'italic', fontSize: '0.9rem', textAlign: 'center', color: '#6c757d', margin: '20px 0' }}>
                        Al enviar este formulario, aceptas nuestros <a href="#" target="_blank" style={{ color: '#03b4c6', textDecoration: 'underline' }}>Términos y Condiciones</a> y <a href="#" target="_blank" style={{ color: '#03b4c6', textDecoration: 'underline' }}>Política de Privacidad</a>. Tratamos tus datos conforme al RGPD.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información de la empresa */}
              <div className={styles.infoSection}>
                <div className={styles.infoCard}>
                  <h3 className={styles.infoTitle}>¿Qué buscamos?</h3>
                  <div className={styles.infoContent}>
                    <div className={styles.infoItem}>
                      <Users className={styles.infoIcon} />
                      <div>
                        <h4>Personas responsables</h4>
                        <p>Que valoren el trabajo bien hecho y la satisfacción del cliente</p>
                      </div>
                    </div>
                    <div className={styles.infoItem}>
                      <Heart className={styles.infoIcon} />
                      <div>
                        <h4>Actitud positiva</h4>
                        <p>Ganas de aprender y formar parte de un equipo comprometido</p>
                      </div>
                    </div>
                    <div className={styles.infoItem}>
                      <Clock className={styles.infoIcon} />
                      <div>
                        <h4>Disponibilidad</h4>
                        <p>Flexibilidad horaria y compromiso con los horarios acordados</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.infoCard}>
                  <h3 className={styles.infoTitle}>¿Qué ofrecemos?</h3>
                  <div className={styles.infoContent}>
                    <div className={styles.infoItem}>
                      <Shield className={styles.infoIcon} />
                      <div>
                        <h4>Estabilidad laboral</h4>
                        <p>Contratos estables con clientes fijos y trabajo continuado</p>
                      </div>
                    </div>
                    <div className={styles.infoItem}>
                      <GraduationCap className={styles.infoIcon} />
                      <div>
                        <h4>Formación continua</h4>
                        <p>Te enseñamos las mejores técnicas y el uso de productos profesionales</p>
                      </div>
                    </div>
                    <div className={styles.infoItem}>
                      <TrendingUp className={styles.infoIcon} />
                      <div>
                        <h4>Crecimiento profesional</h4>
                        <p>Oportunidades de desarrollo dentro de la empresa</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.processCard}>
                  <h3 className={styles.infoTitle}>Proceso de Selección</h3>
                  <div className={styles.processSteps}>
                    <div className={styles.step}>
                      <span className={styles.stepNumber}>1</span>
                      <p>Envía tu candidatura</p>
                    </div>
                    <div className={styles.step}>
                      <span className={styles.stepNumber}>2</span>
                      <p>Entrevista personal</p>
                    </div>
                    <div className={styles.step}>
                      <span className={styles.stepNumber}>3</span>
                      <p>Formación de empresa</p>
                    </div>
                    <div className={styles.step}>
                      <span className={styles.stepNumber}>4</span>
                      <p>Incorporación al equipo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className={styles.benefitsSection}>
          <div className="container">
            <h2 className={styles.benefitsTitle}>Ventajas de Trabajar con Nosotros</h2>
            <div className={styles.benefitsGrid}>
              <div className={styles.benefit}>
                <Banknote className={styles.benefitIcon} />
                <h3 className={styles.benefitTitle}>Salario Competitivo</h3>
                <p className={styles.benefitText}>
                  Remuneración acorde al mercado con posibilidades de incentivos por rendimiento.
                </p>
              </div>

              <div className={styles.benefit}>
                <Clock className={styles.benefitIcon} />
                <h3 className={styles.benefitTitle}>Horarios Flexibles</h3>
                <p className={styles.benefitText}>
                  Adaptamos los horarios a tus necesidades personales y familiares.
                </p>
              </div>

              <div className={styles.benefit}>
                <MapPin className={styles.benefitIcon} />
                <h3 className={styles.benefitTitle}>Trabajo Cercano</h3>
                <p className={styles.benefitText}>
                  Asignamos trabajos cerca de tu zona de residencia para minimizar desplazamientos.
                </p>
              </div>

              <div className={styles.benefit}>
                <Users className={styles.benefitIcon} />
                <h3 className={styles.benefitTitle}>Equipo Unido</h3>
                <p className={styles.benefitText}>
                  Formar parte de un equipo profesional con buen ambiente de trabajo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Botón Flotante */}
        <div className={styles.floatingButton}>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid() || isSubmitting}
            className={isFormValid() && !isSubmitting ? 'btn1' : `${styles.empleoButton} ${!isFormValid() ? styles.disabled : ''}`}
          >
            {isSubmitting ? (
              <>
                <span className={styles.loadingSpinner}></span>
                Enviando candidatura...
              </>
            ) : (
              <>
                <Send size={20} style={{marginRight: '8px'}} />
                Enviar Candidatura
              </>
            )}
          </button>
        </div>

        <Breadcrumbs items={breadcrumbItems} />
      </div>
    </Layout>
  );
}