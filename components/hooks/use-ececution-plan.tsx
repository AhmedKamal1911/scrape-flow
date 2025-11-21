import { FlowNode } from "@/lib/types/flowNode";
import { FlowToExecutionPlan } from "@/lib/workflow/execution-plan";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

export default function useExecutionPlan() {
  const { toObject } = useReactFlow();
  const generateExecuationPlan = useCallback(() => {
    const { nodes, edges } = toObject();
    const { executionPlan } = FlowToExecutionPlan(nodes as FlowNode[], edges);
    return executionPlan;
  }, [toObject]);
  return generateExecuationPlan;
}
