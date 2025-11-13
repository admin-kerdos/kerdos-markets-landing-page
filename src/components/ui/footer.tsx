import { Button } from "@/components/ui/button";
import { Github, Instagram } from "lucide-react";
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

const XLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-hidden="true"
    className={className}
  >
    <path
      fill="currentColor"
      d="M389.6 32h94.7L327.7 222.3 512 480.1H351.3L228 310.3 87.5 480.1H-7.2L167 275.3 0 32h163.4l106.4 143.2L389.6 32ZM362.4 433.6h52.4L151.1 77.9h-56.1l267.4 355.7Z"
    />
  </svg>
);

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
        <div className="mt-6 border-t pt-6 md:mt-4 md:pt-8">
          <div className="flex flex-col items-center gap-6 text-center">
            <nav>
              <ul className="-mx-2 -my-1 flex list-none flex-wrap justify-center text-center">
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
            <div>
              <ul className="-mx-3 -my-1 flex list-none flex-wrap justify-center text-center">
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
            <div className="text-center text-sm leading-6 text-muted-foreground">
              <div>{copyright.text}</div>
              {copyright.license && <div>{copyright.license}</div>}
            </div>
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
          src="/landing/logo_vector.svg"
          alt="Kérdos Markets"
          width={40}
          height={40}
          className="h-10 w-10"
        />
      }
      brandName="Kérdos Markets"
      socialLinks={[
        {
          icon: <XLogo className="h-5 w-5" />,
          href: "https://twitter.com/kerdosmarkets",
          label: "X (Twitter)",
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
