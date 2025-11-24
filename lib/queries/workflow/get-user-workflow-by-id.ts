import prisma from "@/lib/prisma";
export async function getUserWorkflowById({
  userId,
  workflowId,
}: {
  userId: string;
  workflowId: string;
}) {
  return await prisma.workflow.findUnique({
    where: {
      userId,
      id: workflowId,
    },
  });
}
