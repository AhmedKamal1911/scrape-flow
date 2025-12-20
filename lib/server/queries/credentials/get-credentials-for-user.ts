"use server";

import {
  isErrorType,
  isPrismaError,
} from "@/lib/helper-utils/error-type-guards";
import { requireAuth } from "@/lib/helper-utils/require-auth";
import prisma from "@/lib/prisma";

export async function getCredentialsForUser() {
  try {
    const { userId } = await requireAuth();
    return prisma.credential.findMany({
      where: { userId },
      orderBy: {
        name: "asc",
      },
    });
  } catch (error) {
    if (isPrismaError(error)) {
      throw new Error(
        "Sorry, something went wrong while getting your credentials."
      );
    }
    if (isErrorType(error)) {
      throw new Error(error.message);
    }
    throw new Error("Internal Server Error");
  }
}
