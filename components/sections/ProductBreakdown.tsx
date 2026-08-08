import { productBreakdown } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import styles from "./ProductBreakdown.module.css";

export function ProductBreakdown() {
  return (
    <section id="breakdown" className="section">
      <div className="container">
        <p className="section__label">Product Breakdown</p>
        <SplitHeading as="h2" className="section__heading" text="What Is ProdMan?" />
        <p className={styles.intro}>
          Part detective. Part strategist. Part builder. Full-time &ldquo;Why?&rdquo; person. Product
          Management—or ProdMan, as we like to call it—is the wonderfully chaotic art of figuring out
          what to build, why, for whom, and whether anyone will actually use it. Everything under the
          ProdMan umbrella:
        </p>

        <div className={styles.grid}>
          {productBreakdown.map((area, index) => (
            <Reveal key={area.title} delay={(index % 4) * 0.05}>
              <article className={`card ${styles.card}`}>
                <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                <h3 className={styles.title}>{area.title}</h3>
                <p className={styles.hook}>{area.hook}</p>
                <p className={styles.description}>{area.description}</p>
                <div className={styles.tags}>
                  {area.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className={styles.shortVersion}>
            <p className={`section__label ${styles.shortVersionLabel}`}>The Short Version</p>
            <p>
              Find the problem. Understand the human. Navigate the chaos. Build the right thing. Measure
              whether it worked. Then improve it—again. That&rsquo;s ProdMan.
            </p>
            <a className="cta cta--ghost" href="#projects">
              Break Down the Product World &rarr;
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
