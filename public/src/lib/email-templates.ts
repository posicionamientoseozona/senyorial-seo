// Configuración de estilos centralizados
const STYLES = {
  colors: {
    primary: '#005b8d',
    secondary: '#03b4c6',
    white: '#ffffff',
    lightGray: '#f8f9fa',
    darkGray: '#343a40'
  },
  fonts: {
    family: "'Montserrat', Arial, sans-serif",
    sizes: {
      title: '24px',
      subtitle: '18px',
      heading: '16px',
      body: '14px',
      small: '12px'
    }
  },
  spacing: {
    section: '30px',
    element: '20px',
    small: '10px'
  }
} as const;

// Interfaces para datos
export interface ClientData {
  name: string;
  email: string;
  phone: string;
  address?: string;
}

export interface ServiceData {
  name: string;
  frequency: string;
  quantity: number;
  tariff: string;
}

// Componente base del template
function createBaseTemplate(content: string, title: string): string {
  return `
    <div style="font-family: ${STYLES.fonts.family}; max-width: 600px; margin: 0 auto; background-color: ${STYLES.colors.white};">
      <!-- Header -->
      <div style="background-color: ${STYLES.colors.primary}; color: ${STYLES.colors.white}; padding: ${STYLES.spacing.element}; text-align: center;">
        <h1 style="margin: 0; font-size: ${STYLES.fonts.sizes.title}; font-weight: 600;">${title}</h1>
        <p style="margin: 5px 0 0 0; color: ${STYLES.colors.white};">Senyorial - Servicios de Limpieza</p>
      </div>

      <!-- Content -->
      <div style="padding: ${STYLES.spacing.section}; background-color: ${STYLES.colors.white};">
        ${content}
      </div>

      <!-- Footer -->
      <div style="background-color: ${STYLES.colors.primary}; color: ${STYLES.colors.white}; padding: ${STYLES.spacing.element}; text-align: center;">
        <p style="margin: 0; font-size: ${STYLES.fonts.sizes.body}; color: ${STYLES.colors.white};">
          ¡Gracias por confiar en Senyorial!<br>
          Tu satisfacción es nuestra prioridad
        </p>
      </div>
    </div>
  `;
}

// Componente de información de contacto
function createContactInfo(): string {
  return `
    <p style="line-height: 1.6; color: ${STYLES.colors.primary};">
      Si necesitas contactarnos:
    </p>
    <p style="line-height: 1.6; color: ${STYLES.colors.primary};">
      Email: <a href="mailto:reservas@senyorial.es" style="color: ${STYLES.colors.secondary}; text-decoration: none;">reservas@senyorial.es</a><br>
      Teléfono: <a href="tel:+34611710243" style="color: ${STYLES.colors.secondary}; text-decoration: none;">+34 611 71 02 43</a><br>
      WhatsApp: <a href="https://wa.me/34611710243" style="color: ${STYLES.colors.secondary}; text-decoration: none;">+34 611 71 02 43</a>
    </p>
  `;
}

// Componente de caja informativa
function createInfoBox(title: string, content: string, highlight = false): string {
  const backgroundColor = highlight ? STYLES.colors.secondary : STYLES.colors.white;
  const borderColor = STYLES.colors.secondary;
  const textColor = highlight ? STYLES.colors.white : STYLES.colors.primary;

  return `
    <div style="background-color: ${backgroundColor}; padding: ${STYLES.spacing.element}; border-radius: 8px; border: 2px solid ${borderColor}; margin: ${STYLES.spacing.element} 0;">
      <h3 style="color: ${textColor}; margin-top: 0; font-weight: 600;">${title}</h3>
      <div style="color: ${textColor};">
        ${content}
      </div>
    </div>
  `;
}

