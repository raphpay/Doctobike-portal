import { Button } from "./ui/button";

interface TopMainContainerBarProps {
  title: string;
  buttonTitle?: string;
  action?: () => void;
}

export default function TopMainContainerBar({
  title,
  buttonTitle,
  action,
}: TopMainContainerBarProps) {
  return (
    <div className="flex w-full p-4 justify-between">
      <h1 className="text-2xl font-bold">{title}</h1>

      {buttonTitle && action && <Button onClick={action}>{buttonTitle}</Button>}
    </div>
  );
}
