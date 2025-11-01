import { cn } from "@/lib/utils";

interface CardProps {
  extraClassName?: string;
  children: React.ReactNode;
}

export default function Card({ children, extraClassName }: CardProps) {
  const baseClassName =
    "relative text-main-foreground bg-secondary-background border-2 border-border shadow-shadow shadow-border flex p-4";

  return <div className={cn(baseClassName, extraClassName)}>{children}</div>;
}
