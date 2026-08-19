import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEventBySlug, getFullEvents } from "@/lib/content";
import { EventBanner, hasEventBanner } from "@/components/sections/EventVisuals";
import { EventGallery } from "@/components/sections/EventGallery";
import styles from "./EventDetail.module.css";

type EventPageProps = {
  params: Promise<{ slug: string }>;
};

const eventAccents = ["var(--acid)", "var(--coral)", "var(--cyan)", "var(--purple)"];
const eventAccentTexts = ["var(--acid-text)", "var(--coral-text)", "var(--cyan-text)", "var(--purple-text)"];

export const dynamicParams = false;

export function generateStaticParams() {
  return getFullEvents().map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) return {};

  return {
    title: `${event.title} | ProdMan Club`,
    description: event.description,
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) notFound();

  const accent = eventAccents[(event.number - 1) % eventAccents.length];
  const accentText = eventAccentTexts[(event.number - 1) % eventAccentTexts.length];
  const pageStyle = { "--event-accent": accent, "--event-accent-text": accentText } as CSSProperties;

  return (
    <main className={styles.page} style={pageStyle}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} data-cursor-text="Home">
          Prod/Man
        </Link>
        <span className={styles.kickerLabel}>Events</span>
        <Link href="/#events" className={styles.back} data-cursor-text="Back">
          <span aria-hidden="true">←</span> Back to events
        </Link>
      </header>

      <article className={styles.event}>
        {hasEventBanner(event.number) ? (
          <div className={styles.banner}>
            <EventBanner number={event.number} />
          </div>
        ) : null}

        <div className={styles.meta}>
          <span className={styles.typeBadge}>
            {"typeLabel" in event && typeof event.typeLabel === "string"
              ? event.typeLabel
              : "Internal Event"}
          </span>
          <span className={styles.date}>{event.date}</span>
          <span className={styles.date}>{event.time}</span>
        </div>

        <p className={styles.subtitle}>{event.subtitle}</p>
        <h1 className={styles.title}>{event.title}</h1>
        <p className={styles.tagline}>&ldquo;{event.tagline}&rdquo;</p>
        <p className={styles.description}>{event.description}</p>

        {"tags" in event && event.tags?.length ? (
          <ul className={styles.tagList} aria-label="Event themes">
            {event.tags.map((tag) => (
              <li key={tag} className={styles.tagChip}>
                {tag}
              </li>
            ))}
          </ul>
        ) : null}

        <section className={styles.doSection} aria-labelledby="what-youll-do-heading">
          <h2 id="what-youll-do-heading">What you&apos;ll actually do</h2>
          <ul className={styles.doList}>
            {event.whatYoullDo.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <div className={styles.factRow}>
          <span className={styles.fact}>{event.highlights}</span>
          <span className={styles.fact}>{event.durationNote}</span>
          <span className={styles.fact}>{event.venue}</span>
        </div>

        {"photos" in event && event.photos?.length ? null : (
          <div className={styles.footer}>
            <a
              className="cta cta--acid"
              href={event.registerUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor-text="Register"
            >
              {event.cta}
            </a>
          </div>
        )}

        {"photos" in event && event.photos?.length ? (
          <section className={styles.gallerySection} aria-labelledby="gallery-heading">
            <h2 id="gallery-heading">From the event</h2>
            <EventGallery photos={event.photos} eventTitle={event.title} />
          </section>
        ) : null}
      </article>
    </main>
  );
}
