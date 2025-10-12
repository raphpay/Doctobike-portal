import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/shared/components/ui/input-group";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

import { useState, type Dispatch, type SetStateAction } from "react";

type Props = {
  onChangeText: Dispatch<SetStateAction<string>>;
};

const SecureTextInput = ({ onChangeText }: Props) => {
  const [isSecure, setIsSecure] = useState<boolean>(false);

  return (
    <InputGroup>
      <InputGroupInput
        type={isSecure ? "password" : "text"}
        onChangeCapture={(e) => onChangeText(e.currentTarget.value)}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          aria-label="Copy"
          title="Copy"
          size="icon-xs"
          onClick={() => {
            setIsSecure(!isSecure);
          }}
        >
          {isSecure ? <IconEyeOff /> : <IconEye />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
};

export default SecureTextInput;
