"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TaskInput } from "@/lib/types/nodeTask";
import React, { useState } from "react";

export default function StringInputField({
  inputProps,
  inputValue,
  updateNodeInputValue,
}: {
  inputProps: TaskInput;
  inputValue: string;
  updateNodeInputValue: (val: string) => void;
}) {
  const [value, setValue] = useState(inputValue ?? "");
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor={inputProps.name} className="text-xs w-fit">
        {inputProps.name}

        {inputProps.required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={inputProps.name}
        className="bg-white!"
        placeholder="shadcn"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => updateNodeInputValue(e.target.value)}
      />
      {inputProps.placeholder && (
        <p className="text-muted-foreground text-xs">
          {inputProps.placeholder}
        </p>
      )}
    </div>
  );
}
