import { Label } from "./label";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./input-group";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";

type Props = {
  id: string;
  label: string;
  onChange: (value: string) => void;
};

export default function SecureInput({ id, label, onChange }: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div id={id} className="flex flex-col text-start gap-4">
      <Label htmlFor="password">{label}</Label>
      <InputGroup>
        <InputGroupInput
          type={showPassword ? "text" : "password"}
          onChangeCapture={(e) => onChange(e.currentTarget.value)}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label={showPassword ? "Hide Password" : "Show Password"}
            title={showPassword ? "Hide Password" : "Show Password"}
            size="icon-xs"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <IconEyeOff /> : <IconEye />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
