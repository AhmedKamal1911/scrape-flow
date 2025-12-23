import { NodeTaskInputType, NodeTaskType } from "@/lib/types/nodeTask";
import { WorkflowTask } from "@/lib/types/workflow";
import { ArrowUpFromLine } from "lucide-react";

export const ScrollToElementTask = {
  isEntryPoint: false,
  type: NodeTaskType.SCROLL_TO_ELEMENT,
  label: "Scroll to element",
  icon: (props) => <ArrowUpFromLine className="stroke-cyan-600" {...props} />,
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
  ] as const,
  outputs: [
    {
      type: NodeTaskInputType.BROWSER_INSTANCE,
      name: "Web page",
    },
  ] as const,
} satisfies WorkflowTask;
