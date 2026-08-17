import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMemberBySlug, members } from "@/lib/content";
import styles from "./MemberProfile.module.css";

type MemberPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return members.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({ params }: MemberPageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = getMemberBySlug(slug);

  if (!member) return {};

  return {
    title: `${member.name} — ${member.role} | ProdMan Club`,
    description: `Meet ${member.name}, ${member.role} of the Masters' Union ProdMan Club. ${member.superpower}`,
  };
}

export default async function MemberPage({ params }: MemberPageProps) {
  const { slug } = await params;
  const member = getMemberBySlug(slug);

  if (!member) notFound();

  const memberIndex = members.findIndex((candidate) => candidate.slug === member.slug);
  const previousMember = members[(memberIndex - 1 + members.length) % members.length];
  const nextMember = members[(memberIndex + 1) % members.length];
  const portrait = member.cutout ?? member.photo;
  const pageStyle = { "--member-accent": member.accent } as CSSProperties;

  return (
    <main className={styles.page} style={pageStyle}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} data-cursor-text="Home">
          Prod/Man
        </Link>
        <span className={styles.cohort}>(The crew of 2026–27)</span>
        <Link href="/#members" className={styles.back} data-cursor-text="Back">
          <span aria-hidden="true">←</span> Back to the crew
        </Link>
      </header>

      <article className={styles.profile}>
        <div className={styles.portraitCard}>
          <span className={styles.index} aria-hidden="true">
            {String(memberIndex + 1).padStart(2, "0")}
          </span>
          <span className={styles.stamp}>{member.role}</span>
          <div className={styles.portraitWrap}>
            {portrait ? (
              <Image
                src={portrait}
                alt={`Portrait of ${member.name}`}
                fill
                priority
                className={styles.portrait}
                sizes="(max-width: 760px) 88vw, 42vw"
              />
            ) : (
              <span className={styles.placeholder} aria-hidden="true">
                {member.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </span>
            )}
          </div>
          <span className={styles.namePlate}>{member.name}</span>
        </div>

        <div className={styles.story}>
          <div className={styles.count} aria-hidden="true">
            <span>{String(memberIndex + 1).padStart(2, "0")}</span>
            <span className={styles.rule} />
            <span>{String(members.length).padStart(2, "0")}</span>
          </div>

          <p className={styles.kicker}>Meet the crew</p>
          <h1>{member.name}</h1>
          <p className={styles.role}>{member.role}, ProdMan Club</p>

          <section className={styles.superpower} aria-labelledby="superpower-heading">
            <h2 id="superpower-heading">Superpower</h2>
            <p>{member.superpower}</p>
          </section>

          <section className={styles.bio} aria-labelledby="story-heading">
            <h2 id="story-heading">The full story</h2>
            <p>{member.bio}</p>
          </section>

          {member.links.length > 0 ? (
            <nav className={styles.links} aria-label={`${member.name} links`}>
              {member.links.map((link) => {
                const isEmail = link.href.startsWith("mailto:");

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target={isEmail ? undefined : "_blank"}
                    rel={isEmail ? undefined : "noreferrer"}
                    data-cursor-text="Connect"
                  >
                    {link.label} <span aria-hidden="true">↗</span>
                  </a>
                );
              })}
            </nav>
          ) : null}
        </div>
      </article>

      <nav className={styles.memberNav} aria-label="Browse team members">
        <Link href={`/team/${previousMember.slug}`} data-cursor-text="Previous">
          <span aria-hidden="true">←</span>
          <span>
            <small>Previous</small>
            {previousMember.name}
          </span>
        </Link>
        <Link href={`/team/${nextMember.slug}`} data-cursor-text="Next">
          <span>
            <small>Next</small>
            {nextMember.name}
          </span>
          <span aria-hidden="true">→</span>
        </Link>
      </nav>
    </main>
  );
}
