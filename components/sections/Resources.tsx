import { resources, whatsappUrl } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import styles from "./Resources.module.css";

export function Resources() {
  return (
    <section id="resources" className="section">
      <div className="container">
        <Reveal amount={0.2}>
          <p className="section__label">Resources</p>
        </Reveal>
        <SplitHeading as="h2" className="section__heading" text="Resources &amp; Libraries" />
        <Reveal delay={0.1} amount={0.2}>
          <p className="section__lede">
            Articles, frameworks, templates, and past event decks — the shelf of things worth knowing in
            the product world.
          </p>
        </Reveal>

        <StaggerContainer staggerDelay={0.08} viewportAmount={0.15} className={styles.grid}>
          {resources.map((resource) => (
            <StaggerItem key={resource.id} variant="fadeUp" className={styles.cardWrap}>
              <div className={styles.card} data-cursor-text="Read">
                <div className={styles.cardHeader}>
                  <span className={styles.categoryTag}>{resource.category}</span>
                  {resource.date ? <span className={styles.date}>{resource.date}</span> : null}
                </div>
                <h3 className={styles.title}>{resource.title}</h3>
                <p className={styles.source}>{resource.source}</p>
                <p className={styles.description}>{resource.description}</p>
                <a
                  className={styles.link}
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-text="Open"
                >
                  Read article <span className={styles.linkArrow} aria-hidden="true">→</span>
                </a>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal delay={0.1} amount={0.2}>
          <div className={styles.card} style={{ marginTop: "clamp(2rem, 4vw, 3.5rem)", textAlign: "center" }}>
            <p style={{ color: "var(--muted)", margin: "0 0 1rem", fontSize: "0.9rem", lineHeight: 1.6 }}>
              Have a resource worth sharing? Drop it in the community — that&apos;s where new finds get posted first.
            </p>
            <a
              className="cta cta--ghost"
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor-text="Join"
            >
              Join the Community →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
