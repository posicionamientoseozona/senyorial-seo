import { NextRequest, NextResponse } from 'next/server';
import { EmailService } from '@/lib/email-service';
import { createClientQuoteTemplate, createInternalQuoteTemplate } from '@/lib/email-templates';

interface ServiceData {
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

interface FormData {
  clientName: string;
  email: string;
  phone: string;
  address: string;
  services: ServiceData[];
  additionalNotes: string;
  photos: File[];
  includeContract: boolean;
  // Campos de facturación
  nifCif: string;
  companyName: string;
  fiscalAddress: string;
  iban: string;
}

interface RequestBody {
  formData: FormData;
  calculations: {
    services: ServiceData[];
    total: number;
  };
  pdfBuffer: string; // PDF en base64
  pdfFilename: string;
  refNumber: string;
  // Campos opcionales para contrato
  contractBuffer?: string; // PDF del contrato en base64
  contractFilename?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    const { formData, calculations, pdfBuffer, pdfFilename, refNumber, contractBuffer, contractFilename } = body;

    // Servicios seleccionados para mostrar en el email
    const selectedServices = calculations.services.filter(s => s.selected);

    // Preparar datos del cliente
    const client = {
      name: formData.clientName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address
    };

    // Convertir PDFs de base64 a buffer para adjuntos
    const pdfData = Buffer.from(pdfBuffer, 'base64');
    const attachments = [
      {
        filename: pdfFilename,
        content: pdfData,
      }
    ];

    // Incluir contrato si está disponible
    if (formData.includeContract && contractBuffer && contractFilename) {
      const contractData = Buffer.from(contractBuffer, 'base64');
      attachments.push({
        filename: contractFilename,
        content: contractData,
      });
    }

    // Generar templates
    const clientTemplate = createClientQuoteTemplate(
      client,
      refNumber,
      selectedServices,
      formData.additionalNotes,
      formData.includeContract
    );

    const internalTemplate = createInternalQuoteTemplate(
      client,
      refNumber,
      selectedServices,
      calculations.total,
      formData.additionalNotes,
      formData.photos.length,
      formData.includeContract
    );

    // Enviar emails usando el servicio centralizado
    const results = await EmailService.sendMultiple([
      () => EmailService.sendQuoteToClient(client, refNumber, clientTemplate, attachments),
      () => EmailService.sendQuoteInternal(client, refNumber, internalTemplate, attachments)
    ]);

    // Si falló el email al cliente, es error crítico
    if (results.failed > 0 && results.success === 0) {
      return NextResponse.json(
        { error: 'Error al enviar el presupuesto por email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Presupuesto enviado correctamente',
        refNumber: refNumber,
        emailsSent: results.success,
        emailsFailed: results.failed
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Error processing quote email:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}