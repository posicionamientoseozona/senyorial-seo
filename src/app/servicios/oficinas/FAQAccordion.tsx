"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./oficinas.module.css";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className={styles.faqAccordion}>
      {faqs.map((faq, index) => (
        <div key={index} className={styles.faqItem}>
          <button
            className={styles.faqQuestion}
            onClick={() => toggleFAQ(index)}
            aria-expanded={openFAQ === index}
          >
            <span>{faq.question}</span>
            <ChevronDown
              size={20}
              className={`${styles.faqIcon} ${openFAQ === index ? styles.open : ''}`}
            />
          </button>
          <div className={`${styles.faqAnswer} ${openFAQ === index ? styles.open : ''}`}>
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}