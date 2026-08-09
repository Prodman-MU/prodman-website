import { Hero } from "@/components/hero/Hero";
import { SiteNav } from "@/components/site-nav/SiteNav";
import { SiteFooter } from "@/components/site-footer/SiteFooter";
import { Members } from "@/components/sections/Members";
import { Events } from "@/components/sections/Events";
import { Mission } from "@/components/sections/Mission";
import { Audience } from "@/components/sections/Audience";
import { Community } from "@/components/sections/Community";
import { ProductBreakdown } from "@/components/sections/ProductBreakdown";
import { Resources } from "@/components/sections/Resources";
import { Projects } from "@/components/sections/Projects";

export default function Home() {
  return (
    <>
      <SiteNav />
      <Hero />
      <main>
        <Members />
        <Events />
        <Mission />
        <Audience />
        <Community />
        <ProductBreakdown />
        <Resources />
        <Projects />
      </main>
      <SiteFooter />
    </>
  );
}
