import { mission } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import styles from "./Mission.module.css";

export function Mission() {
  return (
    <section id="mission" className="section">
      <div className="container">
        <p className="section__label">Mission</p>
        <SplitHeading as="h2" className="section__heading" text="Why do we exist?" />

        <div className={styles.grid}>
          <Reveal delay={0}>
            <div className={styles.block}>
              <h3 className={styles.blockTitle}>Why Do We Exist?</h3>
              {mission.whyWeExist.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className={styles.block}>
              <h3 className={styles.blockTitle}>Who Are We?</h3>
              {mission.whoAreWe.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className={styles.block}>
              <h3 className={styles.blockTitle}>Our Mission</h3>
              <p className={styles.missionStatement}>{mission.ourMission}</p>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className={styles.block}>
              <h3 className={styles.blockTitle}>What Comes Out of It?</h3>
              <ul className={styles.outcomes}>
                {mission.whatComesOutOfIt.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className={styles.closing}>{mission.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}
