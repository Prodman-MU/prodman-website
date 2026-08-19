"use client";

import { motion } from "framer-motion";
import { whatsappUrl } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import styles from "./ComingSoon.module.css";

const cardLiftSpring = { type: "spring", stiffness: 350, damping: 25, mass: 0.8 } as const;

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

        <Reveal amount={0.2}>
          <motion.div
            className={styles.panel}
            whileHover={{ y: -3, scale: 1.01 }}
            transition={cardLiftSpring}
            data-cursor-text="Soon"
          >
            <span className={`tag ${styles.badge}`}>Coming Soon</span>
            <p>
              Our first cohort&rsquo;s projects are in progress — this section fills up as teams ship. Want
              yours featured here first?
            </p>
            <motion.a
              className="cta cta--ghost"
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              data-cursor-text="Join"
            >
              Get Involved &rarr;
            </motion.a>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
