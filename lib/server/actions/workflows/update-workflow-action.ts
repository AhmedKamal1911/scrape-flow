"use server";

import { getUserWorkflowUsecase } from "@/lib/dal";
import {
  isErrorType,
  isPrismaError,
} from "@/lib/helper-utils/error-type-guards";

import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/lib/types/workflow";

import { revalidatePath } from "next/cache";

export async function updateWorkflowAction({
  workflowId,
  definition,
}: {
  workflowId: string;
  definition: string;
}) {
  const workflow = await getUserWorkflowUsecase(workflowId);

  if (!workflow)
    throw new Error("Workflow you are trying to update is not found!");
  try {
    if (workflow.status !== WorkflowStatus.DRAFT) {
      throw new Error("Only draft workflows can be updated.");
    }
    await prisma.workflow.update({
      where: { id: workflow.id, userId: workflow.userId },
      data: { definition },
    });
    revalidatePath("/dashboard/workflows");
    return workflow;
  } catch (error) {
    if (isPrismaError(error)) {
      throw new Error(
        "Sorry, something went wrong while updating your workflow."
      );
    }
    if (isErrorType(error)) {
      throw new Error(error.message);
    }
    throw new Error("Internal Server Error");
  }
}
