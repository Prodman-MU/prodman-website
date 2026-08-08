"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { members } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import styles from "./Members.module.css";

const cardLiftSpring = { type: "spring", stiffness: 350, damping: 25, mass: 0.8 } as const;

export function Members() {
  return (
    <section id="members" className="section">
      <div className="container">
        <Reveal amount={0.2}>
          <p className="section__label">Members</p>
        </Reveal>
        <SplitHeading as="h2" className="section__heading" text="The people behind ProdMan." />
        <Reveal delay={0.1} amount={0.2}>
          <p className="section__lede">
            A slightly over-curious mix of future product managers, designers, strategists,
            technologists, and builders — the seven who&rsquo;ve written their story so far.
          </p>
        </Reveal>

        <StaggerContainer staggerDelay={0.06} viewportAmount={0.15} className={styles.grid}>
          {members.map((member) => (
            <StaggerItem key={member.name} variant="fadeUp">
              <motion.article
                className={`card ${styles.card}`}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.985 }}
                transition={cardLiftSpring}
                data-cursor-text="Team"
              >
                <div className={styles.photoWrap}>
                  {member.photo ? (
                    <Image src={member.photo} alt={member.name} fill className={styles.photo} sizes="280px" />
                  ) : (
                    <span className={styles.photoPlaceholder} aria-hidden="true">
                      {member.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </span>
                  )}
                </div>
                <h3 className={styles.name}>{member.name}</h3>
                {member.role ? <p className={styles.role}>{member.role}</p> : null}
                <p className={styles.bio}>{member.bio}</p>
                <p className={styles.superpower}>{member.superpower}</p>
                {member.links.length > 0 ? (
                  <div className={styles.links}>
                    {member.links.map((link) => (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.92 }}
                        data-cursor-text="Connect"
                      >
                        {link.label}
                      </motion.a>
                    ))}
                  </div>
                ) : null}
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
