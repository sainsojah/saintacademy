import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge needs to know our design-system tokens, otherwise it treats
 * `text-mono-lg` (a font size) as a colour and drops it next to `text-primary`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      spacing: [
        "gutter-xs", "gutter-sm", "gutter-md", "gutter-lg", "gutter-xl",
        "section", "section-mobile", "page-margin", "page-margin-mobile",
      ],
    },
    classGroups: {
      "font-size": [
        {
          text: [
            "display-lg", "display-lg-mobile", "display-md", "display-md-mobile",
            "headline-lg", "headline-lg-mobile", "headline-md", "title-lg", "title-md",
            "body-lg", "body-md", "body-sm", "label-lg", "label-sm", "mono-lg", "mono-sm",
          ],
        },
      ],
      duration: [{ duration: ["state-change", "card-hover", "surface-enter"] }],
      ease: [{ ease: ["state-change", "card-hover", "surface-enter"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
