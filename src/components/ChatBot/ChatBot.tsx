"use client";

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { X, Send, Phone, FileText, Briefcase, Lightbulb, Sparkles, Brain } from 'lucide-react';
import styles from './ChatBot.module.css';
import ChatMessage from './ChatMessage';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface SuggestedAction {
  label: string;
  action: () => void;
  icon?: React.ReactNode;
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatBot({ isOpen, onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const [hasUsedInitialActions, setHasUsedInitialActions] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const statusMessages = [
    "En línea",
    "Atendiendo a clientes...",
    "Ajustando horarios...",
    "Organizando limpiezas...",
    "Creando plan de limpieza...",
    "Preparando presupuestos...",
    "Compartiendo enlaces... "
  ];

  const getStatusClassName = (index: number) => {
    const statusClasses = [
      styles.statusOnline,    // En línea
      styles.statusBusy,      // Ayudando a clientes
      styles.statusWorking,   // Ajustando horarios
      styles.statusWorking,   // Organizando limpiezas
      styles.statusCreating,  // Creando plan de limpieza
      styles.statusPreparing, // Preparando presupuestos
      styles.statusSending    // Enviando enlace al Portal de Clientes
    ];
    return `${styles.status} ${statusClasses[index] || styles.status}`;
  };
  const inputRef = useRef<HTMLInputElement>(null);

  const initialActions: SuggestedAction[] = [
    {
      label: 'Ver servicios',
      action: () => handleSuggestedMessage('¿Qué servicios de limpieza ofrecen?'),
      icon: <Sparkles size={14} />,
    },
    {
      label: 'Precios',
      action: () => handleSuggestedMessage('¿Cuáles son sus precios?'),
      icon: <FileText size={14} />,
    },
    {
      label: 'Empleo',
      action: () => handleSuggestedMessage('¿Están buscando personal?'),
      icon: <Briefcase size={14} />,
    },
    {
      label: 'Consejos',
      action: () => handleSuggestedMessage('¿Pueden darme consejos de limpieza?'),
      icon: <Lightbulb size={14} />,
    },
  ];

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      });
    });
  };

  useEffect(() => {
    if (isOpen && !hasShownWelcome) {
      setMessages([{
        id: 'welcome',
        content: '¡Hola! Soy Limpius, el asistente virtual de Senyorial. ¿En qué puedo ayudarte hoy?  ',
        role: 'assistant',
        timestamp: new Date(),
      }]);
      setHasShownWelcome(true);
    }
  }, [isOpen, hasShownWelcome]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      // Scroll al final cuando se abre el chat
      setTimeout(() => {
        scrollToBottom();
      }, 100);

      // Solo hacer focus en desktop, no en móvil para evitar abrir el teclado
      if (inputRef.current && window.innerWidth > 768) {
        inputRef.current.focus();
      }
    }
  }, [isOpen]);

  // Rota los estados. El estado "En línea" (0) se muestra durante 30 segundos,
  // mientras que los otros estados tienen una duración aleatoria de 3 a 40 segundos.
  useEffect(() => {
    // Define la duración para el estado actual.
    const delay = currentStatus === 0 ? 30000 : Math.random() * (40000 - 3000) + 3000;

    const timeoutId = setTimeout(() => {
      // Cambia al siguiente estado después del 'delay'.
      setCurrentStatus(prev => (prev + 1) % statusMessages.length);
    }, delay);

    // Limpia el timeout si el componente se desmonta o el estado cambia.
    return () => clearTimeout(timeoutId);
  }, [currentStatus, statusMessages.length]);

  const handleSuggestedMessage = (message: string) => {
    setHasUsedInitialActions(true);
    setInput(message);
    handleSubmit(undefined, message);
  };

  const handleSubmit = async (e?: React.FormEvent, suggestedMessage?: string) => {
    if (e) e.preventDefault();

    const messageToSend = suggestedMessage || input.trim();
    if (!messageToSend || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageToSend,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setHasUsedInitialActions(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageToSend,
          conversation: messages.map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Error: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: unknown) {
      console.error('Chat error:', error);

      let errorMessage = 'Lo siento, ha ocurrido un error. ';

      const errorWithMessage = error as { message?: string };
      if (errorWithMessage.message?.includes('429') || errorWithMessage.message?.includes('Rate limit')) {
        errorMessage += 'Has alcanzado el límite de mensajes por hora. Por favor, inténtalo más tarde o contacta directamente al +34 611 71 02 43.';
      } else if (errorWithMessage.message?.includes('503')) {
        errorMessage += 'El servicio está temporalmente no disponible. Por favor, contacta directamente al +34 611 71 02 43.';
      } else {
        errorMessage += 'Por favor, inténtalo de nuevo o contacta directamente al +34 611 71 02 43.';
      }

      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: errorMessage,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const hasMessages = messages.length > 0;

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.chatModal}>
      <div className={styles.chatHeader}>
        <div className={styles.headerInfo}>
          <Image
            src="/images/logoSenyorial/Limpius-Profile-Pic.png"
            alt="Limpius, asistente virtual"
            width={40}
            height={40}
            className={styles.headerAvatar}
          />
          <div>
            <h3>Limpius</h3>
            <span className={getStatusClassName(currentStatus)}>{statusMessages[currentStatus]}</span>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button
            onClick={() => window.open('/presupuestar', '_blank')}
            className={styles.headerActionButton}
            aria-label="Solicitar presupuesto"
          >
            <FileText size={18} />
          </button>
          <button
            onClick={() => window.open('https://wa.me/34611710243', '_blank')}
            className={styles.headerActionButton}
            aria-label="WhatsApp"
          >
            <Phone size={18} />
          </button>
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Cerrar chat"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className={styles.chatBody}>
        <div className={styles.messagesContainer}>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {isLoading && (
            <div className={styles.loadingMessage}>
              <Brain className={styles.spinner} size={16} />
              <span>Pensando...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {hasMessages && !hasUsedInitialActions && !isLoading && (
          <div className={styles.suggestedActions}>
            <p className={styles.suggestedTitle}>¿En qué puedo ayudarte?</p>
            <div className={styles.actionButtons}>
              {initialActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className={styles.actionButton}
                >
                  {action.icon}
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      <form onSubmit={handleSubmit} className={styles.chatFooter}>
        <div className={styles.inputContainer}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu pregunta..."
            className={styles.messageInput}
            disabled={isLoading}
            maxLength={500}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={styles.sendButton}
            aria-label="Enviar mensaje"
          >
            <Send size={18} />
          </button>
        </div>
        <p className={styles.disclaimer}>
          Respuestas generadas por IA, pueden contener errores.<br></br> Para consultas más específicas, contacta al{' '}
          <a href="https://wa.me/34611710243" target="_blank" rel="noopener noreferrer">+34 611 71 02 43</a>
        </p>
      </form>
    </div>
  );
}
