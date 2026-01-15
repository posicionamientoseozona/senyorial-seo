import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

export interface ServiceData {
  id: string;
  name: string;
  basePrice: number;
  unit: string;
  selected: boolean;
  quantity: number;
  frequency: string;
  tariff: string;
  calculatedPrice: number;
  weeklyServices?: number;
}

export interface QuoteFormData {
  clientName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  services: ServiceData[];
  additionalNotes: string;
  photos: File[];
  includeContract: boolean;
  // Campos de facturación
  nifCif: string;
  companyName: string;
  fiscalAddress: string;
  fiscalPostalCode: string;
  iban: string;
}

export interface QuotePDFData {
  formData: QuoteFormData;
  calculations: {
    services: ServiceData[];
    total: number;
  };
  refNumber: string;
}

export interface ContractPDFData {
  formData: QuoteFormData;
  calculations: {
    services: ServiceData[];
    total: number;
  };
  refNumber: string;
}

interface CompanyData {
  name: string;
  cif: string;
  address: string;
  iban: string;
}

interface ClientData {
  name: string;
  cif: string;
  address: string;
  postalCode: string;
  fiscalAddress: string;
  fiscalPostalCode: string;
  iban: string;
}

interface ServicePricing {
  pricePerHour: number;
  subtotal: number;
  iva: number;
  totalWithIVA: number;
  discountPercent: number;
  weeklyMultiplier: number;
  hasSupplement: boolean;
}

