"use server";

import { isErrorType, isPrismaError } from "@/lib/helper-utils";
import prisma from "@/lib/prisma";
import {
  createWorkflowSchema,
  WorkflowInputs,
} from "@/lib/validation/workflow";
import { auth } from "@clerk/nextjs/server";

export async function createWorkflowAction(inputs: WorkflowInputs) {
  const { success, data } = createWorkflowSchema.safeParse(inputs);
  if (!success) {
    throw new Error("Invalid Form Data");
  }
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthnticated!");
  }
  try {
    const isWorkflowExist = await prisma.workflow.findFirst({
      where: {
        name: data.name,
        userId: userId,
      },
    });
    if (isWorkflowExist) {
      throw new Error("Work Flow Already Exist!");
    }

    const result = await prisma.workflow.create({
      data: {
        userId,
        definition: "TODO",
        ...data,
      },
    });
    return { id: result.id };
  } catch (error) {
    if (isPrismaError(error)) {
      throw new Error(
        "Sorry, something went wrong while creating your workflow."
      );
    }
    if (isErrorType(error)) {
      throw new Error(error.message);
    }
    throw new Error("Internal Server Error");
  }
}
