"use server";

import { getUserWorkflowPhaseDetailsUsecase } from "@/lib/dal";

export async function getWorkflowPhaseDetails(phaseId: string) {
  return await getUserWorkflowPhaseDetailsUsecase(phaseId);
}
