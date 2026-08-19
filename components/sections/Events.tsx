"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { events, newsletterTopics, registrationUrl } from "@/lib/content";
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
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "submitted">("idle");
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
                                {"photos" in event && event.photos?.length ? null : (
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
                                )}
                                <Link
                                  href={`/events/${event.slug}`}
                                  className={styles.readMore}
                                  aria-label={
                                    "photos" in event && event.photos?.length
                                      ? `View photos from ${event.title}`
                                      : `Read more about ${event.title}`
                                  }
                                  data-cursor-text={"photos" in event && event.photos?.length ? "Photos" : "Story"}
                                >
                                  <ArrowUpRightIcon className={styles.readMoreIcon} />
                                </Link>
                                {"photos" in event && event.photos?.length ? (
                                  <span className={styles.urgency}>Event wrapped · see photos</span>
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

        <Reveal delay={0.1} amount={0.2}>
          <motion.aside
            className={styles.newsletterCta}
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.8 }}
          >
            <div className={styles.newsletterCtaText}>
              <p className={styles.newsletterCtaLabel}>Before you go</p>
              <h3 className={styles.newsletterCtaTitle}>Product Drops, Minus the Fluff</h3>
              <p className={styles.newsletterCtaDescription}>
                Get the next event drop, plus product breakdowns and AI trends, straight to your inbox.
              </p>
              <div className={styles.newsletterCtaTags}>
                {newsletterTopics.map((topic) => (
                  <span key={topic} className="tag">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.newsletterCtaAction}>
              {newsletterStatus === "submitted" ? (
                <p className={styles.newsletterCtaMicrocopy}>
                  Newsletter signups are launching soon — join the WhatsApp community for updates in the
                  meantime.
                </p>
              ) : (
                <form
                  className={styles.newsletterCtaForm}
                  onSubmit={(event) => {
                    event.preventDefault();
                    setNewsletterStatus("submitted");
                  }}
                >
                  <label className="visually-hidden" htmlFor="events-newsletter-email">
                    Email address
                  </label>
                  <input
                    id="events-newsletter-email"
                    className={styles.newsletterCtaInput}
                    type="email"
                    required
                    placeholder="you@example.com"
                    data-cursor="text"
                  />
                  <motion.button
                    className="cta"
                    type="submit"
                    whileHover={{ y: -2, scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    data-cursor-text="Send"
                  >
                    Get Product Drops &rarr;
                  </motion.button>
                </form>
              )}
            </div>
          </motion.aside>
        </Reveal>
      </div>
    </section>
  );
}
