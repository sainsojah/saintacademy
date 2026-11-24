import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-gutter-sm rounded-full font-mono text-mono-sm uppercase whitespace-nowrap",
  {
    variants: {
      variant: {
        status: "px-3 py-1 bg-surface-container-high border border-outline-variant text-primary",
        solid: "px-2.5 py-0.5 bg-primary text-on-primary",
        outline: "px-3 py-1 bg-surface-container-high border border-outline-variant text-primary tabular-nums",
      },
    },
    defaultVariants: { variant: "status" },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
