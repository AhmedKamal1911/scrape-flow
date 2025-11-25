import React, { Suspense } from "react";
import WorkflowTopbar from "../../../editor/_components/workflow-topbar/workflow-topbar";

import { LoaderCircle } from "lucide-react";
import { getUserWorkflowExecutionUsecase } from "@/lib/dal";
import { notFound } from "next/navigation";
import ExecutionViewer from "./_components/execution-viewer";
import { waitFor } from "@/lib/helper-utils/wait-for";

export default async function ExecutionViewerPage({
  params,
}: PageProps<"/dashboard/workflow/runs/[workflowId]/[executionId]">) {
  const { executionId, workflowId } = await params;
  return (
    <div className="min-h-screen">
      <WorkflowTopbar
        title="workflow run details"
        subTitle={`RUN ID: ${executionId}`}
        workflowId={workflowId}
        hideButtons
      />

      <Suspense
        fallback={
          <div className="flex w-full h-screen items-center justify-center stroke-primary">
            <LoaderCircle className="animate-spin size-12 text-primary" />
          </div>
        }
      >
        <ExecutionViewerWrapper executionId={executionId} />
      </Suspense>
    </div>
  );
}

async function ExecutionViewerWrapper({
  executionId,
}: {
  executionId: string;
}) {
  const workflowExecution = await getUserWorkflowExecutionUsecase(executionId);
  if (!workflowExecution) return notFound();
  // TODO: dont forget to make notfound page for workfloweditor page and this page
  await waitFor(5000);
  return <ExecutionViewer initialData={workflowExecution} />;
}
