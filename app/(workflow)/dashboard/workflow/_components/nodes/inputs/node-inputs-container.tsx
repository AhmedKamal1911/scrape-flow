import { TaskInputs } from "@/lib/types/nodeTask";
import { cn } from "@/lib/utils";
import { Handle, Position, useEdges } from "@xyflow/react";
import React, { ReactNode } from "react";
import NodeInputField from "../node-input-field";
import { HandleColor } from "../../common";

export default function NodeInputsContainer({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="flex flex-col  divide-y">{children}</div>;
}

export function NodeInput({
  input,
  nodeId,
}: {
  input: TaskInputs;
  nodeId: string;
}) {
  const edges = useEdges();
  const isConnected = edges.some((edge) => {
    return edge.target === nodeId && edge.targetHandle === input.name;
  });
  // REMEMBER: think about the isConnected and how it works
  return (
    <div className="flex p-3 bg-muted/50 w-full relative">
      <NodeInputField nodeId={nodeId} input={input} isConnected={isConnected} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          position={Position.Left}
          isConnectable={!isConnected}
          className={cn(
            "!bg-muted-foreground !-left-0 !border-2 !border-secondary  !size-4 z-10",
            HandleColor[input.type]
          )}
        />
      )}
    </div>
  );
}
