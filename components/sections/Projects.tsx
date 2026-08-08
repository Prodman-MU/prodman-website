import { whatsappUrl } from "@/lib/content";
import styles from "./ComingSoon.module.css";

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <p className="section__label">Our Projects</p>
        <h2 className="section__heading">Break Down the Product World.</h2>
        <p className="section__lede">
          The wall of real, shipped work — built by ProdMan members, from first problem statement to
          working product.
        </p>

        <div className={styles.panel}>
          <span className={`tag ${styles.badge}`}>Coming Soon</span>
          <p>
            Our first cohort&rsquo;s projects are in progress — this section fills up as teams ship. Want
            yours featured here first?
          </p>
          <a className="cta cta--ghost" href={whatsappUrl}>
            Get Involved &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
