"use client";

import { cn } from "@/lib/utils";
import {
  Coins,
  Globe2,
  Layers,
  ListChecks,
  Percent,
  ShieldCheck,
  Tag,
} from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";

interface HowItWorksProps extends React.HTMLAttributes<HTMLDivElement> {}

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
}

const StepCard: React.FC<StepCardProps> = ({
  icon,
  title,
  description,
  benefits,
}) => (
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

export const HowItWorks: React.FC<HowItWorksProps> = ({
  className,
  ...props
}) => {
  const stepsData = [
    {
      icon: <Globe2 className="h-6 w-6" />,
      title: "Qué es Kérdos Markets",
      description:
        "El primer mercado de predicción en español y portugués. Acá comprás y vendés posiciones sobre lo que pasa en economía, elecciones, partidos de futbol, deportes y entretenimiento.",
      benefits: [
        "Diseñado para comunidades de habla hispana y portuguesa",
        "Operá escenarios de la región con liquidez 24/7",
        "Comprá o vendé según tu lectura del evento",
      ],
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Qué es un mercado de predicción",
      description:
        "Es un mercado entre personas: cada posición paga $1 si acierta y $0 si falla. El precio refleja la probabilidad que la comunidad asigna al resultado.",
      benefits: [
        "Si “Sí” vale $0.70, el mercado estima 70% de probabilidad",
        "Podés entrar y salir antes del final para asegurar ganancias o limitar pérdidas",
        "Trading puro: no jugás contra la casa sino contra otros participantes",
      ],
    },
    {
      icon: <ListChecks className="h-6 w-6" />,
      title: 'Qué se puede "apostar" (participar)',
      description:
        "Economía, política, deportes y entretenimiento: vos elegís el evento y operás tu opinión.",
      benefits: [
        "Economía: inflación, tipo de cambio, crecimiento",
        "Política: encuestas y resultados",
        "Deportes: campeones, partidos, rendimiento",
        "Entretenimiento y tendencias: premios, estrenos, cultura pop",
      ],
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Por qué es mejor que lo que ya existe",
      description:
        "Más transparencia, menos conflicto de interés y control total del riesgo.",
      benefits: [
        "No jugás contra la casa, Kérdos no toma el otro lado de tu posición",
        "Kérdos genera ingresos por comisiones por cada trade, no por tu pérdida",
        "Podés vender antes del final para gestionar riesgo",
        "100% seguro: tus fondos siempre están bajo tu control, Kérdos no tiene tu dinero y podés retirarlo 24/7 sin comisiones ni bloqueos.",
      ],
    },
  ];

  return (
    <div
      className={cn("w-full bg-background pb-16 pt-2 sm:pb-24 sm:pt-6", className)}
      {...props}
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Kérdos Markets
          </h2>
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
