import { TaskInput } from "@/lib/types/nodeTask";
import { cn } from "@/lib/utils";
import { Handle, Position } from "@xyflow/react";
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
  input: TaskInput;
  nodeId: string;
}) {
  return (
    <div className="flex p-3 bg-muted/50 w-full">
      <NodeInputField nodeId={nodeId} input={input} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          position={Position.Left}
          className={cn(
            "!bg-muted-foreground !-left-0 !border-2 !border-secondary  !size-4 z-10",
            HandleColor[input.type]
          )}
        />
      )}
    </div>
  );
}