// Función para generar referencias únicas con timestamp y UUID
export function getNextReferenceNumber(): string {
  try {
    // Generar timestamp en formato YYMMDD (más compacto)
    const now = new Date();
    const year = String(now.getFullYear()).slice(-2); // Solo últimos 2 dígitos
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const timestamp = `${year}${month}${day}`;

    // Generar UUID corto (3 caracteres alfanuméricos en mayúsculas)
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let shortId = '';
    for (let i = 0; i < 3; i++) {
      shortId += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return `PRE-${timestamp}${shortId}`;
  } catch (error) {
    console.error('Error generando número de referencia:', error);
    // Fallback con timestamp simple
    const fallbackId = Date.now().toString().slice(-6);
    return `PRE-${fallbackId}`;
  }
}

// Función para calcular precios según tarifas 2025
export function calculateDetailedPricing(service: ServiceData) {
  const basicRates: { [key: string]: number } = {
    "unica": 19.00,
    "semanal": 16.15,
    "quincenal": 17.10,
    "mensual": 18.05
  };

  const premiumRates: { [key: string]: number } = {
    "unica": 21.00,
    "semanal": 17.85,
    "quincenal": 18.90,
    "mensual": 19.95
  };

  let tariff = service.tariff;
  if (service.id === "comunidades" && tariff === "basica") {
    tariff = "premium";
  }

  const rates = tariff === "premium" ? premiumRates : basicRates;
  const pricePerHour = rates[service.frequency] || basicRates["unica"];

  const weeklyMultiplier = service.frequency === 'semanal' && service.weeklyServices ? service.weeklyServices : 1;
  let subtotal = pricePerHour * service.quantity * weeklyMultiplier;


  if (service.quantity <= 2) {
    subtotal += 15 * weeklyMultiplier;
  }

  const discountPercent = getDiscountPercent(service.frequency);
  const iva = subtotal * 0.21;
  const totalWithIVA = subtotal + iva;

  return {
    pricePerHour,
    subtotal,
    iva,
    totalWithIVA,
    discountPercent,
    weeklyMultiplier,
    hasSupplement: service.quantity <= 2
  };
}

export function getDiscountPercent(frequency: string): number {
  const discounts: { [key: string]: number } = {
    "semanal": 15,
    "quincenal": 10,
    "mensual": 5,
    "unica": 0
  };
  return discounts[frequency] || 0;
}

// Función para calcular simulación de 4 semanas
export function calculate4WeeksSimulation(services: ServiceData[]) {
  const selectedServices = services.filter(s => s.selected);
  let totalHours4Weeks = 0;
  let totalServices4Weeks = 0;
  let priceWithoutDiscount = 0;
  let priceWithDiscount = 0;
  let hasRecurrentService = false;

  selectedServices.forEach(service => {
    const pricing = calculateDetailedPricing(service);
    const weeklyMultiplier = service.frequency === 'semanal' && service.weeklyServices ? service.weeklyServices : 1;

    if (service.frequency === 'semanal') {
      totalHours4Weeks += service.quantity * weeklyMultiplier * 4;
      totalServices4Weeks += weeklyMultiplier * 4;
      hasRecurrentService = true;
    } else if (service.frequency === 'quincenal') {
      totalHours4Weeks += service.quantity * 2;
      totalServices4Weeks += 2;
      hasRecurrentService = true;
    } else if (service.frequency === 'mensual') {
      totalHours4Weeks += service.quantity * 1;
      totalServices4Weeks += 1;
      hasRecurrentService = true;
    } else {
      return;
    }

    // Simplemente multiplicar el subtotal ya calculado (que incluye suplemento) por las semanas
    const weeksInMonth = service.frequency === 'semanal' ? 4 :
                        service.frequency === 'quincenal' ? 2 : 1;
    const basePriceFor4Weeks = pricing.subtotal * weeksInMonth;

    priceWithoutDiscount += basePriceFor4Weeks;

    // Usar el mismo cálculo correcto para el precio con descuento
    priceWithDiscount += basePriceFor4Weeks;
  });

  const totalSavings = priceWithoutDiscount - priceWithDiscount;
  const baseImponible4Weeks = Math.round(priceWithDiscount * 100) / 100;

  return {
    totalHours4Weeks,
    totalServices4Weeks,
    priceWithoutDiscount: Math.round(priceWithoutDiscount * 100) / 100,
    priceWithDiscount: Math.round(priceWithDiscount * 100) / 100,
    totalSavings: Math.round(totalSavings * 100) / 100,
    baseImponible4Weeks,
    hasRecurrentService
  };
}

// Función para obtener el logo optimizado en base64
function getOptimizedLogoBase64(): string {
  try {
    // Usar el logo optimizado específicamente para PDF
    const logoPath = path.join(process.cwd(), 'public', 'images', 'logoSenyorial', 'logo-pdf.jpg');

    if (!fs.existsSync(logoPath)) {
      console.warn('Logo optimizado no encontrado');
      return '';
    }

    const logoBuffer = fs.readFileSync(logoPath);
    const logoBase64 = logoBuffer.toString('base64');

    console.log(`Logo optimizado cargado: ${(logoBase64.length / 1000).toFixed(1)}KB`);

    return logoBase64;
  } catch (error) {
    console.error('Error loading optimized logo:', error);
    return '';
  }
}

// Función principal para crear el PDF
export function createQuotePDF(data: QuotePDFData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new jsPDF('p', 'mm', 'a4');
      const { formData, calculations, refNumber } = data;
      const currentDate = new Date();
      const emissionDate = currentDate.toLocaleDateString('es-ES');
      const expiryDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES');

      const selectedServices = calculations.services.filter(s => s.selected);

      // Paleta de colores simplificada - solo azul corporativo y negro
      const primaryColor = [0, 91, 141] as [number, number, number]; // #005b8d
      const lightGray = [248, 249, 250] as [number, number, number]; // #f8f9fa
      const darkGray = [52, 58, 64] as [number, number, number]; // #343a40

      let yPosition = 20;

      // === LOGO EN ESQUINA ABSOLUTA (top 10px, right 10px) ===
      const logoBase64 = getOptimizedLogoBase64();
      if (logoBase64) {
        const logoWidth = 30; // Ligeramente más grande
        const logoHeight = 18.75; // Mantener proporción 400x250
        const logoX = 210 - logoWidth - 3.5; // 10px = ~3.5mm desde el borde
        const logoY = 3.5; // 10px = ~3.5mm desde arriba

        try {
          doc.addImage(`data:image/jpeg;base64,${logoBase64}`, 'JPEG', logoX, logoY, logoWidth, logoHeight);
        } catch (logoError) {
          console.warn('Error adding optimized logo:', logoError);
          // Fallback text si el logo falla
          doc.setFontSize(12);
          doc.setTextColor(...primaryColor);
          doc.text('SENYORIAL', 200, 10, { align: 'right' });
        }
      } else {
        // Fallback si no hay logo
        doc.setFontSize(12);
        doc.setTextColor(...primaryColor);
        doc.text('SENYORIAL', 200, 10, { align: 'right' });
      }

      yPosition += 15;

      // === HEADER CON DATOS EMPRESA Y CLIENTE (con fondo light gray y padding) ===

      // Fondo light gray con padding (sin padding inferior)
      const headerPadding = 8;
      const headerHeight = 35;
      doc.setFillColor(...lightGray);
      doc.rect(20 - headerPadding, yPosition - headerPadding, 170 + (headerPadding * 2), headerHeight + headerPadding, 'F');

      // Columna izquierda - Empresa
      doc.setFontSize(12);
      doc.setTextColor(...primaryColor);
      doc.text('SENYORIAL', 20, yPosition);

      doc.setFontSize(9);
      doc.setTextColor(...darkGray);
      doc.text('SA SIVINA DES BABOT 1996 S.L.U', 20, yPosition + 5);
      doc.text('NIF/CIF: B70792858', 20, yPosition + 9);
      doc.text('C/ RICARD ROCA, 4', 20, yPosition + 13);
      doc.text('07008 PALMA (ILLES BALEARS)', 20, yPosition + 17);
      doc.text('Tel: (+34) 611 71 02 43', 20, yPosition + 21);
      doc.text('Email: reservas@senyorial.es', 20, yPosition + 25);

      // Línea separadora vertical
      doc.setDrawColor(...primaryColor);
      doc.setLineWidth(1);
      doc.line(105, yPosition - 2, 105, yPosition + 27);

      // Columna derecha - Cliente
      doc.setFontSize(12);
      doc.setTextColor(...primaryColor);
      doc.text('INTERESADO/A', 110, yPosition);

      doc.setFontSize(9);
      doc.setTextColor(...darkGray);
      doc.text(`Nombre: ${formData.clientName}`, 110, yPosition + 7);
      doc.text(`Email: ${formData.email}`, 110, yPosition + 11);
      doc.text(`Teléfono: ${formData.phone}`, 110, yPosition + 15);
      doc.text(`Dirección: ${formData.address}, ${formData.postalCode}`, 110, yPosition + 19);

      // Información adicional cuando incluye contrato
      if (formData.includeContract) {
        doc.text(`Nombre o razón social: ${formData.companyName}`, 110, yPosition + 23);
        doc.text(`CIF/NIF: ${formData.nifCif}`, 110, yPosition + 27);
      }

      // Ajustar espaciado según si incluye información adicional del contrato
      yPosition += formData.includeContract ? 60 : 50; // Más espacio cuando hay información adicional

      // === TÍTULO DEL PRESUPUESTO (con referencia) ===
      doc.setFontSize(18); // 16 → 18
      doc.setTextColor(...primaryColor);
      doc.text(`PRESUPUESTO ${refNumber}`, 20, yPosition);

      yPosition += 20; // Más separación después del título

      // === TABLA DE SERVICIOS ===
      // Header de la tabla
      doc.setFillColor(...primaryColor);
      doc.rect(20, yPosition, 170, 8, 'F');
      doc.setFontSize(9); // 8 → 9
      doc.setTextColor(255, 255, 255);
      doc.text('Servicio', 25, yPosition + 5);
      doc.text('Frecuencia', 75, yPosition + 5);
      doc.text('Horas', 115, yPosition + 5);
      doc.text('Precio/h', 135, yPosition + 5);
      doc.text('Subtotal', 165, yPosition + 5);

      yPosition += 8;

      // Filas de servicios (sin bordes)
      selectedServices.forEach((service, index) => {
        const pricing = calculateDetailedPricing(service);
        const frequencyLabels: { [key: string]: string } = {
          'semanal': 'Semanal',
          'quincenal': 'Quincenal',
          'mensual': 'Mensual',
          'unica': 'Una vez'
        };

        const frequencyDisplay = frequencyLabels[service.frequency] || service.frequency;
        const isEven = index % 2 === 0;

        // Fondo alternado
        if (!isEven) {
          doc.setFillColor(...lightGray);
          doc.rect(20, yPosition, 170, 8, 'F');
        }

        doc.setFontSize(8); // 7 → 8
        doc.setTextColor(...darkGray);
        doc.text(service.name.substring(0, 25), 25, yPosition + 5);
        doc.text(frequencyDisplay, 75, yPosition + 5);
        doc.text(service.quantity.toString(), 115, yPosition + 5);
        doc.text(`${pricing.pricePerHour.toFixed(2)}€`, 135, yPosition + 5);
        doc.text(`${pricing.subtotal.toFixed(2)}€`, 165, yPosition + 5);

        yPosition += 8;

        // Fila de detalles (siempre con fondo light gray para estructura)
        doc.setFillColor(...lightGray);
        doc.rect(20, yPosition, 170, 5, 'F');

        doc.setFontSize(7); // 6 → 7
        doc.setTextColor(...darkGray);
        const tariffText = service.tariff === 'premium' ? 'Premium' : 'Básica';
        doc.text(`Tarifa ${tariffText}`, 25, yPosition + 3);

        if (service.frequency === 'semanal' && service.weeklyServices && service.weeklyServices > 1) {
          doc.text(`${service.weeklyServices} servicios/sem`, 75, yPosition + 3);
        }

        if (pricing.discountPercent > 0) {
          doc.setTextColor(...primaryColor);
          doc.text(`${pricing.discountPercent}% desc.`, 135, yPosition + 3);
        }

        // Indicar suplemento si aplica
        if (pricing.hasSupplement) {
          doc.setTextColor(0, 0, 0); // Negro para mantener uniformidad
          const supplementAmount = 15 * pricing.weeklyMultiplier;
          doc.text(`+${supplementAmount}€ (${service.quantity}h)`, 165, yPosition + 3);
        }

        yPosition += 5;
      });

      yPosition += 10;

      // === SECCIÓN DE TOTALES (SIMULACIÓN Y RESUMEN) ===
      const fourWeeksSimulation = calculate4WeeksSimulation(selectedServices);
      const hasRecurrentServices = selectedServices.some(s => s.frequency !== 'unica');

      // Calcular totales
      const serviceTotals = selectedServices.map(s => {
        const pricing = calculateDetailedPricing(s);
        return { subtotal: pricing.subtotal, iva: pricing.iva, total: pricing.totalWithIVA };
      });

      const totalSubtotal = serviceTotals.reduce((sum, s) => sum + s.subtotal, 0);
      const totalIVA = serviceTotals.reduce((sum, s) => sum + s.iva, 0);
      const totalWithIVA = serviceTotals.reduce((sum, s) => sum + s.total, 0);

      let resumenTitle, resumenSubtotal, resumenIVA, resumenTotal;
      if (hasRecurrentServices) {
        resumenTitle = "RESUMEN MENSUAL";
        resumenSubtotal = fourWeeksSimulation.baseImponible4Weeks;
        resumenIVA = Math.round(resumenSubtotal * 0.21 * 100) / 100;
        resumenTotal = Math.round((resumenSubtotal + resumenIVA) * 100) / 100;
      } else {
        resumenTitle = "RESUMEN";
        resumenSubtotal = totalSubtotal;
        resumenIVA = totalIVA;
        resumenTotal = totalWithIVA;
      }

      const boxHeight = 30;

      if (hasRecurrentServices) {
        // Simulación 4 semanas (lado izquierdo) - EXACTAMENTE igual que resumen
        doc.setFillColor(...primaryColor);
        doc.rect(20, yPosition, 80, boxHeight, 'F');

        doc.setFontSize(10);
        doc.setTextColor(255, 255, 255);
        doc.text('SIMULACIÓN 4 SEMANAS', 25, yPosition + 8); // Cambié de +6 a +8
        doc.setFontSize(8);
        doc.setTextColor(255, 255, 255);
        doc.text(`Total servicios: ${fourWeeksSimulation.totalServices4Weeks}`, 25, yPosition + 14); // Cambié de +12 a +14
        doc.text(`Total horas: ${fourWeeksSimulation.totalHours4Weeks}h`, 25, yPosition + 18); // Cambié de +16 a +18

        // Línea separadora (EXACTAMENTE igual que resumen mensual)
        doc.setDrawColor(255, 255, 255);
        doc.setLineWidth(0.5);
        doc.line(25, yPosition + 21, 95, yPosition + 21); // Cambié de +20 a +21

        doc.setFontSize(10);
        doc.text(`BASE IMPONIBLE: ${fourWeeksSimulation.baseImponible4Weeks.toFixed(2)}€`, 25, yPosition + 26); // Ya estaba correcto
      }

      // Resumen (lado derecho o completo)
      const summaryX = hasRecurrentServices ? 110 : 20;
      const summaryWidth = hasRecurrentServices ? 80 : 170;

      doc.setFillColor(...primaryColor);
      doc.rect(summaryX, yPosition, summaryWidth, boxHeight, 'F');

      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text(resumenTitle, summaryX + 5, yPosition + 8);
      doc.setFontSize(8);
      doc.text(`Subtotal: ${resumenSubtotal.toFixed(2)}€`, summaryX + 5, yPosition + 14);
      doc.text(`IVA (21%): ${resumenIVA.toFixed(2)}€`, summaryX + 5, yPosition + 18);

      // Línea separadora
      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(0.5);
      doc.line(summaryX + 5, yPosition + 21, summaryX + summaryWidth - 5, yPosition + 21);

      doc.setFontSize(10);
      doc.text(`TOTAL: ${resumenTotal.toFixed(2)}€`, summaryX + 5, yPosition + 26);

      yPosition += 40;

      // === SECCIÓN FINAL (condiciones, referencia y confirmación) ===
      // Preparar condiciones
      const conditions = [
        '• Beneficiario: SA SIVINA DES BABOT 1996 S.L.U',
        '• IBAN: ES6301821613340201558684'
      ];

      if (hasRecurrentServices) {
        conditions.push('• Facturación servicios recurrentes: Mensual (del 16 al 15 de cada mes)');
      }

      if (selectedServices.some(s => s.frequency === 'unica')) {
        conditions.push('• Servicios de una vez: Previo pago');
        conditions.push('• Enviar comprobante 72h antes a reservas@senyorial.es');
      }

      // === CONDICIONES DE FACTURACIÓN ===
      doc.setFontSize(9);
      doc.setTextColor(...primaryColor);
      doc.text('CONDICIONES DE FACTURACIÓN', 20, yPosition);

      yPosition += 8;

      doc.setFontSize(7);
      doc.setTextColor(...darkGray);
      conditions.forEach(condition => {
        doc.text(condition, 20, yPosition);
        yPosition += 4;
      });

      yPosition += 8;

      // === INFORMACIÓN DEL PRESUPUESTO ===
      doc.setFontSize(8);
      doc.setTextColor(...darkGray);
      doc.text(`Referencia: ${refNumber}`, 20, yPosition);
      doc.text(`Fecha de emisión: ${emissionDate}`, 105, yPosition);
      doc.text(`Válido hasta: ${expiryDate}`, 150, yPosition);

      yPosition += 12;

      // === CONFIRMACIÓN ===
      doc.setFillColor(...primaryColor);
      doc.rect(20, yPosition, 170, 15, 'F');

      doc.setFontSize(9);
      doc.setTextColor(255, 255, 255);
      doc.text('CONFIRMACIÓN:', 25, yPosition + 6);
      doc.setFontSize(8);
      doc.text(`Responde a reservas@senyorial.es con "CONFIRMADO ${refNumber}"`, 25, yPosition + 11);

      yPosition += 20;

      // === DISCLAIMER ===
      doc.setFontSize(6);
      doc.setTextColor(...darkGray);
      doc.text('*Al confirmar, aceptas nuestros Términos y Condiciones y Política de Privacidad disponibles en senyorial.es', 105, yPosition, { align: 'center' });

      // Convertir a Buffer
      const pdfOutput = doc.output('arraybuffer');
      resolve(Buffer.from(pdfOutput));
    } catch (error) {
      reject(error);
    }
  });
}

