import { requireAuth } from "@/lib/helper-utils/require-auth";
import prisma from "@/lib/prisma";

export async function getUserWorkflowPhaseDetailsUsecase(phaseId: string) {
  const { userId } = await requireAuth();
  return await prisma.executionPhase.findUnique({
    where: {
      id: phaseId,
      execution: {
        userId,
      },
    },
  });
}
