"use server";

import { getUserWorkflowExecutionUsecase } from "@/lib/dal";

export async function getWorkflowExecution(executionId: string) {
  const execution = await getUserWorkflowExecutionUsecase(executionId);
  return execution;
}
