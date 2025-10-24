import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  htmlFor?: string;
  label: string;
  id?: string;
  type?: string;
  onChangeCapture: Dispatch<SetStateAction<string>>;
};

const LabelInput = ({
  htmlFor,
  label,
  id,
  type = "text",
  onChangeCapture,
}: Props) => {
  return (
    <div className="flex flex-col text-start gap-4">
      <Label htmlFor={htmlFor}>{label}</Label>
      <Input
        id={id}
        type={type}
        onChangeCapture={(e) => onChangeCapture(e.currentTarget.value)}
        required={true}
      />
    </div>
  );
};

export default LabelInput;
