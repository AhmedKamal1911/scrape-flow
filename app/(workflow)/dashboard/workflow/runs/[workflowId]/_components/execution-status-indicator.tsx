import { WorkflowExecutionStatus } from "@/lib/types/workflow";
import { cn } from "@/lib/utils";
import React from "react";

const statusIndicatorColors: Record<WorkflowExecutionStatus, string> = {
  PENDING: "bg-slate-500",
  RUNNING: "bg-yellow-500",
  COMPLETED: "bg-emerald-500",
  FAILED: "bg-destructive",
};

export default function ExecutionStatusIndicator({
  status,
}: {
  status: WorkflowExecutionStatus;
}) {
  return (
    <div
      className={cn("size-2.5 rounded-full", statusIndicatorColors[status])}
    />
  );
}

const statusLabelColors: Record<WorkflowExecutionStatus, string> = {
  PENDING: "text-slate-500",
  RUNNING: "text-yellow-500",
  COMPLETED: "text-emerald-500",
  FAILED: "text-destructive",
};
export function ExecutionStatusLabel({
  status,
}: {
  status: WorkflowExecutionStatus;
}) {
  return <span className={cn(statusLabelColors[status])}>{status}</span>;
}
