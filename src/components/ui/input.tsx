import * as React from "react";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded border border-outline-variant bg-surface-container-lowest px-gutter-md py-3 font-body text-body-md text-on-surface " +
  "placeholder:text-on-surface-variant/70 transition-[border-color,box-shadow] duration-state-change ease-state-change " +
  "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => <input ref={ref} className={cn(field, className)} {...props} />,
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => <textarea ref={ref} className={cn(field, "min-h-24 resize-y", className)} {...props} />,
);
Textarea.displayName = "Textarea";

/** Native <select> (best mobile UX) styled to match the inputs. */
export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <div className="relative">
      <select ref={ref} className={cn(field, "appearance-none pr-10", className)} {...props}>
        {children}
      </select>
      <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  ),
);
Select.displayName = "Select";

export function Field({ label, htmlFor, children, className }: { label: string; htmlFor: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-gutter-xs", className)}>
      <label htmlFor={htmlFor} className="font-body text-label-lg text-on-surface">{label}</label>
      {children}
    </div>
  );
}
