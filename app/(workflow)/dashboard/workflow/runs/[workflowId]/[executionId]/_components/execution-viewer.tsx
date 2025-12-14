"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getUserWorkflowExecutionWithPhases } from "@/lib/queries/workflow/get-user-workflow-execution-with-phases";
import { getWorkflowExecution } from "@/lib/server/queries/workflows/get-workflow-execution";
import {
  ExecutionPhaseStatus,
  WorkflowExecutionStatus,
} from "@/lib/types/workflow";
import { formatDistanceToNow } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  CircleDashed,
  Clock,
  Coins,
  DollarSign,
  GitGraph,
  Loader,
  LucideIcon,
  MousePointerClick,
} from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";
import { datesToDurationString } from "@/lib/helper-utils/dates";
import { getPhasesTotalCost } from "@/lib/helper-utils/get-phases-total-cost";
import { getWorkflowPhaseDetails } from "@/lib/server/queries/workflows/get-workflow-phase-details";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ExecutionLog } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { LogLevel } from "@/lib/types/log";
import PhaseStatusBadge from "./phase-status-badge";
import CountUpWrapper from "@/app/(dashboard)/dashboard/_components/common/count-up-wrapper";

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
      q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 3000 : false,
  });

  const phaseDetails = useQuery({
    queryKey: ["phaseDetails", selectedPhase],
    enabled: selectedPhase !== null,
    queryFn: () => getWorkflowPhaseDetails(selectedPhase!),
  });
  const duration = datesToDurationString({
    completedAt: query.data?.completedAt,
    startedAt: query.data?.startedAt,
  });
  const creditsConsumed = getPhasesTotalCost({
    phases: query.data?.phases || [],
  });
  console.log({ creditsConsumed });
  const isRunning = query.data?.status === WorkflowExecutionStatus.RUNNING;

  useEffect(() => {
    const phases = query.data?.phases ?? [];
    if (phases.length === 0) return;

    const key = isRunning ? "startedAt" : "completedAt";

    const sorted = phases
      .filter((p) => p[key]) // شيل phases اللي مفيهاش التاريخ المطلوب
      .toSorted((a, b) => (a[key]! > b[key]! ? -1 : 1));

    if (sorted.length > 0) {
      setSelectedPhase(sorted[0].id);
    }
  }, [isRunning, query.data?.phases]);

  return (
    <div className="flex">
      <ExecutionViewerAside
        isRunning={isRunning}
        duration={duration}
        creditsConsumed={creditsConsumed}
        selectedPhase={selectedPhase}
        setSelectedPhase={setSelectedPhase}
        execution={query.data}
      />
      <div className="flex-1 bg-background p-4 border-r border-r-muted">
        {isRunning ? (
          <ExecutionRunningLoader />
        ) : (
          !selectedPhase && <NoPhaseSelected />
        )}
        {!isRunning && selectedPhase && phaseDetails.data && (
          <div className="container">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Badge
                  variant={"outline"}
                  className="capitalize gap-3 text-sm sm:text-md h-fit p-2"
                >
                  <div className="flex gap-1">
                    <DollarSign size={20} className="stroke-muted-foreground" />
                    <span>credits</span>
                  </div>
                  <span>{phaseDetails.data.creditsConsumed}</span>
                </Badge>
                <Badge
                  variant={"outline"}
                  className="capitalize gap-3 text-sm sm:text-md h-fit p-2"
                >
                  <div className="flex gap-1">
                    <Clock size={20} className="stroke-muted-foreground" />
                    <span>duration</span>
                  </div>
                  <span>{duration}</span>
                </Badge>
              </div>

              <ParamsViewer
                title="inputs"
                subTitle="phase related inputs"
                paramsJson={phaseDetails.data.inputs}
              />
              <ParamsViewer
                title="outputs"
                subTitle="phase related outputs"
                paramsJson={phaseDetails.data.outputs}
              />
              {phaseDetails.data.executionLogs.length !== 0 && (
                <LogsViewer logs={phaseDetails.data.executionLogs} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ExecutionViewerAside({
  execution,
  selectedPhase,
  setSelectedPhase,
  isRunning,
  duration,
  creditsConsumed,
}: {
  execution: ExecutionWithPhases;
  selectedPhase: string | null;
  setSelectedPhase: (phaseId: string) => void;
  isRunning: boolean;
  duration: string | null;
  creditsConsumed: number;
}) {
  console.log(execution?.status);

  return (
    <aside className="sticky top-[70px] w-[440px] min-w-[440px] max-w-[440px]  border-r-2 border-separate flex flex-col h-[calc(100vh-70px)] overflow-auto bg-sidebar">
      <div className="p-3">
        <ExecutionDetailBox
          icon={CircleDashed}
          label="status"
          value={
            <div className="flex gap-2 items-center">
              <PhaseStatusBadge
                status={execution?.status as ExecutionPhaseStatus}
              />

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
          value={<CountUpWrapper value={creditsConsumed} />}
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
              if (isRunning) return;
              setSelectedPhase(phase.id);
            }}
          >
            <div className="flex items-center gap-2">
              <Badge className="size-7 rounded-sm font-semibold text-lg">
                {i + 1}
              </Badge>
              <p className="flex-1 font-semibold">{phase.name}</p>
            </div>
            <PhaseStatusBadge status={phase.status as ExecutionPhaseStatus} />
          </Button>
        ))}
      </div>
    </aside>
  );
}

function ParamsViewer({
  title,
  subTitle,
  paramsJson,
}: {
  title: string;
  subTitle: string;
  paramsJson: string | null;
}) {
  const inputs = paramsJson ? JSON.parse(paramsJson) : undefined;
  return (
    <Card className="shadow-lg py-0 overflow-hidden gap-2 capitalize">
      <CardHeader className="rounded-lg rounded-b-none border-b py-4  bg-secondary/30">
        <CardTitle className=" text-base">{title}</CardTitle>
        <CardDescription className=" text-sm text-muted-foreground">
          {subTitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="py-3">
        <div className="flex flex-col gap-2">
          {!inputs || Object.keys(inputs).length === 0 ? (
            <p className="font-semibold">no params in this phase</p>
          ) : (
            Object.entries(inputs).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between items-center space-y-1"
              >
                <p className="text-sm text-muted-foreground flex-1 basis-1/3">
                  {key}
                </p>
                <Input
                  readOnly
                  className="flex-1 basis-2/3"
                  value={value as string}
                />
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
function LogsViewer({ logs }: { logs: ExecutionLog[] }) {
  return (
    <Card className="w-full p-0 capitalize gap-2 overflow-hidden">
      <CardHeader className="rounded-lg rounded-b-none border-b py-3  bg-secondary/30">
        <CardTitle className="text-base">logs</CardTitle>
        <CardDescription className=" text-sm text-muted-foreground">
          logs related to this phase
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="text-muted-foreground text-sm">
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id} className="text-muted-foreground">
                <TableCell width={190} className="text-xs p-1 pl-2">
                  {log.timestamp.toISOString()}
                </TableCell>
                <TableCell
                  width={80}
                  className={cn(
                    "uppercase text-xs font-bold p-1 pl-2",
                    (log.logLevel as LogLevel) === "error" &&
                      "text-destructive",
                    (log.logLevel as LogLevel) === "info" && "text-primary"
                  )}
                >
                  {log.logLevel}
                </TableCell>
                <TableCell className="text-sm flex-1 p-1 pl-2">
                  {log.message}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
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
      <div className=" flex items-center gap-2 capitalize">
        <Icon size={20} className="stroke-muted-foreground/80" />
        <span>{label}</span>
      </div>
      <div className="font-semibold capitalize">{value}</div>
    </div>
  );
}

function NoPhaseSelected() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-2 text-muted-foreground">
      <MousePointerClick className="size-8 text-primary" />
      <p className="text-xl italic font-bold capitalize">
        no phase selected yet
      </p>
      <span className="text-sm text-muted-foreground">
        Select a phase to view its details.
      </span>
    </div>
  );
}
function ExecutionRunningLoader() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="size-12 animate-spin rounded-full border-4 border-muted border-t-primary" />
        <span className="text-sm capitalize text-muted-foreground animate-pulse">
          run is in progress, please wait...
        </span>
      </div>
    </div>
  );
}
