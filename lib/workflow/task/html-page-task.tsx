import { NodeTaskInputType, NodeTaskType } from "@/lib/types/nodeTask";
import { WorkflowTask } from "@/lib/types/workflow";

import { Code } from "lucide-react";

export const HtmlPageTask = {
  isEntryPoint: false,
  type: NodeTaskType.PAGE_TO_HTML,
  label: "Get html from page",
  icon: (props) => <Code className="stroke-rose-600" {...props} />,
  inputs: [
    {
      type: NodeTaskInputType.BROWSER_INSTANCE,
      name: "Web page",
      required: true,
    },
  ] as const,
  outputs: [
    { name: "Html", type: NodeTaskInputType.STRING },
    { name: "Web page", type: NodeTaskInputType.BROWSER_INSTANCE },
  ] as const,
  credits: 2,
} satisfies WorkflowTask;
