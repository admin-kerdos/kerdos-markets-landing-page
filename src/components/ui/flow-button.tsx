"use client";

import type { ButtonHTMLAttributes } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type FlowButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
  theme?: "light" | "dark";
};

export function FlowButton({ text = "Modern Button", theme = "dark", className, ...props }: FlowButtonProps) {
  const isDark = theme === "dark";
  const baseText = isDark ? "text-white" : "text-[#111111]";
  const borderColor = isDark ? "border-white/30" : "border-[#333333]/40";
  const idleArrow = isDark ? "stroke-white" : "stroke-[#111111]";
  const enterArrow = isDark ? "group-hover:stroke-black" : "group-hover:stroke-white";
  const circleColor = isDark ? "bg-[#fd7e14]" : "bg-[#111111]";
  const hoverText = isDark ? "hover:text-black" : "hover:text-white";

  return (
    <button
      className={cn(
        "group relative flex items-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] bg-transparent px-8 py-3 text-sm font-semibold transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
        "cursor-pointer hover:border-transparent hover:rounded-[12px] active:scale-[0.95]",
        baseText,
        borderColor,
        hoverText,
        className
      )}
      {...props}
    >
      <ArrowRight
        className={cn(
          "absolute left-[-25%] z-[9] h-4 w-4 fill-none transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:left-4",
          idleArrow,
          enterArrow
        )}
      />

      <span className="relative z-[1] -translate-x-3 transition-all duration-[800ms] ease-out group-hover:translate-x-3">
        {text}
      </span>

      <span
        className={cn(
          "absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:h-[420px] group-hover:w-[420px] group-hover:opacity-100",
          circleColor
        )}
      />

      <ArrowRight
        className={cn(
          "absolute right-4 z-[9] h-4 w-4 fill-none transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:right-[-25%]",
          idleArrow,
          enterArrow
        )}
      />
    </button>
  );
}