// Función para generar referencia de contrato basada en presupuesto
export function generateContractReferenceFromQuote(quoteRefNumber: string): string {
  try {
    // Validar que sea una referencia de presupuesto válida
    if (!quoteRefNumber || !quoteRefNumber.startsWith('PRE-')) {
      console.warn('Referencia de presupuesto inválida:', quoteRefNumber);
      return getNextContractReferenceNumber();
    }

    // Extraer la parte después de 'PRE-' y crear referencia de contrato
    const refSuffix = quoteRefNumber.substring(4); // Quitar 'PRE-'
    return `CON-${refSuffix}`;
  } catch (error) {
    console.error('Error generando referencia de contrato desde presupuesto:', error);
    return getNextContractReferenceNumber();
  }
}

// Función para generar referencias únicas de contrato (fallback)
export function getNextContractReferenceNumber(): string {
  try {
    // Generar timestamp en formato YYMMDD
    const now = new Date();
    const year = String(now.getFullYear()).slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const timestamp = `${year}${month}${day}`;

    // Generar UUID corto (3 caracteres alfanuméricos)
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let shortId = '';
    for (let i = 0; i < 3; i++) {
      shortId += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return `CON-${timestamp}${shortId}`;
  } catch (error) {
    console.error('Error generando número de referencia de contrato:', error);
    const fallbackId = Date.now().toString().slice(-6);
    return `CON-${fallbackId}`;
  }
}

// Función principal para crear PDF de contrato
export function createContractPDF(data: ContractPDFData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new jsPDF('p', 'mm', 'a4');
      const { formData, calculations, refNumber } = data;

      // Datos de la empresa (fijos)
      const company = {
        name: 'SA SIVINA DES BABOT 1996 S.L.U.',
        cif: 'B70792858',
        address: 'C/RICARD ROCA 4, 07008, PALMA (ILLES BALEARS)',
        iban: 'ES63 0182 1613 3402 0155 8684'
      };

      // Datos del cliente
      const client = {
        name: formData.companyName || formData.clientName,
        cif: formData.nifCif,
        address: formData.address,
        postalCode: formData.postalCode,
        fiscalAddress: formData.fiscalAddress,
        fiscalPostalCode: formData.fiscalPostalCode,
        iban: formData.iban
      };

      // Datos del servicio
      const selectedService = calculations.services.find(s => s.selected);
      const servicePrice = selectedService ? calculateDetailedPricing(selectedService) : {
        pricePerHour: 0,
        subtotal: 0,
        iva: 0,
        totalWithIVA: 0,
        discountPercent: 0,
        weeklyMultiplier: 1,
        hasSupplement: false
      };

      // Fechas
      const currentDate = new Date();
      const contractDate = currentDate.toLocaleDateString('es-ES');


      // === PÁGINA 1: ENCABEZADO Y PARTES ===
      generateContractPage1(doc, company, client, contractDate, refNumber);

      // === PÁGINA 2: CLÁUSULAS 1-3 (OPTIMIZADAS) ===
      doc.addPage();
      generateContractPage2(doc, client, contractDate);

      // === PÁGINA 3: CLÁUSULAS 4-6 (OPTIMIZADAS) ===
      doc.addPage();
      generateContractPage3(doc, servicePrice, contractDate, company, selectedService);

      // === PÁGINA 4: CLÁUSULAS 7-10 Y FIRMAS (OPTIMIZADAS) ===
      doc.addPage();
      generateContractPage4(doc, contractDate);

      // === PÁGINA 5: ORDEN DE DOMICILIACIÓN SEPA ===
      doc.addPage();
      generateContractPage5(doc, company, client, servicePrice, refNumber, contractDate);

      // Convertir a Buffer
      const pdfOutput = doc.output('arraybuffer');
      resolve(Buffer.from(pdfOutput));

    } catch (error) {
      reject(error);
    }
  });
}

