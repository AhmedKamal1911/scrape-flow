"use server";

import { getUserWorkflowUsecase } from "@/lib/dal";
import { isErrorType, isPrismaError } from "@/lib/helper-utils";

import {
  WorkflowDefinition,
  WorkflowExecutionPlan,
} from "@/lib/types/workflow";
import { flowToExecutionPlan } from "@/lib/workflow/execution-plan";

export async function executeWorkflowAction(form: {
  workflowId: string;
  flowDefinition?: string;
}) {
  const { workflowId, flowDefinition } = form;

  if (!workflowId) {
    throw new Error("WorkflowId is Required");
  }

  try {
    const workflow = await getUserWorkflowUsecase(workflowId);
    if (!workflow) {
      throw new Error("Workflow not found!");
    }
    if (!flowDefinition) {
      throw new Error("Flow definition is not defined");
    }

    const parsedFlow: WorkflowDefinition = JSON.parse(flowDefinition);

    const result = flowToExecutionPlan(parsedFlow.nodes, parsedFlow.edges);
    if (result.error) {
      throw new Error("Flow definition not valid!");
    }

    if (!result.executionPlan) {
      throw new Error("No execution plan generated");
    }
    const executionPlan = result.executionPlan;
    console.log("execution plan server action", executionPlan);
  } catch (error) {
    if (isPrismaError(error)) {
      throw new Error(
        "Sorry, something went wrong while executing your workflow."
      );
    }
    if (isErrorType(error)) {
      throw new Error(error.message);
    }
    throw new Error("Internal Server Error");
  }
}
