import prisma from "@/lib/prisma";
import { isPrismaError } from "@/lib/helper-utils";
import { auth } from "@clerk/nextjs/server";

export async function GetUserWorkflows() {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("unauthenticated!");
    }

    return await prisma.workflow.findMany({
      where: {
        userId,
      },
    });
  } catch (error) {
    if (isPrismaError(error)) {
      throw new Error("Sorry, something went wrong while loading your data.");
    }
    throw new Error("Something went wrong while fetching workflows.");
  }
}
