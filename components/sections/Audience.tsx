import { audienceClosing, offerings, personas } from "@/lib/content";
import styles from "./Audience.module.css";

export function Audience() {
  return (
    <section id="audience" className="section">
      <div className="container">
        <p className="section__label">Who It&rsquo;s For</p>
        <h2 className="section__heading">Who Is This For?</h2>
        <p className={styles.intro}>
          For the ones who don&rsquo;t just use technology—they question it, reimagine it, and build what
          comes next. We bring together ambitious minds working at the intersection of Product,
          Technology, and AI. Whether you write code, design experiences, decode user behaviour, or
          simply have an idea you cannot stop thinking about—there&rsquo;s a place for you here.
        </p>

        <div className={styles.list}>
          {personas.map((persona) => (
            <div key={persona.name} className={styles.persona}>
              <h3 className={styles.personaName}>{persona.name}</h3>
              <div>
                <p className={styles.personaYou}>{persona.you}</p>
                <p className={styles.personaFor}>{persona.forWhom}</p>
              </div>
            </div>
          ))}
        </div>

        <div>
          {audienceClosing.map((paragraph) => (
            <p key={paragraph} className={styles.closing}>
              {paragraph}
            </p>
          ))}
        </div>

        <nav className={styles.offerings} aria-label="What ProdMan offers">
          {offerings.map((item) => (
            <a key={item.href} className="tag" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
