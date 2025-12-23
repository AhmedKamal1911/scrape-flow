import { NodeTaskInputType, NodeTaskType } from "@/lib/types/nodeTask";
import { WorkflowTask } from "@/lib/types/workflow";
import { Webhook } from "lucide-react";

export const DeliverViaWebhookTask = {
  isEntryPoint: false,
  type: NodeTaskType.DELIVER_VIA_WEBHOOK,
  label: "Deliver via webhook",
  icon: (props) => <Webhook className="stroke-green-600" {...props} />,
  credits: 1,
  inputs: [
    {
      type: NodeTaskInputType.STRING,
      name: "Target URL",
      required: true,
      hideHandle: true,
    },
    {
      type: NodeTaskInputType.STRING,
      name: "Body",
      required: true,
      variant: "textarea",
    },
  ] as const,
  outputs: [] as const,
} satisfies WorkflowTask;
