"use client";

import { cn } from "@/lib/utils";
import { Globe2, Layers, ListChecks, ShieldCheck } from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
import { useLanguage } from "@/contexts/language-context";

interface HowItWorksProps extends React.HTMLAttributes<HTMLDivElement> {}

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
}

const StepCard: React.FC<StepCardProps> = ({ icon, title, description, benefits }) => (
  <div
    tabIndex={0}
    data-testid="how-step-card"
    className={cn(
      "relative rounded-2xl border bg-card p-6 text-card-foreground transition-all duration-300 ease-in-out",
      "hover:scale-105 hover:shadow-lg hover:border-primary/50 hover:bg-muted"
    )}
  >
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-primary">
      {icon}
    </div>
    <h3 className="mb-2 text-xl font-semibold">{title}</h3>
    <p className="mb-6 text-muted-foreground">{description}</p>
    <ul className="space-y-3">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-center gap-3">
          <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
          </div>
          <span className="text-muted-foreground">{benefit}</span>
        </li>
      ))}
    </ul>
  </div>
);

const iconMap = {
  globe: <Globe2 className="h-6 w-6" />,
  layers: <Layers className="h-6 w-6" />,
  list: <ListChecks className="h-6 w-6" />,
  shield: <ShieldCheck className="h-6 w-6" />
} as const;

export const HowItWorks: React.FC<HowItWorksProps> = ({ className, ...props }) => {
  const { t } = useLanguage();
  const stepsData = useMemo(
    () =>
      t.howItWorks.steps.map((step) => ({
        ...step,
        icon: iconMap[step.icon]
      })),
    [t.howItWorks.steps]
  );

  return (
    <div
      className={cn("w-full bg-background pb-16 pt-2 sm:pb-24 sm:pt-6", className)}
      {...props}
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {t.howItWorks.heading}
          </h2>
          {t.howItWorks.subheading ? (
            <p className="mt-2 text-muted-foreground">{t.howItWorks.subheading}</p>
          ) : null}
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stepsData.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              benefits={step.benefits}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
