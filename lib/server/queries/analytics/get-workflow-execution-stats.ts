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

import { eachDayOfInterval, format } from "date-fns";
const dateFormat = "yyyy-MM-dd";
type Stats = Record<
  string,
  {
    success: number;
    failed: number;
  }
>;
export async function getWorkflowExecutionStats(period: Period) {
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
      },
    });
    const stats: Stats = eachDayOfInterval({
      start: dateRange.startDate,
      end: dateRange.endDate,
    })
      .map((date) => format(date, dateFormat))
      .reduce((acc: Stats, date) => {
        acc[date] = {
          success: 0,
          failed: 0,
        };
        return acc;
      }, {});

    executions.forEach((execution) => {
      const date = format(execution.startedAt!, dateFormat);
      if (execution.status === WorkflowExecutionStatus.COMPLETED) {
        stats[date].success += 1;
      }
      if (execution.status === WorkflowExecutionStatus.FAILED) {
        stats[date].failed += 1;
      }
    });
    const resultData = Object.entries(stats).map(([date, data]) => ({
      date,
      ...data,
    }));
    return resultData;
  } catch (error) {
    if (isPrismaError(error)) {
      throw new Error(
        "Sorry, something went wrong while getting your workflowexecution stats."
      );
    }
    if (isErrorType(error)) {
      throw new Error(error.message);
    }
    throw new Error("Internal Server Error");
  }
}
