"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "hero", label: "Inicio" },
  { id: "what-is-kerdos", label: "Qué es Kerdos Markets" },
  { id: "how-it-works", label: "Cómo funciona" },
  { id: "faq", label: "Preguntas" }
];

export function TopNavTabs() {
  const [activeId, setActiveId] = useState(tabs[0].id);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

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

  useEffect(() => {
    updateIndicator(activeId);
  }, [activeId, updateIndicator]);

  useEffect(() => {
    const handleResize = () => updateIndicator(activeId);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeId, updateIndicator]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const nextId = visible[0].target.id;
          setActiveId((prev) => (prev === nextId ? prev : nextId));
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0.1, 0.25, 0.5]
      }
    );

    tabs.forEach((tab) => {
      const section = document.getElementById(tab.id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const sections = tabs
      .map((tab) => document.getElementById(tab.id))
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

  return (
    <nav className="sticky top-6 z-40 flex w-full justify-center px-4">
      <div className="mx-auto flex w-full max-w-6xl justify-center">
        <div
          ref={containerRef}
          className={cn(
            "relative inline-flex items-center gap-2 rounded-full border border-white/30 bg-background/70 px-2 py-1 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/10",
            "w-full max-w-full justify-center overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:w-auto sm:overflow-visible"
          )}
          aria-label="Secciones de la página"
        >
          <span
            className="pointer-events-none absolute top-1/2 h-9 -translate-y-1/2 rounded-full bg-primary/20 transition-[left,width] duration-300 ease-out"
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
                "relative z-10 flex-shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-center transition-colors",
                activeId === tab.id
                  ? "text-primary"
                  : "text-foreground/70 hover:text-primary"
              )}
              onClick={(event) => {
                event.preventDefault();
                const section = document.getElementById(tab.id);
                if (section) {
                  section.scrollIntoView({ behavior: "smooth", block: "start" });
                }
                setActiveId(tab.id);
                updateIndicator(tab.id);
              }}
            >
              {tab.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
