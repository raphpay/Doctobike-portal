import { Button } from "@/shared/components/ui/button";

type Props = {
  icon: React.ReactNode;
  title: string;
  disabled?: boolean;
  onClick: () => void;
};

export function ButtonWithIcon({
  icon,
  title,
  disabled = false,
  onClick,
}: Props) {
  return (
    <Button disabled={disabled} onClick={onClick} variant="outline" size="sm">
      {icon} {title}
    </Button>
  );
}
