"use server";

import { getUserWorkflowExecutionsUsecase } from "@/lib/dal";

export async function getWorkflowExecutions(workflowId: string) {
  return await getUserWorkflowExecutionsUsecase(workflowId);
}
