import Image from "next/image";
import { members } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import styles from "./Members.module.css";

export function Members() {
  return (
    <section id="members" className="section">
      <div className="container">
        <p className="section__label">Members</p>
        <SplitHeading as="h2" className="section__heading" text="The people behind ProdMan." />
        <p className="section__lede">
          A slightly over-curious mix of future product managers, designers, strategists,
          technologists, and builders — the four who&rsquo;ve written their story so far.
        </p>

        <div className={styles.grid}>
          {members.map((member, index) => (
            <Reveal key={member.name} delay={index * 0.06}>
              <article className={`card ${styles.card}`}>
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
                <p className={styles.bio}>{member.bio}</p>
                <p className={styles.superpower}>{member.superpower}</p>
                {member.links.length > 0 ? (
                  <div className={styles.links}>
                    {member.links.map((link) => (
                      <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                        {link.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </article>
            </Reveal>
          ))}

          <Reveal delay={members.length * 0.06}>
            <div className={`card ${styles.moreCard}`}>
              <p>
                Our President, Vice President, and the rest of the core team&rsquo;s profiles are on
                the way.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
