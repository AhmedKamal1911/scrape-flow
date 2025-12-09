import prisma from "@/lib/prisma";

export async function getUserWorkflowExecutions({
  workflowId,
  userId,
}: {
  workflowId: string;
  userId: string;
}) {
  return await prisma.workflowExecution.findMany({
    where: {
      workflowId,
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
