import { projects, whatsappUrl } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import styles from "./Projects.module.css";

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <Reveal amount={0.2}>
          <p className="section__label">Our Projects</p>
        </Reveal>
        <SplitHeading as="h2" className="section__heading" text="Break Down the Product World." />
        <Reveal delay={0.1} amount={0.2}>
          <p className="section__lede">
            The wall of real, shipped work — built by ProdMan members, from first problem statement to
            working product.
          </p>
        </Reveal>

        <StaggerContainer staggerDelay={0.08} viewportAmount={0.15} className={styles.grid}>
          {projects.map((project) => (
            <StaggerItem key={project.id} variant="fadeUp" className={styles.cardWrap}>
              <div className={styles.card} data-cursor-text="View">
                <div className={styles.cardHeader}>
                  <span className={styles.accentDot} style={{ background: project.accentColor }} aria-hidden="true" />
                  <span className={styles.contributors}>{project.contributors.join(" · ")}</span>
                </div>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
                {project.url ? (
                  <a
                    className={styles.link}
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-text="Open"
                  >
                    View project <span className={styles.linkArrow} aria-hidden="true">→</span>
                  </a>
                ) : null}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal delay={0.1} amount={0.2}>
          <div className={styles.card} style={{ marginTop: "clamp(2rem, 4vw, 3.5rem)", textAlign: "center" }}>
            <p style={{ color: "var(--muted)", margin: "0 0 1rem", fontSize: "0.9rem", lineHeight: 1.6 }}>
              Our first cohort&apos;s projects are in progress — this section fills up as teams ship. Want yours featured here first?
            </p>
            <a
              className="cta cta--ghost"
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor-text="Join"
            >
              Get Involved →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
