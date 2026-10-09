/* Sticker illustrations for each event panel, cropped from the club's
   sticker reference sheet (public/events/stickers/*.png). Mapped by event
   number to the sticker whose motif best matches that event's theme. */

import Image from "next/image";
import styles from "./Events.module.css";

interface StickerSpec {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const eventStickers: Record<number, StickerSpec> = {
  1: {
    src: "/events/stickers/event-2.png",
    alt: "Sticker illustration of a developer building on a laptop",
    width: 512,
    height: 373,
  },
  2: {
    src: "/events/stickers/event-1.png",
    alt: "Sticker illustration of a product manager holding a clipboard beside a lightbulb idea",
    width: 512,
    height: 382,
  },
  3: {
    src: "/events/stickers/event-3.png",
    alt: "Sticker illustration of a designer sketching in front of a monitor",
    width: 512,
    height: 383,
  },
  4: {
    src: "/events/stickers/event-4.png",
    alt: "Sticker illustration of a presenter pointing at a rising growth chart",
    width: 512,
    height: 383,
  },
};

export function EventSticker({ number }: { number: number }) {
  const sticker = eventStickers[number];
  if (!sticker) return null;

  return (
    <Image
      src={sticker.src}
      alt={sticker.alt}
      width={sticker.width}
      height={sticker.height}
      className={styles.stickerImg}
      sizes="(max-width: 720px) 96px, 150px"
    />
  );
}

/* Full event poster, used in place of the sticker for events that have a
   dedicated promo banner. Shown on the
   left of the panel; when present, the sticker on the right is dropped. */

interface BannerSpec {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const eventBanners: Record<number, BannerSpec> = {
  1: {
    src: "/events/hero-banner/banner-1.png",
    alt: "Back to the Future event poster: a product management challenge set in 1995 — no apps, no smartphones, no AI, no internet.",
    width: 1536,
    height: 1024,
  },
  2: {
    src: "/events/next-interface/banner.jpg",
    alt: "Product Catch-Up: The Next Interface with Siddhant Aggarwal, Founder of Luxid Tech. 9 October 2026, 4:30 PM, Masters’ Union, Gurugram. High tea and ₹10,000 in goodies. Register on Unstop.",
    width: 1600,
    height: 593,
  },
};

export function hasEventBanner(number: number) {
  return Boolean(eventBanners[number]);
}

export function EventBanner({ number, detail = false }: { number: number; detail?: boolean }) {
  const banner = eventBanners[number];
  if (!banner) return null;

  return (
    <Image
      src={banner.src}
      alt={banner.alt}
      width={banner.width}
      height={banner.height}
      className={styles.bannerImg}
      sizes={detail ? "(max-width: 960px) 92vw, 880px" : "(max-width: 720px) 100vw, 320px"}
      preload={detail}
    />
  );
}
