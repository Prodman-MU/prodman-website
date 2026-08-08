"use client";

import { motion } from "framer-motion";
import { siteNav, whatsappUrl } from "@/lib/content";
import styles from "./SiteNav.module.css";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

export function SiteNav() {
  return (
    <motion.nav
      className={styles.nav}
      aria-label="Section navigation"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EXPO_OUT }}
    >
      <motion.a
        className={styles.wordmark}
        href="#hero"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        data-cursor-text="Home"
      >
        PROD/MAN
      </motion.a>
      <ul className={styles.links}>
        {siteNav.map((item) => (
          <li key={item.href}>
            <motion.a
              href={item.href}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              data-cursor-text="View"
            >
              {item.label}
            </motion.a>
          </li>
        ))}
      </ul>
      <motion.a
        className={`cta cta--acid ${styles.join}`}
        href={whatsappUrl}
        whileHover={{ y: -3, scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
        data-cursor-text="Join"
      >
        Join
      </motion.a>
    </motion.nav>
  );
}
