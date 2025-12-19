import { NodeTaskInputType, NodeTaskType } from "@/lib/types/nodeTask";
import { WorkflowTask } from "@/lib/types/workflow";
import { MouseIcon } from "lucide-react";

export const ElementClickerTask = {
  isEntryPoint: false,
  type: NodeTaskType.ELEMENT_CLICKER,
  label: "Element Click",
  icon: (props) => <MouseIcon className="stroke-cyan-600" {...props} />,
  credits: 1,
  inputs: [
    {
      type: NodeTaskInputType.BROWSER_INSTANCE,
      name: "Web Page",
      required: true,
      variant: "textarea",
    },
    {
      type: NodeTaskInputType.STRING,
      name: "Selector",
      required: true,
      variant: "input",
    },
  ] as const,
  outputs: [
    { name: "Web Page", type: NodeTaskInputType.BROWSER_INSTANCE },
  ] as const,
} satisfies WorkflowTask;
