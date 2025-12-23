import { NodeTaskInputType, NodeTaskType } from "@/lib/types/nodeTask";
import { WorkflowTask } from "@/lib/types/workflow";
import { FileSearch } from "lucide-react";

export const ReadPropertyFromJsonTask = {
  isEntryPoint: false,
  type: NodeTaskType.READ_PROPERTY_FROM_JSON,
  label: "JSON property Reader",
  icon: (props) => <FileSearch className="stroke-pink-500" {...props} />,
  credits: 1,
  inputs: [
    {
      type: NodeTaskInputType.STRING,
      name: "JSON",
      required: true,
    },
    {
      type: NodeTaskInputType.STRING,
      name: "Property name",
      required: true,
    },
  ] as const,
  outputs: [
    { name: "Property value", type: NodeTaskInputType.STRING },
  ] as const,
} satisfies WorkflowTask;
