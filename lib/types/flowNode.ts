import { Node } from "@xyflow/react";
import { NodeTaskType } from "./nodeTask";

export type FlowNodeData = {
  type: NodeTaskType;
  inputs: Record<string, string>;
};
export type FlowNode = Node & {
  data: FlowNodeData;
};
