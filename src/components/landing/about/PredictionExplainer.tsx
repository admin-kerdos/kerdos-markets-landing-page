"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BarChart3, Users, ListChecks, Scale, CheckCircle2, XCircle, Zap } from "lucide-react";

type Metric = { k: string; title: string; sub: string };
type Step = { n: number; title: string; body: string; bullets?: string[]; icon: React.ReactNode };

const brand = "#D97706";

const metrics: Metric[] = [
  { k: "pm-profit", title: "≈ 43% rentables", sub: "en mercados de predicción" },
  { k: "sb-profit", title: "≈ 2% rentables", sub: "en sportsbooks tradicionales" },
  { k: "withdraw", title: "Retiros instantáneos", sub: "sin comisión de Kerdos" }
];

const steps: Step[] = [
  {
    n: 1,
    title: "Qué es Kerdos Markets",
    body: "El primer mercado de predicción en español y portugués, 100% LATAM. Comprás y vendés posiciones sobre eventos reales de la región.",
    icon: <BarChart3 className="h-5 w-5" />
  },
  {
    n: 2,
    title: "Qué es un mercado de predicción",
    body: 'Un mercado entre personas donde el precio refleja probabilidad. Si “Sí” vale $0.70, el mercado estima 70%. Podés entrar y salir antes del final.',
    icon: <Users className="h-5 w-5" />
  },
  {
    n: 3,
    title: "Qué se puede apostar",
    body: "Participás como trader en economía, política, deportes y entretenimiento.",
    bullets: [
      "Economía: inflación, tipo de cambio, crecimiento",
      "Política: encuestas y resultados",
      "Deportes: campeones, partidos, rendimiento",
      "Entretenimiento y tendencias"
    ],
    icon: <ListChecks className="h-5 w-5" />
  }
];

function Stat({ m }: { m: Metric }) {
  return (
    <div className="relative rounded-2xl p-[1px] bg-[linear-gradient(135deg,rgba(217,119,6,0.45),rgba(217,119,6,0.12)_35%,rgba(217,119,6,0.45))]">
      <Card
        data-metric={m.k}
        className="rounded-[1rem] border bg-background/85 p-5 text-center shadow-[0_16px_45px_rgba(217,119,6,0.18)] backdrop-blur-md"
      >
        <div className="text-lg font-semibold text-primary">{m.title}</div>
        <div className="mt-1 text-sm text-foreground/70">{m.sub}</div>
      </Card>
    </div>
  );
}

function StepCard({ s }: { s: Step }) {
  return (
    <Card className="h-full rounded-2xl border bg-background/75 p-6 shadow-[0_14px_40px_rgba(0,0,0,0.12)] backdrop-blur-md" data-step={s.n}>
      <div className="mb-3 flex items-center gap-3">
        <span
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold"
          style={{ backgroundColor: `${brand}24`, color: brand }}
        >
          {s.n}
        </span>
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">{s.icon}</div>
        <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
      </div>
      <p className="text-foreground/80">{s.body}</p>
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

function WhyBetter() {
  return (
    <Card
      data-step="4"
      className="h-full rounded-2xl border bg-gradient-to-b from-background/85 via-background/70 to-background/85 p-6 shadow-[0_20px_55px_rgba(217,119,6,0.20)] backdrop-blur-md"
    >
      <div className="mb-3 flex items-center gap-3">
        <span
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold"
          style={{ backgroundColor: `${brand}24`, color: brand }}
        >
          4
        </span>
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Scale className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Por qué es mejor que lo que ya existe</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-background/75 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
            <CheckCircle2 className="h-4 w-4" />
            Mercado de predicción
          </div>
          <ul className="space-y-2 text-foreground/85">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-1 h-4 w-4 text-primary" />
              <span>Kerdos no es la casa; ingresos por comisiones de trading/cierre</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-1 h-4 w-4 text-primary" />
              <span>Precio = probabilidad; señal colectiva</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-1 h-4 w-4 text-primary" />
              <span>Entrar y salir cuando querás</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-1 h-4 w-4 text-primary" />
              <span>≈ 43% rentables vs 2% en sportsbooks</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-1 h-4 w-4 text-primary" />
              <span>Retiros instantáneos sin comisión de Kerdos</span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border bg-background/60 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <XCircle className="h-4 w-4" />
            Sportsbook tradicional
          </div>
          <ul className="space-y-2 text-foreground/75">
            <li className="flex items-start gap-2">
              <XCircle className="mt-1 h-4 w-4 text-foreground/60" />
              <span>Jugás contra la casa; conflicto de interés</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="mt-1 h-4 w-4 text-foreground/60" />
              <span>Cuotas opacas y margen de la casa</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="mt-1 h-4 w-4 text-foreground/60" />
              <span>Apuestas fijas hasta el final; menos control</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="mt-1 h-4 w-4 text-foreground/60" />
              <span>≈ 2% rentables</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-4 rounded-xl border bg-background/75 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Zap className="h-4 w-4 text-primary" />
          Retiros al instante sin comisión de Kerdos
        </div>
        <p className="mt-1 text-sm text-foreground/75">Podés retirar cuando querás. Experiencia pensada para LATAM.</p>
      </div>
    </Card>
  );
}

export default function PredictionExplainer() {
  return (
    <section
      id="what-is-kerdos"
      aria-labelledby="explainer-title"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8"
      data-section="explainer"
    >
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold tracking-[0.15em] text-primary">Mercado LATAM</p>
        <h2 id="explainer-title" className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Qué es Kerdos Markets
        </h2>
        <p className="mt-3 text-lg text-foreground/80">
          Predicción accesible: precio = probabilidad, sin conflicto de interés y con entrada o salida cuando lo necesitás.
        </p>
      </header>

      <div
        className="mt-8 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible no-scrollbar"
        aria-label="metrics"
        data-stats
      >
        {metrics.map((m) => (
          <div key={m.k} className="snap-start sm:snap-none">
            <Stat m={m} />
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-5">
          {steps.slice(0, 2).map((s) => (
            <StepCard key={s.n} s={s} />
          ))}
        </div>
        <div className="space-y-5 lg:col-span-7">
          {steps.slice(2, 3).map((s) => (
            <StepCard key={s.n} s={s} />
          ))}
          <WhyBetter />
        </div>
      </div>
    </section>
  );
}
