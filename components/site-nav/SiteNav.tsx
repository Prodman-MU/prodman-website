import { siteNav, whatsappUrl } from "@/lib/content";
import styles from "./SiteNav.module.css";

export function SiteNav() {
  return (
    <nav className={styles.nav} aria-label="Section navigation">
      <a className={styles.wordmark} href="#hero">
        PROD/MAN
      </a>
      <ul className={styles.links}>
        {siteNav.map((item) => (
          <li key={item.href}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
      <a className={`cta cta--acid ${styles.join}`} href={whatsappUrl}>
        Join
      </a>
    </nav>
  );
}
