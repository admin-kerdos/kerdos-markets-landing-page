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

  const persistTheme = useCallback((next: "light" | "dark") => {
    syncThemeNodes(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }, [syncThemeNodes]);

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
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleToggle();
      }
    },
    [handleToggle]
  );

  return (
    <div
      className={cn(
        "flex h-8 w-16 cursor-pointer rounded-full p-1 transition-all duration-300",
        isDark ? "border border-zinc-800 bg-zinc-950" : "border border-zinc-200 bg-white",
        className
      )}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={isDark}
      aria-label="Toggle theme"
    >
      <div className="flex w-full items-center justify-between">
        <div
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-300",
            isDark ? "translate-x-0 bg-zinc-800" : "translate-x-8 bg-gray-200"
          )}
        >
          {isDark ? <Moon className="h-4 w-4 text-white" strokeWidth={1.5} /> : <Sun className="h-4 w-4 text-gray-700" strokeWidth={1.5} />}
        </div>
        <div
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-300",
            isDark ? "bg-transparent" : "-translate-x-8"
          )}
        >
          {isDark ? <Sun className="h-4 w-4 text-gray-500" strokeWidth={1.5} /> : <Moon className="h-4 w-4 text-black" strokeWidth={1.5} />}
        </div>
      </div>
    </div>
  );
}
