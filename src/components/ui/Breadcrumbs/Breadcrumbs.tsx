import Link from "next/link";
import { ChevronRight } from "lucide-react";
import styles from "./Breadcrumbs.module.css";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      ...(item.href && { "item": `https://senyorial.es${item.href}` })
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <nav aria-label="Breadcrumb" className={`${styles.breadcrumbs} ${className}`}>
        <ol className={styles.breadcrumbList}>
          {items.map((item, index) => (
            <li key={index} className={styles.breadcrumbItem}>
              {item.href ? (
                <Link
                  href={item.href}
                  className={styles.breadcrumbLink}
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              ) : (
                <span className={styles.breadcrumbCurrent} aria-current="page">
                  {item.label}
                </span>
              )}
              {index < items.length - 1 && (
                <ChevronRight
                  size={14}
                  className={styles.breadcrumbSeparator}
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}