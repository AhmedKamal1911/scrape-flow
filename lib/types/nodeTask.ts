export enum NodeTaskType {
  LAUNCH_BROWSER = "LAUNCH_BROWSER",
  PAGE_TO_HTML = "PAGE_TO_HTML",
  EXTRACT_TEXT_FROM_ELEMENT = "EXTRACT_TEXT_FROM_ELEMENT",
  FILL_INPUT = "FILL_INPUT",
  ELEMENT_CLICKER = "ELEMENT_CLICKER",
  WAIT_FOR_ELEMENT = "WAIT_FOR_ELEMENT",
  DELIVER_VIA_WEBHOOK = "DELIVER_VIA_WEBHOOK",
  EXTRACT_DATA_WITH_AI = "EXTRACT_DATA_WITH_AI",
  READ_PROPERTY_FROM_JSON = "READ_PROPERTY_FROM_JSON",
  ADD_PROPERTY_TO_JSON = "ADD_PROPERTY_TO_JSON",
  NAVIGATE_URL = "NAVIGATE_URL",
  SCROLL_TO_ELEMENT = "SCROLL_TO_ELEMENT",
}

export enum NodeTaskInputType {
  STRING = "STRING",
  BROWSER_INSTANCE = "BROWSER_INSTANCE",
  SELECT = "SELECT",
  CREDENTIAL = "CREDENTIAL",
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
