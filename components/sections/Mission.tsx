import { mission } from "@/lib/content";
import styles from "./Mission.module.css";

export function Mission() {
  return (
    <section id="mission" className="section">
      <div className="container">
        <p className="section__label">Mission</p>
        <h2 className="section__heading">Why do we exist?</h2>

        <div className={styles.grid}>
          <div className={styles.block}>
            <h3 className={styles.blockTitle}>Why Do We Exist?</h3>
            {mission.whyWeExist.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className={styles.block}>
            <h3 className={styles.blockTitle}>Who Are We?</h3>
            {mission.whoAreWe.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className={styles.block}>
            <h3 className={styles.blockTitle}>Our Mission</h3>
            <p className={styles.missionStatement}>{mission.ourMission}</p>
          </div>

          <div className={styles.block}>
            <h3 className={styles.blockTitle}>What Comes Out of It?</h3>
            <ul className={styles.outcomes}>
              {mission.whatComesOutOfIt.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className={styles.closing}>{mission.closing}</p>
      </div>
    </section>
  );
}
