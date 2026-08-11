"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { audienceClosing, audienceGroups, offerings } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { useHydratedReducedMotion } from "@/components/motion/useHydratedReducedMotion";
import styles from "./Audience.module.css";

const panelTransition = { duration: 0.4, ease: [0.16, 1, 0.3, 1] } as const;

export function Audience() {
  const [openCards, setOpenCards] = useState<Set<string>>(new Set());
  const shouldReduceMotion = useHydratedReducedMotion();

  const toggleCard = (name: string) => {
    setOpenCards((current) => {
      const next = new Set(current);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

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

        <StaggerContainer staggerDelay={0.08} viewportAmount={0.15} className={styles.grid}>
          {audienceGroups.map((group) => {
            const isOpen = openCards.has(group.name);
            const headerId = `audience-header-${group.name}`;
            const panelId = `audience-panel-${group.name}`;

            return (
              <StaggerItem key={group.name} variant="fadeUp" className={styles.cardWrap}>
                <div className={`${styles.card} ${isOpen ? styles.cardOpen : ""}`}>
                  <button
                    type="button"
                    id={headerId}
                    className={styles.header}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleCard(group.name)}
                    data-cursor-text={isOpen ? "Close" : "Open"}
                  >
                    <span className={styles.headerText}>
                      <span className={styles.name}>{group.name}</span>
                      <span className={styles.tagline}>{group.tagline}</span>
                    </span>
                    <span className={styles.stickerWrap} aria-hidden="true">
                      <Image
                        src={group.sticker.src}
                        alt={group.sticker.alt}
                        width={group.sticker.width}
                        height={group.sticker.height}
                        className={styles.stickerImg}
                        sizes="(max-width: 720px) 84px, 130px"
                      />
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
                        <p className={styles.description}>{group.description}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
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
