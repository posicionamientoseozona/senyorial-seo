"use client";

import { useState, useEffect, useRef } from "react";
import Layout from "@/components/layout/Layout";
import { Download, SprayCanIcon, Info, Upload, X, FileText, Shield } from "lucide-react";
import SuccessAnimation from "@/components/ui/SuccessAnimation";
import { trackFormSubmission, trackQuoteGeneration } from "@/lib/gtm";
import styles from "./presupuestar.module.css";

interface ServiceData {
  id: string;
  name: string;
  basePrice: number;
  unit: string;
  selected: boolean;
  quantity: number;
  frequency: string;
  tariff: string;
  weeklyServices?: number; // Cantidad de servicios por semana para frecuencia semanal
}

interface FormData {
  clientName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  services: ServiceData[];
  additionalNotes: string;
  photos: File[];
  includeContract: boolean;
  // Campos de facturación (solo requeridos si includeContract = true)
  nifCif: string;
  companyName: string;
  fiscalAddress: string;
  fiscalPostalCode: string;
  iban: string;
}

interface ValidationErrors {
  clientName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  // Campos de facturación
  nifCif: string;
  companyName: string;
  fiscalAddress: string;
  fiscalPostalCode: string;
  iban: string;
}

interface FieldTouched {
  clientName: boolean;
  email: boolean;
  phone: boolean;
  address: boolean;
  postalCode: boolean;
  // Campos de facturación
  nifCif: boolean;
  companyName: boolean;
  fiscalAddress: boolean;
  fiscalPostalCode: boolean;
  iban: boolean;
}

