import { Label } from "./label";
import { Textarea } from "./text-area";

interface LabelTextAreaProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function LabelTextArea({
  label,
  value,
  onChange,
  error,
}: LabelTextAreaProps) {
  return (
    <div className="flex flex-col text-start gap-4">
      <Label>{label}</Label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
      {error && <Label className="text-red-500">{error}</Label>}
    </div>
  );
}
