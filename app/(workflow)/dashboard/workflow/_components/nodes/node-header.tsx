import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NodeTaskType } from "@/lib/types/nodeTask";
import { TaskRegistry } from "@/lib/workflow/task/task-registry";
import { BadgeDollarSign, Grip } from "lucide-react";
import React from "react";

export default function NodeHeader({ taskType }: { taskType: NodeTaskType }) {
  const task = TaskRegistry[taskType];
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
          TODO
        </Badge>
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
