"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

export function EventGallery({ photos, eventTitle, mediaType = "photo" }: {
  photos: readonly EventPhoto[];
  eventTitle: string;
  mediaType?: "photo" | "poster";
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = openIndex !== null;
  const count = photos.length;

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(() => {
    setOpenIndex((current) => (current === null ? current : (current - 1 + count) % count));
  }, [count]);
  const showNext = useCallback(() => {
    setOpenIndex((current) => (current === null ? current : (current + 1) % count));
  }, [count]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        if (event.key === "ArrowLeft") showPrev();
        else showNext();
      }
      if (event.key === "Tab") {
        const controls = dialogRef.current?.querySelectorAll<HTMLElement>("a[href], button");
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true });
    };
  }, [isOpen, close, showPrev, showNext]);

  const active = openIndex === null ? null : photos[openIndex];

  return (
    <>
      <div className={`${styles.galleryGrid} ${mediaType === "poster" ? styles.posterGrid : ""}`}>
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            className={styles.galleryItem}
            onClick={() => setOpenIndex(index)}
            aria-label={`Open ${mediaType} ${index + 1} of ${count}: ${photo.alt}`}
            data-cursor-text="View"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width ?? 800}
              height={photo.height ?? 600}
              className={styles.galleryImg}
              sizes={mediaType === "poster" ? "(max-width: 640px) 92vw, 290px" : "(max-width: 720px) 50vw, 280px"}
              style={photo.focus ? { objectPosition: photo.focus } : undefined}
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
          ref={dialogRef}
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${eventTitle} ${mediaType} viewer`}
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
                aria-label={`Download this ${mediaType}`}
                data-cursor-text="Download"
              >
                <DownloadIcon />
              </a>
              <button
                ref={closeButtonRef}
                type="button"
                className={styles.lightboxButton}
                onClick={close}
                aria-label={`Close ${mediaType} viewer`}
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
            aria-label={`Previous ${mediaType}`}
            data-cursor-text="Prev"
          >
            <ChevronIcon direction="left" />
          </button>

          <div className={styles.lightboxStage}>
            <Image
              key={active.src}
              src={active.src}
              alt={active.alt}
              width={active.width ?? 1760}
              height={active.height ?? 1320}
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
            aria-label={`Next ${mediaType}`}
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
