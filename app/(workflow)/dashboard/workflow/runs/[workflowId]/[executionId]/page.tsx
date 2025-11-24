import React, { Suspense } from "react";
import WorkflowTopbar from "../../../editor/_components/workflow-topbar/workflow-topbar";
import { waitFor } from "@/lib/helper-utils";
import { LoaderCircle } from "lucide-react";
import { getUserWorkflowExecutionUsecase } from "@/lib/dal";
import { notFound } from "next/navigation";
import ExecutionViewer from "./_components/execution-viewer";

export default async function ExecutionViewerPage({
  params,
}: PageProps<"/dashboard/workflow/runs/[workflowId]/[executionId]">) {
  const { executionId, workflowId } = await params;
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <WorkflowTopbar
        title="workflow editor"
        subTitle={`RUN ID: ${executionId}`}
        workflowId={workflowId}
        hideButtons
      />
      <section className="flex h-full overflow-auto">
        <Suspense
          fallback={
            <div className="flex w-full items-center justify-center stroke-primary">
              <LoaderCircle className="animate-spin size-12 text-primary" />
            </div>
          }
        >
          <ExecutionViewerWrapper executionId={executionId} />
        </Suspense>
      </section>
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
  // await waitFor(5000);
  return <ExecutionViewer initialData={workflowExecution} />;
}
