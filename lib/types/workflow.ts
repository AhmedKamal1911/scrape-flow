import { Edge, ReactFlowJsonObject } from "@xyflow/react";
import { FlowNode } from "./flowNode";

export enum WorkflowStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export type WorkflowDefinition = ReactFlowJsonObject<FlowNode, Edge>;
