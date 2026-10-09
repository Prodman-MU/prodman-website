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

/** Event times and calendar-day labels follow the venue's India time zone. */
export function EventCountdown({ date, startsAt }: { date: string; startsAt?: string }) {
  const [countdown, setCountdown] = useState<{ label: string; upcoming: boolean } | null>(null);

  useEffect(() => {
    const target = new Date(startsAt ?? `${date} 00:00:00 GMT+0530`);
    if (Number.isNaN(target.getTime())) return;
    const dayFormatter = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    function tick() {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      if (diff <= 0) {
        setCountdown({
          label: dayFormatter.format(now) === dayFormatter.format(target) ? "Today" : "Past event",
          upcoming: false,
        });
        return;
      }
      setCountdown({ label: formatRemaining(diff), upcoming: true });
    }

    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [date, startsAt]);

  if (!countdown) return null;

  return (
    <span className={styles.countdown}>
      {countdown.upcoming ? <span className={styles.countdownLabel}>Starts in</span> : null}
      {countdown.label}
    </span>
  );
}
