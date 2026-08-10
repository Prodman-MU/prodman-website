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
