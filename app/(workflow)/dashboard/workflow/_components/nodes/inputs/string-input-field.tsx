"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StringInputFieldProps } from "@/lib/types/nodeTask";
import React, { useEffect, useState } from "react";

type RenderFieldProps = Omit<StringInputFieldProps, "inputValue"> & {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  type: "textarea" | "input";
};
function renderField({
  type,
  disabled,
  inputProps,
  setValue,
  updateNodeInputValue,
  value,
}: RenderFieldProps) {
  return {
    input: (
      <Input
        className="bg-background!"
        disabled={disabled}
        id={inputProps.name}
        placeholder="Enter The Value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => updateNodeInputValue(e.target.value)}
      />
    ),
    textarea: (
      <Textarea
        className="max-h-[100px] bg-background!"
        disabled={disabled}
        id={inputProps.name}
        placeholder="Enter The Value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => updateNodeInputValue(e.target.value)}
      />
    ),
  }[type];
}
export default function StringInputField({
  inputProps,
  inputValue,
  disabled,
  updateNodeInputValue,
}: StringInputFieldProps) {
  const [value, setValue] = useState(inputValue);
  useEffect(() => {
    setValue(inputValue);
  }, [inputValue]);
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor={inputProps.name} className="text-xs w-fit">
        {inputProps.name}

        {inputProps.required && <span className="text-red-500">*</span>}
      </Label>
      {renderField({
        type: inputProps.variant === "textarea" ? inputProps.variant : "input",
        disabled,
        inputProps,
        value: value,
        setValue,
        updateNodeInputValue,
      })}
      {inputProps.placeholder && (
        <p className="text-muted-foreground text-xs">
          {inputProps.placeholder}
        </p>
      )}
    </div>
  );
}
