import { ReactNode } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import styles from "./Layout.module.css";
import CookieBanner from "@/components/ui/CookieBanner/CookieBanner";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export default function Layout({ children, className = "" }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={`${styles.main} ${className}`}>
        {children}
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}