import { NodeTaskInputType, NodeTaskType } from "@/lib/types/nodeTask";
import { Code, LucideProps } from "lucide-react";

export const ExtractTextFromElementTask = {
  isEntryPoint: false,
  type: NodeTaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: "Extract text from element",
  icon: (props: LucideProps) => <Code className="stroke-rose-600" {...props} />,
  inputs: [
    {
      type: NodeTaskInputType.STRING,
      name: "Html",
      required: true,
      variant: "textarea",
    },
    {
      type: NodeTaskInputType.STRING,
      name: "Selector",
      required: true,
    },
  ],
  outputs: [{ name: "Extracted text", type: NodeTaskInputType.STRING }],
};
