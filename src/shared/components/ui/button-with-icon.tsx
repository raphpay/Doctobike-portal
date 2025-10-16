import { Button } from "@/shared/components/ui/button";

type Props = {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  title: string;
  disabled?: boolean;
  onClick: () => void;
};

export function ButtonWithIcon({
  leftIcon,
  rightIcon,
  title,
  disabled = false,
  onClick,
}: Props) {
  return (
    <Button disabled={disabled} onClick={onClick} variant="outline" size="sm">
      {leftIcon} {title} {rightIcon}
    </Button>
  );
}
