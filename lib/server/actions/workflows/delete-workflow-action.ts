"use server";

import { isErrorType, isPrismaError } from "@/lib/helper-utils";
import prisma from "@/lib/prisma";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteWorkflowAction(workflowId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthnticated!");
  }
  try {
    await prisma.workflow.delete({
      where: {
        userId: userId,
        id: workflowId,
      },
    });
    revalidatePath("/workflows");
  } catch (error) {
    if (isPrismaError(error)) {
      throw new Error(
        "Sorry, something went wrong while deleting your workflow."
      );
    }
    if (isErrorType(error)) {
      throw new Error(error.message);
    }
    throw new Error("Internal Server Error");
  }
}
