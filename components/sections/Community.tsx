"use client";

import { useState } from "react";
import { newsletterTopics, whatsappUrl } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import styles from "./Community.module.css";

export function Community() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  return (
    <section id="community" className="section">
      <div className="container">
        <p className="section__label">Community</p>
        <SplitHeading
          as="h2"
          className="section__heading"
          text="Don’t Just Watch Products Evolve. Be Part of What’s Next."
        />
        <p className="section__lede">
          Get event drops, product insights, AI trends, opportunities, resources, and the occasional hot
          take—delivered directly to you.
        </p>

        <div className={styles.grid}>
          <Reveal delay={0}>
            <article className={`card ${styles.card} ${styles.whatsapp}`}>
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
                <a className="cta cta--acid" href={whatsappUrl}>
                  Join the WhatsApp Community &rarr;
                </a>
                <p className={styles.microcopy}>Less noise. More product.</p>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article className={`card ${styles.card} ${styles.newsletter}`}>
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
                  />
                  <button className="cta" type="submit">
                    Send Me the Good Stuff &rarr;
                  </button>
                </form>
              )}
              <p className={styles.microcopy}>No spam. No boring emails. Unsubscribe anytime.</p>
            </article>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className={styles.closing}>
            Your next idea, opportunity, teammate, or breakthrough might be one update away.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
