"use client";

import { motion } from "framer-motion";
import { whatsappUrl } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import styles from "./ComingSoon.module.css";

const cardLiftSpring = { type: "spring", stiffness: 350, damping: 25, mass: 0.8 } as const;

export function Resources() {
  return (
    <section id="resources" className="section">
      <div className="container">
        <Reveal amount={0.2}>
          <p className="section__label">Resources</p>
        </Reveal>
        <SplitHeading as="h2" className="section__heading" text="Resources &amp; Libraries" />
        <Reveal delay={0.1} amount={0.2}>
          <p className="section__lede">
            Articles, frameworks, templates, and past event decks — the shelf of things worth knowing in
            the product world.
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
              We&rsquo;re curating the club&rsquo;s first set of resources. In the meantime, join the
              WhatsApp community — that&rsquo;s where new finds get shared first.
            </p>
            <motion.a
              className="cta cta--ghost"
              href={whatsappUrl}
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              data-cursor-text="Join"
            >
              Join the Community &rarr;
            </motion.a>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
