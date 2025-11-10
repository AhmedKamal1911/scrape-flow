"use server";

import { isErrorType, isPrismaError } from "@/lib/helper-utils";
import prisma from "@/lib/prisma";
import { getUserWorkflowById } from "@/lib/queries/workflow/get-user-workflow-by-id";
import { WorkflowStatus } from "@/lib/types/workflow";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function updateWorkflowAction({
  workflowId,
  definition,
}: {
  workflowId: string;
  definition: string;
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthnticated!");
  }
  try {
    const workflow = await getUserWorkflowById(userId, workflowId);
    if (workflow.status !== WorkflowStatus.DRAFT) {
      throw new Error("Only draft workflows can be updated.");
    }
    await prisma.workflow.update({
      where: { id: workflow.id, userId },
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
