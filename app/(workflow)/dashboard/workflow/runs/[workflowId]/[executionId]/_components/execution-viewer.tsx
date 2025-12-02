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
import React, { ReactNode, useState } from "react";
import { datesToDurationString } from "@/lib/helper-utils/dates";
import { getPhasesTotalCost } from "@/lib/helper-utils/get-phases-total-cost";
import { getWorkflowPhaseDetails } from "@/lib/server/queries/workflows/get-workflow-phase-details";

export type ExecutionWithPhases = Awaited<
  ReturnType<typeof getUserWorkflowExecutionWithPhases>
>;
type Props = {
  initialData: ExecutionWithPhases;
};

export default function ExecutionViewer({ initialData }: Props) {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const query = useQuery({
    queryKey: ["execution", initialData?.id],
    queryFn: async () => getWorkflowExecution(initialData!.id),
    initialData,
    refetchInterval: (q) =>
      q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false,
  });

  const phaseDetails = useQuery({
    queryKey: ["phaseDetails", selectedPhase],
    enabled: selectedPhase !== null,
    queryFn: () => getWorkflowPhaseDetails(selectedPhase!),
  });
  return (
    <div className="flex">
      <ExecutionViewerAside
        selectedPhase={selectedPhase}
        setSelectedPhase={setSelectedPhase}
        execution={query.data}
      />
      <div className="flex-1 overflow-y-auto bg-background p-4 border-r border-r-muted">
        <pre>{JSON.stringify(phaseDetails.data, null, 4)}</pre>
      </div>
    </div>
  );
}

function ExecutionViewerAside({
  execution,
  selectedPhase,
  setSelectedPhase,
}: {
  execution: ExecutionWithPhases;
  selectedPhase: string | null;
  setSelectedPhase: (phaseId: string) => void;
}) {
  const duration = datesToDurationString({
    completedAt: execution?.completedAt,
    startedAt: execution?.startedAt,
  });
  console.log({ duration });
  const creditsConsumed = getPhasesTotalCost({
    phases: execution?.phases || [],
  });
  return (
    <aside className="sticky top-[70px] w-[440px] min-w-[440px] max-w-[440px]  border-r-2 border-separate flex flex-col h-[calc(100vh-70px)] overflow-auto bg-sidebar">
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
          value={creditsConsumed}
        />
      </div>

      <div className="border-y border-separate p-2 flex items-center justify-center gap-2 capitalize text-muted-foreground text-md font-semibold">
        <GitGraph />
        <span>phases</span>
      </div>
      <div className="p-3 flex flex-col gap-1">
        {execution?.phases.map((phase, i) => (
          <Button
            className="w-full justify-between text-start h-fit cursor-pointer"
            variant={selectedPhase === phase.id ? "secondary" : "sidebarItem"}
            key={i}
            onClick={() => {
              if (execution.status === WorkflowExecutionStatus.RUNNING) return;
              setSelectedPhase(phase.id);
            }}
          >
            <div className="flex items-center gap-2">
              <Badge className="size-7 rounded-sm font-semibold text-lg">
                {i + 1}
              </Badge>
              <p className="flex-1 font-semibold">{phase.name}</p>
            </div>
            <span className="text-muted-foreground text-xs font-semibold">
              {phase.status}
            </span>
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
