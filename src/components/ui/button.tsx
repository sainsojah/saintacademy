import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Stitch button set: primary / secondary / tonal / outline / ghost / link.
 * Hover lifts 2px, press settles back, arrow icons nudge via `group/btn`.
 */
const buttonVariants = cva(
  "group/btn inline-flex items-center justify-center gap-gutter-sm whitespace-nowrap rounded font-body font-medium " +
    "transition-[transform,background-color,border-color,color,opacity] duration-state-change ease-state-change " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface " +
    "active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-on-primary hover:-translate-y-0.5 hover:bg-primary/90",
        secondary:
          "bg-surface-container-low text-on-surface border border-outline-variant hover:bg-surface-container-high hover:border-primary/60",
        tonal:
          "bg-surface-container-high text-on-surface border border-outline-variant hover:border-primary hover:-translate-y-0.5",
        outline: "border border-outline-variant bg-transparent text-on-surface hover:border-primary hover:text-primary",
        ghost: "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
        link: "text-primary underline-offset-4 hover:underline px-0",
      },
      size: {
        sm: "px-3 py-1.5 text-label-sm",
        md: "px-gutter-md py-2.5 text-label-lg",
        lg: "px-gutter-lg py-3.5 text-label-lg",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
  },
);
Button.displayName = "Button";

/** Icon that nudges right when its parent Button is hovered. */
const nudge = "transition-transform duration-state-change ease-state-change group-hover/btn:translate-x-0.5";

export { Button, buttonVariants, nudge };
