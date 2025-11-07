"use client";
import { NodeTaskType } from "@/lib/types/nodeTask";
import { createFlowNode } from "@/lib/workflow/create-flow-node";
import { Workflow } from "@prisma/client";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import React from "react";

export default function FlowEditor({ workflow }: { workflow: Workflow }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    createFlowNode(NodeTaskType.LAUNCH_BROWSER),
  ]);
  const [edges, setEdges, onEdgeChange] = useEdgesState([]);
  return (
    <main className="size-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgeChange}
        fitView
      >
        <Controls position="top-left" />
        <Background
          variant={BackgroundVariant.Dots}
          // bgColor="#dfdfdf"
          gap={12}
          size={1}
        />
      </ReactFlow>
    </main>
  );
}
