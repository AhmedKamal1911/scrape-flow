import { Edge, Node, ReactFlowJsonObject } from "@xyflow/react";
import { FlowNode } from "./flowNode";
import { LucideProps } from "lucide-react";
import { NodeTaskType, TaskInputs as TaskInputs } from "./nodeTask";

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
  phaseNumber: number;
  nodes: Node[];
};

// all enums
export enum WorkflowStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export enum WorkflowExecutionStatus {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}
export enum ExecutionPhaseStatus {
  CREATED = "CREATED",
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export enum WorkflowExecutionTrigger {
  "MANUAL" = "MANUAL",
}
