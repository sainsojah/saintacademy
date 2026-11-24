import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Cards sit on surface-container-low and step up a tonal tier on hover.
 * No heavy shadows: hairline outline + a 4px lift.
 */
const cardVariants = cva("rounded-lg border bg-card text-card-foreground", {
  variants: {
    variant: {
      static: "border-outline-variant",
      interactive:
        "border-outline-variant transition-[transform,border-color,background-color] duration-card-hover ease-card-hover " +
        "hover:-translate-y-1 hover:border-primary hover:bg-surface-container",
      featured:
        "border-2 border-primary transition-transform duration-card-hover ease-card-hover hover:-translate-y-1",
      lift: "border-outline-variant transition-transform duration-card-hover ease-card-hover hover:-translate-y-1",
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