// === FUNCIONES AUXILIARES PARA GENERAR PÁGINAS DEL CONTRATO ===

function generateContractPage1(
  doc: jsPDF,
  company: CompanyData,
  client: ClientData,
  contractDate: string,
  refNumber: string
) {
  // Paleta de colores simplificada
  const darkGray = [52, 58, 64] as [number, number, number];

  // Empezar directamente sin header

  // Título principal con mejor tipografía
  doc.setFontSize(18);
  doc.setTextColor(0, 91, 141); // Color corporativo
  doc.setFont('helvetica', 'bold');
  doc.text('CONTRATO DE SERVICIOS DE LIMPIEZA', 105, 35, { align: 'center' });

  // Referencia del contrato
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'normal');
  doc.text(`Ref: ${refNumber}`, 105, 45, { align: 'center' });

  // Subtítulo con fecha y lugar
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'normal');
  doc.text(`En Palma, ${contractDate}`, 105, 50, { align: 'center' });


  // Sección REUNIDOS con mejor formato
  doc.setFontSize(14);
  doc.setTextColor(0, 91, 141);
  doc.setFont('helvetica', 'bold');
  doc.text('REUNIDOS', 20, 70);

  // Sin línea bajo REUNIDOS

  // De una parte (Empresa) con mejor espaciado
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text('De una parte:', 20, 85);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const companyText = `${company.name}, con domicilio en ${company.address}, CIF ${company.cif}, representada en propio nombre, en adelante, el "Limpiador".`;
  const companyLines = doc.splitTextToSize(companyText, 170);
  doc.text(companyLines, 20, 95);

  // De otra parte (Cliente) con espaciado mejorado
  const companyTextHeight = companyLines.length * 5;
  doc.setFont('helvetica', 'bold');
  doc.text('De otra parte:', 20, 95 + companyTextHeight + 15);

  doc.setFont('helvetica', 'normal');
  const clientText = `${client.name}, con domicilio en ${client.address}, ${client.postalCode} y Dirección Fiscal ${client.fiscalAddress}, ${client.fiscalPostalCode}, CIF/NIF: ${client.cif}, representado en propio nombre, en adelante, el "Cliente".`;
  const clientLines = doc.splitTextToSize(clientText, 170);
  doc.text(clientLines, 20, 105 + companyTextHeight + 15);

  // Párrafo de capacidad jurídica con mejor formato
  const clientTextHeight = clientLines.length * 5;
  const legalText = 'Ambas partes, en lo sucesivo denominadas individualmente como "Parte" y conjuntamente "Partes", reconocen tener la capacidad jurídica necesaria para contratar y obligarse, y acuerdan formalizar el presente contrato de servicios de limpieza (en adelante, el "Contrato") conforme a las siguientes:';
  const legalLines = doc.splitTextToSize(legalText, 170);
  doc.text(legalLines, 20, 120 + companyTextHeight + clientTextHeight + 15);

  // Sección EXPOSICIÓN DE MOTIVOS con estilo profesional
  const legalTextHeight = legalLines.length * 5;
  const motiveStartY = 135 + companyTextHeight + clientTextHeight + legalTextHeight + 15;

  doc.setFontSize(14);
  doc.setTextColor(0, 91, 141);
  doc.setFont('helvetica', 'bold');
  doc.text('EXPOSICIÓN DE MOTIVOS', 20, motiveStartY);

  // Sin línea bajo título

  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'normal');
  const motives = [
    'I. El Limpiador cuenta con la experiencia, conocimientos y medios técnicos para prestar servicios de limpieza y desinfección.',
    'II. El Cliente requiere dichos servicios.',
    'III. Ambas partes han negociado y aceptado un presupuesto y una propuesta de actividades que regirán el servicio.',
    'IV. En consecuencia, el Limpiador se compromete libremente a prestar el servicio solicitado, formalizando este acuerdo en el presente Contrato.'
  ];

  let yPos = motiveStartY + 15;
  motives.forEach(motive => {
    const motiveLines = doc.splitTextToSize(motive, 170);
    doc.text(motiveLines, 20, yPos);
    yPos += motiveLines.length * 5 + 8;
  });

  // Footer profesional con línea separadora
  doc.setLineWidth(0.3);
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 280, 190, 280);

  doc.setFontSize(8);
  doc.setTextColor(...darkGray);
  doc.text('1/5 - ' + contractDate, 20, 290);
  doc.text('Este contrato no es vinculante sin la firma de ambas partes', 105, 290, { align: 'center' });
}

