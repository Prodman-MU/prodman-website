"use client";

import { motion } from "framer-motion";
import { mission } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import styles from "./Mission.module.css";

const cardLiftSpring = { type: "spring", stiffness: 350, damping: 25, mass: 0.8 } as const;

export function Mission() {
  return (
    <section id="mission" className="section">
      <div className="container">
        <Reveal amount={0.2}>
          <p className="section__label">Mission</p>
        </Reveal>
        <SplitHeading as="h2" className="section__heading" text="Why do we exist?" />

        <StaggerContainer staggerDelay={0.08} viewportAmount={0.2} className={styles.grid}>
          <StaggerItem variant="fadeUp">
            <motion.div
              className={styles.block}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={cardLiftSpring}
              data-cursor-text="Mission"
            >
              <h3 className={styles.blockTitle}>Why Do We Exist?</h3>
              {mission.whyWeExist.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </motion.div>
          </StaggerItem>

          <StaggerItem variant="fadeUp">
            <motion.div
              className={styles.block}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={cardLiftSpring}
              data-cursor-text="Mission"
            >
              <h3 className={styles.blockTitle}>Who Are We?</h3>
              {mission.whoAreWe.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </motion.div>
          </StaggerItem>

          <StaggerItem variant="fadeUp">
            <motion.div
              className={styles.block}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={cardLiftSpring}
              data-cursor-text="Mission"
            >
              <h3 className={styles.blockTitle}>Our Mission</h3>
              <p className={styles.missionStatement}>{mission.ourMission}</p>
            </motion.div>
          </StaggerItem>

          <StaggerItem variant="fadeUp">
            <motion.div
              className={styles.block}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={cardLiftSpring}
              data-cursor-text="Mission"
            >
              <h3 className={styles.blockTitle}>What Comes Out of It?</h3>
              <ul className={styles.outcomes}>
                {mission.whatComesOutOfIt.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          </StaggerItem>
        </StaggerContainer>

        <Reveal delay={0.1} amount={0.2}>
          <p className={styles.closing}>{mission.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}
