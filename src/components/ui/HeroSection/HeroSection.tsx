import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={`${styles.hero} hero-lcp`}>
      <div className="container">
        <div className={styles.heroContent}>
          <h1 className={styles.tagline}>Tu Empresa de Limpieza en Palma de Mallorca</h1>

          <p className={styles.title}>
            Encuentra la solución de limpieza ideal para tu empresa
          </p>

          <p className={styles.subtitle}>
            Obtén un presupuesto personalizado en menos de 2 minutos.
          </p>
        </div>
      </div>
    </section>
  );
}