import { NodeTaskInputType, NodeTaskType } from "@/lib/types/nodeTask";
import { WorkflowTask } from "@/lib/types/workflow";
import { GlobeIcon, LucideProps } from "lucide-react";

export const LaunchBrowserTask = {
  isEntryPoint: true,
  type: NodeTaskType.LAUNCH_BROWSER,
  label: "Launch Browser",
  icon: (props: LucideProps) => (
    <GlobeIcon className="stroke-rose-500" {...props} />
  ),
  inputs: [
    {
      type: NodeTaskInputType.STRING,
      name: "Website Url",
      placeholder: "ex: https://www.google.com",
      required: true,
      hideHandle: true,
    },
  ],
  outputs: [{ name: "Web page", type: NodeTaskInputType.BROWSER_INSTANCE }],
  credits: 5,
} satisfies WorkflowTask;
