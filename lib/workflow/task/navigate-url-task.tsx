import { NodeTaskInputType, NodeTaskType } from "@/lib/types/nodeTask";
import { WorkflowTask } from "@/lib/types/workflow";
import { Link } from "lucide-react";

export const NavigateUrlTask = {
  isEntryPoint: false,
  type: NodeTaskType.NAVIGATE_URL,
  label: "Navigate Url",
  icon: (props) => <Link className="stroke-cyan-600" {...props} />,
  credits: 2,
  inputs: [
    {
      type: NodeTaskInputType.BROWSER_INSTANCE,
      name: "Web page",
      required: true,
    },
    {
      type: NodeTaskInputType.STRING,
      name: "URL",
      required: true,
      hideHandle: true,
    },
  ] as const,
  outputs: [
    {
      type: NodeTaskInputType.BROWSER_INSTANCE,
      name: "Web page",
    },
  ] as const,
} satisfies WorkflowTask;
