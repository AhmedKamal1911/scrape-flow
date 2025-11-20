import { requireAuth } from "@/lib/helper-utils";
import { getUserWorkflows } from "@/lib/queries/workflow/get-user-workflows";

export async function getUserWorkflowsUsecase() {
  const { userId } = await requireAuth();
  const userWorkflows = await getUserWorkflows({ userId });
  return userWorkflows;
}
