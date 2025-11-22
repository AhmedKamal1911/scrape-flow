import { requireAuth } from "@/lib/helper-utils";
import { getUserWorkflowById } from "@/lib/queries/workflow/get-user-workflow-by-id";

export async function getUserWorkflowUsecase(workflowId: string) {
  const { userId } = await requireAuth();
  const workflow = await getUserWorkflowById({ userId, workflowId });
  return workflow;
}
