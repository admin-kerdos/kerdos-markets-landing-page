import { HeroVideo } from "@/components/landing/hero/HeroVideo";
import { HowItWorksBase } from "@/components/landing/howitworks/HowItWorksBase";
import { FAQSection } from "@/components/landing/faq/FAQSection";
import { TopNavTabs } from "@/components/landing/nav/TopNavTabs";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col gap-16 bg-background px-4 pb-10 pt-8 md:px-8 lg:px-16">
      <TopNavTabs />
      <section id="hero" aria-label="video" className="scroll-mt-32">
        <div className="relative left-1/2 w-[100vw] -translate-x-1/2">
          <HeroVideo className="h-screen w-[100vw] max-w-none" />
        </div>
      </section>
      <HowItWorksBase />
      <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-32">
        <h2 id="faq-heading" className="sr-only"></h2>
        <FAQSection />
      </section>
    </main>
  );
}
