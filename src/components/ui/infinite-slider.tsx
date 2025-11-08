"use client";

import { cn } from "@/lib/utils";
import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type React from "react";
import useMeasure from "react-use-measure";

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
};

const DEFAULT_SPEED = 30;

export function InfiniteSlider({
  children,
  gap = 16,
  speed = DEFAULT_SPEED,
  speedOnHover,
  direction = "horizontal",
  reverse = false,
  className
}: InfiniteSliderProps) {
  const [hovered, setHovered] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const translation = useMotionValue(0);
  const [ref, bounds] = useMeasure();

  const activeSpeed = hovered && speedOnHover ? speedOnHover : speed;
  const axisSize = direction === "horizontal" ? bounds.width : bounds.height;

  useEffect(() => {
    if (!axisSize) {
      return;
    }
    const distance = axisSize / 2 + gap / 2;
    if (!distance || activeSpeed <= 0) {
      return;
    }
    const from = reverse ? -distance : 0;
    const to = reverse ? 0 : -distance;
    translation.set(from);
    const controls = animate(translation, [from, to], {
      ease: "linear",
      duration: Math.max(distance / activeSpeed, 0.1),
      repeat: Infinity,
      repeatType: "loop",
      onRepeat: () => {
        translation.set(from);
      }
    });
    return () => {
      controls.stop();
    };
  }, [animationKey, translation, axisSize, gap, reverse, activeSpeed, direction]);

  const hoverHandlers = useMemo(() => {
    if (!speedOnHover) {
      return {};
    }
    return {
      onHoverStart: () => {
        setHovered(true);
        setAnimationKey((key) => key + 1);
      },
      onHoverEnd: () => {
        setHovered(false);
        setAnimationKey((key) => key + 1);
      }
    } as const;
  }, [speedOnHover]);

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        ref={ref}
        className="flex w-max"
        style={{
          ...(direction === "horizontal" ? { x: translation } : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === "horizontal" ? "row" : "column"
        }}
        {...hoverHandlers}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
