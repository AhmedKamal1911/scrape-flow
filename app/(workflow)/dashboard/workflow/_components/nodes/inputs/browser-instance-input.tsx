import { StringInputFieldProps } from "@/lib/types/nodeTask";

export default function BrowserInstanceInput({
  inputProps,
  inputValue,
  updateNodeInputValue,
  disabled,
}: StringInputFieldProps) {
  return <div>{inputProps.name}</div>;
}
