import { HeroVideo } from "@/components/landing/hero/HeroVideo";
import { HowItWorksBase } from "@/components/landing/howitworks/HowItWorksBase";
import { FAQSection } from "@/components/landing/faq/FAQSection";
import { TopNavTabs } from "@/components/landing/nav/TopNavTabs";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { KerdosFooter } from "@/components/ui/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-center px-4 pt-6">
        <div className="relative flex w-full max-w-6xl flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <TopNavTabs />
          <div className="flex items-center gap-2 sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2 sm:z-50">
            <LanguageToggle className="hidden sm:flex" />
            <ThemeToggle className="hidden sm:flex" />
          </div>
        </div>
      </header>
      <main>
        <section id="hero" aria-label="video" className="relative isolate min-h-screen">
          <div className="full-bleed">
            <HeroVideo />
          </div>
        </section>
        <section id="how-it-works" aria-labelledby="how-heading" className="bg-background px-4 pb-1 pt-10 md:px-8 lg:px-16">
          <h2 id="how-heading" className="sr-only">
            Cómo funciona
          </h2>
          <div className="mx-auto w-full max-w-6xl">
            <HowItWorksBase />
          </div>
        </section>
        <section id="faq" aria-labelledby="faq-heading" className="bg-background px-4 pb-16 pt-0 -mt-10 md:-mt-12 md:px-8 lg:px-16">
          <h2 id="faq-heading" className="sr-only">
            Preguntas frecuentes
          </h2>
          <div className="mx-auto w-full max-w-4xl">
            <FAQSection />
          </div>
        </section>
        <footer className="-mt-16 bg-background px-4 pb-12 pt-4 md:-mt-20 md:px-8 lg:px-16">
          <div className="mx-auto w-full max-w-6xl">
            <KerdosFooter />
          </div>
        </footer>
      </main>
    </div>
  );
}
