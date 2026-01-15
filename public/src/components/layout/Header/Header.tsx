"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import ChatBot from "@/components/ChatBot/ChatBot";
import { Bot, ChevronDown, Home, Building2, LampDesk, BedDouble, Grid3X3 } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showChatTooltip, setShowChatTooltip] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const hasChatBeenOpened = useRef(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleServicesMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setIsServicesDropdownOpen(true);
  };

  const handleServicesMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsServicesDropdownOpen(false);
    }, 300);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

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


  const servicesDropdownItems = [
    { href: "/servicios/limpieza-domestica", label: "Casas", icon: Home },
    { href: "/servicios/oficinas", label: "Oficinas", icon: LampDesk },
    { href: "/servicios/comunidades", label: "Comunidades", icon: Building2 },
    { href: "/servicios/hoteles", label: "Hoteles", icon: BedDouble },
    { href: "/servicios", label: "Todos los Servicios", icon: Grid3X3, separator: true },
  ];

  const navigationItems = [
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
              {/* Dropdown de Servicios */}
              <div
                className={styles.dropdownContainer}
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
              >
                <button
                  className={`${styles.navLink} ${styles.servicesButton}`}
                  aria-expanded={isServicesDropdownOpen}
                  aria-haspopup="true"
                  aria-label="Menú de servicios"
                >
                  Servicios de Limpieza
                  <ChevronDown
                    size={16}
                    className={`${styles.chevron} ${isServicesDropdownOpen ? styles.chevronOpen : ''}`}
                    aria-hidden="true"
                  />
                </button>

                {isServicesDropdownOpen && (
                  <div className={styles.dropdown}>
                    <div
                      className={styles.dropdownMenu}
                      role="menu"
                      aria-label="Servicios de limpieza"
                    >
                      {servicesDropdownItems.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                          <div key={item.href}>
                            {item.separator && <div className={styles.dropdownSeparator} />}
                            <Link
                              href={item.href}
                              className={`${styles.dropdownItem} ${index > 0 ? styles.withDelay : ''}`}
                              style={{ animationDelay: `${index * 50}ms` }}
                              role="menuitem"
                            >
                              <IconComponent size={18} className={styles.dropdownIcon} />
                              {item.label}
                            </Link>
                          </div>
                        );
                      })}
                    </div>
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
            </div>

            {/* Área de acciones - derecha */}
            <div className={styles.actionItems}>
              <div className={styles.chatButtonContainer}>
                <button onClick={() => setIsChatOpen(true)} className={styles.chatNavButton} aria-label="Abrir chat">
                  <Bot size={20} />
                  <span className={styles.chatButtonText}>Asistente IA</span>
                </button>
                {showChatTooltip && (
                  <div className={styles.chatTooltip}>
                    Si necesitas ayuda, estoy aquí.
                  </div>
                )}
              </div>
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

              {/* Servicios en móvil */}
              <div className={styles.mobileServicesSection}>
                <div className={styles.mobileServicesTitle}>Servicios</div>
                {servicesDropdownItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`${styles.mobileNavLink} ${styles.mobileServiceLink} ${item.separator ? styles.emphasized : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <IconComponent size={18} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>

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