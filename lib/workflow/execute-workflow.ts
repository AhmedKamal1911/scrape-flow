import "server-only";
import prisma from "../prisma";

import {
  ExecutionPhaseStatus,
  WorkflowExecutionStatus,
  WorkflowTask,
} from "../types/workflow";
import { waitFor } from "../helper-utils/wait-for";
import { ExecutionPhase } from "@prisma/client";
import { FlowNode } from "../types/flowNode";
import { TaskRegistry } from "./task/task-registry";
import { TaskExecutorRegistry } from "./task-executor/registry";
import { Environment, ExecutionEnv } from "../types/executor";
import { NodeTaskInputType } from "../types/nodeTask";
import { Browser, Page } from "puppeteer";
import { Edge } from "@xyflow/react";

type WorkflowExecutionWithPhasesType = Awaited<
  ReturnType<typeof getWorkflowExecutionWithPhases>
>;
export async function executeWorkflow(executionId: string) {
  const execution = await getWorkflowExecutionWithPhases(executionId);
  const executionEnv: Environment = { phases: {} };
  const edges: Edge[] = JSON.parse(execution.definition).edges;
  await initializeWorkflowExecution({
    executionId,
    workflowId: execution.workflowId,
  });
  await initializeExecutionPhaseStatuses(execution);
  const creditsConsumed = 0;
  let executionFailed = false;
  for (const phase of execution.phases) {
    const executionPhase = await executeWorkflowPhase({
      phase,
      environment: executionEnv,
      edges,
    });
    if (!executionPhase) {
      executionFailed = true;
      break;
    }
  }

  await finalizeWorkflowExecution({
    executionId,
    executionFailed,
    workflowId: execution.workflowId,
    creditsConsumed,
  });
  await cleanupEnv(executionEnv);
}

async function initializeWorkflowExecution({
  executionId,
  workflowId,
}: {
  executionId: string;
  workflowId: string;
}) {
  await prisma.workflowExecution.update({
    where: {
      id: executionId,
    },
    data: {
      startedAt: new Date(),
      status: WorkflowExecutionStatus.RUNNING,
    },
  });

  await prisma.workflow.update({
    where: {
      id: workflowId,
    },
    data: {
      lastRunAt: new Date(),
      lastRunId: executionId,
      lastRunStatus: WorkflowExecutionStatus.RUNNING,
    },
  });
}

async function initializeExecutionPhaseStatuses(
  execution: WorkflowExecutionWithPhasesType
) {
  await prisma.executionPhase.updateMany({
    where: {
      id: {
        in: execution.phases.map((phase) => phase.id),
      },
    },
    data: {
      status: ExecutionPhaseStatus.RUNNING,
    },
  });
}

async function finalizeWorkflowExecution({
  executionId,
  executionFailed,
  workflowId,
  creditsConsumed,
}: {
  executionId: string;
  executionFailed: boolean;
  workflowId: string;
  creditsConsumed: number;
}) {
  const finalStatus = executionFailed
    ? WorkflowExecutionStatus.FAILED
    : WorkflowExecutionStatus.COMPLETED;
  console.dir({ finalStatus, executionId, creditsConsumed }, { depth: null });
  await prisma.workflowExecution.update({
    where: {
      id: executionId,
    },
    data: {
      status: finalStatus,
      completedAt: new Date(),
      creditsConsumed: creditsConsumed,
    },
  });

  await prisma.workflow
    .update({
      where: {
        id: workflowId,
        lastRunId: executionId,
      },
      data: {
        lastRunStatus: finalStatus,
      },
    })
    .catch((error) => {
      console.error(error);
    });
}

async function executeWorkflowPhase({
  environment,
  phase,
  edges,
}: {
  phase: ExecutionPhase;
  environment: Environment;
  edges: Edge[];
}) {
  const startedAt = new Date();
  const node: FlowNode = JSON.parse(phase.node);

  setupEnvironmentForPhase({ node, environment, edges });
  await prisma.executionPhase.update({
    where: {
      id: phase.id,
    },
    data: {
      status: ExecutionPhaseStatus.RUNNING,
      startedAt,
      inputs: JSON.stringify(environment.phases[node.id].inputs),
    },
  });

  const creditsRequired = TaskRegistry[node.data.type].credits;
  console.log(
    `executing phase ${phase.id} with ${creditsRequired} credits required`
  );
  // TODO: dont forget to decrease the user credit

  await waitFor(2000);
  const success = await executePhase({ node, phase, environment });
  const outputs = environment.phases[node.id].outputs;
  await phaseFinalize(phase.id, success, outputs);
  return { success };
}
async function executePhase({
  environment,
  node,
  phase,
}: {
  node: FlowNode;
  phase: ExecutionPhase;
  environment: Environment;
}) {
  const runFunction = TaskExecutorRegistry[node.data.type];
  if (!runFunction) {
    console.error("executePhase error runFunction is not exist");
    return false;
  }
  const executionEnvironment: ExecutionEnv<WorkflowTask> =
    createExecutionEnvironment({
      node,
      environment,
    });
  return await runFunction(executionEnvironment);
}

function setupEnvironmentForPhase({
  environment,
  node,
  edges,
}: {
  node: FlowNode;
  environment: Environment;
  edges: Edge[];
}) {
  environment.phases[node.id] = { inputs: {}, outputs: {} };

  const inputs = TaskRegistry[node.data.type].inputs;
  for (const input of inputs) {
    if (input.type === NodeTaskInputType.BROWSER_INSTANCE) continue;
    const inputVal = node.data.inputs[input.name];
    if (inputVal) {
      environment.phases[node.id].inputs[input.name] = inputVal;
    }

    const connectedEdge = edges.find(
      (edge) => edge.target === node.id && edge.targetHandle === input.name
    );
    if (!connectedEdge) {
      console.error("missing edge for input");
      continue;
    }

    const outputVal =
      environment.phases[connectedEdge.source].outputs[
        connectedEdge.sourceHandle!
      ];

    environment.phases[node.id].inputs[input.name] = outputVal;
  }
}

function createExecutionEnvironment({
  node,
  environment,
}: {
  node: FlowNode;
  environment: Environment;
}): ExecutionEnv<WorkflowTask> {
  return {
    getInput: (name: string) => environment.phases[node.id].inputs[name],
    setOutput: (name: string, value: string) =>
      (environment.phases[node.id].outputs[name] = value),
    getBrowser: () => environment.browser,
    setBrowser: (browser: Browser) => (environment.browser = browser),
    setPage: (page: Page) => (environment.page = page),
    getPage: () => environment.page,
  };
}

async function phaseFinalize(
  phaseId: string,
  success: boolean,
  outputs: Record<string, string>
) {
  const finalStatus = success
    ? ExecutionPhaseStatus.COMPLETED
    : ExecutionPhaseStatus.FAILED;

  await prisma.executionPhase.update({
    where: {
      id: phaseId,
    },
    data: {
      status: finalStatus,
      completedAt: new Date(),
      outputs: JSON.stringify(outputs),
    },
  });
}

async function getWorkflowExecutionWithPhases(executionId: string) {
  const execution = await prisma.workflowExecution.findUnique({
    where: { id: executionId },
    include: {
      workflow: true,
      phases: true,
    },
  });

  if (!execution) {
    throw new Error("Workflow execution not found");
  }

  return execution;
}

async function cleanupEnv(env: Environment) {
  if (env.browser) {
    await env.browser
      .close()
      .catch((error) => console.error(`can't close browser ,reason :${error}`));
  }
}
