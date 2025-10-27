import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

type Props = {
  htmlFor?: string;
  label: string;
  id?: string;
  type?: string;
  onChange: (value: string) => void;
  error?: string;
};

const LabelInput = ({
  htmlFor,
  label,
  id,
  type = "text",
  onChange,
  error,
}: Props) => {
  return (
    <div className="flex flex-col text-start gap-4">
      <Label htmlFor={htmlFor}>{label}</Label>
      <Input
        id={id}
        type={type}
        onChange={(e) => onChange(e.currentTarget.value)}
        required={true}
      />
      {error && <Label className="text-red-500">{error}</Label>}
    </div>
  );
};

export default LabelInput;
