import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

import { WorkflowStatus } from "@/lib/types/workflow";
import { Workflow } from "@prisma/client";
import { FileText, PlayCircle, ShuffleIcon } from "lucide-react";
import Link from "next/link";
import WorkflowOptions from "./workflow-options";

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

          <div className="flex items-center gap-3 min-[400px]:gap-4">
            <CardTitle className="min-[400px]:text-xl capitalize">
              <Link href={`/workflow/editor/${workflow.id}`}>
                {workflow.name}
              </Link>
            </CardTitle>
            {isDraft && (
              <Badge className="capitalize rounded-sm bg-yellow-500/90 font-semibold max-[400px]:text-[11px]">
                draft
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className:
                "hidden! min-[400px]:flex! items-center gap-2 h-fit py-1 capitalize",
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
