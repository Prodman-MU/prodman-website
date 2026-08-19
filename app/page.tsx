import { Hero } from "@/components/hero/Hero";
import { SiteNav } from "@/components/site-nav/SiteNav";
import { SiteFooter } from "@/components/site-footer/SiteFooter";
import { WhoAreWe } from "@/components/sections/WhoAreWe";
import { Members } from "@/components/sections/Members";
import { Events } from "@/components/sections/Events";
import { Audience } from "@/components/sections/Audience";
import { ProductBreakdown } from "@/components/sections/ProductBreakdown";
import { Resources } from "@/components/sections/Resources";
import { Projects } from "@/components/sections/Projects";

export default function Home() {
  return (
    <>
      <SiteNav />
      <Hero />
      <main>
        <WhoAreWe />
        <Members />
        <Events />
        <Audience />
        <ProductBreakdown />
        <Resources />
        <Projects />
      </main>
      <SiteFooter />
    </>
  );
}
