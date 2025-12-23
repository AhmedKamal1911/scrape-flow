import { NodeTaskInputType, NodeTaskType } from "@/lib/types/nodeTask";
import { WorkflowTask } from "@/lib/types/workflow";
import { Database } from "lucide-react";

export const AddPropertyToJsonTask = {
  isEntryPoint: false,
  type: NodeTaskType.ADD_PROPERTY_TO_JSON,
  label: "Add property to JSON",
  icon: (props) => <Database className="stroke-pink-500" {...props} />,
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
      hideHandle: true,
    },
    {
      type: NodeTaskInputType.STRING,
      name: "Property value",
      required: true,
    },
  ] as const,
  outputs: [{ name: "Updated JSON", type: NodeTaskInputType.STRING }] as const,
} satisfies WorkflowTask;