function generateContractPage2(doc: jsPDF, client: ClientData, contractDate: string) {
  // Paleta de colores simplificada
  const darkGray = [52, 58, 64] as [number, number, number];

  // Empezar directamente sin header

  // Título CLÁUSULAS con estilo profesional
  doc.setFontSize(16);
  doc.setTextColor(0, 91, 141);
  doc.setFont('helvetica', 'bold');
  doc.text('CLÁUSULAS', 105, 35, { align: 'center' });


  // Cláusulas optimizadas (10 cláusulas agrupadas)
  const clauses = [
    {
      title: 'PRIMERA. Objeto y Ejecución del Servicio',
      content: `El presente Contrato tiene por objeto la prestación del servicio de limpieza en los siguientes inmuebles:\n\n${client.address}, ${client.postalCode}\n\n(En adelante, el "Servicio").\n\nEl Limpiador actuará con autonomía profesional, ajustándose a lo pactado en el presupuesto adjunto y a la normativa aplicable.\n\nEl Servicio se prestará conforme a un listado de tareas acordado previamente y se realizará en los inmuebles señalados en la cláusula primera.`
    },
    {
      title: 'SEGUNDA. Obligaciones de las Partes',
      content: 'Obligaciones del Limpiador:\nEl Limpiador se compromete a:\n• Ejecutar el Servicio con la diligencia y profesionalidad exigida en el sector.\n• Suministrar y planificar los materiales e instrumentos necesarios.\n• Respetar las fechas, plazos e instrucciones acordadas.\n• Informar previamente al Cliente sobre las características esenciales del Servicio.\n\nObligaciones del Cliente:\nEl Cliente deberá:\n• Abonar puntualmente el precio establecido.\n• Proporcionar información veraz y completa para la correcta prestación del Servicio.\n• Colaborar activamente sin obstaculizar el desempeño del Limpiador.'
    },
    {
      title: 'TERCERA. Modificaciones y Duración',
      content: `Modificaciones:\nCualquier modificación o ampliación del Servicio deberá ser negociada y formalizada por escrito. En caso de desacuerdo, cualquiera de las partes podrá resolver el Contrato. Las variaciones que impliquen cambios en el precio deberán notificarse para su correspondiente negociación.\n\nDuración y Renovación:\nEl Servicio se prestará desde el ${contractDate} durante 12 meses, prorrogándose automáticamente por períodos iguales, salvo notificación fehaciente de terminación por cualquiera de las partes con un preaviso mínimo de 2 días antes de la finalización del período en curso.`
    }
  ];

  let yPos = 50;
  clauses.forEach((clause) => {
    // Mostrar todas las cláusulas, ajustando el espacio
    doc.setFontSize(11);
    doc.setTextColor(0, 91, 141);
    doc.setFont('helvetica', 'bold');
    doc.text(clause.title, 20, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    const contentLines = doc.splitTextToSize(clause.content, 170);
    doc.text(contentLines, 20, yPos);
    yPos += contentLines.length * 4 + 8;

    // Sin líneas separadoras
  });

  // Footer profesional
  doc.setLineWidth(0.3);
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 280, 190, 280);

  doc.setFontSize(8);
  doc.setTextColor(...darkGray);
  doc.text('2/5 - ' + contractDate, 20, 290);
  doc.text('Este contrato no es vinculante sin la firma de ambas partes', 105, 290, { align: 'center' });
}

