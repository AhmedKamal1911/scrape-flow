import { NodeTaskInputType } from "@/lib/types/nodeTask";

export const HandleColor: Record<NodeTaskInputType, string> = {
  BROWSER_INSTANCE: "!bg-cyan-500",
  STRING: "!bg-amber-500",
  SELECT: "!bg-rose-500",
  CREDENTIAL: "!bg-teal-500",
};
