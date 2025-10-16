import { ErrorLabel } from "@/shared/components/ui/error-label";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@radix-ui/react-label";
import * as React from "react";

type InputWithLabelProps = React.ComponentProps<"input"> & {
  label: string;
  error?: string;
};

export function InputWithLabel({
  label,
  error,
  id,
  ...props
}: InputWithLabelProps) {
  const inputId = id ?? React.useId();

  return (
    <div className="flex flex-col w-full max-w-sm items-start gap-2">
      <Label htmlFor={inputId}>{label}</Label>
      <Input id={inputId} {...props} />
      {error && <ErrorLabel>{error}</ErrorLabel>}
    </div>
  );
}
