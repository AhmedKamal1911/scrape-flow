import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

import { WorkflowStatus } from "@/lib/types/workflow";
import { Workflow } from "@prisma/client";
import {
  Coins,
  CornerDownRight,
  FileText,
  MoveRight,
  PlayCircle,
  ShuffleIcon,
} from "lucide-react";
import Link from "next/link";
import WorkflowOptions from "./workflow-options";
import RunWorkflowBtn from "./run-workflow-btn";
import SchedulerDialog from "./scheduler-dialog";
import TooltipWrapper from "@/components/common/tooltip-wrapper";
import { cn } from "@/lib/utils";

type Props = {
  workflow: Workflow;
};

const statusColors: Record<WorkflowStatus, string> = {
  DRAFT: "bg-yellow-500/20 text-yellow-600",
  PUBLISHED: "bg-primary/20 text-primary",
};

export default function WorkflowCard({ workflow }: Props) {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;

  return (
    <Card>
      <CardContent className="p-3 flex justify-between items-center gap-3">
        <div className="flex gap-2 min-[400px]:gap-4">
          <div
            className={`flex items-center justify-center rounded-full size-7 min-[400px]:size-10 ${
              statusColors[workflow.status as WorkflowStatus]
            }`}
          >
            {isDraft ? (
              <FileText className="size-4 min-[400px]:size-6" />
            ) : (
              <PlayCircle className="size-4 min-[400px]:size-6" />
            )}
          </div>

          <div
            className={cn(`flex flex-col gap-2`, isDraft && "justify-center")}
          >
            <div className="flex items-center gap-3 min-[400px]:gap-4">
              <CardTitle className="min-[400px]:text-xl capitalize">
                <Link
                  href={`/dashboard/workflow/editor/${workflow.id}`}
                  className="hover:underline"
                >
                  {workflow.name}
                </Link>
              </CardTitle>

              <Badge
                className={cn(
                  "capitalize rounded-sm  font-semibold text-xs",
                  isDraft ? "bg-yellow-500/90" : "bg-green-600/90"
                )}
              >
                {isDraft ? "draft" : "published"}
              </Badge>
            </div>
            {!isDraft && (
              <ScheduleSection
                cron={workflow.cron}
                workflowId={workflow.id}
                creditsConsumption={workflow.creditsCost}
              />
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isDraft && (
            <div className="max-[530px]:hidden block">
              <RunWorkflowBtn workflowId={workflow.id} />
            </div>
          )}
          <Link
            className={buttonVariants({
              variant: "ghost",
              className: `hidden! min-[530px]:flex! items-center gap-2 capitalize`,
            })}
            href={`/dashboard/workflow/editor/${workflow.id}`}
          >
            <ShuffleIcon size={16} />
            edit
          </Link>

          <WorkflowOptions workflow={workflow} />
        </div>
      </CardContent>
    </Card>
  );
}

function ScheduleSection({
  creditsConsumption,
  cron,
  workflowId,
}: {
  creditsConsumption: number;
  cron: string | null;
  workflowId: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <CornerDownRight className="size-4 text-muted-foreground" />
      <SchedulerDialog cronValue={cron} workflowId={workflowId} />
      <div className="flex gap-2 items-center">
        <MoveRight className="size-4 text-muted-foreground" />
        <TooltipWrapper content="Full Run Credit Consumption">
          <div className="flex items-center gap-2">
            <Badge
              variant={"outline"}
              className="space-x-2 text-muted-foreground rounded-sm"
            >
              <Coins className="size-4" />
              <span className="text-sm">{creditsConsumption}</span>
            </Badge>
          </div>
        </TooltipWrapper>
      </div>
    </div>
  );
}
