"use client";

import { useEffect, useState } from "react";
import styles from "./Events.module.css";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function formatRemaining(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
}

/** Live countdown to an event date, ticking once a second on the client. */
export function EventCountdown({ date }: { date: string }) {
  const [label, setLabel] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const target = new Date(date);
    if (Number.isNaN(target.getTime())) return;

    function tick() {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setIsLive(true);
        return;
      }
      setLabel(formatRemaining(diff));
    }

    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [date]);

  if (isLive) {
    return <span className={styles.countdown}>Happening now</span>;
  }

  if (!label) return null;

  return (
    <span className={styles.countdown}>
      <span className={styles.countdownLabel}>Starts in</span>
      {label}
    </span>
  );
}
