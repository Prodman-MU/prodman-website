"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { EventPhoto } from "@/lib/content";
import styles from "./EventGallery.module.css";

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
      <path
        d="M12 4v11m0 0 4-4m-4 4-4-4M5 19h14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path d="M5 5 19 19M19 5 5 19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  const d = direction === "left" ? "M14 5 7 12l7 7" : "M10 5l7 7-7 7";
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EventGallery({ photos, eventTitle }: { photos: readonly EventPhoto[]; eventTitle: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const count = photos.length;

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(() => {
    setOpenIndex((current) => (current === null ? current : (current - 1 + count) % count));
  }, [count]);
  const showNext = useCallback(() => {
    setOpenIndex((current) => (current === null ? current : (current + 1) % count));
  }, [count]);

  useEffect(() => {
    if (openIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [openIndex, close, showPrev, showNext]);

  const active = openIndex === null ? null : photos[openIndex];

  return (
    <>
      <div className={styles.galleryGrid}>
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            className={styles.galleryItem}
            onClick={() => setOpenIndex(index)}
            aria-label={`Open photo ${index + 1} of ${count}: ${photo.alt}`}
            data-cursor-text="View"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={800}
              height={600}
              className={styles.galleryImg}
              sizes="(max-width: 720px) 50vw, 280px"
              unoptimized
            />
            <span className={styles.galleryOverlay} aria-hidden="true">
              <ExpandIcon />
            </span>
          </button>
        ))}
      </div>

      {active ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${eventTitle} photo viewer`}
          onClick={close}
        >
          <div className={styles.lightboxBackdrop} aria-hidden="true" />

          <div className={styles.lightboxTopBar} onClick={(event) => event.stopPropagation()}>
            <span className={styles.lightboxCount}>
              {openIndex! + 1} / {count}
            </span>
            <div className={styles.lightboxActions}>
              <a
                className={styles.lightboxButton}
                href={active.src}
                download
                aria-label="Download this photo"
                data-cursor-text="Download"
              >
                <DownloadIcon />
              </a>
              <button
                type="button"
                className={styles.lightboxButton}
                onClick={close}
                aria-label="Close photo viewer"
                data-cursor-text="Close"
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          <button
            type="button"
            className={`${styles.lightboxNav} ${styles.lightboxNavLeft}`}
            onClick={(event) => {
              event.stopPropagation();
              showPrev();
            }}
            aria-label="Previous photo"
            data-cursor-text="Prev"
          >
            <ChevronIcon direction="left" />
          </button>

          <div className={styles.lightboxStage}>
            <Image
              key={active.src}
              src={active.src}
              alt={active.alt}
              width={1760}
              height={1320}
              className={styles.lightboxImg}
              sizes="90vw"
              unoptimized
              priority
              onClick={(event) => event.stopPropagation()}
            />
          </div>

          <button
            type="button"
            className={`${styles.lightboxNav} ${styles.lightboxNavRight}`}
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label="Next photo"
            data-cursor-text="Next"
          >
            <ChevronIcon direction="right" />
          </button>

          <p className={styles.lightboxCaption} onClick={(event) => event.stopPropagation()}>
            {active.alt}
          </p>
        </div>
      ) : null}
    </>
  );
}
