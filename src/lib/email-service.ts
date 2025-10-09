import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Configuración centralizada
const EMAIL_CONFIG = {
  FROM: 'Reservas Senyorial <reservas@senyorial.es>',
  REPLY_TO: 'reservas@senyorial.es',
  INTERNAL_EMAIL: 'reservas@senyorial.es',
  RRHH_EMAIL: 'rrhh@senyorial.es'
} as const;

// Tipos base
export interface EmailAttachment {
  filename: string;
  content: Buffer;
}

export interface EmailOptions {
  to: string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string[];
  attachments?: EmailAttachment[];
}

export interface ClientData {
  name: string;
  email: string;
  phone: string;
  address?: string;
}

// Clase principal del servicio
export class EmailService {
  private static logEmail(type: string, to: string[], subject:string) {
    console.log(`📧 [${type}] Enviando email:`, {
      to,
      subject,
      timestamp: new Date().toISOString(),
      from: EMAIL_CONFIG.FROM,
    });
  }

  private static async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const { error } = await resend.emails.send({
        from: options.from || EMAIL_CONFIG.FROM,
        to: options.to,
        replyTo: options.replyTo || [EMAIL_CONFIG.REPLY_TO],
        subject: options.subject,
        html: options.html,
        attachments: options.attachments,
      });

      if (error) {
        console.error('❌ Error enviando email:', error);
        return false;
      }

      console.log('✅ Email enviado correctamente');
      return true;
    } catch (error) {
      console.error('❌ Error crítico enviando email:', error);
      return false;
    }
  }

  // Método genérico para enviar cualquier email
  static async send(options: EmailOptions): Promise<boolean> {
    this.logEmail('GENERIC', options.to, options.subject);
    return await this.sendEmail(options);
  }

  // Envío de presupuesto al cliente
  static async sendQuoteToClient(
    client: ClientData,
    refNumber: string,
    html: string,
    pdfAttachment?: EmailAttachment
  ): Promise<boolean> {
    const subject = `Tu presupuesto de limpieza - ${refNumber}`;
    this.logEmail('CLIENT_QUOTE', [client.email], subject);

    return await this.sendEmail({
      to: [client.email],
      subject,
      html,
      attachments: pdfAttachment ? [pdfAttachment] : undefined,
    });
  }

  // Envío interno de presupuesto
  static async sendQuoteInternal(
    client: ClientData,
    refNumber: string,
    html: string,
    pdfAttachment?: EmailAttachment
  ): Promise<boolean> {
    const subject = `NUEVO: Presupuesto - ${client.name} (${refNumber})`;
    this.logEmail('INTERNAL_QUOTE', [EMAIL_CONFIG.INTERNAL_EMAIL], subject);

    return await this.sendEmail({
      from: 'Sistema Senyorial <sistema@senyorial.es>',
      to: [EMAIL_CONFIG.INTERNAL_EMAIL],
      replyTo: [client.email],
      subject,
      html,
      attachments: pdfAttachment ? [pdfAttachment] : undefined,
    });
  }

  // Envío de contacto al cliente
  static async sendContactToClient(
    client: ClientData,
    html: string
  ): Promise<boolean> {
    const subject = 'Confirmación de consulta recibida - Senyorial';
    this.logEmail('CLIENT_CONTACT', [client.email], subject);

    return await this.sendEmail({
      to: [client.email],
      subject,
      html,
    });
  }

  // Envío interno de contacto
  static async sendContactInternal(
    client: ClientData,
    serviceType: string,
    html: string
  ): Promise<boolean> {
    const subject = `NUEVA: Consulta - ${client.name} (${serviceType})`;
    this.logEmail('INTERNAL_CONTACT', [EMAIL_CONFIG.INTERNAL_EMAIL], subject);

    return await this.sendEmail({
      from: 'Sistema Senyorial <sistema@senyorial.es>',
      to: [EMAIL_CONFIG.INTERNAL_EMAIL],
      replyTo: [client.email],
      subject,
      html,
    });
  }

  // Envío de candidatura al solicitante
  static async sendJobApplicationToCandidate(
    candidate: ClientData,
    html: string
  ): Promise<boolean> {
    const subject = 'Confirmación de candidatura recibida - Senyorial';
    this.logEmail('CLIENT_JOB', [candidate.email], subject);

    return await this.sendEmail({
      to: [candidate.email],
      subject,
      html,
    });
  }

  // Envío interno de candidatura
  static async sendJobApplicationInternal(
    candidate: ClientData,
    experienceText: string,
    html: string,
    cvAttachment?: EmailAttachment
  ): Promise<boolean> {
    const subject = `NUEVA: Candidatura - ${candidate.name} (${experienceText})`;
    this.logEmail('INTERNAL_JOB', [EMAIL_CONFIG.RRHH_EMAIL], subject);

    return await this.sendEmail({
      from: 'Sistema Senyorial <sistema@senyorial.es>',
      to: [EMAIL_CONFIG.RRHH_EMAIL],
      replyTo: [candidate.email],
      subject,
      html,
      attachments: cvAttachment ? [cvAttachment] : undefined,
    });
  }

  // Método para enviar múltiples emails con manejo de errores
  static async sendMultiple(
    emailFunctions: Array<() => Promise<boolean>>,
    failOnError = false
  ): Promise<{ success: number; failed: number; total: number }> {
    const results = await Promise.allSettled(emailFunctions.map(fn => fn()));

    const success = results.filter(r => r.status === 'fulfilled' && r.value === true).length;
    const failed = results.length - success;

    console.log(`📊 Resumen envío emails: ${success}/${results.length} exitosos`);

    if (failOnError && failed > 0) {
      throw new Error(`Failed to send ${failed} emails`);
    }

    return { success, failed, total: results.length };
  }
}