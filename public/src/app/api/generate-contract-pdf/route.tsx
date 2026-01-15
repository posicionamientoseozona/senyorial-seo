import { NextRequest, NextResponse } from 'next/server';
import {
  createContractPDF,
  generateContractReferenceFromQuote,
  getNextContractReferenceNumber,
  type ServiceData,
  type QuoteFormData
} from '@/lib/pdf-generator';

interface RequestBody {
  formData: QuoteFormData;
  calculations: {
    services: ServiceData[];
    total: number;
  };
  refNumber?: string;
  quoteRefNumber?: string; // Referencia del presupuesto para derivar la del contrato
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    const { formData, calculations, refNumber: providedRefNumber, quoteRefNumber } = body;

    // Validar que se incluya contrato
    if (!formData.includeContract) {
      return NextResponse.json({
        error: 'El contrato solo se puede generar si se ha solicitado en el formulario'
      }, { status: 400 });
    }

    // Validar campos de facturación
    if (!formData.nifCif || !formData.companyName || !formData.fiscalAddress || !formData.fiscalPostalCode || !formData.iban) {
      return NextResponse.json({
        error: 'Faltan campos obligatorios para generar el contrato'
      }, { status: 400 });
    }

    // Generar referencia del contrato basada en presupuesto o usar proporcionada
    console.log('📋 [CONTRACT-API] Referencias recibidas:', {
      providedRefNumber,
      quoteRefNumber,
      providedType: typeof providedRefNumber,
      quoteType: typeof quoteRefNumber
    });

    let refNumber: string;
    if (providedRefNumber && providedRefNumber.trim() !== '') {
      // Si se proporciona una referencia específica, usarla
      refNumber = providedRefNumber;
    } else if (quoteRefNumber && quoteRefNumber.trim() !== '') {
      // Si se proporciona referencia del presupuesto, derivar la del contrato
      refNumber = generateContractReferenceFromQuote(quoteRefNumber);
    } else {
      // Fallback: generar nueva referencia
      refNumber = getNextContractReferenceNumber();
    }

    console.log('📋 [CONTRACT-API] Referencia final:', refNumber);

    // Generar PDF del contrato
    const pdfBuffer = await createContractPDF({
      formData,
      calculations,
      refNumber
    });

    // Función para normalizar nombre del archivo
    const normalizeFilename = (name: string): string => {
      return name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remover acentos
        .replace(/[^\w\s-]/g, '') // Remover caracteres especiales
        .replace(/\s+/g, '-') // Reemplazar espacios con guiones
        .toLowerCase();
    };

    const normalizedClientName = normalizeFilename(formData.companyName || formData.clientName);
    const filename = `contrato-${normalizedClientName}-${refNumber}.pdf`;

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'X-Contract-Reference': refNumber
      }
    });
  } catch (error) {
    console.error('Error generating contract PDF:', error);

    // Proporcionar información más detallada sobre el error
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    const errorDetails = {
      message: errorMessage,
      timestamp: new Date().toISOString(),
      nodeEnv: process.env.NODE_ENV,
      library: 'jspdf',
    };

    console.error('Detalles del error:', errorDetails);

    return NextResponse.json({
      error: 'Error al generar el PDF del contrato',
      details: process.env.NODE_ENV === 'development' ? errorDetails : undefined
    }, { status: 500 });
  }
}