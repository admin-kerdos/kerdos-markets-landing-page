"use client";

import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "secondary";
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const styles =
    variant === "secondary"
      ? "border border-foreground/20 bg-foreground/10 text-foreground dark:border-white/20 dark:text-white"
      : "border border-transparent bg-primary/15 text-primary";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase",
        styles,
        className
      )}
      {...props}
    />
  );
}
