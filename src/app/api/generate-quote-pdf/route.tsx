import { NextRequest, NextResponse } from 'next/server';
import {
  createQuotePDF,
  getNextReferenceNumber,
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
}



export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    const { formData, calculations, refNumber: providedRefNumber } = body;

    // Usar referencia proporcionada o generar una nueva
    console.log('📋 [PDF-API] Referencia recibida:', { providedRefNumber, type: typeof providedRefNumber });
    const refNumber = (providedRefNumber && providedRefNumber.trim() !== '')
      ? providedRefNumber
      : getNextReferenceNumber();
    console.log('📋 [PDF-API] Referencia final:', refNumber);

    // Generar PDF usando la nueva implementación modular
    const pdfBuffer = await createQuotePDF({
      formData,
      calculations,
      refNumber
    });

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=presupuesto-${formData.clientName.replace(/\s+/g, '-').toLowerCase()}-${refNumber}.pdf`,
        'X-Quote-Reference': refNumber
      }
    });
  } catch (error) {
    console.error('Error generating PDF with jsPDF:', error);

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
      error: 'Error al generar el PDF',
      details: process.env.NODE_ENV === 'development' ? errorDetails : undefined
    }, { status: 500 });
  }
}

