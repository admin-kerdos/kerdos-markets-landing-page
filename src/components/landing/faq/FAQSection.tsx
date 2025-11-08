import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ_ITEMS = ["faq-1", "faq-2", "faq-3"] as const;

export function FAQSection() {
  return (
    <div className="mx-auto w-full max-w-4xl rounded-[32px] border border-border bg-background p-6 shadow-sm">
      <Accordion>
        {FAQ_ITEMS.map((item, index) => (
          <AccordionItem key={item} data-testid={`faq-item-${index}`}>
            <AccordionTrigger aria-label="placeholder">
              <div className="flex flex-col gap-2" aria-hidden="true">
                <span className="h-2 w-28 rounded-full bg-black/10 dark:bg-white/20" />
                <span className="h-2 w-16 rounded-full bg-black/5 dark:bg-white/15" />
              </div>
            </AccordionTrigger>
            <AccordionContent aria-label="placeholder">
              <div className="space-y-2" aria-hidden="true">
                <span className="block h-2 rounded-full bg-black/5 dark:bg-white/15" />
                <span className="block h-2 rounded-full bg-black/5 dark:bg-white/15" />
                <span className="block h-2 w-3/4 rounded-full bg-black/5 dark:bg-white/15" />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
