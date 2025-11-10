"use client";
import { NodeTaskType } from "@/lib/types/nodeTask";
import { createFlowNode } from "@/lib/workflow/create-flow-node";
import { Workflow } from "@prisma/client";
import {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import React, { useEffect } from "react";
import { CustomNodeComponent } from "./node/custom-node-component";
import { FlowNode } from "@/lib/types/flowNode";
import { WorkflowDefinition } from "@/lib/types/workflow";
const nodeTypes = {
  FlowScrapeNode: CustomNodeComponent,
};
const fitViewOptions = { padding: 3 };
export default function FlowEditor({ workflow }: { workflow: Workflow }) {
  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNode>([
    createFlowNode(NodeTaskType.LAUNCH_BROWSER),
  ]);
  const [edges, setEdges, onEdgeChange] = useEdgesState<Edge>([]);
  const { setViewport } = useReactFlow();
  useEffect(() => {
    if (!workflow.definition) return;

    try {
      const flow: WorkflowDefinition = JSON.parse(workflow.definition);
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
    } catch (error) {
      console.error("Failed to parse workflow definition:", error);
    }
  }, [setEdges, setNodes, workflow.definition]);
  return (
    <main className="size-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgeChange}
        nodeTypes={nodeTypes}
        fitViewOptions={fitViewOptions}
        fitView
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Lines} gap={12} size={1} />
      </ReactFlow>
    </main>
  );
}
