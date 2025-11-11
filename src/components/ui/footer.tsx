import { Button } from "@/components/ui/button";
import { Github, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

interface FooterProps {
  logo: ReactNode;
  brandName: string;
  socialLinks: Array<{
    icon: ReactNode;
    href: string;
    label: string;
  }>;
  mainLinks: Array<{
    href: string;
    label: string;
  }>;
  legalLinks: Array<{
    href: string;
    label: string;
  }>;
  copyright: {
    text: string;
    license?: string;
  };
}

export function Footer({
  logo,
  brandName,
  socialLinks,
  mainLinks,
  legalLinks,
  copyright,
}: FooterProps) {
  return (
    <footer className="pb-6 pt-12 lg:pb-8 lg:pt-20">
      <div className="px-4 lg:px-8">
        <div className="md:flex md:items-start md:justify-between">
          <a
            href="/"
            className="flex items-center gap-x-2"
            aria-label={brandName}
          >
            {logo}
            <span className="text-xl font-bold">{brandName}</span>
          </a>
          <ul className="mt-6 flex list-none space-x-3 md:mt-0">
            {socialLinks.map((link, i) => (
              <li key={i}>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  asChild
                >
                  <a href={link.href} target="_blank" aria-label={link.label} rel="noreferrer">
                    {link.icon}
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 border-t pt-6 md:mt-4 md:pt-8 lg:grid lg:grid-cols-10">
          <nav className="lg:col-[4/11] lg:mt-0">
            <ul className="-mx-2 -my-1 flex list-none flex-wrap justify-center text-center lg:justify-center">
              {mainLinks.map((link, i) => (
                <li key={i} className="mx-2 my-1 shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-primary underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-6 lg:col-[4/11] lg:mt-0">
            <ul className="-mx-3 -my-1 flex list-none flex-wrap justify-center text-center lg:justify-center">
              {legalLinks.map((link, i) => (
                <li key={i} className="mx-3 my-1 shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 text-center text-sm leading-6 text-muted-foreground lg:col-[1/4] lg:row-[1/3] lg:mt-0">
            <div>{copyright.text}</div>
            {copyright.license && <div>{copyright.license}</div>}
          </div>
        </div>
      </div>
    </footer>
  );
}

export function KerdosFooter() {
  const year = new Date().getFullYear();
  return (
    <Footer
      logo={
        <Image
          src="/landing/logo.svg"
          alt="Kérdos Markets"
          width={40}
          height={40}
          className="h-10 w-10"
        />
      }
      brandName="Kérdos Markets"
      socialLinks={[
        {
          icon: <Twitter className="h-5 w-5" />,
          href: "https://twitter.com/kerdosmarkets",
          label: "Twitter",
        },
        {
          icon: <Instagram className="h-5 w-5" />,
          href: "https://instagram.com/kerdosmarkets",
          label: "Instagram",
        },
        {
          icon: <Github className="h-5 w-5" />,
          href: "https://github.com/kerdosmarkets",
          label: "GitHub",
        },
      ]}
      mainLinks={[
        { href: "#how-it-works", label: "Cómo funciona" },
        { href: "#faq", label: "Preguntas frecuentes" },
        { href: "mailto:hola@kerdoscompany.com", label: "Contacto" },
      ]}
      legalLinks={[
        { href: "/privacy", label: "Privacidad" },
        { href: "/terms", label: "Términos" },
      ]}
      copyright={{
        text: `© ${year} Kérdos Markets. Hecho en LATAM.`,
      }}
    />
  );
}
