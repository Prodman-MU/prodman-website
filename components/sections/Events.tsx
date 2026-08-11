"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { events, registrationUrl } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { useHydratedReducedMotion } from "@/components/motion/useHydratedReducedMotion";
import { EventCountdown } from "./EventCountdown";
import { EventBanner, EventSticker, hasEventBanner } from "./EventVisuals";
import styles from "./Events.module.css";

const panelTransition = { duration: 0.4, ease: [0.16, 1, 0.3, 1] } as const;

function railBadge(fullDate: string) {
  const [day, month] = fullDate.split(" ");
  return { day, month: month.slice(0, 3).toUpperCase() };
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5 19 19 5M8 5h11v11" fill="none" stroke="currentColor" strokeWidth="2.4" />
    </svg>
  );
}

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
            const isOpenable = !("tbd" in event);
            const headerId = `event-header-${event.number}`;
            const panelId = `event-panel-${event.number}`;
            const { day, month } = railBadge(event.date);
            const showBanner = hasEventBanner(event.number);

            const headerContent = (
              <span className={styles.headerText}>
                <span className={styles.title}>{event.title}</span>
                <span className={styles.meta}>
                  <span className={styles.typeBadge}>
                    {"typeLabel" in event ? event.typeLabel : "Internal Event"}
                  </span>
                  <span className={styles.date}>{event.date}</span>
                  <EventCountdown date={event.date} />
                  {"tbd" in event ? <span className={styles.tbdNote}>Details TBD</span> : null}
                </span>
              </span>
            );

            return (
              <StaggerItem key={event.number} variant="fadeUp" className={styles.rowWrap}>
                <article className={`${styles.row} ${isOpen ? styles.rowOpen : ""}`}>
                  <div className={styles.rail} aria-hidden="true">
                    <span className={styles.number}>
                      <span className={styles.numberDay}>{day}</span>
                      <span className={styles.numberMonth}>{month}</span>
                    </span>
                  </div>

                  <div className={styles.content}>
                    {isOpenable ? (
                      <button
                        type="button"
                        id={headerId}
                        className={styles.header}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        data-cursor-text={isOpen ? "Close" : "Open"}
                      >
                        {headerContent}
                        <span className={styles.toggle}>
                          <span className={styles.toggleBarH} />
                          <span className={styles.toggleBarV} />
                        </span>
                      </button>
                    ) : (
                      <div className={styles.headerStatic}>{headerContent}</div>
                    )}

                    {isOpenable ? (
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
                            {showBanner ? (
                              <div className={styles.panelBanner} aria-hidden="true">
                                <EventBanner number={event.number} />
                              </div>
                            ) : null}
                            <div className={styles.panelText}>
                              <p className={styles.tagline}>&ldquo;{event.tagline}&rdquo;</p>
                              <p className={styles.description}>{event.description}</p>
                              <ul className={styles.doList}>
                                {event.whatYoullDo.map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                              </ul>
                              <div className={styles.factRow}>
                                <span className={styles.fact}>{event.highlights}</span>
                                <span className={styles.fact}>
                                  {event.time} · {event.durationNote}
                                </span>
                                <span className={styles.fact}>{event.venue}</span>
                              </div>
                              <div className={styles.footer}>
                                <motion.a
                                  className="cta cta--ghost"
                                  href={event.cta === "Register Now" ? (event.registerUrl ?? registrationUrl) : "#events"}
                                  target={event.registerUrl ? "_blank" : undefined}
                                  rel={event.registerUrl ? "noreferrer" : undefined}
                                  whileHover={{ y: -2, scale: 1.03 }}
                                  whileTap={{ scale: 0.96 }}
                                  data-cursor-text="Register"
                                >
                                  {event.cta}
                                </motion.a>
                                <Link
                                  href={`/events/${event.slug}`}
                                  className={styles.readMore}
                                  aria-label={`Read more about ${event.title}`}
                                  data-cursor-text="Story"
                                >
                                  <ArrowUpRightIcon className={styles.readMoreIcon} />
                                </Link>
                                {"urgency" in event && event.urgency ? (
                                  <span className={styles.urgency}>{event.urgency}</span>
                                ) : null}
                              </div>
                            </div>
                            {!showBanner ? (
                              <div className={styles.panelVisual} aria-hidden="true">
                                <EventSticker number={event.number} />
                              </div>
                            ) : null}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                    ) : null}
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
