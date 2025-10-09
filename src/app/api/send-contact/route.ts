import { NextRequest, NextResponse } from 'next/server';
import { EmailService } from '@/lib/email-service';
import { createClientContactTemplate, createInternalContactTemplate } from '@/lib/email-templates';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Extraer datos del formulario
    const { name, email, phone, service, frequency, area, message } = body;

    // Preparar datos del cliente
    const client = {
      name,
      email,
      phone
    };

    // Formatear datos para mostrar
    const serviceText = service || 'No especificado';

    // Generar templates
    const clientTemplate = createClientContactTemplate(
      client,
      serviceText,
      frequency,
      area,
      message
    );

    const internalTemplate = createInternalContactTemplate(
      client,
      serviceText,
      frequency,
      area,
      message
    );

    // Enviar emails usando el servicio centralizado
    const results = await EmailService.sendMultiple([
      () => EmailService.sendContactToClient(client, clientTemplate),
      () => EmailService.sendContactInternal(client, serviceText, internalTemplate)
    ]);

    // Si falló el email al cliente, es error crítico
    if (results.failed > 0 && results.success === 0) {
      return NextResponse.json(
        { error: 'Error al enviar confirmación' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Consulta enviada correctamente',
        emailsSent: results.success,
        emailsFailed: results.failed
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}