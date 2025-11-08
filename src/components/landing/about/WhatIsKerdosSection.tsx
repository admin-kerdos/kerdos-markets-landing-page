import { cn } from "@/lib/utils";
import { Check, LineChart, ShieldCheck, Wallet } from "lucide-react";
import type { HTMLAttributes } from "react";

type WhatIsKerdosSectionProps = HTMLAttributes<HTMLDivElement> & {
  headingId?: string;
};

const highlights = [
  {
    icon: <LineChart className="h-6 w-6" />,
    title: "Liquidez institucional",
    description:
      "Orderbooks profundos, liquidez multi-venue y spreads competitivos en bonos, commodities y activos tokenizados.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Cumplimiento automatizado",
    description:
      "KYC/AML integrado, monitoreo on-chain y reportes regulatorios listos para auditores y supervisores.",
  },
  {
    icon: <Wallet className="h-6 w-6" />,
    title: "Infraestructura para fintechs",
    description:
      "APIs REST y WebSocket de baja latencia para pricing, settlement y conciliación en tiempo real.",
  },
];

const stats = [
  { label: "Activos listados", value: "+250" },
  { label: "Partners institucionales", value: "40+" },
  { label: "Volumen mensual", value: "$120M" },
];

const audiences = [
  "Casas de bolsa y mesas de dinero que buscan distribuir nuevos productos.",
  "Emisores de deuda y RWA que necesitan liquidez 24/7.",
  "Fintechs que quieren ofrecer inversión alternativa sin cargar la operación.",
];

export function WhatIsKerdosSection({
  headingId = "what-is-kerdos-heading",
  className,
  ...props
}: WhatIsKerdosSectionProps) {
  return (
    <div
      className={cn("mx-auto max-w-6xl space-y-12 px-4 sm:px-6 lg:px-0", className)}
      {...props}
    >
      <div className="mx-auto max-w-3xl text-center space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Mercado institucional
        </p>
        <h2
          id={headingId}
          className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
        >
          ¿Qué es Kerdos Markets?
        </h2>
        <p className="text-lg text-muted-foreground">
          Es la plataforma latinoamericana que conecta emisores, traders y fintechs
          para listar, valorar y operar activos tokenizados con respaldo en el
          mundo real, todo dentro de un entorno regulado y programable.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-6 md:grid-cols-2">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="flex flex-col justify-between rounded-3xl border border-border/60 bg-gradient-to-b from-primary/10 via-background to-background p-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground/70">Diseñado para</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {audiences.map((audience) => (
                <li key={audience} className="flex items-start gap-3">
                  <span className="mt-1 rounded-full bg-primary/15 p-1 text-primary">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span>{audience}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 grid gap-4 rounded-2xl border border-white/10 bg-background/60 p-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
