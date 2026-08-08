"use client";

import { motion } from "framer-motion";
import { events, registrationUrl } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import styles from "./Events.module.css";

const cardLiftSpring = { type: "spring", stiffness: 350, damping: 25, mass: 0.8 } as const;

export function Events() {
  return (
    <section id="events" className="section">
      <div className="container">
        <Reveal amount={0.2}>
          <p className="section__label">Events</p>
        </Reveal>
        <SplitHeading as="h2" className="section__heading" text="From Problem to Product" />
        <Reveal delay={0.1} amount={0.2}>
          <p className="section__lede">
            Four high-energy experiences designed to take you through the complete product-building
            journey — discover, design, validate, and showcase.
          </p>
        </Reveal>

        <StaggerContainer staggerDelay={0.08} viewportAmount={0.15} className={styles.grid}>
          {events.map((event) => (
            <StaggerItem key={event.number} variant="fadeUp">
              <motion.article
                className={styles.card}
                whileHover={{ y: -4, scale: 1.018 }}
                whileTap={{ scale: 0.985 }}
                transition={cardLiftSpring}
                data-cursor-text="Event"
              >
                <span
                  className={`${styles.badge} ${event.type === "internal" ? styles.badgeInternal : styles.badgeExternal}`}
                >
                  {"typeLabel" in event ? event.typeLabel : "Internal Event"}
                </span>
                <span className={styles.date}>
                  {String(event.number).padStart(2, "0")} &middot; {event.date}
                </span>
                <h3 className={styles.title}>{event.title}</h3>
                <p className={styles.tagline}>&ldquo;{event.tagline}&rdquo;</p>
                <p className={styles.description}>{event.description}</p>
                <p className={styles.outcomes}>{event.outcomes}</p>
                <div className={styles.footer}>
                  <motion.a
                    className="cta cta--ghost"
                    href={event.cta === "Register Now" ? registrationUrl : "#events"}
                    whileHover={{ y: -2, scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    data-cursor-text="Register"
                  >
                    {event.cta}
                  </motion.a>
                  {"urgency" in event && event.urgency ? (
                    <span className={styles.urgency}>{event.urgency}</span>
                  ) : null}
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
