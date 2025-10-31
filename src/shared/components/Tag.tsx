import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import * as React from "react";

// Définis les variants avec `cva`
const tagVariants = cva(
  "absolute -top-8 -right-8 text-xs font-bold uppercase tracking-wide border-2 shadow-shadow px-3 py-1",
  {
    variants: {
      variant: {
        warning: "text-warning-foreground bg-chart-3",
        success: "text-success-foreground bg-chart-1",
        error: "text-error-foreground bg-chart-4",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  },
);

// Définis les props du composant
interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {
  text: string;
}

// Composant Tag
export default function Tag({ text, variant, className, ...props }: TagProps) {
  return (
    <div className={cn(tagVariants({ variant, className }))} {...props}>
      {text}
    </div>
  );
}
