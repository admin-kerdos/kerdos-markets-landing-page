"use client";

import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  className?: string;
}

const options: Array<{ value: "es" | "pt"; label: string }> = [
  { value: "es", label: "ES" },
  { value: "pt", label: "PT" }
];

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.languageToggle.label}
      className={cn(
        "flex items-center rounded-full border border-white/30 bg-background/70 text-xs font-semibold shadow-sm backdrop-blur dark:border-white/10",
        className
      )}
    >
      {options.map((option, index) => {
        const isActive = option.value === language;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setLanguage(option.value)}
            className={cn(
              "px-3 py-1 transition-colors",
              index === 0 ? "rounded-l-full" : "",
              index === options.length - 1 ? "rounded-r-full" : "",
              isActive
                ? "bg-primary/90 text-background"
                : "text-foreground/70 hover:text-primary dark:text-white/70"
            )}
            aria-pressed={isActive}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
