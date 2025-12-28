"use server";
import {
  isErrorType,
  isPrismaError,
} from "@/lib/helper-utils/error-type-guards";
import { requireAuth } from "@/lib/helper-utils/require-auth";
import prisma from "@/lib/prisma";
import { Period } from "@/lib/types/analytics";

export async function getPeriods() {
  try {
    const { userId } = await requireAuth();

    const result = await prisma.workflowExecution.aggregate({
      where: { userId },
      _min: { startedAt: true },
    });

    if (!result._min.startedAt) {
      return [];
    }

    const startDate = result._min.startedAt;
    const endDate = new Date();

    const periods: Period[] = [];

    const cursor = new Date(startDate.getFullYear(), startDate.getMonth(), 1);

    while (cursor <= endDate) {
      periods.push({
        year: cursor.getFullYear(),
        month: cursor.getMonth(),
      });

      cursor.setMonth(cursor.getMonth() + 1);
    }

    return periods;
  } catch (error) {
    if (isPrismaError(error)) {
      throw new Error(
        "Sorry, something went wrong while getting your analytics."
      );
    }
    if (isErrorType(error)) {
      throw new Error(error.message);
    }
    throw new Error("Internal Server Error");
  }
}
