import { FlowNode } from "../types/flowNode";
import { TaskRegistry } from "./task/task-registry";

export function calculateWorkflowCost(nodes: FlowNode[]) {
  return nodes.reduce((acc, node) => {
    return acc + TaskRegistry[node.data.type].credits;
  }, 0);
}
