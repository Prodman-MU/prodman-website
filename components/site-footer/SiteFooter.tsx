import Image from "next/image";
import { siteNav, whatsappUrl } from "@/lib/content";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <h2>Build what should exist.</h2>
          <p>
            ProdMan Club is where curious minds become confident product builders — for the ones working
            at the intersection of Product, Technology, and AI.
          </p>
          <a className="cta cta--acid" href={whatsappUrl}>
            Join the WhatsApp Community &rarr;
          </a>
        </div>

        <div className={styles.columns}>
          <div className={styles.column}>
            <h3>Site</h3>
            <ul>
              {siteNav.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.column}>
            <h3>Connect</h3>
            <ul>
              <li>
                <a href={whatsappUrl}>WhatsApp Community</a>
              </li>
              <li>
                <a href="#community">Newsletter</a>
              </li>
              <li>
                <a href="https://www.mastersunion.org" target="_blank" rel="noreferrer">
                  Masters&rsquo; Union
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>&copy; {new Date().getFullYear()} ProdMan Club, Masters&rsquo; Union.</span>
        <span className={styles.muLine}>
          <Image src="/brand/masters-union-logo-white.png" alt="" width={23} height={12} className={styles.muLogo} />
          A Masters&rsquo; Union Club &middot; Gurugram
        </span>
      </div>
    </footer>
  );
}
