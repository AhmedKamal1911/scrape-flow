"use client";

import { Workflow } from "@prisma/client";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import React, { DragEvent, useCallback, useMemo } from "react";
import { CustomNodeComponent } from "./nodes/custom-node-component";
import { FlowNode } from "@/lib/types/flowNode";
import { WorkflowDefinition } from "@/lib/types/workflow";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { createFlowNode } from "@/lib/workflow/create-flow-node";
import { NodeTaskType } from "@/lib/types/nodeTask";
import DeletableEdge from "./deletable-edge";
const nodeTypes = {
  FlowScrapeNode: CustomNodeComponent,
};
const edgeTypes = {
  default: DeletableEdge,
};
const fitViewOptions = { padding: 1 };
export default function FlowEditor({ workflow }: { workflow: Workflow }) {
  const { screenToFlowPosition, updateNodeData } = useReactFlow();
  const workflowParsed = useMemo(() => {
    const definition: WorkflowDefinition = JSON.parse(workflow.definition);
    return definition;
    // TODO:create tojson and build with trycatch and also make zod schema
  }, [workflow.definition]);
  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNode>(
    workflowParsed.nodes ?? []
  );
  const [edges, setEdges, onEdgeChange] = useEdgesState<Edge>(
    workflowParsed.edges ?? []
  );

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
  const onDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      const taskType = e.dataTransfer.getData(
        "application/nodesFlow"
      ) as NodeTaskType;
      if (typeof taskType === undefined || !taskType) return;
      const position = screenToFlowPosition({
        x: e.clientX,
        y: e.clientY,
      });
      const newTaskNode = createFlowNode(taskType, position);
      setNodes((nodes) => nodes.concat(newTaskNode));
    },
    [screenToFlowPosition, setNodes]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
      if (!connection.targetHandle) return;
      const node = nodes.find((n) => n.id === connection.target);
      if (!node) return;
      const nodeInputs = node.data.inputs;

      updateNodeData(node.id, {
        inputs: { ...nodeInputs, [connection.targetHandle]: "" },
      });
      console.log({ nodeInputs });
    },
    [nodes, setEdges, updateNodeData]
  );
  return (
    <main className="size-full flex-1">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgeChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        fitViewOptions={fitViewOptions}
        fitView
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background
          variant={BackgroundVariant.Lines}
          gap={12}
          size={1}
          className="bg-secondary!"
          color="var(--sidebar-accent)"
        />

        <SidebarTrigger
          variant={"default"}
          className="absolute top-31 left-3.5 opacity-100! hover:opacity-100! z-100 bg-primary/80 rounded-sm cursor-pointer"
          size={"icon"}
        />
      </ReactFlow>
    </main>
  );
}
