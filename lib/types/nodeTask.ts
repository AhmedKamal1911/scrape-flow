export enum NodeTaskType {
  LAUNCH_BROWSER = "LAUNCH_BROWSER",
}

export enum NodeTaskInputType {
  STRING = "STRING",
}

export type TaskInput = {
  name: string;
  type: NodeTaskInputType;
  placeholder?: string;
  required?: boolean;
  hideHandle?: boolean;
  value?: string;
  [key: string]: unknown;
};
