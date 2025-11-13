"use client";
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
        "border-3 cursor-pointer rounded-sm border-accent w-[400px] flex flex-col  bg-card transition-colors",
        isSelected && "border-primary"
      )}
    >
      {children}
    </div>
  );
}