export default function PresupuestarPage() {
  const [formData, setFormData] = useState<FormData>({
    clientName: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
    services: [
      {
        id: "limpieza-por-horas",
        name: "Limpieza por Horas",
        basePrice: 19,
        unit: "€/hora",
        selected: true,
        quantity: 3,
        frequency: "semanal",
        tariff: "premium",
        weeklyServices: 1
      },
      {
        id: "oficinas",
        name: "Limpieza de Oficinas",
        basePrice: 19,
        unit: "€/hora",
        selected: false,
        quantity: 2,
        frequency: "semanal",
        tariff: "premium",
        weeklyServices: 1
      },
      {
        id: "comunidades",
        name: "Limpieza de Comunidades",
        basePrice: 21,
        unit: "€/hora",
        selected: false,
        quantity: 1.5,
        frequency: "semanal",
        tariff: "premium",
        weeklyServices: 1
      }
    ],
    additionalNotes: "",
    photos: [],
    includeContract: false,
    // Campos de facturación
    nifCif: "",
    companyName: "",
    fiscalAddress: "",
    fiscalPostalCode: "",
    iban: ""
  });

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showTariffInfo, setShowTariffInfo] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({
    clientName: "El nombre es obligatorio",
    email: "El email es obligatorio",
    phone: "El teléfono es obligatorio",
    address: "La dirección es obligatoria",
    postalCode: "El código postal es obligatorio",
    // Campos de facturación (errores iniciales vacíos, se validan condicionalmente)
    nifCif: "",
    companyName: "",
    fiscalAddress: "",
    fiscalPostalCode: "",
    iban: ""
  });
  const [touched, setTouched] = useState<FieldTouched>({
    clientName: false,
    email: false,
    phone: false,
    address: false,
    postalCode: false,
    // Campos de facturación
    nifCif: false,
    companyName: false,
    fiscalAddress: false,
    fiscalPostalCode: false,
    iban: false
  });

  // Funciones de validación
  const validateField = (field: keyof ValidationErrors, value: string): string => {
    switch (field) {
      case 'clientName':
        if (!value.trim()) return 'El nombre es obligatorio';
        if (value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres';
        return '';

      case 'email':
        if (!value.trim()) return 'El email es obligatorio';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Introduce un email válido (ej: maria@ejemplo.com)';
        return '';

      case 'phone':
        if (!value.trim()) return 'El teléfono es obligatorio';
        const phoneRegex = /^(\+34|0034|34)?[6-9]\d{8}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) return 'Introduce un teléfono español válido (ej: 612 34 56 78)';
        return '';

      case 'address':
        if (!value.trim()) return 'La dirección es obligatoria';
        if (value.trim().length < 8) return 'La dirección debe ser completa (mínimo 8 caracteres)';
        return '';

      case 'postalCode':
        if (!value.trim()) return 'El código postal es obligatorio';
        const postalCodeRegex = /^[0-4][0-9]{4}$|^5[0-2][0-9]{3}$/;
        if (!postalCodeRegex.test(value.replace(/\s/g, ''))) return 'Introduce un código postal español válido (ej: 07005, 28001)';
        return '';

      case 'nifCif':
        if (!value.trim()) return 'El NIF/CIF es obligatorio para el contrato';
        // Validación básica de formato NIF/CIF español
        const nifCifRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$|^[ABCDEFGHJNPQRSUVW][0-9]{7}[0-9A-J]$/i;
        if (!nifCifRegex.test(value.replace(/\s/g, ''))) return 'Introduce un NIF/CIF válido (ej: 12345678Z o A12345674)';
        return '';

      case 'companyName':
        if (!value.trim()) return 'El nombre o razón social es obligatorio para el contrato';
        if (value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres';
        return '';

      case 'fiscalAddress':
        if (!value.trim()) return 'La dirección fiscal es obligatoria para el contrato';
        if (value.trim().length < 10) return 'La dirección fiscal debe ser completa (mínimo 10 caracteres)';
        return '';

      case 'fiscalPostalCode':
        if (!value.trim()) return 'El código postal fiscal es obligatorio para el contrato';
        const fiscalPostalCodeRegex = /^[0-4][0-9]{4}$|^5[0-2][0-9]{3}$/;
        if (!fiscalPostalCodeRegex.test(value.replace(/\s/g, ''))) return 'Introduce un código postal español válido (ej: 07005, 28001)';
        return '';

      case 'iban':
        if (!value.trim()) return 'El IBAN es obligatorio para la domiciliación SEPA';
        // Validación básica de formato IBAN español
        const ibanRegex = /^ES\d{2}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/i;
        const cleanIban = value.replace(/\s/g, '');
        if (!ibanRegex.test(cleanIban)) return 'Introduce un IBAN español válido (ej: ES91 2100 0418 4502 0005 1332)';
        if (cleanIban.length !== 24) return 'El IBAN español debe tener 24 caracteres';
        return '';

      default:
        return '';
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Validar campos de información personal y facturación
    if (['clientName', 'email', 'phone', 'address', 'postalCode', 'nifCif', 'companyName', 'fiscalAddress', 'fiscalPostalCode', 'iban'].includes(field)) {
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

  const isProgrammaticScrollRef = useRef(false);

  // Auto-selección de servicio al parar el scroll, con debounce.
  useEffect(() => {
    const servicesGrid = document.querySelector(`.${styles.servicesGrid}`) as HTMLElement;
    if (!servicesGrid) return;

    let scrollTimeout: NodeJS.Timeout;

    const selectClosestCard = () => {
      const containerRect = servicesGrid.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      const cards = servicesGrid.querySelectorAll(`[data-service]`);
      let closestCard: Element | null = null;
      let closestDistance = Infinity;

      cards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(containerCenter - cardCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestCard = card;
        }
      });

      if (closestCard) {
        const serviceId = (closestCard as HTMLElement).getAttribute('data-service');
        if (serviceId) {
          const currentSelected = formData.services.find(s => s.selected);
          if (!currentSelected || currentSelected.id !== serviceId) {
            // Seleccionar servicio por scroll, pero sin disparar otra animación de scroll.
            handleServiceChange(serviceId, 'selected', true, { scroll: false });
          }
        }
      }
    };

    const handleScroll = () => {
      // Ignorar eventos de scroll si son programáticos (causados por un clic).
      if (isProgrammaticScrollRef.current) {
        return;
      }
      clearTimeout(scrollTimeout);
      // Usar un debounce más largo para evitar conflictos con clicks rápidos.
      scrollTimeout = setTimeout(selectClosestCard, 150);
    };

    servicesGrid.addEventListener('scroll', handleScroll);

    return () => {
      servicesGrid.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [formData.services]);

  const handleServiceChange = (
    serviceId: string,
    field: keyof ServiceData,
    value: string | number | boolean,
    // Añadimos opciones para controlar el comportamiento del scroll.
    options: { scroll: boolean } = { scroll: true }
  ) => {
    // El scroll solo se activa en selección manual (cuando options.scroll es true).
    if (options.scroll && field === 'selected' && Boolean(value)) {
      isProgrammaticScrollRef.current = true;
      setTimeout(() => {
        const element = document.querySelector(`[data-service="${serviceId}"]`) as HTMLElement;
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          });
        }
        // Resetear la bandera después de que la animación de scroll haya tenido tiempo de terminar.
        setTimeout(() => {
          isProgrammaticScrollRef.current = false;
        }, 1500); // 1500ms margen más amplio para evitar conflictos con clicks rápidos
      }, 50);
    }

    setFormData(prev => ({
      ...prev,
      services: prev.services.map(service => {
        if (field === 'selected') {
          // Al seleccionar un servicio, deseleccionar los demás.
          return service.id === serviceId
            ? { ...service, [field]: Boolean(value) }
            : { ...service, selected: false };
        } else if (field === 'frequency') {
          // Al cambiar la frecuencia, resetear weeklyServices si no es semanal.
          return service.id === serviceId
            ? {
                ...service,
                [field]: String(value),
                weeklyServices: value === 'semanal' ? (service.weeklyServices || 1) : undefined
              }
            : service;
        } else {
          // Para otros campos, solo actualizar el servicio específico.
          return service.id === serviceId
            ? {
                ...service,
                [field]: field === 'quantity' || field === 'weeklyServices'
                  ? Number(value)
                  : String(value)
              }
            : service;
        }
      })
    }));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    // Filtrar solo archivos de imagen válidos
    const validImageTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/bmp',
      'image/tiff',
      'image/tif',
      'image/svg+xml'
    ];

    const validFiles = Array.from(files).filter(file => {
      // Verificar tipo MIME
      if (!validImageTypes.includes(file.type)) return false;

      // Verificar extensión del archivo (doble verificación)
      const validExtensions = /\.(jpg|jpeg|png|gif|webp|bmp|tiff|tif|svg)$/i;
      if (!validExtensions.test(file.name)) return false;

      // Verificar tamaño (máximo 10MB por imagen)
      if (file.size > 10 * 1024 * 1024) return false;

      return true;
    });

    // Limitar a máximo 4 fotos
    const currentPhotos = formData.photos.length;
    const availableSlots = 4 - currentPhotos;
    const photosToAdd = validFiles.slice(0, availableSlots);

    if (photosToAdd.length > 0) {
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...photosToAdd]
      }));
    }

    // Limpiar el input
    event.target.value = '';
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const calculateServicePrice = (service: ServiceData): number => {
    if (!service.selected) return 0;

    // Precios según tarifas 2025
    const getTariffPrice = (serviceId: string, tariff: string, frequency: string): number => {
      // Tarifas básicas
      const basicRates = {
        "unica": 19.00,
        "semanal": 16.15,  // cada 7 días
        "quincenal": 17.10, // cada 14 días
        "mensual": 18.05    // cada 28 días
      };

      // Tarifas premium
      const premiumRates = {
        "unica": 21.00,     // Asumiendo precio base premium para "una vez"
        "semanal": 17.85,   // cada 7 días
        "quincenal": 18.90, // cada 14 días
        "mensual": 19.95    // cada 28 días
      };

      // Reglas especiales por tipo de servicio
      if (serviceId === "comunidades" && tariff === "basica") {
        // Comunidades solo tarifa premium
        tariff = "premium";
      }

      const rates = tariff === "premium" ? premiumRates : basicRates;
      return rates[frequency as keyof typeof rates] || basicRates["unica"];
    };

    // Obtener precio por hora según servicio, tarifa y frecuencia
    const pricePerHour = getTariffPrice(service.id, service.tariff, service.frequency);

    // Multiplicar por cantidad de servicios semanales si aplica
    const weeklyMultiplier = service.frequency === 'semanal' && service.weeklyServices ? service.weeklyServices : 1;

    // Calcular subtotal sin IVA
    let subtotal = pricePerHour * service.quantity * weeklyMultiplier;

    // Cargo por 2 horas o menos (se aplica por cada servicio semanal)
    if (service.quantity <= 2) {
      subtotal += 15 * weeklyMultiplier; // Cargo adicional por 2 horas o menos por cada servicio
    }

    // Calcular IVA (21%)
    const iva = subtotal * 0.21;

    // Total con IVA
    const totalWithIVA = subtotal + iva;

    return Math.round(totalWithIVA * 100) / 100;
  };

  const calculateTotal = (): number => {
    return formData.services.reduce((total, service) => {
      return total + calculateServicePrice(service);
    }, 0);
  };

  const generatePDF = async () => {
    setIsGeneratingPDF(true);

    try {
      // Generar datos comunes
      const timestamp = new Date().toISOString().split('T')[0];
      const clientSlug = formData.clientName.replace(/\s+/g, '-').toLowerCase();
      const pdfFilename = `presupuesto-${clientSlug}-${timestamp}.pdf`;
      // El API de generación PDF se encargará de crear la referencia secuencial

      // Primero generar el PDF con la referencia
      const pdfResponse = await fetch('/api/generate-quote-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
          calculations: {
            services: formData.services.map(service => ({
              ...service,
              calculatedPrice: calculateServicePrice(service)
            })),
            total: calculateTotal()
          }
          // Omitir refNumber para que el API genere uno nuevo automáticamente
        })
      });

      if (!pdfResponse.ok) {
        throw new Error('Error al generar el PDF');
      }

      // Obtener la referencia generada del header
      const headerRef = pdfResponse.headers.get('X-Quote-Reference');
      console.log('📋 [FRONTEND] Header capturado:', headerRef);
      const refNumber = headerRef || `PRE-${Date.now()}-FALLBACK`;
      console.log('📋 [FRONTEND] Referencia final:', refNumber);

      // Convertir PDF a base64 para enviarlo por email
      const pdfBlob = await pdfResponse.blob();
      const pdfBuffer = await pdfBlob.arrayBuffer();
      const pdfBase64 = btoa(String.fromCharCode(...Array.from(new Uint8Array(pdfBuffer))));

      // Generar contrato si se ha solicitado
      let contractBase64 = null;
      let contractFilename = null;
      if (formData.includeContract) {
        console.log('📋 [FRONTEND] Generando contrato...');
        const contractResponse = await fetch('/api/generate-contract-pdf', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            formData,
            calculations: {
              services: formData.services.map(service => ({
                ...service,
                calculatedPrice: calculateServicePrice(service)
              })),
              total: calculateTotal()
            },
            quoteRefNumber: refNumber // Enviar referencia del presupuesto para derivar la del contrato
          })
        });

        if (contractResponse.ok) {
          const contractBlob = await contractResponse.blob();
          const contractBuffer = await contractBlob.arrayBuffer();
          contractBase64 = btoa(String.fromCharCode(...Array.from(new Uint8Array(contractBuffer))));

          const contractClientSlug = (formData.companyName || formData.clientName).replace(/\s+/g, '-').toLowerCase();
          contractFilename = `contrato-${contractClientSlug}-${timestamp}.pdf`;
          console.log('📋 [FRONTEND] Contrato generado correctamente');
        } else {
          console.error('📋 [FRONTEND] Error al generar contrato');
          throw new Error('Error al generar el contrato');
        }
      }

      // Enviar por email
      const emailResponse = await fetch('/api/send-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
          calculations: {
            services: formData.services.map(service => ({
              ...service,
              calculatedPrice: calculateServicePrice(service)
            })),
            total: calculateTotal()
          },
          pdfBuffer: pdfBase64,
          pdfFilename,
          refNumber,
          // Incluir contrato si se ha generado
          contractBuffer: contractBase64,
          contractFilename: contractFilename
        })
      });

      if (!emailResponse.ok) {
        const errorText = formData.includeContract
          ? 'Error al enviar el presupuesto y contrato por email'
          : 'Error al enviar el presupuesto por email';
        throw new Error(errorText);
      }

      // Trackear conversión en GTM
      trackFormSubmission('quote');

      // Trackear generación de presupuesto con datos específicos
      trackQuoteGeneration({
        total: calculateTotal(),
        services: formData.services.filter(s => s.selected).map(s => s.name),
        clientName: formData.clientName,
        refNumber: refNumber
      });

      // Mostrar animación de éxito
      setShowSuccess(true);

    } catch (error) {
      console.error('Error:', error);
      const errorMessage = formData.includeContract
        ? 'Error al procesar el presupuesto y contrato. Por favor, inténtelo de nuevo.'
        : 'Error al procesar el presupuesto. Por favor, inténtelo de nuevo.';
      alert(errorMessage);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const isFormValid = () => {
    // Validación básica del formulario
    const basicValid = formData.clientName &&
                      formData.email &&
                      formData.phone &&
                      formData.address &&
                      formData.postalCode &&
                      formData.address.length >= 8 &&
                      !errors.clientName &&
                      !errors.email &&
                      !errors.phone &&
                      !errors.address &&
                      !errors.postalCode &&
                      formData.services.some(service => service.selected);

    // Si no se requiere contrato, solo validar campos básicos
    if (!formData.includeContract) {
      return basicValid;
    }

    // Si se requiere contrato, validar también campos de facturación
    const billingValid = formData.nifCif &&
                        formData.companyName &&
                        formData.fiscalAddress &&
                        formData.fiscalPostalCode &&
                        formData.iban &&
                        formData.fiscalAddress.length >= 10 &&
                        !errors.nifCif &&
                        !errors.companyName &&
                        !errors.fiscalAddress &&
                        !errors.fiscalPostalCode &&
                        !errors.iban;

    return basicValid && billingValid;
  };

  return (
    <Layout>
      <div className={styles.presupuestarPage}>
        {showSuccess && (
          <SuccessAnimation
            type="quote"
            onClose={() => setShowSuccess(false)}
          />
        )}
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1 className={styles.title}>
                Solicitar <span className={styles.highlight}>Presupuesto Online</span>
              </h1>
              <p className={styles.subtitle}>
                Obtén tu presupuesto personalizado en menos de 2 minutos.
                Precios transparentes adaptados a tus necesidades específicas.
              </p>
              <div className={styles.heroFeatures}>
                <span className={styles.feature}>Cálculo automático</span>
                <span className={styles.feature}>100% personalizado</span>
                <span className={styles.feature}>Sin sorpresas</span>
              </div>
            </div>
          </div>
        </section>

        {/* Services Selection - Independent Section */}
        <section className={styles.servicesSection}>
          <div className="container">
            <div className={styles.formContainer}>
              <div className={styles.servicesFormWrapper}>
                <div className={styles.formSection}>
                  <h2 className={styles.sectionTitle}>Servicios Requeridos</h2>
                  <div className={styles.servicesGrid}>
                    <div className={styles.servicesContainer}>
                      {formData.services.map((service) => (
                        <div
                          key={service.id}
                          data-service={service.id}
                          className={`${styles.serviceCard} ${service.selected ? styles.selected : ''}`}
                          onClick={(e) => {
                            // Solo activar si no se hizo click en un elemento interactivo
                            if (!(e.target as HTMLElement).closest('input, select, button, label')) {
                              handleServiceChange(service.id, 'selected', true);
                            }
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                        <div className={styles.serviceHeader}>
                          <label className={styles.radioLabel}>
                            <input
                              type="radio"
                              name="selectedService"
                              checked={service.selected}
                              onChange={(e) => handleServiceChange(service.id, 'selected', e.target.checked)}
                              className={styles.radio}
                            />
                            <h3 className={styles.serviceName}>{service.name}</h3>
                          </label>
                        </div>

                        {service.selected && (
                          <div className={styles.serviceConfig}>
                            <div className={styles.configGrid2x2}>
                              {/* Primera fila: Horas y Tarifa */}
                              <div className={styles.configGroup}>
                                <label className={styles.configLabel}>Horas necesarias</label>
                                <select
                                  value={service.quantity}
                                  onChange={(e) => handleServiceChange(service.id, 'quantity', parseFloat(e.target.value))}
                                  className={styles.configSelect}
                                >
                                  {/* Opciones según tipo de servicio */}
                                  {service.id === "comunidades" ? (
                                    <>
                                      <option value="1.5">1,5 horas</option>
                                      <option value="2">2 horas</option>
                                      <option value="2.5">2,5 horas</option>
                                      <option value="3">3 horas</option>
                                      <option value="3.5">3,5 horas</option>
                                      <option value="4">4 horas</option>
                                      <option value="4.5">4,5 horas</option>
                                      <option value="5">5 horas</option>
                                      <option value="5.5">5,5 horas</option>
                                      <option value="6">6 horas</option>
                                      <option value="6.5">6,5 horas</option>
                                      <option value="7">7 horas</option>
                                      <option value="7.5">7,5 horas</option>
                                      <option value="8">8 horas</option>
                                    </>
                                  ) : (
                                    <>
                                      <option value="2">2 horas</option>
                                      <option value="2.5">2,5 horas</option>
                                      <option value="3">3 horas</option>
                                      <option value="3.5">3,5 horas</option>
                                      <option value="4">4 horas</option>
                                      <option value="4.5">4,5 horas</option>
                                      <option value="5">5 horas</option>
                                      <option value="5.5">5,5 horas</option>
                                      <option value="6">6 horas</option>
                                      <option value="6.5">6,5 horas</option>
                                      <option value="7">7 horas</option>
                                      <option value="7.5">7,5 horas</option>
                                      <option value="8">8 horas</option>
                                    </>
                                  )}
                                </select>
                              </div>

                              <div className={styles.configGroup}>
                                <div className={styles.labelWithInfo}>
                                  <label className={styles.configLabel}>Tarifa</label>
                                  {service.tariff === "premium" && (
                                    <SprayCanIcon className={styles.premiumIconLabel} size={16} />
                                  )}
                                  <button
                                    type="button"
                                    className={styles.infoButton}
                                    onMouseEnter={() => setShowTariffInfo(true)}
                                    onMouseLeave={() => setShowTariffInfo(false)}
                                  >
                                    <Info size={14} />
                                  </button>
                                  {showTariffInfo && (
                                    <div className={styles.tooltip}>
                                      <div className={styles.tooltipContent}>
                                        <p><strong>Básica:</strong> Sin productos</p>
                                        <p><strong>Premium:</strong> Productos incluidos</p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <select
                                  value={service.tariff}
                                  onChange={(e) => handleServiceChange(service.id, 'tariff', e.target.value)}
                                  className={styles.configSelect}
                                  disabled={service.id === "comunidades"}
                                >
                                  {service.id !== "comunidades" && (
                                    <option value="basica">Tarifa Básica</option>
                                  )}
                                  <option value="premium">Tarifa Premium</option>
                                </select>
                              </div>

                              {/* Segunda fila: Frecuencia y Servicios por semana */}
                              <div className={styles.configGroup}>
                                <label className={styles.configLabel}>Frecuencia</label>
                                <select
                                  value={service.frequency}
                                  onChange={(e) => handleServiceChange(service.id, 'frequency', e.target.value)}
                                  className={styles.configSelect}
                                >
                                  <option value="unica">Una vez</option>
                                  <option value="semanal">Cada 7 días</option>
                                  <option value="quincenal">Cada 14 días</option>
                                  <option value="mensual">Cada 28 días</option>
                                </select>
                              </div>

                              <div className={styles.configGroup}>
                                <label className={styles.configLabel}>
                                  {service.frequency === 'semanal' ? 'Servicios por semana' : 'Configuración adicional'}
                                </label>
                                {service.frequency === 'semanal' ? (
                                  <select
                                    value={service.weeklyServices || 1}
                                    onChange={(e) => handleServiceChange(service.id, 'weeklyServices', parseInt(e.target.value))}
                                    className={styles.configSelect}
                                  >
                                    <option value="1">1 servicio</option>
                                    <option value="2">2 servicios</option>
                                    <option value="3">3 servicios</option>
                                    <option value="4">4 servicios</option>
                                    <option value="5">5 servicios</option>
                                  </select>
                                ) : (
                                  <div className={styles.configSelectDisabled}>
                                    No disponible
                                  </div>
                                )}
                              </div>
                            </div>

                          </div>
                        )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Form */}
        <section className={styles.quoteSection}>
          <div className="container">
            <div className={styles.formContainer}>
              <div className={styles.formWrapper}>

                {/* Información Personal */}
                <div className={styles.formSection}>
                  <h2 className={styles.sectionTitle}>Información Personal</h2>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Nombre completo *</label>
                      <input
                        type="text"
                        className={`${styles.input} ${errors.clientName ? styles.inputError : ''} ${!errors.clientName && formData.clientName ? styles.inputValid : ''}`}
                        value={formData.clientName}
                        onChange={(e) => handleInputChange('clientName', e.target.value)}
                        onBlur={() => handleFieldBlur('clientName')}
                        placeholder="Tu nombre completo"
                      />
                      {touched.clientName && errors.clientName && (
                        <span className={styles.errorMessage}>{errors.clientName}</span>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Email *</label>
                      <input
                        type="email"
                        className={`${styles.input} ${errors.email ? styles.inputError : ''} ${!errors.email && formData.email ? styles.inputValid : ''}`}
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        onBlur={() => handleFieldBlur('email')}
                        placeholder="maria@ejemplo.com"
                      />
                      {touched.email && errors.email && (
                        <span className={styles.errorMessage}>{errors.email}</span>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Teléfono *</label>
                      <input
                        type="tel"
                        className={`${styles.input} ${errors.phone ? styles.inputError : ''} ${!errors.phone && formData.phone ? styles.inputValid : ''}`}
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        onBlur={() => handleFieldBlur('phone')}
                        placeholder="612 34 56 78"
                      />
                      {touched.phone && errors.phone && (
                        <span className={styles.errorMessage}>{errors.phone}</span>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Dirección completa *</label>
                      <div className={styles.addressGrid}>
                        <input
                          type="text"
                          className={`${styles.input} ${errors.address ? styles.inputError : ''} ${!errors.address && formData.address ? styles.inputValid : ''}`}
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          onBlur={() => handleFieldBlur('address')}
                          placeholder="Calle Federico García Lorca 15, 2º A"
                        />
                        <input
                          type="text"
                          className={`${styles.input} ${errors.postalCode ? styles.inputError : ''} ${!errors.postalCode && formData.postalCode ? styles.inputValid : ''}`}
                          value={formData.postalCode}
                          onChange={(e) => handleInputChange('postalCode', e.target.value)}
                          onBlur={() => handleFieldBlur('postalCode')}
                          placeholder="07005"
                          maxLength={5}
                        />
                      </div>
                      {(touched.address && errors.address) || (touched.postalCode && errors.postalCode) && (
                        <span className={styles.errorMessage}>
                          {errors.address || errors.postalCode}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Información Adicional */}
                <div className={styles.formSection}>
                  <h2 className={styles.sectionTitle}>Información Adicional (Opcional)</h2>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Notas o requerimientos especiales
                    </label>
                    <textarea
                      className={styles.textarea}
                      rows={4}
                      value={formData.additionalNotes}
                      onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                      placeholder="Describe cualquier necesidad específica, horarios preferidos, accesos especiales, etc."
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Fotos del inmueble/oficina (máximo 4)
                    </label>

                    <div className={styles.photoUploadArea}>
                      <input
                        type="file"
                        id="photo-upload"
                        multiple
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className={styles.photoInput}
                        disabled={formData.photos.length >= 4}
                      />

                      {formData.photos.length < 4 && (
                        <label htmlFor="photo-upload" className={styles.uploadButton}>
                          <Upload size={20} />
                          <span>
                            {formData.photos.length === 0
                              ? 'Subir fotos'
                              : `Subir más fotos (${4 - formData.photos.length} restantes)`
                            }
                          </span>
                        </label>
                      )}

                      {formData.photos.length > 0 && (
                        <div className={styles.photosGrid}>
                          {formData.photos.map((photo, index) => (
                            <div key={index} className={styles.photoItem}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={URL.createObjectURL(photo)}
                                alt={`Foto ${index + 1}`}
                                className={styles.photoPreview}
                              />
                              <button
                                type="button"
                                onClick={() => removePhoto(index)}
                                className={styles.removePhotoButton}
                              >
                                <X size={16} />
                              </button>
                              <span className={styles.photoName}>{photo.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sección de Conversión */}
                <div className={styles.formSection}>
                  <h2 className={styles.sectionTitle}>Todo lo que recibes gratis y sin compromiso</h2>
                  <p className={styles.conversionSubtitle}>
                    Obtén un servicio completo y transparente desde el primer contacto. Sin letra pequeña, sin sorpresas.
                  </p>

                  <div className={styles.conversionOptions}>
                    <div className={`${styles.conversionCard} ${styles.included}`}>
                      <div className={styles.cardHeader}>
                        <FileText className={styles.cardIcon} size={24} />
                        <h3 className={styles.cardTitle}>Presupuesto detallado</h3>
                      </div>
                      <p className={styles.cardDescription}>
                        Presupuesto completo con desglose de servicios, frecuencias y precios.
                        Listo para revisar y aprobar.
                      </p>
                      <div className={styles.cardStatus}>
                        <div className={styles.includedBadge}>Siempre incluido</div>
                      </div>
                    </div>

                    <div className={`${styles.conversionCard} ${formData.includeContract ? styles.selected : ''}`}>
                      <div className={styles.cardHeader}>
                        <Shield className={styles.cardIcon} size={24} />
                        <h3 className={styles.cardTitle}>Contrato de prestación de servicios</h3>
                      </div>
                      <p className={styles.cardDescription}>
                        Contrato legal completo y sin compromiso con términos de servicio, garantías y condiciones.
                        Incluye domiciliación SEPA.
                      </p>
                      <div className={styles.cardStatus}>
                        <label className={styles.contractToggle}>
                          <input
                            type="checkbox"
                            checked={formData.includeContract}
                            onChange={(e) => handleInputChange('includeContract', e.target.checked)}
                            className={styles.contractCheckbox}
                          />
                          <span className={styles.toggleSlider}></span>
                          <span className={styles.toggleLabel}>
                            {formData.includeContract ? 'Incluir contrato' : 'Añadir contrato'}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Datos de Facturación - Solo si se solicita contrato */}
                {formData.includeContract && (
                  <div className={`${styles.formSection} ${styles.billingSection}`}>
                    <h2 className={styles.sectionTitle}>Datos de Facturación</h2>
                    <p className={styles.billingSectionSubtitle}>
                      Estos datos nos permiten generar una previsualización del contrato para tu revisión. El documento no será vinculante hasta que ambas partes lo firmen, y solo procederemos si decides aceptar nuestros servicios.
                    </p>

                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>NIF/CIF *</label>
                        <input
                          type="text"
                          className={`${styles.input} ${errors.nifCif ? styles.inputError : ''} ${!errors.nifCif && formData.nifCif ? styles.inputValid : ''}`}
                          value={formData.nifCif}
                          onChange={(e) => handleInputChange('nifCif', e.target.value)}
                          onBlur={() => handleFieldBlur('nifCif')}
                          placeholder="12345678Z o A12345674"
                        />
                        {touched.nifCif && errors.nifCif && (
                          <span className={styles.errorMessage}>{errors.nifCif}</span>
                        )}
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.label}>Nombre o razón social *</label>
                        <input
                          type="text"
                          className={`${styles.input} ${errors.companyName ? styles.inputError : ''} ${!errors.companyName && formData.companyName ? styles.inputValid : ''}`}
                          value={formData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                          onBlur={() => handleFieldBlur('companyName')}
                          placeholder="Tu nombre completo o nombre de la empresa"
                        />
                        {touched.companyName && errors.companyName && (
                          <span className={styles.errorMessage}>{errors.companyName}</span>
                        )}
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.label}>Dirección fiscal *</label>
                        <div className={styles.addressGrid}>
                          <input
                            type="text"
                            className={`${styles.input} ${errors.fiscalAddress ? styles.inputError : ''} ${!errors.fiscalAddress && formData.fiscalAddress ? styles.inputValid : ''}`}
                            value={formData.fiscalAddress}
                            onChange={(e) => handleInputChange('fiscalAddress', e.target.value)}
                            onBlur={() => handleFieldBlur('fiscalAddress')}
                            placeholder="Calle, número, piso para facturación"
                          />
                          <input
                            type="text"
                            className={`${styles.input} ${errors.fiscalPostalCode ? styles.inputError : ''} ${!errors.fiscalPostalCode && formData.fiscalPostalCode ? styles.inputValid : ''}`}
                            value={formData.fiscalPostalCode}
                            onChange={(e) => handleInputChange('fiscalPostalCode', e.target.value)}
                            onBlur={() => handleFieldBlur('fiscalPostalCode')}
                            placeholder="07005"
                            maxLength={5}
                          />
                        </div>
                        {(touched.fiscalAddress && errors.fiscalAddress) || (touched.fiscalPostalCode && errors.fiscalPostalCode) && (
                          <span className={styles.errorMessage}>
                            {errors.fiscalAddress || errors.fiscalPostalCode}
                          </span>
                        )}
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.label}>IBAN para domiciliación SEPA *</label>
                        <input
                          type="text"
                          className={`${styles.input} ${errors.iban ? styles.inputError : ''} ${!errors.iban && formData.iban ? styles.inputValid : ''}`}
                          value={formData.iban}
                          onChange={(e) => handleInputChange('iban', e.target.value)}
                          onBlur={() => handleFieldBlur('iban')}
                          placeholder="ES91 2100 0418 4502 0005 1332"
                        />
                        {touched.iban && errors.iban && (
                          <span className={styles.errorMessage}>{errors.iban}</span>
                        )}
                      </div>
                    </div>

                  </div>
                )}
              </div>

        {/* Frase legal RGPD */}
        <div className={styles.legalNotice}>
          <p style={{ fontStyle: 'italic', fontSize: '0.9rem', textAlign: 'center', color: '#6c757d', margin: '20px 0' }}>
            Al enviar este formulario, aceptas nuestros <a href="#" target="_blank" style={{ color: '#03b4c6', textDecoration: 'underline' }}>Términos y Condiciones</a> y <a href="#" target="_blank" style={{ color: '#03b4c6', textDecoration: 'underline' }}>Política de Privacidad</a>. Tratamos tus datos conforme al RGPD.
          </p>
        </div>

        {/* Botón Flotante de Presupuesto */}
        <div className={styles.floatingButton}>
          <button
            onClick={generatePDF}
            disabled={!isFormValid() || isGeneratingPDF}
            className={isFormValid() && !isGeneratingPDF ? 'btn1' : `${styles.pdfButton} ${!isFormValid() ? styles.disabled : ''}`}
          >
            {isGeneratingPDF ? (
              <>
                <span className={styles.spinner}></span>
                {formData.includeContract ? 'Generando presupuesto y contrato...' : 'Generando presupuesto...'}
              </>
            ) : (
              <>
                <Download size={20} style={{marginRight: '8px'}} />
                {formData.includeContract ? 'Obtener Mi Presupuesto y Contrato' : 'Obtener Mi Presupuesto Ahora'}
              </>
            )}
          </button>
        </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}