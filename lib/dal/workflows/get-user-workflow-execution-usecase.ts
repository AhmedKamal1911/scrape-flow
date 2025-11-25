import { requireAuth } from "@/lib/helper-utils/require-auth";
import { getUserWorkflowExecutionWithPhases } from "@/lib/queries/workflow/get-user-workflow-execution-with-phases";

export async function getUserWorkflowExecutionUsecase(executionId: string) {
  const { userId } = await requireAuth();
  const workflowExecution = await getUserWorkflowExecutionWithPhases({
    userId,
    executionId,
  });
  return workflowExecution;
}
