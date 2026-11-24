import { useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { Pricing } from "@/components/site/Pricing";
import { Work } from "@/components/site/Work";
import { Demo } from "@/components/site/Demo";
import { Reviews } from "@/components/site/Reviews";
import { Faq } from "@/components/site/Faq";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { FloatingCta } from "@/components/site/FloatingCta";
import { useScrollProgress } from "@/hooks/use-scroll";
import { trackWhatsAppClicks } from "@/lib/site";

export default function App() {
  const bar = useScrollProgress<HTMLDivElement>();
  useEffect(() => trackWhatsAppClicks(), []);

  return (
    <div id="top" className="relative flex min-h-screen flex-col overflow-x-clip">
      <div className="site-bg" aria-hidden="true" />
      <div
        ref={bar}
        aria-hidden="true"
        className="fixed left-0 top-0 z-50 h-0.5 w-full origin-left bg-primary"
        style={{ transform: "scaleX(var(--p, 0))" }}
      />
      <Header />
      <main className="relative z-10 flex-1">
        <Hero />
        <Marquee />
        <Services />
        <Process />
        <Pricing />
        <Work />
        <Demo />
        <Reviews />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingCta />
    </div>
  );
}
