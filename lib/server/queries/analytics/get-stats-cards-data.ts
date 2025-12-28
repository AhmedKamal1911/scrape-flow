"use server";
import { periodToDateRange } from "@/lib/helper-utils/dates";
import {
  isErrorType,
  isPrismaError,
} from "@/lib/helper-utils/error-type-guards";
import { requireAuth } from "@/lib/helper-utils/require-auth";
import prisma from "@/lib/prisma";
import { Period } from "@/lib/types/analytics";
import { WorkflowExecutionStatus } from "@/lib/types/workflow";
const { COMPLETED, FAILED } = WorkflowExecutionStatus;
export async function getStatsCardsData(period: Period) {
  try {
    const { userId } = await requireAuth();

    const dateRange = periodToDateRange(period);
    const executions = await prisma.workflowExecution.findMany({
      where: {
        userId,
        startedAt: {
          gte: dateRange.startDate,
          lte: dateRange.endDate,
        },
        status: {
          in: [COMPLETED, FAILED],
        },
      },
      select: {
        creditsConsumed: true,
        phases: {
          where: {
            creditsConsumed: {
              not: null,
            },
          },
          select: { creditsConsumed: true },
        },
      },
    });
    const stats = {
      workflowExecutions: executions.length,
      creditsConsumed: 0,
      phaseExecutions: 0,
    };
    stats.creditsConsumed = executions.reduce(
      (sum, execution) => sum + execution.creditsConsumed,
      0
    );
    stats.phaseExecutions = executions.reduce(
      (sum, execution) => sum + execution.phases.length,
      0
    );
    return stats;
  } catch (error) {
    if (isPrismaError(error)) {
      throw new Error(
        "Sorry, something went wrong while getting your cards data."
      );
    }
    if (isErrorType(error)) {
      throw new Error(error.message);
    }
    throw new Error("Internal Server Error");
  }
}
