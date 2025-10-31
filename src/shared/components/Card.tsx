interface CardProps {
  children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <div className="relative text-main-foreground bg-secondary-background border-2 border-border shadow-shadow shadow-border flex p-4">
      {children}
    </div>
  );
}
