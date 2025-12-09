import { requireAuth } from "@/lib/helper-utils/require-auth";
import { getUserWorkflowExecutions } from "@/lib/queries/workflow/get-workflow-executions";

export async function getUserWorkflowExecutionsUsecase(workflowId: string) {
  const { userId } = await requireAuth();
  const workflowExecutions = await getUserWorkflowExecutions({
    userId,
    workflowId,
  });
  return workflowExecutions;
}
