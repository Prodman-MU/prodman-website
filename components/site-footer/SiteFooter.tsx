"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteNav, whatsappUrl } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import styles from "./SiteFooter.module.css";

const slideAccentSpring = { type: "spring", stiffness: 400, damping: 28, mass: 0.6 } as const;

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <StaggerContainer staggerDelay={0.1} viewportAmount={0.15} className={styles.top}>
        <StaggerItem variant="fadeUp" className={styles.brand}>
          <h2>Build what should exist.</h2>
          <p>
            ProdMan Club is where curious minds become confident product builders — for the ones working
            at the intersection of Product, Technology, and AI.
          </p>
          <motion.a
            className="cta cta--acid"
            href={whatsappUrl}
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            data-cursor-text="Join"
          >
            Join the WhatsApp Community &rarr;
          </motion.a>
        </StaggerItem>

        <div className={styles.columns}>
          <StaggerItem variant="fadeUp" className={styles.column}>
            <h3>Site</h3>
            <ul>
              {siteNav.map((item) => (
                <li key={item.href}>
                  <motion.a
                    href={item.href}
                    whileHover={{ x: 4 }}
                    transition={slideAccentSpring}
                    data-cursor-text="Link"
                  >
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem variant="fadeUp" className={styles.column}>
            <h3>Connect</h3>
            <ul>
              <li>
                <motion.a
                  href={whatsappUrl}
                  whileHover={{ x: 4 }}
                  transition={slideAccentSpring}
                  data-cursor-text="Link"
                >
                  WhatsApp Community
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#community"
                  whileHover={{ x: 4 }}
                  transition={slideAccentSpring}
                  data-cursor-text="Link"
                >
                  Newsletter
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="https://www.mastersunion.org"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ x: 4 }}
                  transition={slideAccentSpring}
                  data-cursor-text="Link"
                >
                  Masters&rsquo; Union
                </motion.a>
              </li>
            </ul>
          </StaggerItem>
        </div>
      </StaggerContainer>

      <Reveal delay={0.2} amount={0.1} className={styles.bottom}>
        <span>&copy; {new Date().getFullYear()} ProdMan Club, Masters&rsquo; Union.</span>
        <span className={styles.muLine}>
          <Image src="/brand/masters-union-logo-white.png" alt="" width={23} height={12} className={styles.muLogo} />
          A Masters&rsquo; Union Club &middot; Gurugram
        </span>
      </Reveal>
    </footer>
  );
}
