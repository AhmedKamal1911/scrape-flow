import { TaskInputs } from "@/lib/types/nodeTask";
import { cn } from "@/lib/utils";
import { Handle, Position } from "@xyflow/react";
import React, { ReactNode } from "react";
import { HandleColor } from "../../common";

export default function NodeOutputsContainer({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="flex flex-col divide-y border-t-1">{children}</div>;
}

export function NodeOutput({ output }: { output: TaskInputs }) {
  return (
    <div className="flex p-3  justify-end relative bg-secondary">
      <p className="text-xs text-muted-foreground font-semibold">
        {output.name}
      </p>
      <Handle
        id={output.name}
        type="source"
        position={Position.Right}
        className={cn(
          "!bg-muted-foreground !-right-0 !border-2 !border-secondary  !size-4",
          HandleColor[output.type]
        )}
      />
    </div>
  );
}
