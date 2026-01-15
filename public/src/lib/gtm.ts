// Google Tag Manager utilities
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
  }
}

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-1082537176';

// Initialize dataLayer
export const initializeDataLayer = () => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
  }
};

// Track conversion events
export const trackConversion = (
  eventName: string,
  parameters: {
    event_category?: string;
    event_label?: string;
    value?: number;
    currency?: string;
    transaction_id?: string;
    form_type?: string;
    service_type?: string;
    phone_number?: string;
    [key: string]: unknown;
  } = {}
) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...parameters,
      timestamp: new Date().toISOString()
    });

    // También enviar a Google Analytics si está configurado
    if (window.gtag) {
      window.gtag('event', eventName, parameters);
    }

    console.log('🏷️ GTM Event tracked:', eventName, parameters);
  }
};

// Eventos específicos de conversión
export const trackFormSubmission = (formType: 'contact' | 'quote') => {
  trackConversion('form_submission', {
    event_category: 'engagement',
    event_label: formType,
    form_type: formType,
    value: formType === 'quote' ? 50 : 25,
    currency: 'EUR'
  });
};

export const trackQuoteGeneration = (quoteData: {
  total: number;
  services: string[];
  clientName: string;
  refNumber: string;
}) => {
  trackConversion('quote_generated', {
    event_category: 'conversion',
    event_label: 'quote_request',
    value: quoteData.total,
    currency: 'EUR',
    transaction_id: quoteData.refNumber,
    service_type: quoteData.services.join(','),
    custom_parameters: {
      quote_value: quoteData.total,
      service_count: quoteData.services.length
    }
  });
};

export const trackWhatsAppContact = (source: string, phoneNumber: string = '+34611710243') => {
  trackConversion('whatsapp_contact', {
    event_category: 'engagement',
    event_label: 'whatsapp_click',
    phone_number: phoneNumber,
    source: source,
    value: 10,
    currency: 'EUR'
  });
};

export const trackPhoneCall = (phoneNumber: string = '+34611710243') => {
  trackConversion('phone_call', {
    event_category: 'engagement',
    event_label: 'phone_click',
    phone_number: phoneNumber,
    value: 1.2,
    currency: 'EUR'
  });
};