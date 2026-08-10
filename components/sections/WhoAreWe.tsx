"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { whoWeAre } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import styles from "./WhoAreWe.module.css";

const CARD_ACCENTS = ["var(--cyan)", "var(--coral)", "var(--purple)"] as const;
const CARD_ROTATIONS = ["-1.6deg", "1.1deg", "-0.7deg"] as const;

const cardLiftSpring = { type: "spring", stiffness: 340, damping: 24, mass: 0.8 } as const;

type CardStyle = CSSProperties & { "--accent": string; "--rotate": string };

export function WhoAreWe() {
  return (
    <section id="who-are-we" className={`section ${styles.section}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.intro}>
          <Reveal amount={0.4}>
            <span className={styles.eyebrow}>({whoWeAre.eyebrow})</span>
          </Reveal>
          <SplitHeading as="h2" className={`section__heading ${styles.heading}`} text={whoWeAre.heading} />
        </div>

        <Reveal delay={0.1} amount={0.3} className={styles.quoteWrap}>
          <blockquote className={styles.quote}>
            <span className={styles.quoteMark} aria-hidden="true">
              “
            </span>
            {whoWeAre.lede}
          </blockquote>
        </Reveal>

        <StaggerContainer staggerDelay={0.1} viewportAmount={0.2} className={styles.cards}>
          {whoWeAre.paragraphs.map((paragraph, index) => {
            const cardStyle: CardStyle = {
              "--accent": CARD_ACCENTS[index % CARD_ACCENTS.length],
              "--rotate": CARD_ROTATIONS[index % CARD_ROTATIONS.length],
            };

            return (
              <StaggerItem key={paragraph} variant="fadeUp" className={styles.cardItem}>
                <motion.div
                  className={styles.card}
                  style={cardStyle}
                  whileHover={{ y: -6, rotate: 0 }}
                  whileTap={{ scale: 0.98 }}
                  transition={cardLiftSpring}
                  data-cursor-text="Us"
                >
                  <span className={styles.cardIndex} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p>{paragraph}</p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <Reveal delay={0.15} amount={0.3} className={styles.closingWrap}>
          <div className={styles.closingBanner}>
            <span className={styles.closingBadge} aria-hidden="true">
              ★
            </span>
            <p className={styles.closing}>{whoWeAre.closing}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
