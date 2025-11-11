"use client";

import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, Users, ArrowRight, ShieldCheck, Wallet } from "lucide-react";

type Metric = { k: string; value: string; sub: string };
type Step = { k: string; n: number; title: string; body: string; bullets?: string[]; icon?: ReactNode };

const metrics: Metric[] = [
  { k: "pm-profit", value: "≈ 43% rentables", sub: "en mercados de predicción" },
  { k: "sb-profit", value: "≈ 2% rentables", sub: "en sportsbooks tradicionales" },
  { k: "withdraw", value: "Retiros instantáneos", sub: "sin comisión de Kerdos" }
];

const steps: Step[] = [
  {
    k: "what",
    n: 1,
    title: "Qué es Kerdos Markets",
    body: "El primer mercado de predicción en español y portugués, 100% LATAM. Comprás y vendés posiciones sobre eventos reales de la región.",
    icon: <TrendingUp className="h-5 w-5" />
  },
  {
    k: "prediction",
    n: 2,
    title: "Qué es un mercado de predicción",
    body: 'Un mercado entre personas donde el precio refleja probabilidad. Si "Sí" vale $0.70, el mercado estima 70%. Podés entrar y salir antes del final.',
    icon: <Users className="h-5 w-5" />
  },
  {
    k: "topics",
    n: 3,
    title: "Qué se puede apostar",
    body: "Elegís tu postura y operás como trader en economía, política, deportes y entretenimiento.",
    bullets: [
      "Economía: inflación, tipo de cambio, crecimiento",
      "Política: encuestas y resultados",
      "Deportes: campeones, partidos, rendimiento",
      "Entretenimiento y tendencias"
    ],
    icon: <ArrowRight className="h-5 w-5" />
  },
  {
    k: "why-better",
    n: 4,
    title: "Por qué es mejor que lo que ya existe",
    body: "Kerdos no juega contra vos; ingresos por comisiones de trading/cierre. En mercados de predicción hasta 43% de participantes son rentables (vs 2% en sportsbooks). Precio = probabilidad, más control del riesgo y retiros instantáneos sin comisión.",
    icon: <ShieldCheck className="h-5 w-5" />
  }
];

function GradientCard({ children }: { children: ReactNode }) {
  return (
    <div className="relative rounded-2xl p-[1px] bg-[linear-gradient(135deg,rgba(217,119,6,0.45),rgba(217,119,6,0.15)_35%,rgba(217,119,6,0.45))]">
      <Card className="rounded-[1rem] border bg-background/80 p-5 text-center backdrop-blur-md">{children}</Card>
    </div>
  );
}

function MetricBadge({ m }: { m: Metric }) {
  return (
    <GradientCard>
      <div className="text-lg font-semibold text-primary">{m.value}</div>
      <div className="mt-1 text-sm text-foreground/70">{m.sub}</div>
    </GradientCard>
  );
}

function StepCard({ s }: { s: Step }) {
  return (
    <Card className="h-full rounded-2xl border bg-background/70 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-md">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-8 w-8 select-none items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
          {s.n}
        </span>
        <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
        {s.icon ? <span className="ml-auto text-primary/80">{s.icon}</span> : null}
      </div>
      <p className="mt-3 text-foreground/80">{s.body}</p>
      {s.bullets?.length ? (
        <>
          <Separator className="my-4" />
          <ul className="list-disc space-y-1 pl-6 text-foreground/80">
            {s.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </>
      ) : null}
    </Card>
  );
}

export default function PredictionExplainerV3() {
  return (
    <section
      id="what-is-kerdos"
      aria-labelledby="explainer-title"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8"
      data-section="explainer"
    >
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold tracking-wide text-primary">Mercado LATAM</p>
        <h2 id="explainer-title" className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Qué es Kerdos Markets
        </h2>
        <p className="mt-3 text-lg text-foreground/80">
          Predicción accesible: precio = probabilidad, sin conflicto de interés y con entrada o salida cuando la necesitás.
        </p>
      </header>
      <div
        className="mt-8 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible"
        aria-label="metrics"
        data-stats
      >
        {metrics.map((m) => (
          <div key={m.k} data-metric={m.k} className="snap-start sm:snap-none">
            <MetricBadge m={m} />
          </div>
        ))}
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-5">
          <StepCard s={steps[0]} />
          <StepCard s={steps[1]} />
        </div>
        <div className="space-y-5 lg:col-span-7">
          <StepCard s={steps[2]} />
          <StepCard s={steps[3]} />
          <Card className="rounded-2xl border bg-background/70 p-5 backdrop-blur-md">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Wallet className="h-4 w-4 text-primary" />
              Retiros al instante sin comisión de Kerdos
            </div>
            <p className="mt-2 text-sm text-foreground/75">
              Podés retirar cuando querás. Experiencia pensada para usuarios de LATAM en español y portugués.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
