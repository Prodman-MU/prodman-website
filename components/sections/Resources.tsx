import { whatsappUrl } from "@/lib/content";
import styles from "./ComingSoon.module.css";

export function Resources() {
  return (
    <section id="resources" className="section">
      <div className="container">
        <p className="section__label">Resources</p>
        <h2 className="section__heading">Resources &amp; Libraries</h2>
        <p className="section__lede">
          Articles, frameworks, templates, and past event decks — the shelf of things worth knowing in
          the product world.
        </p>

        <div className={styles.panel}>
          <span className={`tag ${styles.badge}`}>Coming Soon</span>
          <p>
            We&rsquo;re curating the club&rsquo;s first set of resources. In the meantime, join the
            WhatsApp community — that&rsquo;s where new finds get shared first.
          </p>
          <a className="cta cta--ghost" href={whatsappUrl}>
            Join the Community &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
