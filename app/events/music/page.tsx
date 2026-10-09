import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { soundtracks, soundtrackTrackCount } from "@/lib/music";
import styles from "./Music.module.css";

const title = "The Event Soundtrack | ProdMan Club";
const description = "Five cinematic soundtracks for the product-building journey. Explore the track lists and listen on Apple Music.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/events/music" },
  openGraph: { title, description, url: "/events/music", images: ["/og-image.png"] },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
};

const accents = ["var(--purple)", "var(--coral)", "var(--cyan)", "var(--acid)", "var(--purple)"];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5 19 19 5M5 5h14v14" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function MusicPage() {
  return (
    <main id="main-content" className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Link href="/" className={styles.brand} data-cursor-text="Home">Prod/Man</Link>
          <span className={styles.affiliation}>Masters&apos; Union · Gurugram</span>
          <div className={styles.headerActions}>
            <Link href="/#events" className={styles.back} data-cursor-text="Back">← <span>Back to events</span></Link>
            <ThemeToggle />
          </div>
        </header>

        <section className={styles.hero} aria-labelledby="music-heading">
          <div className={styles.intro}>
            <p className="section__label">The event soundtrack</p>
            <h1 id="music-heading" className={styles.heading}>Big ideas.<br /><em>Bigger soundtracks.</em></h1>
            <p className={styles.lede}>A little cinematic fuel for the product-building journey. Pick a score, open Apple Music, and get into your flow.</p>
            <a href="#soundtracks" className={styles.collectionLink} data-cursor-text="Explore">Explore the collection <span aria-hidden="true">↓</span></a>
          </div>
          <div className={styles.recordSleeve} aria-hidden="true">
            <span className={styles.sleeveLabel}>Prod/Man · Side A</span>
            <div className={styles.record}>
              <div className={styles.recordLabel}>
                <Image src={soundtracks[0].artwork} alt="" width={180} height={180} sizes="180px" loading="eager" />
                <span className={styles.spindle} />
              </div>
            </div>
            <span className={styles.sleeveNote}>For the making.</span>
            <span className={styles.soundSticker}>Ideas on.<br />Volume up.</span>
          </div>
        </section>

        <section id="soundtracks" className={styles.collection} aria-labelledby="collection-heading">
          <div className={styles.collectionHeader}>
            <h2 id="collection-heading">The collection</h2>
            <p>{String(soundtracks.length).padStart(2, "0")} albums <span aria-hidden="true">/</span> {soundtrackTrackCount} tracks <span aria-hidden="true">/</span> Apple Music</p>
          </div>
          <div className={styles.grid}>
            {soundtracks.map((album, index) => (
              <article
                key={album.id}
                className={styles.card}
                style={{ "--album-accent": accents[index], "--entry-delay": `${index * 70}ms` } as CSSProperties}
              >
                <a
                  href={album.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.albumLink}
                  aria-label={`Listen to ${album.title} by ${album.composer} on Apple Music (opens in a new tab)`}
                  data-cursor-text="Listen"
                >
                  <div className={styles.cardTop}><span>{String(index + 1).padStart(2, "0")}</span><span>Original soundtrack</span><ArrowIcon /></div>
                  <div className={styles.artwork}>
                    <Image src={album.artwork} alt={`${album.title} album cover`} width={800} height={800} sizes="(max-width: 600px) 90vw, (max-width: 1000px) 44vw, 360px" loading={index === 0 ? "eager" : "lazy"} />
                    <span className={styles.artworkBadge}>{album.year}</span>
                  </div>
                  <div className={styles.cardBody}>
                    <p className={styles.composer}>{album.composer}</p>
                    <h3>{album.displayTitle}</h3>
                    <p className={styles.edition}>{album.edition}</p>
                    <p className={styles.albumMeta}>{album.tracks.length} tracks <span aria-hidden="true">·</span> {album.durationLabel}</p>
                    <span className={styles.listen}><span>Open in Apple Music</span><ArrowIcon /></span>
                  </div>
                </a>
                <details className={styles.trackList}>
                  <summary>Track list <span>({album.tracks.length})</span><span className={styles.plus} aria-hidden="true">+</span></summary>
                  <ol aria-label={`${album.displayTitle} tracks`}>
                    {album.tracks.map((track, trackIndex) => (
                      <li key={track.url}>
                        <a href={track.url} target="_blank" rel="noopener noreferrer" data-cursor-text="Listen" aria-label={`${track.title} on Apple Music (opens in a new tab)`}>
                          <span className={styles.trackNumber} aria-hidden="true">{String(trackIndex + 1).padStart(2, "0")}</span>
                          <span>{track.title}</span>
                          <span className={styles.trackDuration}>{track.durationLabel}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </details>
              </article>
            ))}
            <aside className={styles.collectionNote}>
              <span className={styles.noteGlyph} aria-hidden="true">♪</span>
              <p className="section__label">A little listening note</p>
              <h3>The score.<br />The whole score.</h3>
              <p>These are full soundtrack albums. Every cover opens its album in Apple Music; every track has its own link.</p>
              <span className={styles.noteSignoff}>You bring the ideas.</span>
            </aside>
          </div>
        </section>

        <footer className={styles.footer}>
          <p>Soundtracks &amp; artwork via Apple Music. Listening happens in Apple Music.</p>
          <Link href="/#events" data-cursor-text="Events">Back to the events <span aria-hidden="true">↗</span></Link>
        </footer>
      </div>
    </main>
  );
}
