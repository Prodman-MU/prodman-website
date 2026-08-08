import { events, registrationUrl } from "@/lib/content";
import styles from "./Events.module.css";

export function Events() {
  return (
    <section id="events" className="section">
      <div className="container">
        <p className="section__label">Events</p>
        <h2 className="section__heading">From Problem to Product</h2>
        <p className="section__lede">
          Four high-energy experiences designed to take you through the complete product-building
          journey — discover, design, validate, and showcase.
        </p>

        <div className={styles.grid}>
          {events.map((event) => (
            <article key={event.number} className={styles.card}>
              <span
                className={`${styles.badge} ${event.type === "internal" ? styles.badgeInternal : styles.badgeExternal}`}
              >
                {"typeLabel" in event ? event.typeLabel : "Internal Event"}
              </span>
              <span className={styles.date}>
                {String(event.number).padStart(2, "0")} &middot; {event.date}
              </span>
              <h3 className={styles.title}>{event.title}</h3>
              <p className={styles.tagline}>&ldquo;{event.tagline}&rdquo;</p>
              <p className={styles.description}>{event.description}</p>
              <p className={styles.outcomes}>{event.outcomes}</p>
              <div className={styles.footer}>
                <a
                  className="cta cta--ghost"
                  href={event.cta === "Register Now" ? registrationUrl : "#events"}
                >
                  {event.cta}
                </a>
                {"urgency" in event && event.urgency ? (
                  <span className={styles.urgency}>{event.urgency}</span>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
