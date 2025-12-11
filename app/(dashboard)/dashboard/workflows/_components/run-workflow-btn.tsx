"use client";
import { Button } from "@/components/ui/button";
import { useRunWorkflow } from "@/hooks/use-run-workflow";
import { Play } from "lucide-react";

export default function RunWorkflowBtn({ workflowId }: { workflowId: string }) {
  const { runWorkflow, isRunning } = useRunWorkflow(workflowId);
  return (
    <Button
      variant={"ghost"}
      className="capitalize"
      disabled={isRunning}
      onClick={runWorkflow}
    >
      <Play size={16} />
      {isRunning ? "running..." : "run"}
    </Button>
  );
}
