import styles from "./MapSection.module.css";
import LazyMap from "../LazyMap/LazyMap";

export default function MapSection() {
  return (
    <section className={styles.mapSection}>
      <div className="container">
        <div className={styles.mapContent}>
          <div className={styles.mapInfo}>
            <h2 className={styles.title}>Zona de Servicio en Palma de Mallorca</h2>
            <p className={styles.description}>
              Nuestra zona de servicio abarca el <strong>centro de Palma de Mallorca</strong> y sus alrededores, incluyendo áreas con alta actividad residencial, 
              comercial y turística.
            </p>
            <div className={styles.serviceArea}>
              <span className={styles.serviceLabel}>Área de servicio:</span>
              <ul>
                <li>Palma de Mallorca y alrededores</li>
              </ul>
            </div>
          </div>
          <div className={styles.mapContainer}>
            <LazyMap
              src="https://maps.google.com/maps?q=senyorial.es&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
              title="Mapa de ubicación - Senyorial"
              width={500}
              height={400}
              className={styles.map}
            />
          </div>
        </div>
      </div>
    </section>
  );
}