import { NodeTaskInputType, NodeTaskType } from "@/lib/types/nodeTask";
import { WorkflowTask } from "@/lib/types/workflow";
import { Brain } from "lucide-react";

export const ExtractDataWithAiTask = {
  isEntryPoint: false,
  type: NodeTaskType.EXTRACT_DATA_WITH_AI,
  label: "Extract data with ai",
  icon: (props) => <Brain className="stroke-rose-600" {...props} />,
  credits: 4,
  inputs: [
    {
      type: NodeTaskInputType.STRING,
      name: "Content",
      required: true,
      variant: "textarea",
    },
    {
      type: NodeTaskInputType.CREDENTIAL,
      name: "Credentials",
      required: true,
    },
    {
      type: NodeTaskInputType.STRING,
      name: "Prompt",
      required: true,
      variant: "textarea",
    },
  ] as const,
  outputs: [
    { name: "Extracted data", type: NodeTaskInputType.STRING },
  ] as const,
} satisfies WorkflowTask;
