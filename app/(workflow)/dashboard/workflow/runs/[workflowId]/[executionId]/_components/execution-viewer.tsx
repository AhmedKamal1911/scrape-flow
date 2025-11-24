"use client";

import { getUserWorkflowExecutionWithPhases } from "@/lib/queries/workflow/get-user-workflow-execution-with-phases";
import { WorkflowExecutionStatus } from "@/lib/types/workflow";

import { useQuery } from "@tanstack/react-query";
import { Calendar, CircleDashed } from "lucide-react";
import React from "react";
export type ExecutionWithPhases = Awaited<
  ReturnType<typeof getUserWorkflowExecutionWithPhases>
>;
type Props = {
  initialData: ExecutionWithPhases;
};

export default function ExecutionViewer({ initialData }: Props) {
  const query = useQuery({
    queryKey: ["execution", initialData?.id],
    queryFn: async () => {
      const res = await fetch(`/api/execution/${initialData!.id}`, {
        method: "POST",
      });
      const response = await res.json();
      if (!res.ok || !response.ok) {
        throw new Error(response.error || "Failed to fetch execution");
      }
      return response.data as ExecutionWithPhases;
    },
    initialData, // ✨ مهم هنا
    refetchInterval: (q) =>
      q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false,
  });

  return (
    <div className="flex size-full">
      <aside className="w-[440px] min-w-[440px] max-w-[440px] border-r-2 border-separate flex flex-grow flex-col overflow-hidden">
        <div className="py-4 px-2">
          <div className="flex justify-between items-center py-2 px-4 text-sm">
            <div className="text-muted-foreground flex items-center gap-2">
              <CircleDashed size={20} className="stroke-muted-foreground.80" />
              <span>Status</span>
            </div>
            <div className="font-semibold capitalize flex gap-2 items-center">
              {query.data?.status}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center py-2 px-4 text-sm">
          <div className="text-muted-foreground flex items-center gap-2">
            <Calendar size={20} className="stroke-muted-foreground/80" />
            <span>Started at</span>
          </div>
          <div>{query.data?.startedAt ? new Date().getDate() : "-"}</div>
          {/* TODO: add formate distance to now fn from date-fns */}
        </div>
      </aside>
    </div>
  );
}