function generateContractPage3(doc: jsPDF, servicePrice: ServicePricing, contractDate: string, company: CompanyData, selectedService?: ServiceData) {
  // Paleta de colores simplificada
  const darkGray = [52, 58, 64] as [number, number, number];

  // Empezar directamente sin header

  // Cláusulas optimizadas CUARTA a SEXTA
  const clauses = [
    {
      title: 'CUARTA. Precio, Pago e Intereses de Demora',
      content: `Precio y Pago:\nSe acuerda el pago de ${(servicePrice.pricePerHour || 17.85).toFixed(2)}€ + IVA por cada hora de servicio.${selectedService && selectedService.quantity < 3 ? ' Cuando el servicio sea inferior a 3 horas, se añadirá un suplemento de 15€ + IVA por servicio.' : ''}\n\nEl Cliente efectuará el pago mediante transferencia bancaria en un plazo de 3 días desde la emisión de la factura.\n\nEl Limpiador facturará mensualmente a reservas@senyorial.es por el período comprendido del día 16 al 15 (inclusive), y el pago se realizará a la cuenta del beneficiario:\n\nBeneficiario: ${company.name}\nIBAN: ${company.iban}\nConcepto: Nº Factura\n\nIntereses de Demora:\nCualquier retraso en el pago generará intereses de demora conforme al artículo 1.101 del Código Civil y al tipo de interés legal del dinero publicado por el Banco de España, exigibles automáticamente a partir de la fecha de vencimiento.`
    },
    {
      title: 'QUINTA. Horarios, Cancelaciones y Materiales',
      content: 'Horario y Recuperación de Tiempo:\nEl Servicio se prestará según el horario establecido.\n\n• Si el Limpiador se retrasa por causas ajenas a fuerza mayor, deberá recuperar el tiempo perdido en la mayor brevedad posible, salvo acuerdo en contrario.\n• Si el retraso se debe al Cliente, se facturará como tiempo trabajado, pudiendo ser recuperado previa aceptación del Limpiador.\n\nCancelación y Reprogramación:\nEl Contrato será válido con la firma de ambas partes.\n\n• El Limpiador podrá cancelar o modificar el horario del Servicio por causas justificadas, debiendo notificarlo al Cliente para evitar perjuicios.\n• Si el Cliente decide cancelar, deberá notificarlo con al menos 48 horas de antelación, pudiendo reprogramarse el Servicio según disponibilidad.\n• Si el Cliente cancela con menos de 48 horas de antelación, se aplicará una penalización del 50% del importe del servicio programado.\n\nMateriales y Tarifas:\nCon la Tarifa Premium, el Limpiador proporcionará los productos y materiales, asumiendo todos los gastos e impuestos relacionados.\n\nCon la Tarifa Básica, el Cliente facilitará los medios e instrumentos necesarios.\n\nEl Limpiador garantiza que el personal asignado posee la cualificación y experiencia adecuadas.'
    },
    {
      title: 'SEXTA. Gastos Laborales',
      content: 'El Limpiador asumirá los gastos de su personal.\n\nNo existe relación laboral entre el Limpiador y el Cliente, ni entre este último y el personal del Limpiador.\n\nEl personal colaborador será contratado conforme a la legislación vigente, exonerando al Cliente de cualquier responsabilidad laboral.\n\nEl Cliente se compromete a no contratar empleados del Limpiador durante 12 meses tras la finalización del Contrato.'
    }
  ];

  let yPos = 20;
  clauses.forEach((clause) => {
    // Verificar espacio disponible antes del footer (máximo 270)
    if (yPos > 270) return;

    doc.setFontSize(11);
    doc.setTextColor(0, 91, 141);
    doc.setFont('helvetica', 'bold');
    doc.text(clause.title, 20, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    const contentLines = doc.splitTextToSize(clause.content, 170);
    doc.text(contentLines, 20, yPos);
    yPos += contentLines.length * 4 + 8;

    // Sin líneas separadoras
  });

  // Footer profesional
  doc.setLineWidth(0.3);
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 280, 190, 280);

  doc.setFontSize(8);
  doc.setTextColor(...darkGray);
  doc.text('3/5 - ' + contractDate, 20, 290);
  doc.text('Este contrato no es vinculante sin la firma de ambas partes', 105, 290, { align: 'center' });
}

