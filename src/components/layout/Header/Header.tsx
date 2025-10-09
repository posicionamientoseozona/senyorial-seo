"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import ChatBot from "@/components/ChatBot/ChatBot";
import { Bot } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showChatTooltip, setShowChatTooltip] = useState(false);
  const hasChatBeenOpened = useRef(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Cuando el chat se abre, lo registramos para no volver a mostrar el tooltip.
  useEffect(() => {
    if (isChatOpen) {
      hasChatBeenOpened.current = true;
      // Si el tooltip está visible cuando se abre el chat, lo ocultamos.
      if (showChatTooltip) {
        setShowChatTooltip(false);
      }
    }
  }, [isChatOpen, showChatTooltip]);

  // Temporizador para mostrar el tooltip después de 20 segundos.
  useEffect(() => {
    const showTimer = setTimeout(() => {
      if (!hasChatBeenOpened.current) {
        setShowChatTooltip(true);
        setTimeout(() => {
          setShowChatTooltip(false);
        }, 3000);
      }
    }, 20000);

    return () => clearTimeout(showTimer);
  }, []);


  const navigationItems = [
    { href: "/servicios", label: "Servicios" },
    { href: "/empleo", label: "Empleo" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <nav className={styles.nav}>
            {/* Logo */}
            <Link href="/" className={styles.logo}>
              <Image
                src="/images/logoSenyorial/s-f1-clean.png"
                alt="Senyorial - Empresa de Limpieza"
                width={100}
                height={50}
                priority
                sizes="100px"
                style={{ objectFit: 'contain', width: 'auto', height: '50px' }}
              />
            </Link>

            {/* Navegación Desktop */}
            <div className={styles.navItems}>
              <div className={styles.chatButtonContainer}> {/* Wrapper for positioning */}
                <button onClick={() => setIsChatOpen(true)} className={styles.chatNavButton} aria-label="Abrir chat">
                  <Bot size={20} />
                </button>
                {showChatTooltip && (
                  <div className={styles.chatTooltip}>
                    Si necesitas ayuda, estoy aqui.
                  </div>
                )}
              </div>
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={styles.navLink}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/presupuestar"
                className={`btn1-small`}
              >
                Presupuestar
              </Link>
            </div>

            {/* Botón de menú móvil */}
            <button
              className={styles.menuToggle}
              onClick={toggleMenu}
              aria-label="Abrir menú"
              aria-expanded={isMenuOpen}
            >
              <span className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerOpen : ""}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </nav>

          {/* Menú móvil */}
          <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}>
            <div className={styles.mobileMenuHeader}>
              <Link href="/" className={styles.mobileLogo} onClick={() => setIsMenuOpen(false)}>
                <Image
                  src="/images/logoSenyorial/s-f1-clean.png"
                  alt="Senyorial - Empresa de Limpieza"
                  width={100}
                  height={50}
                  priority
                  sizes="100px"
                  style={{ objectFit: 'contain', width: 'auto', height: '50px' }}
                />
              </Link>
            </div>
            <div className={styles.mobileMenuContent}>
              <button onClick={() => { setIsChatOpen(true); setIsMenuOpen(false); }} className={styles.chatNavButtonMobile} aria-label="Abrir chat">
                <Bot size={20} />
                <span>Chat de Ayuda</span>
              </button>
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={styles.mobileNavLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/presupuestar"
                className={`btn1`}
                onClick={() => setIsMenuOpen(false)}
              >
                Presupuestar
              </Link>

              <div className={styles.mobileContactInfo}>
                <div className={styles.workingHours}>
                  <p>Horario de atención:</p>
                  <p><strong>L-V:</strong> 9:00 - 21:00</p>
                  <p><strong>S-D:</strong> Consultar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}