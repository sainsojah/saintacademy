import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { Pricing } from "@/components/site/Pricing";
import { Work } from "@/components/site/Work";
import { Demo } from "@/components/site/Demo";
import { Faq } from "@/components/site/Faq";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { FloatingCta } from "@/components/site/FloatingCta";
import { ServicePageView } from "@/components/site/ServicePage";
import { Privacy } from "@/components/site/Privacy";
import { NotFound } from "@/components/site/NotFound";
import { Analytics, RouteSeo, ScrollManager } from "@/components/site/RouteEffects";
import { servicePages } from "@/lib/services";
import { faqs, steps } from "@/lib/content";
import { trackWhatsAppClicks } from "@/lib/site";

function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Process steps={steps} />
      <Pricing />
      <Work />
      <Demo />
      <Faq items={faqs} />
      <Contact />
    </>
  );
}

export default function App() {
  useEffect(() => trackWhatsAppClicks(), []);
  return (
    <div id="top" className="relative flex min-h-screen flex-col overflow-x-clip">
      <ScrollManager />
      <RouteSeo />
      <Analytics />
      <Header />
      <main className="relative z-10 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          {servicePages.map((s) => <Route key={s.slug} path={s.path} element={<ServicePageView page={s} />} />)}
          <Route path="/privacy/" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingCta />
    </div>
  );
}
