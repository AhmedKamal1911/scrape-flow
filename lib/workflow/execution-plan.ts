import { Edge, getIncomers } from "@xyflow/react";
import { WorkflowExecutionPlan as WorkflowExecutionPlanPhase } from "../types/workflow";
import { FlowNode } from "../types/flowNode";
import { TaskRegistry } from "./task/task-registry";

type FlowToExecutionPlanType = {
  executionPlan?: WorkflowExecutionPlanPhase[];
};
export function FlowToExecutionPlan(
  nodes: FlowNode[],
  edges: Edge[]
): FlowToExecutionPlanType {
  const startedEntryPoint = nodes.find(
    (node) => TaskRegistry[node.data.type].isEntryPoint
  );
  if (!startedEntryPoint) {
    throw new Error("Handle the error if work flow is invalid");
  }
  const executionPlan: WorkflowExecutionPlanPhase[] = [
    {
      phase: 1,
      nodes: [startedEntryPoint],
    },
  ];
  // REMEMBER: To ask when to stop the loop >> sure if all the nodes have been added to execution plan
  const planned = new Set<string>();
  planned.add(startedEntryPoint.id);
  for (
    let phase = 2;
    phase <= nodes.length && planned.size < nodes.length;
    phase++
  ) {
    const nextPhase: WorkflowExecutionPlanPhase = { phase, nodes: [] };
    // We will looping on every node to decide if we should push it in this phase or not
    for (const currentNode of nodes) {
      if (planned.has(currentNode.id)) {
        // Node already in the execution plan
        continue;
      }

      const invalidInputs = getInvalidInputs({
        node: currentNode,
        edges,
        planned,
      });

      if (invalidInputs.length > 0) {
        // we need to check all dependancies to see if it planned or not because the node inputs will be invalid if the dependancy nodes are also invalid
        const incomers = getIncomers(currentNode, nodes, edges);
        if (incomers.every((incomer) => planned.has(incomer.id))) {
          // here we are checking if any if all these incomers are planned and there are their inputs still invalid
          // it means that this specific node has an invalid input which means the workflow is invalid
          console.error("invalid inputs", currentNode.id, invalidInputs);
          throw new Error("TODO: handle error");
        } else {
          continue;
        }
      }

      nextPhase.nodes.push(currentNode);
    }
    // adding the nodes which isn't invalid to the planned storage in nextphase
    for (const node of nextPhase.nodes) {
      planned.add(node.id);
    }
    // nextPhase.nodes.map((node) => );

    executionPlan.push(nextPhase);
  }
  return { executionPlan };
}

function getInvalidInputs({
  edges,
  node,
  planned,
}: {
  node: FlowNode;
  edges: Edge[];
  planned: Set<string>;
}) {
  const invalidInputs: string[] = [];
  const inputs = TaskRegistry[node.data.type].inputs;

  for (const input of inputs) {
    const inputValue = node.data.inputs[input.name];
    const hasValue = inputValue && inputValue.length > 0;

    // If the input already has a value, it's valid, skip it
    if (hasValue) continue;

    // Get all edges coming into this node
    const incomingEdges = edges.filter((edge) => edge.target === node.id);

    // Find the edge connected specifically to this input
    const linkedEdge = incomingEdges.find(
      (edge) => edge.targetHandle === input.name
    );

    // If the input is required
    if (input.required) {
      // If there is a connected edge and its source node is already planned, input is valid
      if (linkedEdge && planned.has(linkedEdge.source)) continue;

      // Otherwise, the required input is missing or invalid
      invalidInputs.push(input.name);
      continue;
    }

    // If the input is optional
    if (linkedEdge && planned.has(linkedEdge.source)) {
      // Optional input is connected and source is planned, so it's valid
      continue;
    }

    // If optional input is neither connected nor has value, consider it invalid for current execution
    invalidInputs.push(input.name);
  }

  return invalidInputs;
}
