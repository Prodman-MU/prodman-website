"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { events, registrationUrl } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { useHydratedReducedMotion } from "@/components/motion/useHydratedReducedMotion";
import styles from "./Events.module.css";

const panelTransition = { duration: 0.4, ease: [0.16, 1, 0.3, 1] } as const;

export function Events() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = useHydratedReducedMotion();

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

        <StaggerContainer staggerDelay={0.08} viewportAmount={0.15} className={styles.timeline}>
          {events.map((event, index) => {
            const isOpen = openIndex === index;
            const headerId = `event-header-${event.number}`;
            const panelId = `event-panel-${event.number}`;

            return (
              <StaggerItem key={event.number} variant="fadeUp" className={styles.rowWrap}>
                <article className={`${styles.row} ${isOpen ? styles.rowOpen : ""}`}>
                  <div className={styles.rail} aria-hidden="true">
                    <span className={styles.number}>{String(event.number).padStart(2, "0")}</span>
                  </div>

                  <div className={styles.content}>
                    <button
                      type="button"
                      id={headerId}
                      className={styles.header}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      data-cursor-text={isOpen ? "Close" : "Open"}
                    >
                      <span className={styles.headerText}>
                        <span className={styles.title}>{event.title}</span>
                        <span className={styles.meta}>
                          <span className={styles.typeBadge}>
                            {"typeLabel" in event ? event.typeLabel : "Internal Event"}
                          </span>
                          <span className={styles.date}>{event.date}</span>
                        </span>
                      </span>
                      <span className={styles.toggle}>
                        <span className={styles.toggleBarH} />
                        <span className={styles.toggleBarV} />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          key="panel"
                          id={panelId}
                          role="region"
                          aria-labelledby={headerId}
                          initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={shouldReduceMotion ? { duration: 0 } : panelTransition}
                          className={styles.panel}
                        >
                          <div className={styles.panelInner}>
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
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
