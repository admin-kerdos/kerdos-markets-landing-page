import * as React from "react";
import { cn } from "@/lib/utils";

type AccordionProps = React.HTMLAttributes<HTMLDivElement>;

type AccordionItemProps = React.DetailsHTMLAttributes<HTMLDetailsElement> & {
  "data-testid"?: string;
};

type AccordionTriggerProps = React.HTMLAttributes<HTMLElement>;

type AccordionContentProps = React.HTMLAttributes<HTMLDivElement>;

export function Accordion({ className, ...props }: AccordionProps) {
  return <div className={cn("space-y-2", className)} {...props} />;
}

export const AccordionItem = React.forwardRef<HTMLDetailsElement, AccordionItemProps>(
  ({ className, children, ...props }, ref) => (
    <details
      ref={ref}
      className={cn("group rounded-3xl border-b border-border pb-2", className)}
      {...props}
    >
      {children}
    </details>
  )
);

AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = React.forwardRef<HTMLElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <summary
      ref={ref}
      className={cn(
        "flex cursor-pointer list-none items-center gap-4 py-4 text-left text-base font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
      {...props}
    >
      {children}
      <span
        aria-hidden="true"
        className="ml-auto inline-flex h-3 w-3 rotate-45 border-r border-t border-current transition-transform group-open:-rotate-[135deg]"
      />
    </summary>
  )
);

AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      data-accordion-panel=""
      className={cn("overflow-hidden text-sm group-open:animate-accordion-down", className)}
      {...props}
    >
      <div className="pb-4 pt-0 text-foreground opacity-70">{children}</div>
    </div>
  )
);

AccordionContent.displayName = "AccordionContent";
