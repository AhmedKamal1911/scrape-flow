import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FlowNode } from "@/lib/types/flowNode";
import { NodeTaskType } from "@/lib/types/nodeTask";
import { createFlowNode } from "@/lib/workflow/create-flow-node";
import { TaskRegistry } from "@/lib/workflow/task/task-registry";
import { useReactFlow } from "@xyflow/react";
import { BadgeDollarSign, Copy, Grip, Trash } from "lucide-react";
import React from "react";

export default function NodeHeader({
  taskType,
  nodeId,
}: {
  taskType: NodeTaskType;
  nodeId: string;
}) {
  const task = TaskRegistry[taskType];
  const { addNodes, deleteElements, getNode } = useReactFlow();
  return (
    <div className="flex gap-2 items-center justify-between p-2">
      <div className="flex items-center gap-1">
        <task.icon size={18} />
        <span className="font-semibold text-sm">{task.label}</span>
      </div>
      <div className="flex gap-2 items-center">
        {task.isEntryPoint && <Badge>Start Point</Badge>}
        <Badge className="text-xs">
          <BadgeDollarSign className="size-4!" />
          {task.credits}
        </Badge>
        {!task.isEntryPoint && (
          <div>
            <Button
              variant={"ghost"}
              size={"icon"}
              className=" cursor-pointer"
              onClick={() => {
                deleteElements({ nodes: [{ id: nodeId }] });
              }}
            >
              <Trash />
            </Button>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="cursor-pointer"
              onClick={() => {
                const node = getNode(nodeId) as FlowNode;

                const newXPosition = node.position.x;
                const newYPosition =
                  node.position.y + (node.measured?.height ?? 0) + 20;
                const newNode = createFlowNode(node.data.type, {
                  x: newXPosition,
                  y: newYPosition,
                });

                addNodes([newNode]);
              }}
            >
              <Copy />
            </Button>
          </div>
        )}
        <Button
          variant={"ghost"}
          className="drag-handler cursor-pointer size-fit p-1!"
        >
          <Grip className="size-6" />
        </Button>
      </div>
    </div>
  );
}
