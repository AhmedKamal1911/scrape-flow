"use client";
import { Button } from "@/components/ui/button";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  useReactFlow,
} from "@xyflow/react";
import { X } from "lucide-react";
import React from "react";

export default function DeletableEdge(props: EdgeProps) {
  const [edgePath, labelX, labelY] = getSmoothStepPath(props);
  const { setEdges } = useReactFlow();
  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={props.markerEnd}
        style={{
          ...props.style,
          strokeWidth: 2.5,
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%,-50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
        >
          <Button
            variant={"destructive"}
            size={"icon"}
            className="rounded-full size-7 cursor-pointer"
            onClick={() => {
              setEdges((edges) => edges.filter((edge) => edge.id !== props.id));
            }}
          >
            <X />
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