function generateContractPage4(doc: jsPDF, contractDate: string) {
  // Paleta de colores simplificada
  const darkGray = [52, 58, 64] as [number, number, number];

  // Empezar directamente sin header

  // Cláusulas optimizadas SÉPTIMA a DÉCIMA
  const clauses = [
    {
      title: 'SÉPTIMA. Responsabilidad y Fuerza Mayor',
      content: 'Responsabilidad:\nEl Limpiador cuenta con seguro de responsabilidad civil. La responsabilidad estará limitada a lo que cubra dicho seguro. Cada Parte responderá por su actuación negligente o culposa que cause daños a la otra, salvo que estos se deban a información falsa o incompleta facilitada por el Cliente.\n\nFuerza Mayor:\nNinguna Parte será responsable por retrasos o incumplimientos derivados de fuerza mayor (ej. inundaciones, incendios, huelgas, órdenes gubernamentales, etc.). Se deberá notificar a la otra Parte la existencia de tales causas.'
    },
    {
      title: 'OCTAVA. Cesión, Subcontratación y Renuncias',
      content: 'Cesión y Subcontratación:\nNo se podrá ceder el Contrato ni sus derechos y obligaciones sin el consentimiento previo y escrito de la otra Parte.\n\nRenuncias:\nLa omisión en el ejercicio de cualquier derecho no implicará renuncia a su exigibilidad futura. Toda dispensa o aplazamiento deberá constar por escrito y limitarse a la situación concreta.'
    },
    {
      title: 'NOVENA. Resolución del Contrato',
      content: 'El incumplimiento de las obligaciones podrá dar lugar a:\n\n• La resolución del Contrato, optando la Parte cumplidora por exigir su cumplimiento o indemnización de daños y perjuicios.\n• La resolución en caso de insolvencia, suspensión de pagos, concurso, liquidación o deficiencias recurrentes en el Servicio.\n• La terminación por voluntad de cualquiera de las Partes, mediante notificación escrita con 30 días de antelación. En caso de terminación a iniciativa del Cliente, éste abonará las facturas devengadas; si es a iniciativa del Limpiador, se entregarán todos los elementos relacionados con la preparación del Servicio.'
    },
    {
      title: 'DÉCIMA. Notificaciones y Jurisdicción',
      content: 'Las notificaciones se realizarán en las direcciones indicadas al inicio del Contrato mediante un medio fehaciente que deje constancia de envío y recepción. Cualquier cambio de domicilio deberá comunicarse de inmediato a la otra Parte.\n\nPara cualquier controversia derivada del presente contrato serán competentes los Tribunales de Palma de Mallorca, renunciando las partes expresamente a cualquier otro fuero que pudiera corresponderles, y será de aplicación la legislación española.'
    }
  ];

  let yPos = 20;
  clauses.forEach((clause) => {
    doc.setFontSize(11);
    doc.setTextColor(0, 91, 141);
    doc.setFont('helvetica', 'bold');
    doc.text(clause.title, 20, yPos);
    yPos += 6;

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    const contentLines = doc.splitTextToSize(clause.content, 170);
    doc.text(contentLines, 20, yPos);
    yPos += contentLines.length * 4 + 6;

    // Sin líneas separadoras
  });

  // Texto final y firmas con mejor formato
  yPos += 10;

  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'normal');
  const finalText = 'Ambas partes, habiendo leído y comprendido íntegramente este Contrato, lo aceptan y obligan en todas sus partes firmándolo, en tantas copias originales como partes intervinieren.';
  const finalLines = doc.splitTextToSize(finalText, 170);
  doc.text(finalLines, 20, yPos);

  // Sección de firmas profesional
  yPos += finalLines.length * 4 + 15;

  // Firma del limpiador
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('EL LIMPIADOR', 30, yPos);

  // Firma del cliente
  doc.text('EL CLIENTE', 130, yPos);

  // Líneas para firmas (con más espacio)
  doc.setLineWidth(0.5);
  doc.setDrawColor(...darkGray);
  doc.line(20, yPos + 35, 90, yPos + 35);
  doc.line(120, yPos + 35, 190, yPos + 35);

  // Fechas (con más separación)
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Fecha: ${contractDate}`, 20, yPos + 50);
  doc.text(`Fecha: ${contractDate}`, 120, yPos + 50);

  // Footer profesional
  doc.setLineWidth(0.3);
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 280, 190, 280);

  doc.setFontSize(8);
  doc.setTextColor(...darkGray);
  doc.text('4/5 - ' + contractDate, 20, 290);
  doc.text('Este contrato no es vinculante sin la firma de ambas partes', 105, 290, { align: 'center' });
}

function generateContractPage5(doc: jsPDF, company: CompanyData, client: ClientData, servicePrice: ServicePricing, refNumber: string, contractDate: string) {
  // Paleta de colores simplificada
  const darkGray = [52, 58, 64] as [number, number, number];

  // Empezar directamente sin header

  // === TÍTULO PRINCIPAL (como el documento oficial) ===
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text('Orden de domiciliación de adeudo directo SEPA B2B', 105, 25, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.text('SEPA Business-to-Business Direct Debit Mandate', 105, 32, { align: 'center' });

  // === SECCIÓN ACREEDOR (rellenada automáticamente) ===
  let yPos = 45;

  // Campos del acreedor con datos rellenados
  doc.setFontSize(9);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'normal');

  doc.text('Referencia de la orden de domiciliación:', 20, yPos);
  doc.text(refNumber, 110, yPos);
  doc.line(110, yPos + 1, 190, yPos + 1);

  yPos += 7;
  doc.text('Identificador del acreedor:', 20, yPos);
  doc.text('B70792858', 90, yPos);
  doc.line(90, yPos + 1, 190, yPos + 1);

  yPos += 10;
  doc.setFont('helvetica', 'bold');
  doc.text('Nombre del acreedor / Creditor´s name', 20, yPos);
  yPos += 4;
  doc.setFont('helvetica', 'normal');
  doc.text(company.name, 20, yPos);
  doc.line(20, yPos + 1, 190, yPos + 1);

  yPos += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Dirección / Address', 20, yPos);
  yPos += 4;
  doc.setFont('helvetica', 'normal');
  doc.text(company.address, 20, yPos);
  doc.line(20, yPos + 1, 190, yPos + 1);

  yPos += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Código postal - Población - Provincia / Postal Code - City - Town', 20, yPos);
  yPos += 4;
  doc.setFont('helvetica', 'normal');
  doc.text('07008 - Palma - Baleares', 20, yPos);
  doc.line(20, yPos + 1, 190, yPos + 1);

  yPos += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('País / Country', 20, yPos);
  yPos += 4;
  doc.setFont('helvetica', 'normal');
  doc.text('España', 20, yPos);
  doc.line(20, yPos + 1, 190, yPos + 1);

  // === TEXTO LEGAL (del documento oficial) ===
  yPos += 12;
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  const legalText1 = 'Mediante la firma de esta orden de domiciliación, el deudor autoriza (A) al acreedor a enviar instrucciones a la entidad del deudor para adeudar su cuenta y (B) a la entidad para efectuar los adeudos en su cuenta siguiendo las instrucciones del acreedor. Esta orden de domiciliación está prevista para operaciones exclusivamente entre empresas y/o autónomos. El deudor no tiene derecho a que su entidad le reembolse una vez que se haya realizado el cargo en cuenta, pero puede solicitar a su entidad que no efectúe el adeudo en la cuenta hasta la fecha debida.';
  const legalLines1 = doc.splitTextToSize(legalText1, 170);
  doc.text(legalLines1, 20, yPos);

  // === SECCIÓN DEUDOR ===
  yPos += legalLines1.length * 2.5 + 10;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Nombre del deudor/es / Debtor\'s name', 20, yPos);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.text('(titular/es de la cuenta de cargo)', 20, yPos + 3);
  yPos += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(client.name, 20, yPos);
  doc.line(20, yPos + 1, 190, yPos + 1);

  yPos += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Dirección del deudor / Address of the debtor', 20, yPos);
  yPos += 4;
  doc.setFont('helvetica', 'normal');
  doc.text(`${client.address}, ${client.postalCode}`, 20, yPos);
  doc.line(20, yPos + 1, 190, yPos + 1);

  yPos += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Código postal - Población - Provincia / Postal Code - City - Town', 20, yPos);
  yPos += 4;
  doc.setFont('helvetica', 'normal');
  doc.text(`${client.fiscalPostalCode} - Palma - Baleares`, 20, yPos);
  doc.line(20, yPos + 1, 190, yPos + 1);

  yPos += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('País del deudor / Country of the debtor', 20, yPos);
  yPos += 4;
  doc.setFont('helvetica', 'normal');
  doc.text('España', 20, yPos);
  doc.line(20, yPos + 1, 190, yPos + 1);

  yPos += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Swift BIC / Swift BIC', 20, yPos);
  yPos += 4;
  doc.setFont('helvetica', 'normal');
  doc.line(20, yPos + 1, 190, yPos + 1);

  yPos += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Número de cuenta - IBAN / Account number - IBAN', 20, yPos);
  yPos += 4;
  doc.setFont('helvetica', 'normal');
  if (client.iban) {
    doc.text(client.iban, 20, yPos);
  }
  doc.line(20, yPos + 1, 190, yPos + 1);

  // === TIPO DE PAGO ===
  yPos += 10;
  doc.setFont('helvetica', 'bold');
  doc.text('Tipo de pago:', 20, yPos);

  // Caja marcada para pago recurrente
  doc.rect(70, yPos - 3, 4, 4);
  doc.text('X', 71, yPos);
  doc.text('Pago recurrente', 76, yPos);

  // Caja vacía para pago único
  doc.rect(130, yPos - 3, 4, 4);
  doc.text('Pago único', 136, yPos);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.text('Recurrent payment', 73, yPos + 3);
  doc.text('One-off payment', 133, yPos + 3);

  // === FIRMA ===
  yPos += 12;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Fecha – Localidad:', 20, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(`Palma, ${contractDate}`, 65, yPos);
  doc.line(65, yPos + 1, 190, yPos + 1);

  yPos += 8;
  doc.setFont('helvetica', 'bold');
  doc.text('Firma del deudor:', 20, yPos);
  doc.line(20, yPos + 15, 190, yPos + 15);

  // === TEXTO LEGAL FINAL (exacto del documento oficial) ===
  yPos += 25;
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  const finalText = 'TODOS LOS CAMPOS HAN DE SER CUMPLIMENTADOS OBLIGATORIAMENTE.\nUNA VEZ FIRMADA ESTA ORDEN DE DOMICILIACIÓN DEBE SER ENVIADA AL ACREEDOR PARA SU CUSTODIA.\nLA ENTIDAD DEL DEUDOR REQUIERE AUTORIZACIÓN DE ÉSTE PREVIA AL CARGO EN CUENTA DE LOS ADEUDOS DIRECTOS B2B.\nEL DEUDOR PODRÁ GESTIONAR DICHA AUTORIZACIÓN CON LOS MEDIOS QUE SU ENTIDAD PONGA A SU DISPOSICIÓN.';
  const finalLines = doc.splitTextToSize(finalText, 170);
  doc.text(finalLines, 20, yPos);

  // Footer profesional
  doc.setLineWidth(0.3);
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 280, 190, 280);
  doc.setFontSize(8);
  doc.setTextColor(...darkGray);
  doc.text('5/5 - ' + contractDate, 20, 290);
}