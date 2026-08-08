import { whatsappUrl } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import styles from "./ComingSoon.module.css";

export function Resources() {
  return (
    <section id="resources" className="section">
      <div className="container">
        <p className="section__label">Resources</p>
        <SplitHeading as="h2" className="section__heading" text="Resources &amp; Libraries" />
        <p className="section__lede">
          Articles, frameworks, templates, and past event decks — the shelf of things worth knowing in
          the product world.
        </p>

        <Reveal>
          <div className={styles.panel}>
            <span className={`tag ${styles.badge}`}>Coming Soon</span>
            <p>
              We&rsquo;re curating the club&rsquo;s first set of resources. In the meantime, join the
              WhatsApp community — that&rsquo;s where new finds get shared first.
            </p>
            <a className="cta cta--ghost" href={whatsappUrl}>
              Join the Community &rarr;
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
