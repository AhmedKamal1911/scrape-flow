import { NodeTaskInputType, NodeTaskType } from "@/lib/types/nodeTask";
import { WorkflowTask } from "@/lib/types/workflow";

import { Edit } from "lucide-react";

export const FillInputTask = {
  isEntryPoint: false,
  type: NodeTaskType.FILL_INPUT,
  label: "Fill input",
  icon: (props) => <Edit className="stroke-cyan-600" {...props} />,
  credits: 1,
  inputs: [
    {
      type: NodeTaskInputType.BROWSER_INSTANCE,
      name: "Web page",
      required: true,
    },
    {
      type: NodeTaskInputType.STRING,
      name: "Selector",
      required: true,
    },
    {
      type: NodeTaskInputType.STRING,
      name: "Value",
      required: true,
    },
  ] as const,
  outputs: [
    { name: "Web page", type: NodeTaskInputType.BROWSER_INSTANCE },
  ] as const,
} satisfies WorkflowTask;
