'use client';

import { User } from 'lucide-react';
import Image from 'next/image';
import styles from './ChatBot.module.css';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const timestamp = message.timestamp.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Simple markdown-like parsing for basic formatting
  const formatContent = (content: string) => {
    // Convert full URLs to clickable links - allow dots within URLs but stop at sentence-ending punctuation followed by space
    content = content.replace(/(https?:\/\/[^\s]+?)(?=\s|$)/g, (match, url) => {
      // Remove trailing punctuation if followed by space or end of string
      const cleanUrl = url.replace(/[.,;!?]+$/, '');
      return `<a href="${cleanUrl}" target="_blank">${cleanUrl}</a>`;
    });

    // Convert internal links (e.g., /servicios) to clickable links. It looks for a slash
    // followed by at least two word characters to avoid matching things like '/h' in prices.
    content = content.replace(/(\s|^)(\/[\w-]{2,}(?:\/[\w-]+)*)/g, '$1<a href="$2" target="_blank">$2</a>');

    // Convert phone numbers to links
    content = content.replace(/(\+34\s?6\d{2}\s?\d{2}\s?\d{2}\s?\d{2})/g, '<a href="tel:$1">$1</a>');

    // Convert email addresses to links
    content = content.replace(/([\w.-]+@[\w.-]+\.\w+)/g, '<a href="mailto:$1">$1</a>');

    // Convert **bold** to <strong> (after links to avoid conflicts)
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Convert *italic* to <em>
    content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Convert line breaks to <br>
    content = content.replace(/\n/g, '<br>');

    return content;
  };

  return (
    <div className={`${styles.message} ${isUser ? styles.userMessage : styles.assistantMessage}`}>
      <div className={styles.messageIcon}>
        {isUser ? (
          <User size={16} />
        ) : (
          <Image
            src="/images/logoSenyorial/Limpius-Profile-Pic.png"
            alt="Limpius, asistente virtual"
            width={32}
            height={32}
            className={styles.botIcon}
          />
        )}
      </div>

      <div className={styles.messageContent}>
        <div
          className={styles.messageText}
          dangerouslySetInnerHTML={{ __html: formatContent(message.content) }}
        />
        <span className={styles.messageTime}>{timestamp}</span>
      </div>
    </div>
  );
}