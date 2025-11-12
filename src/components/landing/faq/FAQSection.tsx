"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ThumbsDown, ThumbsUp } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

type FeedbackChoice = "up" | "down" | null;

type FAQItem = {
  id: string;
  question: string;
  answer: ReactNode;
};

const faqItems: FAQItem[] = [
  {
    id: "difference",
    question: "¿Qué es Kérdos Markets y en qué se diferencia de una casa de apuestas?",
    answer: (
      <>
        <p>
          Kérdos es un mercado de predicción: comprás y vendés posiciones contra otras personas, no contra la casa. Kérdos
          no toma el otro lado; gana con comisiones por trading/cierre. Los precios reflejan probabilidad y se actualizan
          con la información del mercado.
        </p>
        <p>
          Por ejemplo en deporte los mercados de predicción, hasta ≈43% de usuarios resultan rentables vs ≈2% en sportsbooks tradicionales, porque
          el incentivo está en aportar información, no en apostar contra una casa que controla las cuotas.
        </p>
      </>
    ),
  },
  {
    id: "pricing",
    question: "¿Cómo funciona el precio y qué significa que refleje probabilidad?",
    answer: (
      <p>
        Cada posición paga $1 si acierta y $0 si falla. Si “Sí” cotiza a $0.70, el mercado estima 70% de probabilidad de que
        ocurra. El precio sube o baja según oferta/demanda y nueva información.
      </p>
    ),
  },
  {
    id: "enter-exit",
    question: "¿Puedo entrar y salir antes de que termine el evento? ¿Cómo vendo una posición?",
    answer: (
      <p>
        Sí. Comprás “Sí/No” y podés vender al precio actual en cualquier momento. Ganancia/Pérdida ≈ (precio de venta − precio
        de compra) × cantidad (menos comisiones). También podés vender una parte y mantener el resto.
      </p>
    ),
  },
  {
    id: "topics",
    question: "¿Qué temas se pueden operar?",
    answer: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Economía: inflación, tipo de cambio, crecimiento.</li>
        <li>Política: encuestas y resultados electorales.</li>
        <li>Deportes: campeones, partidos, rendimiento.</li>
        <li>Entretenimiento y tendencias.</li>
      </ul>
    ),
  },
  {
    id: "payments",
    question: "¿Cómo deposito y retiro? ¿Hay mínimos o comisiones? ¿Los retiros son instantáneos?",
    answer: (
      <p>
        Podés usar las wallets phantom y solflareo o directamente dipositar usdc en tu cuenta. En un futuro se espera le integracion de wallets locales. Los retiros son instantáneos y sin comisión de Kérdos.
      </p>
    ),
  },
  {
    id: "countries",
    question: "¿En qué países está disponible y en qué idiomas puedo usar la plataforma?",
    answer: (
      <p>
        La app funciona en español y portugués. La app esta disponible en todo el mundo.
      </p>
    ),
  },
  {
    id: "resolution",
    question: "¿Cuándo se resuelve un mercado y qué pasa si el evento cambia o se cancela?",
    answer: (
      <p>
        Cada mercado incluye reglas de resolución claras. Si hay postergación se puede extender; si hay cambio sustancial o
        cancelación, se ajusta la regla o se declara inválido y se explica el tratamiento (por ejemplo, devoluciones).
      </p>
    ),
  },
  {
    id: "fees",
    question: "¿Qué comisiones cobra Kérdos y por qué no apuesta contra mí?",
    answer: (
      <p>
        Se aplican comisiones de 1% a 2% por cada trade. Kérdos no toma posiciones contra vos; su ingreso
        proviene de estas comisiones, eliminando el conflicto de interés típico de sportsbooks.
      </p>
    ),
  },
];

const helpfulChoices: Array<{ key: Exclude<FeedbackChoice, null>; icon: ReactNode; label: string }> = [
  { key: "up", icon: <ThumbsUp className="h-4 w-4" />, label: "Sí, me ayudó" },
  { key: "down", icon: <ThumbsDown className="h-4 w-4" />, label: "No, necesito más info" },
];

export function FAQSection() {
  const [openId, setOpenId] = useState<string>(faqItems[0].id);
  const [feedback, setFeedback] = useState<Record<string, FeedbackChoice>>(() =>
    Object.fromEntries(faqItems.map((item) => [item.id, null])),
  );

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  const handleFeedback = (id: string, choice: Exclude<FeedbackChoice, null>) => {
    setFeedback((prev) => ({
      ...prev,
      [id]: prev[id] === choice ? null : choice,
    }));
  };

  return (
    <section className="space-y-6">
      <div className="space-y-3 text-center">
        <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Preguntas frecuentes</h2>
        <p
          className="text-base text-muted-foreground"
          style={{ marginTop: "1.75rem" }}
        >
          Explorá cómo funciona el mercado, qué métodos de pago hay y qué riesgos deberías considerar antes de tradear.
        </p>
      </div>

      <div className="divide-y divide-border/60">
        {faqItems.map((item) => {
          const isOpen = openId === item.id;
          const selected = feedback[item.id];
          return (
            <article key={item.id} className="py-4" data-testid={`faq-item-${item.id}`}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-6 text-left"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id}`}
                onClick={() => handleToggle(item.id)}
              >
                <span className="text-base font-medium text-foreground">{item.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "h-5 w-5 text-muted-foreground transition-transform duration-300",
                    isOpen ? "rotate-180 text-primary" : "",
                  )}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key={item.id}
                    id={`faq-answer-${item.id}`}
                    data-testid={`faq-answer-${item.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
                      {item.answer}

                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <p className="font-medium text-foreground">¿Te sirvió?</p>
                        {helpfulChoices.map((choice) => (
                          <button
                            key={choice.key}
                            type="button"
                            data-testid={`feedback-${choice.key}-${item.id}`}
                            aria-label={choice.label}
                            aria-pressed={selected === choice.key}
                            onClick={() => handleFeedback(item.id, choice.key)}
                            className={cn(
                              "inline-flex items-center justify-center rounded-full p-1 transition",
                              selected === choice.key ? "text-primary" : "text-muted-foreground hover:text-primary/80",
                            )}
                          >
                            {choice.icon}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          );
        })}
      </div>
    </section>
  );
}
