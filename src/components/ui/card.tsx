import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Flat cards: hairline outline on surface-container-low, colour change on hover.
 * No shadows, no movement.
 */
const cardVariants = cva("rounded-lg border bg-card text-card-foreground", {
  variants: {
    variant: {
      static: "border-outline-variant",
      interactive:
        "border-outline-variant transition-[border-color,background-color] duration-card-hover ease-card-hover hover:border-primary hover:bg-surface-container",
      featured: "border-2 border-primary",
      lift: "border-outline-variant transition-colors duration-card-hover ease-card-hover hover:border-outline",
    },
  },
  defaultVariants: { variant: "static" },
});

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, variant, ...props }, ref) => (
  <div ref={ref} className={cn(cardVariants({ variant }), className)} {...props} />
));
Card.displayName = "Card";

export { Card, cardVariants };
