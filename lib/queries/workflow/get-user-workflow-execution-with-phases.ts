import prisma from "@/lib/prisma";

export async function getUserWorkflowExecutionWithPhases({
  executionId,
  userId,
}: {
  executionId: string;
  userId: string;
}) {
  return await prisma.workflowExecution.findUnique({
    where: {
      id: executionId,
      userId,
    },
    include: {
      phases: {
        orderBy: {
          number: "asc",
        },
      },
    },
  });
}
