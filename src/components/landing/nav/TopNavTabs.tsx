"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";

const SECTION_IDS = ["hero", "how-it-works", "faq"] as const;
type SectionId = (typeof SECTION_IDS)[number];

export function TopNavTabs() {
  const { t } = useLanguage();
  const tabs = useMemo(
    () => [
      { id: "hero", label: t.nav.hero },
      { id: "how-it-works", label: t.nav.how },
      { id: "faq", label: t.nav.faq }
    ],
    [t.nav.hero, t.nav.how, t.nav.faq]
  );
  const [activeId, setActiveId] = useState<SectionId>(SECTION_IDS[0]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [mobileOpen, setMobileOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const suppressAutoActive = useRef(false);
  const scrollLockTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateIndicator = useCallback((id: string) => {
    const link = linkRefs.current[id];
    const container = containerRef.current;
    if (!link || !container) {
      return;
    }
    const left = link.offsetLeft - container.scrollLeft;
    const width = link.offsetWidth;
    setIndicator({
      left,
      width
    });
  }, []);

  const navigateTo = useCallback(
    (id: string) => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      suppressAutoActive.current = true;
      if (scrollLockTimeout.current) {
        clearTimeout(scrollLockTimeout.current);
      }
      scrollLockTimeout.current = setTimeout(() => {
        suppressAutoActive.current = false;
      }, 800);
      setActiveId(id);
      updateIndicator(id);
    },
    [updateIndicator]
  );

  useEffect(() => {
    updateIndicator(activeId);
  }, [activeId, updateIndicator]);

  useEffect(() => {
    const handleResize = () => updateIndicator(activeId);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeId, updateIndicator]);

  useEffect(() => {
    const resolveSections = () =>
      SECTION_IDS.map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => Boolean(section));

    const getActivationLine = () => {
      const container = containerRef.current;
      if (!container) {
        return window.scrollY + 120;
      }
      const { top, height } = container.getBoundingClientRect();
      return window.scrollY + top + height + 12;
    };

    const updateFromScroll = () => {
      const sections = resolveSections();
      if (!sections.length) {
        return;
      }

      const activationLine = getActivationLine();
      let currentId = sections[0].id;

      for (const section of sections) {
        const rectTop = section.getBoundingClientRect().top + window.scrollY;
        const scrollMarginTop = parseFloat(getComputedStyle(section).scrollMarginTop || "0");
        const threshold = rectTop - scrollMarginTop;
        if (activationLine >= threshold) {
          currentId = section.id;
        } else {
          break;
        }
      }

      if (suppressAutoActive.current) {
        return;
      }

      setActiveId((prev) => (prev === currentId ? prev : currentId));
    };

    updateFromScroll();
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", updateFromScroll);
    return () => {
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("resize", updateFromScroll);
    };
  }, []);

  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    sections.forEach((section) => {
      section.style.scrollMarginTop = "7rem";
    });
    return () => {
      sections.forEach((section) => {
        section.style.scrollMarginTop = "";
      });
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const handleScroll = () => updateIndicator(activeId);
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeId, updateIndicator]);

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.removeProperty("overflow");
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [mobileOpen]);

  useEffect(() => {
    return () => {
      if (scrollLockTimeout.current) {
        clearTimeout(scrollLockTimeout.current);
      }
    };
  }, []);

  const mobileMenuId = "mobile-nav-panel";

  return (
    <nav className="sticky top-6 z-40 w-full px-4">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 sm:justify-center">
        <button
          type="button"
          className="mr-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-background/70 shadow-md backdrop-blur sm:hidden dark:border-white/10 dark:bg-white/10"
          onClick={() => setMobileOpen(true)}
          aria-expanded={mobileOpen}
          aria-controls={mobileMenuId}
          aria-label="Abrir navegación"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div
          data-nav
          ref={containerRef}
          className={cn(
            "relative hidden h-8 items-center gap-1 overflow-hidden rounded-full bg-white/90 px-1.5 shadow-[0_12px_35px_rgba(15,23,42,0.09)] ring-1 ring-zinc-200/70 backdrop-blur-md sm:flex",
            "dark:bg-zinc-950/95 dark:ring-white/25 dark:shadow-[0_12px_40px_rgba(0,0,0,0.45)]",
            "w-full max-w-full justify-center sm:w-auto sm:max-w-none"
          )}
          aria-label="Secciones de la página"
        >
          <span
            className="pointer-events-none absolute inset-y-1 rounded-full border border-black/5 bg-primary/10 shadow-[0_10px_30px_rgba(253,126,20,0.28)] transition-[left,width] duration-300 ease-out dark:border-primary/40 dark:bg-primary/20 dark:shadow-[0_18px_45px_rgba(253,126,20,0.45)]"
            style={{
              left: `${indicator.left}px`,
              width: `${indicator.width}px`
            }}
          />
          {tabs.map((tab) => (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              ref={(node) => {
                linkRefs.current[tab.id] = node;
              }}
              aria-current={activeId === tab.id ? "page" : undefined}
              className={cn(
                "relative z-10 flex-shrink-0 whitespace-nowrap rounded-full px-4 py-1 text-sm font-medium text-center transition-colors",
                activeId === tab.id
                  ? "text-primary"
                  : "text-foreground/70 hover:text-primary"
              )}
              onClick={(event) => {
                event.preventDefault();
                navigateTo(tab.id);
              }}
            >
              {tab.label}
            </a>
          ))}
        </div>
      </div>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex sm:hidden">
          <div
            id={mobileMenuId}
            className="flex h-full w-[82%] max-w-sm flex-col gap-8 border-r border-border/60 bg-background px-6 py-8 text-foreground shadow-2xl"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <LanguageToggle />
                <ThemeToggle />
              </div>
              <button
                type="button"
                className="rounded-full border border-border/60 p-2"
                onClick={() => setMobileOpen(false)}
                aria-label="Cerrar navegación"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={cn(
                    "w-full border-b px-1 pb-3 text-left text-lg font-semibold transition-colors",
                    activeId === tab.id
                      ? "text-primary border-primary"
                      : "text-foreground border-border/50 hover:text-primary"
                  )}
                  onClick={() => {
                    navigateTo(tab.id);
                    setMobileOpen(false);
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="flex-1 bg-black/40 backdrop-blur"
            aria-label="Cerrar navegación"
            onClick={() => setMobileOpen(false)}
          />
        </div>
      )}
    </nav>
  );
}
