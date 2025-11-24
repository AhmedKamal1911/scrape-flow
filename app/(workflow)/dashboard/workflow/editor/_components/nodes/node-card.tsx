"use client";
import { useFlowValidation } from "@/components/context/FlowInputsValidationContext";
import { cn } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";
import React, { ReactNode } from "react";

export default function NodeCard({
  children,
  nodeId,
  isSelected,
}: {
  children: ReactNode;
  nodeId: string;
  isSelected: boolean;
}) {
  const { getNode, setCenter } = useReactFlow();
  const { invalidInputs } = useFlowValidation();
  const isNodeHasInvalidInputs = invalidInputs.some(
    (node) => node.nodeId === nodeId
  );
  return (
    <div
      onDoubleClick={() => {
        const node = getNode(nodeId);
        if (!node) return;
        const { position, measured } = node;
        if (!position || !measured) return;
        const { width, height } = measured;
        const x = position.x + width! / 2;
        const y = position.y + height! / 2;
        setCenter(x, y);
      }}
      className={cn(
        "border-2 cursor-pointer rounded-sm border-accent w-[440px] flex flex-col  bg-card transition-colors",
        isSelected && "border-primary",
        isNodeHasInvalidInputs && "border-destructive"
      )}
    >
      {children}
    </div>
  );
}
