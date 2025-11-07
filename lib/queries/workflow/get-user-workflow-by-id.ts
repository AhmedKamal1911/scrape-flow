import prisma from "@/lib/prisma";
import { isErrorType, isPrismaError } from "@/lib/helper-utils";

export async function GetUserWorkflowById(userId: string, workflowId: string) {
  try {
    const workflow = await prisma.workflow.findUnique({
      where: {
        userId,
        id: workflowId,
      },
    });
    if (!workflow)
      throw new Error("Something went wrong while fetching workflow.");
    if (workflow.userId !== userId) throw new Error("Unauthorized User.");
    return workflow;
  } catch (error) {
    if (isPrismaError(error)) {
      throw new Error("Sorry, something went wrong while loading your data.");
    }
    if (isErrorType(error)) {
      throw new Error(error.message);
    }
    throw new Error("Internal Server Error.");
  }
}
