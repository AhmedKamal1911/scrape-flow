import { Edge, Node, ReactFlowJsonObject } from "@xyflow/react";
import { FlowNode } from "./flowNode";
import { LucideProps } from "lucide-react";
import { NodeTaskType, TaskInputs as TaskInputs } from "./nodeTask";

export enum WorkflowStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export type WorkflowDefinition = ReactFlowJsonObject<FlowNode, Edge>;

export type WorkflowTask = {
  isEntryPoint?: boolean;
  type: NodeTaskType;
  label: string;
  icon: React.FC<LucideProps>;
  inputs: TaskInputs[];
  outputs: TaskInputs[];
  credits: number;
};

export type WorkflowExecutionPlan = {
  phase: number;
  nodes: Node[];
};
