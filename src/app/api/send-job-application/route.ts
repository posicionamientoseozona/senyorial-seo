import { NextRequest, NextResponse } from 'next/server';
import { EmailService } from '@/lib/email-service';
import { createClientJobTemplate, createInternalJobTemplate } from '@/lib/email-templates';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extraer datos del formulario
    const nombre = formData.get('nombre') as string;
    const email = formData.get('email') as string;
    const telefono = formData.get('telefono') as string;
    const experiencia = formData.get('experiencia') as string;
    const disponibilidad = formData.getAll('disponibilidad') as string[];
    const presentacion = formData.get('presentacion') as string;
    const cv = formData.get('cv') as File;

    // Preparar datos del candidato
    const candidate = {
      name: nombre,
      email,
      phone: telefono
    };

    // Formatear datos
    const disponibilidadTexto = disponibilidad.map(d => {
      switch(d) {
        case 'mañanas': return 'Mañanas (8:00 - 14:00)';
        case 'tardes': return 'Tardes (14:00 - 20:00)';
        case 'fines-semana': return 'Fines de semana';
        case 'flexible': return 'Horario flexible';
        default: return d;
      }
    }).join(', ');

    const experienciaNumero = experiencia === '0' ? 0 :
                              experiencia === '1-2' ? 2 :
                              experiencia === '3-5' ? 4 :
                              experiencia === '5+' ? 6 : 0;

    const experienciaTexto = experiencia === '0' ? 'Sin experiencia' :
                            experiencia === '1-2' ? '1-2 años' :
                            experiencia === '3-5' ? '3-5 años' :
                            experiencia === '5+' ? '5+ años' : experiencia;

    // Preparar adjunto del CV
    let cvAttachment: { filename: string; content: Buffer } | undefined;
    if (cv) {
      const cvBuffer = await cv.arrayBuffer();
      cvAttachment = {
        filename: cv.name,
        content: Buffer.from(cvBuffer),
      };
    }

    // Generar templates
    const clientTemplate = createClientJobTemplate(candidate);

    const internalTemplate = createInternalJobTemplate(
      candidate,
      experienciaNumero,
      disponibilidadTexto,
      presentacion
    );

    // Enviar emails usando el servicio centralizado
    const results = await EmailService.sendMultiple([
      () => EmailService.sendJobApplicationToCandidate(candidate, clientTemplate),
      () => EmailService.sendJobApplicationInternal(candidate, experienciaTexto, internalTemplate, cvAttachment)
    ]);

    // Si falló el email al candidato, es error crítico
    if (results.failed > 0 && results.success === 0) {
      return NextResponse.json(
        { error: 'Error al enviar confirmación' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Candidatura enviada correctamente',
        emailsSent: results.success,
        emailsFailed: results.failed
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Error processing job application:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}