// Template para presupuesto al cliente
export function createClientQuoteTemplate(
  client: ClientData,
  refNumber: string,
  services: ServiceData[],
  additionalNotes?: string,
  includeContract: boolean = false
): string {
  const servicesText = services.map(service => {
    const frequencyLabels: { [key: string]: string } = {
      'semanal': 'Cada 7 días',
      'quincenal': 'Cada 14 días',
      'mensual': 'Cada 28 días',
      'unica': 'Una vez'
    };
    const frequencyDisplay = frequencyLabels[service.frequency] || service.frequency;
    const tariffDisplay = service.tariff === 'premium' ? 'Premium (con productos)' : 'Básica (sin productos)';

    return `• ${service.name} - ${service.quantity}h - ${frequencyDisplay} - Tarifa ${tariffDisplay}`;
  }).join('\n');

  const content = `
    <div style="background-color: ${STYLES.colors.white}; padding: 25px; border-radius: 8px;">
      <h2 style="color: ${STYLES.colors.primary}; margin-top: 0; font-weight: 600;">Hola ${client.name},</h2>

      <p style="line-height: 1.6; color: ${STYLES.colors.primary};">
        Gracias por solicitar un presupuesto con Senyorial. Hemos preparado una propuesta
        personalizada para tus necesidades de limpieza. Encontrarás todos los detalles en ${includeContract ? 'los PDFs adjuntos (presupuesto y contrato)' : 'el PDF adjunto'}.
      </p>

      ${createInfoBox(
        'Resumen de tu solicitud:',
        `
          <p style="margin: 8px 0;"><strong>Referencia:</strong> ${refNumber}</p>
          <p style="margin: 8px 0;"><strong>Servicios solicitados:</strong></p>
          <pre style="margin: 10px 0; font-family: ${STYLES.fonts.family}; font-size: ${STYLES.fonts.sizes.body}; white-space: pre-wrap;">${servicesText}</pre>
          ${additionalNotes ? `
            <p style="margin: 8px 0;"><strong>Notas adicionales:</strong></p>
            <div style="background-color: ${STYLES.colors.lightGray}; padding: 10px; border-radius: 4px; margin-top: 5px;">
              <p style="margin: 0; font-style: italic;">"${additionalNotes}"</p>
            </div>
          ` : ''}
        `
      )}

      ${createInfoBox(
        '¿Qué sigue ahora?',
        `
          <ul style="margin: 0; line-height: 1.6;">
            <li>Revisa ${includeContract ? 'tu presupuesto y contrato en los PDFs adjuntos' : 'tu presupuesto detallado en el PDF adjunto'}</li>
            <li>Si tienes dudas, contáctanos - estaremos encantados de ayudarte</li>
            <li>Para contratar el servicio, simplemente responde a este email</li>
            <li>¡Prepararemos todo para que disfrutes de un espacio impecable!</li>
          </ul>
        `,
        true
      )}

      ${createContactInfo()}
    </div>
  `;

  return createBaseTemplate(content, '¡Tu Presupuesto está Listo!');
}

// Template interno para presupuesto (versión simple anti-spam)
export function createInternalQuoteTemplate(
  client: ClientData,
  refNumber: string,
  services: ServiceData[],
  total: number,
  additionalNotes?: string,
  photosCount = 0,
  includeContract: boolean = false
): string {
  const servicesText = services.map(service => {
    const frequencyLabels: { [key: string]: string } = {
      'semanal': 'Cada 7 días',
      'quincenal': 'Cada 14 días',
      'mensual': 'Cada 28 días',
      'unica': 'Una vez'
    };
    const frequencyDisplay = frequencyLabels[service.frequency] || service.frequency;
    const tariffDisplay = service.tariff === 'premium' ? 'Premium (con productos)' : 'Básica (sin productos)';

    return `• ${service.name} - ${service.quantity}h - ${frequencyDisplay} - Tarifa ${tariffDisplay}`;
  }).join('\n');

  const content = `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h3>Solicitud: ${client.name} - ${refNumber}</h3>
      <p><strong>Email:</strong> ${client.email}</p>
      <p><strong>Teléfono:</strong> ${client.phone}</p>
      ${client.address ? `<p><strong>Dirección:</strong> ${client.address}</p>` : ''}
      <p><strong>Servicios:</strong><br>${servicesText}</p>
      <p><strong>Importe: ${total.toFixed(2)}€</strong></p>
      ${includeContract ? '<p><strong>Solicita:</strong> Presupuesto + Contrato</p>' : '<p><strong>Solicita:</strong> Solo presupuesto</p>'}
      ${additionalNotes ? `<p><strong>Notas:</strong><br>${additionalNotes}</p>` : ''}
      ${photosCount > 0 ? `<p><strong>Fotos:</strong> ${photosCount}</p>` : ''}
      <hr>
      <p><em>Seguimiento necesario - ${new Date().toLocaleDateString('es-ES')}</em></p>
    </div>
  `;

  return content; // Sin wrapper complejo
}

