"use client";

import { motion } from "framer-motion";
import { audienceClosing, offerings, personas } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import styles from "./Audience.module.css";

const slideAccentSpring = { type: "spring", stiffness: 400, damping: 28, mass: 0.6 } as const;

export function Audience() {
  return (
    <section id="audience" className="section">
      <div className="container">
        <Reveal amount={0.2}>
          <p className="section__label">Who It&rsquo;s For</p>
        </Reveal>
        <SplitHeading as="h2" className="section__heading" text="Who Is This For?" />
        <Reveal delay={0.1} amount={0.2}>
          <p className={styles.intro}>
            For the ones who don&rsquo;t just use technology—they question it, reimagine it, and build what
            comes next. We bring together ambitious minds working at the intersection of Product,
            Technology, and AI. Whether you write code, design experiences, decode user behaviour, or
            simply have an idea you cannot stop thinking about—there&rsquo;s a place for you here.
          </p>
        </Reveal>

        <StaggerContainer staggerDelay={0.06} viewportAmount={0.15} className={styles.list}>
          {personas.map((persona) => (
            <StaggerItem key={persona.name} variant="fadeUp">
              <motion.div
                className={styles.persona}
                whileHover={{ x: 6, backgroundColor: "rgba(244, 245, 240, 0.035)" }}
                transition={slideAccentSpring}
                data-cursor-text="Persona"
              >
                <h3 className={styles.personaName}>{persona.name}</h3>
                <div>
                  <p className={styles.personaYou}>{persona.you}</p>
                  <p className={styles.personaFor}>{persona.forWhom}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal delay={0.1} amount={0.2}>
          <div>
            {audienceClosing.map((paragraph) => (
              <p key={paragraph} className={styles.closing}>
                {paragraph}
              </p>
            ))}
          </div>

          <nav className={styles.offerings} aria-label="What ProdMan offers">
            {offerings.map((item) => (
              <motion.a
                key={item.href}
                className="tag"
                href={item.href}
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                data-cursor-text="Explore"
              >
                {item.label}
              </motion.a>
            ))}
          </nav>
        </Reveal>
      </div>
    </section>
  );
}
