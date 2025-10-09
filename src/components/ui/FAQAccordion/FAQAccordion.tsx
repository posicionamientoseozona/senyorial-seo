"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
  className?: string;
}

export default function FAQAccordion({ faqs, className }: FAQAccordionProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className={className || ''}>
      {faqs.map((faq, index) => (
        <div
          key={index}
          style={{
            marginBottom: 'var(--space-md)',
            backgroundColor: 'var(--color-white)',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow)',
            overflow: 'hidden',
            transition: 'all 0.3s ease'
          }}
        >
          <button
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 'var(--space-lg)',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              width: '100%',
              textAlign: 'left',
              fontSize: '1.1rem',
              fontWeight: '600',
              color: 'var(--color-primary)',
              transition: 'all 0.3s ease'
            }}
            onClick={() => toggleFAQ(index)}
            aria-expanded={openFAQ === index}
          >
            <span>{faq.question}</span>
            <ChevronDown
              size={20}
              style={{
                transition: 'transform 0.3s ease',
                color: 'var(--color-secondary)',
                transform: openFAQ === index ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </button>
          <div
            style={{
              maxHeight: openFAQ === index ? '200px' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.3s ease, padding 0.3s ease',
              padding: openFAQ === index ? '0 var(--space-lg) var(--space-lg) var(--space-lg)' : '0'
            }}
          >
            <p style={{
              margin: '0',
              lineHeight: '1.6',
              color: 'var(--color-text)'
            }}>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}