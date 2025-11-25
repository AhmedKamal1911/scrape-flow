"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getUserWorkflowExecutionWithPhases } from "@/lib/queries/workflow/get-user-workflow-execution-with-phases";
import { getWorkflowExecution } from "@/lib/server/queries/workflows/get-workflow-execution";
import { WorkflowExecutionStatus } from "@/lib/types/workflow";
import { formatDistanceToNow } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  CheckCircle,
  CircleDashed,
  Clock,
  Coins,
  GitGraph,
  Loader,
  LucideIcon,
} from "lucide-react";
import React, { ReactNode } from "react";
import { datesToDurationString } from "@/lib/helper-utils/dates";

export type ExecutionWithPhases = Awaited<
  ReturnType<typeof getUserWorkflowExecutionWithPhases>
>;
type Props = {
  initialData: ExecutionWithPhases;
};

export default function ExecutionViewer({ initialData }: Props) {
  const query = useQuery({
    queryKey: ["execution", initialData?.id],
    queryFn: async () => getWorkflowExecution(initialData!.id),
    initialData, // ✨ مهم هنا
    refetchInterval: (q) =>
      q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false,
  });

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <ExecutionViewerAside execution={query.data} />
        <div className="flex-1 overflow-y-auto bg-background p-4 border-r border-r-muted">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="size-20 bg-gray-500 mb-3" />
          ))}
        </div>
      </div>
    </>
  );
}

function ExecutionViewerAside({
  execution,
}: {
  execution: ExecutionWithPhases;
}) {
  const duration = datesToDurationString({
    completedAt: execution?.completedAt,
    startedAt: execution?.startedAt,
  });
  return (
    <aside className="w-[440px] min-w-[440px] max-w-[440px] bg-sidebar border-r-2 border-separate flex flex-grow flex-col overflow-hidden">
      <div className="p-3">
        <ExecutionDetailBox
          icon={CircleDashed}
          label="status"
          value={
            <div className="flex gap-2 items-center">
              <CheckCircle className="text-green-500" size={20} />
              {execution?.status}
            </div>
          }
        />
        <ExecutionDetailBox
          icon={Calendar}
          label="started at"
          value={
            <span>
              {execution?.startedAt
                ? formatDistanceToNow(new Date(execution.startedAt), {
                    addSuffix: true,
                  })
                : "-"}
            </span>
          }
        />

        {/* TODO: add formate distance to now fn from date-fns */}

        <ExecutionDetailBox
          icon={Clock}
          label="duration"
          value={
            duration ? duration : <Loader className="animate-spin" size={20} />
          }
        />
        <ExecutionDetailBox
          icon={Coins}
          label="credits consumed"
          value={"TODO"}
        />
      </div>

      <div className="border-y border-separate p-2 flex items-center justify-center gap-2 capitalize text-muted-foreground text-md font-semibold">
        <GitGraph />
        <span>phases</span>
      </div>
      <div className="p-3 flex flex-col gap-1 h-full overflow-auto">
        {execution?.phases.map((phase, i) => (
          <Button
            className="w-full justify-between text-start h-fit"
            variant={"sidebarItem"}
            key={i}
          >
            <Badge className="size-7 rounded-sm font-semibold text-lg">
              {i + 1}
            </Badge>
            <p className="flex-1 font-semibold">{phase.name}</p>
          </Button>
        ))}
      </div>
    </aside>
  );
}

function ExecutionDetailBox({
  value,
  icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
}) {
  const Icon = icon;
  return (
    <div className="flex justify-between items-center text-sm px-2 py-3">
      <div className="text-muted-foreground flex items-center gap-2 capitalize">
        <Icon size={20} className="stroke-muted-foreground/80" />
        <span>{label}</span>
      </div>
      <div className="font-semibold capitalize">{value}</div>
    </div>
  );
}
