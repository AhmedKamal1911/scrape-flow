export enum NodeTaskType {
  LAUNCH_BROWSER = "LAUNCH_BROWSER",
  PAGE_TO_HTML = "PAGE_TO_HTML",
  EXTRACT_TEXT_FROM_ELEMENT = "EXTRACT_TEXT_FROM_ELEMENT",
  FILL_INPUT = "FILL_INPUT",
  ELEMENT_CLICKER = "ELEMENT_CLICKER",
  WAIT_FOR_ELEMENT = "WAIT_FOR_ELEMENT",
  DELIVER_VIA_WEBHOOK = "DELIVER_VIA_WEBHOOK",
}

export enum NodeTaskInputType {
  STRING = "STRING",
  BROWSER_INSTANCE = "BROWSER_INSTANCE",
  SELECT = "SELECT",
}
type OptionType = {
  label: string;
  value: string;
};
export type TaskInputs = {
  name: string;
  type: NodeTaskInputType;
  placeholder?: string;
  required?: boolean;
  hideHandle?: boolean;
  value?: string;
  options?: OptionType[];
  [key: string]: unknown;
};

export type StringInputFieldProps = {
  inputProps: TaskInputs;
  inputValue: string;
  disabled?: boolean;
  updateNodeInputValue: (val: string) => void;
};
