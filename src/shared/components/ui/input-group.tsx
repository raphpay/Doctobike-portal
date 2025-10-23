"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/text-area";

import { cn } from "@/lib/utils";

// Main InputGroup container — neobrutalism style
function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group flex w-full items-center rounded-base border-2 border-border bg-secondary-background",
        "transition-all selection:bg-main selection:text-main-foreground",
        "focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2",
        "has-[>textarea]:flex-col has-[>textarea]:h-auto",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
}

// Addons (icons, text, or controls)
const inputGroupAddonVariants = cva(
  "flex items-center justify-center gap-2 text-sm font-medium text-foreground px-3 py-2 select-none",
  {
    variants: {
      align: {
        "inline-start": "order-first rounded-l-base border-r-0",
        "inline-end": "order-last rounded-r-base border-l-0",
        "block-start":
          "order-first w-full justify-start border-b-0 rounded-t-base",
        "block-end":
          "order-last w-full justify-start border-t-0 rounded-b-base",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
);

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) return;
        e.currentTarget.parentElement?.querySelector("input")?.focus();
      }}
      {...props}
    />
  );
}

// Buttons inside InputGroup
const inputGroupButtonVariants = cva(
  "flex items-center justify-center gap-2 text-sm font-semibold border-2 border-border rounded-base bg-main text-main-foreground hover:bg-main/90 active:translate-y-[2px] transition-transform",
  {
    variants: {
      size: {
        xs: "h-8 px-3",
        sm: "h-9 px-4",
        "icon-xs": "size-8 p-0",
        "icon-sm": "size-9 p-0",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
);

function InputGroupButton({
  className,
  type = "button",
  size = "sm",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size"> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      variant="noShadow"
      data-size={size}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  );
}

// Text addon (label-like inline text)
function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 px-3 text-sm font-medium text-foreground bg-main-foreground/10 border-2 border-border",
        className
      )}
      {...props}
    />
  );
}

// The actual input (inherits from your neobrutalist Input)
function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "flex-1 border-0 bg-transparent shadow-none rounded-none focus-visible:ring-0 px-3 py-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

// Textarea version — same look, but multiline
function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none border-0 bg-transparent shadow-none rounded-none px-3 py-3",
        "disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-0",
        className
      )}
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
};