// Template para contacto al cliente
export function createClientContactTemplate(
  client: ClientData,
  serviceType: string,
  frequency?: string,
  area?: string,
  message?: string
): string {
  const content = `
    <div style="background-color: ${STYLES.colors.white}; padding: 25px; border-radius: 8px;">
      <h2 style="color: ${STYLES.colors.primary}; margin-top: 0; font-weight: 600;">Hola ${client.name},</h2>

      <p style="line-height: 1.6; color: ${STYLES.colors.primary};">
        Gracias por contactar con Senyorial. Hemos recibido tu consulta y nos pondremos en contacto
        contigo lo antes posible para ofrecerte la mejor solución de limpieza.
      </p>

      ${createInfoBox(
        'Tu consulta:',
        `
          <p style="margin: 8px 0;"><strong>Servicio:</strong> ${serviceType || 'No especificado'}</p>
          ${frequency ? `<p style="margin: 8px 0;"><strong>Frecuencia:</strong> ${frequency}</p>` : ''}
          ${area ? `<p style="margin: 8px 0;"><strong>Zona:</strong> ${area}</p>` : ''}
          ${message ? `
            <p style="margin: 8px 0;"><strong>Mensaje:</strong></p>
            <div style="background-color: ${STYLES.colors.lightGray}; padding: 10px; border-radius: 4px; margin-top: 5px;">
              <p style="margin: 0; font-style: italic;">"${message}"</p>
            </div>
          ` : ''}
        `
      )}

      ${createInfoBox(
        '¿Qué sigue ahora?',
        `
          <ul style="margin: 0; line-height: 1.6;">
            <li>Te contactaremos en menos de 24 horas</li>
            <li>Evaluaremos tus necesidades específicas</li>
            <li>Te ofreceremos un presupuesto personalizado y gratuito</li>
            <li>Coordinaremos el mejor horario para ti</li>
          </ul>
        `,
        true
      )}

      <p style="line-height: 1.6; color: ${STYLES.colors.primary};">
        Si necesitas contactarnos urgentemente:
      </p>
      ${createContactInfo()}
    </div>
  `;

  return createBaseTemplate(content, '¡Consulta Recibida!');
}

// Template interno para contacto (versión simple anti-spam)
export function createInternalContactTemplate(
  client: ClientData,
  serviceType: string,
  frequency?: string,
  area?: string,
  message?: string
): string {
  const content = `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h3>Cliente: ${client.name}</h3>
      <p><strong>Email:</strong> ${client.email}</p>
      <p><strong>Teléfono:</strong> ${client.phone}</p>
      <p><strong>Servicio:</strong> ${serviceType || 'No especificado'}</p>
      ${frequency ? `<p><strong>Frecuencia:</strong> ${frequency}</p>` : ''}
      ${area ? `<p><strong>Zona:</strong> ${area}</p>` : ''}
      ${message ? `<p><strong>Mensaje:</strong><br>${message}</p>` : ''}
      <hr>
      <p><em>Contactar cliente en 24h - ${new Date().toLocaleDateString('es-ES')}</em></p>
    </div>
  `;

  return content; // Sin wrapper complejo
}

// Template para candidatura al cliente
export function createClientJobTemplate(candidate: ClientData, position?: string): string {
  const content = `
    <div style="background-color: ${STYLES.colors.white}; padding: 25px; border-radius: 8px;">
      <h2 style="color: ${STYLES.colors.primary}; margin-top: 0; font-weight: 600;">Hola ${candidate.name},</h2>

      <p style="line-height: 1.6; color: ${STYLES.colors.primary};">
        Gracias por tu interés en formar parte del equipo de Senyorial. Hemos recibido tu candidatura
        ${position ? `para el puesto de ${position}` : ''} y la revisaremos cuidadosamente.
      </p>

      ${createInfoBox(
        '¿Qué sigue ahora?',
        `
          <ul style="margin: 0; line-height: 1.6;">
            <li>Nuestro equipo de RRHH revisará tu CV</li>
            <li>Te contactaremos si tu perfil encaja con nuestras necesidades</li>
            <li>Mantendremos tu candidatura activa para futuras oportunidades</li>
            <li>¡Gracias por considerarnos como tu próximo destino laboral!</li>
          </ul>
        `,
        true
      )}

      <p style="line-height: 1.6; color: ${STYLES.colors.primary};">
        Si tienes preguntas sobre el proceso:
      </p>
      <p style="line-height: 1.6; color: ${STYLES.colors.primary};">
        Email: <a href="mailto:rrhh@senyorial.es" style="color: ${STYLES.colors.secondary}; text-decoration: none;">rrhh@senyorial.es</a><br>
        Teléfono: <a href="tel:+34611710243" style="color: ${STYLES.colors.secondary}; text-decoration: none;">+34 611 71 02 43</a>
      </p>
    </div>
  `;

  return createBaseTemplate(content, '¡Candidatura Recibida!');
}

// Template interno para candidatura (versión simple anti-spam)
export function createInternalJobTemplate(
  candidate: ClientData,
  experienceYears: number,
  availability: string,
  motivation?: string,
  position?: string
): string {
  const experienceText = experienceYears > 0 ? `${experienceYears} años` : 'Sin experiencia';

  const content = `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h3>Candidato: ${candidate.name}</h3>
      <p><strong>Email:</strong> ${candidate.email}</p>
      <p><strong>Teléfono:</strong> ${candidate.phone}</p>
      ${position ? `<p><strong>Puesto:</strong> ${position}</p>` : ''}
      <p><strong>Experiencia:</strong> ${experienceText}</p>
      <p><strong>Disponibilidad:</strong> ${availability}</p>
      ${motivation ? `<p><strong>Motivación:</strong><br>${motivation}</p>` : ''}
      <hr>
      <p><em>Revisar CV adjunto - ${new Date().toLocaleDateString('es-ES')}</em></p>
    </div>
  `;

  return content; // Sin wrapper complejo
}