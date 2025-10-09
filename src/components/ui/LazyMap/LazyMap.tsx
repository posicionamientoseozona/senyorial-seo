'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './LazyMap.module.css';

interface LazyMapProps {
  src: string;
  title: string;
  width: number;
  height: number;
  className?: string;
}

export default function LazyMap({ src, title, width, height, className }: LazyMapProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      ref={mapRef}
      className={`${styles.mapContainer} ${className || ''}`}
      style={{ width, height }}
    >
      {!isInView ? (
        <div className={styles.placeholder}>
          <div className={styles.placeholderContent}>
            <div className={styles.mapIcon}>📍</div>
            <p>Cargando mapa...</p>
          </div>
        </div>
      ) : (
        <>
          {!isLoaded && (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
            </div>
          )}
          <iframe
            width={width}
            height={height}
            src={src}
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            title={title}
            onLoad={handleLoad}
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }}
          />
        </>
      )}
    </div>
  );
}