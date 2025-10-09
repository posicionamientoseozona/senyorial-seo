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
  services: ServiceData[];
  additionalNotes: string;
  photos: File[];
}

export interface QuotePDFData {
  formData: QuoteFormData;
  calculations: {
    services: ServiceData[];
    total: number;
  };
  refNumber: string;
}

// Función para generar el próximo número de referencia secuencial
export function getNextReferenceNumber(): string {
  const counterFilePath = path.join(process.cwd(), 'data', 'quote-counter.json');

  try {
    const dataDir = path.dirname(counterFilePath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let counter = 7000;

    if (fs.existsSync(counterFilePath)) {
      const counterData = JSON.parse(fs.readFileSync(counterFilePath, 'utf-8'));
      counter = counterData.nextNumber || 7000;
    }

    const refNumber = `PRE-${counter}`;
    const nextCounter = counter + 1;
    fs.writeFileSync(counterFilePath, JSON.stringify({ nextNumber: nextCounter }, null, 2));

    return refNumber;
  } catch (error) {
    console.error('Error generando número de referencia:', error);
    return `PRE-${7000 + Math.floor(Math.random() * 9999)}`;
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
    subtotal += 15;
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

    const basePrice = service.tariff === 'premium' ? 21.00 : 19.00;
    const hoursFor4Weeks = service.frequency === 'semanal' ?
      service.quantity * weeklyMultiplier * 4 :
      service.frequency === 'quincenal' ? service.quantity * 2 : service.quantity;

    let basePriceFor4Weeks = basePrice * hoursFor4Weeks;

    // Añadir suplemento por 2 horas o menos en simulación

    if (service.quantity <= 2) {
      const weeksInMonth = service.frequency === 'semanal' ? 4 :
                          service.frequency === 'quincenal' ? 2 : 1;
      basePriceFor4Weeks += 15 * weeksInMonth;
    }

    priceWithoutDiscount += basePriceFor4Weeks;

    const discountedHours = service.frequency === 'semanal' ?
      service.quantity * weeklyMultiplier * 4 :
      service.frequency === 'quincenal' ? service.quantity * 2 : service.quantity;

    let pricingFor4Weeks = pricing.pricePerHour * discountedHours;

    // Añadir suplemento por 2 horas o menos con descuento aplicado
    if (service.quantity <= 2) {
      const weeksInMonth = service.frequency === 'semanal' ? 4 :
                          service.frequency === 'quincenal' ? 2 : 1;
      pricingFor4Weeks += 15 * weeksInMonth;
    }

    priceWithDiscount += pricingFor4Weeks;
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

      // Colores del proyecto
      const primaryColor = [0, 91, 141] as [number, number, number]; // #005b8d
      const secondaryColor = [3, 180, 198] as [number, number, number]; // #03b4c6
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
      doc.text(`Dirección: ${formData.address}`, 110, yPosition + 19);

      yPosition += 50; // Más separación después del header

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
        doc.setTextColor(108, 117, 125);
        const tariffText = service.tariff === 'premium' ? 'Premium' : 'Básica';
        doc.text(`Tarifa ${tariffText}`, 25, yPosition + 3);

        if (service.frequency === 'semanal' && service.weeklyServices && service.weeklyServices > 1) {
          doc.text(`${service.weeklyServices} servicios/sem`, 75, yPosition + 3);
        }

        if (pricing.discountPercent > 0) {
          doc.setTextColor(...secondaryColor);
          doc.text(`${pricing.discountPercent}% desc.`, 135, yPosition + 3);
        }

        // Indicar suplemento si aplica
        if (pricing.hasSupplement) {
          doc.setTextColor(220, 53, 69); // Color rojo para destacar
          doc.text(`+15€ (${service.quantity}h)`, 165, yPosition + 3);
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

      doc.setFillColor(...secondaryColor);
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
      doc.setTextColor(100, 100, 100);
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
      doc.setTextColor(108, 117, 125);
      doc.text('*Al confirmar, aceptas nuestros Términos y Condiciones y Política de Privacidad disponibles en senyorial.es', 105, yPosition, { align: 'center' });

      // Convertir a Buffer
      const pdfOutput = doc.output('arraybuffer');
      resolve(Buffer.from(pdfOutput));
    } catch (error) {
      reject(error);
    }
  });
}