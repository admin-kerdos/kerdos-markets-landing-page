"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

const STORAGE_KEY = "theme";

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== "undefined") {
      const preset = document.documentElement.dataset.theme;
      if (preset === "light" || preset === "dark") {
        return preset === "dark";
      }
    }
    if (typeof window === "undefined") {
      return true;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      return stored === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const syncThemeNodes = useCallback((next: "light" | "dark") => {
    if (typeof document === "undefined") {
      return;
    }
    const targets = [document.documentElement, document.body].filter(
      (node): node is HTMLElement => Boolean(node)
    );
    targets.forEach((node) => {
      node.classList.toggle("dark", next === "dark");
      node.setAttribute("data-theme", next);
    });
  }, []);

  const persistTheme = useCallback(
    (next: "light" | "dark") => {
      syncThemeNodes(next);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, next);
      }
    },
    [syncThemeNodes]
  );

  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) {
      return;
    }
    initializedRef.current = true;
    persistTheme(isDark ? "dark" : "light");
  }, [isDark, persistTheme]);

  const handleToggle = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      persistTheme(next ? "dark" : "light");
      return next;
    });
  }, [persistTheme]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleToggle();
      }
    },
    [handleToggle]
  );

  return (
    <button
      data-testid="theme-track"
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Cambiar tema"
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative inline-flex h-8 w-16 flex-shrink-0 items-center rounded-full bg-white/90 p-1 ring-1 ring-zinc-200/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:bg-zinc-950/95 dark:ring-white/25",
        className
      )}
    >
      <span
        data-testid="theme-thumb"
        className={cn(
          "pointer-events-none absolute inset-y-1 left-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#f97316] shadow-[0_6px_15px_rgba(15,23,42,0.2)] transition-transform duration-300 ease-out will-change-transform dark:bg-zinc-900 dark:text-indigo-100",
          isDark ? "translate-x-8" : "translate-x-0"
        )}
      >
        <Sun className={cn("h-3 w-3 transition-opacity duration-150", isDark ? "opacity-0" : "opacity-100")} strokeWidth={1.5} />
        <Moon className={cn("absolute h-3 w-3 transition-opacity duration-150", isDark ? "opacity-100" : "opacity-0")} strokeWidth={1.5} />
      </span>
    </button>
  );
}
