import { NodeTaskInputType, NodeTaskType } from "@/lib/types/nodeTask";
import { WorkflowTask } from "@/lib/types/workflow";
import { Clock2 } from "lucide-react";

export const WaitForElementTask = {
  isEntryPoint: false,
  type: NodeTaskType.WAIT_FOR_ELEMENT,
  label: "Wait for element",
  icon: (props) => <Clock2 className="stroke-amber-500" {...props} />,
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
    {
      type: NodeTaskInputType.SELECT,
      name: "Visibility",
      required: true,
      hideHandle: true,
      options: [
        { label: "Visible", value: "visible" },
        { label: "Hidden", value: "hidden" },
      ],
    },
  ] as const,
  outputs: [
    { name: "Web Page", type: NodeTaskInputType.BROWSER_INSTANCE },
  ] as const,
} satisfies WorkflowTask;
