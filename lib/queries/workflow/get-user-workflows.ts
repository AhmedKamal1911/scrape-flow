import prisma from "@/lib/prisma";

export async function getUserWorkflows({ userId }: { userId: string }) {
  return await prisma.workflow.findMany({
    where: {
      userId,
    },
  });
}
