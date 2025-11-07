import { FlowNode } from "../types/flowNode";
import { NodeTaskType } from "../types/nodeTask";

export function createFlowNode(
  nodeType: NodeTaskType,
  position?: { x: number; y: number }
): FlowNode {
  return {
    id: crypto.randomUUID(),
    position: position ?? { x: 0, y: 0 },
    data: {
      type: nodeType,
      inputs: {},
    },
  };
}
