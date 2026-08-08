"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { newsletterTopics, whatsappUrl } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import styles from "./Community.module.css";

const cardLiftSpring = { type: "spring", stiffness: 350, damping: 25, mass: 0.8 } as const;

export function Community() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  return (
    <section id="community" className="section">
      <div className="container">
        <Reveal amount={0.2}>
          <p className="section__label">Community</p>
        </Reveal>
        <SplitHeading
          as="h2"
          className="section__heading"
          text="Don’t Just Watch Products Evolve. Be Part of What’s Next."
        />
        <Reveal delay={0.1} amount={0.2}>
          <p className="section__lede">
            Get event drops, product insights, AI trends, opportunities, resources, and the occasional hot
            take—delivered directly to you.
          </p>
        </Reveal>

        <StaggerContainer staggerDelay={0.1} viewportAmount={0.2} className={styles.grid}>
          <StaggerItem variant="fadeUp">
            <motion.article
              className={`card ${styles.card} ${styles.whatsapp}`}
              whileHover={{ y: -5, scale: 1.015 }}
              whileTap={{ scale: 0.99 }}
              transition={cardLiftSpring}
              data-cursor-text="Join"
            >
              <h3 className={styles.cardTitle}>Join the Product Circle</h3>
              <p className={styles.tagline}>Where product conversations continue after the event ends.</p>
              <p className={styles.description}>
                Get instant event updates, workshop announcements, opportunities, resources, and connect
                with people who are equally obsessed with building better products.
              </p>
              <ul className={styles.highlights}>
                <li>Be the first to know about upcoming events</li>
                <li>Meet fellow builders and product enthusiasts</li>
                <li>Discover competitions, projects, and opportunities</li>
                <li>Exchange ideas, feedback, and useful resources</li>
              </ul>
              <div className={styles.ctaRow}>
                <motion.a
                  className="cta cta--acid"
                  href={whatsappUrl}
                  whileHover={{ y: -3, scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  data-cursor-text="Join"
                >
                  Join the WhatsApp Community &rarr;
                </motion.a>
                <p className={styles.microcopy}>Less noise. More product.</p>
              </div>
            </motion.article>
          </StaggerItem>

          <StaggerItem variant="fadeUp">
            <motion.article
              className={`card ${styles.card} ${styles.newsletter}`}
              whileHover={{ y: -5, scale: 1.015 }}
              whileTap={{ scale: 0.99 }}
              transition={cardLiftSpring}
              data-cursor-text="Subscribe"
            >
              <h3 className={styles.cardTitle}>Product Drops, Minus the Fluff</h3>
              <p className={styles.tagline}>Sharp product thinking, delivered to your inbox.</p>
              <p className={styles.description}>
                A curated dose of product breakdowns, AI developments, useful frameworks, industry
                insights, opportunities, and everything worth knowing in the product world.
              </p>
              <div className={styles.tags}>
                {newsletterTopics.map((topic) => (
                  <span key={topic} className="tag">
                    {topic}
                  </span>
                ))}
              </div>
              {status === "submitted" ? (
                <p className={styles.microcopy}>
                  Newsletter signups are launching soon — join the WhatsApp community above for updates
                  in the meantime.
                </p>
              ) : (
                <form
                  className={styles.form}
                  onSubmit={(event) => {
                    event.preventDefault();
                    setStatus("submitted");
                  }}
                >
                  <label className="visually-hidden" htmlFor="newsletter-email">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    className={styles.input}
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
                    Send Me the Good Stuff &rarr;
                  </motion.button>
                </form>
              )}
              <p className={styles.microcopy}>No spam. No boring emails. Unsubscribe anytime.</p>
            </motion.article>
          </StaggerItem>
        </StaggerContainer>

        <Reveal delay={0.15} amount={0.2}>
          <p className={styles.closing}>
            Your next idea, opportunity, teammate, or breakthrough might be one update away.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
