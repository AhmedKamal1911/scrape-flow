import { requireAuth } from "@/lib/helper-utils/require-auth";
import prisma from "@/lib/prisma";

export async function getUserAvailableCreditsUsecase() {
  const { userId } = await requireAuth();
  return await prisma.userBalance.findUnique({ where: { userId } });
}
