"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import type { AnswerBlock } from "@/lib/i18n";

type FeedbackChoice = "up" | "down" | null;

const helpfulIcons = {
  up: <ThumbsUp className="h-4 w-4" />,
  down: <ThumbsDown className="h-4 w-4" />
};

const renderBlock = (block: AnswerBlock, index: number) => {
  if (block.type === "paragraph") {
    return <p key={`paragraph-${index}`}>{block.text}</p>;
  }

  if (block.type === "list") {
    return (
      <ul key={`list-${index}`} className="list-disc space-y-2 pl-5">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return null;
};

export function FAQSection() {
  const { t } = useLanguage();
  const faqItems = t.faq.items;
  const [openId, setOpenId] = useState<string>("");
  const [feedback, setFeedback] = useState<Record<string, FeedbackChoice>>(() =>
    Object.fromEntries(faqItems.map((item) => [item.id, null]))
  );

  useEffect(() => {
    setOpenId("");
    setFeedback(Object.fromEntries(faqItems.map((item) => [item.id, null])));
  }, [faqItems]);

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
        <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">{t.faq.title}</h2>
        <p className="mt-7 text-base text-muted-foreground">{t.faq.intro}</p>
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
                      {item.answer.map((block, idx) => renderBlock(block, idx))}

                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <p className="font-medium text-foreground">{t.faq.feedbackPrompt}</p>
                        {(Object.keys(helpfulIcons) as Array<Exclude<FeedbackChoice, null>>).map((choice) => (
                          <button
                            key={choice}
                            type="button"
                            data-testid={`feedback-${choice}-${item.id}`}
                            aria-label={choice === "up" ? t.faq.helpful.up : t.faq.helpful.down}
                            aria-pressed={selected === choice}
                            onClick={() => handleFeedback(item.id, choice)}
                            className={cn(
                              "inline-flex items-center justify-center rounded-full p-1 transition",
                              selected === choice ? "text-primary" : "text-muted-foreground hover:text-primary/80"
                            )}
                          >
                            {helpfulIcons[choice]}
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
